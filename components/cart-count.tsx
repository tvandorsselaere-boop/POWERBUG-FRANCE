"use client";

import { useCartStore, cartCount } from "@/store/cart-store";
import { useEffect, useState } from "react";

export function CartCount() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#356B0D] text-[10px] font-bold text-white">0</span>;

  const count = cartCount(items);

  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#356B0D] text-[10px] font-bold text-white">
      {count}
    </span>
  );
}
