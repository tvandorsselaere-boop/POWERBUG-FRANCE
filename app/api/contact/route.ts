import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, subject, message } = body;

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

    // Log the message (Resend integration will be added when email is configured)
    console.log("=== Nouveau message de contact ===");
    console.log(`De: ${firstname} ${lastname} <${email}>`);
    console.log(`Sujet: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("==================================");

    // TODO: Send email via Resend when email @powerbug.fr is configured
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "PowerBug France <noreply@powerbug.fr>",
    //   to: "contact@progolfdistribution.com",
    //   replyTo: email,
    //   subject: `[Contact] ${subject} — ${firstname} ${lastname}`,
    //   text: message,
    // });

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
