"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { AccessoireCard } from "@/components/accessoire-card";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image?: { url: string; alt_text: string | null } | null;
};

type SortKey = "price-asc" | "price-desc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name-asc", label: "Nom A → Z" },
  { value: "name-desc", label: "Nom Z → A" },
];

export function SortableGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("price-asc");

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name, "fr");
      if (sort === "name-desc") return b.name.localeCompare(a.name, "fr");
      return 0;
    });
  }, [products, sort]);

  return (
    <div>
      {/* Barre de tri */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#6B7280]">{products.length} produit{products.length > 1 ? "s" : ""}</p>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-[#6B7280]" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-[10px] border border-[#DBDBDB] bg-white px-3 py-1.5 text-sm text-[#0F0F10] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <AccessoireCard
            key={p.id}
            id={p.id}
            slug={p.slug}
            name={p.name}
            description={p.description}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}
