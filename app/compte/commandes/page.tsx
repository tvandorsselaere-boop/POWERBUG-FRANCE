import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  order_number: number;
  status: string;
  total: number;
  created_at: string;
  tracking_number: string | null;
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

function formatPrice(euros: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(euros);
}

export default async function CommandesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: orders } = (await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("email", user.email ?? "")
    .eq("store", "powerbug")
    .order("created_at", { ascending: false })) as {
    data: Order[] | null;
  };

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
        <span className="text-[#0F0F10]">Commandes</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Mes commandes
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <p className="text-[#6B7280]">
              Vous n&apos;avez pas encore passe de commande.
            </p>
            <Link
              href="/trolleys"
              className="mt-4 inline-block font-medium text-[#356B0D] hover:underline"
            >
              Decouvrir nos chariots
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => {
              const statusLabel =
                STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
              const statusClass =
                STATUS_CLASS[order.status] ?? STATUS_CLASS.pending;
              return (
                <div
                  key={order.id}
                  className="rounded-[10px] border border-[#DBDBDB] bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0F0F10]">
                        Commande #
                        {String(order.order_number).padStart(4, "0")}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {new Date(order.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={statusClass}>{statusLabel}</Badge>
                      <p className="mt-1 font-semibold text-[#0F0F10]">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                  {order.tracking_number && (
                    <p className="mt-2 text-sm text-[#6B7280]">
                      Suivi : {order.tracking_number}
                    </p>
                  )}
                  <div className="mt-3 text-sm text-[#6B7280]">
                    {order.items?.length ?? 0} article
                    {(order.items?.length ?? 0) > 1 ? "s" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
