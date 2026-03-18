import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX DHC Lithium - Chariot Électrique Premium 899€",
  description:
    "Le PowerBug NX DHC Lithium : Downhill Control, frein parking électronique, batterie lithium 36 trous, 8,2 kg. 899€ avec 2 accessoires offerts (~60€). Livraison France via DPD.",
  alternates: { canonical: "/trolleys/nx-dhc-lithium" },
};

export const revalidate = 3600;

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PowerBug NX DHC Lithium",
  description: "Chariot électrique de golf premium avec Downhill Control, frein parking électronique et batterie lithium 36 trous.",
  brand: { "@type": "Brand", name: "PowerBug" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "899",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.powerbug.fr/trolleys/nx-dhc-lithium",
  },
};

export default async function NxDhcLithiumPage() {
  const product = await getProductBySlug("nx-dhc-lithium");
  if (!product) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <ProductPageDb product={product} />

      {/* SEO content sections */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Pour qui est le NX DHC Lithium ?</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le PowerBug NX DHC Lithium est le choix des golfeurs exigeants qui jouent sur des parcours vallonnés ou accidentés. En plus de toutes les qualités du NX, le DHC ajoute deux fonctionnalités décisives : le Downhill Control et le frein parking électronique. Ces systèmes garantissent un contrôle total du chariot dans toutes les situations, y compris sur les pentes les plus raides.
            </p>
            <p className="leading-relaxed">
              Si votre parcours habituel comporte du dénivelé, le NX DHC à 899&nbsp;&euro; est un investissement qui change véritablement l&apos;expérience de jeu. Si vous jouez principalement sur terrain plat, le NX Lithium à 799&nbsp;&euro; vous offre les mêmes performances de base à un prix inférieur.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Downhill Control (DHC) — la technologie exclusive</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le système DHC régule automatiquement la vitesse du chariot lors des descentes. Plus besoin de retenir manuellement le chariot dans les pentes : le DHC adapte la résistance du moteur pour maintenir une vitesse stable et sécurisée. C&apos;est une technologie exclusive PowerBug qui fait la différence sur les parcours avec du dénivelé.
            </p>
            <p className="leading-relaxed">
              Le frein parking électronique complète le DHC en immobilisant instantanément le chariot d&apos;une simple pression. Indispensable sur les greens en pente, les zones d&apos;attente et partout où vous devez poser le chariot sans risque qu&apos;il roule. Contrairement à un frein mécanique, le frein électronique ne nécessite aucun réglage et fonctionne avec précision.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-16">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Ce qui est inclus</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Avec l&apos;achat du NX DHC Lithium, vous recevez le chariot complet avec batterie lithium 36 trous et chargeur. En offre de lancement, 2 accessoires d&apos;une valeur de ~60&nbsp;&euro; sont inclus : le porte-parapluie NX et le porte-scorecard. Garantie constructeur 2 ans, batterie comprise, avec SAV en France.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
