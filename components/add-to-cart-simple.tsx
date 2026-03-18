"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function AddToCartSimple({
  slug,
  name,
  price,
  compare_at_price,
}: {
  slug: string;
  name: string;
  price: number;
  compare_at_price?: number;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    addItem({ slug, name, price, compare_at_price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      size="sm"
      onClick={handleClick}
      className="btn-glass rounded-[10px] text-white"
    >
      {added ? (
        <Check className="h-4 w-4" />
      ) : (
        "Ajouter"
      )}
    </Button>
  );
}
