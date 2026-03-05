"use client";

import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { useCartStore, cartTotal, cartCount } from "@/store/cart-store";
import { useEffect, useState } from "react";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:px-10">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

  const total = cartTotal(items);
  const count = cartCount(items);
  const paidItems = items.filter((i) => !i.isBundle);
  const bundleItems = items.filter((i) => i.isBundle);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Panier</span>
      </nav>

      <h1 className="mb-8 text-3xl font-bold text-[#0F0F10]">
        Votre panier{" "}
        {count > 0 && (
          <span className="text-lg font-normal text-[#6B7280]">
            ({count} article{count > 1 ? "s" : ""})
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F5]">
            <ShoppingCart className="h-10 w-10 text-[#DBDBDB]" />
          </div>
          <p className="text-lg font-medium text-[#0F0F10]">
            Votre panier est vide
          </p>
          <p className="mt-2 text-[#6B7280]">
            Decouvrez nos chariots et accessoires PowerBug.
          </p>
          <div className="mt-8 flex gap-4">
            <Button
              asChild
              className="rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509]"
            >
              <Link href="/trolleys">Voir les chariots</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-[10px] border-[#DBDBDB] text-[#0F0F10] hover:bg-[#F5F5F5]"
            >
              <Link href="/configurateur">Configurateur</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            {/* Paid items */}
            {paidItems.map((item) => (
              <div
                key={item.slug}
                className="flex items-center gap-4 rounded-xl border border-[#DBDBDB] bg-white p-4"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#F5F5F5]">
                  <ShoppingCart className="h-6 w-6 text-[#DBDBDB]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#0F0F10] truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {item.price}&euro; / unite
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.slug, item.quantity - 1)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DBDBDB] text-[#6B7280] hover:bg-[#F5F5F5]"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-[#0F0F10]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.slug, item.quantity + 1)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DBDBDB] text-[#6B7280] hover:bg-[#F5F5F5]"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="w-20 text-right font-bold text-[#0F0F10]">
                  {(item.price * item.quantity).toFixed(2)}&euro;
                </span>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-[#DBDBDB] hover:text-[#AE1717]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Bundle items */}
            {bundleItems.length > 0 && (
              <div className="rounded-xl border border-[#8DC63F]/30 bg-[#8DC63F]/5 p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#356B0D]">
                  <Gift className="h-4 w-4" />
                  Accessoires offerts avec votre trolley
                </p>
                <div className="space-y-2">
                  {bundleItems.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-[#0F0F10]">{item.name}</span>
                      <span className="font-medium text-[#356B0D]">
                        OFFERT
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={clearCart}
              className="text-sm text-[#6B7280] hover:text-[#AE1717]"
            >
              Vider le panier
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-[#DBDBDB] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-[#0F0F10]">
                Recapitulatif
              </h2>

              <div className="space-y-3 border-b border-[#DBDBDB]/50 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Sous-total</span>
                  <span className="text-[#0F0F10]">{total.toFixed(2)}&euro;</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Livraison</span>
                  <span className="text-[#356B0D] font-medium">
                    {total >= 500 ? "Offerte" : "A calculer"}
                  </span>
                </div>
                {bundleItems.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#356B0D]">Bundle offert</span>
                    <span className="text-[#356B0D] font-medium">
                      -{bundleItems.length} articles
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-lg font-bold text-[#0F0F10]">Total</span>
                <span className="text-2xl font-bold text-[#0F0F10]">
                  {total.toFixed(2)}&euro;
                </span>
              </div>

              <div className="mt-6">
                <CheckoutButton />
              </div>

              <p className="mt-3 text-center text-xs text-[#6B7280]">
                TVA non applicable, art. 293 B du CGI
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
