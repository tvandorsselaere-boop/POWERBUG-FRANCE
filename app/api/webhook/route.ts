import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";
import { sendEmail } from "@/lib/email/zepto";
import { orderConfirmationHtml, preparationOrderHtml, stockAlertHtml, type OrderItem, type StockAlertData } from "@/lib/email/templates";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
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
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  console.log("Webhook event received:", event.type, event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Session metadata:", JSON.stringify(session.metadata));

    // Only process PowerBug orders
    if (session.metadata?.store !== "powerbug") {
      console.log("Skipping: not a powerbug order");
      return NextResponse.json({ received: true, skipped: "not powerbug" });
    }

    try {
      // Retrieve line items from Stripe
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );

      const supabase = createServiceClient();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const shippingDetails = (session as any).shipping_details as {
        name?: string;
        address?: {
          line1?: string;
          line2?: string;
          city?: string;
          postal_code?: string;
          country?: string;
        };
      } | null;
      const shippingAddress = shippingDetails
        ? {
            name: shippingDetails.name,
            line1: shippingDetails.address?.line1,
            line2: shippingDetails.address?.line2,
            city: shippingDetails.address?.city,
            postal_code: shippingDetails.address?.postal_code,
            country: shippingDetails.address?.country,
          }
        : {};

      const total = (session.amount_total ?? 0) / 100;
      const subtotal = (session.amount_subtotal ?? 0) / 100;
      const shippingCost = parseFloat((total - subtotal).toFixed(2));

      console.log("Inserting order:", { email: session.customer_details?.email, total, subtotal });

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
        .select("id")
        .single();

      if (orderError) {
        console.error("Failed to insert order:", JSON.stringify(orderError));
        return NextResponse.json(
          { error: `DB insert failed: ${orderError.message}` },
          { status: 500 }
        );
      }

      // Insert order items
      const orderItems = lineItems.data.map((item) => {
        const product = item.price?.product as Stripe.Product | undefined;
        return {
          order_id: order.id,
          product_name: item.description ?? "Produit",
          variant_label: product?.metadata?.slug ?? "standard",
          quantity: item.quantity ?? 1,
          unit_price: (item.price?.unit_amount ?? 0) / 100,
        };
      });

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Failed to insert order items:", JSON.stringify(itemsError));
      }

      console.log(`Order ${order.id} created for ${session.customer_details?.email}`);

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
      };

      // Email confirmation → client
      await sendEmail({
        to: customerEmail,
        toName: customerName,
        subject: `Confirmation de commande PowerBug — n° ${order.id.slice(0, 8).toUpperCase()}`,
        html: orderConfirmationHtml(emailData),
      });

      // Email bon de préparation → Golf des Marques (via Fred pour l'instant)
      const ordersTo = process.env.EMAIL_ORDERS_TO ?? "thomas@facile-ia.fr";
      await sendEmail({
        to: ordersTo,
        subject: `[PowerBug] Nouvelle commande à préparer — n° ${order.id.slice(0, 8).toUpperCase()}`,
        html: preparationOrderHtml(emailData),
        replyTo: customerEmail,
      });

      // ─── Décrémentation du stock ──────────────────────────────────────
      const LOW_STOCK_THRESHOLD = 3;
      const stockAlerts: StockAlertData[] = [];

      for (const item of orderItems) {
        // Skip shipping line item
        if (item.variant_label === "shipping") continue;

        // Find product by slug
        const { data: product } = await supabase
          .from("products")
          .select("id, name")
          .eq("slug", item.variant_label)
          .eq("store", "powerbug")
          .single();

        if (!product) continue;

        // Get variants and decrement stock
        const { data: variants } = await supabase
          .from("product_variants")
          .select("id, stock_quantity, sku")
          .eq("product_id", product.id);

        for (const variant of variants ?? []) {
          const newQty = Math.max(0, variant.stock_quantity - item.quantity);
          const newStatus = newQty === 0 ? "out_of_stock" : newQty <= LOW_STOCK_THRESHOLD ? "low_stock" : "in_stock";

          await supabase
            .from("product_variants")
            .update({ stock_quantity: newQty, stock_status: newStatus })
            .eq("id", variant.id);

          if (newQty <= LOW_STOCK_THRESHOLD) {
            stockAlerts.push({
              productName: product.name,
              productSlug: item.variant_label,
              currentStock: newQty,
              sku: variant.sku,
            });
          }
        }
      }

      // Send stock alert email if any products are low
      if (stockAlerts.length > 0) {
        const alertTo = process.env.EMAIL_STOCK_ALERT_TO ?? process.env.EMAIL_ORDERS_TO ?? "thomas@facile-ia.fr";
        await sendEmail({
          to: alertTo,
          subject: `[PowerBug] ALERTE STOCK — ${stockAlerts.length} produit${stockAlerts.length > 1 ? "s" : ""} à réapprovisionner`,
          html: stockAlertHtml(stockAlerts),
        });
        console.log(`Stock alert sent for ${stockAlerts.length} products`);
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook processing error:", message);
      return NextResponse.json(
        { error: `Processing failed: ${message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
