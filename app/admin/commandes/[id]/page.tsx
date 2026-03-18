"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface OrderItem {
  id: string;
  product_name: string;
  variant_label: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  order_number: number | null;
  email: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  tracking_number: string | null;
  payment_id: string | null;
  created_at: string;
  updated_at: string | null;
  shipping_address: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  } | null;
}

const ALL_STATUSES = [
  { value: "confirmed", label: "Confirmée" },
  { value: "processing", label: "En préparation" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
  { value: "refunded", label: "Remboursée" },
];

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-indigo-100 text-indigo-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/commandes/${id}`);
      if (!res.ok) {
        setMessage({ type: "error", text: "Commande introuvable" });
        return;
      }
      const data = await res.json();
      setOrder(data.order);
      setItems(data.items ?? []);
      setNewStatus(data.order.status);
      setTrackingNumber(data.order.tracking_number ?? "");
    } catch {
      setMessage({ type: "error", text: "Erreur de chargement" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!order) return;
    setSaving(true);
    setMessage(null);

    try {
      const body: Record<string, string> = {};
      if (newStatus !== order.status) body.status = newStatus;
      if (trackingNumber !== (order.tracking_number ?? "")) body.tracking_number = trackingNumber;

      if (Object.keys(body).length === 0) {
        setMessage({ type: "error", text: "Aucune modification" });
        setSaving(false);
        return;
      }

      const res = await fetch(`/api/admin/commandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: "error", text: err.error ?? "Erreur" });
      } else {
        setMessage({ type: "success", text: "Commande mise à jour" });
        fetchOrder();
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau" });
    } finally {
      setSaving(false);
    }
  }

  async function handleMarkShipped() {
    if (!trackingNumber.trim()) {
      setMessage({ type: "error", text: "Entrez un numéro de tracking avant de marquer comme expédiée" });
      return;
    }
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/commandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "shipped",
          tracking_number: trackingNumber.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: "error", text: err.error ?? "Erreur" });
      } else {
        setMessage({ type: "success", text: "Commande marquée comme expédiée — email envoyé au client" });
        fetchOrder();
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau" });
    } finally {
      setSaving(false);
    }
  }

  async function handleResendPreparation() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/commandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resend_preparation" }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: "error", text: err.error ?? "Erreur" });
      } else {
        setMessage({ type: "success", text: "Bon de préparation renvoyé par email" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Chargement...</div>;
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">Commande introuvable</p>
        <Link href="/admin/commandes" className="text-[#356B0D] font-medium hover:underline">
          ← Retour aux commandes
        </Link>
      </div>
    );
  }

  const addr = order.shipping_address;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.push("/admin/commandes")} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-[#0F0F10]">
            Commande {order.id.slice(0, 8).toUpperCase()}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <span className={`ml-auto px-3 py-1.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-gray-100"}`}>
          {ALL_STATUSES.find((s) => s.value === order.status)?.label ?? order.status}
        </span>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium mb-6 ${
            message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Client info */}
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Client</h2>
          <p className="font-medium">{addr?.name ?? "—"}</p>
          <p className="text-sm text-gray-500">{order.email}</p>
          {order.payment_id && (
            <p className="text-xs text-gray-400 mt-2 font-mono">Stripe: {order.payment_id}</p>
          )}
        </div>

        {/* Shipping address */}
        <div className="bg-white rounded-xl border border-[#DBDBDB] p-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Adresse de livraison</h2>
          {addr ? (
            <div className="text-sm leading-relaxed">
              <p className="font-medium">{addr.name}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>{addr.postal_code} {addr.city}</p>
              <p>{addr.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Non renseignée</p>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-[#DBDBDB] overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-[#DBDBDB]">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Articles</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 font-medium text-gray-500">Produit</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-center">Qté</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-right">Prix unit.</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-5 py-3">
                  <span className="font-medium">{item.product_name}</span>
                  {item.variant_label && item.variant_label !== "standard" && item.variant_label !== "shipping" && (
                    <span className="text-gray-400 text-xs ml-2">({item.variant_label})</span>
                  )}
                </td>
                <td className="px-5 py-3 text-center">{item.quantity}</td>
                <td className="px-5 py-3 text-right">{item.unit_price.toFixed(2)} €</td>
                <td className="px-5 py-3 text-right font-medium">{(item.unit_price * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-4 border-t border-[#DBDBDB] bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sous-total</span>
            <span>{order.subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Livraison DPD</span>
            <span>{order.shipping_cost.toFixed(2)} €</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Réduction</span>
              <span className="text-red-600">-{order.discount.toFixed(2)} €</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>{order.total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-[#DBDBDB] p-5 mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Actions</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Statut</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full h-10 rounded-[10px] border border-[#DBDBDB] bg-white px-3 text-sm focus:border-[#356B0D] focus:ring-[3px] focus:ring-[#356B0D]/30 outline-none"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tracking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">N° de tracking DPD</label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ex: 09981234567890"
              className="w-full h-10 rounded-[10px] border border-[#DBDBDB] bg-white px-4 text-sm focus:border-[#356B0D] focus:ring-[3px] focus:ring-[#356B0D]/30 outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-[#356B0D] text-white text-sm font-medium rounded-[10px] hover:bg-[#2d5a0b] transition-colors disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>

          {(order.status === "confirmed" || order.status === "processing") && (
            <button
              onClick={handleMarkShipped}
              disabled={saving}
              className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-[10px] hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              Marquer expédiée + notifier client
            </button>
          )}

          <button
            onClick={handleResendPreparation}
            disabled={saving}
            className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-[10px] border border-[#DBDBDB] hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Renvoyer le bon de préparation
          </button>
        </div>
      </div>

      {/* Tracking link */}
      {order.tracking_number && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <h2 className="text-xs font-semibold text-purple-800 uppercase tracking-wide mb-2">Suivi DPD</h2>
          <p className="font-mono text-sm mb-2">{order.tracking_number}</p>
          <a
            href={`https://trace.dpd.fr/parceldetails/${order.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-700 font-medium hover:underline"
          >
            Suivre sur dpd.fr →
          </a>
        </div>
      )}
    </div>
  );
}
