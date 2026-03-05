import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Battery, Wrench } from "lucide-react";
import { getBatteries } from "@/lib/supabase/queries";
import { AddToCartSimple } from "@/components/add-to-cart-simple";

export const metadata: Metadata = {
  title: "Piles & Pieces detachees - PowerBug France",
  description:
    "Batteries lithium de remplacement, roues, chargeurs et pieces detachees officielles PowerBug.",
};

export const revalidate = 3600;

export default async function BatteriesPage() {
  const items = await getBatteries();

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Piles & Pieces</span>
      </nav>

      <div className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Piles & Pieces detachees
        </h1>
        <p className="mt-3 text-lg text-[#6B7280]">
          Pieces officielles PowerBug pour maintenir votre trolley en parfait etat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const price = item.product_variants?.[0]?.price ?? item.base_price;
          const isBattery = item.category?.slug === "batteries";
          return (
            <div
              key={item.id}
              className="group rounded-2xl border border-[#DBDBDB] bg-white p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
            >
              <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-[#F5F5F5]">
                {item.product_images?.[0] ? (
                  <Image
                    src={item.product_images[0].url}
                    alt={item.product_images[0].alt_text ?? item.name}
                    width={300}
                    height={300}
                    className="h-full w-full rounded-xl object-contain p-4"
                  />
                ) : isBattery ? (
                  <Battery className="h-12 w-12 text-[#DBDBDB] group-hover:text-[#8DC63F]" />
                ) : (
                  <Wrench className="h-12 w-12 text-[#DBDBDB] group-hover:text-[#8DC63F]" />
                )}
              </div>
              <h2 className="font-semibold text-[#0F0F10]">{item.name}</h2>
              <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-[#0F0F10]">
                  {price}<span className="text-sm text-[#6B7280]">&euro;</span>
                </span>
                <AddToCartSimple slug={item.slug} name={item.name} price={price} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
