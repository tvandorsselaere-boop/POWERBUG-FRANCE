import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, Mail, Phone, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Garantie - PowerBug France",
  description:
    "Garantie constructeur 2 ans sur les chariots et batteries PowerBug. SAV en France, pieces detachees officielles disponibles.",
};

export default function GarantiePage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Garantie</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Garantie PowerBug
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-[#6B7280]">
        Tous les produits PowerBug vendus sur powerbug.fr beneficient d&apos;une
        garantie constructeur et des garanties legales en vigueur en France.
      </p>

      {/* Garantie constructeur */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <Shield className="mb-4 h-8 w-8 text-[#356B0D]" />
          <h2 className="text-xl font-bold text-[#0F0F10]">
            Garantie constructeur — 2 ans
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            PowerBug offre une garantie constructeur de 2 ans couvrant le
            trolley et la batterie. Cette garantie couvre les defauts de
            fabrication et de materiaux dans des conditions d&apos;utilisation
            normales.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Chariot electrique (chassis, moteurs, electronique)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Batterie lithium
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Chargeur de batterie
            </li>
          </ul>
          <div className="mt-4 rounded-lg border border-[#DBDBDB] bg-white p-4">
            <p className="text-xs text-[#6B7280]">
              <strong className="text-[#0F0F10]">Exclusions :</strong>{" "}
              L&apos;usure normale (pneus, poignees), les dommages causes par une
              mauvaise utilisation, une modification non autorisee ou un
              accident ne sont pas couverts par la garantie constructeur.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Garantie legale de conformite */}
          <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <h2 className="text-xl font-bold text-[#0F0F10]">
              Garantie legale de conformite
            </h2>
            <p className="mt-3 text-sm text-[#6B7280]">
              Conformement a l&apos;article L217-4 du Code de la consommation, le
              vendeur est tenu de livrer un bien conforme au contrat et repond
              des defauts de conformite existant lors de la delivrance. Cette
              garantie legale s&apos;applique pendant 2 ans a compter de la
              livraison du produit.
            </p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Durant les 24 premiers mois suivant la livraison, le
              consommateur n&apos;a pas a prouver que le defaut existait au moment
              de la livraison.
            </p>
          </div>

          {/* Garantie des vices caches */}
          <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <h2 className="text-xl font-bold text-[#0F0F10]">
              Garantie des vices caches
            </h2>
            <p className="mt-3 text-sm text-[#6B7280]">
              Conformement aux articles 1641 a 1649 du Code civil, l&apos;acheteur
              peut demander la resolution de la vente ou une reduction du prix
              si le produit est atteint d&apos;un vice cache le rendant impropre a
              l&apos;usage auquel il est destine, ou diminuant tellement cet usage
              que l&apos;acheteur ne l&apos;aurait pas acquis s&apos;il en avait eu
              connaissance. L&apos;action doit etre intentee dans un delai de 2 ans
              a compter de la decouverte du vice.
            </p>
          </div>
        </div>
      </div>

      {/* Comment faire valoir la garantie */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          Comment faire valoir votre garantie
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#DBDBDB] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
              1
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0F0F10]">
              Contactez-nous
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Envoyez-nous un email a contact@progolfdistribution.com ou appelez le 09 67 87
              67 95 en decrivant le probleme rencontre.
            </p>
          </div>

          <div className="rounded-2xl border border-[#DBDBDB] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
              2
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0F0F10]">
              Diagnostic
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Notre equipe SAV (Golf des Marques) effectue un diagnostic. Des
              photos ou une video du probleme pourront vous etre demandees.
            </p>
          </div>

          <div className="rounded-2xl border border-[#DBDBDB] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#356B0D] text-sm font-bold text-white">
              3
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0F0F10]">
              Reparation ou remplacement
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Selon le diagnostic, le produit sera repare ou remplace. Les
              pieces detachees officielles PowerBug sont disponibles en France.
            </p>
          </div>
        </div>
      </div>

      {/* Pieces detachees + Contact SAV */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <Wrench className="mb-4 h-8 w-8 text-[#356B0D]" />
          <h2 className="text-xl font-bold text-[#0F0F10]">
            Pieces detachees officielles
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            Les pieces detachees officielles PowerBug (roues, moteurs, cables,
            etc.) sont disponibles sur demande. Consultez notre page dediee
            pour identifier la reference de votre modele.
          </p>
          <div className="mt-4">
            <Link
              href="/pieces-detachees"
              className="text-sm font-medium text-[#356B0D] hover:underline"
            >
              Voir les pieces detachees &rarr;
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <h2 className="text-xl font-bold text-[#0F0F10]">Contact SAV</h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            Notre service apres-vente est gere en France par Golf des Marques.
            N&apos;hesitez pas a nous contacter pour toute question liee a la
            garantie ou au SAV.
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-[#356B0D]" />
              <a
                href="mailto:contact@progolfdistribution.com"
                className="text-sm text-[#6B7280] hover:text-[#356B0D]"
              >
                contact@progolfdistribution.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-[#356B0D]" />
              <a
                href="tel:+33967876795"
                className="text-sm text-[#6B7280] hover:text-[#356B0D]"
              >
                09 67 87 67 95
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
