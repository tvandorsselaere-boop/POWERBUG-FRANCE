// ─── Helpers ───────────────────────────────────────────────────────────────

const COUNTRY_NAMES: Record<string, string> = { FR: "France", BE: "Belgique", CH: "Suisse", LU: "Luxembourg", DE: "Allemagne" };
function countryName(code?: string) { return code ? (COUNTRY_NAMES[code.toUpperCase()] ?? code) : ""; }

/** Escape HTML to prevent XSS in email templates */
function esc(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
    shipping_method?: string;
    relay_id?: string;
    relay_name?: string;
    relay_address?: string;
  };
  shippingMethod?: "dpd_home" | "dpd_relay";
}

export function orderConfirmationHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;">
          ${esc(item.product_name)}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #DBDBDB;text-align:right;">${item.unit_price.toFixed(2)} €</td>
      </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrHtml = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), countryName(addr.country)]
    .filter(Boolean)
    .map(esc)
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
          <td style="background:#356B0D;padding:24px 40px;">
            <img src="https://www.powerbug.fr/images/powerbug-logo.png" alt="PowerBug France" width="160" height="40" style="display:block;filter:brightness(0) invert(1);opacity:0.95;" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#0F0F10;">Commande confirmée</h1>
            <p style="margin:0 0 24px;color:#6B7280;font-size:14px;">Commande n° ${esc(data.orderId.slice(0, 8).toUpperCase())}</p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
              Bonjour ${esc(data.customerName)},<br><br>
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
                <td style="padding:6px 0;font-size:14px;color:#6B7280;">${(data.shippingMethod ?? data.shippingAddress?.shipping_method) === "dpd_relay" ? "Livraison DPD Relais" : "Livraison DPD à domicile"}</td>
                <td style="padding:6px 0;font-size:14px;text-align:right;">${data.shippingCost.toFixed(2)} €</td>
              </tr>
              <tr style="border-top:2px solid #0F0F10;">
                <td style="padding:12px 0 0;font-size:16px;font-weight:700;">Total</td>
                <td style="padding:12px 0 0;font-size:16px;font-weight:700;text-align:right;">${data.total.toFixed(2)} €</td>
              </tr>
            </table>

            <!-- Adresse / Relais -->
            ${addr.relay_name ? `
            <div style="background:#f3e8ff;border-radius:8px;padding:20px;margin-bottom:16px;">
              <div style="font-size:13px;font-weight:600;color:#7C3AED;margin-bottom:8px;">Point relais DPD Pickup</div>
              <div style="font-size:15px;font-weight:600;line-height:1.6;">${esc(addr.relay_name)}</div>
              <div style="font-size:14px;line-height:1.6;color:#6B7280;">${esc(addr.relay_address)}</div>
            </div>
            ` : ""}
            <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin-bottom:32px;">
              <div style="font-size:13px;font-weight:600;color:#6B7280;margin-bottom:8px;">${addr.relay_name ? "Votre adresse" : "Adresse de livraison"}</div>
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
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — powerbug.fr</p>
            <p style="margin:8px 0 0;font-size:11px;color:#b0b0b0;">PRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — Domaine de Riquetti, 13290 Aix-en-Provence</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Version texte confirmation commande ──────────────────────────────────

