import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Award, Clock, Users, Wrench, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notre Histoire - PowerBug France",
  description:
    "Decouvrez PowerBug, fabricant britannique de chariots de golf electriques depuis 2003. Plus de 20 ans d'innovation, 8 000+ avis clients verifies.",
};

export default function NotreHistoirePage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Notre Histoire</span>
      </nav>

      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
          Notre Histoire
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[#6B7280]">
          Depuis 2003, PowerBug concoit et fabrique des chariots de golf
          electriques au Royaume-Uni. Plus de 20 ans d&apos;experience au
          service des golfeurs, avec un objectif : offrir le meilleur rapport
          qualite-fiabilite du marche.
        </p>
      </div>

      {/* Timeline / Key facts */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <Clock className="mb-4 h-8 w-8 text-[#356B0D]" />
          <h2 className="text-xl font-bold text-[#0F0F10]">Fonde en 2003</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            PowerBug est un fabricant britannique fonde en 2003. En plus de 20
            ans, la marque s&apos;est imposee comme une reference sur le marche
            des chariots de golf electriques, reconnue pour la fiabilite de ses
            produits et la qualite de son service client.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <Users className="mb-4 h-8 w-8 text-[#356B0D]" />
          <h2 className="text-xl font-bold text-[#0F0F10]">
            8 000+ avis clients
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Plus de 8 000 avis clients verifies temoignent de la satisfaction
            des utilisateurs PowerBug a travers le monde. La marque est classee
            parmi les mieux notees pour le service client et la fiabilite dans
            le secteur des chariots de golf.
          </p>
        </div>

        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
          <Award className="mb-4 h-8 w-8 text-[#356B0D]" />
          <h2 className="text-xl font-bold text-[#0F0F10]">
            Service & fiabilite
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            PowerBug est classe comme la marque de chariot de golf la mieux
            notee pour le service client et la fiabilite. Chaque produit est
            concu pour durer, avec une garantie constructeur de 2 ans sur le
            trolley et la batterie.
          </p>
        </div>
      </div>

      {/* PowerBug en France */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          PowerBug en France
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <MapPin className="mb-4 h-8 w-8 text-[#356B0D]" />
            <h3 className="text-lg font-bold text-[#0F0F10]">
              Distributeur exclusif
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              PRO GOLF DISTRIBUTION est le distributeur exclusif de PowerBug en
              France. Nous assurons la vente, la livraison et le suivi de
              chaque commande sur tout le territoire metropolitain.
            </p>
          </div>

          <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <Wrench className="mb-4 h-8 w-8 text-[#356B0D]" />
            <h3 className="text-lg font-bold text-[#0F0F10]">
              SAV en France
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Le service apres-vente est gere localement en France par Golf des
              Marques. Garantie constructeur de 2 ans, pieces detachees
              officielles disponibles, et un interlocuteur francophone pour
              toutes vos questions.
            </p>
          </div>
        </div>
      </div>

      {/* La gamme actuelle */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          La gamme actuelle : la serie NX
        </h2>
        <p className="mt-4 max-w-3xl text-[#6B7280]">
          La serie NX represente le meilleur de PowerBug : technologie lithium,
          systeme de pliage VRAP ultra-compact, moteurs silencieux et batterie
          36 trous pour 2 tours complets sans recharge. Deux modeles disponibles
          en France :
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-3xl">
          <div className="rounded-2xl border border-[#DBDBDB] p-6">
            <h3 className="text-lg font-bold text-[#0F0F10]">NX Lithium</h3>
            <p className="mt-1 text-2xl font-bold text-[#356B0D]">899 &euro;</p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Le modele essentiel. Compact, fiable, avec toutes les
              fonctionnalites dont vous avez besoin sur le parcours.
            </p>
          </div>
          <div className="rounded-2xl border border-[#DBDBDB] p-6">
            <h3 className="text-lg font-bold text-[#0F0F10]">
              NX DHC Lithium
            </h3>
            <p className="mt-1 text-2xl font-bold text-[#356B0D]">999 &euro;</p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Le modele premium. Inclut le Downhill Control (controle en
              descente) et le frein parking pour plus de securite.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-[#0F0F10] sm:text-3xl">
          Decouvrez la gamme PowerBug NX
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
          Comparez le NX Lithium et le NX DHC Lithium cote a cote et trouvez le
          chariot qui vous convient.
        </p>
        <div className="mt-6">
          <Link href="/trolleys">
            <Button
              size="lg"
              className="btn-glass rounded-[10px] text-white"
            >
              Voir les trolleys
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
