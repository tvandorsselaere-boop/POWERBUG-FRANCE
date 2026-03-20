import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    const ip = getClientIp(req.headers);
    const { allowed } = rateLimit(`checkout:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Trop de demandes. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    const { items, email, shippingAddress, relay } = (await req.json()) as {
      items: CartItem[];
      email?: string;
      shippingAddress?: {
        full_name?: string;
        street?: string;
        city?: string;
        zip?: string;
        country?: string;
        phone?: string;
      };
      relay?: {
        id: string;
        name: string;
        address: string;
        zipCode: string;
        city: string;
      };
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
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Livraison DPD France : 14,90€ domicile si chariot, 3,90€ DPD Relais si accessoires uniquement
    const TROLLEY_SLUGS = ["nx-lithium", "nx-dhc-lithium"];
    const hasTrolley = items.some((item) => TROLLEY_SLUGS.includes(item.slug));
    const shippingCents = hasTrolley ? 1490 : 390;
    const shippingLabel = hasTrolley
      ? "Livraison DPD à domicile — France métropolitaine"
      : "Livraison DPD Relais — France métropolitaine";

    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: shippingLabel,
          metadata: {
            slug: "shipping",
          },
        },
        unit_amount: shippingCents,
      },
      quantity: 1,
    });

    // Create or reuse a Stripe Customer to pre-fill email + address in Checkout
    let customerId: string | undefined;

    if (email && shippingAddress?.full_name && shippingAddress?.street) {
      // Si relais choisi, pré-remplir Stripe avec l'adresse du relais
      const shippingData = relay
        ? {
            name: `${shippingAddress.full_name} (Relais: ${relay.name})`,
            phone: shippingAddress.phone || undefined,
            address: {
              line1: relay.address,
              city: relay.city,
              postal_code: relay.zipCode,
              country: "FR" as const,
            },
          }
        : {
            name: shippingAddress.full_name,
            phone: shippingAddress.phone || undefined,
            address: {
              line1: shippingAddress.street,
              city: shippingAddress.city || undefined,
              postal_code: shippingAddress.zip || undefined,
              country: "FR" as const,
            },
          };

      // Check if customer already exists
      const existing = await stripe.customers.list({ email, limit: 1 });
      if (existing.data.length > 0) {
        const customer = await stripe.customers.update(existing.data[0].id, {
          name: shippingAddress.full_name,
          phone: shippingAddress.phone || undefined,
          shipping: shippingData,
        });
        customerId = customer.id;
      } else {
        const customer = await stripe.customers.create({
          email,
          name: shippingAddress.full_name,
          phone: shippingAddress.phone || undefined,
          shipping: shippingData,
        });
        customerId = customer.id;
      }
    } else if (email) {
      const existing = await stripe.customers.list({ email, limit: 1 });
      if (existing.data.length > 0) {
        customerId = existing.data[0].id;
      } else {
        const customer = await stripe.customers.create({ email });
        customerId = customer.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      ...(customerId ? { customer: customerId } : { customer_email: email || undefined }),
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      metadata: {
        store: "powerbug",
        shipping_method: hasTrolley ? "dpd_home" : "dpd_relay",
        ...(relay ? {
          relay_id: relay.id,
          relay_name: relay.name,
          relay_address: `${relay.address}, ${relay.zipCode} ${relay.city}`,
        } : {}),
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