export function orderConfirmationText(data: OrderConfirmationData): string {
  const addr = data.shippingAddress;
  const method = data.shippingMethod ?? (addr?.shipping_method as string | undefined);
  const isRelay = method === "dpd_relay";

  const itemsText = data.items
    .map((item) => `- ${item.product_name} x${item.quantity} : ${item.unit_price.toFixed(2)} EUR`)
    .join("\n");

  const addrText = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), countryName(addr.country)]
    .filter(Boolean)
    .join("\n");

  let text = `Commande confirmée - n° ${data.orderId.slice(0, 8).toUpperCase()}

Bonjour ${data.customerName},

Merci pour votre commande. Elle est en cours de traitement. Vous recevrez un email avec votre numero de suivi DPD.

Articles :
${itemsText}

Sous-total : ${data.subtotal.toFixed(2)} EUR
${isRelay ? "Livraison DPD Relais" : "Livraison DPD a domicile"} : ${data.shippingCost.toFixed(2)} EUR
Total : ${data.total.toFixed(2)} EUR
`;

  if (addr.relay_name) {
    text += `\nPoint relais : ${addr.relay_name}\n${addr.relay_address ?? ""}\n`;
  }

  text += `\nAdresse :\n${addrText}\n`;
  text += `\nDes questions ? Repondez a cet email ou contactez-nous sur powerbug.fr/contact\n`;
  text += `\nPowerBug France — powerbug.fr\nPRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — Domaine de Riquetti, 13290 Aix-en-Provence`;

  return text;
}

// ─── Bon de préparation → Golf des Marques ─────────────────────────────────

