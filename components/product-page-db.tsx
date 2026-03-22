import Link from "next/link";
import { ChevronRight, Check, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGallery } from "@/components/product-gallery";
import { TrolleyFeatures } from "@/components/trolley-features";
import { ReviewsSection } from "@/components/reviews-section";
import { VideoSection } from "@/components/video-section";
import type { DbProduct } from "@/lib/supabase/queries";

export function ProductPageDb({ product }: { product: DbProduct }) {
  const categorySlug = product.category?.slug ?? "";
  const isTrolley = categorySlug === "chariots-electriques";
  const isAccessoire = categorySlug === "accessoires-trolley";
  const variant = product.product_variants?.[0];
  const price = variant?.price ?? product.base_price;
  const comparePrice = variant?.compare_at_price ?? null;
  const specs = product.specs ?? {};
  const images = product.product_images?.sort((a, b) => a.position - b.position) ?? [];

  // Short teaser: first sentence(s) up to ~200 chars
  const description = product.description ?? "";
  const sentences = description.split(/(?<=\.)\s+/);
  const teaser = sentences.length > 1
    ? sentences[0]
    : description.length > 200
      ? description.slice(0, 200).trimEnd() + "\u2026"
      : description;

  const isPiece = categorySlug === "pieces-detachees";
  const categoryLabel = isTrolley ? "Chariots" : isAccessoire ? "Accessoires" : isPiece ? "Pièces détachées" : "Batteries";
  const categoryHref = isTrolley ? "/trolleys" : isAccessoire ? "/accessoires" : isPiece ? "/pieces-detachees" : "/batteries";

  // Build a Product-compatible object for AddToCartButton
  const cartProduct = {
    slug: product.slug,
    name: product.name,
    price,
    comparePrice: comparePrice ?? undefined,
    description: product.description,
    longDescription: product.description,
    specs: Object.entries(specs).map(([label, value]) => ({ label, value: String(value) })),
    features: [],
    category: (isTrolley ? "trolley" : isAccessoire ? "accessoire" : "batterie") as "trolley" | "accessoire" | "batterie",
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.powerbug.fr" },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: `https://www.powerbug.fr${categoryHref}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.powerbug.fr${categoryHref}/${product.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={categoryHref} className="hover:text-[#356B0D]">{categoryLabel}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col justify-center">
          {isTrolley && (
            <Badge className="mb-3 w-fit rounded-full bg-[#356B0D]/10 text-[#356B0D] hover:bg-[#356B0D]/10">
              {product.slug === "nx-dhc-lithium" ? "Premium" : "Populaire"}
            </Badge>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-[#6B7280]">
            {teaser}
          </p>

          {/* Bundle banner for trolleys */}
          {isTrolley && (
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#356B0D]/5 border border-[#356B0D]/20 p-4">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
              <div>
                <p className="text-sm font-semibold text-[#356B0D]">
                  2 accessoires offerts (~60&euro;)
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Porte-scorecard + Porte-parapluie inclus offerts avec votre achat
                </p>
              </div>
            </div>
          )}

          {/* Specs from DB */}
          {Object.keys(specs).length > 0 && (
            <div className="mt-8 space-y-3">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-[#DBDBDB]/50 pb-3 text-sm"
                >
                  <span className="text-[#6B7280] capitalize">{key.replace(/_/g, " ")}</span>
                  <span className="font-medium text-[#0F0F10]">{String(value)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Stock */}
          {variant && (
            <div className="mt-4">
              {variant.stock_status === "in_stock" ? (
                <p className="flex items-center gap-1 text-sm text-[#356B0D]">
                  <Check className="h-4 w-4" />
                  En stock
                </p>
              ) : (
                <p className="text-sm text-[#AE1717]">Rupture de stock</p>
              )}
            </div>
          )}

          {/* Price + CTA */}
          <div className="mt-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#0F0F10]">
                {price}<span className="text-xl text-[#6B7280]">&euro;</span>
              </span>
              {comparePrice && (
                <span className="text-xl text-[#DBDBDB] line-through">
                  {comparePrice}&euro;
                </span>
              )}
              {comparePrice && (
                <span className="rounded-full bg-[#AE1717] px-2 py-0.5 text-xs font-bold text-white">
                  -{Math.round(comparePrice - price)}&euro;
                </span>
              )}
            </div>

            <div className="mt-4">
              <AddToCartButton product={cartProduct} className="px-8 text-base font-semibold" outOfStock={variant?.stock_status === "out_of_stock"} />
              <p className="mt-3 text-sm text-[#6B7280]">
                {isTrolley
                  ? "+ 14,90\u00A0\u20AC — Livraison DPD à domicile, France métropolitaine"
                  : "+ 3,90\u00A0\u20AC — Livraison DPD Relais, France métropolitaine (hors Corse, Monaco)"}
              </p>
            </div>
          </div>

          {isAccessoire && (
            <p className="mt-4 flex items-center gap-1 text-sm text-[#356B0D]">
              <Gift className="h-4 w-4" />
              Certains accessoires sont offerts avec l&apos;achat d&apos;un chariot
            </p>
          )}
        </div>
      </div>

      {/* Full description */}
      {description.length > teaser.length && (
        <div className="mt-16 border-t border-[#DBDBDB] pt-12">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Description</h2>
          <div className="prose prose-gray max-w-none">
            {description.split("\n").filter(Boolean).map((para, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed text-[#0F0F10]">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Trolley-specific sections */}
      {isTrolley && (
        <>
          <TrolleyFeatures slug={product.slug} />
          <VideoSection slug={product.slug} />
          <ReviewsSection />
        </>
      )}
    </div>
  );
}
