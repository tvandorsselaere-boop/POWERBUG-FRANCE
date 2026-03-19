import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInvoicePdf, type InvoiceOrder } from "@/lib/invoice/generate";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .eq("store", "powerbug")
    .single();

  if (!order || order.email !== user.email) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  const { buffer, invoiceNumber } = generateInvoicePdf(order as unknown as InvoiceOrder);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Facture_${invoiceNumber}.pdf"`,
    },
  });
}
