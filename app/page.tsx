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
      "Le système d'alimentation 28V offre une puissance constante du premier au dernier trou, par tous les temps.",
  },
  {
    icon: FoldVertical,
    title: "Pliage VRAP breveté",
    description:
      "Pliage en moins de 5 secondes, roues comprises. Le NX se range facilement dans n'importe quel coffre.",
  },
  {
    icon: Battery,
    title: "36 trous d'autonomie",
    description:
      "Batterie lithium longue durée pour jouer 2 tours complets sans recharge. Garantie 2 ans.",
  },
  {
    icon: Star,
    title: "8 300+ avis clients",
    description:
      "N°1 au classement client des marques de chariots électriques. Depuis 2003, reconnu mondialement.",
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

export const revalidate = 3600;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />

      {/* 1. HERO — looping video background */}
      <section className="relative h-[100svh] min-h-[560px] max-h-[960px] overflow-hidden sm:h-[90vh]">
        <div className="absolute inset-0">
          <HeroVideo />
        </div>

        {/* Overlay — léger sur mobile (bandes noires suffisent), plus fort desktop */}
        <div className="absolute inset-0 bg-black/20 sm:bg-black/50" />

        {/* Logo PowerBug — mobile only (pas de logo dans la vidéo mobile) */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center sm:hidden">
          <Image
            src="/images/powerbug-logo.png"
            alt=""
            width={320}
            height={80}
            className="w-[80%] max-w-[340px] opacity-30 brightness-0 invert"
            aria-hidden="true"
          />
        </div>

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

          {/* Boutons en bas — côte à côte sur mobile, calés dans la bande noire */}
          <div className="animate-fade-in-delay-3 flex flex-row justify-center gap-3 sm:gap-4">
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
                    <Link
                      href={trolley.href}
                      className="flex-1 rounded-[10px] py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(53,107,13,0.35)] active:scale-[0.98]"
                      style={{ background: "linear-gradient(90deg,#356B0D,#5a9e1f)" }}
                    >
                      Ajouter au panier
                    </Link>
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
                  href="/configurateur"
                  className="mt-6 inline-flex items-center gap-2 rounded-[10px] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_6px_24px_rgba(53,107,13,0.4)] active:scale-[0.98]"
                  style={{ background: "linear-gradient(90deg,#356B0D,#8DC63F)" }}
                >
                  Configurer mon chariot
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
