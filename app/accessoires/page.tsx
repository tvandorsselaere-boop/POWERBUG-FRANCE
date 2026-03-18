import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAccessories } from "@/lib/supabase/queries";
import { SortableGrid } from "@/components/sortable-grid";

export const metadata: Metadata = {
  title: "Accessoires PowerBug",
  description:
    "Tous les accessoires officiels PowerBug : housse de transport, porte-parapluie, support telephone, mitaines chauffantes et plus.",
};

export const revalidate = 3600;

export default async function AccessoiresPage() {
  const accessories = await getAccessories();
  const products = accessories.map((acc) => ({
    id: acc.id,
    slug: acc.slug,
    name: acc.name,
    description: acc.description,
    price: acc.product_variants?.[0]?.price ?? acc.base_price,
    image: acc.product_images?.[0] ?? null,
  }));

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Accessoires</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Accessoires PowerBug
        </h1>
        <p className="mt-3 text-lg text-[#6B7280]">
          Personnalisez votre chariot avec nos accessoires officiels.
        </p>
      </div>

      <SortableGrid products={products} />
    </div>
  );
}
