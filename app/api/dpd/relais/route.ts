import { NextRequest, NextResponse } from "next/server";
import { searchRelayPoints } from "@/lib/dpd/pickup";

export async function GET(req: NextRequest) {
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
