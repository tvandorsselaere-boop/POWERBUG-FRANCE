import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX Lithium - Chariot electrique de golf",
  description:
    "Le PowerBug NX Lithium : chariot electrique 28V, batterie lithium 36 trous, pliage VRAP. 899 EUR. Livraison France.",
};

export const revalidate = 3600; // revalidate every hour

export default async function NxLithiumPage() {
  const product = await getProductBySlug("nx-lithium");
  if (!product) notFound();
  return <ProductPageDb product={product} />;
}
