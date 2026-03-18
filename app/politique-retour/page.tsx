import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Package, Clock, Mail, Phone, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Retour - PowerBug France",
  description:
    "Politique de retour et droit de rétractation — 14 jours pour changer d'avis. PowerBug France, distributeur exclusif.",
};

export default function PolitiqueRetourPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Politique de Retour</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Politique de Retour
      </h1>
      <p className="mt-3 text-lg text-[#6B7280]">
        Votre satisfaction est notre priorité. Vous disposez de 14 jours pour
        changer d&apos;avis.
      </p>

      {/* Key points cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Clock className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            14 jours
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Délai de rétractation à compter de la réception
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Package className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            État d&apos;origine
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Produit non utilisé, dans son emballage d&apos;origine
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <Mail className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            Simple demande
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Contactez-nous par email ou téléphone
          </p>
        </div>
        <div className="rounded-2xl border border-[#DBDBDB] bg-white p-6">
          <AlertCircle className="h-8 w-8 text-[#356B0D]" />
          <h3 className="mt-3 text-base font-semibold text-[#0F0F10]">
            Remboursement rapide
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">
            Sous 14 jours après réception du retour
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-10 text-[#0F0F10]">
        {/* Droit de rétractation */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Droit de rétractation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Conformément à l&apos;article L221-18 du Code de la consommation,
            vous disposez d&apos;un délai de{" "}
            <strong className="text-[#0F0F10]">14 jours calendaires</strong> à
            compter de la réception de votre commande pour exercer votre droit
            de rétractation, sans avoir à justifier de motif ni à payer de
            pénalité.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Ce délai court à compter du jour de la réception du produit par le
            client ou par un tiers désigné par celui-ci (autre que le
            transporteur).
          </p>
        </section>

        {/* Conditions */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Conditions de retour
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Pour être accepté, le retour doit respecter les conditions
            suivantes :
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Le produit doit être{" "}
              <strong className="text-[#0F0F10]">non utilisé</strong> et dans
              son <strong className="text-[#0F0F10]">état d&apos;origine</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Le produit doit être retourné dans son{" "}
              <strong className="text-[#0F0F10]">emballage d&apos;origine</strong>,
              complet (accessoires, notices, câbles, etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Le produit ne doit pas présenter de traces d&apos;utilisation, de
              rayures ou de dommages
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
              Tout produit retourné incomplet, abîmé, endommagé ou sali par le
              client ne sera pas remboursé
            </li>
          </ul>
        </section>

        {/* Procédure */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Comment effectuer un retour ?
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#356B0D] text-sm font-semibold text-white">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#0F0F10]">
                  Contactez-nous
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Envoyez-nous un email à{" "}
                  <a
                    href="mailto:contact@progolfdistribution.com"
                    className="text-[#356B0D] underline"
                  >
                    contact@progolfdistribution.com
                  </a>{" "}
                  ou appelez-nous au{" "}
                  <a
                    href="tel:+33788239784"
                    className="text-[#356B0D] underline"
                  >
                    07 88 23 97 84
                  </a>{" "}
                  en précisant votre numéro de commande et le motif du retour.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#356B0D] text-sm font-semibold text-white">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#0F0F10]">
                  Recevez l&apos;autorisation de retour
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Nous vous confirmerons la procédure de retour et vous
                  communiquerons l&apos;adresse d&apos;envoi.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#356B0D] text-sm font-semibold text-white">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#0F0F10]">
                  Expédiez le produit
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Emballez soigneusement le produit dans son emballage
                  d&apos;origine et envoyez-le à l&apos;adresse indiquée. Nous
                  vous recommandons d&apos;utiliser un envoi avec suivi.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#356B0D] text-sm font-semibold text-white">
                4
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#0F0F10]">
                  Remboursement
                </h3>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Après réception et vérification du produit, nous procéderons
                  au remboursement sous 14 jours maximum, par le même moyen de
                  paiement que celui utilisé pour la commande.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Frais de retour */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Frais de retour
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les frais de retour sont{" "}
            <strong className="text-[#0F0F10]">à la charge du client</strong>.
            Le client est libre de choisir le transporteur de son choix pour
            le retour. Nous recommandons l&apos;utilisation d&apos;un service
            de transport avec suivi et assurance, le client étant responsable
            du produit jusqu&apos;à sa réception par nos services.
          </p>
        </section>

        {/* Remboursement */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Modalités de remboursement
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le remboursement sera effectué dans un délai maximum de{" "}
            <strong className="text-[#0F0F10]">14 jours</strong> suivant la
            réception du produit retourné. Le remboursement portera sur le prix
            du produit (hors frais de livraison initiale, sauf si la totalité de
            la commande est retournée). Le remboursement s&apos;effectuera par
            le même moyen de paiement que celui utilisé lors de la commande.
          </p>
        </section>

        {/* Exceptions */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Exceptions au droit de rétractation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Conformément à l&apos;article L221-28 du Code de la consommation,
            le droit de rétractation ne peut être exercé pour les produits qui
            ont été descellés par le client après la livraison et qui ne peuvent
            être renvoyés pour des raisons d&apos;hygiène ou de protection de la
            santé.
          </p>
        </section>

        {/* Garantie */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Produit défectueux ou non conforme
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Si vous avez reçu un produit défectueux ou non conforme à votre
            commande, veuillez nous contacter dans les plus brefs délais. Dans
            ce cas, les frais de retour seront pris en charge par PRO GOLF
            DISTRIBUTION et le produit sera échangé ou remboursé intégralement
            (produit + frais de livraison).
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Pour rappel, les chariots PowerBug bénéficient d&apos;une{" "}
            <strong className="text-[#0F0F10]">
              garantie constructeur de 2 ans
            </strong>
            . En cas de panne ou de dysfonctionnement, contactez-nous pour la
            prise en charge sous garantie.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6">
          <h2 className="text-lg font-semibold text-[#0F0F10]">
            Besoin d&apos;aide pour un retour ?
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Notre équipe est à votre disposition pour vous accompagner.
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
              href="tel:+33788239784"
              className="flex items-center gap-2 text-sm text-[#356B0D] hover:underline"
            >
              <Phone className="h-4 w-4" />
              07 88 23 97 84
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
