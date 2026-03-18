"use client";

import { useEffect, useState } from "react";
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
  shipping_address: { name?: string } | null;
}

const STATUSES = [
  { value: "all", label: "Toutes" },
  { value: "confirmed", label: "Confirmées" },
  { value: "processing", label: "En préparation" },
  { value: "shipped", label: "Expédiées" },
  { value: "delivered", label: "Livrées" },
  { value: "cancelled", label: "Annulées" },
];

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/commandes?status=${filter}`);
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#DBDBDB] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Chargement...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">Aucune commande</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 font-medium text-gray-500">N°</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Date</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Client</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Total</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Statut</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Tracking</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs">{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{order.shipping_address?.name ?? "—"}</div>
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </td>
                    <td className="px-5 py-3 font-medium">{order.total?.toFixed(2)} €</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">
                      {order.tracking_number ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="text-[#356B0D] font-medium hover:underline text-xs"
                      >
                        Gérer →
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
