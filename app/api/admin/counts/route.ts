import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const { error } = await verifyAdmin();
  if (error) return error;

  const supabase = createServiceClient();

  const [confirmed, needsTracking, lowStockData, todayRevenue] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug")
      .eq("status", "confirmed"),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug")
      .eq("status", "processing")
      .is("tracking_number", null),
    supabase
      .from("products")
      .select("id, product_variants(stock_quantity)")
      .eq("store", "powerbug")
      .eq("is_active", true),
    supabase
      .from("orders")
      .select("total")
      .eq("store", "powerbug")
      .gte("created_at", new Date().toISOString().split("T")[0]),
  ]);

  const products = (lowStockData.data ?? []) as { id: string; product_variants: { stock_quantity: number }[] }[];
  let outOfStock = 0;
  let lowStock = 0;
  for (const p of products) {
    for (const v of p.product_variants ?? []) {
      if (v.stock_quantity === 0) outOfStock++;
      else if (v.stock_quantity <= 3) lowStock++;
    }
  }

  const revenue = (todayRevenue.data ?? []).reduce((sum, o) => sum + (o.total ?? 0), 0);

  return NextResponse.json({
    pendingOrders: confirmed.count ?? 0,
    needsTracking: needsTracking.count ?? 0,
    lowStock,
    outOfStock,
    todayRevenue: revenue,
  });
}
