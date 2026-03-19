import { NextRequest, NextResponse } from "next/server";
import { searchRelayPoints } from "@/lib/dpd/pickup";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  // Rate limit: 20 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { allowed } = rateLimit(`dpd-relais:${ip}`, 20, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Veuillez réessayer dans une minute." },
      { status: 429 }
    );
  }

  const zipCode = req.nextUrl.searchParams.get("cp");
  const city = req.nextUrl.searchParams.get("ville") ?? undefined;

  if (!zipCode || !/^\d{5}$/.test(zipCode)) {
    return NextResponse.json(
      { error: "Code postal invalide (5 chiffres)" },
      { status: 400 }
    );
  }

  try {
    const relays = await searchRelayPoints(zipCode, city);
    return NextResponse.json({ relays });
  } catch (err) {
    console.error("MyPudo search error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la recherche de relais" },
      { status: 500 }
    );
  }
}
