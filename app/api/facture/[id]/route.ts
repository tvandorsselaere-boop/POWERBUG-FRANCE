import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateInvoicePdf, type InvoiceOrder } from "@/lib/invoice/generate";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`facture:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  }

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

  const invoiceNumber = `FA-${new Date(order.created_at).getFullYear()}-${String(order.order_number).padStart(4, "0")}`;

  // Try to serve from Supabase Storage first (archived original)
  const storagePath = `powerbug/${id}.pdf`;
  const { data: storedPdf } = await supabase.storage
    .from("invoices")
    .download(storagePath);

  if (storedPdf) {
    const arrayBuffer = await storedPdf.arrayBuffer();
    return new NextResponse(new Uint8Array(arrayBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Facture_${invoiceNumber}.pdf"`,
      },
    });
  }

  // Fallback: generate on the fly (for orders created before storage was added)
  const { buffer } = generateInvoicePdf(order as unknown as InvoiceOrder);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Facture_${invoiceNumber}.pdf"`,
    },
  });
}
