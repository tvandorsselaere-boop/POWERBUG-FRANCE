import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles de PowerBug France (PRO GOLF DISTRIBUTION).",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <h1 className="mb-2 text-3xl font-semibold text-[#0F0F10]">
        Politique de confidentialité
      </h1>
      <p className="mb-10 text-sm text-[#6B7280]">Dernière mise à jour : 20 mars 2026</p>

      <div className="space-y-10 text-[#0F0F10]">
        {/* 1. Responsable */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">1. Responsable du traitement</h2>
          <p className="leading-relaxed text-[#374151]">
            <strong>PRO GOLF DISTRIBUTION</strong> — SASU au capital de 1 000 €<br />
            SIREN 888 311 610 — RCS Aix-en-Provence<br />
            Siège social : Domaine de Riquetti, 13290 Aix-en-Provence<br />
            Email : <a href="mailto:contact@powerbug.fr" className="text-[#356B0D] hover:underline">contact@powerbug.fr</a>
          </p>
        </section>

        {/* 2. Données collectées */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">2. Données collectées</h2>
          <p className="mb-3 leading-relaxed text-[#374151]">
            Nous collectons uniquement les données nécessaires au fonctionnement du site et au traitement de vos commandes :
          </p>
          <ul className="space-y-2 pl-5 text-[#374151]">
            <li className="list-disc leading-relaxed">
              <strong>Formulaire de contact</strong> : nom, adresse email, message. Utilisés uniquement pour répondre à votre demande.
            </li>
            <li className="list-disc leading-relaxed">
              <strong>Commandes</strong> : nom, prénom, adresse de livraison, email, téléphone. Nécessaires à l'exécution du contrat (livraison, facturation, service après-vente).
            </li>
            <li className="list-disc leading-relaxed">
              <strong>Paiement</strong> : géré intégralement par Stripe (prestataire certifié PCI-DSS). Nous ne stockons aucune donnée bancaire.
            </li>
            <li className="list-disc leading-relaxed">
              <strong>Compte client</strong> : email, mot de passe (hashé), historique de commandes. Stockés dans Supabase (serveurs EU).
            </li>
            <li className="list-disc leading-relaxed">
              <strong>Mesure d'audience</strong> : Google Analytics 4 (GA4), uniquement avec votre consentement. Données anonymisées, aucune vente à des tiers.
            </li>
            <li className="list-disc leading-relaxed">
              <strong>Cookies techniques</strong> : panier (localStorage), session (Supabase Auth). Nécessaires au fonctionnement du site, pas soumis au consentement.
            </li>
          </ul>
        </section>

        {/* 3. Durée de conservation */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">3. Durée de conservation</h2>
          <ul className="space-y-2 pl-5 text-[#374151]">
            <li className="list-disc leading-relaxed">Données de commande et facturation : <strong>10 ans</strong> (obligation comptable légale)</li>
            <li className="list-disc leading-relaxed">Compte client inactif : <strong>3 ans</strong> après la dernière connexion</li>
            <li className="list-disc leading-relaxed">Messages de contact : <strong>1 an</strong> après clôture de la demande</li>
            <li className="list-disc leading-relaxed">Données Google Analytics : <strong>14 mois</strong> (paramètre GA4 par défaut)</li>
            <li className="list-disc leading-relaxed">Cookie de consentement : <strong>13 mois</strong> (recommandation CNIL)</li>
          </ul>
        </section>

        {/* 4. Destinataires */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">4. Destinataires des données</h2>
          <p className="mb-3 leading-relaxed text-[#374151]">
            Vos données ne sont jamais vendues. Elles peuvent être transmises aux sous-traitants suivants, dans le strict cadre de l'exécution des services :
          </p>
          <ul className="space-y-2 pl-5 text-[#374151]">
            <li className="list-disc leading-relaxed"><strong>Stripe</strong> — paiement sécurisé (États-Unis, certifié PCI-DSS, clauses contractuelles types UE)</li>
            <li className="list-disc leading-relaxed"><strong>Supabase</strong> — base de données et authentification (serveurs EU)</li>
            <li className="list-disc leading-relaxed"><strong>DPD France</strong> — livraison des colis (nom, adresse, téléphone)</li>
            <li className="list-disc leading-relaxed"><strong>Golf des Marques</strong> — préparateur logistique (nom, adresse de livraison, détail commande)</li>
            <li className="list-disc leading-relaxed"><strong>ZeptoMail / Zoho</strong> — envoi des emails transactionnels</li>
            <li className="list-disc leading-relaxed"><strong>Google Analytics</strong> — mesure d'audience anonymisée (avec consentement uniquement)</li>
          </ul>
        </section>

        {/* 5. Droits */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">5. Vos droits (RGPD)</h2>
          <p className="mb-3 leading-relaxed text-[#374151]">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <ul className="space-y-2 pl-5 text-[#374151]">
            <li className="list-disc leading-relaxed"><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
            <li className="list-disc leading-relaxed"><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li className="list-disc leading-relaxed"><strong>Droit à l'effacement</strong> : demander la suppression de vos données (sauf obligation légale)</li>
            <li className="list-disc leading-relaxed"><strong>Droit d'opposition</strong> : vous opposer à un traitement</li>
            <li className="list-disc leading-relaxed"><strong>Droit à la portabilité</strong> : recevoir vos données dans un format lisible</li>
            <li className="list-disc leading-relaxed"><strong>Droit de retrait du consentement</strong> : retirer votre consentement aux cookies analytics à tout moment</li>
          </ul>
          <p className="mt-4 leading-relaxed text-[#374151]">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a href="mailto:contact@powerbug.fr" className="text-[#356B0D] hover:underline">
              contact@powerbug.fr
            </a>
            . Nous répondrons dans un délai maximum de 30 jours.
          </p>
          <p className="mt-3 leading-relaxed text-[#374151]">
            En cas de litige non résolu, vous pouvez saisir la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B0D] hover:underline"
            >
              CNIL
            </a>{" "}
            (Commission Nationale de l'Informatique et des Libertés).
          </p>
        </section>

        {/* 6. Cookies */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">6. Gestion des cookies</h2>
          <p className="mb-3 leading-relaxed text-[#374151]">
            Lors de votre première visite, une bannière vous demande votre consentement pour les cookies d'audience (Google Analytics). Vous pouvez :
          </p>
          <ul className="space-y-2 pl-5 text-[#374151]">
            <li className="list-disc leading-relaxed">Accepter ou refuser via la bannière</li>
            <li className="list-disc leading-relaxed">Retirer votre consentement à tout moment en effaçant le cookie <code className="rounded bg-[#F5F5F5] px-1 text-xs">cookie_consent</code> dans votre navigateur</li>
            <li className="list-disc leading-relaxed">Configurer votre navigateur pour bloquer tous les cookies (certaines fonctionnalités peuvent ne plus fonctionner)</li>
          </ul>
        </section>

        {/* 7. Sécurité */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">7. Sécurité</h2>
          <p className="leading-relaxed text-[#374151]">
            Le site powerbug.fr utilise le protocole HTTPS (TLS) pour chiffrer toutes les communications. Les mots de passe sont hashés (bcrypt). L'accès aux données est restreint aux seules personnes habilitées.
          </p>
        </section>

        {/* Liens */}
        <div className="mt-8 flex flex-wrap gap-4 border-t border-[#DBDBDB] pt-8 text-sm">
          <Link href="/mentions-legales" className="text-[#356B0D] hover:underline">Mentions légales</Link>
          <Link href="/cgv" className="text-[#356B0D] hover:underline">CGV</Link>
          <Link href="/contact" className="text-[#356B0D] hover:underline">Contact</Link>
        </div>
      </div>
    </main>
  );
}
