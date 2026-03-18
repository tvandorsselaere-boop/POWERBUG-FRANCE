import { NextResponse } from "next/server";
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
