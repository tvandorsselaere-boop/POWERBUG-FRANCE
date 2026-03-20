import Link from "next/link";
import Image from "next/image";
import {
  Battery,
  Star,
  ChevronRight,
  Gift,
  Zap,
  FoldVertical,
} from "lucide-react";
import { getTrolleys } from "@/lib/supabase/queries";
import { HeroVideo } from "@/components/hero-video";
import { HomeTrustBar } from "@/components/home-trust-bar";
import { HomeFaq } from "@/components/home-faq";
import { HomeReviews } from "@/components/home-reviews";
import { AddToCartRedirect } from "@/components/add-to-cart-redirect";

const trolleyMeta = [
  {
    slug: "nx-lithium",
    name: "NX Lithium",
    price: "799",
    comparePrice: "899",
    description:
      "Système 28V, batterie lithium 36 trous, pliage VRAP ultra-compact. Le chariot électrique fiable et performant.",
    specs: [
      { label: "Poids", value: "7,9 kg" },
      { label: "Batterie", value: "Lithium 28V — 36 trous" },
      { label: "Pliage", value: "VRAP ultra-compact" },
    ],
    href: "/trolleys/nx-lithium",
    badge: "Populaire",
    badgeColor: "bg-[#356B0D]/10 text-[#356B0D]",
  },
  {
    slug: "nx-dhc-lithium",
    name: "NX DHC Lithium",
    price: "899",
    comparePrice: "999",
    description:
      "Tous les avantages du NX, plus le Downhill Control et le frein parking électronique. Le contrôle total.",
    specs: [
      { label: "Poids", value: "8,2 kg" },
      { label: "Batterie", value: "Lithium 28V — 36 trous" },
      { label: "Pliage", value: "VRAP + DHC + frein parking" },
    ],
    href: "/trolleys/nx-dhc-lithium",
    badge: "Premium",
    badgeColor: "bg-[#F6A429]/15 text-[#A87A00]",
  },
];

const features = [
  {
    icon: Zap,
    title: "Technologie 28V Lithium",
    description:
      "Le système d'alimentation 28,8V délivre une puissance constante du premier au dernier trou, même sur les terrains vallonnés et les fairways humides. Le moteur silencieux brushless ne nécessite aucun entretien.",
  },
  {
    icon: FoldVertical,
    title: "Pliage VRAP breveté",
    description:
      "Le système VRAP (Variable Run And Park) permet de plier le chariot en quelques secondes, roues comprises. Dimensions pliées : 77 × 57 × 41 cm, ou 38 cm de large avec les roues inversées. Il se glisse dans n'importe quel coffre.",
  },
  {
    icon: Battery,
    title: "36 trous d'autonomie",
    description:
      "La batterie lithium de 1,5 kg offre 2 tours complets sans recharge, soit 36 trous. Elle se recharge après chaque utilisation et dure 5 à 7 ans avec un entretien minimal. Garantie constructeur 2 ans.",
  },
  {
    icon: Star,
    title: "8 300+ avis clients",
    description:
      "N°1 au classement client des marques de chariots électriques sur Trustpilot (4.9/5, 3 895 avis) et Reviews.co.uk (4.7/5, 4 415 avis). Depuis 2003, reconnue mondialement dans 13 pays.",
  },
];

const FREE_ACCESSORIES = [
  {
    name: "Porte-parapluie NX",
    image: "/images/accessoires/NX-Umbrella-Holder-min.jpg.webp",
    value: "~30\u00A0\u20AC",
  },
  {
    name: "Porte-scorecard",
    image: "/images/accessoires/score-card-holder.jpg.webp",
    value: "~30\u00A0\u20AC",
  },
];

