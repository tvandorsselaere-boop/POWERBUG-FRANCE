import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

export default async function AdminStock() {
  const supabase = createServiceClient();

  const { data } = await supabase
    .from("products")
    .select(`
      id, name, slug, is_active,
      category:categories(name, slug),
      product_variants(id, stock_quantity, stock_status, sku, price)
    `)
    .eq("store", "powerbug")
    .eq("is_active", true)
    .order("name");

  const products = (data ?? []) as unknown as Product[];

  const LOW_THRESHOLD = 3;

  const outOfStock = products.filter((p) =>
    p.product_variants?.some((v) => v.stock_quantity === 0)
  );
  const lowStock = products.filter((p) =>
    p.product_variants?.some((v) => v.stock_quantity > 0 && v.stock_quantity <= LOW_THRESHOLD)
  );
  const okStock = products.filter((p) =>
    p.product_variants?.every((v) => v.stock_quantity > LOW_THRESHOLD)
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0F0F10] mb-2">Stock</h1>
      <p className="text-sm text-gray-500 mb-6">
        Vue d&apos;ensemble du stock. Seuil d&apos;alerte : {LOW_THRESHOLD} unités.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total produits</p>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className={`rounded-xl border p-5 ${outOfStock.length > 0 ? "bg-red-50 border-red-200" : "bg-white border-[#DBDBDB]"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Rupture</p>
          <p className={`text-3xl font-bold ${outOfStock.length > 0 ? "text-red-600" : "text-green-600"}`}>{outOfStock.length}</p>
        </div>
        <div className={`rounded-xl border p-5 ${lowStock.length > 0 ? "bg-amber-50 border-amber-200" : "bg-white border-[#DBDBDB]"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Stock faible</p>
          <p className={`text-3xl font-bold ${lowStock.length > 0 ? "text-amber-600" : "text-green-600"}`}>{lowStock.length}</p>
        </div>
      </div>

      {/* Alerts */}
      {(outOfStock.length > 0 || lowStock.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-red-800 uppercase tracking-wide mb-3">
            Produits à réapprovisionner
          </h2>
          <div className="space-y-2">
            {[...outOfStock, ...lowStock].map((p) => {
              const variant = p.product_variants?.[0];
              const qty = variant?.stock_quantity ?? 0;
              return (
                <div key={p.id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-red-100">
                  <div>
                    <span className="text-sm font-medium">{p.name}</span>
                    {variant?.sku && <span className="text-xs text-gray-400 ml-2">({variant.sku})</span>}
                  </div>
                  <span className={`text-sm font-bold ${qty === 0 ? "text-red-600" : "text-amber-600"}`}>
                    {qty === 0 ? "RUPTURE" : `${qty} unité${qty > 1 ? "s" : ""}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full stock table */}
      <div className="bg-white rounded-xl border border-[#DBDBDB] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#DBDBDB]">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tous les produits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">Produit</th>
                <th className="px-5 py-3 font-medium text-gray-500">Catégorie</th>
                <th className="px-5 py-3 font-medium text-gray-500">SKU</th>
                <th className="px-5 py-3 font-medium text-gray-500">Prix</th>
                <th className="px-5 py-3 font-medium text-gray-500 text-center">Stock</th>
                <th className="px-5 py-3 font-medium text-gray-500">État</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const variant = p.product_variants?.[0];
                const qty = variant?.stock_quantity ?? 0;
                const statusColor =
                  qty === 0
                    ? "bg-red-100 text-red-800"
                    : qty <= LOW_THRESHOLD
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800";
                const statusLabel =
                  qty === 0 ? "Rupture" : qty <= LOW_THRESHOLD ? "Faible" : "OK";

                return (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium">{p.name}</td>
                    <td className="px-5 py-3 text-gray-500">{p.category?.name ?? "—"}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-400">{variant?.sku ?? "—"}</td>
                    <td className="px-5 py-3">{variant?.price?.toFixed(2) ?? "—"} €</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-lg font-bold ${qty === 0 ? "text-red-600" : qty <= LOW_THRESHOLD ? "text-amber-600" : "text-green-600"}`}>
                        {qty}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
