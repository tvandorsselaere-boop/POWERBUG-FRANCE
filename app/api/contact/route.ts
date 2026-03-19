import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/zepto";
import { contactFormHtml } from "@/lib/email/templates";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const ip = getClientIp(request.headers);
    const { allowed } = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Trop de demandes. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstname, lastname, email, subject, message } = body;

    // Honeypot: if filled, it's a bot (hidden field in form)
    if (body.website) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true, message: "Votre message a bien ete envoye." });
    }

    // Validate required fields
    const errors: string[] = [];
    if (!firstname?.trim()) errors.push("Le prenom est requis.");
    if (!lastname?.trim()) errors.push("Le nom est requis.");
    if (!email?.trim()) errors.push("L'email est requis.");
    if (!subject?.trim()) errors.push("Le sujet est requis.");
    if (!message?.trim()) errors.push("Le message est requis.");

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(" ") },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    const ordersTo = process.env.EMAIL_ORDERS_TO ?? "contact@powerbug.fr";
    await sendEmail({
      to: ordersTo,
      subject: `[Contact PowerBug] ${subject} — ${firstname} ${lastname}`,
      html: contactFormHtml({ firstname, lastname, email, subject, message }),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Votre message a bien ete envoye. Nous vous repondrons sous 24h.",
    });
  } catch {
    console.error("Erreur API contact");
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue. Veuillez reessayer." },
      { status: 500 }
    );
  }
}
