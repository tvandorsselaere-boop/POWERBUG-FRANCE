// ─── Confirmation commande → client ────────────────────────────────────────

export interface OrderItem {
  product_name: string;
  variant_label: string;
  quantity: number;
  unit_price: number;
}

export interface OrderConfirmationData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  };
}

export function orderConfirmationHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;">
          ${item.product_name}${item.variant_label && item.variant_label !== "standard" ? ` — ${item.variant_label}` : ""}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;text-align:right;">${item.unit_price.toFixed(2)} €</td>
      </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrHtml = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), addr.country]
    .filter(Boolean)
    .join("<br>");

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;color:#0F0F10;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#356B0D;padding:32px 40px;text-align:center;">
            <div style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:1px;">POWERBUG</div>
            <div style="font-size:13px;color:#8DC63F;margin-top:4px;">France</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0F0F10;">Commande confirmée ✓</h1>
            <p style="margin:0 0 24px;color:#6B7280;font-size:14px;">Commande n° ${data.orderId.slice(0, 8).toUpperCase()}</p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
              Bonjour ${data.customerName},<br><br>
              Merci pour votre commande ! Nous l'avons bien reçue et elle est en cours de traitement.
              Vous recevrez un email de confirmation d'expédition avec votre numéro de suivi DPD.
            </p>

            <!-- Articles -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <thead>
                <tr style="background:#f9f9f9;">
                  <th style="padding:10px 8px;text-align:left;font-size:13px;color:#6B7280;font-weight:600;">Produit</th>
                  <th style="padding:10px 8px;text-align:center;font-size:13px;color:#6B7280;font-weight:600;">Qté</th>
                  <th style="padding:10px 8px;text-align:right;font-size:13px;color:#6B7280;font-weight:600;">Prix</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <!-- Totaux -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#6B7280;">Sous-total</td>
                <td style="padding:6px 0;font-size:14px;text-align:right;">${data.subtotal.toFixed(2)} €</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#6B7280;">Livraison DPD</td>
                <td style="padding:6px 0;font-size:14px;text-align:right;">${data.shippingCost.toFixed(2)} €</td>
              </tr>
              <tr style="border-top:2px solid #0F0F10;">
                <td style="padding:12px 0 0;font-size:16px;font-weight:700;">Total</td>
                <td style="padding:12px 0 0;font-size:16px;font-weight:700;text-align:right;">${data.total.toFixed(2)} €</td>
              </tr>
            </table>

            <!-- Adresse -->
            <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin-bottom:32px;">
              <div style="font-size:13px;font-weight:600;color:#6B7280;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">Adresse de livraison</div>
              <div style="font-size:14px;line-height:1.8;">${addrHtml}</div>
            </div>

            <p style="font-size:14px;color:#6B7280;margin:0;">
              Des questions ? Répondez à cet email ou contactez-nous sur
              <a href="https://powerbug.fr/contact" style="color:#356B0D;">powerbug.fr/contact</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              PowerBug France — Distributeur exclusif PowerBug en France<br>
              PRO GOLF DISTRIBUTION — SIREN 888 311 610
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Bon de préparation → Golf des Marques ─────────────────────────────────

export function preparationOrderHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;font-size:15px;">
          <strong>${item.product_name}</strong>${item.variant_label && item.variant_label !== "standard" ? ` (${item.variant_label})` : ""}
        </td>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;text-align:center;font-size:18px;font-weight:700;">${item.quantity}</td>
      </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrHtml = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), addr.country]
    .filter(Boolean)
    .join("<br>");

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;color:#0F0F10;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0F0F10;padding:24px 40px;">
            <div style="font-size:12px;color:#8DC63F;font-weight:600;text-transform:uppercase;letter-spacing:1px;">BON DE PRÉPARATION</div>
            <div style="font-size:20px;font-weight:700;color:#ffffff;margin-top:4px;">Commande n° ${data.orderId.slice(0, 8).toUpperCase()}</div>
            <div style="font-size:13px;color:#9CA3AF;margin-top:4px;">${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            <!-- Articles à préparer -->
            <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6B7280;">Articles à préparer</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <thead>
                <tr style="background:#356B0D;">
                  <th style="padding:10px 8px;text-align:left;font-size:13px;color:#ffffff;font-weight:600;">Produit</th>
                  <th style="padding:10px 8px;text-align:center;font-size:13px;color:#ffffff;font-weight:600;">Quantité</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <!-- Adresse de livraison -->
            <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6B7280;">Adresse de livraison (DPD)</h2>
            <div style="background:#f9f9f9;border-left:4px solid #356B0D;border-radius:4px;padding:20px;margin-bottom:32px;">
              <div style="font-size:16px;line-height:2;font-weight:500;">${addrHtml}</div>
            </div>

            <!-- Email client -->
            <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:32px;">
              <span style="font-size:13px;color:#6B7280;font-weight:600;">Email client : </span>
              <span style="font-size:14px;">${data.customerEmail}</span>
            </div>

            <p style="font-size:13px;color:#6B7280;margin:0;">
              Merci de préparer et expédier cette commande via DPD.<br>
              Une fois expédiée, merci de transmettre le numéro de tracking à PowerBug France.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — Expédition via Golf des Marques</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Formulaire de contact → Fred ──────────────────────────────────────────

export interface ContactData {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

export function contactFormHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;color:#0F0F10;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#356B0D;padding:24px 40px;">
            <div style="font-size:12px;color:#8DC63F;font-weight:600;text-transform:uppercase;letter-spacing:1px;">NOUVEAU MESSAGE</div>
            <div style="font-size:18px;font-weight:700;color:#ffffff;margin-top:4px;">Formulaire de contact PowerBug</div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#6B7280;width:120px;">De :</td>
                <td style="padding:8px 0;font-size:14px;font-weight:600;">${data.firstname} ${data.lastname}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#6B7280;">Email :</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:${data.email}" style="color:#356B0D;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#6B7280;">Sujet :</td>
                <td style="padding:8px 0;font-size:14px;">${data.subject}</td>
              </tr>
            </table>
            <div style="margin-top:24px;background:#f9f9f9;border-radius:8px;padding:20px;">
              <div style="font-size:13px;color:#6B7280;font-weight:600;margin-bottom:12px;">Message :</div>
              <div style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — powerbug.fr</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
