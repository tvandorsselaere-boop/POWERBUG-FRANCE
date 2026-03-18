"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

export function AddToCartRedirect({
  slug,
  name,
  price,
  compare_at_price,
  className = "",
  style,
}: {
  slug: string;
  name: string;
  price: number;
  compare_at_price?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleClick = () => {
    addItem({ slug, name, price, compare_at_price });
    setAdded(true);
    setTimeout(() => {
      window.location.href = "/panier";
    }, 400);
  };

  return (
    <button onClick={handleClick} className={className} style={style}>
      {added ? (
        <>
          <Check className="mr-1.5 inline h-4 w-4" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingCart className="mr-1.5 inline h-4 w-4" />
          Ajouter au panier
        </>
      )}
    </button>
  );
}