export const dynamic = "force-static";
export const revalidate = 3600;

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.powerbug.fr/",
    },
  ],
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que PowerBug ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PowerBug est la marque britannique de référence dans les chariots électriques de golf, fondée en 2003. PowerBug.fr est le distributeur exclusif officiel en France.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre le NX Lithium et le NX DHC Lithium ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le NX DHC Lithium ajoute le système Downhill Control (DHC) et un frein parking électronique. Idéal pour les terrains vallonnés.",
      },
    },
    {
      "@type": "Question",
      name: "Livrez-vous partout en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, PowerBug France livre partout en France métropolitaine via DPD avec suivi en temps réel.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la garantie sur les chariots PowerBug ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tous nos chariots sont couverts par une garantie constructeur de 2 ans, batterie comprise. SAV assuré en France.",
      },
    },
    {
      "@type": "Question",
      name: "Comment entretenir la batterie lithium de mon PowerBug ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rechargez après chaque utilisation, stockez entre 10°C et 25°C, évitez la décharge complète. Une batterie bien entretenue dure 5 à 7 ans.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte un chariot PowerBug ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le NX Lithium est à 799€ et le NX DHC Lithium à 899€. Chaque achat de chariot inclut 2 accessoires offerts d'une valeur de ~60€ (porte-parapluie + porte-scorecard).",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre une batterie lithium et une batterie plomb ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La batterie lithium PowerBug pèse environ 2 kg contre 8-10 kg pour une batterie plomb équivalente. Elle dure 5 à 7 ans (contre 1-2 ans pour le plomb), se recharge plus vite et maintient une puissance constante du début à la fin de la charge.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on retourner un chariot PowerBug ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous proposons une politique de retour sous 30 jours. Si le chariot ne vous convient pas, vous pouvez le retourner dans son emballage d'origine pour un remboursement.",
      },
    },
  ],
};

