import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { error } = await verifyAdmin();
  if (error) return error;

  const supabase = createServiceClient();
  const status = req.nextUrl.searchParams.get("status");

  let query = supabase
    .from("orders")
    .select("id, order_number, email, status, total, shipping_cost, tracking_number, created_at, shipping_address")
    .eq("store", "powerbug")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status === "needs_tracking") {
    query = query.eq("status", "processing").is("tracking_number", null);
  } else if (status === "action_needed") {
    query = query.in("status", ["confirmed", "processing"]);
  } else if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error: dbError } = await query;

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data ?? [] });
}
