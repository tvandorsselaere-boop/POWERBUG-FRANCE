import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente - PowerBug France",
  description:
    "Conditions Générales de Vente du site powerbug.fr — PRO GOLF DISTRIBUTION, distributeur exclusif PowerBug en France.",
};

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Conditions Générales de Vente</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Conditions Générales de Vente
      </h1>
      <p className="mt-3 text-sm text-[#6B7280]">
        Dernière mise à jour : 14 mars 2026
      </p>

      <div className="mt-10 space-y-10 text-[#0F0F10]">
        {/* Article 1 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 1 — Objet
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les présentes Conditions Générales de Vente (CGV) régissent
            l&apos;ensemble des ventes de produits effectuées sur le site{" "}
            <Link href="https://www.powerbug.fr" className="text-[#356B0D] underline">
              www.powerbug.fr
            </Link>{" "}
            (ci-après « le Site »), édité par la société PRO GOLF DISTRIBUTION.
            Toute commande passée sur le Site implique l&apos;acceptation sans
            réserve des présentes CGV par le client.
          </p>
        </section>

        {/* Article 2 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 2 — Identité du vendeur
          </h2>
          <div className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            <p>
              <strong className="text-[#0F0F10]">Raison sociale :</strong> PRO
              GOLF DISTRIBUTION
            </p>
            <p>
              <strong className="text-[#0F0F10]">Forme juridique :</strong> SAS
              (Société par Actions Simplifiée)
            </p>
            <p>
              <strong className="text-[#0F0F10]">SIREN :</strong> 888 311 610 —
              RCS Aix-en-Provence
            </p>
            <p>
              <strong className="text-[#0F0F10]">Siège social :</strong>{" "}
              Domaine de Riquetti, 13290 Aix-en-Provence
            </p>
            <p>
              <strong className="text-[#0F0F10]">Dirigeant :</strong> Frédéric
              Pensu
            </p>
            <p>
              <strong className="text-[#0F0F10]">Email :</strong>{" "}
              <a
                href="mailto:contact@progolfdistribution.com"
                className="text-[#356B0D] underline"
              >
                contact@progolfdistribution.com
              </a>
            </p>
            <p>
              <strong className="text-[#0F0F10]">Téléphone :</strong>{" "}
              <a
                href="tel:+33967876795"
                className="text-[#356B0D] underline"
              >
                09 67 87 67 95
              </a>
            </p>
          </div>
        </section>

        {/* Article 3 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 3 — Produits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le Site propose à la vente des chariots de golf électriques
            (chariots electriques), accessoires, batteries et pièces détachées de la marque
            PowerBug. Les produits sont décrits et présentés avec la plus grande
            exactitude possible. Les photographies des produits ne sont pas
            contractuelles. En cas d&apos;erreur manifeste entre les
            caractéristiques du produit et sa représentation, PRO GOLF
            DISTRIBUTION ne saurait voir sa responsabilité engagée.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Les produits sont proposés dans la limite des stocks disponibles.
            En cas d&apos;indisponibilité d&apos;un produit après passation de
            la commande, le client en sera informé dans les meilleurs délais
            et pourra choisir entre l&apos;annulation de sa commande et son
            remboursement intégral, ou l&apos;attente du réassort.
          </p>
        </section>

        {/* Article 4 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 4 — Prix
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les prix des produits sont indiqués en euros (€) toutes taxes
            comprises (TTC). Les frais de livraison ne sont pas inclus dans le
            prix des produits et sont indiqués avant la validation de la
            commande. PRO GOLF DISTRIBUTION se réserve le droit de modifier ses
            prix à tout moment. Les produits seront facturés sur la base des
            tarifs en vigueur au moment de la validation de la commande.
          </p>
        </section>

        {/* Article 5 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 5 — Commande
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le client sélectionne les produits de son choix et les ajoute à son
            panier. Il peut à tout moment consulter le contenu de son panier,
            modifier les quantités ou supprimer des articles. Après validation
            du panier et renseignement de ses coordonnées de livraison, le
            client procède au paiement. La commande est définitivement validée
            après confirmation du paiement. Un email de confirmation de commande
            est envoyé au client à l&apos;adresse email indiquée.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            PRO GOLF DISTRIBUTION se réserve le droit de refuser ou
            d&apos;annuler toute commande en cas de litige existant avec le
            client, de non-paiement d&apos;une commande antérieure, ou de
            suspicion de fraude.
          </p>
        </section>

        {/* Article 6 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 6 — Paiement
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Le paiement s&apos;effectue en ligne via la plateforme sécurisée
            Stripe. Les moyens de paiement acceptés sont :
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>Carte bancaire (Visa, Mastercard, American Express)</li>
            <li>Apple Pay</li>
            <li>Google Pay</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le paiement est débité au moment de la validation de la commande.
            Les transactions sont sécurisées par Stripe et les données bancaires
            du client ne sont jamais stockées sur nos serveurs.
          </p>
        </section>

        {/* Article 7 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 7 — Livraison
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les produits sont livrés exclusivement en France métropolitaine
            (hors DOM-TOM, Corse non garantie). La livraison est assurée par
            DPD.
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#6B7280]">
            <li>
              <strong className="text-[#0F0F10]">Frais de livraison :</strong>{" "}
              14,90 € TTC pour les chariots (DPD domicile) — 3,90 € TTC pour les accessoires et pièces (DPD Relais)
            </li>
            <li>
              <strong className="text-[#0F0F10]">Délai de livraison :</strong>{" "}
              3 à 5 jours ouvrés après expédition
            </li>
            <li>
              <strong className="text-[#0F0F10]">Suivi :</strong> Un numéro de
              tracking est envoyé par email dès l&apos;expédition du colis
            </li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Les délais de livraison sont donnés à titre indicatif. Un retard de
            livraison ne peut donner lieu à aucun dommage et intérêt, retenue ou
            annulation de commande, sauf si le dépassement excède 30 jours
            (article L216-2 du Code de la consommation).
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le client est tenu de vérifier l&apos;état du colis à la réception.
            En cas de dommage constaté, le client doit émettre des réserves
            auprès du transporteur et contacter PRO GOLF DISTRIBUTION dans les
            48 heures suivant la livraison.
          </p>
        </section>

        {/* Article 8 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 8 — Droit de rétractation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Conformément à l&apos;article L221-18 du Code de la consommation,
            le client dispose d&apos;un délai de{" "}
            <strong className="text-[#0F0F10]">14 jours</strong> à compter de
            la réception du produit pour exercer son droit de rétractation, sans
            avoir à justifier de motif ni à payer de pénalité.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Pour exercer ce droit, le client doit notifier sa décision par email
            à{" "}
            <a
              href="mailto:contact@progolfdistribution.com"
              className="text-[#356B0D] underline"
            >
              contact@progolfdistribution.com
            </a>{" "}
            ou par téléphone au{" "}
            <a href="tel:+33967876795" className="text-[#356B0D] underline">
              09 67 87 67 95
            </a>
            .
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le produit doit être retourné dans son emballage d&apos;origine, en
            parfait état, non utilisé et complet (accessoires, notices, etc.).
            Les frais de retour sont à la charge du client. Le remboursement
            sera effectué dans un délai maximum de 14 jours suivant la
            réception du produit retourné, par le même moyen de paiement que
            celui utilisé pour la commande.
          </p>
        </section>

        {/* Article 9 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 9 — Garantie légale
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Tous les produits vendus sur le Site bénéficient de la garantie
            légale de conformité (articles L217-4 à L217-14 du Code de la
            consommation) et de la garantie contre les vices cachés (articles
            1641 à 1649 du Code civil).
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            <strong className="text-[#0F0F10]">
              Garantie légale de conformité :
            </strong>{" "}
            Le client dispose d&apos;un délai de 2 ans à compter de la
            délivrance du bien pour agir. Il peut choisir entre la réparation ou
            le remplacement du bien, sous réserve des conditions de coût
            prévues par l&apos;article L217-9 du Code de la consommation.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            <strong className="text-[#0F0F10]">
              Garantie contre les vices cachés :
            </strong>{" "}
            Le client peut décider de rendre le produit et de se faire
            restituer le prix, ou de garder le produit et de se faire rendre une
            partie du prix, conformément à l&apos;article 1644 du Code civil.
            Cette action doit être intentée dans les 2 ans suivant la
            découverte du vice.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            En complément, les chariots PowerBug bénéficient d&apos;une{" "}
            <strong className="text-[#0F0F10]">
              garantie constructeur de 2 ans
            </strong>
            . Pour toute demande de garantie, veuillez contacter notre service
            client.
          </p>
        </section>

        {/* Article 10 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 10 — Responsabilité
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            PRO GOLF DISTRIBUTION ne saurait être tenue responsable de
            l&apos;inexécution du contrat en cas de force majeure, de
            perturbation ou de grève totale ou partielle des services postaux et
            moyens de transport, d&apos;inondation ou d&apos;incendie. PRO GOLF
            DISTRIBUTION ne saurait être tenue pour responsable des dommages
            résultant d&apos;une mauvaise utilisation du produit acheté.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            La responsabilité de PRO GOLF DISTRIBUTION est en tout état de cause
            limitée au montant de la commande.
          </p>
        </section>

        {/* Article 11 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 11 — Données personnelles
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les informations collectées lors de la commande sont nécessaires au
            traitement de celle-ci et à la gestion de la relation commerciale.
            Elles sont traitées conformément au Règlement Général sur la
            Protection des Données (RGPD) et à la loi Informatique et Libertés
            du 6 janvier 1978 modifiée.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Le client dispose d&apos;un droit d&apos;accès, de rectification, de
            suppression et de portabilité de ses données personnelles, ainsi que
            d&apos;un droit d&apos;opposition et de limitation du traitement. Ces
            droits peuvent être exercés en contactant PRO GOLF DISTRIBUTION à
            l&apos;adresse{" "}
            <a
              href="mailto:contact@progolfdistribution.com"
              className="text-[#356B0D] underline"
            >
              contact@progolfdistribution.com
            </a>
            .
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Pour plus d&apos;informations, consultez notre page{" "}
            <Link
              href="/mentions-legales"
              className="text-[#356B0D] underline"
            >
              Mentions légales
            </Link>
            .
          </p>
        </section>

        {/* Article 12 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 12 — Propriété intellectuelle
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            L&apos;ensemble des éléments du Site (textes, images, logos,
            vidéos, graphismes, icônes, etc.) est protégé par les lois
            relatives à la propriété intellectuelle. Toute reproduction,
            représentation, modification ou exploitation, même partielle, du
            contenu du Site est strictement interdite sans l&apos;autorisation
            écrite préalable de PRO GOLF DISTRIBUTION.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            La marque PowerBug et son logo sont la propriété de PowerBug Ltd
            (Royaume-Uni). Leur utilisation sur le Site est autorisée dans le
            cadre du contrat de distribution exclusive.
          </p>
        </section>

        {/* Article 13 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 13 — Médiation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Conformément aux articles L611-1 et suivants du Code de la
            consommation, le client a le droit de recourir gratuitement à un
            médiateur de la consommation en vue de la résolution amiable de tout
            litige. Le client peut également déposer sa réclamation sur la
            plateforme européenne de règlement en ligne des litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#356B0D] underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>

        {/* Article 14 */}
        <section>
          <h2 className="text-xl font-semibold text-[#0F0F10]">
            Article 14 — Droit applicable et litiges
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
            Les présentes CGV sont soumises au droit français. En cas de litige,
            une solution amiable sera recherchée avant toute action judiciaire.
            À défaut de résolution amiable, les tribunaux compétents
            d&apos;Aix-en-Provence seront seuls compétents pour trancher le
            litige.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-6">
          <h2 className="text-lg font-semibold text-[#0F0F10]">
            Une question sur nos CGV ?
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Contactez-nous par email à{" "}
            <a
              href="mailto:contact@progolfdistribution.com"
              className="text-[#356B0D] underline"
            >
              contact@progolfdistribution.com
            </a>{" "}
            ou par téléphone au{" "}
            <a href="tel:+33967876795" className="text-[#356B0D] underline">
              09 67 87 67 95
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
