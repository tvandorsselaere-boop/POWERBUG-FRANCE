import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process PowerBug orders
    if (session.metadata?.store !== "powerbug") {
      return NextResponse.json({ received: true });
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

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          email: session.customer_details?.email ?? session.customer_email ?? "",
          status: "confirmed",
          subtotal,
          shipping_cost: 0,
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
        console.error("Failed to insert order:", orderError);
        return NextResponse.json(
          { error: "Failed to save order" },
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
        console.error("Failed to insert order items:", itemsError);
      }

      console.log(
        `Order ${order.id} created for ${session.customer_details?.email}`
      );
    } catch (err) {
      console.error("Webhook processing error:", err);
      return NextResponse.json(
        { error: "Processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
