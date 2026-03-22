import { NextResponse } from "next/server";
import { getProducts, type DbProduct } from "@/lib/supabase/queries";

export const revalidate = 3600; // ISR: rebuild every hour

const SITE_URL = "https://www.powerbug.fr";

/** Build the canonical product URL based on category */
function productUrl(product: DbProduct): string {
  const catSlug = product.category?.slug;
  if (catSlug === "chariots-electriques") {
    return `${SITE_URL}/trolleys/${product.slug}`;
  }
  // Accessories, batteries, pieces-detachees all go through /accessoires/[slug]
  return `${SITE_URL}/accessoires/${product.slug}`;
}

/** Ensure image URL is absolute */
function absoluteImageUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Strip leading slash if present to avoid double slash
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

/** Get the primary image URL, falling back to first image or empty string */
function primaryImage(product: DbProduct): string {
  const images = product.product_images ?? [];
  // Sort by position, prefer is_primary
  const primary = images.find((img) => img.is_primary);
  if (primary) return absoluteImageUrl(primary.url);
  // Fallback: first image by position
  const sorted = [...images].sort((a, b) => a.position - b.position);
  if (sorted.length > 0) return absoluteImageUrl(sorted[0].url);
  return "";
}

/** Get the selling price (actual price the customer pays) */
function sellingPrice(product: DbProduct): number {
  const variant = product.product_variants?.[0];
  if (variant) return variant.price;
  return product.base_price;
}

/** Get the compare-at price (original/strikethrough price) if it exists */
function compareAtPrice(product: DbProduct): number | null {
  const variant = product.product_variants?.[0];
  return variant?.compare_at_price ?? null;
}

/** Format price for Google Merchant: "799.00 EUR" */
function formatPrice(amount: number): string {
  return `${amount.toFixed(2)} EUR`;
}

/** Map category slug to a Google product_type taxonomy string */
function productType(product: DbProduct): string {
  const catSlug = product.category?.slug;
  switch (catSlug) {
    case "chariots-electriques":
      return "Sports &gt; Golf &gt; Chariots électriques";
    case "accessoires-trolley":
      return "Sports &gt; Golf &gt; Accessoires chariots";
    case "batteries":
      return "Sports &gt; Golf &gt; Batteries &amp; Chargeurs";
    case "pieces-detachees":
      return "Sports &gt; Golf &gt; Pièces détachées";
    default:
      return "Sports &gt; Golf";
  }
}

/** Shipping price: trolleys 14.90, everything else 3.90 */
function shippingPrice(product: DbProduct): string {
  const catSlug = product.category?.slug;
  if (catSlug === "chariots-electriques") return "14.90";
  return "3.90";
}

/** Strip HTML tags from description */
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}

/** Escape XML special characters */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Build one <item> XML block for a product */
function productToItem(product: DbProduct): string {
  const selling = sellingPrice(product);
  const compareAt = compareAtPrice(product);
  const imgUrl = primaryImage(product);
  const desc = escapeXml(stripHtml(product.description || product.name));
  const title = escapeXml(product.name);
  const link = productUrl(product);
  const availability =
    product.product_variants?.[0]?.stock_status === "out_of_stock"
      ? "out of stock"
      : "in stock";

  // Price logic: if compare_at_price exists, it is the original (higher) price
  // and the selling price is the sale price
  let priceXml: string;
  if (compareAt && compareAt > selling) {
    priceXml = `      <g:price>${formatPrice(compareAt)}</g:price>
      <g:sale_price>${formatPrice(selling)}</g:sale_price>`;
  } else {
    priceXml = `      <g:price>${formatPrice(selling)}</g:price>`;
  }

  const imageXml = imgUrl
    ? `      <g:image_link>${escapeXml(imgUrl)}</g:image_link>`
    : "";

  return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${escapeXml(link)}</g:link>
${imageXml}
${priceXml}
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>PowerBug</g:brand>
      <g:product_type>${productType(product)}</g:product_type>
      <g:shipping>
        <g:country>FR</g:country>
        <g:price>${shippingPrice(product)} EUR</g:price>
      </g:shipping>
      <g:identifier_exists>false</g:identifier_exists>
    </item>`;
}

export async function GET() {
  try {
    const products = await getProducts();

    const items = products.map(productToItem).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PowerBug France - Chariots électriques de golf</title>
    <link>${SITE_URL}</link>
    <description>Distributeur exclusif PowerBug en France. Chariots électriques de golf, accessoires, batteries et pièces détachées.</description>
${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating product feed:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PowerBug France</title>
    <link>${SITE_URL}</link>
    <description>Feed temporarily unavailable</description>
  </channel>
</rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}
