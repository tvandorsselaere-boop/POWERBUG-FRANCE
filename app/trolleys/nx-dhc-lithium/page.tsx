import { Metadata } from "next";
import { ProductPage } from "@/components/product-page";
import { trolleys } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "PowerBug NX DHC Lithium - Chariot electrique premium",
  description:
    "Le PowerBug NX DHC Lithium : Downhill Control, frein parking electronique, port USB, batterie lithium 36 trous. A partir de 449 EUR.",
};

export default function NxDhcLithiumPage() {
  const product = trolleys.find((t) => t.slug === "nx-dhc-lithium")!;
  return <ProductPage product={product} />;
}
