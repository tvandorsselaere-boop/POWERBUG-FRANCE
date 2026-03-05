"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function AddToCartSimple({
  slug,
  name,
  price,
}: {
  slug: string;
  name: string;
  price: number;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    addItem({ slug, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      size="sm"
      onClick={handleClick}
      className="rounded-[10px] bg-[#356B0D] text-white hover:bg-[#2a5509]"
    >
      {added ? (
        <Check className="h-4 w-4" />
      ) : (
        "Ajouter"
      )}
    </Button>
  );
}
