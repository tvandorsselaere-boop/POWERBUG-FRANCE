import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX Lithium - Chariot electrique de golf",
  description:
    "Le PowerBug NX Lithium : chariot electrique 28V, batterie lithium 36 trous, pliage VRAP. 799 EUR. Livraison France.",
  alternates: { canonical: "/trolleys/nx-lithium" },
};

export const revalidate = 3600;

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PowerBug NX Lithium",
  description: "Chariot électrique de golf 28V, batterie lithium 36 trous, pliage VRAP ultra-compact.",
  brand: { "@type": "Brand", name: "PowerBug" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "799",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.powerbug.fr/trolleys/nx-lithium",
  },
};

export default async function NxLithiumPage() {
  const product = await getProductBySlug("nx-lithium");
  if (!product) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <ProductPageDb product={product} />
    </>
  );
}
