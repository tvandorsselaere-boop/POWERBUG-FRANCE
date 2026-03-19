import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Package, Truck, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  id: string;
  product_name: string;
  variant_label: string | null;
  quantity: number;
  unit_price: number;
}

interface ShippingAddress {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  shipping_method?: string;
  relay_id?: string;
  relay_name?: string;
  relay_address?: string;
}

interface Order {
  id: string;
  order_number: number;
  status: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  created_at: string;
  tracking_number: string | null;
  email: string;
  shipping_address: ShippingAddress | null;
  items: OrderItem[];
}

const STATUS_CLASS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmee",
  processing: "En preparation",
  shipped: "Expediee",
  delivered: "Livree",
  cancelled: "Annulee",
  refunded: "Remboursee",
};

const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  BE: "Belgique",
  CH: "Suisse",
};

function formatPrice(euros: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(euros);
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: order } = (await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .eq("store", "powerbug")
    .single()) as { data: Order | null };

  if (!order) notFound();

  // Verify ownership
  if (order.email !== user.email) notFound();

  const statusLabel = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
  const statusClass = STATUS_CLASS[order.status] ?? STATUS_CLASS.pending;
  const addr = order.shipping_address;
  const isRelay = addr?.shipping_method === "dpd_relay";
  const orderDate = new Date(order.created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/compte" className="hover:text-[#356B0D]">
          Mon compte
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/compte/commandes" className="hover:text-[#356B0D]">
          Commandes
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">
          #{String(order.order_number).padStart(4, "0")}
        </span>
      </nav>

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F0F10] sm:text-3xl">
              Commande #{String(order.order_number).padStart(4, "0")}
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Passee le {orderDate}
            </p>
          </div>
          <Badge className={`${statusClass} text-sm px-3 py-1`}>
            {statusLabel}
          </Badge>
        </div>

        {/* Tracking */}
        {order.tracking_number && (
          <div className="mt-6 rounded-[10px] border border-[#bbf7d0] bg-[#f0fdf4] p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[#356B0D]" />
              <div>
                <p className="font-medium text-[#0F0F10]">
                  Suivi DPD : {order.tracking_number}
                </p>
                <a
                  href={`https://trace.dpd.fr/parceldetails/${order.tracking_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#356B0D] hover:underline"
                >
                  Suivre mon colis
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Articles */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0F0F10]">
            <Package className="h-5 w-5" />
            Articles
          </h2>
          <div className="mt-4 rounded-[10px] border border-[#DBDBDB] bg-white">
            {order.items.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 ${
                  i < order.items.length - 1
                    ? "border-b border-[#DBDBDB]"
                    : ""
                }`}
              >
                <div>
                  <p className="font-medium text-[#0F0F10]">
                    {item.product_name}
                  </p>
                  {item.variant_label &&
                    item.variant_label !== "standard" && (
                      <p className="text-sm text-[#6B7280]">
                        {item.variant_label}
                      </p>
                    )}
                  <p className="text-sm text-[#6B7280]">
                    Quantite : {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-[#0F0F10]">
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
              </div>
            ))}

            {/* Totaux */}
            <div className="border-t border-[#DBDBDB] bg-[#f9f9f9] p-4 rounded-b-[10px]">
              <div className="flex justify-between text-sm text-[#6B7280]">
                <span>Sous-total</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-[#6B7280]">
                <span>
                  {isRelay
                    ? "Livraison DPD Relais"
                    : "Livraison DPD a domicile"}
                </span>
                <span>{formatPrice(order.shipping_cost)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-[#DBDBDB] pt-2 text-base font-semibold text-[#0F0F10]">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Adresse de livraison */}
        {addr && (
          <div className="mt-8">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0F0F10]">
              <MapPin className="h-5 w-5" />
              {isRelay ? "Point relais" : "Adresse de livraison"}
            </h2>

            {isRelay && addr.relay_name && (
              <div className="mt-4 rounded-[10px] border border-[#7C3AED]/30 bg-[#f3e8ff] p-4">
                <p className="font-semibold text-[#7C3AED]">
                  {addr.relay_name}
                </p>
                {addr.relay_address && (
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {addr.relay_address}
                  </p>
                )}
              </div>
            )}

            <div
              className={`${isRelay ? "mt-3" : "mt-4"} rounded-[10px] border border-[#DBDBDB] bg-white p-4`}
            >
              <p className="font-medium text-[#0F0F10]">{addr.name}</p>
              {addr.line1 && (
                <p className="text-sm text-[#6B7280]">{addr.line1}</p>
              )}
              {addr.line2 && (
                <p className="text-sm text-[#6B7280]">{addr.line2}</p>
              )}
              <p className="text-sm text-[#6B7280]">
                {addr.postal_code} {addr.city}
              </p>
              {addr.country && (
                <p className="text-sm text-[#6B7280]">
                  {COUNTRY_NAMES[addr.country] ?? addr.country}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/compte/commandes"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#DBDBDB] bg-white px-6 py-2.5 text-sm font-medium text-[#0F0F10] transition-colors hover:bg-[#f9f9f9]"
          >
            Retour aux commandes
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#356B0D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a5509]"
          >
            Besoin d&apos;aide ?
          </Link>
        </div>
      </div>
    </div>
  );
}
