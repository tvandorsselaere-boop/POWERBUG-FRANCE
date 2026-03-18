"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Variant {
  id: string;
  stock_quantity: number;
  stock_status: string;
  sku: string | null;
  price: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
  category: { name: string; slug: string } | null;
  product_variants: Variant[];
}

const LOW_THRESHOLD = 3;

type StockFilter = "all" | "rupture" | "low" | "ok";

export default function AdminStockPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400 text-sm">Chargement...</div>}>
      <AdminStock />
    </Suspense>
  );
}

function AdminStock() {
  const searchParams = useSearchParams();
  const initialFilter = (searchParams.get("filter") ?? "all") as StockFilter;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StockFilter>(initialFilter);
  const [editedStocks, setEditedStocks] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, { type: "success" | "error"; text: string }>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stock");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      console.error("Failed to fetch stock");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(variantId: string) {
    const qty = editedStocks[variantId];
    if (qty === undefined) return;

    setSaving((prev) => ({ ...prev, [variantId]: true }));
    setFeedback((prev) => { const n = { ...prev }; delete n[variantId]; return n; });

    try {
      const res = await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant_id: variantId, stock_quantity: qty }),
      });
      if (!res.ok) {
        const err = await res.json();
        setFeedback((prev) => ({ ...prev, [variantId]: { type: "error", text: err.error ?? "Erreur" } }));
      } else {
        setFeedback((prev) => ({ ...prev, [variantId]: { type: "success", text: "OK" } }));
        // Update local state
        setProducts((prev) =>
          prev.map((p) => ({
            ...p,
            product_variants: p.product_variants.map((v) =>
              v.id === variantId
                ? { ...v, stock_quantity: qty, stock_status: qty === 0 ? "out_of_stock" : qty <= LOW_THRESHOLD ? "low_stock" : "in_stock" }
                : v
            ),
          }))
        );
        setEditedStocks((prev) => { const n = { ...prev }; delete n[variantId]; return n; });
        setTimeout(() => setFeedback((prev) => { const n = { ...prev }; delete n[variantId]; return n; }), 2000);
      }
    } catch {
      setFeedback((prev) => ({ ...prev, [variantId]: { type: "error", text: "Erreur reseau" } }));
    } finally {
      setSaving((prev) => ({ ...prev, [variantId]: false }));
    }
  }

  async function handleSetRupture(variantId: string) {
    setEditedStocks((prev) => ({ ...prev, [variantId]: 0 }));
    setSaving((prev) => ({ ...prev, [variantId]: true }));
    try {
      const res = await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant_id: variantId, stock_quantity: 0 }),
      });
      if (res.ok) {
        setFeedback((prev) => ({ ...prev, [variantId]: { type: "success", text: "Rupture" } }));
        setProducts((prev) =>
          prev.map((p) => ({
            ...p,
            product_variants: p.product_variants.map((v) =>
              v.id === variantId ? { ...v, stock_quantity: 0, stock_status: "out_of_stock" } : v
            ),
          }))
        );
        setEditedStocks((prev) => { const n = { ...prev }; delete n[variantId]; return n; });
        setTimeout(() => setFeedback((prev) => { const n = { ...prev }; delete n[variantId]; return n; }), 2000);
      }
    } catch {
      setFeedback((prev) => ({ ...prev, [variantId]: { type: "error", text: "Erreur" } }));
    } finally {
      setSaving((prev) => ({ ...prev, [variantId]: false }));
    }
  }

  const filtered = products.filter((p) => {
    const v = p.product_variants?.[0];
    if (!v) return false;
    if (filter === "rupture") return v.stock_quantity === 0;
    if (filter === "low") return v.stock_quantity > 0 && v.stock_quantity <= LOW_THRESHOLD;
    if (filter === "ok") return v.stock_quantity > LOW_THRESHOLD;
    return true;
  });

  const outOfStockCount = products.filter((p) => p.product_variants?.some((v) => v.stock_quantity === 0)).length;
  const lowStockCount = products.filter((p) => p.product_variants?.some((v) => v.stock_quantity > 0 && v.stock_quantity <= LOW_THRESHOLD)).length;
  const okCount = products.filter((p) => p.product_variants?.every((v) => v.stock_quantity > LOW_THRESHOLD)).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0F0F10] mb-2">Stock</h1>
      <p className="text-sm text-gray-500 mb-6">
        Modifiez les quantites directement. Seuil d&apos;alerte : {LOW_THRESHOLD} unites.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Total</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className={`rounded-xl border p-4 ${outOfStockCount > 0 ? "bg-red-50 border-red-200" : "bg-white border-[#DBDBDB]"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Rupture</p>
          <p className={`text-2xl font-bold ${outOfStockCount > 0 ? "text-red-600" : "text-green-600"}`}>{outOfStockCount}</p>
        </div>
        <div className={`rounded-xl border p-4 ${lowStockCount > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-[#DBDBDB]"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Faible</p>
          <p className={`text-2xl font-bold ${lowStockCount > 0 ? "text-amber-600" : "text-green-600"}`}>{lowStockCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">OK</p>
          <p className="text-2xl font-bold text-green-600">{okCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { value: "all", label: "Tous" },
          { value: "rupture", label: `Rupture (${outOfStockCount})` },
          { value: "low", label: `Faible (${lowStockCount})` },
          { value: "ok", label: `OK (${okCount})` },
        ] as { value: StockFilter; label: string }[]).map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[#356B0D] text-white"
                : "bg-white border border-[#DBDBDB] text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading ? (
        <div className="p-8 text-center text-gray-400 text-sm">Chargement...</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#DBDBDB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 font-medium text-gray-500">Produit</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Categorie</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Prix</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-center">Stock</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const variant = p.product_variants?.[0];
                  if (!variant) return null;
                  const currentQty = editedStocks[variant.id] ?? variant.stock_quantity;
                  const hasChanged = editedStocks[variant.id] !== undefined;
                  const isSaving = saving[variant.id];
                  const msg = feedback[variant.id];
                  const qty = variant.stock_quantity;
                  const statusColor = qty === 0 ? "bg-red-100 text-red-800" : qty <= LOW_THRESHOLD ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800";

                  return (
                    <tr key={p.id} className="border-t border-gray-100">
                      <td className="px-5 py-3">
                        <span className="font-medium">{p.name}</span>
                        {variant.sku && <span className="text-xs text-gray-400 ml-2">({variant.sku})</span>}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{p.category?.name ?? "—"}</td>
                      <td className="px-5 py-3">{variant.price?.toFixed(2)}&nbsp;&euro;</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            min={0}
                            value={currentQty}
                            onChange={(e) => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              if (val === variant.stock_quantity) {
                                setEditedStocks((prev) => { const n = { ...prev }; delete n[variant.id]; return n; });
                              } else {
                                setEditedStocks((prev) => ({ ...prev, [variant.id]: val }));
                              }
                            }}
                            className={`w-20 h-9 rounded-lg border text-center font-bold text-base outline-none transition-colors ${
                              hasChanged ? "border-[#356B0D] bg-[#356B0D]/5 ring-2 ring-[#356B0D]/20" : "border-[#DBDBDB]"
                            } ${qty === 0 ? "text-red-600" : qty <= LOW_THRESHOLD ? "text-amber-600" : "text-green-700"}`}
                          />
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                            {qty === 0 ? "Rupture" : qty <= LOW_THRESHOLD ? "Faible" : "OK"}
                          </span>
                          {msg && (
                            <span className={`text-xs font-medium ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                              {msg.text}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {hasChanged && (
                            <button
                              onClick={() => handleSave(variant.id)}
                              disabled={isSaving}
                              className="px-3 py-1.5 bg-[#356B0D] text-white text-xs font-medium rounded-lg hover:bg-[#2d5a0b] transition-colors disabled:opacity-50"
                            >
                              {isSaving ? "..." : "Enregistrer"}
                            </button>
                          )}
                          {qty > 0 && (
                            <button
                              onClick={() => handleSetRupture(variant.id)}
                              disabled={isSaving}
                              className="px-3 py-1.5 bg-white text-red-600 text-xs font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              Rupture
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
