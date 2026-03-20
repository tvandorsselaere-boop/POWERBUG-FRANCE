import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email/zepto";
import { orderConfirmationHtml, orderConfirmationText, preparationOrderHtml, type OrderItem } from "@/lib/email/templates";
import { generateInvoicePdf, type InvoiceOrder } from "@/lib/invoice/generate";
import { logInfo, logError } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    logError("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logError("Webhook signature verification failed", { error: message });
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  logInfo("Webhook event received", { type: event.type, eventId: event.id });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    logInfo("Processing checkout session", { sessionId: session.id });

    // Only process PowerBug orders
    if (session.metadata?.store !== "powerbug") {
      logInfo("Skipping non-powerbug order", { store: session.metadata?.store });
      return NextResponse.json({ received: true, skipped: "not powerbug" });
    }

    try {
      // Retrieve full session from Stripe API (webhook payload may lack shipping_details)
      const fullSession = await stripe.checkout.sessions.retrieve(session.id);

      // Retrieve line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );

      const supabase = createServiceClient();

      // Idempotency: skip if this payment was already processed
      const paymentId = session.payment_intent as string;
      const { data: existingOrder } = await supabase
        .from("orders")
        .select("id")
        .eq("payment_id", paymentId)
        .maybeSingle();

      if (existingOrder) {
        logInfo("Duplicate payment skipped", { paymentId });
        return NextResponse.json({ received: true, skipped: "duplicate" });
      }

      // Stripe SDK v20+: shipping is under collected_information.shipping_details
      const shippingDetails = fullSession.collected_information?.shipping_details ?? null;

      const addr = shippingDetails?.address;
      // Detect shipping method from metadata or fallback to shipping line item description
      const shippingMethod: "dpd_home" | "dpd_relay" =
        (session.metadata?.shipping_method as "dpd_home" | "dpd_relay") ?? "dpd_home";

      // Relay point info (for dpd_relay orders)
      const relayInfo = session.metadata?.relay_id
        ? {
            relay_id: session.metadata.relay_id,
            relay_name: session.metadata.relay_name,
            relay_address: session.metadata.relay_address,
          }
        : {};

      const shippingAddress = shippingDetails
        ? {
            name: shippingDetails.name ?? undefined,
            line1: addr?.line1 ?? undefined,
            line2: addr?.line2 ?? undefined,
            city: addr?.city ?? undefined,
            postal_code: addr?.postal_code ?? undefined,
            country: addr?.country ?? undefined,
            shipping_method: shippingMethod,
            ...relayInfo,
          }
        : { shipping_method: shippingMethod, ...relayInfo };

      const total = (session.amount_total ?? 0) / 100;

      // Shipping is a line item (not Stripe shipping_options), so extract it
      // Check both metadata slug and description as fallback
      function isShippingItem(item: Stripe.LineItem) {
        const product = item.price?.product;
        const meta = (typeof product === "object" && product !== null) ? (product as Stripe.Product).metadata : null;
        if (meta?.slug === "shipping") return true;
        if (item.description?.toLowerCase().includes("livraison dpd")) return true;
        return false;
      }
      const shippingLineItem = lineItems.data.find(isShippingItem);
      const shippingCost = shippingLineItem ? (shippingLineItem.price?.unit_amount ?? 0) / 100 : 0;
      const subtotal = total - shippingCost;

      logInfo("Inserting order", { total, shippingCost, email: session.customer_details?.email });

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          email: session.customer_details?.email ?? session.customer_email ?? "",
          status: "confirmed",
          subtotal,
          shipping_cost: shippingCost,
          discount: 0,
          total,
          shipping_address: shippingAddress,
          payment_provider: "stripe",
          payment_id: session.payment_intent as string,
          store: "powerbug",
        })
        .select("id, order_number, created_at")
        .single();

      if (orderError) {
        logError("Failed to insert order", { error: orderError.message, code: orderError.code });
        return NextResponse.json(
          { error: `DB insert failed: ${orderError.message}` },
          { status: 500 }
        );
      }

      // Insert order items (exclude shipping line item)
      const orderItems = lineItems.data
        .filter((item) => !isShippingItem(item))
        .map((item) => {
          const product = item.price?.product;
          const meta = (typeof product === "object" && product !== null) ? (product as Stripe.Product).metadata : null;
          return {
            order_id: order.id,
            product_name: item.description ?? "Produit",
            variant_label: meta?.slug ?? "standard",
            quantity: item.quantity ?? 1,
            unit_price: (item.price?.unit_amount ?? 0) / 100,
          };
        });

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        logError("Failed to insert order items", { error: itemsError.message, orderId: order.id });
      }

      logInfo("Order created", { orderId: order.id, email: session.customer_details?.email });

      // Envoyer les emails
      const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";
      const customerName = session.customer_details?.name ?? customerEmail;
      const emailData = {
        orderId: order.id,
        customerEmail,
        customerName,
        items: orderItems as OrderItem[],
        subtotal,
        shippingCost: shippingCost,
        total,
        shippingAddress,
        shippingMethod,
      };

      // Generate invoice PDF
      const invoiceOrder: InvoiceOrder = {
        order_number: order.order_number,
        created_at: order.created_at,
        email: customerEmail,
        total,
        subtotal,
        shipping_cost: shippingCost,
        shipping_address: shippingAddress as Record<string, string>,
        items: orderItems,
      };
      const { buffer: pdfBuffer, invoiceNumber } = generateInvoicePdf(invoiceOrder);

      // Save invoice PDF to Supabase Storage
      const storagePath = `powerbug/${order.id}.pdf`;
      const { error: storageError } = await supabase.storage
        .from("invoices")
        .upload(storagePath, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true,
        });
      if (storageError) {
        logError("Failed to store invoice PDF", { error: storageError.message, orderId: order.id });
      }

      // Email confirmation → client (avec facture PDF)
      await sendEmail({
        to: customerEmail,
        toName: customerName,
        subject: `Votre commande n° ${order.id.slice(0, 8).toUpperCase()} est confirmée`,
        html: orderConfirmationHtml(emailData),
        text: orderConfirmationText(emailData),
        attachments: [
          {
            content: pdfBuffer.toString("base64"),
            mime_type: "application/pdf",
            name: `Facture_${invoiceNumber}.pdf`,
          },
        ],
      });

      // Email bon de préparation → Golf des Marques (via Fred pour l'instant)
      const ordersTo = process.env.EMAIL_ORDERS_TO;
      if (!ordersTo) {
        logError("EMAIL_ORDERS_TO is not set, skipping preparation email", { orderId: order.id });
      } else {
        await sendEmail({
          to: ordersTo,
          subject: `[PowerBug] Nouvelle commande à préparer — n° ${order.id.slice(0, 8).toUpperCase()}`,
          html: preparationOrderHtml(emailData),
          replyTo: customerEmail,
        });
      }

      // Stock géré manuellement par Fred — pas de décrémentation auto

    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      logError("Webhook processing error", { error: message });
      return NextResponse.json(
        { error: `Processing failed: ${message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
