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
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import {
  trolleys,
  accessories,
  ACCESSORY_DISCOUNT,
} from "@/lib/data/products";

export default function ConfigurateurPage() {
  const [selectedTrolley, setSelectedTrolley] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const trolley = trolleys.find((t) => t.slug === selectedTrolley);
  const { addItem } = useCartStore();

  const toggleExtra = (slug: string) => {
    setSelectedExtras((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectedAccessories = accessories.filter((a) =>
    selectedExtras.includes(a.slug)
  );

  const accessoriesFullPrice = selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const discount = trolley ? accessoriesFullPrice * ACCESSORY_DISCOUNT : 0;
  const accessoriesDiscounted = accessoriesFullPrice - discount;
  const total = (trolley?.price ?? 0) + accessoriesDiscounted;

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
          Choisissez votre modele et beneficiez de{" "}
          <span className="font-semibold text-[#356B0D]">
            -50% sur tous les accessoires
          </span>.
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
                        src={t.slug === "nx-lithium" ? "/images/nx-main.jpg" : "/images/nx-dhc-main.jpg"}
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

          {/* -50% banner */}
          {trolley && (
            <div className="flex items-start gap-3 rounded-xl bg-[#356B0D]/5 border border-[#356B0D]/20 p-4">
              <Percent className="mt-0.5 h-5 w-5 shrink-0 text-[#356B0D]" />
              <div>
                <p className="text-sm font-semibold text-[#356B0D]">
                  -50% sur tous les accessoires
                </p>
                <p className="mt-1 text-xs text-[#6B7280]">
                  La reduction s&apos;applique automatiquement avec votre trolley
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Accessories */}
          <div>
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#0F0F10]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
                2
              </span>
              Ajoutez des accessoires
              {trolley && (
                <span className="text-sm font-normal text-[#356B0D]">
                  (-50% applique)
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {accessories.map((acc) => {
                const isSelected = selectedExtras.includes(acc.slug);
                const discountedPrice = trolley
                  ? acc.price * (1 - ACCESSORY_DISCOUNT)
                  : acc.price;
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
                      {trolley ? (
                        <>
                          <span className="text-xs text-[#6B7280] line-through">
                            {acc.price}&euro;
                          </span>
                          <span className="ml-1 font-bold text-[#356B0D]">
                            {discountedPrice.toFixed(2)}&euro;
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-[#0F0F10]">
                          {acc.price}&euro;
                        </span>
                      )}
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

                {/* Accessories */}
                {selectedAccessories.length > 0 && (
                  <div className="space-y-2 border-b border-[#DBDBDB]/50 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      Accessoires
                    </p>
                    {selectedAccessories.map((acc) => {
                      const discounted = trolley
                        ? acc.price * (1 - ACCESSORY_DISCOUNT)
                        : acc.price;
                      return (
                        <div
                          key={acc.slug}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-[#6B7280]">{acc.name}</span>
                          {trolley ? (
                            <span>
                              <span className="text-xs text-[#6B7280] line-through mr-1">
                                {acc.price}&euro;
                              </span>
                              <span className="text-[#356B0D] font-medium">
                                {discounted.toFixed(2)}&euro;
                              </span>
                            </span>
                          ) : (
                            <span className="text-[#0F0F10]">{acc.price}&euro;</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Savings */}
                {trolley && discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#356B0D] font-medium">Economie (-50%)</span>
                    <span className="font-bold text-[#356B0D]">
                      -{discount.toFixed(2)}&euro;
                    </span>
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
                    addItem({ slug: trolley.slug, name: trolley.name, price: trolley.price });
                    selectedAccessories.forEach((acc) => {
                      const discounted = trolley
                        ? acc.price * (1 - ACCESSORY_DISCOUNT)
                        : acc.price;
                      addItem({ slug: acc.slug, name: acc.name, price: Number(discounted.toFixed(2)) });
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
