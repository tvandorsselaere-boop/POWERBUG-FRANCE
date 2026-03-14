import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Package, MapPin, Settings, ChevronRight } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { SavedToast } from "./saved-toast";

export default async function ComptePage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  const profile = profileData as { full_name: string | null } | null;

  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("store", "powerbug");

  const nameStr = profile?.full_name ? `, ${profile.full_name}` : "";

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Mon compte</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <Suspense>
          <SavedToast />
        </Suspense>

        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Mon compte
        </h1>
        <p className="mt-2 text-[#6B7280]">
          Bienvenue{nameStr} ! Gerez votre compte et suivez vos commandes.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/compte/commandes"
            className="flex items-center gap-4 rounded-[10px] border border-[#DBDBDB] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <Package className="h-8 w-8 text-[#356B0D]" />
            <div>
              <h2 className="font-semibold text-[#0F0F10]">Mes commandes</h2>
              <p className="text-sm text-[#6B7280]">
                {count ?? 0} commande{(count ?? 0) > 1 ? "s" : ""}
              </p>
            </div>
          </Link>

          <Link
            href="/compte/adresses"
            className="flex items-center gap-4 rounded-[10px] border border-[#DBDBDB] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <MapPin className="h-8 w-8 text-[#356B0D]" />
            <div>
              <h2 className="font-semibold text-[#0F0F10]">Mes adresses</h2>
              <p className="text-sm text-[#6B7280]">
                Gerer votre adresse de livraison
              </p>
            </div>
          </Link>

          <Link
            href="/compte/parametres"
            className="flex items-center gap-4 rounded-[10px] border border-[#DBDBDB] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <Settings className="h-8 w-8 text-[#356B0D]" />
            <div>
              <h2 className="font-semibold text-[#0F0F10]">Parametres</h2>
              <p className="text-sm text-[#6B7280]">
                Mot de passe et securite
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 rounded-[10px] border border-[#DBDBDB] bg-[#F9FAFB] p-4">
          <h3 className="text-sm font-medium text-[#0F0F10]">
            Informations du compte
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
