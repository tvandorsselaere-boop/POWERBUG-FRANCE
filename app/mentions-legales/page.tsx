import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales - PowerBug France",
  description:
    "Mentions légales du site powerbug.fr — PRO GOLF DISTRIBUTION, distributeur exclusif PowerBug en France.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Mentions Légales</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Mentions Légales
      </h1>
      <p className="mt-3 text-sm text-[#6B7280]">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
        pour la confiance dans l&apos;économie numérique.
      </p>

      <div className="mt-10 space-y-10 text-[#0F0F10]">
        {/* Éditeur */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            1. Éditeur du site
          </h2>
          <div className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            <p>
              Le site{" "}
              <Link
                href="https://www.powerbug.fr"
                className="text-[#356B0D] underline"
              >
                www.powerbug.fr
              </Link>{" "}
              est édité par :
            </p>
            <div className="mt-3 space-y-1">
              <p>
                <strong className="text-[#0F0F10]">Raison sociale :</strong> PRO
                GOLF DISTRIBUTION
              </p>
              <p>
                <strong className="text-[#0F0F10]">Forme juridique :</strong>{" "}
                SASU (Société par Actions Simplifiée Unipersonnelle)
              </p>
              <p>
                <strong className="text-[#0F0F10]">SIREN :</strong> 888 311
                610 — <strong className="text-[#0F0F10]">SIRET :</strong> 888 311 610 00032
              </p>
              <p>
                <strong className="text-[#0F0F10]">RCS :</strong> Aix-en-Provence
              </p>
              <p>
                <strong className="text-[#0F0F10]">Capital social :</strong> 1 000 €
              </p>
              <p>
                <strong className="text-[#0F0F10]">N° TVA intracommunautaire :</strong>{" "}
                FR 07 888 311 610
              </p>
              <p>
                <strong className="text-[#0F0F10]">Siège social :</strong>{" "}
                Domaine de Riquetti, 13290 Aix-en-Provence
              </p>
              <p>
                <strong className="text-[#0F0F10]">Président :</strong>{" "}
                Frédéric Pensu
              </p>
              <p>
                <strong className="text-[#0F0F10]">Email :</strong>{" "}
                <a
                  href="mailto:contact@powerbug.fr"
                  className="text-[#356B0D] underline"
                >
                  contact@powerbug.fr
                </a>
              </p>
              <p>
                <strong className="text-[#0F0F10]">Téléphone :</strong>{" "}
                <a
                  href="tel:+33788239784"
                  className="text-[#356B0D] underline"
                >
                  07 88 23 97 84
                </a>
              </p>
              <p>
                <strong className="text-[#0F0F10]">Site web :</strong>{" "}
                <Link
                  href="https://www.powerbug.fr"
                  className="text-[#356B0D] underline"
                >
                  www.powerbug.fr
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Directeur de la publication */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            2. Directeur de la publication
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le directeur de la publication est{" "}
            <strong className="text-[#0F0F10]">Frédéric Pensu</strong>,
            en sa qualité de dirigeant de la société PRO GOLF DISTRIBUTION.
          </p>
        </section>

        {/* Hébergeur */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            3. Hébergeur
          </h2>
          <div className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            <p>Le site est hébergé par :</p>
            <div className="mt-3 space-y-1">
              <p>
                <strong className="text-[#0F0F10]">Raison sociale :</strong>{" "}
                Vercel Inc.
              </p>
              <p>
                <strong className="text-[#0F0F10]">Adresse :</strong> 340 S
                Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
              <p>
                <strong className="text-[#0F0F10]">Site web :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#356B0D] underline"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            4. Propriété intellectuelle
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            L&apos;ensemble du contenu du site (textes, images, logos, vidéos,
            graphismes, structure, mise en page) est protégé par le droit de la
            propriété intellectuelle. Toute reproduction, représentation,
            modification, publication ou adaptation, totale ou partielle, de
            ces éléments, par quelque moyen ou procédé que ce soit, est
            interdite sans l&apos;autorisation écrite préalable de PRO GOLF
            DISTRIBUTION.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            La marque PowerBug, son logo et les éléments visuels associés sont
            la propriété de PowerBug Ltd (Royaume-Uni). Leur utilisation sur ce
            site est autorisée dans le cadre du contrat de distribution
            exclusive pour le territoire français.
          </p>
        </section>

        {/* Données personnelles */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            5. Données personnelles et RGPD
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            PRO GOLF DISTRIBUTION s&apos;engage à protéger les données
            personnelles de ses utilisateurs conformément au Règlement Général
            sur la Protection des Données (RGPD — Règlement UE 2016/679) et à
            la loi Informatique et Libertés du 6 janvier 1978 modifiée.
          </p>

          <h3 className="mt-4 text-base font-medium text-[#0F0F10]">
            Données collectées
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Dans le cadre de la passation d&apos;une commande, nous collectons
            les données suivantes : nom, prénom, adresse email, adresse postale
            de livraison, numéro de téléphone. Ces données sont strictement
            nécessaires au traitement de la commande et à la livraison.
          </p>

          <h3 className="mt-4 text-base font-medium text-[#0F0F10]">
            Finalité du traitement
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Les données personnelles sont collectées pour les finalités
            suivantes : traitement des commandes, livraison des produits,
            gestion de la relation client et du service après-vente, envoi des
            emails transactionnels (confirmation de commande, suivi
            d&apos;expédition).
          </p>

          <h3 className="mt-4 text-base font-medium text-[#0F0F10]">
            Durée de conservation
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Les données personnelles sont conservées pendant la durée
            nécessaire aux finalités pour lesquelles elles ont été collectées,
            et au maximum pendant la durée des obligations légales applicables
            (notamment les obligations comptables et fiscales).
          </p>

          <h3 id="cookies" className="mt-4 text-base font-medium text-[#0F0F10]">
            Cookies
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le site utilise les catégories de cookies suivantes :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>
              <strong className="text-[#0F0F10]">Cookies techniques</strong> (strictement nécessaires) :
              panier, session utilisateur. Ces cookies ne nécessitent pas le
              consentement préalable conformément à la directive ePrivacy.
            </li>
            <li>
              <strong className="text-[#0F0F10]">Cookies de mesure d&apos;audience</strong> (Google Analytics) :
              ces cookies ne sont déposés qu&apos;après votre consentement explicite
              via le bandeau cookies affiché lors de votre première visite.
              Ils permettent de mesurer la fréquentation du site de manière anonymisée
              (adresse IP anonymisée). Vous pouvez retirer votre consentement à tout moment
              en supprimant le cookie <code className="rounded bg-[#F5F5F5] px-1 text-xs">cookie_consent</code> de votre navigateur.
            </li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le site n&apos;utilise aucun cookie de publicité ou de ciblage.
            La durée de validité du consentement est de 13 mois conformément
            aux recommandations de la CNIL.
          </p>

          <h3 className="mt-4 text-base font-medium text-[#0F0F10]">
            Droits de l&apos;utilisateur
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Conformément au RGPD, vous disposez des droits suivants concernant
            vos données personnelles :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>Droit d&apos;accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la limitation du traitement</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse{" "}
            <a
              href="mailto:contact@powerbug.fr"
              className="text-[#356B0D] underline"
            >
              contact@powerbug.fr
            </a>
            . Vous disposez également du droit d&apos;introduire une
            réclamation auprès de la CNIL (Commission Nationale de
            l&apos;Informatique et des Libertés) :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B0D] underline"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </section>

        {/* Sous-traitants */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            6. Sous-traitants
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Pour le traitement des commandes, nous faisons appel aux
            sous-traitants suivants :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>
              <strong className="text-[#0F0F10]">Stripe</strong> — Traitement
              des paiements en ligne (données bancaires)
            </li>
            <li>
              <strong className="text-[#0F0F10]">Vercel</strong> — Hébergement
              du site web
            </li>
            <li>
              <strong className="text-[#0F0F10]">Supabase</strong> — Base de
              données (données de commande)
            </li>
            <li>
              <strong className="text-[#0F0F10]">DPD</strong> — Transport et
              livraison des colis
            </li>
            <li>
              <strong className="text-[#0F0F10]">Google Analytics</strong> — Mesure
              d&apos;audience (avec consentement)
            </li>
          </ul>
        </section>

        {/* Limitation de responsabilité */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            7. Limitation de responsabilité
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            PRO GOLF DISTRIBUTION s&apos;efforce de fournir sur le site des
            informations aussi précises que possible. Toutefois, elle ne pourra
            être tenue responsable des omissions, des inexactitudes ou des
            carences dans la mise à jour de ces informations, qu&apos;elles
            soient de son fait ou du fait des tiers partenaires qui lui
            fournissent ces informations.
          </p>
        </section>

        {/* Liens hypertextes */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            8. Liens hypertextes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le site peut contenir des liens hypertextes vers d&apos;autres
            sites. PRO GOLF DISTRIBUTION ne dispose d&apos;aucun moyen de
            contrôle du contenu des sites tiers et décline toute responsabilité
            quant au contenu de ces sites.
          </p>
        </section>

        {/* Crédits */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            9. Crédits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Site réalisé par{" "}
            <strong className="text-[#0F0F10]">Facile-IA</strong>. Les
            photographies et visuels des produits PowerBug sont la propriété de
            PowerBug Ltd et sont utilisés avec autorisation.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6">
          <h2 className="text-lg font-semibold text-[#0F0F10]">
            Contact
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Pour toute question relative aux mentions légales, vous pouvez nous
            contacter à{" "}
            <a
              href="mailto:contact@powerbug.fr"
              className="text-[#356B0D] underline"
            >
              contact@powerbug.fr
            </a>{" "}
            ou par téléphone au{" "}
            <a href="tel:+33788239784" className="text-[#356B0D] underline">
              07 88 23 97 84
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
