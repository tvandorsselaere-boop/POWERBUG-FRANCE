import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createServiceClient();
  const today = new Date().toISOString().split("T")[0];

  const [
    confirmedRes,
    needsTrackingRes,
    shippedTodayRes,
    allOrdersRes,
    lowStockData,
    todayRevenueRes,
    monthRevenueRes,
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug")
      .eq("status", "confirmed"),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug")
      .eq("status", "processing")
      .is("tracking_number", null),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug")
      .eq("status", "shipped")
      .gte("updated_at", today),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("store", "powerbug"),
    supabase
      .from("products")
      .select("id, name, slug, product_variants(stock_quantity, sku)")
      .eq("store", "powerbug")
      .eq("is_active", true),
    supabase
      .from("orders")
      .select("total")
      .eq("store", "powerbug")
      .gte("created_at", today),
    supabase
      .from("orders")
      .select("total")
      .eq("store", "powerbug")
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
  ]);

  const confirmedCount = confirmedRes.count ?? 0;
  const needsTrackingCount = needsTrackingRes.count ?? 0;
  const shippedTodayCount = shippedTodayRes.count ?? 0;
  const totalOrders = allOrdersRes.count ?? 0;
  const todayRevenue = (todayRevenueRes.data ?? []).reduce((s, o) => s + (o.total ?? 0), 0);
  const monthRevenue = (monthRevenueRes.data ?? []).reduce((s, o) => s + (o.total ?? 0), 0);

  type StockProduct = { id: string; name: string; slug: string; product_variants: { stock_quantity: number; sku: string | null }[] };
  const products = (lowStockData.data ?? []) as unknown as StockProduct[];
  const stockAlerts: { name: string; slug: string; stock: number; sku: string | null }[] = [];
  let outOfStockCount = 0;
  let lowStockCount = 0;
  for (const p of products) {
    for (const v of p.product_variants ?? []) {
      if (v.stock_quantity === 0) {
        outOfStockCount++;
        stockAlerts.push({ name: p.name, slug: p.slug, stock: 0, sku: v.sku });
      } else if (v.stock_quantity <= 3) {
        lowStockCount++;
        stockAlerts.push({ name: p.name, slug: p.slug, stock: v.stock_quantity, sku: v.sku });
      }
    }
  }

  const hasUrgent = confirmedCount > 0 || needsTrackingCount > 0 || outOfStockCount > 0;
  const dateStr = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0F0F10]">Tableau de bord</h1>
        <p className="text-sm text-gray-500 capitalize">{dateStr}</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ActionCard
          href="/admin/commandes?status=confirmed"
          count={confirmedCount}
          label="Nouvelles commandes"
          sublabel="A traiter"
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          urgent={confirmedCount > 0}
          color="blue"
        />
        <ActionCard
          href="/admin/commandes?status=needs_tracking"
          count={needsTrackingCount}
          label="En attente de tracking"
          sublabel="Saisir le n° DPD"
          icon="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4l3 3"
          urgent={needsTrackingCount > 0}
          color="amber"
        />
        <ActionCard
          href="/admin/stock"
          count={outOfStockCount + lowStockCount}
          label="Alertes stock"
          sublabel={outOfStockCount > 0 ? `${outOfStockCount} rupture${outOfStockCount > 1 ? "s" : ""}` : "Stock faible"}
          icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          urgent={outOfStockCount > 0}
          color={outOfStockCount > 0 ? "red" : "amber"}
        />
        <ActionCard
          href="/admin/commandes?status=shipped"
          count={shippedTodayCount}
          label="Expeditions du jour"
          sublabel="Aujourd'hui"
          icon="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"
          urgent={false}
          color="green"
        />
      </div>

      {/* All good message */}
      {!hasUrgent && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-6 mb-8 text-center">
          <svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-800 font-medium">Tout est en ordre — aucune action urgente</p>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total commandes</p>
          <p className="text-3xl font-bold text-[#0F0F10]">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">CA aujourd&apos;hui</p>
          <p className="text-3xl font-bold text-[#356B0D]">{todayRevenue.toFixed(0)}&nbsp;&euro;</p>
        </div>
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">CA ce mois</p>
          <p className="text-3xl font-bold text-[#0F0F10]">{monthRevenue.toFixed(0)}&nbsp;&euro;</p>
        </div>
      </div>

      {/* Stock alerts detail */}
      {stockAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-red-800 uppercase tracking-wide">Alertes stock</h2>
            <Link href="/admin/stock" className="text-sm text-red-700 font-medium hover:underline">
              Gerer le stock &rarr;
            </Link>
          </div>
          <div className="space-y-2">
            {stockAlerts.slice(0, 6).map((alert) => (
              <div key={alert.slug + alert.sku} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-red-100">
                <span className="text-sm font-medium">{alert.name}</span>
                <span className={`text-sm font-bold ${alert.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                  {alert.stock === 0 ? "RUPTURE" : `${alert.stock} restant${alert.stock > 1 ? "s" : ""}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/commandes"
          className="px-5 py-2.5 bg-[#356B0D] text-white text-sm font-medium rounded-[10px] hover:bg-[#2d5a0b] transition-colors"
        >
          Toutes les commandes
        </Link>
        <Link
          href="/admin/stock"
          className="px-5 py-2.5 bg-white text-[#0F0F10] text-sm font-medium rounded-[10px] border border-[#DBDBDB] hover:bg-gray-50 transition-colors"
        >
          Gerer le stock
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 bg-white text-gray-500 text-sm font-medium rounded-[10px] border border-[#DBDBDB] hover:bg-gray-50 transition-colors"
        >
          Voir le site &rarr;
        </Link>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  count,
  label,
  sublabel,
  icon,
  urgent,
  color,
}: {
  href: string;
  count: number;
  label: string;
  sublabel: string;
  icon: string;
  urgent: boolean;
  color: "blue" | "amber" | "red" | "green";
}) {
  const bg = urgent
    ? { blue: "bg-blue-50 border-blue-200", amber: "bg-amber-50 border-amber-200", red: "bg-red-50 border-red-200", green: "bg-green-50 border-green-200" }[color]
    : "bg-white border-[#DBDBDB]";
  const textColor = urgent
    ? { blue: "text-blue-700", amber: "text-amber-700", red: "text-red-700", green: "text-green-700" }[color]
    : "text-gray-400";
  const countColor = urgent
    ? { blue: "text-blue-800", amber: "text-amber-800", red: "text-red-800", green: "text-green-800" }[color]
    : "text-[#0F0F10]";

  return (
    <Link href={href} className={`rounded-xl border p-5 transition-all hover:shadow-md ${bg}`}>
      <div className="flex items-start justify-between mb-3">
        <svg className={`w-6 h-6 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        {urgent && (
          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${
            { blue: "bg-blue-500", amber: "bg-amber-500", red: "bg-red-500", green: "bg-green-500" }[color]
          } animate-pulse`} />
        )}
      </div>
      <p className={`text-3xl font-bold ${countColor}`}>{count}</p>
      <p className="text-sm font-medium text-[#0F0F10] mt-1">{label}</p>
      <p className={`text-xs mt-0.5 ${textColor}`}>{sublabel}</p>
    </Link>
  );
}
