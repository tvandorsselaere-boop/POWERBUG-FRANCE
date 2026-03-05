"use client";

import { useState } from "react";
import Link from "next/link";
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
  bundleAccessories,
  BUNDLE_VALUE,
} from "@/lib/data/products";

export default function ConfigurateurPage() {
  const [selectedTrolley, setSelectedTrolley] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const trolley = trolleys.find((t) => t.slug === selectedTrolley);
  const { addItem, addTrolleyBundle } = useCartStore();

  const extraAccessories = accessories.filter(
    (a) => !bundleAccessories.includes(a.slug)
  );
  const bundleItems = accessories.filter((a) =>
    bundleAccessories.includes(a.slug)
  );

  const toggleExtra = (slug: string) => {
    setSelectedExtras((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const extrasTotal = extraAccessories
    .filter((a) => selectedExtras.includes(a.slug))
    .reduce((sum, a) => sum + a.price, 0);

  const total = (trolley?.price ?? 0) + extrasTotal;

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
          Configurez votre trolley
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-[#6B7280]">
          Choisissez votre modele et recevez{" "}
          <span className="font-semibold text-[#356B0D]">
            3 accessoires offerts
          </span>{" "}
          d&apos;une valeur de {BUNDLE_VALUE.toFixed(2)}&euro;.
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
                  <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-[#F5F5F5]">
                    <Zap
                      className={`h-12 w-12 ${
                        selectedTrolley === t.slug
                          ? "text-[#8DC63F]"
                          : "text-[#DBDBDB]"
                      }`}
                    />
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

          {/* Bundle included */}
          {trolley && (
            <div>
              <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#0F0F10]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8DC63F] text-sm font-bold text-white">
                  <Gift className="h-4 w-4" />
                </span>
                Accessoires offerts
                <span className="text-sm font-normal text-[#356B0D]">
                  inclus avec votre chariot
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {bundleItems.map((acc) => (
                  <div
                    key={acc.slug}
                    className="flex items-center gap-3 rounded-xl border border-[#8DC63F]/30 bg-[#8DC63F]/5 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#8DC63F]/20">
                      <Gift className="h-5 w-5 text-[#356B0D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#0F0F10] truncate">
                        {acc.name}
                      </h3>
                      <p className="text-xs text-[#356B0D]">
                        OFFERT{" "}
                        <span className="text-[#6B7280] line-through">
                          {acc.price}&euro;
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Extra accessories */}
          <div>
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#0F0F10]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
                {trolley ? "2" : "2"}
              </span>
              Accessoires supplementaires
              <span className="text-sm font-normal text-[#6B7280]">
                (optionnel)
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {extraAccessories.map((acc) => {
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
                    <span className="shrink-0 font-bold text-[#0F0F10]">
                      {acc.price}
                      <span className="text-xs text-[#6B7280]">&euro;</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-[#DBDBDB] bg-white p-6 shadow-sm">
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

                {/* Bundle items */}
                {trolley && (
                  <div className="space-y-2 border-b border-[#DBDBDB]/50 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#356B0D]">
                      Accessoires offerts
                    </p>
                    {bundleItems.map((acc) => (
                      <div
                        key={acc.slug}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#6B7280]">{acc.name}</span>
                        <span className="text-[#356B0D] font-medium">
                          OFFERT
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Extra accessories */}
                {selectedExtras.length > 0 && (
                  <div className="space-y-2 border-b border-[#DBDBDB]/50 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      Accessoires supplementaires
                    </p>
                    {extraAccessories
                      .filter((a) => selectedExtras.includes(a.slug))
                      .map((acc) => (
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

                {/* Savings */}
                {trolley && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#356B0D] font-medium">Economie bundle</span>
                    <span className="font-bold text-[#356B0D]">
                      -{BUNDLE_VALUE.toFixed(2)}&euro;
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between border-t border-[#DBDBDB] pt-4">
                  <span className="text-lg font-bold text-[#0F0F10]">Total</span>
                  <span className="text-2xl font-bold text-[#0F0F10]">
                    {total}
                    <span className="text-sm text-[#6B7280]">&euro;</span>
                  </span>
                </div>

                <Button
                  className="w-full rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509]"
                  size="lg"
                  disabled={!trolley}
                  onClick={() => {
                    if (!trolley) return;
                    addTrolleyBundle(
                      { slug: trolley.slug, name: trolley.name, price: trolley.price },
                      bundleItems.map((b) => ({ slug: b.slug, name: b.name, price: b.price }))
                    );
                    selectedExtras.forEach((slug) => {
                      const acc = extraAccessories.find((a) => a.slug === slug);
                      if (acc) addItem({ slug: acc.slug, name: acc.name, price: acc.price });
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
