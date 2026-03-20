import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  ExternalLink,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Avis & Tests PowerBug - Ce qu'en disent les experts",
  description:
    "4.9/5 sur Trustpilot, 8 300+ avis clients. Découvrez les tests indépendants et avis vérifiés sur les chariots PowerBug NX.",
  alternates: { canonical: "/avis" },
};

const reviewPlatforms = [
  {
    name: "Trustpilot",
    score: "4.9/5",
    count: "3 895 avis",
    url: "https://uk.trustpilot.com/review/powerbug.co.uk",
    stars: 5,
  },
  {
    name: "Reviews.co.uk",
    score: "4.7/5",
    count: "4 415 avis",
    url: "https://www.reviews.co.uk/company-reviews/store/powerbug",
    stars: 5,
  },
];

const expertReviews = [
  {
    source: "Bunkered",
    sourceDetail: "Magazine de golf ecossais de reference",
    title: "PowerBug GT Tour Series Electric Trolley",
    verdict: "A superb option",
    summary:
      "Teste au Dukes Course de St Andrews. Le verdict : un chariot agreable, simple et facile a utiliser. Compact, leger et sans souci. Une superbe option pour les golfeurs qui veulent un trolley sans prise de tete.",
    url: "https://www.bunkered.co.uk/gear/review-powerbug-gt-tour-series-electric-trolley/",
    lang: "EN",
  },
  {
    source: "National Club Golfer",
    sourceDetail: "Publication golf UK",
    title: "Powerbug GTX1 Lithium Trolley Review",
    verdict: "Couldn't find any fault at all",
    summary:
      "Aucun defaut trouve. Le testeur pense que ce chariot pourrait surprendre ceux qui choisissent habituellement les grandes marques. Design elegant, batterie lithium la plus compacte du marche, garantie 3 ans (UK).",
    url: "https://www.nationalclubgolfer.com/reviews/trolleys/powerbug-gtx1-lithium-trolley-review/",
    lang: "EN",
  },
  {
    source: "National Club Golfer",
    sourceDetail: "Publication golf UK",
    title: "Electric Trolley Test: Powerbug GT7",
    verdict: "Feels like it will last",
    summary:
      "Un equipement impressionnant qui donne l'impression qu'il va durer. Moteur puissant mais silencieux, assemblage facile, controle de distance variable. Une piece d'ingenierie solide.",
    url: "https://www.nationalclubgolfer.com/reviews/latest-reviews/electric-trolley-test-powerbug-gt7/",
    lang: "EN",
  },
  {
    source: "Golfalot",
    sourceDetail: "Site specialise equipement golf",
    title: "PowerBug Lite Lithium Trolley Review",
    verdict: "Well spec'd, easy to use and value for money",
    summary:
      "Bien equipe, facile a utiliser et bon rapport qualite-prix. La fonction VRAP (controle de distance) est un plus rare a ce niveau de prix. Environ 55 livres d'accessoires inclus (porte-bouteille, porte-parapluie, couvre-roues).",
    url: "https://golfalot.com/equipment-review/powerbug-lite-lithium-electric-golf-trolley-review",
    lang: "EN",
  },
  {
    source: "Sports Engineer",
    sourceDetail: "10 Best Electric Golf Trolleys 2025",
    title: "PowerBug classe dans le Top 10",
    verdict: "Amazing value for money",
    summary:
      "Classe 7e sur 10 dans le comparatif 2025. Excellent rapport qualite-prix, design sans souci, plus petite batterie du monde, bonne maniabilite. Fait exactement ce qu'il promet, aussi bon que les options plus cheres sans les gadgets superflus.",
    url: "https://sportsengineer.co.uk/blogs/golf/best-electric-golf-trolleys",
    lang: "EN",
  },
  {
    source: "JPSM Golf",
    sourceDetail: "Detaillant golf canadien",
    title: "Discover What's New with PowerBug: NX",
    verdict: "Test detaille du NX et NX DHC",
    summary:
      "Analyse approfondie des modeles NX et NX DHC : systeme 28V, controle VRAP par increments de 50 yards, 9 vitesses, batterie 36 trous, pliage en un bouton, port USB, station d'accessoires integree. Explique clairement la difference NX vs NX DHC.",
    url: "https://jpsmgolf.com/blogs/blog/discover-whats-new-with-powerbug-a-closer-look-new-nx",
    lang: "EN",
  },
  {
    source: "Lady Golfer",
    sourceDetail: "Publication golf feminin UK",
    title: "PowerBug GTX1 par Holly Clyburn",
    verdict: "Teste par une golfeuse professionnelle",
    summary:
      "La golfeuse professionnelle Holly Clyburn a teste le GTX1. Points forts : design elegant avec cadre blanc, batterie lithium extremement compacte. Un chariot qui allie style et performance.",
    url: "https://www.lady-golfer.com/news/powerbug-gtx-1-lithium-trolley-review/",
    lang: "EN",
  },
];

