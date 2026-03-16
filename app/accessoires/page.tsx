import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAccessories } from "@/lib/supabase/queries";
import { AccessoireCard } from "@/components/accessoire-card";

export const metadata: Metadata = {
  title: "Accessoires PowerBug",
  description:
    "Tous les accessoires officiels PowerBug : housse de transport, porte-parapluie, support telephone, mitaines chauffantes et plus.",
};

export const revalidate = 3600;

export default async function AccessoiresPage() {
  const accessories = await getAccessories();

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Accessoires</span>
      </nav>

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Accessoires PowerBug
        </h1>
        <p className="mt-3 text-lg text-[#6B7280]">
          Personnalisez votre chariot avec nos accessoires officiels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((acc) => {
          const price = acc.product_variants?.[0]?.price ?? acc.base_price;
          const image = acc.product_images?.[0] ?? null;
          return (
            <AccessoireCard
              key={acc.id}
              id={acc.id}
              slug={acc.slug}
              name={acc.name}
              description={acc.description}
              price={price}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
}
