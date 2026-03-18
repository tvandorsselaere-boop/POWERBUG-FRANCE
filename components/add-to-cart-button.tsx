"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/data/products";

export function AddToCartButton({
  product,
  size = "lg",
  className = "",
  outOfStock = false,
}: {
  product: Product;
  size?: "default" | "sm" | "lg";
  className?: string;
  outOfStock?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      compare_at_price: product.comparePrice,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (outOfStock) {
    return (
      <Button
        size={size}
        disabled
        className={`rounded-[10px] bg-gray-200 text-gray-500 cursor-not-allowed ${className}`}
      >
        Sur commande
      </Button>
    );
  }

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
