"use client";

import Link from "next/link";
import Image from "next/image";
import { Settings, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

const BUNDLE_SLUGS = ["porte-parapluie", "scorecard-holder"];

type Props = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image?: { url: string; alt_text: string | null } | null;
  basePath?: string;
};

export function AccessoireCard({ slug, name, description, price, image, basePath = "/accessoires" }: Props) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isBundle = BUNDLE_SLUGS.includes(slug);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group card-glass rounded-2xl p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg flex flex-col">
      <Link href={`${basePath}/${slug}`} className="flex-1">
        <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-[#F5F5F5]">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt_text ?? name}
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
            Offert avec un chariot
          </span>
        )}

        <h2 className="text-lg font-semibold text-[#0F0F10] group-hover:text-[#356B0D]">
          {name}
        </h2>
        <p className="mt-1 text-sm text-[#6B7280] line-clamp-2">{description}</p>

        <p className="mt-4 text-2xl font-bold text-[#0F0F10]">
          {price}<span className="text-sm font-normal text-[#6B7280]">&euro;</span>
        </p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full btn-glass rounded-[10px] py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity"
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Ajouté !
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </>
        )}
      </button>
    </div>
  );
}
