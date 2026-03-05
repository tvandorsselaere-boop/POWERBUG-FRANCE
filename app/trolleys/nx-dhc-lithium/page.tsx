import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX DHC Lithium - Chariot electrique premium",
  description:
    "Le PowerBug NX DHC Lithium : Downhill Control, frein parking electronique, batterie lithium 36 trous. 999 EUR.",
};

export const revalidate = 3600;

export default async function NxDhcLithiumPage() {
  const product = await getProductBySlug("nx-dhc-lithium");
  if (!product) notFound();
  return <ProductPageDb product={product} />;
}
