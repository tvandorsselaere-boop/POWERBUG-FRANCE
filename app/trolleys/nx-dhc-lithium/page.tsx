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
              Le PowerBug NX DHC Lithium est le choix des golfeurs exigeants qui jouent sur des parcours vallonnés ou accidentés. En plus de toutes les qualités du NX, le DHC ajoute deux fonctionnalités décisives : le Downhill Control (freinage automatique en descente) et le frein parking électronique. Ces systèmes garantissent un contrôle total du chariot dans toutes les situations, y compris sur les pentes les plus raides.
            </p>
            <p className="leading-relaxed">
              Si votre parcours habituel comporte du dénivelé, le NX DHC à 899&nbsp;&euro; est un investissement qui change véritablement l&apos;expérience de jeu. Si vous jouez principalement sur terrain plat, le <a href="/trolleys/nx-lithium" className="text-[#356B0D] underline">NX Lithium à 799&nbsp;&euro;</a> vous offre les mêmes performances de base à un prix inférieur.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Downhill Control (DHC) — freinage automatique en descente</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le système DHC régule automatiquement la vitesse du chariot lors des descentes. Plus besoin de retenir manuellement le chariot dans les pentes : le DHC adapte la résistance du moteur pour maintenir une vitesse stable et sécurisée. C&apos;est une technologie exclusive PowerBug qui fait la différence sur les parcours avec du dénivelé.
            </p>
            <p className="leading-relaxed">
              Concrètement, lorsque le chariot détecte une pente descendante, le moteur oppose une résistance progressive qui empêche le chariot d&apos;accélérer. La vitesse reste constante, que le terrain soit en légère pente ou en forte descente. Le golfeur n&apos;a aucune action à effectuer : le DHC fonctionne en continu et de manière transparente.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Frein parking électronique</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le frein parking électronique complète le DHC en immobilisant instantanément le chariot d&apos;une simple pression sur le bouton. Indispensable sur les greens en pente, les zones d&apos;attente et partout où vous devez poser le chariot sans risque qu&apos;il roule. Contrairement à un frein mécanique, le frein électronique ne nécessite aucun réglage et fonctionne avec précision.
            </p>
            <p className="leading-relaxed">
              Le frein parking est accessible depuis la poignée de commande, au même endroit que les 9 niveaux de vitesse et l&apos;écran digital de contrôle. L&apos;activation est instantanée et le désengagement tout aussi rapide. Le <a href="/trolleys/nx-lithium" className="text-[#356B0D] underline">NX standard</a> ne dispose pas de ces deux fonctionnalités (DHC et frein parking).
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Système d&apos;alimentation 28V</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Comme le NX, le NX DHC embarque le système d&apos;alimentation 28,8V avec moteur brushless silencieux. La puissance est constante du premier au dernier trou, même en montée. L&apos;écran digital de la poignée affiche 9 niveaux de vitesse pour adapter l&apos;allure à votre rythme de marche. Un port USB intégré permet de recharger votre téléphone ou GPS pendant la partie.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Batterie lithium 36 trous</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              La batterie lithium de 1,5&nbsp;kg offre 36 trous d&apos;autonomie (2 tours complets) sur une seule charge. Elle se loge dans un compartiment dédié intégré au châssis, protégée des intempéries. La durée de vie est estimée à 5 à 7 ans. Rechargez après chaque utilisation et stockez à température ambiante. La batterie est garantie 2 ans par le constructeur. Des <a href="/pieces-detachees" className="text-[#356B0D] underline">batteries et chargeurs de remplacement</a> sont disponibles.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Pliage VRAP et dimensions</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX DHC bénéficie du même système de pliage VRAP breveté que le NX. Le chariot se plie en moins de 5 secondes, roues comprises. Dimensions pliées : 77&nbsp;×&nbsp;57&nbsp;×&nbsp;41&nbsp;cm, ou seulement 38&nbsp;cm de large avec les roues inversées. Le NX DHC pèse 8,2&nbsp;kg batterie incluse, soit seulement 300&nbsp;g de plus que le NX standard (7,9&nbsp;kg), en raison du système DHC et du frein parking intégrés.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Roues et accessoires</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX DHC est équipé de la roue avant anti-colmatage et des pneus arrière Winter-Ready inversibles (profil lisse été, profil cranté hiver). La station accessoires universelle intégrée au châssis permet de fixer toute la gamme d&apos;<a href="/accessoires" className="text-[#356B0D] underline">accessoires PowerBug</a> sans outils : porte-parapluie, porte-scorecard, support téléphone, sac isotherme, mitaines chauffantes et plus encore.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Ce qui est inclus</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Avec l&apos;achat du NX DHC Lithium à 899&nbsp;&euro;, vous recevez le chariot complet avec batterie lithium 36 trous (1,5&nbsp;kg) et chargeur officiel. En offre de lancement, 2 accessoires d&apos;une valeur de ~60&nbsp;&euro; sont inclus : le porte-parapluie NX (30&nbsp;&euro;) et le porte-scorecard (30&nbsp;&euro;).
            </p>
            <p className="leading-relaxed">
              Le tout est couvert par la garantie constructeur PowerBug de 2 ans, batterie comprise, avec SAV en France. PowerBug est noté 4.9/5 sur Trustpilot (3&nbsp;895 avis) et 4.7/5 sur Reviews.co.uk (4&nbsp;415 avis), soit plus de 8&nbsp;300 avis clients vérifiés. La marque est présente dans 13 pays depuis 2003.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">NX DHC vs NX : quelle différence ?</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX DHC et le <a href="/trolleys/nx-lithium" className="text-[#356B0D] underline">NX</a> partagent le même châssis, la même batterie, le même moteur et le même pliage VRAP. Pour 100&nbsp;&euro; de plus, le NX DHC ajoute le Downhill Control (freinage automatique en descente) et le frein parking électronique. C&apos;est le seul modèle de la gamme à proposer ces deux fonctionnalités. <a href="/trolleys" className="text-[#356B0D] underline">Voir le comparatif complet</a>.
            </p>
          </div>
        </section>

        <section className="border-t border-[#DBDBDB] pt-12 pb-16">
          <h2 className="mb-6 text-2xl font-bold text-[#0F0F10]">Livraison et paiement</h2>
          <div className="max-w-3xl space-y-4 text-[#6B7280]">
            <p className="leading-relaxed">
              Le NX DHC Lithium est livré à domicile par DPD en 1 à 3 jours ouvrés (14,90&nbsp;&euro;, France métropolitaine). Le paiement s&apos;effectue par carte bancaire, Apple Pay ou Google Pay via Stripe, plateforme de paiement sécurisée. Vous disposez d&apos;un droit de rétractation de 14 jours conformément à la législation française. Pour toute question, contactez-nous à <a href="mailto:commandes@powerbug.fr" className="text-[#356B0D] underline">commandes@powerbug.fr</a> ou au <a href="tel:+33788239784" className="text-[#356B0D] underline">07&nbsp;88&nbsp;23&nbsp;97&nbsp;84</a>.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