export default function AvisPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Avis &amp; Tests</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl lg:text-5xl">
          Ce qu&apos;en disent les experts et les clients
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[#6B7280]">
          PowerBug est la marque de chariot de golf la mieux notee pour le
          service client et la fiabilite. Decouvrez les avis verifies et les
          tests independants de la presse specialisee.
        </p>
      </div>

      {/* Review platforms + total — 3 columns aligned */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviewPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#DBDBDB] bg-white p-6 text-center transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <div className="mb-2 flex items-center justify-center gap-1">
              {Array.from({ length: platform.stars }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#F6A429] text-[#F6A429]"
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-[#0F0F10]">
              {platform.score}
            </p>
            <p className="mt-1 text-sm text-[#6B7280]">{platform.count}</p>
            <p className="mt-2 text-base font-semibold text-[#0F0F10]">
              {platform.name}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#356B0D] opacity-0 transition-opacity group-hover:opacity-100">
              Voir les avis <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        ))}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#356B0D] p-6 text-center text-white">
          <p className="text-3xl font-bold">8 300+</p>
          <p className="mt-1 text-sm text-white/85">
            avis clients verifies
          </p>
          <p className="mt-1 text-xs text-white/60">
            toutes plateformes confondues
          </p>
        </div>
      </div>

      {/* Expert reviews */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          Tests &amp; avis de la presse specialisee
        </h2>
        <p className="mb-10 max-w-3xl text-[#6B7280]">
          Voici les tests independants publies par la presse golf internationale.
          Les resumes sont traduits en francais, avec lien vers l&apos;article
          original en anglais.
        </p>

        <div className="space-y-6">
          {expertReviews.map((review) => (
            <a
              key={review.url}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-[#DBDBDB] bg-white p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-[#356B0D]">
                      {review.source}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {review.sourceDetail}
                    </span>
                    <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-xs text-[#6B7280]">
                      {review.lang}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F0F10] group-hover:text-[#356B0D]">
                    {review.title}
                  </h3>
                  <div className="mt-3 flex items-start gap-2">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[#8DC63F]" />
                    <p className="text-sm font-medium italic text-[#0F0F10]">
                      {review.verdict}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
                    {review.summary}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0 text-[#DBDBDB] transition-colors group-hover:text-[#356B0D]" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Note about French reviews */}
      <div className="mb-16 rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6 sm:p-8">
        <h3 className="text-lg font-bold text-[#0F0F10]">
          Pourquoi les tests sont en anglais ?
        </h3>
        <p className="mt-2 text-sm text-[#6B7280]">
          PowerBug est une marque britannique qui arrive tout juste en France.
          Les tests independants proviennent donc de la presse golf
          anglo-saxonne (Bunkered, National Club Golfer, Golfalot, etc.). Nous
          avons traduit les points cles en francais pour vous faciliter la
          lecture. Les liens menent vers les articles originaux en anglais.
        </p>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-[#DBDBDB] bg-white p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-[#0F0F10] sm:text-3xl">
          Convaincu ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
          Decouvrez la serie NX et profitez de 2 accessoires offerts (~60&euro;)
          avec chaque chariot.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/trolleys"
            className="btn-glass inline-flex items-center gap-2 rounded-[10px] px-8 py-3 text-base font-semibold text-white"
          >
            Voir les chariots
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/notre-histoire"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#356B0D] px-8 py-3 text-base font-semibold text-[#356B0D] hover:bg-[#356B0D]/5"
          >
            Notre histoire
          </Link>
        </div>
      </div>
    </div>
  );
}
