import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmée",
  processing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
  refunded: "Remboursée",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default async function AdminDashboard() {
  const supabase = createServiceClient();

  // Fetch recent orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, email, status, total, tracking_number, created_at, shipping_address")
    .eq("store", "powerbug")
    .order("created_at", { ascending: false })
    .limit(10);

  // Fetch order counts by status
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("store", "powerbug");

  const { count: pendingOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("store", "powerbug")
    .in("status", ["confirmed", "processing"]);

  const { count: shippedOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("store", "powerbug")
    .eq("status", "shipped");

  // Fetch low stock products
  const { data: lowStockProducts } = await supabase
    .from("products")
    .select("id, name, slug, product_variants(stock_quantity, stock_status, sku)")
    .eq("store", "powerbug")
    .eq("is_active", true);

  const stockAlerts = (lowStockProducts ?? [])
    .filter((p) => {
      const variants = p.product_variants as { stock_quantity: number }[];
      return variants?.some((v) => v.stock_quantity <= 3);
    })
    .map((p) => {
      const variant = (p.product_variants as { stock_quantity: number; sku: string | null }[])?.[0];
      return { name: p.name, slug: p.slug, stock: variant?.stock_quantity ?? 0, sku: variant?.sku };
    });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0F0F10] mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total commandes" value={totalOrders ?? 0} />
        <StatCard label="En attente" value={pendingOrders ?? 0} color="text-blue-600" />
        <StatCard label="Expédiées" value={shippedOrders ?? 0} color="text-purple-600" />
        <StatCard label="Alertes stock" value={stockAlerts.length} color={stockAlerts.length > 0 ? "text-red-600" : "text-green-600"} />
      </div>

      {/* Stock Alerts */}
      {stockAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold text-red-800 uppercase tracking-wide mb-3">Alertes stock</h2>
          <div className="space-y-2">
            {stockAlerts.map((alert) => (
              <div key={alert.slug} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-red-100">
                <span className="text-sm font-medium">{alert.name}</span>
                <span className={`text-sm font-bold ${alert.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                  {alert.stock === 0 ? "Rupture" : `${alert.stock} restant${alert.stock > 1 ? "s" : ""}`}
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/stock" className="text-sm text-red-700 font-medium hover:underline mt-3 inline-block">
            Voir tout le stock →
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-[#DBDBDB] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#DBDBDB] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#0F0F10] uppercase tracking-wide">Dernières commandes</h2>
          <Link href="/admin/commandes" className="text-sm text-[#356B0D] font-medium hover:underline">
            Voir tout →
          </Link>
        </div>
        {(!orders || orders.length === 0) ? (
          <div className="p-8 text-center text-gray-400 text-sm">Aucune commande pour le moment</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 font-medium text-gray-500">N°</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Client</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Total</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Statut</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs">{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{(order.shipping_address as Record<string, string>)?.name ?? "—"}</div>
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </td>
                    <td className="px-5 py-3 font-medium">{order.total?.toFixed(2)} €</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/commandes/${order.id}`} className="text-[#356B0D] font-medium hover:underline text-xs">
                        Détail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = "text-[#0F0F10]" }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
