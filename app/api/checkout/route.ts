import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  isBundle?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const { items, email } = (await req.json()) as {
      items: CartItem[];
      email?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Panier vide" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") ?? "https://powerbug-france.vercel.app";

    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          metadata: {
            slug: item.slug,
            isBundle: item.isBundle ? "true" : "false",
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      customer_email: email || undefined,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      metadata: {
        store: "powerbug",
      },
      success_url: `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation du checkout" },
      { status: 500 }
    );
  }
}