export function preparationOrderHtml(data: OrderConfirmationData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;font-size:15px;">
          <strong>${esc(item.product_name)}</strong>${item.variant_label && item.variant_label !== "standard" ? ` (${esc(item.variant_label)})` : ""}
        </td>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;text-align:center;font-size:18px;font-weight:700;">${item.quantity}</td>
      </tr>`
    )
    .join("");

  const addr = data.shippingAddress;
  const addrHtml = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), countryName(addr.country)]
    .filter(Boolean)
    .map(esc)
    .join("<br>");

  const method = data.shippingMethod ?? (data.shippingAddress?.shipping_method as string | undefined);
  const isRelay = method === "dpd_relay";
  const shippingBannerBg = isRelay ? "#7C3AED" : "#2563EB";
  const shippingBannerText = isRelay ? "LIVRAISON DPD RELAIS PICKUP" : "LIVRAISON DPD DOMICILE";

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
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <img src="https://www.powerbug.fr/images/powerbug-logo.png" alt="PowerBug France" width="140" height="35" style="display:block;filter:brightness(0) invert(1);opacity:0.9;" />
                </td>
                <td style="vertical-align:middle;text-align:right;">
                  <div style="font-size:11px;color:#8DC63F;font-weight:600;text-transform:uppercase;letter-spacing:1px;">BON DE PRÉPARATION</div>
                  <div style="font-size:18px;font-weight:700;color:#ffffff;margin-top:2px;">n° ${esc(data.orderId.slice(0, 8).toUpperCase())}</div>
                  <div style="font-size:12px;color:#9CA3AF;margin-top:2px;">${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Shipping method banner -->
        <tr>
          <td style="background:${shippingBannerBg};padding:16px 40px;text-align:center;">
            <div style="font-size:18px;font-weight:800;color:#ffffff;text-transform:uppercase;letter-spacing:1px;">${shippingBannerText}</div>
            ${isRelay && !addr.relay_name ? '<div style="font-size:13px;color:#E9D5FF;margin-top:6px;font-weight:500;">Choisir le relais le plus proche de l\'adresse du client</div>' : ""}
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            ${isRelay && addr.relay_name ? `
            <!-- Relais choisi par le client -->
            <div style="background:#f3e8ff;border:2px solid #7C3AED;border-radius:8px;padding:20px;margin-bottom:32px;">
              <div style="font-size:13px;font-weight:700;color:#7C3AED;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">RELAIS CHOISI PAR LE CLIENT</div>
              <div style="font-size:18px;font-weight:700;line-height:1.4;">${esc(addr.relay_name)}</div>
              <div style="font-size:15px;color:#6B7280;margin-top:4px;">${esc(addr.relay_address)}</div>
              <div style="font-size:12px;color:#7C3AED;margin-top:8px;font-weight:600;">ID Relais : ${esc(addr.relay_id)}</div>
            </div>
            ` : ""}

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
            <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#6B7280;">${isRelay ? "Adresse du client" : "Adresse de livraison (DPD Domicile)"}</h2>
            <div style="background:#f9f9f9;border-left:4px solid ${isRelay ? "#7C3AED" : "#356B0D"};border-radius:4px;padding:20px;margin-bottom:32px;">
              <div style="font-size:16px;line-height:2;font-weight:500;">${addrHtml}</div>
            </div>

            <!-- Email client -->
            <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:32px;">
              <span style="font-size:13px;color:#6B7280;font-weight:600;">Email client : </span>
              <span style="font-size:14px;">${esc(data.customerEmail)}</span>
            </div>

            <p style="font-size:13px;color:#6B7280;margin:0;">
              Merci de préparer et expédier cette commande via DPD${isRelay ? " Relais Pickup" : ""}.<br>
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

// ─── Version texte bon de préparation ──────────────────────────────────────

export function preparationOrderText(data: OrderConfirmationData): string {
  const addr = data.shippingAddress;
  const method = data.shippingMethod ?? (addr?.shipping_method as string | undefined);
  const isRelay = method === "dpd_relay";

  const itemsText = data.items
    .map((item) => `- ${item.product_name}${item.variant_label && item.variant_label !== "standard" ? ` (${item.variant_label})` : ""} x${item.quantity}`)
    .join("\n");

  const addrText = [addr.name, addr.line1, addr.line2, `${addr.postal_code ?? ""} ${addr.city ?? ""}`.trim(), countryName(addr.country)]
    .filter(Boolean)
    .join("\n");

  let text = `Bon de preparation - Commande n° ${data.orderId.slice(0, 8).toUpperCase()}\n`;
  text += `${isRelay ? "Livraison DPD Relais Pickup" : "Livraison DPD Domicile"}\n\n`;

  if (isRelay && addr.relay_name) {
    text += `Relais choisi par le client :\n${addr.relay_name}\n${addr.relay_address ?? ""}\nID : ${addr.relay_id ?? ""}\n\n`;
  }

  text += `Articles a preparer :\n${itemsText}\n\n`;
  text += `Adresse du client :\n${addrText}\n\n`;
  text += `Email client : ${data.customerEmail}\n\n`;
  text += `Merci de preparer et expedier cette commande via DPD${isRelay ? " Relais Pickup" : ""}.\n`;
  text += `PowerBug France`;

  return text;
}

// ─── Notification expédition → client ───────────────────────────────────────

export interface ShippingNotificationData {
  customerName: string;
  orderId: string;
  trackingNumber: string;
}

export function shippingNotificationHtml(data: ShippingNotificationData): string {
  const trackingUrl = `https://trace.dpd.fr/parceldetails/${data.trackingNumber}`;

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
          <td style="background:#356B0D;padding:24px 40px;">
            <div style="font-size:18px;font-weight:600;color:#ffffff;">PowerBug France</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#0F0F10;">Votre commande est expediee</h1>
            <p style="margin:0 0 24px;color:#6B7280;font-size:14px;">Commande n° ${esc(data.orderId.slice(0, 8).toUpperCase())}</p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
              Bonjour ${esc(data.customerName)},<br><br>
              Bonne nouvelle ! Votre commande PowerBug a été expédiée via DPD.
              Vous pouvez suivre votre colis en temps réel grâce au lien ci-dessous.
            </p>

            <!-- Tracking -->
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;">
              <div style="font-size:13px;color:#6B7280;font-weight:600;margin-bottom:8px;">Numero de suivi DPD</div>
              <div style="font-size:20px;font-weight:700;color:#0F0F10;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">${esc(data.trackingNumber)}</div>
              <a href="${trackingUrl}" style="display:inline-block;background:#356B0D;color:#ffffff;font-weight:600;font-size:14px;padding:12px 32px;border-radius:10px;text-decoration:none;">
                Suivre mon colis
              </a>
            </div>

            <p style="font-size:14px;color:#6B7280;line-height:1.6;margin:0 0 24px;">
              Le délai de livraison est généralement de 2 à 4 jours ouvrés en France métropolitaine.
            </p>

            <p style="font-size:14px;color:#6B7280;margin:0;">
              Des questions ? Répondez à cet email ou contactez-nous sur
              <a href="https://powerbug.fr/contact" style="color:#356B0D;">powerbug.fr/contact</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — powerbug.fr</p>
            <p style="margin:8px 0 0;font-size:11px;color:#b0b0b0;">PRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — Domaine de Riquetti, 13290 Aix-en-Provence</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Version texte notification expedition ────────────────────────────────

export function shippingNotificationText(data: ShippingNotificationData): string {
  const trackingUrl = `https://trace.dpd.fr/parceldetails/${data.trackingNumber}`;

  return `Votre commande est expediee - n° ${data.orderId.slice(0, 8).toUpperCase()}

Bonjour ${data.customerName},

Votre commande PowerBug a ete expediee via DPD.

Numero de suivi : ${data.trackingNumber}
Suivre mon colis : ${trackingUrl}

Le delai de livraison est generalement de 2 a 4 jours ouvres en France metropolitaine.

Des questions ? Repondez a cet email ou contactez-nous sur powerbug.fr/contact

PowerBug France — powerbug.fr
PRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — Domaine de Riquetti, 13290 Aix-en-Provence`;
}

// ─── Alerte stock bas → admin ───────────────────────────────────────────────

export interface StockAlertData {
  productName: string;
  productSlug: string;
  currentStock: number;
  sku: string | null;
}

export function stockAlertHtml(alerts: StockAlertData[]): string {
  const rows = alerts
    .map(
      (a) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;font-size:14px;font-weight:500;">${esc(a.productName)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;font-size:14px;color:#6B7280;">${esc(a.sku) || "—"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #DBDBDB;text-align:center;font-size:16px;font-weight:700;color:${a.currentStock === 0 ? "#AE1717" : "#F6A429"};">${a.currentStock}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;color:#0F0F10;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#AE1717;padding:24px 40px;">
            <div style="font-size:12px;color:#fecaca;font-weight:600;text-transform:uppercase;letter-spacing:1px;">ALERTE STOCK</div>
            <div style="font-size:20px;font-weight:700;color:#ffffff;margin-top:4px;">Stock faible détecté</div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
              Les produits suivants ont un stock faible ou sont en rupture.
              Pensez à passer commande auprès de PowerBug UK.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <thead>
                <tr style="background:#f9f9f9;">
                  <th style="padding:10px 8px;text-align:left;font-size:13px;color:#6B7280;font-weight:600;">Produit</th>
                  <th style="padding:10px 8px;text-align:left;font-size:13px;color:#6B7280;font-weight:600;">SKU</th>
                  <th style="padding:10px 8px;text-align:center;font-size:13px;color:#6B7280;font-weight:600;">Stock</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
            <a href="https://powerbug.fr/admin/stock" style="display:inline-block;background:#356B0D;color:#ffffff;font-weight:600;font-size:14px;padding:10px 24px;border-radius:10px;text-decoration:none;">
              Voir le stock complet
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — Admin</p>
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
                <td style="padding:8px 0;font-size:14px;font-weight:600;">${esc(data.firstname)} ${esc(data.lastname)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#6B7280;">Email :</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:${esc(data.email)}" style="color:#356B0D;">${esc(data.email)}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#6B7280;">Sujet :</td>
                <td style="padding:8px 0;font-size:14px;">${esc(data.subject)}</td>
              </tr>
            </table>
            <div style="margin-top:24px;background:#f9f9f9;border-radius:8px;padding:20px;">
              <div style="font-size:13px;color:#6B7280;font-weight:600;margin-bottom:12px;">Message :</div>
              <div style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #DBDBDB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">PowerBug France — powerbug.fr</p>
            <p style="margin:8px 0 0;font-size:11px;color:#b0b0b0;">PRO GOLF DISTRIBUTION SASU — SIREN 888 311 610 — Domaine de Riquetti, 13290 Aix-en-Provence</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
