import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jsPDF } from "jspdf";

const SELLER = {
  name: "PRO GOLF DISTRIBUTION",
  form: "SASU au capital de 1 000 EUR",
  address: "Domaine de Riquetti, 13290 Aix-en-Provence",
  siren: "888 311 610",
  siret: "888 311 610 00032",
  rcs: "RCS Aix-en-Provence",
  tvaIntra: "FR 07 888 311 610",
  ape: "4764Z",
};

const TVA_RATE = 0.2;

const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  BE: "Belgique",
  CH: "Suisse",
};

function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",") + " EUR";
}

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

  const addr = order.shipping_address as Record<string, string> | null;
  const orderDate = new Date(order.created_at).toLocaleDateString("fr-FR");
  const invoiceNumber = `FA-${new Date(order.created_at).getFullYear()}-${String(order.order_number).padStart(4, "0")}`;

  // Calculate HT from TTC (prices include 20% TVA)
  const totalTTC = order.total as number;
  const shippingTTC = (order.shipping_cost as number) ?? 0;
  const subtotalTTC = (order.subtotal as number) ?? totalTTC - shippingTTC;
  const totalHT = +(totalTTC / (1 + TVA_RATE)).toFixed(2);
  const tvaAmount = +(totalTTC - totalHT).toFixed(2);

  // Generate PDF
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // --- Header ---
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURE", margin, y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(invoiceNumber, pageWidth - margin, y, { align: "right" });
  y += 12;

  // --- Seller info ---
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(SELLER.name, margin, y);
  doc.setFont("helvetica", "normal");
  y += 5;
  doc.text(SELLER.form, margin, y);
  y += 4;
  doc.text(SELLER.address, margin, y);
  y += 4;
  doc.text(`SIREN ${SELLER.siren} — ${SELLER.rcs}`, margin, y);
  y += 4;
  doc.text(`SIRET ${SELLER.siret} — APE ${SELLER.ape}`, margin, y);
  y += 4;
  doc.text(`TVA intracommunautaire : ${SELLER.tvaIntra}`, margin, y);
  y += 10;

  // --- Invoice meta ---
  doc.setFont("helvetica", "bold");
  doc.text("Date d'emission :", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(orderDate, margin + 35, y);

  doc.setFont("helvetica", "bold");
  doc.text("Commande n° :", pageWidth / 2, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(order.order_number).padStart(4, "0"), pageWidth / 2 + 30, y);
  y += 10;

  // --- Client ---
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURER A :", margin, y);

  if (addr) {
    const deliveryLabel = addr.relay_name ? "LIVRER AU RELAIS :" : "LIVRER A :";
    doc.text(deliveryLabel, pageWidth / 2, y);
  }
  y += 5;
  doc.setFont("helvetica", "normal");

  // Billing
  const clientName = addr?.name ?? order.email;
  doc.text(clientName, margin, y);
  y += 4;
  if (addr?.line1) { doc.text(addr.line1, margin, y); y += 4; }
  if (addr?.line2) { doc.text(addr.line2, margin, y); y += 4; }
  const cityLine = `${addr?.postal_code ?? ""} ${addr?.city ?? ""}`.trim();
  if (cityLine) { doc.text(cityLine, margin, y); y += 4; }
  if (addr?.country) { doc.text(COUNTRY_NAMES[addr.country] ?? addr.country, margin, y); y += 4; }

  // Delivery address
  if (addr) {
    let dy = y - (addr.line2 ? 16 : 12);
    if (addr.relay_name) {
      doc.setFont("helvetica", "bold");
      doc.text(addr.relay_name, pageWidth / 2, dy);
      doc.setFont("helvetica", "normal");
      dy += 4;
      if (addr.relay_address) { doc.text(addr.relay_address, pageWidth / 2, dy); dy += 4; }
    } else {
      doc.text(clientName, pageWidth / 2, dy); dy += 4;
      if (addr.line1) { doc.text(addr.line1, pageWidth / 2, dy); dy += 4; }
      if (cityLine) { doc.text(cityLine, pageWidth / 2, dy); dy += 4; }
      if (addr.country) { doc.text(COUNTRY_NAMES[addr.country] ?? addr.country, pageWidth / 2, dy); }
    }
  }

  y += 6;

  // --- Table header ---
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y, contentWidth, 7, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Designation", margin + 2, y + 5);
  doc.text("Qte", margin + 100, y + 5, { align: "center" });
  doc.text("PU HT", margin + 120, y + 5, { align: "right" });
  doc.text("Total HT", margin + contentWidth - 2, y + 5, { align: "right" });
  y += 10;

  // --- Items ---
  doc.setFont("helvetica", "normal");
  const items = order.items as { product_name: string; quantity: number; unit_price: number }[];
  for (const item of items) {
    const unitPriceTTC = item.unit_price;
    const unitPriceHT = +(unitPriceTTC / (1 + TVA_RATE)).toFixed(2);
    const lineTotalHT = +(unitPriceHT * item.quantity).toFixed(2);

    doc.text(item.product_name, margin + 2, y + 4);
    doc.text(String(item.quantity), margin + 100, y + 4, { align: "center" });
    doc.text(formatPrice(unitPriceHT), margin + 120, y + 4, { align: "right" });
    doc.text(formatPrice(lineTotalHT), margin + contentWidth - 2, y + 4, { align: "right" });

    doc.setDrawColor(219, 219, 219);
    doc.line(margin, y + 7, margin + contentWidth, y + 7);
    y += 9;
  }

  // Shipping line
  const shippingMethod = addr?.shipping_method === "dpd_relay" ? "Livraison DPD Relais" : "Livraison DPD a domicile";
  const shippingHT = +(shippingTTC / (1 + TVA_RATE)).toFixed(2);
  doc.text(shippingMethod, margin + 2, y + 4);
  doc.text("1", margin + 100, y + 4, { align: "center" });
  doc.text(formatPrice(shippingHT), margin + 120, y + 4, { align: "right" });
  doc.text(formatPrice(shippingHT), margin + contentWidth - 2, y + 4, { align: "right" });
  doc.line(margin, y + 7, margin + contentWidth, y + 7);
  y += 14;

  // --- Totals ---
  const totalsX = margin + 90;
  doc.setFontSize(9);

  doc.text("Total HT :", totalsX, y);
  doc.text(formatPrice(totalHT), margin + contentWidth - 2, y, { align: "right" });
  y += 6;

  doc.text("TVA 20% :", totalsX, y);
  doc.text(formatPrice(tvaAmount), margin + contentWidth - 2, y, { align: "right" });
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Total TTC :", totalsX, y);
  doc.text(formatPrice(totalTTC), margin + contentWidth - 2, y, { align: "right" });
  y += 6;

  // --- Payment ---
  y += 6;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Paiement : Carte bancaire — Paye le ${orderDate}`, margin, y);
  y += 10;

  // --- Legal warranty ---
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  const warrantyText =
    "Garantie legale de conformite : Le consommateur beneficie d'un delai de deux ans a compter de la " +
    "delivrance du bien pour agir en garantie legale de conformite (articles L.217-3 et suivants du Code " +
    "de la consommation).";
  const warrantyLines = doc.splitTextToSize(warrantyText, contentWidth);
  doc.text(warrantyLines, margin, y);
  y += warrantyLines.length * 3.5 + 6;

  // --- Footer ---
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    `${SELLER.name} — ${SELLER.form} — ${SELLER.address} — SIREN ${SELLER.siren} — TVA ${SELLER.tvaIntra}`,
    pageWidth / 2,
    285,
    { align: "center" }
  );

  // Output
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Facture_${invoiceNumber}.pdf"`,
    },
  });
}
