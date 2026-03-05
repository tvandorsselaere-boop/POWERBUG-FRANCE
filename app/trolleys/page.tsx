import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Zap, Check, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trolleySpecs, BUNDLE_VALUE } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Comparateur NX vs NX DHC - Chariots PowerBug",
  description:
    "Comparez les chariots electriques PowerBug NX Lithium et NX DHC Lithium. Specs, prix, fonctionnalites cote a cote.",
};

export default function TrolleysPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Chariots</span>
      </nav>

      {/* Header */}
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
          Portee 2025
        </p>
      </div>
      <div className="mb-14 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-5xl">
          Serie NX
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
          Trouvez le chariot qui vous correspond. Le NX pour l&apos;essentiel, le
          NX DHC pour le controle total.
        </p>
      </div>

      {/* Mobile cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:hidden">
        {/* NX */}
        <div className="card-glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-center rounded-xl bg-[#F5F5F5] py-16">
            <Zap className="h-16 w-16 text-[#DBDBDB]" />
          </div>
          <span className="mb-2 inline-flex rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6B7280]">
            Populaire
          </span>
          <h2 className="text-2xl font-bold text-[#0F0F10]">NX Lithium</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            28V Power System, pliage VRAP, batterie 36 trous. L&apos;essentiel du chariot electrique.
          </p>
          <p className="mt-4 text-3xl font-bold text-[#0F0F10]">
            899<span className="text-lg text-[#6B7280]">&euro;</span>
          </p>
          <Button
            asChild
            className="mt-4 w-full btn-glass rounded-[10px] text-white"
          >
            <Link href="/trolleys/nx-lithium">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Voir le NX
            </Link>
          </Button>
        </div>

        {/* NX DHC */}
        <div className="card-glass rounded-2xl border-2 border-[#356B0D] p-6">
          <div className="mb-4 flex items-center justify-center rounded-xl bg-[#356B0D]/5 py-16">
            <Zap className="h-16 w-16 text-[#8DC63F]" />
          </div>
          <span className="mb-2 inline-flex rounded-full bg-[#356B0D]/10 px-3 py-1 text-xs font-medium text-[#356B0D]">
            Premium
          </span>
          <h2 className="text-2xl font-bold text-[#0F0F10]">NX DHC Lithium</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Downhill Control, frein parking electronique. Le controle total.
          </p>
          <p className="mt-4 text-3xl font-bold text-[#0F0F10]">
            999<span className="text-lg text-[#6B7280]">&euro;</span>
          </p>
          <Button
            asChild
            className="mt-4 w-full btn-glass rounded-[10px] text-white"
          >
            <Link href="/trolleys/nx-dhc-lithium">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Voir le NX DHC
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop comparator table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-[#DBDBDB]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DBDBDB] bg-[#F5F5F5]">
                <th className="px-6 py-6 text-left text-sm font-medium text-[#6B7280]">
                  Caracteristique
                </th>
                <th className="px-6 py-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white">
                      <Zap className="h-10 w-10 text-[#DBDBDB]" />
                    </div>
                    <div>
                      <span className="mb-1 inline-flex rounded-full bg-white px-2 py-0.5 text-xs text-[#6B7280]">
                        Populaire
                      </span>
                      <p className="text-lg font-bold text-[#0F0F10]">NX Lithium</p>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#356B0D]/10">
                      <Zap className="h-10 w-10 text-[#8DC63F]" />
                    </div>
                    <div>
                      <span className="mb-1 inline-flex rounded-full bg-[#356B0D]/10 px-2 py-0.5 text-xs text-[#356B0D]">
                        Premium
                      </span>
                      <p className="text-lg font-bold text-[#0F0F10]">NX DHC Lithium</p>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {trolleySpecs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={`border-b border-[#DBDBDB]/50 ${
                    spec.highlight
                      ? "bg-[#356B0D]/5"
                      : i % 2 === 0
                        ? "bg-white"
                        : "bg-[#F5F5F5]/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#0F0F10]">
                    {spec.label}
                    {spec.highlight && (
                      <span className="ml-2 text-xs text-[#356B0D]">
                        DHC exclusif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-[#6B7280]">
                    {spec.nx === "Non" ? (
                      <X className="mx-auto h-4 w-4 text-[#DBDBDB]" />
                    ) : (
                      spec.nx
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-[#0F0F10]">
                    {spec.nxDhc === "Oui" ? (
                      <Check className="mx-auto h-5 w-5 text-[#8DC63F]" />
                    ) : (
                      spec.nxDhc
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CTA row */}
          <div className="grid grid-cols-3 border-t border-[#DBDBDB] bg-[#F5F5F5]">
            <div className="px-6 py-6" />
            <div className="flex justify-center px-6 py-6">
              <Button
                asChild
                variant="outline"
                className="btn-glass-outline rounded-[10px] text-[#0F0F10]"
              >
                <Link href="/trolleys/nx-lithium">
                  Voir le NX
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center px-6 py-6">
              <Button
                asChild
                className="btn-glass rounded-[10px] text-white"
              >
                <Link href="/trolleys/nx-dhc-lithium">
                  Voir le NX DHC
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bundle CTA */}
      <div className="mt-16 flex items-start gap-4 rounded-2xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-8 sm:items-center sm:p-12">
        <Gift className="h-10 w-10 shrink-0 text-[#356B0D]" />
        <div>
          <h2 className="text-xl font-bold text-[#0F0F10] sm:text-2xl">
            3 accessoires offerts avec votre trolley
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Travel Cover + Drink Holder + Umbrella Holder (valeur{" "}
            {BUNDLE_VALUE.toFixed(2)}&euro;) offerts automatiquement.
          </p>
          <Button
            asChild
            className="mt-4 btn-glass rounded-[10px] text-white"
          >
            <Link href="/configurateur">Configurer mon trolley</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
