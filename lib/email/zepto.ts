const ZEPTO_API_URL = "https://api.zeptomail.eu/v1.1/email";

interface EmailAttachment {
  content: string; // base64
  mime_type: string;
  name: string;
}

interface EmailPayload {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail({ to, toName, subject, html, text, replyTo, attachments }: EmailPayload) {
  const apiKey = process.env.ZEPTO_API_KEY;
  const from = process.env.EMAIL_FROM ?? "thomas@facile-ia.fr";

  if (!apiKey) {
    console.error("ZEPTO_API_KEY is not set");
    return { success: false, error: "ZEPTO_API_KEY not configured" };
  }

  const body = {
    from: { address: from, name: "PowerBug France" },
    to: [{ email_address: { address: to, name: toName ?? to } }],
    subject,
    htmlbody: html,
    ...(text ? { textbody: text } : {}),
    ...(replyTo ? { reply_to: [{ address: replyTo }] } : {}),
    ...(attachments?.length ? { attachments } : {}),
  };

  try {
    const res = await fetch(ZEPTO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("ZeptoMail error:", res.status, text);
      return { success: false, error: text };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("ZeptoMail fetch error:", message);
    return { success: false, error: message };
  }
}
