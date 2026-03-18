import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin/auth";

export async function GET() {
  const { error } = await verifyAdmin();
  return NextResponse.json({ isAdmin: !error });
}
