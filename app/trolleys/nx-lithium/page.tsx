import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries";
import { ProductPageDb } from "@/components/product-page-db";

export const metadata: Metadata = {
  title: "PowerBug NX Lithium - Chariot Électrique de Golf 799€",
  description:
    "Le PowerBug NX Lithium : chariot électrique 28V, batterie lithium 36 trous, pliage VRAP ultra-compact, 7,9 kg. 799€ avec 2 accessoires offerts (~60€). Livraison France via DPD.",
  alternates: { canonical: "/trolleys/nx-lithium" },
};

export const revalidate = 3600;

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PowerBug NX Lithium",
  description: "Chariot électrique de golf 28V, batterie lithium 36 trous, pliage VRAP ultra-compact.",
  brand: { "@type": "Brand", name: "PowerBug" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "799",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.powerbug.fr/trolleys/nx-lithium",
  },
};

export default async function NxLithiumPage() {
  const product = await getProductBySlug("nx-lithium");
  if (!product) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <ProductPageDb product={product} />

      {/* SEO content sections */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Pour qui est le NX Lithium ?</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le PowerBug NX Lithium s&apos;adresse aux golfeurs qui recherchent un chariot électrique fiable et performant sans compromis sur le poids. Avec ses 7,9&nbsp;kg batterie incluse, le NX est l&apos;un des chariots électriques les plus légers de sa catégorie. Son pliage VRAP ultra-compact en fait le compagnon idéal des golfeurs qui transportent régulièrement leur matériel en voiture.
            </p>
            <p className="leading-relaxed">
              Le NX Lithium convient parfaitement aux parcours plats ou légèrement vallonnés. Si votre parcours comporte des pentes prononcées, le modèle NX DHC Lithium avec son système Downhill Control sera plus adapté. Pour un terrain standard, le NX à 799&nbsp;&euro; offre un rapport qualité-prix excellent.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Caractéristiques techniques du NX</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le cœur du NX est son système d&apos;alimentation 28V associé à un moteur brushless silencieux. La batterie lithium offre 36 trous d&apos;autonomie, soit 2 tours complets sur une seule charge. Le système de pliage VRAP breveté permet de plier le chariot en moins de 5 secondes, roues comprises.
            </p>
            <p className="leading-relaxed">
              Le châssis intègre une station accessoires universelle permettant de fixer les accessoires PowerBug : porte-parapluie, porte-scorecard, support téléphone, sac isotherme et plus encore. Les roues anti-colmatage et les pneus Winter-Ready inversibles assurent une adhérence optimale par tous les temps et sur tous les types de terrain. La poignée NX intègre un écran digital de contrôle et un port USB pour recharger vos appareils.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-16">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Ce qui est inclus</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Avec l&apos;achat du NX Lithium, vous recevez le chariot complet avec sa batterie lithium 36 trous et le chargeur. En offre de lancement, 2 accessoires d&apos;une valeur de ~60&nbsp;&euro; sont inclus : le porte-parapluie NX et le porte-scorecard. Le tout est couvert par la garantie constructeur PowerBug de 2 ans, batterie comprise, avec SAV en France.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
