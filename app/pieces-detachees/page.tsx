import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Hash,
  Search,
  Phone,
  Mail,
  Wrench,
  Clock,
} from "lucide-react";
import { getPiecesDetachees } from "@/lib/supabase/queries";
import { SortableGrid } from "@/components/sortable-grid";

export const metadata: Metadata = {
  title: "Pièces détachées - PowerBug France",
  description:
    "Pièces détachées officielles PowerBug : moteurs, roues, chargeurs. Compatibles NX et NX DHC.",
  alternates: { canonical: "/pieces-detachees" },
};

export const revalidate = 3600;

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Localisez le numero de serie",
    description:
      'Le numero de serie commence par "TPB" et se trouve sur un autocollant colle sur le chassis de votre chariot.',
  },
  {
    icon: Hash,
    number: "2",
    title: "Notez le modele",
    description:
      "Identifiez votre modele : NX Lithium ou NX DHC Lithium. Cette information est egalement presente sur l'autocollant.",
  },
  {
    icon: Phone,
    number: "3",
    title: "Contactez-nous",
    description:
      "Appelez-nous ou envoyez-nous un email avec votre numero de serie et la piece dont vous avez besoin.",
  },
];

export default async function PiecesDetacheesPage() {
  const pieces = await getPiecesDetachees();

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Pieces detachees</span>
      </nav>

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Pieces detachees
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[#6B7280]">
          Pieces detachees officielles PowerBug pour chariots NX et NX DHC.
          Toutes les pieces sont garanties compatibles avec votre chariot.
        </p>
      </div>

      {/* Catalogue pieces */}
      {pieces.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">
            Catalogue pieces
          </h2>
          <SortableGrid products={pieces.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            description: item.description,
            price: item.product_variants?.[0]?.price ?? item.base_price,
            image: item.product_images?.[0] ?? null,
          }))} />
        </section>
      )}

      {/* Comment trouver votre reference */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#356B0D]/10">
            <Wrench className="h-5 w-5 text-[#356B0D]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F0F10]">
            Comment trouver votre reference
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card-glass rounded-2xl p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
                  {step.number}
                </div>
                <step.icon className="h-5 w-5 text-[#356B0D]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#0F0F10]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nous contacter */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">
          Besoin d&apos;un conseil ou d&apos;une piece non listee ?
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a
            href="tel:+33788239784"
            className="card-glass group flex flex-col items-center rounded-2xl p-8 text-center transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#356B0D]/10 transition-colors group-hover:bg-[#356B0D]/20">
              <Phone className="h-6 w-6 text-[#356B0D]" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[#0F0F10]">
              Par telephone
            </h3>
            <p className="mb-4 text-2xl font-bold text-[#356B0D]">
              07 88 23 97 84
            </p>
            <span className="btn-glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
              <Phone className="h-4 w-4" />
              Appeler
            </span>
          </a>

          <a
            href="mailto:fred@powerbug.fr"
            className="card-glass group flex flex-col items-center rounded-2xl p-8 text-center transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#356B0D]/10 transition-colors group-hover:bg-[#356B0D]/20">
              <Mail className="h-6 w-6 text-[#356B0D]" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-[#0F0F10]">
              Par email
            </h3>
            <p className="mb-4 text-2xl font-bold text-[#356B0D]">
              fred@powerbug.fr
            </p>
            <span className="btn-glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white">
              <Mail className="h-4 w-4" />
              Envoyer un email
            </span>
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#6B7280]">
          <Clock className="h-4 w-4" />
          <p>Reponse sous 24h ouvrees</p>
        </div>
      </section>

      {/* Note officielle */}
      <section className="rounded-2xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-6 text-center">
        <p className="text-sm leading-relaxed text-[#0F0F10]">
          Toutes nos pieces sont des pieces officielles PowerBug, garanties
          compatibles avec votre chariot.
        </p>
      </section>
    </div>
  );
}
