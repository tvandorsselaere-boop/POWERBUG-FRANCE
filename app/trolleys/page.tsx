import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingCart, Zap, Check, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trolleySpecs } from "@/lib/data/products";
import { getTrolleys } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Comparateur NX vs NX DHC - Chariots PowerBug",
  description:
    "Comparez les chariots electriques PowerBug NX Lithium et NX DHC Lithium. Specs, prix, fonctionnalites cote a cote.",
};

export const revalidate = 3600;

function TrolleyImage({ url, alt, className }: { url?: string; alt: string; className?: string }) {
  if (url) {
    return (
      <Image
        src={url}
        alt={alt}
        width={300}
        height={300}
        className={className ?? "h-full w-full object-contain p-4"}
      />
    );
  }
  return <Zap className="h-16 w-16 text-[#DBDBDB]" />;
}

export default async function TrolleysPage() {
  const trolleys = await getTrolleys();
  const nx = trolleys.find((t) => t.slug === "nx-lithium");
  const nxDhc = trolleys.find((t) => t.slug === "nx-dhc-lithium");
  const nxImg = nx?.product_images?.find((i) => i.is_primary)?.url ?? nx?.product_images?.[0]?.url;
  const dhcImg = nxDhc?.product_images?.find((i) => i.is_primary)?.url ?? nxDhc?.product_images?.[0]?.url;

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
          <div className="mb-4 flex items-center justify-center rounded-xl bg-[#F5F5F5] py-8 h-56 overflow-hidden">
            <TrolleyImage url={nxImg} alt="NX Lithium" className="h-full w-full object-contain p-4" />
          </div>
          <span className="mb-2 inline-flex rounded-full bg-[#F5F5F5] px-3 py-1 text-xs font-medium text-[#6B7280]">
            Populaire
          </span>
          <h2 className="text-2xl font-bold text-[#0F0F10]">NX Lithium</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Systeme 28V, batterie lithium 36 trous, pliage VRAP
            ultra-compact. Le chariot electrique fiable et performant.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />28V Power System</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />Batterie Lithium 36 trous</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />Pliage VRAP compact</li>
          </ul>
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
          <div className="mb-4 flex items-center justify-center rounded-xl bg-[#356B0D]/5 py-8 h-56 overflow-hidden">
            <TrolleyImage url={dhcImg} alt="NX DHC Lithium" className="h-full w-full object-contain p-4" />
          </div>
          <span className="mb-2 inline-flex rounded-full bg-[#356B0D]/10 px-3 py-1 text-xs font-medium text-[#356B0D]">
            Premium
          </span>
          <h2 className="text-2xl font-bold text-[#0F0F10]">NX DHC Lithium</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Tous les avantages du NX, plus le Downhill Control
            et le frein parking electronique. Le controle total.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />Downhill Control (DHC)</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />Frein parking electronique</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#356B0D]" />Toutes les specs du NX</li>
          </ul>
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
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white overflow-hidden">
                      {nxImg ? (
                        <Image src={nxImg} alt="NX Lithium" width={96} height={96} className="h-full w-full object-contain p-2" />
                      ) : (
                        <Zap className="h-10 w-10 text-[#DBDBDB]" />
                      )}
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
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#356B0D]/10 overflow-hidden">
                      {dhcImg ? (
                        <Image src={dhcImg} alt="NX DHC Lithium" width={96} height={96} className="h-full w-full object-contain p-2" />
                      ) : (
                        <Zap className="h-10 w-10 text-[#8DC63F]" />
                      )}
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
            3 accessoires offerts avec votre trolley (~105&euro;)
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Travel Cover, Umbrella Holder et Score Card Holder inclus offerts avec tout achat de trolley PowerBug NX.
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
