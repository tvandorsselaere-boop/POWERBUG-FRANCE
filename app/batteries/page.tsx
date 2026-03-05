import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Battery, Wrench } from "lucide-react";
import { batteries } from "@/lib/data/products";
import { AddToCartSimple } from "@/components/add-to-cart-simple";

export const metadata: Metadata = {
  title: "Piles & Pieces detachees - PowerBug France",
  description:
    "Batteries lithium de remplacement, roues, chargeurs et pieces detachees officielles PowerBug.",
};

export default function BatteriesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
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
        {batteries.map((item) => (
          <div
            key={item.slug}
            className="group rounded-2xl border border-[#DBDBDB] bg-white p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-[#F5F5F5]">
              {item.slug.includes("batterie") ? (
                <Battery className="h-12 w-12 text-[#DBDBDB] group-hover:text-[#8DC63F]" />
              ) : (
                <Wrench className="h-12 w-12 text-[#DBDBDB] group-hover:text-[#8DC63F]" />
              )}
            </div>
            <h2 className="font-semibold text-[#0F0F10]">{item.name}</h2>
            <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-[#0F0F10]">
                {item.price}
                <span className="text-sm text-[#6B7280]">&euro;</span>
              </span>
              <AddToCartSimple slug={item.slug} name={item.name} price={item.price} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
