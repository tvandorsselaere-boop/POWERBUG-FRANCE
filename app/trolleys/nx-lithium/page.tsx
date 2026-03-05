import { Metadata } from "next";
import { ProductPage } from "@/components/product-page";
import { trolleys } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "PowerBug NX Lithium - Chariot electrique de golf",
  description:
    "Le PowerBug NX Lithium : chariot electrique compact, batterie lithium 36 trous, pliage VRAP. A partir de 399 EUR. Livraison France.",
};

export default function NxLithiumPage() {
  const product = trolleys.find((t) => t.slug === "nx-lithium")!;
  return <ProductPage product={product} />;
}
