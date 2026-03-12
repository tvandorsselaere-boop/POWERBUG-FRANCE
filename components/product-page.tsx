import Link from "next/link";
import { ChevronRight, Zap, Check, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data/products";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductPage({ product }: { product: Product }) {
  const isTrolley = product.category === "trolley";

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        {product.category === "trolley" && (
          <>
            <Link href="/trolleys" className="hover:text-[#356B0D]">
              Chariots
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        {product.category === "accessoire" && (
          <>
            <Link href="/accessoires" className="hover:text-[#356B0D]">
              Accessoires
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        {product.category === "batterie" && (
          <>
            <Link href="/batteries" className="hover:text-[#356B0D]">
              Piles & Pieces
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="text-[#0F0F10]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image placeholder */}
        <div className="flex items-center justify-center rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] aspect-square">
          <Zap className="h-24 w-24 text-[#DBDBDB]" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {product.badge && (
            <Badge className="mb-3 w-fit rounded-full bg-[#356B0D]/10 text-[#356B0D] hover:bg-[#356B0D]/10">
              {product.badge}
            </Badge>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-[#6B7280]">
            {product.longDescription}
          </p>

          {/* Bundle banner for trolleys */}
          {isTrolley && (
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#356B0D]/5 border border-[#356B0D]/20 p-4">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
              <div>
                <p className="text-sm font-semibold text-[#356B0D]">
                  3 accessoires offerts (~105&euro;)
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Travel Cover + Umbrella Holder + Score Card Holder inclus offerts avec votre achat
                </p>
              </div>
            </div>
          )}

          {/* Specs */}
          <div className="mt-8 space-y-3">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between border-b border-[#DBDBDB]/50 pb-3 text-sm"
              >
                <span className="text-[#6B7280]">{spec.label}</span>
                <span className="font-medium text-[#0F0F10]">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <ul className="mt-8 space-y-2">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-[#0F0F10]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8DC63F]" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="mt-10 flex items-center gap-6">
            <span className="text-4xl font-bold text-[#0F0F10]">
              {product.price}
              <span className="text-xl text-[#6B7280]">&euro;</span>
            </span>

            <AddToCartButton product={product} className="px-8 text-base font-semibold" />
          </div>

          {isTrolley && (
            <p className="mt-4 text-sm text-[#6B7280]">
              Livraison gratuite en France metropolitaine
            </p>
          )}

          {product.category === "accessoire" && (
            <p className="mt-4 flex items-center gap-1 text-sm text-[#356B0D]">
              <Gift className="h-4 w-4" />
              Certains accessoires offerts avec l&apos;achat d&apos;un trolley
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
