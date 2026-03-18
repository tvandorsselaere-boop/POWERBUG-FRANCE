import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX DHC Lithium - Chariot electrique premium",
  description:
    "Le PowerBug NX DHC Lithium : Downhill Control, frein parking electronique, batterie lithium 36 trous. 899 EUR. Livraison France.",
  alternates: { canonical: "/trolleys/nx-dhc-lithium" },
};

export const revalidate = 3600;

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PowerBug NX DHC Lithium",
  description: "Chariot électrique de golf premium avec Downhill Control, frein parking électronique et batterie lithium 36 trous.",
  brand: { "@type": "Brand", name: "PowerBug" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "899",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.powerbug.fr/trolleys/nx-dhc-lithium",
  },
};

export default async function NxDhcLithiumPage() {
  const product = await getProductBySlug("nx-dhc-lithium");
  if (!product) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <ProductPageDb product={product} />
    </>
  );
}
