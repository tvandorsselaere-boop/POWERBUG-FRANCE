import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Verify that the current request is from an authenticated PowerBug admin.
 * Checks: 1) authenticated, 2) email in ADMIN_EMAILS, 3) profile tagged 'powerbug'.
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
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!user.email || !admins.includes(user.email.toLowerCase())) {
    return { user: null, error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }) };
  }

  // Vérifier que l'admin est bien tagué powerbug
  const serviceClient = createServiceClient();
  const { data: profile } = await serviceClient
    .from("profiles")
    .select("stores")
    .eq("id", user.id)
    .single();

  const stores: string[] = profile?.stores ?? [];
  if (!stores.includes("powerbug")) {
    return { user: null, error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }) };
  }

  return { user, error: null };
}
