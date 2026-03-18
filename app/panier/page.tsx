"use client";

import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { useCartStore, cartTotal, cartCount } from "@/store/cart-store";
import { useAuth } from "@/hooks/use-auth";
import { createBrowserClient } from "@/lib/supabase/browser";
import { useEffect, useState } from "react";
import { MapPin, Pencil } from "lucide-react";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { user, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<{ full_name: string; street: string; city: string; zip: string; phone: string } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!user) { setAddress(null); return; }
    const supabase = createBrowserClient();
    supabase
      .from("profiles")
      .select("default_shipping_address")
      .eq("id", user.id)
      .single()
      .then(({ data }: { data: { default_shipping_address: typeof address } | null }) => {
        if (data?.default_shipping_address) {
          setAddress(data.default_shipping_address);
        }
      });
  }, [user]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:px-10">
        <div className="flex items-center justify-center py-20">
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

  const subtotal = cartTotal(items);
  const count = cartCount(items);
  const TROLLEY_SLUGS = ["nx-lithium", "nx-dhc-lithium"];
  const hasTrolley = items.some((item) => TROLLEY_SLUGS.includes(item.slug));
  const shipping = count > 0 ? (hasTrolley ? 14.9 : 3.9) : 0;
  const total = subtotal + shipping;
  const savings = items.reduce((sum, item) => {
    if (item.compare_at_price && item.compare_at_price > item.price) {
      return sum + (item.compare_at_price - item.price) * item.quantity;
    }
    return sum;
  }, 0);

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
              className="btn-glass rounded-[10px] text-white"
            >
              <Link href="/trolleys">Voir les chariots</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="btn-glass-outline rounded-[10px] text-[#0F0F10]"
            >
              <Link href="/configurateur">Configurateur</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
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
                    {item.compare_at_price && item.compare_at_price > item.price ? (
                      <>
                        <span className="line-through text-[#DBDBDB]">{item.compare_at_price.toFixed(2)}&euro;</span>
                        {" "}
                        <span className="font-semibold text-[#AE1717]">{item.price.toFixed(2)}&euro;</span>
                        {" "}/ unite
                      </>
                    ) : (
                      <>{item.price.toFixed(2)}&euro; / unite</>
                    )}
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
                <div className="w-24 text-right">
                  {item.compare_at_price && item.compare_at_price > item.price ? (
                    <>
                      <span className="block text-xs text-[#DBDBDB] line-through">
                        {(item.compare_at_price * item.quantity).toFixed(2)}&euro;
                      </span>
                      <span className="font-bold text-[#0F0F10]">
                        {(item.price * item.quantity).toFixed(2)}&euro;
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-[#0F0F10]">
                      {(item.price * item.quantity).toFixed(2)}&euro;
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-[#DBDBDB] hover:text-[#AE1717]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-[#6B7280] hover:text-[#AE1717]"
            >
              Vider le panier
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card-glass rounded-2xl p-6">
              <h2 className="mb-4 text-lg font-bold text-[#0F0F10]">
                Recapitulatif
              </h2>

              <div className="space-y-3 border-b border-[#DBDBDB]/50 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Sous-total</span>
                  <span className="text-[#0F0F10]">{subtotal.toFixed(2)}&euro;</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">
                    {hasTrolley ? "Livraison DPD à domicile" : "Livraison DPD Relais"}
                  </span>
                  <span className="text-[#0F0F10] font-medium">
                    {shipping.toFixed(2).replace(".", ",")}&euro;
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#356B0D] font-medium">Economie</span>
                    <span className="text-[#356B0D] font-semibold">
                      -{savings.toFixed(2)}&euro;
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

              {/* Shipping address */}
              {!authLoading && user && address && (
                <div className="mt-4 rounded-[10px] border border-[#DBDBDB] bg-[#F9F9F9] px-4 py-3 text-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#356B0D]" />
                      <div className="text-[#0F0F10]">
                        <p className="font-medium">{address.full_name}</p>
                        <p className="text-[#6B7280]">{address.street}</p>
                        <p className="text-[#6B7280]">{address.zip} {address.city}</p>
                        {address.phone && <p className="text-[#6B7280]">{address.phone}</p>}
                      </div>
                    </div>
                    <Link href="/compte/adresses" className="text-[#356B0D] hover:text-[#2a5409]">
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {!authLoading && user && !address && (
                <div className="mt-4 rounded-[10px] border border-[#DBDBDB] bg-[#F9F9F9] px-4 py-3 text-sm">
                  <p className="text-[#6B7280]">
                    <Link href="/compte/adresses" className="font-medium text-[#356B0D] hover:underline">
                      Ajouter une adresse de livraison
                    </Link>{" "}
                    pour accelerer le paiement.
                  </p>
                </div>
              )}

              {!authLoading && !user && (
                <div className="mt-4 rounded-[10px] border border-[#DBDBDB] bg-[#F9F9F9] px-4 py-3 text-sm">
                  <p className="text-[#6B7280]">
                    <Link href="/connexion?redirect=/panier" className="font-medium text-[#356B0D] hover:underline">
                      Connectez-vous
                    </Link>{" "}
                    ou{" "}
                    <Link href="/inscription" className="font-medium text-[#356B0D] hover:underline">
                      creez un compte
                    </Link>{" "}
                    pour suivre vos commandes.
                  </p>
                </div>
              )}

              <div className="mt-4">
                <CheckoutButton />
              </div>

              <p className="mt-3 text-center text-xs text-[#6B7280]">
                Prix TTC — Livraison en France metropolitaine
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
