"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  Loader2,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  Phone,
  User,
} from "lucide-react";
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
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  const [formAddress, setFormAddress] = useState<Address>(emptyAddress);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = (await supabase
        .from("profiles")
        .select("default_shipping_address")
        .eq("id", user.id)
        .single()) as {
        data: { default_shipping_address: Address | null } | null;
      };
      if (data?.default_shipping_address) {
        setSavedAddress(data.default_shipping_address);
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

    await (
      supabase.from("profiles") as ReturnType<typeof supabase.from>
    )
      .update({
        default_shipping_address:
          formAddress as unknown as Record<string, string>,
      } as never)
      .eq("id", user.id);

    setSavedAddress(formAddress);
    setEditing(false);
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await (
      supabase.from("profiles") as ReturnType<typeof supabase.from>
    )
      .update({
        default_shipping_address: null,
      } as never)
      .eq("id", user.id);

    setSavedAddress(null);
    setFormAddress(emptyAddress);
    setEditing(false);
    setShowDeleteConfirm(false);
    setDeleting(false);
  };

  const startEditing = () => {
    if (savedAddress) {
      setFormAddress({ ...savedAddress });
    }
    setEditing(true);
  };

  const startAdding = () => {
    setFormAddress(emptyAddress);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setShowDeleteConfirm(false);
  };

  const inputClass =
    "w-full rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2.5 text-sm text-[#0F0F10] placeholder-[#9CA3AF] focus:border-[#356B0D] focus:outline-none focus:ring-1 focus:ring-[#356B0D]";

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Chargement...</p>
          </div>
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
          {savedAddress
            ? "Votre adresse de livraison par defaut."
            : "Ajoutez une adresse pour accelerer vos achats."}
        </p>

        {/* ─── Address Card (when saved and not editing) ─── */}
        {savedAddress && !editing && (
          <div className="mt-8">
            <div className="rounded-[10px] border border-[#DBDBDB] bg-white p-6">
              {/* Header */}
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#356B0D]" />
                <span className="text-sm font-semibold text-[#356B0D]">
                  Adresse par defaut
                </span>
              </div>

              {/* Address details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#9CA3AF]" />
                  <p className="text-[15px] font-medium text-[#0F0F10]">
                    {savedAddress.full_name}
                  </p>
                </div>
                <p className="pl-6 text-sm text-[#0F0F10]">
                  {savedAddress.street}
                </p>
                <p className="pl-6 text-sm text-[#0F0F10]">
                  {savedAddress.zip} {savedAddress.city}
                </p>
                <p className="pl-6 text-sm text-[#6B7280]">
                  {savedAddress.country}
                </p>
                {savedAddress.phone && (
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="h-4 w-4 text-[#9CA3AF]" />
                    <p className="text-sm text-[#6B7280]">
                      {savedAddress.phone}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center gap-3 border-t border-[#DBDBDB] pt-4">
                <button
                  onClick={startEditing}
                  className="flex items-center gap-1.5 rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2 text-sm font-medium text-[#0F0F10] transition-colors hover:border-[#356B0D] hover:text-[#356B0D]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Modifier
                </button>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center gap-1.5 rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2 text-sm font-medium text-[#AE1717] transition-colors hover:border-[#AE1717] hover:bg-[#FEF2F2]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B7280]">Confirmer ?</span>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex items-center gap-1.5 rounded-[10px] bg-[#AE1717] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {deleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Oui, supprimer
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="rounded-[10px] border border-[#DBDBDB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0F0F10]"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── Add Address Button (when no address and not editing) ─── */}
        {!savedAddress && !editing && (
          <div className="mt-8">
            <button
              onClick={startAdding}
              className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#DBDBDB] bg-[#F9FAFB] p-8 text-sm font-medium text-[#6B7280] transition-colors hover:border-[#356B0D] hover:text-[#356B0D]"
            >
              <Plus className="h-5 w-5" />
              Ajouter une adresse de livraison
            </button>
          </div>
        )}

        {/* ─── Edit / Add Form ─── */}
        {editing && (
          <form onSubmit={handleSave} className="mt-8 space-y-5">
            <div className="rounded-[10px] border border-[#DBDBDB] bg-white p-6">
              <h2 className="mb-5 text-lg font-semibold text-[#0F0F10]">
                {savedAddress ? "Modifier l'adresse" : "Nouvelle adresse"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#0F0F10]">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={formAddress.full_name}
                    onChange={(e) =>
                      setFormAddress({
                        ...formAddress,
                        full_name: e.target.value,
                      })
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
                    required
                    value={formAddress.street}
                    onChange={(e) =>
                      setFormAddress({
                        ...formAddress,
                        street: e.target.value,
                      })
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
                      required
                      value={formAddress.zip}
                      onChange={(e) =>
                        setFormAddress({
                          ...formAddress,
                          zip: e.target.value,
                        })
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
                      required
                      value={formAddress.city}
                      onChange={(e) =>
                        setFormAddress({
                          ...formAddress,
                          city: e.target.value,
                        })
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
                    required
                    value={formAddress.country}
                    onChange={(e) =>
                      setFormAddress({
                        ...formAddress,
                        country: e.target.value,
                      })
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
                    value={formAddress.phone}
                    onChange={(e) =>
                      setFormAddress({
                        ...formAddress,
                        phone: e.target.value,
                      })
                    }
                    placeholder="06 12 34 56 78"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Form action buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={saving}
                className="flex-1 btn-glass rounded-[10px] text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : savedAddress ? (
                  "Enregistrer les modifications"
                ) : (
                  "Enregistrer l'adresse"
                )}
              </Button>
              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-[10px] border border-[#DBDBDB] bg-white px-6 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0F0F10]"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <Link
          href="/compte"
          className="mt-8 flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#356B0D]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au compte
        </Link>
      </div>
    </div>
  );
}
