"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/browser";

interface Address {
  full_name: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
}

const emptyAddress: Address = {
  full_name: "",
  street: "",
  city: "",
  zip: "",
  country: "France",
  phone: "",
};

export default function AdressesPage() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("default_shipping_address")
        .eq("id", user.id)
        .single() as { data: { default_shipping_address: Address | null } | null };
      if (data?.default_shipping_address) {
        setAddress(data.default_shipping_address);
      }
      setLoading(false);
    }
    load();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await (supabase
      .from("profiles") as ReturnType<typeof supabase.from>)
      .update({
        default_shipping_address: address as unknown as Record<string, string>,
      } as never)
      .eq("id", user.id);

    setSaving(false);
    router.push("/compte?saved=1");
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-xl">
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

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
        <span className="text-[#0F0F10]">Adresses</span>
      </nav>

      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Adresse de livraison
        </h1>
        <p className="mt-2 text-[#6B7280]">
          Renseignez votre adresse par defaut pour accelerer vos achats.
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
              Nom complet
            </label>
            <input
              type="text"
              value={address.full_name}
              onChange={(e) =>
                setAddress({ ...address, full_name: e.target.value })
              }
              placeholder="Jean Dupont"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
              Adresse
            </label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="12 rue de la Paix"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Code postal
              </label>
              <input
                type="text"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
                placeholder="75001"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                Ville
              </label>
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                placeholder="Paris"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
              Pays
            </label>
            <input
              type="text"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              placeholder="France"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
              Telephone
            </label>
            <input
              type="tel"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              placeholder="06 12 34 56 78"
              className={inputClass}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="w-full btn-glass rounded-[10px] text-white"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer l'adresse"
            )}
          </Button>
        </form>

        <Link
          href="/compte"
          className="mt-6 flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#356B0D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au compte
        </Link>
      </div>
    </div>
  );
}
