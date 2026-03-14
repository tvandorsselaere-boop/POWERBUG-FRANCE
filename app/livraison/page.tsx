import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck, Clock, MapPin, Mail, Phone, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Livraison - PowerBug France",
  description:
    "Informations de livraison PowerBug France — Livraison DPD en France métropolitaine, 15€ forfait fixe, 3-5 jours ouvrés.",
};

export default function LivraisonPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Livraison</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Livraison
      </h1>
      <p className="mt-3 text-lg text-[#6B7280]">
        Livraison rapide et sécurisée partout en France métropolitaine avec DPD.
      </p>

      {/* Key info cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Truck className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            Transporteur DPD
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Réseau professionnel de livraison avec suivi en temps réel
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Clock className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            3 à 5 jours ouvrés
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Délai de livraison après expédition de votre commande
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <PackageCheck className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            15 € forfait fixe
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Frais de livraison TTC, quel que soit le contenu de la commande
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <MapPin className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            France métropolitaine
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Livraison à domicile sur tout le territoire métropolitain
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-10 text-[#0F0F10]">
        {/* Zone de livraison */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Zone de livraison
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Nous livrons exclusivement en{" "}
            <strong className="text-[#0F0F10]">France métropolitaine</strong>.
            Les zones suivantes ne sont pas desservies pour le moment :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>DOM-TOM (Guadeloupe, Martinique, Réunion, Mayotte, Guyane, etc.)</li>
            <li>Belgique</li>
            <li>Suisse</li>
            <li>Autres pays</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Si vous résidez dans une zone non desservie et souhaitez commander,
            n&apos;hésitez pas à nous contacter pour étudier les possibilités.
          </p>
        </section>

        {/* Frais de livraison */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Frais de livraison
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#DBDBDB]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DBDBDB] bg-[#F5F5F5]">
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">
                    Zone
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">
                    Transporteur
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">
                    Délai
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">
                    Tarif TTC
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-3 text-[#6B7280]">
                    France métropolitaine
                  </td>
                  <td className="px-6 py-3 text-[#6B7280]">DPD</td>
                  <td className="px-6 py-3 text-[#6B7280]">
                    3-5 jours ouvrés
                  </td>
                  <td className="px-6 py-3 font-semibold text-[#0F0F10]">
                    15,00 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-[#6B7280]">
            Les frais de livraison sont à{" "}
            <strong className="text-[#0F0F10]">forfait fixe de 15 € TTC</strong>,
            quel que soit le poids ou le nombre d&apos;articles commandés.
          </p>
        </section>

        {/* Délais */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Délais de livraison
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les commandes sont expédiées sous{" "}
            <strong className="text-[#0F0F10]">1 à 2 jours ouvrés</strong>{" "}
            après la confirmation du paiement (sous réserve de disponibilité en
            stock). Le délai de livraison est ensuite de{" "}
            <strong className="text-[#0F0F10]">3 à 5 jours ouvrés</strong>{" "}
            après expédition.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Les délais indiqués sont des estimations basées sur les délais
            habituels du transporteur DPD. Ils sont donnés à titre indicatif et
            peuvent varier en fonction de la période (soldes, fêtes, etc.) ou
            de circonstances exceptionnelles.
          </p>
        </section>

        {/* Suivi */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Suivi de commande
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Dès l&apos;expédition de votre commande, vous recevrez un{" "}
            <strong className="text-[#0F0F10]">
              email contenant votre numéro de tracking DPD
            </strong>
            . Ce numéro vous permet de suivre l&apos;acheminement de votre colis
            en temps réel sur le site de DPD.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Si vous ne recevez pas d&apos;email de suivi dans les 48 heures
            suivant votre commande, vérifiez vos courriers indésirables
            (spam) ou contactez-nous.
          </p>
        </section>

        {/* Mode de livraison */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Mode de livraison
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            La livraison s&apos;effectue{" "}
            <strong className="text-[#0F0F10]">à domicile uniquement</strong>.
            Le colis est remis en main propre ou déposé selon les instructions
            de DPD. En cas d&apos;absence, le transporteur vous laissera un avis
            de passage avec les instructions pour reprogrammer la livraison ou
            récupérer votre colis dans un point relais DPD.
          </p>
        </section>

        {/* Réception */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Réception du colis
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            À la réception de votre colis, nous vous recommandons de :
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Vérifier l&apos;état extérieur du colis avant de signer le bon de
              livraison
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              En cas de dommage visible, émettre des{" "}
              <strong className="text-[#0F0F10]">réserves écrites</strong>{" "}
              auprès du transporteur
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Vérifier le contenu du colis et la conformité avec votre commande
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Nous contacter sous{" "}
              <strong className="text-[#0F0F10]">48 heures</strong> en cas de
              problème (colis endommagé, produit manquant ou non conforme)
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6">
          <h2 className="text-lg font-semibold text-[#0F0F10]">
            Une question sur votre livraison ?
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Notre équipe est disponible pour répondre à toutes vos questions
            sur la livraison et le suivi de votre commande.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <a
              href="mailto:contact@progolfdistribution.com"
              className="flex items-center gap-2 text-sm text-[#356B0D] hover:underline"
            >
              <Mail className="h-4 w-4" />
              contact@progolfdistribution.com
            </a>
            <a
              href="tel:+33967876795"
              className="flex items-center gap-2 text-sm text-[#356B0D] hover:underline"
            >
              <Phone className="h-4 w-4" />
              09 67 87 67 95
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
