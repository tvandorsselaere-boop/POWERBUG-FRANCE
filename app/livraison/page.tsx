import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck, Clock, MapPin, Mail, Phone, PackageCheck, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Livraison - PowerBug France",
  description:
    "Livraison PowerBug France — DPD à domicile 14,90€ pour les chariots, DPD Relais 3,90€ pour les accessoires. France métropolitaine, 1 à 3 jours ouvrés.",
  alternates: { canonical: "/livraison" },
};

export default function LivraisonPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">Accueil</Link>
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
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">Transporteur DPD</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Réseau professionnel avec suivi en temps réel
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Clock className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">1 à 3 jours ouvrés</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Délai de livraison après expédition, lundi au vendredi
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <PackageCheck className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">14,90€ ou 3,90€</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Selon le type de commande (chariot ou accessoire)
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <MapPin className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">France métropolitaine</h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Hors Corse, Monaco, Île de Ré et Île d&apos;Oléron
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-10 text-[#0F0F10]">

        {/* Frais de livraison */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">Frais de livraison</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#DBDBDB]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#DBDBDB] bg-[#F5F5F5]">
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">Type de commande</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">Mode</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">Délai</th>
                  <th className="px-6 py-3 text-left font-semibold text-[#0F0F10]">Tarif TTC</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#DBDBDB]/50">
                  <td className="px-6 py-4 text-[#0F0F10] font-medium">Chariot électrique</td>
                  <td className="px-6 py-4 text-[#6B7280]">DPD à domicile</td>
                  <td className="px-6 py-4 text-[#6B7280]">1–3 jours ouvrés</td>
                  <td className="px-6 py-4 font-bold text-[#0F0F10]">14,90 €</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-[#0F0F10] font-medium">Accessoires / Pièces</td>
                  <td className="px-6 py-4 text-[#6B7280]">DPD Relais</td>
                  <td className="px-6 py-4 text-[#6B7280]">1–3 jours ouvrés</td>
                  <td className="px-6 py-4 font-bold text-[#0F0F10]">3,90 €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* DPD Relais */}
        <section>
          <div className="flex items-center gap-3">
            <Store className="h-6 w-6 text-[#356B0D]" />
            <h2 className="text-xl font-semibold text-[#0F0F10]">DPD Relais — accessoires</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Pour les accessoires et pièces détachées, la livraison s&apos;effectue en{" "}
            <strong className="text-[#0F0F10]">point relais DPD</strong> (3,90 €).
            Lors de la commande, vous sélectionnez le point relais le plus proche de chez vous
            parmi plus de <strong className="text-[#0F0F10]">5 000 commerces de proximité</strong>{" "}
            (tabacs/presse, épiceries, fleuristes…).
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Dès réception du colis au point relais, vous êtes alerté par email et/ou SMS.
            Les horaires du point relais vous sont communiqués. Livraison du lundi au vendredi.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            <strong className="text-[#0F0F10]">Important :</strong> Merci de vérifier la validité
            de votre adresse email et numéro de téléphone lors de la commande.
          </p>
          <p className="mt-2 text-sm text-[#6B7280]">
            Zone couverte : France métropolitaine{" "}
            <strong className="text-[#0F0F10]">hors Corse, Monaco, Île de Ré et Île d&apos;Oléron</strong>.
          </p>
        </section>

        {/* DPD Domicile */}
        <section>
          <div className="flex items-center gap-3">
            <Truck className="h-6 w-6 text-[#356B0D]" />
            <h2 className="text-xl font-semibold text-[#0F0F10]">DPD à domicile — chariots</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les chariots électriques sont livrés{" "}
            <strong className="text-[#0F0F10]">à domicile par DPD</strong> (14,90 €).
            Le colis est remis en main propre ou déposé. En cas d&apos;absence, DPD vous laisse
            un avis de passage pour reprogrammer la livraison.
          </p>
        </section>

        {/* Zone */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">Zone de livraison</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Nous livrons exclusivement en <strong className="text-[#0F0F10]">France métropolitaine</strong>.
            Les zones suivantes ne sont pas desservies :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>Corse, Monaco, Île de Ré, Île d&apos;Oléron</li>
            <li>DOM-TOM (Guadeloupe, Martinique, Réunion, Mayotte, Guyane, etc.)</li>
            <li>Étranger (Belgique, Suisse, etc.)</li>
          </ul>
        </section>

        {/* Suivi */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">Suivi de commande</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Dès l&apos;expédition, vous recevrez un{" "}
            <strong className="text-[#0F0F10]">email avec votre numéro de tracking DPD</strong>.
            Ce numéro vous permet de suivre votre colis en temps réel sur le site de DPD.
          </p>
        </section>

        {/* Réception */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">Réception du colis</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Vérifier l&apos;état extérieur du colis avant de signer
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              En cas de dommage visible, émettre des <strong className="text-[#0F0F10]">réserves écrites</strong> auprès du transporteur
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Nous contacter sous <strong className="text-[#0F0F10]">48 heures</strong> en cas de problème
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6">
          <h2 className="text-lg font-semibold text-[#0F0F10]">Une question sur votre livraison ?</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Notre équipe répond sous 24h ouvrées.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <a href="mailto:fred@powerbug.fr" className="flex items-center gap-2 text-sm text-[#356B0D] hover:underline">
              <Mail className="h-4 w-4" />
              fred@powerbug.fr
            </a>
            <a href="tel:+33788239784" className="flex items-center gap-2 text-sm text-[#356B0D] hover:underline">
              <Phone className="h-4 w-4" />
              07 88 23 97 84
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