export default async function Home() {
  const dbTrolleys = await getTrolleys();
  const imageMap: Record<string, string> = {};
  for (const t of dbTrolleys) {
    const img = t.product_images?.find((i) => i.is_primary)?.url ?? t.product_images?.[0]?.url;
    if (img) imageMap[t.slug] = img;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />

      {/* 1. HERO — looping video background */}
      <section className="relative h-[100svh] min-h-[560px] max-h-[960px] overflow-hidden sm:h-[90vh]">
        <div className="absolute inset-0">
          <HeroVideo />
        </div>

        {/* Overlay — léger sur mobile (bandes noires suffisent), plus fort desktop */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/50" />

        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-6 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          {/* Texte en haut — calé dans la bande noire mobile */}
          <div>
            <p
              className="animate-fade-in mb-2 text-xs font-semibold uppercase tracking-widest text-[#8DC63F] sm:mb-4 sm:text-sm"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              Distributeur exclusif France — Qualité britannique depuis 2003
            </p>
            <h1
              className="animate-fade-in-delay-1 text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              Chariots Électriques de Golf Premium
            </h1>
            <p
              className="animate-fade-in-delay-2 mx-auto mt-2 max-w-3xl text-sm text-white/85 sm:mt-5 sm:text-lg"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              La série NX — technologie lithium 28V, pliage VRAP breveté, 36 trous d&apos;autonomie.
            </p>
          </div>

          {/* Logo + Boutons en bas — calés dans la bande noire */}
          <div className="animate-fade-in-delay-3 flex flex-col items-center gap-3 sm:gap-4">
            {/* Logo PowerBug — mobile only */}
            <Image
              src="/images/powerbug-logo.png"
              alt="Logo PowerBug"
              width={240}
              height={60}
              className="mb-1 w-[50%] max-w-[220px] opacity-40 brightness-0 invert sm:hidden"
              aria-hidden="true"
            />
            <div className="flex flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/trolleys"
                className="inline-flex items-center justify-center gap-1 rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(53,107,13,0.45)] active:scale-[0.98] sm:px-8 sm:py-3 sm:text-base"
                style={{ background: "linear-gradient(90deg,#356B0D,#8DC63F)" }}
              >
                Découvrir la gamme
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/accessoires"
                className="inline-flex items-center justify-center rounded-[10px] border-2 border-white bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#0F0F10] sm:px-8 sm:py-3 sm:text-base"
              >
                Voir les accessoires
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <HomeTrustBar />

      {/* 3. PRODUCT SHOWCASE */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Gamme 2026
            </p>
          </div>
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-5xl">
            Série NX
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-[#6B7280]">
            Deux modèles, une même excellence. Choisissez le niveau de contrôle qui correspond à votre jeu.
          </p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {trolleyMeta.map((trolley) => (
              <div key={trolley.slug}>
                <div className="mb-6 flex h-64 items-center justify-center overflow-hidden rounded-xl bg-white">
                  {imageMap[trolley.slug] ? (
                    <Image
                      src={imageMap[trolley.slug]}
                      alt={trolley.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <Zap className="h-20 w-20 text-[#DBDBDB]" />
                  )}
                </div>

                <div className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${trolley.badgeColor}`}>
                  {trolley.badge}
                </div>

                <h3 className="text-2xl font-bold text-[#0F0F10]">{trolley.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{trolley.description}</p>

                <ul className="mt-4 space-y-2 rounded-xl border border-[#DBDBDB] p-4">
                  {trolley.specs.map((spec) => (
                    <li key={spec.label} className="flex items-center justify-between text-sm">
                      <span className="text-[#6B7280]">{spec.label}</span>
                      <span className="font-medium text-[#0F0F10]">{spec.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#0F0F10]">
                      {trolley.price}<span className="text-lg text-[#6B7280]">&euro;</span>
                    </span>
                    {trolley.comparePrice && (
                      <span className="text-sm text-[#6B7280] line-through">{trolley.comparePrice}&euro;</span>
                    )}
                    <span className="ml-auto rounded-full bg-[#AE1717]/10 px-2.5 py-0.5 text-xs font-semibold text-[#AE1717]">
                      -100&euro;
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={trolley.href}
                      className="flex-1 rounded-[10px] border border-[#DBDBDB] bg-white py-2.5 text-center text-sm font-semibold text-[#0F0F10] transition-all hover:border-[#356B0D] hover:text-[#356B0D]"
                    >
                      Voir le détail
                    </Link>
                    <AddToCartRedirect
                      slug={trolley.slug}
                      name={trolley.name}
                      price={Number(trolley.price)}
                      compare_at_price={trolley.comparePrice ? Number(trolley.comparePrice) : undefined}
                      className="flex-1 rounded-[10px] py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(53,107,13,0.35)] active:scale-[0.98]"
                      style={{ background: "linear-gradient(90deg,#356B0D,#5a9e1f)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/trolleys"
              className="btn-glass-outline inline-flex items-center gap-1 rounded-[10px] px-7 py-2.5 text-sm font-semibold text-[#0F0F10]"
            >
              Comparer NX vs NX DHC
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. POURQUOI POWERBUG */}
      <section className="border-t border-[#DBDBDB] bg-[#F5F5F5] py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Notre différence
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Pourquoi PowerBug ?
            </h2>
            <p className="mt-3 text-[#6B7280]">
              La référence mondiale du chariot électrique depuis 2003, désormais en France.
            </p>
          </div>

          <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center text-[#6B7280]">
            <p className="leading-relaxed">
              Fondée en 2003 en Angleterre par Wizza Ltd (Buckinghamshire), PowerBug s&apos;est imposée comme la marque de référence mondiale dans les chariots électriques de golf. Présente dans plus de 13 pays, la marque cumule plus de 8&nbsp;300 avis clients vérifiés sur Trustpilot et Reviews.co.uk, avec une note moyenne de 4.9 sur 5.
            </p>
            <p className="leading-relaxed">
              En tant que distributeur exclusif officiel en France, PowerBug.fr vous garantit un service après-vente réactif, des pièces détachées disponibles localement et la garantie constructeur de 2 ans sur tous les produits. Vous bénéficiez de la qualité britannique avec un accompagnement 100&nbsp;% français.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#356B0D]/10">
                  <feature.icon className="h-6 w-6 text-[#356B0D]" />
                </div>
                <h3 className="text-base font-semibold text-[#0F0F10]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4b. TABLEAU COMPARATIF NX vs NX DHC */}
      <section className="border-t border-[#DBDBDB] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Comparatif
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              NX Lithium vs NX DHC Lithium
            </h2>
            <p className="mt-3 text-[#6B7280]">
              Les deux modèles partagent le même châssis en aluminium aéronautique, la même batterie lithium 28,8V et le système VRAP. Le NX DHC ajoute le contrôle en descente et le frein parking électronique.
            </p>
          </div>
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DBDBDB]">
                  <th className="py-3 pr-4 text-left font-semibold text-[#0F0F10]">Caractéristique</th>
                  <th className="py-3 px-4 text-center font-semibold text-[#0F0F10]">NX Lithium</th>
                  <th className="py-3 pl-4 text-center font-semibold text-[#0F0F10]">NX DHC Lithium</th>
                </tr>
              </thead>
              <tbody className="text-[#6B7280]">
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Prix</td>
                  <td className="py-3 px-4 text-center font-medium text-[#0F0F10]">799&nbsp;&euro;</td>
                  <td className="py-3 pl-4 text-center font-medium text-[#0F0F10]">899&nbsp;&euro;</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Poids (sans batterie)</td>
                  <td className="py-3 px-4 text-center">9,5&nbsp;kg</td>
                  <td className="py-3 pl-4 text-center">9,5&nbsp;kg</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Batterie lithium 28,8V</td>
                  <td className="py-3 px-4 text-center">1,5&nbsp;kg — 36 trous</td>
                  <td className="py-3 pl-4 text-center">1,5&nbsp;kg — 36 trous</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Dimensions pliées</td>
                  <td className="py-3 px-4 text-center">77&nbsp;×&nbsp;57&nbsp;×&nbsp;41&nbsp;cm</td>
                  <td className="py-3 pl-4 text-center">77&nbsp;×&nbsp;57&nbsp;×&nbsp;41&nbsp;cm</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Vitesses</td>
                  <td className="py-3 px-4 text-center">9 niveaux (pas de 0,5)</td>
                  <td className="py-3 pl-4 text-center">9 niveaux (pas de 0,5)</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">VRAP (marche autonome)</td>
                  <td className="py-3 px-4 text-center">&#10003;</td>
                  <td className="py-3 pl-4 text-center">&#10003;</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4">Port USB</td>
                  <td className="py-3 px-4 text-center">&#10003;</td>
                  <td className="py-3 pl-4 text-center">&#10003;</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4 font-medium text-[#0F0F10]">Downhill Control (DHC)</td>
                  <td className="py-3 px-4 text-center">—</td>
                  <td className="py-3 pl-4 text-center text-[#356B0D] font-medium">&#10003;</td>
                </tr>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="py-3 pr-4 font-medium text-[#0F0F10]">Frein parking électronique</td>
                  <td className="py-3 px-4 text-center">—</td>
                  <td className="py-3 pl-4 text-center text-[#356B0D] font-medium">&#10003;</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Garantie</td>
                  <td className="py-3 px-4 text-center">2 ans</td>
                  <td className="py-3 pl-4 text-center">2 ans</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-[#6B7280]">
            Le Downhill Control maintient automatiquement une vitesse constante en descente, empêchant le chariot de prendre de la vitesse sur les pentes. Le frein parking électronique bloque la rotation des roues dans les deux sens pendant que vous jouez votre coup.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/trolleys"
              className="inline-flex items-center gap-1 rounded-[10px] border border-[#DBDBDB] bg-white px-7 py-2.5 text-sm font-semibold text-[#0F0F10] transition-all hover:border-[#356B0D] hover:text-[#356B0D]"
            >
              Voir le comparatif détaillé
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4c. TECHNOLOGIE LITHIUM */}
      <section className="border-t border-[#DBDBDB] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Innovation
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Technologie lithium 28V
            </h2>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            <div className="space-y-4 text-[#6B7280]">
              <h3 className="text-lg font-semibold text-[#0F0F10]">Puissance et autonomie</h3>
              <p className="leading-relaxed">
                La série NX est équipée du système d&apos;alimentation 28,8V, une technologie propriétaire PowerBug qui délivre une puissance constante du premier au dernier trou. La batterie lithium ne pèse que 1,5&nbsp;kg — contre 8 à 10&nbsp;kg pour une batterie au plomb équivalente — et offre 36 trous d&apos;autonomie, soit 2 tours complets sans recharge.
              </p>
              <p className="leading-relaxed">
                Le moteur brushless silencieux garantit un fonctionnement fluide et sans entretien. Le châssis en aluminium aéronautique pèse 9,5&nbsp;kg sans batterie, ce qui en fait l&apos;un des chariots électriques les plus légers du marché. Montées, fairways humides, terrains vallonnés : le NX ne ralentit pas.
              </p>
              <p className="leading-relaxed">
                Le chariot propose 9 niveaux de vitesse réglables par incréments de 0,5, un écran d&apos;affichage avec indicateur de niveau de batterie et un port USB intégré au guidon pour recharger votre téléphone ou GPS pendant le parcours.
              </p>
            </div>
            <div className="space-y-4 text-[#6B7280]">
              <h3 className="text-lg font-semibold text-[#0F0F10]">VRAP, pliage et entretien</h3>
              <p className="leading-relaxed">
                Le système VRAP (Variable Run And Park) permet d&apos;envoyer le chariot en autonomie jusqu&apos;à 50 mètres devant vous — par exemple vers le départ suivant pendant que vous êtes sur le green — pour accélérer le rythme de jeu. Le chariot s&apos;arrête automatiquement à la distance programmée.
              </p>
              <p className="leading-relaxed">
                Le pliage breveté se fait en quelques secondes, roues comprises. Dimensions pliées : 77&nbsp;×&nbsp;57&nbsp;×&nbsp;41&nbsp;cm. En inversant les roues, la largeur passe à 38&nbsp;cm pour se glisser dans n&apos;importe quel coffre. La roue avant anti-colmatage à dégagement rapide se retire sans outil pour un nettoyage facile après un parcours sur terrain humide.
              </p>
              <p className="leading-relaxed">
                La batterie lithium est conçue pour durer 5 à 7 ans. Rechargez après chaque utilisation et stockez entre 10&nbsp;°C et 25&nbsp;°C. La batterie est protégée dans un boîtier rigide et se place dans son compartiment sans câble de connexion externe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUNDLE OFFER */}
      <section className="border-t border-[#DBDBDB] py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 40px rgba(53,107,13,0.12)",
            }}
          >
            <div className="flex flex-col items-center gap-8 p-8 sm:p-12 lg:flex-row lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#356B0D]/10 px-4 py-1.5">
                  <Gift className="h-4 w-4 text-[#356B0D]" />
                  <span className="text-xs font-bold uppercase tracking-wide text-[#356B0D]">
                    Offre de bienvenue
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#0F0F10] sm:text-3xl">
                  2 accessoires offerts (~60&euro;)<br />
                  <span className="text-[#356B0D]">avec chaque chariot</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                  Porte-parapluie et porte-scorecard offerts avec l&apos;achat de votre chariot PowerBug NX. Valeur cumulée de ~60&euro; entièrement offerte.
                </p>
                <Link
                  href="/trolleys"
                  className="mt-6 inline-flex items-center gap-2 rounded-[10px] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(53,107,13,0.4)] active:scale-[0.98]"
                  style={{ background: "linear-gradient(90deg,#356B0D,#8DC63F)" }}
                >
                  Decouvrir nos chariots
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6">
                {FREE_ACCESSORIES.map((acc) => (
                  <div key={acc.name} className="flex flex-col items-center gap-2">
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-[#DBDBDB] bg-white shadow-sm">
                      <Image
                        src={acc.image}
                        alt={acc.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <span className="text-xs font-medium text-[#0F0F10]">{acc.name}</span>
                    <span className="rounded-full bg-[#8DC63F]/20 px-2 py-0.5 text-[10px] font-semibold text-[#356B0D]">
                      Offert — {acc.value}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#DBDBDB] bg-[#F5F5F5]">
                    <span className="text-2xl font-bold text-[#DBDBDB]">+</span>
                  </div>
                  <span className="text-xs font-medium text-[#6B7280]">Votre choix</span>
                  <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
                    Catalogue complet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5b. DISTRIBUTION FRANCE */}
      <section className="border-t border-[#DBDBDB] bg-[#F5F5F5] py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Service France
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Distribution et SAV en France
            </h2>
            <div className="mt-6 space-y-4 text-[#6B7280]">
              <p className="leading-relaxed">
                PowerBug France (PRO GOLF DISTRIBUTION, Aix-en-Provence) assure la distribution exclusive des chariots PowerBug sur tout le territoire métropolitain. Chaque commande est expédiée via DPD avec suivi en temps réel, pour une livraison sous 2 à 4 jours ouvrés à domicile ou en point relais. Notre stock est maintenu en France pour garantir des délais courts.
              </p>
              <p className="leading-relaxed">
                Tous les chariots et batteries sont couverts par la garantie constructeur de 2 ans. Notre équipe basée en France prend en charge les demandes de garantie, les réparations et les pièces détachées disponibles localement : roues, moteurs, chargeurs, batteries de remplacement. Vous n&apos;avez pas à traiter avec le Royaume-Uni — tout est géré en français, avec la réactivité d&apos;un distributeur dédié.
              </p>
              <p className="leading-relaxed">
                Paiement sécurisé par carte bancaire, Apple Pay ou Google Pay. Politique de retour sous 30 jours : si le chariot ne vous convient pas, retournez-le dans son emballage d&apos;origine pour un remboursement complet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="border-t border-[#DBDBDB] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
              Questions fréquentes
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
              Tout savoir sur PowerBug
            </h2>
            <p className="mt-3 text-[#6B7280]">
              Retrouvez les réponses aux questions les plus fréquentes sur nos chariots électriques.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <HomeFaq />
          </div>
        </div>
      </section>

      {/* 7. REVIEWS TEASER */}
      <HomeReviews />
    </>
  );
}
