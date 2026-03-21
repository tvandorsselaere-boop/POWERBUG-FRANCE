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
  image: "https://www.powerbug.fr/images/nx-main.jpg",
  brand: { "@type": "Brand", name: "PowerBug" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "799",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: "https://www.powerbug.fr/trolleys/nx-lithium",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "14.90",
        currency: "EUR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "FR",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 5, unitCode: "DAY" },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "FR",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnShippingFees",
    },
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
              Le NX Lithium convient parfaitement aux parcours plats ou légèrement vallonnés. Si votre parcours comporte des pentes prononcées, le modèle <a href="/trolleys/nx-dhc-lithium" className="text-[#356B0D] underline">NX DHC Lithium</a> avec son système Downhill Control sera plus adapté. Pour un terrain standard, le NX à 799&nbsp;&euro; offre un rapport qualité-prix excellent.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Système d&apos;alimentation 28V</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le cœur du NX est son système d&apos;alimentation 28,8V associé à un moteur brushless silencieux. Contrairement aux chariots à batterie plomb, le système lithium délivre une puissance constante du premier au dernier trou, y compris sur les fairways humides ou les montées. Le moteur ne nécessite aucun entretien.
            </p>
            <p className="leading-relaxed">
              La poignée du NX intègre un écran digital de contrôle avec 9 niveaux de vitesse, permettant d&apos;adapter précisément l&apos;allure du chariot à votre rythme de marche. Un port USB est également intégré pour recharger votre téléphone ou GPS pendant la partie. Le système VRAP (Variable Run And Park) permet de contrôler le chariot à distance jusqu&apos;à 50&nbsp;mètres.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Batterie lithium 36 trous</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              La batterie lithium du NX ne pèse que 1,5&nbsp;kg et offre 36 trous d&apos;autonomie, soit 2 tours complets sur une seule charge. Elle se loge dans un compartiment dédié intégré au châssis du chariot, protégée des intempéries et des chocs. La durée de vie estimée est de 5 à 7 ans avec un entretien standard : rechargez après chaque utilisation et stockez à température ambiante.
            </p>
            <p className="leading-relaxed">
              La batterie est garantie 2 ans par le constructeur, au même titre que le chariot. Le chargeur officiel PowerBug est inclus avec chaque chariot. En cas de besoin, des batteries et chargeurs de remplacement sont disponibles dans notre rubrique <a href="/pieces-detachees" className="text-[#356B0D] underline">pièces détachées</a>.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Pliage VRAP breveté</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le système de pliage VRAP (Variable Run And Park) breveté permet de plier le chariot en moins de 5 secondes, roues comprises. Une fois plié, le NX mesure 77&nbsp;×&nbsp;57&nbsp;×&nbsp;41&nbsp;cm, ou seulement 38&nbsp;cm de large avec les roues inversées. Il se glisse dans n&apos;importe quel coffre de voiture, même compact.
            </p>
            <p className="leading-relaxed">
              Le NX ne pèse que 7,9&nbsp;kg batterie incluse. C&apos;est l&apos;un des chariots électriques les plus légers du marché, ce qui facilite la manipulation quotidienne : le sortir du coffre, le plier, le ranger, le transporter à la main.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Roues et adhérence</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX est équipé d&apos;une roue avant anti-colmatage qui empêche l&apos;accumulation de boue et d&apos;herbe, même sur les terrains les plus humides. Les pneus arrière Winter-Ready sont inversibles : un profil lisse pour l&apos;été, un profil cranté pour l&apos;hiver. Le changement de profil se fait en quelques secondes, sans outils.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Station accessoires intégrée</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le châssis du NX intègre une station accessoires universelle qui permet de fixer l&apos;ensemble de la gamme d&apos;accessoires PowerBug sans outils : <a href="/accessoires" className="text-[#356B0D] underline">porte-parapluie, porte-scorecard, support téléphone, sac isotherme, mitaines chauffantes</a> et plus encore. Chaque accessoire se clipse en quelques secondes sur les rails de fixation intégrés au châssis.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Ce qui est inclus</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Avec l&apos;achat du NX Lithium à 799&nbsp;&euro;, vous recevez le chariot complet avec sa batterie lithium 36 trous (1,5&nbsp;kg) et le chargeur officiel. En offre de lancement, 2 accessoires d&apos;une valeur de ~60&nbsp;&euro; sont inclus : le porte-parapluie NX (30&nbsp;&euro;) et le porte-scorecard (30&nbsp;&euro;).
            </p>
            <p className="leading-relaxed">
              Le tout est couvert par la garantie constructeur PowerBug de 2 ans, batterie comprise, avec SAV en France. PowerBug est noté 4.9/5 sur Trustpilot (3&nbsp;895 avis) et 4.7/5 sur Reviews.co.uk (4&nbsp;415 avis), soit plus de 8&nbsp;300 avis clients vérifiés. La marque est présente dans 13 pays depuis 2003.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">NX vs NX DHC : quelle différence ?</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX et le <a href="/trolleys/nx-dhc-lithium" className="text-[#356B0D] underline">NX DHC</a> partagent le même châssis, la même batterie et le même moteur. La différence : le NX DHC ajoute le système Downhill Control (freinage automatique en descente) et un frein parking électronique pour 100&nbsp;&euro; de plus (899&nbsp;&euro; au lieu de 799&nbsp;&euro;). Si votre parcours est plat, le NX suffit. Pour les parcours vallonnés, le DHC est recommandé. <a href="/trolleys" className="text-[#356B0D] underline">Voir le comparatif complet</a>.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-16">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Livraison et paiement</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX Lithium est livré à domicile par DPD en 1 à 3 jours ouvrés (14,90&nbsp;&euro;, France métropolitaine). Le paiement s&apos;effectue par carte bancaire, Apple Pay ou Google Pay via Stripe, plateforme de paiement sécurisée. Vous disposez d&apos;un droit de rétractation de 14 jours conformément à la législation française. Pour toute question, contactez-nous à <a href="mailto:contact@powerbug.fr" className="text-[#356B0D] underline">contact@powerbug.fr</a> ou au <a href="tel:+33788239784" className="text-[#356B0D] underline">07&nbsp;88&nbsp;23&nbsp;97&nbsp;84</a>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
