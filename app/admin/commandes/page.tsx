"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Order {
  id: string;
  order_number: number | null;
  email: string;
  status: string;
  total: number;
  shipping_cost: number;
  tracking_number: string | null;
  created_at: string;
  shipping_address: { name?: string; city?: string; shipping_method?: string; relay_name?: string } | null;
}

const STATUSES = [
  { value: "all", label: "Toutes" },
  { value: "action_needed", label: "A traiter" },
  { value: "needs_tracking", label: "Sans tracking" },
  { value: "confirmed", label: "En attente tracking" },
  { value: "shipped", label: "Expediees" },
  { value: "delivered", label: "Livrees" },
  { value: "cancelled", label: "Annulees" },
];

const STATUS_LABELS: Record<string, string> = {
  confirmed: "En attente tracking",
  processing: "En attente tracking",
  shipped: "Expediee",
  delivered: "Livree",
  cancelled: "Annulee",
  refunded: "Remboursee",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-amber-100 text-amber-800",
  processing: "bg-amber-100 text-amber-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400 text-sm">Chargement...</div>}>
      <AdminOrders />
    </Suspense>
  );
}

function AdminOrders() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("status") ?? "all";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, { type: "success" | "error"; text: string }>>({});

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/commandes?status=${filter}`);
      const data = await res.json();
      setOrders(data.orders ?? []);
      // Pre-fill tracking inputs
      const inputs: Record<string, string> = {};
      for (const o of data.orders ?? []) {
        if (o.tracking_number) inputs[o.id] = o.tracking_number;
      }
      setTrackingInputs((prev) => ({ ...prev, ...inputs }));
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(orderId: string, body: Record<string, string>) {
    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setMessages((prev) => { const n = { ...prev }; delete n[orderId]; return n; });
    try {
      const res = await fetch(`/api/admin/commandes/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        setMessages((prev) => ({ ...prev, [orderId]: { type: "error", text: err.error ?? "Erreur" } }));
      } else {
        setMessages((prev) => ({ ...prev, [orderId]: { type: "success", text: "OK" } }));
        setTimeout(() => fetchOrders(), 500);
      }
    } catch {
      setMessages((prev) => ({ ...prev, [orderId]: { type: "error", text: "Erreur reseau" } }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  }

  function handleMarkShipped(order: Order) {
    const tracking = trackingInputs[order.id]?.trim();
    if (!tracking) {
      setMessages((prev) => ({ ...prev, [order.id]: { type: "error", text: "Saisissez un n° tracking" } }));
      return;
    }
    handleAction(order.id, { status: "shipped", tracking_number: tracking });
  }

  // Age in days since creation
  function orderAge(createdAt: string) {
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0F0F10] mb-6">Commandes</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === s.value
                ? "bg-[#356B0D] text-white"
                : "bg-white border border-[#DBDBDB] text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="p-8 text-center text-gray-400 text-sm">Chargement...</div>
      ) : orders.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm bg-white rounded-xl border border-[#DBDBDB]">
          Aucune commande
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const age = orderAge(order.created_at);
            const isOld = (order.status === "confirmed" || order.status === "processing") && !order.tracking_number && age >= 2;
            const msg = messages[order.id];
            const isLoading = actionLoading[order.id];

            return (
              <div key={order.id} className={`bg-white rounded-xl border ${isOld ? "border-red-300" : "border-[#DBDBDB]"} overflow-hidden`}>
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-gray-100">
                  <span className="font-mono text-xs text-gray-400">{order.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                  {isOld && (
                    <span className="text-xs font-semibold text-red-600">
                      Depuis {age} jours !
                    </span>
                  )}
                  {order.shipping_address?.shipping_method === "dpd_relay" ? (
                    <span className="ml-auto inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-800">Relais</span>
                  ) : order.shipping_address?.shipping_method === "dpd_home" ? (
                    <span className="ml-auto inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Domicile</span>
                  ) : null}
                  <span className={`${!order.shipping_address?.shipping_method ? "ml-auto " : ""}inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="text-base font-bold text-[#0F0F10]">{order.total?.toFixed(2)}&nbsp;&euro;</span>
                </div>

                {/* Client info */}
                <div className="flex flex-wrap items-center gap-2 px-5 py-2 text-sm text-gray-600">
                  <span className="font-medium text-[#0F0F10]">{order.shipping_address?.name ?? "—"}</span>
                  <span className="text-gray-400">|</span>
                  <span>{order.email}</span>
                  {order.shipping_address?.city && (
                    <>
                      <span className="text-gray-400">|</span>
                      <span>{order.shipping_address.city}</span>
                    </>
                  )}
                  {order.shipping_address?.relay_name && (
                    <>
                      <span className="text-gray-400">|</span>
                      <span className="text-violet-600 font-medium">{order.shipping_address.relay_name}</span>
                    </>
                  )}
                </div>

                {/* Feedback message */}
                {msg && (
                  <div className={`mx-5 mt-2 rounded-lg px-3 py-2 text-xs font-medium ${
                    msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {msg.text}
                  </div>
                )}

                {/* Inline actions */}
                <div className="flex flex-wrap items-center gap-3 px-5 py-3 bg-gray-50/50">
                  {/* Confirmed/Processing: tracking input + ship */}
                  {(order.status === "confirmed" || order.status === "processing") && (
                    <>
                      <input
                        type="text"
                        value={trackingInputs[order.id] ?? ""}
                        onChange={(e) => setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))}
                        placeholder="N° tracking DPD"
                        className="flex-1 min-w-[200px] h-9 rounded-lg border border-[#DBDBDB] bg-white px-3 text-sm font-mono focus:border-[#356B0D] focus:ring-2 focus:ring-[#356B0D]/30 outline-none"
                      />
                      <button
                        onClick={() => handleMarkShipped(order)}
                        disabled={isLoading}
                        className="px-4 py-2 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        Marquer expediee
                      </button>
                      <button
                        onClick={() => handleAction(order.id, { action: "resend_preparation" })}
                        disabled={isLoading}
                        className="px-4 py-2 bg-white text-gray-600 text-xs font-medium rounded-lg border border-[#DBDBDB] hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Renvoyer bon preparation
                      </button>
                    </>
                  )}

                  {/* Shipped: show tracking */}
                  {order.status === "shipped" && order.tracking_number && (
                    <a
                      href={`https://trace.dpd.fr/parceldetails/${order.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-700 font-medium hover:underline font-mono"
                    >
                      Suivi DPD: {order.tracking_number} &rarr;
                    </a>
                  )}

                  {/* Always: link to detail */}
                  <Link
                    href={`/admin/commandes/${order.id}`}
                    className="ml-auto text-xs text-[#356B0D] font-medium hover:underline"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
