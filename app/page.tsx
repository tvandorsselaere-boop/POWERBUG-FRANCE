import Link from "next/link";
import Image from "next/image";
import {
  Battery,
  Shield,
  Truck,
  Star,
  ChevronRight,
  Zap,
  Settings,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrolleys } from "@/lib/supabase/queries";

const trolleyMeta = [
  {
    slug: "nx-lithium",
    name: "NX Lithium",
    price: "899",
    description:
      "Systeme 28V, batterie lithium 36 trous, pliage VRAP ultra-compact. Le chariot electrique fiable et performant.",
    specs: ["28V Power System", "Batterie Lithium 36 trous", "Pliage VRAP compact"],
    href: "/trolleys/nx-lithium",
    badge: "Populaire",
  },
  {
    slug: "nx-dhc-lithium",
    name: "NX DHC Lithium",
    price: "999",
    description:
      "Tous les avantages du NX, plus le Downhill Control et le frein parking electronique. Le controle total.",
    specs: ["Downhill Control (DHC)", "Frein parking electronique", "Toutes les specs du NX"],
    href: "/trolleys/nx-dhc-lithium",
    badge: "Premium",
  },
];

const features = [
  {
    icon: Battery,
    title: "Batterie 36 trous",
    description:
      "Batterie lithium longue duree pour jouer 2 tours complets sans recharge.",
  },
  {
    icon: Shield,
    title: "Garantie 2 ans",
    description:
      "Trolley et batterie couverts par la garantie constructeur de 2 ans. SAV en France.",
  },
  {
    icon: Truck,
    title: "Livraison France",
    description:
      "Livraison rapide partout en France via Colissimo et Mondial Relay.",
  },
  {
    icon: Star,
    title: "8 000+ avis",
    description:
      "N°1 au classement client des marques de chariots electriques. Depuis 2003.",
  },
];

export const revalidate = 3600;

export default async function Home() {
  const dbTrolleys = await getTrolleys();
  const imageMap: Record<string, string> = {};
  for (const t of dbTrolleys) {
    const img = t.product_images?.find((i) => i.is_primary)?.url ?? t.product_images?.[0]?.url;
    if (img) imageMap[t.slug] = img;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#F5F5F5]">
        <div className="mx-auto max-w-[1600px] px-6 py-24 sm:py-32 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-in mb-4 text-sm font-semibold uppercase tracking-widest text-[#356B0D]">
              Distributeur exclusif France
            </p>

            <h1 className="animate-fade-in-delay-1 text-4xl font-bold leading-tight tracking-tight text-[#0F0F10] sm:text-5xl lg:text-7xl">
              Chariots electriques{" "}
              <span className="text-[#356B0D]">PowerBug</span>
            </h1>

            <p className="animate-fade-in-delay-2 mx-auto mt-6 max-w-xl text-lg text-[#6B7280]">
              Depuis 2003, l&apos;innovation britannique au service du golf. Decouvrez la serie NX,
              enfin disponible pour les golfeurs francais.
            </p>

            <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-glass rounded-[10px] px-8 text-base font-semibold text-white"
              >
                <Link href="/trolleys">
                  Decouvrir la gamme
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-glass-outline rounded-[10px] px-8 text-base text-[#0F0F10]"
              >
                <Link href="/configurateur">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurer mon trolley
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle banner */}
      <section className="border-y border-[#DBDBDB] bg-[#356B0D] py-4">
        <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-3 px-6 text-white">
          <Gift className="h-5 w-5" />
          <p className="text-sm font-medium sm:text-base">
            <span className="font-bold">Offre speciale :</span> 3 accessoires offerts (~105&euro;) avec l&apos;achat d&apos;un trolley !
          </p>
        </div>
      </section>

      {/* Trolleys - Serie NX */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Portee 2025
            </p>
          </div>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-5xl">
              Serie NX
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {trolleyMeta.map((trolley) => (
              <Link
                key={trolley.name}
                href={trolley.href}
                className="group card-glass rounded-2xl p-8 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
              >
                <div className="mb-6 flex h-64 items-center justify-center rounded-xl bg-[#F5F5F5] overflow-hidden">
                  {imageMap[trolley.slug] ? (
                    <Image
                      src={imageMap[trolley.slug]}
                      alt={trolley.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-contain p-6"
                    />
                  ) : (
                    <Zap className="h-20 w-20 text-[#DBDBDB] transition-colors group-hover:text-[#8DC63F]" />
                  )}
                </div>

                <div className="mb-2 inline-flex rounded-full bg-[#356B0D]/10 px-3 py-1 text-xs font-medium text-[#356B0D]">
                  {trolley.badge}
                </div>

                <h3 className="text-2xl font-bold text-[#0F0F10]">{trolley.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {trolley.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {trolley.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-sm text-[#0F0F10]"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#8DC63F]" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#0F0F10]">
                    {trolley.price}<span className="text-lg text-[#6B7280]">&euro;</span>
                  </span>
                  <span className="text-sm font-medium text-[#356B0D] opacity-0 transition-opacity group-hover:opacity-100">
                    Voir le produit &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="btn-glass-outline rounded-[10px] text-[#0F0F10]"
            >
              <Link href="/trolleys">
                Comparer NX vs NX DHC
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#DBDBDB] bg-[#F5F5F5] py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Pourquoi PowerBug ?
            </h2>
            <p className="mt-3 text-[#6B7280]">
              La reference des chariots electriques depuis 2002.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card-glass rounded-xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#356B0D]/10">
                  <feature.icon className="h-6 w-6 text-[#356B0D]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F0F10]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-[#DBDBDB] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Configurez votre trolley ideal
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#6B7280]">
            Choisissez votre modele et recevez 3 accessoires offerts (~105&euro;).
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 btn-glass rounded-[10px] px-10 text-base font-semibold text-white"
          >
            <Link href="/configurateur">
              <Settings className="mr-2 h-5 w-5" />
              Lancer le configurateur
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
