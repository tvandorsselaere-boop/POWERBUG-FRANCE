import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Settings, Gift } from "lucide-react";
import { getAccessories } from "@/lib/supabase/queries";

const BUNDLE_SLUGS = ["housse-transport", "porte-boisson", "porte-parapluie"];

export const metadata: Metadata = {
  title: "Accessoires PowerBug",
  description:
    "Tous les accessoires officiels PowerBug : housse, porte-parapluie, siege, roues hiver, telemetre et plus.",
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

      <div className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Accessoires PowerBug
        </h1>
        <p className="mt-3 text-lg text-[#6B7280]">
          Personnalisez votre trolley avec nos accessoires officiels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((acc) => {
          const price = acc.product_variants?.[0]?.price ?? acc.base_price;
          const isBundle = BUNDLE_SLUGS.includes(acc.slug);
          return (
            <Link
              key={acc.id}
              href={`/accessoires/${acc.slug}`}
              className="group card-glass rounded-2xl p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-[#F5F5F5]">
                {acc.product_images?.[0] ? (
                  <Image
                    src={acc.product_images[0].url}
                    alt={acc.product_images[0].alt_text ?? acc.name}
                    width={300}
                    height={300}
                    className="h-full w-full rounded-xl object-contain p-4"
                  />
                ) : (
                  <Settings className="h-12 w-12 text-[#DBDBDB] transition-colors group-hover:text-[#8DC63F]" />
                )}
              </div>

              {isBundle && (
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#356B0D]/10 px-2 py-0.5 text-xs font-medium text-[#356B0D]">
                  <Gift className="h-3 w-3" />
                  Offert avec un trolley
                </span>
              )}

              <h2 className="text-lg font-semibold text-[#0F0F10] group-hover:text-[#356B0D]">
                {acc.name}
              </h2>
              <p className="mt-1 text-sm text-[#6B7280] line-clamp-2">
                {acc.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#0F0F10]">
                  {price}<span className="text-sm text-[#6B7280]">&euro;</span>
                </span>
                <span className="text-sm font-medium text-[#356B0D] opacity-0 transition-opacity group-hover:opacity-100">
                  Voir &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
