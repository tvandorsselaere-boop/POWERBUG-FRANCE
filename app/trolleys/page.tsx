import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Zap, Check, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trolleySpecs } from "@/lib/data/products";
import { getTrolleys } from "@/lib/supabase/queries";
import { AddToCartRedirect } from "@/components/add-to-cart-redirect";

export const metadata: Metadata = {
  title: "Comparateur NX vs NX DHC - Chariots Électriques PowerBug",
  description:
    "Comparez les chariots électriques PowerBug NX Lithium (799€) et NX DHC Lithium (899€). Specs, prix, Downhill Control, pliage VRAP. 2 accessoires offerts avec chaque chariot.",
  alternates: { canonical: "/trolleys" },
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

      {/* Header — compact on mobile */}
      <div className="mb-2 text-center md:mb-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
          Gamme 2026
        </p>
      </div>
      <div className="mb-6 text-center md:mb-14">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-5xl">
          Serie NX
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B7280] md:mt-4 md:text-lg">
          Le NX pour l&apos;essentiel, le NX DHC pour le controle total.
        </p>
      </div>

      {/* Mobile quick shop cards — AVANT le texte */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:hidden">
        {[
          { slug: "nx-lithium", name: "NX Lithium", price: 799, compare: 899, img: nxImg, badge: "Populaire", badgeColor: "bg-[#356B0D]/10 text-[#356B0D]", href: "/trolleys/nx-lithium" },
          { slug: "nx-dhc-lithium", name: "NX DHC Lithium", price: 899, compare: 999, img: dhcImg, badge: "Premium", badgeColor: "bg-[#F6A429]/15 text-[#A87A00]", href: "/trolleys/nx-dhc-lithium" },
        ].map((t) => (
          <div key={t.slug} className="overflow-hidden rounded-xl border border-[#DBDBDB] bg-white">
            <div className="relative aspect-square bg-white p-2">
              {t.img ? (
                <Image src={t.img} alt={t.name} width={300} height={300} className="h-full w-full object-contain p-1" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Zap className="h-10 w-10 text-[#DBDBDB]" />
                </div>
              )}
              <div className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.badgeColor}`}>
                {t.badge}
              </div>
              <div className="absolute top-2 right-2 rounded-full bg-[#AE1717]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#AE1717]">
                -100€
              </div>
            </div>
            <div className="p-3">
              <h2 className="text-sm font-bold text-[#0F0F10]">{t.name}</h2>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-[#0F0F10]">{t.price}€</span>
                <span className="text-xs text-[#6B7280] line-through">{t.compare}€</span>
              </div>
              <AddToCartRedirect
                slug={t.slug}
                name={t.name}
                price={t.price}
                compare_at_price={t.compare}
                className="mt-2 w-full rounded-lg py-2 text-xs font-semibold text-white transition-all active:scale-[0.97]"
                style={{ background: "linear-gradient(90deg,#356B0D,#5a9e1f)" }}
              />
              <Link href={t.href} className="mt-1.5 block text-center text-[10px] font-medium text-[#356B0D] underline">
                Voir le détail
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mb-8 text-center text-[10px] text-[#6B7280] md:hidden">
        <Gift className="mr-1 inline h-3 w-3 text-[#356B0D]" />
        Porte-parapluie + porte-scorecard offerts (~60€) avec chaque chariot
      </p>

      {/* Introduction prose */}
      <div className="mx-auto mb-14 max-w-3xl space-y-4 text-[#6B7280]">
        <p className="leading-relaxed">
          Tous les chariots PowerBug de la série NX partagent le même ADN : un système d&apos;alimentation 28V à batterie lithium, le pliage VRAP ultra-compact breveté et un moteur brushless silencieux. La différence entre le NX et le NX DHC se situe au niveau du contrôle en descente et du freinage.
        </p>
        <p className="leading-relaxed">
          Le <strong className="text-[#0F0F10]">NX Lithium</strong> est le choix idéal pour les golfeurs qui recherchent un chariot électrique fiable, léger (7,9&nbsp;kg) et performant sur terrain plat ou légèrement vallonné. Le <strong className="text-[#0F0F10]">NX DHC Lithium</strong> ajoute le système Downhill Control qui régule automatiquement la vitesse en descente, ainsi qu&apos;un frein parking électronique — indispensable sur les parcours avec du dénivelé.
        </p>
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
                  <Link href="/trolleys/nx-lithium" className="group flex flex-col items-center gap-3">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden">
                      {nxImg ? (
                        <Image src={nxImg} alt="NX Lithium" width={96} height={96} className="h-full w-full object-contain" />
                      ) : (
                        <Zap className="h-10 w-10 text-[#DBDBDB]" />
                      )}
                    </div>
                    <div>
                      <span className="mb-1 inline-flex rounded-full bg-white px-2 py-0.5 text-xs text-[#6B7280]">
                        Populaire
                      </span>
                      <p className="text-lg font-bold text-[#0F0F10] group-hover:text-[#356B0D]">NX Lithium</p>
                    </div>
                  </Link>
                </th>
                <th className="px-6 py-6 text-center">
                  <Link href="/trolleys/nx-dhc-lithium" className="group flex flex-col items-center gap-3">
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#F5F5F5] overflow-hidden">
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
                      <p className="text-lg font-bold text-[#0F0F10] group-hover:text-[#356B0D]">NX DHC Lithium</p>
                    </div>
                  </Link>
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
                    ) : spec.compareNx ? (
                      <span>
                        <span className="font-semibold text-[#0F0F10]">{spec.nx}</span>
                        <span className="ml-1 text-xs line-through text-[#9CA3AF]">{spec.compareNx}</span>
                      </span>
                    ) : (
                      spec.nx
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-[#0F0F10]">
                    {spec.nxDhc === "Oui" ? (
                      <Check className="mx-auto h-5 w-5 text-[#8DC63F]" />
                    ) : spec.compareNxDhc ? (
                      <span>
                        <span className="font-semibold text-[#0F0F10]">{spec.nxDhc}</span>
                        <span className="ml-1 text-xs line-through text-[#9CA3AF]">{spec.compareNxDhc}</span>
                      </span>
                    ) : (
                      spec.nxDhc
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#DBDBDB] bg-[#F5F5F5]">
                <td className="px-6 py-6" />
                <td className="px-6 py-6 text-center">
                  <Link
                    href="/trolleys/nx-lithium"
                    className="inline-flex min-w-[160px] items-center justify-center rounded-[10px] border border-[#356B0D] px-6 py-2.5 text-sm font-medium text-[#356B0D] transition-colors hover:bg-[#356B0D] hover:text-white"
                  >
                    Decouvrir le NX
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </td>
                <td className="px-6 py-6 text-center">
                  <Link
                    href="/trolleys/nx-dhc-lithium"
                    className="inline-flex min-w-[160px] items-center justify-center rounded-[10px] bg-[#356B0D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#356B0D]/90"
                  >
                    Decouvrir le NX DHC
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Comment choisir */}
      <div className="mt-16 mx-auto max-w-3xl">
        <h2 className="mb-6 text-2xl font-bold text-[#0F0F10] sm:text-3xl">
          Comment choisir entre le NX et le NX DHC ?
        </h2>
        <div className="space-y-4 text-[#6B7280]">
          <p className="leading-relaxed">
            Le choix entre le NX et le NX DHC dépend principalement de votre parcours habituel. Si vous jouez sur un terrain relativement plat, le <strong className="text-[#0F0F10]">NX Lithium à 799&nbsp;&euro;</strong> offre toutes les fonctionnalités essentielles avec un rapport qualité-prix excellent. Si votre parcours comporte des pentes marquées ou si vous souhaitez un contrôle maximal dans toutes les situations, le <strong className="text-[#0F0F10]">NX DHC Lithium à 899&nbsp;&euro;</strong> est le choix recommandé.
          </p>
          <p className="leading-relaxed">
            Les deux modèles bénéficient de la même batterie lithium 36 trous, du même pliage VRAP en moins de 5 secondes et de la même garantie constructeur 2 ans. Avec l&apos;offre de lancement, 2 accessoires d&apos;une valeur de ~60&nbsp;&euro; sont inclus avec chaque chariot : le porte-parapluie NX et le porte-scorecard.
          </p>
        </div>
      </div>

      {/* Bundle CTA */}
      <div className="mt-16 flex items-start gap-4 rounded-2xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-8 sm:items-center sm:p-12">
        <Gift className="h-10 w-10 shrink-0 text-[#356B0D]" />
        <div>
          <h2 className="text-xl font-bold text-[#0F0F10] sm:text-2xl">
            2 accessoires offerts avec votre chariot (~60&euro;)
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] sm:text-base">
            Porte-scorecard et Porte-parapluie inclus offerts avec tout achat de chariot PowerBug NX.
          </p>
          <Button
            asChild
            className="mt-4 btn-glass rounded-[10px] text-white"
          >
            <Link href="/#quiz">Quel trolley pour moi ?</Link>
          </Button>
        </div>
      </div>

      {/* FAQ Trolleys */}
      <div className="mt-16 mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10] sm:text-3xl">
          Questions fréquentes sur les chariots
        </h2>
        <div className="divide-y divide-[#DBDBDB]">
          {[
            {
              q: "Quelle autonomie a la batterie du PowerBug NX ?",
              a: "La batterie lithium 28V offre une autonomie de 36 trous (2 tours complets) sur une seule charge. La durée de vie estimée de la batterie est de 5 à 7 ans avec un entretien standard : rechargez après chaque utilisation et stockez à température ambiante.",
            },
            {
              q: "Le NX se plie-t-il facilement ?",
              a: "Oui, grâce au système de pliage VRAP breveté, le NX se plie en moins de 5 secondes, roues comprises. Plié, il est suffisamment compact pour se glisser dans n\u2019importe quel coffre de voiture. Le NX pèse 7,9 kg et le NX DHC 8,2 kg, batterie incluse.",
            },
            {
              q: "Peut-on ajouter des accessoires au NX ?",
              a: "Chaque chariot NX dispose d\u2019une station accessoires intégrée permettant de fixer les accessoires PowerBug : porte-parapluie, porte-scorecard, support téléphone, sac isotherme, mitaines chauffantes et bien d\u2019autres. La fixation est universelle, sans outils.",
            },
            {
              q: "Le NX DHC fonctionne-t-il sous la pluie ?",
              a: "Oui, les chariots PowerBug NX sont conçus pour fonctionner par tous les temps. L\u2019électronique est protégée et les pneus Winter-Ready offrent une adhérence optimale sur terrain humide. Les pneus sont même inversibles pour passer en profil cranté l\u2019hiver.",
            },
          ].map((item) => (
            <div key={item.q} className="py-5">
              <h3 className="text-base font-semibold text-[#0F0F10]">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
