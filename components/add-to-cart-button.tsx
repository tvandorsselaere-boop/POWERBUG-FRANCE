"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/data/products";
import { accessories, bundleAccessories } from "@/lib/data/products";

export function AddToCartButton({
  product,
  size = "lg",
  className = "",
}: {
  product: Product;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const addTrolleyBundle = useCartStore((s) => s.addTrolleyBundle);

  const handleClick = () => {
    if (product.category === "trolley") {
      const bundleItems = accessories
        .filter((a) => bundleAccessories.includes(a.slug))
        .map((a) => ({ slug: a.slug, name: a.name, price: a.price }));

      addTrolleyBundle(
        { slug: product.slug, name: product.name, price: product.price },
        bundleItems
      );
    } else {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      size={size}
      onClick={handleClick}
      className={`btn-glass rounded-[10px] text-white ${className}`}
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Ajoute !
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Ajouter au panier
        </>
      )}
    </Button>
  );
}
