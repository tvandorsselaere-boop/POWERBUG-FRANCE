import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/zepto";
import { shippingNotificationHtml, preparationOrderHtml, type OrderConfirmationData } from "@/lib/email/templates";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await verifyAdmin();
  if (error) return error;

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("store", "powerbug")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  return NextResponse.json({ order, items: items ?? [] });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await verifyAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const { status, tracking_number, action } = body as {
    status?: string;
    tracking_number?: string;
    action?: "resend_preparation" | "send_shipping";
  };

  const supabase = createServiceClient();

  // Fetch current order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .eq("store", "powerbug")
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  // Handle special actions
  if (action === "resend_preparation") {
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id);

    const shippingAddr = order.shipping_address ?? {};
    const emailData: OrderConfirmationData = {
      orderId: order.id,
      customerEmail: order.email,
      customerName: shippingAddr.name ?? order.email,
      items: (items ?? []).map((i: Record<string, unknown>) => ({
        product_name: i.product_name as string,
        variant_label: i.variant_label as string,
        quantity: i.quantity as number,
        unit_price: i.unit_price as number,
      })),
      subtotal: order.subtotal,
      shippingCost: order.shipping_cost,
      total: order.total,
      shippingAddress: shippingAddr,
      shippingMethod: shippingAddr.shipping_method as "dpd_home" | "dpd_relay" | undefined,
    };

    const ordersTo = process.env.EMAIL_ORDERS_TO ?? "thomas@facile-ia.fr";
    await sendEmail({
      to: ordersTo,
      subject: `[PowerBug] RENVOI — Commande à préparer — n° ${order.id.slice(0, 8).toUpperCase()}`,
      html: preparationOrderHtml(emailData),
      replyTo: order.email,
    });

    return NextResponse.json({ success: true, message: "Bon de préparation renvoyé" });
  }

  // Build update object
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (status) update.status = status;
  if (tracking_number !== undefined) update.tracking_number = tracking_number;

  const { error: updateError } = await supabase
    .from("orders")
    .update(update)
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // If tracking number was added or action is send_shipping, notify customer
  if ((tracking_number && tracking_number !== order.tracking_number) || action === "send_shipping") {
    const trackingNum = tracking_number ?? order.tracking_number;
    if (trackingNum) {
      await sendEmail({
        to: order.email,
        toName: order.shipping_address?.name ?? order.email,
        subject: `Votre commande PowerBug est expédiée — Suivi DPD`,
        html: shippingNotificationHtml({
          customerName: order.shipping_address?.name ?? order.email,
          orderId: order.id,
          trackingNumber: trackingNum,
        }),
      });
    }
  }

  return NextResponse.json({ success: true });
}
