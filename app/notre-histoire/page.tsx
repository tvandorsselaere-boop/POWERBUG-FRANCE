import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Award,
  Clock,
  Users,
  Wrench,
  MapPin,
  Globe,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notre Histoire - PowerBug France",
  description:
    "Decouvrez PowerBug, fabricant britannique de chariots de golf electriques depuis 2003. Plus de 20 ans d'innovation, 8 300+ avis clients verifies.",
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

      {/* Hero with image */}
      <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl lg:text-5xl">
            Plus de 20 ans d&apos;innovation au service du golf
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#6B7280]">
            Fondee en 2003 au Royaume-Uni, PowerBug est une marque de chariots
            de golf electriques concus pour allier fiabilite, simplicite et
            rapport qualite-prix. La societe Wizza Ltd, basee a Flackwell Heath
            dans le Buckinghamshire, developpe et commercialise la gamme PowerBug
            a travers le monde.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[#6B7280]">
            La philosophie de la marque : une qualite premium sans prix
            extravagant. Chaque chariot est concu pour durer, avec des
            composants robustes et un design epure pense pour le parcours.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/images/lifestyle/NX-Lifestyle-7.jpg"
            alt="PowerBug NX sur le parcours de golf"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Key facts */}
      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6 text-center">
          <Clock className="mx-auto mb-3 h-8 w-8 text-[#356B0D]" />
          <p className="text-3xl font-bold text-[#0F0F10]">2003</p>
          <p className="mt-1 text-sm text-[#6B7280]">Annee de creation</p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-[#356B0D]" />
          <p className="text-3xl font-bold text-[#0F0F10]">8 300+</p>
          <p className="mt-1 text-sm text-[#6B7280]">Avis clients verifies</p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6 text-center">
          <Globe className="mx-auto mb-3 h-8 w-8 text-[#356B0D]" />
          <p className="text-3xl font-bold text-[#0F0F10]">13</p>
          <p className="mt-1 text-sm text-[#6B7280]">Pays de distribution</p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6 text-center">
          <Award className="mx-auto mb-3 h-8 w-8 text-[#356B0D]" />
          <p className="text-3xl font-bold text-[#0F0F10]">N&deg;1</p>
          <p className="mt-1 text-sm text-[#6B7280]">Satisfaction client trolleys</p>
        </div>
      </div>

      {/* History timeline */}
      <div className="mb-16">
        <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          L&apos;histoire PowerBug
        </h2>

        <div className="space-y-12">
          {/* 2003 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8DC63F]">
                2003
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F0F10]">
                Les debuts au Royaume-Uni
              </h3>
              <p className="mt-3 text-[#6B7280]">
                PowerBug est fondee avec une mission claire : proposer des
                chariots de golf electriques fiables et accessibles. La marque
                s&apos;associe avec des usines specialisees, les memes qui
                produisent des marques premium du secteur, pour offrir une
                qualite equivalente a un prix plus juste.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/lifestyle/NX-Lifestyle-14.jpg"
                alt="PowerBug NX sur le green"
                width={800}
                height={500}
                className="h-64 w-full object-cover lg:h-72"
              />
            </div>
          </div>

          {/* Distribution */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 overflow-hidden rounded-2xl lg:order-1">
              <Image
                src="/images/lifestyle/NX-Lifestyle-10.jpg"
                alt="PowerBug NX en action sur le parcours"
                width={800}
                height={500}
                className="h-64 w-full object-cover lg:h-72"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8DC63F]">
                Croissance
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F0F10]">
                De Costco a American Golf
              </h3>
              <p className="mt-3 text-[#6B7280]">
                PowerBug se fait d&apos;abord connaitre au Royaume-Uni via les
                magasins Costco avec le modele Sport X. La marque integre
                ensuite le reseau American Golf, le plus grand detaillant de
                golf au Royaume-Uni. Aujourd&apos;hui, PowerBug privilegle la
                vente directe tout en maintenant un reseau de detaillants
                partenaires.
              </p>
            </div>
          </div>

          {/* Innovation 2008 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8DC63F]">
                2008
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F0F10]">
                Passage au controle digital
              </h3>
              <p className="mt-3 text-[#6B7280]">
                PowerBug abandonne le controle mecanique de vitesse au profit
                d&apos;une plateforme 100% digitale. Cette evolution permet un
                controle plus precis, une meilleure reactivite du moteur et une
                experience de conduite plus fluide sur tous les terrains.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/lifestyle/NX-Lifestyle-18-Handle-Detail.jpg"
                alt="Detail poignee PowerBug NX avec controles digitaux"
                width={800}
                height={500}
                className="h-64 w-full object-cover lg:h-72"
              />
            </div>
          </div>

          {/* International */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 overflow-hidden rounded-2xl lg:order-1">
              <Image
                src="/images/lifestyle/NX-Lifestyle-39.jpg"
                alt="PowerBug NX sur parcours de golf"
                width={800}
                height={500}
                className="h-64 w-full object-cover lg:h-72"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#8DC63F]">
                Aujourd&apos;hui
              </p>
              <h3 className="mt-2 text-xl font-bold text-[#0F0F10]">
                Present dans 13 pays
              </h3>
              <p className="mt-3 text-[#6B7280]">
                PowerBug est aujourd&apos;hui distribue dans 13 pays : Royaume-Uni,
                France, Espagne, Portugal, Italie, Allemagne, Islande, Danemark,
                Pays-Bas, Australie, Nouvelle-Zelande, Canada et Etats-Unis. La
                serie NX, derniere generation de chariots lithium, represente le
                meilleur de 20 ans de savoir-faire.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trustpilot section */}
      <div className="mb-16 rounded-2xl border border-[#DBDBDB] bg-white p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-7 w-7 fill-[#F6A429] text-[#F6A429]"
              />
            ))}
          </div>
          <p className="text-3xl font-bold text-[#0F0F10]">
            4.9<span className="text-lg text-[#6B7280]">/5</span>
          </p>
          <p className="mt-2 text-[#6B7280]">
            sur Trustpilot — 3 895 avis verifies
          </p>
          <p className="mt-1 text-sm text-[#6B7280]">
            &laquo; Ranked the highest golf trolley brand for customer service
            &amp; reliability &raquo;
          </p>
          <a
            href="https://uk.trustpilot.com/review/powerbug.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#356B0D] hover:underline"
          >
            Voir les avis sur Trustpilot
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* PowerBug en France */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          PowerBug en France
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8">
            <MapPin className="mb-4 h-8 w-8 text-[#356B0D]" />
            <h3 className="text-lg font-bold text-[#0F0F10]">
              Distributeur exclusif
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              PRO GOLF DISTRIBUTION est le distributeur exclusif de PowerBug en
              France. Nous assurons la vente, la livraison via DPD et le suivi
              de chaque commande sur tout le territoire metropolitain.
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
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#0F0F10] sm:text-3xl">
          La gamme actuelle : la serie NX
        </h2>
        <p className="max-w-3xl text-[#6B7280]">
          La serie NX represente le meilleur de PowerBug : technologie lithium
          28V, systeme de pliage VRAP ultra-compact, moteurs silencieux et
          batterie 36 trous pour 2 tours complets sans recharge. Deux modeles
          disponibles en France :
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-3xl">
          <Link
            href="/trolleys/nx-lithium"
            className="group rounded-2xl border border-[#DBDBDB] p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <h3 className="text-lg font-bold text-[#0F0F10] group-hover:text-[#356B0D]">
              NX Lithium
            </h3>
            <p className="mt-1 text-2xl font-bold text-[#356B0D]">899 &euro;</p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Le modele essentiel. Compact, fiable, avec toutes les
              fonctionnalites dont vous avez besoin sur le parcours.
            </p>
          </Link>
          <Link
            href="/trolleys/nx-dhc-lithium"
            className="group rounded-2xl border border-[#DBDBDB] p-6 transition-all hover:border-[#356B0D]/30 hover:shadow-lg"
          >
            <h3 className="text-lg font-bold text-[#0F0F10] group-hover:text-[#356B0D]">
              NX DHC Lithium
            </h3>
            <p className="mt-1 text-2xl font-bold text-[#356B0D]">999 &euro;</p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Le modele premium. Inclut le Downhill Control (controle en
              descente) et le frein parking pour plus de securite.
            </p>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-[#0F0F10] sm:text-3xl">
          Decouvrez la gamme PowerBug NX
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
          Comparez le NX Lithium et le NX DHC Lithium cote a cote et trouvez le
          chariot qui vous convient.
        </p>
        <div className="mt-6">
          <Button
            asChild
            size="lg"
            className="btn-glass rounded-[10px] text-white"
          >
            <Link href="/trolleys">Voir les trolleys</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
