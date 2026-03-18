import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const { error } = await verifyAdmin();
  if (error) return error;

  const supabase = createServiceClient();

  const { data, error: dbError } = await supabase
    .from("products")
    .select(`
      id, name, slug, is_active,
      category:categories(name, slug),
      product_variants(id, stock_quantity, stock_status, sku, price)
    `)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .order("name");

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ products: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  const { error } = await verifyAdmin();
  if (error) return error;

  const body = await req.json();
  const { variant_id, stock_quantity } = body as { variant_id: string; stock_quantity: number };

  if (!variant_id || typeof stock_quantity !== "number" || stock_quantity < 0) {
    return NextResponse.json({ error: "variant_id et stock_quantity (>= 0) requis" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Verify variant belongs to a powerbug product
  const { data: variant } = await supabase
    .from("product_variants")
    .select("id, product:products!inner(store)")
    .eq("id", variant_id)
    .single();

  const product = variant?.product as unknown as { store: string } | null;
  if (!variant || product?.store !== "powerbug") {
    return NextResponse.json({ error: "Variante introuvable" }, { status: 404 });
  }

  const stock_status = stock_quantity === 0 ? "out_of_stock" : stock_quantity <= 3 ? "low_stock" : "in_stock";

  const { error: updateError } = await supabase
    .from("product_variants")
    .update({ stock_quantity, stock_status })
    .eq("id", variant_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, stock_quantity, stock_status });
}
