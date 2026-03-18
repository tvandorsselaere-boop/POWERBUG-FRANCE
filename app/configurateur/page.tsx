"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShoppingCart,
  Zap,
  Check,
  Settings,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import {
  trolleys,
  accessories,
} from "@/lib/data/products";

// 2 accessoires OFFERTS avec tout achat chariot (source: Fred, mars 2026 — aligné Golf des Marques)
const BUNDLE_SLUGS = ["porte-parapluie", "scorecard-holder"];
const BUNDLE_VALUE = 30 + 30; // Porte-parapluie + Porte-scorecard

export default function ConfigurateurPage() {
  const [selectedTrolley, setSelectedTrolley] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const trolley = trolleys.find((t) => t.slug === selectedTrolley);
  const { addItem } = useCartStore();

  const toggleExtra = (slug: string) => {
    // Ne pas permettre de décocher les accessoires du bundle
    if (BUNDLE_SLUGS.includes(slug)) return;
    setSelectedExtras((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Accessoires supplémentaires (hors bundle)
  const extraAccessories = accessories.filter((a) =>
    selectedExtras.includes(a.slug) && !BUNDLE_SLUGS.includes(a.slug)
  );
  const extrasFullPrice = extraAccessories.reduce((sum, a) => sum + a.price, 0);
  const total = (trolley?.price ?? 0) + extrasFullPrice;

  // Accessoires bundle (toujours inclus quand un trolley est choisi)
  const bundleAccessories = accessories.filter((a) => BUNDLE_SLUGS.includes(a.slug));

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Configurateur</span>
      </nav>

      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Configurez votre chariot
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-[#6B7280]">
          Choisissez votre modele et recevez{" "}
          <span className="font-semibold text-[#356B0D]">
            2 accessoires offerts (~60&euro;)
          </span>{" "}
          avec votre achat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left: config */}
        <div className="space-y-10 lg:col-span-2">
          {/* Step 1: Trolley */}
          <div>
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#0F0F10]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
                1
              </span>
              Choisissez votre chariot
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {trolleys.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setSelectedTrolley(t.slug)}
                  className={`rounded-xl border p-6 text-left transition-all ${
                    selectedTrolley === t.slug
                      ? "border-[#356B0D] bg-[#356B0D]/5 shadow-md"
                      : "border-[#DBDBDB] bg-white hover:border-[#356B0D]/30 hover:shadow"
                  }`}
                >
                  <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-[#F5F5F5] overflow-hidden">
                    {t.slug === "nx-lithium" || t.slug === "nx-dhc-lithium" ? (
                      <Image
                        src={
                          t.slug === "nx-lithium"
                            ? "/images/produit/nx/PowerBug-NX-Main-1.jpg"
                            : "/images/produit/nx-dhc/PowerBug-NX-Main-1-DHC.jpg"
                        }
                        alt={t.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <Zap className={`h-12 w-12 ${selectedTrolley === t.slug ? "text-[#8DC63F]" : "text-[#DBDBDB]"}`} />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#0F0F10]">
                        {t.name.replace("PowerBug ", "")}
                      </h3>
                      <p className="text-sm text-[#6B7280]">{t.badge}</p>
                    </div>
                    <span className="text-xl font-bold text-[#0F0F10]">
                      {t.price}
                      <span className="text-sm text-[#6B7280]">&euro;</span>
                    </span>
                  </div>
                  {selectedTrolley === t.slug && (
                    <div className="mt-3 flex items-center gap-1 text-sm text-[#356B0D]">
                      <Check className="h-4 w-4" />
                      Selectionne
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bundle offert banner */}
          {trolley && (
            <div className="rounded-xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-5">
              <div className="mb-4 flex items-center gap-3">
                <Gift className="h-6 w-6 shrink-0 text-[#356B0D]" />
                <div>
                  <p className="font-semibold text-[#356B0D]">
                    2 accessoires offerts avec votre chariot (~{BUNDLE_VALUE.toFixed(0)}&euro; de valeur)
                  </p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">
                    Inclus automatiquement avec tout achat de chariot PowerBug NX
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {bundleAccessories.map((acc) => (
                  <div
                    key={acc.slug}
                    className="flex items-center gap-2 rounded-lg bg-white p-3 border border-[#356B0D]/20"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#356B0D]" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#0F0F10] truncate">
                        {acc.name}
                      </p>
                      <p className="text-xs text-[#356B0D]">
                        Valeur {acc.price}&euro;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bundle photo */}
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src="/images/lifestyle/NX-Lifestyle-50-Essential-Accessory-Bundle.jpg"
                  alt="Bundle 3 accessoires offerts PowerBug NX"
                  width={800}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Step 2: Accessories extras */}
          <div>
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#0F0F10]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
                2
              </span>
              Ajoutez des accessoires supplementaires
              <span className="text-sm font-normal text-[#6B7280]">
                (optionnel)
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {accessories
                .filter((a) => !BUNDLE_SLUGS.includes(a.slug))
                .map((acc) => {
                  const isSelected = selectedExtras.includes(acc.slug);
                  return (
                    <button
                      key={acc.slug}
                      onClick={() => toggleExtra(acc.slug)}
                      className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#356B0D] bg-[#356B0D]/5 shadow"
                          : "border-[#DBDBDB] bg-white hover:border-[#356B0D]/30"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? "bg-[#356B0D]/10" : "bg-[#F5F5F5]"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="h-5 w-5 text-[#356B0D]" />
                        ) : (
                          <Settings className="h-5 w-5 text-[#DBDBDB]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[#0F0F10] truncate">
                          {acc.name}
                        </h3>
                        <p className="text-xs text-[#6B7280] truncate">
                          {acc.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-bold text-[#0F0F10]">
                          {acc.price}&euro;
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 card-glass rounded-2xl p-6">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#0F0F10]">
              <ShoppingCart className="h-5 w-5 text-[#356B0D]" />
              Recapitulatif
            </h2>

            {!trolley && selectedExtras.length === 0 ? (
              <p className="text-sm text-[#6B7280]">
                Selectionnez un chariot pour commencer.
              </p>
            ) : (
              <div className="space-y-4">
                {/* Trolley */}
                {trolley && (
                  <div className="flex items-center justify-between border-b border-[#DBDBDB]/50 pb-4">
                    <div>
                      <p className="font-medium text-[#0F0F10]">
                        {trolley.name.replace("PowerBug ", "")}
                      </p>
                      <p className="text-xs text-[#6B7280]">Chariot</p>
                    </div>
                    <span className="font-bold text-[#0F0F10]">
                      {trolley.price}&euro;
                    </span>
                  </div>
                )}

                {/* Bundle offert */}
                {trolley && (
                  <div className="space-y-2 border-b border-[#DBDBDB]/50 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#356B0D]">
                      Inclus offerts
                    </p>
                    {bundleAccessories.map((acc) => (
                      <div
                        key={acc.slug}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex items-center gap-1 text-[#6B7280]">
                          <Gift className="h-3 w-3 text-[#356B0D]" />
                          {acc.name}
                        </span>
                        <span className="text-[#356B0D] font-medium">
                          Offert
                        </span>
                      </div>
                    ))}
                    <p className="text-right text-xs text-[#356B0D]">
                      ~{BUNDLE_VALUE.toFixed(0)}&euro; d&apos;accessoires offerts
                    </p>
                  </div>
                )}

                {/* Extra accessories */}
                {extraAccessories.length > 0 && (
                  <div className="space-y-2 border-b border-[#DBDBDB]/50 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      Accessoires supplementaires
                    </p>
                    {extraAccessories.map((acc) => (
                      <div
                        key={acc.slug}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#6B7280]">{acc.name}</span>
                        <span className="text-[#0F0F10]">{acc.price}&euro;</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between border-t border-[#DBDBDB] pt-4">
                  <span className="text-lg font-bold text-[#0F0F10]">Total</span>
                  <span className="text-2xl font-bold text-[#0F0F10]">
                    {total.toFixed(2)}
                    <span className="text-sm text-[#6B7280]">&euro;</span>
                  </span>
                </div>

                <Button
                  className="w-full btn-glass rounded-[10px] text-white"
                  size="lg"
                  disabled={!trolley}
                  onClick={() => {
                    if (!trolley) return;
                    addItem({ slug: trolley.slug, name: trolley.name, price: trolley.price, compare_at_price: trolley.comparePrice });
                    // Accessoires bundle à 0€
                    bundleAccessories.forEach((acc) => {
                      addItem({ slug: acc.slug, name: acc.name, price: 0 });
                    });
                    // Accessoires extras au plein tarif
                    extraAccessories.forEach((acc) => {
                      addItem({ slug: acc.slug, name: acc.name, price: acc.price });
                    });
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
