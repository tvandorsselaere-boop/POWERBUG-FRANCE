import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Verify that the current request is from an authenticated admin.
 * Used in API routes (which are excluded from middleware protection).
 * Returns the user if admin, or a 401/403 NextResponse.
 */
export async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, error: NextResponse.json({ error: "Non authentifié" }, { status: 401 }) };
  }

  const admins = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (!user.email || !admins.includes(user.email)) {
    return { user: null, error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }) };
  }

  return { user, error: null };
}
