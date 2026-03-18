export default function AdminAidePage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="bg-[#0F0F10] text-white rounded-2xl p-8 mb-8 text-center">
        <p className="text-2xl font-bold tracking-wide">
          POWER<span className="text-[#8DC63F]">BUG</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">France — Distributeur exclusif</p>
        <h1 className="text-lg font-semibold mt-4">Guide Admin</h1>
        <p className="text-xs text-gray-500 mt-2">Mis a jour — Mars 2026</p>
      </div>

      {/* 1. A quoi sert l'admin */}
      <Section title="1. A quoi sert l'admin ?">
        <p>
          L&apos;espace admin te permet de gerer les commandes, le stock et de surveiller
          l&apos;activite du site. Tu n&apos;as pas besoin de toucher a Stripe, Supabase ou
          quoi que ce soit de technique.
        </p>
        <InfoBox color="green">
          <strong>Ce que tu peux faire</strong>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li><b>Dashboard</b> — voir en un coup d&apos;oeil ce qu&apos;il y a a faire (commandes en attente de tracking, etat du stock)</li>
            <li><b>Commandes</b> — changer le statut, ajouter le tracking DPD, notifier le client — directement depuis la liste sans ouvrir chaque commande</li>
            <li><b>Stock</b> — modifier les quantites, marquer un produit en rupture en 1 clic</li>
            <li><b>Renvoyer le bon de preparation</b> — si Golf des Marques n&apos;a pas recu l&apos;email</li>
          </ul>
        </InfoBox>
        <InfoBox color="blue">
          <strong>Acces a l&apos;admin</strong>
          Quand tu es connecte avec ton compte admin, un lien &quot;Administration&quot; apparait
          automatiquement dans le menu utilisateur (en haut a droite). Tu n&apos;as pas besoin
          de taper l&apos;URL.
        </InfoBox>
      </Section>

      {/* 2. Types de livraison */}
      <Section title="2. Les 2 types de livraison DPD">
        <p>
          Le site choisit automatiquement le type de livraison selon le contenu du panier :
        </p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Prix</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Quand</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Badge admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2 font-medium">DPD Domicile</td>
                <td className="px-3 py-2">14,90 &euro;</td>
                <td className="px-3 py-2">Commande contient un chariot (NX ou NX DHC)</td>
                <td className="px-3 py-2"><span className="inline-block rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-medium">Domicile</span></td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">DPD Relais Pickup</td>
                <td className="px-3 py-2">3,90 &euro;</td>
                <td className="px-3 py-2">Commande accessoires/pieces uniquement (pas de chariot)</td>
                <td className="px-3 py-2"><span className="inline-block rounded-full bg-violet-100 text-violet-800 px-2 py-0.5 text-xs font-medium">Relais</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <InfoBox color="blue">
          <strong>Pour Golf des Marques</strong>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li><b>DPD Domicile</b> : creer une etiquette DPD classique a l&apos;adresse du client</li>
            <li><b>DPD Relais</b> : creer une etiquette DPD Pickup — choisir le relais le plus proche de l&apos;adresse du client. Le bon de preparation indique l&apos;adresse du client pour vous aider a choisir.</li>
          </ul>
        </InfoBox>
      </Section>

      {/* 3. Flow commande */}
      <Section title="3. Le flow complet d'une commande">
        <p>
          Voici ce qui se passe de A a Z quand un client passe commande.
          Les etapes vertes sont <b>100% automatiques</b>, la violette est ta seule action.
        </p>
        <div className="flex flex-wrap gap-4 my-4 text-xs">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#8DC63F]" /> Automatique</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-purple-500" /> Action manuelle</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue-500" /> Email envoye</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 divide-y divide-dashed divide-gray-200">
          <FlowStep num={1} auto label="Le client passe commande et paie" tag="auto">
            Le client ajoute ses produits au panier, va au checkout, et paie par carte (Visa, Mastercard, Apple Pay, Google Pay) via Stripe.
          </FlowStep>
          <FlowStep num={2} auto label="La commande est enregistree" tag="auto">
            La commande est enregistree en base de donnees avec tous les details (client, adresse, produits, montant).
          </FlowStep>
          <FlowStep num={3} auto label="Email de confirmation → client" tag="email">
            Le client recoit un email de confirmation avec le recapitulatif de sa commande.
          </FlowStep>
          <FlowStep num={4} auto label="Bon de preparation → Golf des Marques" tag="email">
            Un email est envoye <b>immediatement</b> a Golf des Marques avec la liste des articles a preparer et l&apos;adresse de livraison.
          </FlowStep>
          <FlowStep num={5} auto label="Golf des Marques prepare et expedie" tag="auto">
            Ils recoivent le bon, preparent le colis, creent l&apos;etiquette DPD, et t&apos;envoient le numero de tracking.
          </FlowStep>
          <FlowStep num={6} label="Tu saisis le tracking dans l'admin" tag="manual">
            Sur la page Commandes, entre le numero de tracking dans le champ et clique &quot;Marquer expediee&quot;. C&apos;est ta <b>seule action</b>.
          </FlowStep>
          <FlowStep num={7} auto label="Email d'expedition → client" tag="email">
            Le client recoit automatiquement un email avec son numero de suivi DPD.
          </FlowStep>
        </div>
        <InfoBox color="blue">
          <strong>En resume, tu n&apos;as qu&apos;une seule action a faire :</strong>{" "}
          saisir le numero de tracking dans l&apos;admin quand Golf des Marques te le donne. Tout le reste est 100% automatique.
        </InfoBox>
      </Section>

      {/* 4. Pages admin */}
      <Section title="4. Les pages de l'admin">
        <h3 className="text-base font-semibold mt-4 mb-2">4.1 — Dashboard</h3>
        <p>La page d&apos;accueil affiche les <b>actions urgentes</b> :</p>
        <ul className="ml-5 list-disc space-y-1 mb-3">
          <li><b>Nouvelles commandes</b> — a traiter (passer en preparation)</li>
          <li><b>En attente de tracking</b> — commandes preparees mais sans numero DPD</li>
          <li><b>Alertes stock</b> — produits en rupture ou stock faible</li>
          <li><b>Expeditions du jour</b> — ce qui a ete envoye aujourd&apos;hui</li>
        </ul>
        <p>Plus les stats : total commandes, CA du jour, CA du mois.</p>
        <p className="mt-2">Si tout est en ordre, un message vert &quot;Tout est en ordre&quot; s&apos;affiche.</p>

        <h3 className="text-base font-semibold mt-6 mb-2">4.2 — Commandes</h3>
        <p>Toutes les commandes avec des <b>filtres rapides</b> et des <b>actions directes</b> :</p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Couleur</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Ce que tu fais</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-3 py-2 font-medium">En attente tracking</td><td className="px-3 py-2 text-amber-700">● Orange</td><td className="px-3 py-2">Saisir le tracking + &quot;Marquer expediee&quot;</td></tr>
              <tr><td className="px-3 py-2 font-medium">Expediee</td><td className="px-3 py-2 text-purple-700">● Violet</td><td className="px-3 py-2">Lien suivi DPD (rien a faire)</td></tr>
              <tr><td className="px-3 py-2 font-medium">Livree</td><td className="px-3 py-2 text-green-700">● Vert</td><td className="px-3 py-2">—</td></tr>
              <tr><td className="px-3 py-2 font-medium">Annulee</td><td className="px-3 py-2 text-red-700">● Rouge</td><td className="px-3 py-2">—</td></tr>
            </tbody>
          </table>
        </div>
        <InfoBox color="green">
          <strong>Tout est direct</strong>
          Le bon de preparation part automatiquement a Golf des Marques au moment du paiement.
          Tu n&apos;as qu&apos;a saisir le tracking quand tu le recois. Les commandes sans tracking depuis 2+ jours s&apos;affichent en rouge.
        </InfoBox>

        <h3 className="text-base font-semibold mt-6 mb-2">4.3 — Stock</h3>
        <p>Le stock est <b>gere manuellement par toi</b>. Le site ne decremente pas automatiquement — c&apos;est toi qui mets a jour quand tu as l&apos;info de Golf des Marques.</p>
        <ul className="ml-5 list-disc space-y-1 mb-3">
          <li><b>En stock</b> (par defaut) — le client peut commander</li>
          <li><b>Stock faible</b> — mets un chiffre bas (ex: 2) pour te rappeler de checker avec Golf des Marques</li>
          <li><b>Rupture</b> (bouton 1 clic) — le site affiche &quot;Sur commande&quot; et le client ne peut pas commander</li>
          <li>Filtres : Tous / Rupture / Faible / OK</li>
        </ul>
        <InfoBox color="blue">
          <strong>Quand mettre a jour le stock ?</strong>
          Quand Golf des Marques te dit qu&apos;il reste peu d&apos;un produit, ou quand un produit est epuise. Tu n&apos;as pas besoin de le faire a chaque vente.
        </InfoBox>
      </Section>

      {/* 5. Emails */}
      <Section title="5. Les emails automatiques">
        <p>Le site envoie <b>3 types d&apos;emails</b>, tous automatiques :</p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Destinataire</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Quand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-3 py-2 font-medium">Confirmation commande</td><td className="px-3 py-2">Client</td><td className="px-3 py-2">Au paiement</td></tr>
              <tr><td className="px-3 py-2 font-medium">Bon de preparation</td><td className="px-3 py-2">Golf des Marques</td><td className="px-3 py-2">Au paiement (automatique)</td></tr>
              <tr><td className="px-3 py-2 font-medium">Notification expedition</td><td className="px-3 py-2">Client</td><td className="px-3 py-2">Quand tu ajoutes le tracking</td></tr>
            </tbody>
          </table>
        </div>
        <p>Tous envoyes depuis <b>commandes@powerbug.fr</b> avec le branding PowerBug.</p>
      </Section>

      {/* 6. Test */}
      <Section title="6. Comment tester (mode test Stripe)">
        <InfoBox color="amber">
          <strong>Mode test</strong>
          Le site est en mode test Stripe. Aucun vrai paiement ne sera debite. On utilise des cartes fictives.
        </InfoBox>
        <div className="space-y-3 mt-4">
          <TestStep num={1} title="Se connecter">
            Va sur <b>powerbug.fr/connexion</b>, connecte-toi avec ton email admin. Le lien &quot;Administration&quot; apparait dans le menu en haut a droite.
          </TestStep>
          <TestStep num={2} title="Passer une commande test">
            Ajoute un trolley au panier, va au checkout. Sur Stripe, utilise :<br />
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">4242 4242 4242 4242</code> — Date : future — CVC : 123
          </TestStep>
          <TestStep num={3} title="Verifier les emails">
            Apres le paiement, verifie ta boite : confirmation commande + bon de preparation. Si rien, verifie les spams.
          </TestStep>
          <TestStep num={4} title="Voir la commande dans l'admin">
            Va sur le Dashboard. Ta commande test apparait dans &quot;En attente tracking&quot;. Le bon de preparation a deja ete envoye automatiquement.
          </TestStep>
          <TestStep num={5} title="Ajouter un tracking">
            Dans la liste des commandes, saisis un numero test (ex: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">09981234567890</code>) et clique &quot;Marquer expediee&quot;. Le client recoit l&apos;email d&apos;expedition.
          </TestStep>
          <TestStep num={6} title="Tester le stock">
            Va sur Stock, modifie une quantite, teste le bouton &quot;Rupture&quot;. Verifie que le site affiche &quot;Sur commande&quot; sur la fiche produit.
          </TestStep>
        </div>
      </Section>

      {/* 7. Go-live */}
      <Section title="7. Pour la mise en production">
        <p>Quand on est prets a lancer, 3 choses a changer :</p>
        <div className="overflow-x-auto my-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Quoi</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Test</th>
                <th className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Production</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-3 py-2 font-medium">Cles Stripe</td><td className="px-3 py-2">Cles test de Tom</td><td className="px-3 py-2">Cles live de Fred</td></tr>
              <tr><td className="px-3 py-2 font-medium">Email Golf des Marques</td><td className="px-3 py-2">thomas@facile-ia.fr</td><td className="px-3 py-2">Email reel GdM</td></tr>
              <tr><td className="px-3 py-2 font-medium">Admins</td><td className="px-3 py-2">Tom + Fred</td><td className="px-3 py-2">Pareil</td></tr>
            </tbody>
          </table>
        </div>
        <InfoBox color="green">
          <strong>Aucune modification de code necessaire</strong>
          Tout est gere par des variables d&apos;environnement sur Vercel. On change les valeurs, on redeploie, c&apos;est en production.
        </InfoBox>
      </Section>

      {/* 8. FAQ */}
      <Section title="8. Questions frequentes">
        <FaqItem q="Golf des Marques n'a pas recu l'email de preparation ?">
          Dans la liste des commandes, clique &quot;Renvoyer bon preparation&quot; a cote de la commande concernee. L&apos;email est renvoye immediatement.
        </FaqItem>
        <FaqItem q="Je veux annuler une commande ?">
          Change le statut en &quot;Annulee&quot; dans le detail. Le remboursement se fait directement depuis le dashboard Stripe (dashboard.stripe.com).
        </FaqItem>
        <FaqItem q="Le stock est a 0 ?">
          Le produit reste visible mais affiche &quot;Sur commande&quot; au client. Le bouton d&apos;achat est desactive. Pour le remettre en vente, modifie la quantite dans la page Stock.
        </FaqItem>
        <FaqItem q="Qui a acces a l'admin ?">
          Uniquement les emails configures comme admin : <b>thomas@facile-ia.fr</b> et <b>fred@golfdesmarques.com</b>. Le lien apparait automatiquement dans le menu quand on est connecte avec un de ces comptes.
        </FaqItem>
        <FaqItem q="Comment modifier un prix ou ajouter un produit ?">
          Contacte Tom (thomas@facile-ia.fr). Les prix et produits sont geres dans la base de donnees, pas dans l&apos;admin pour l&apos;instant.
        </FaqItem>
      </Section>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
        <p><b>PowerBug France</b> — powerbug.fr</p>
        <p className="mt-1">Document prepare par Tom Van Dorsselaere (Facile-IA) — Mars 2026</p>
        <p className="mt-1">Des questions ? → thomas@facile-ia.fr</p>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-[#356B0D] border-b-2 border-[#8DC63F] pb-2 mb-4">{title}</h2>
      <div className="text-sm leading-relaxed text-[#0F0F10] space-y-3">{children}</div>
    </section>
  );
}

function InfoBox({ color, children }: { color: "green" | "blue" | "amber" | "red"; children: React.ReactNode }) {
  const styles = {
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
    amber: "bg-amber-50 border-amber-200",
    red: "bg-red-50 border-red-200",
  };
  return (
    <div className={`rounded-xl border p-4 text-sm ${styles[color]}`}>{children}</div>
  );
}

function FlowStep({ num, auto, label, tag, children }: { num: number; auto?: boolean; label: string; tag: "auto" | "manual" | "email"; children: React.ReactNode }) {
  const tagStyles = {
    auto: "bg-green-100 text-green-800",
    manual: "bg-purple-100 text-purple-800",
    email: "bg-blue-100 text-blue-800",
  };
  const tagLabels = { auto: "AUTO", manual: "MANUEL", email: "EMAIL" };
  return (
    <div className="flex gap-4 p-4">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${auto ? "bg-[#8DC63F]" : "bg-purple-500"}`}>
        {num}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm">
          {label}
          <span className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${tagStyles[tag]}`}>{tagLabels[tag]}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{children}</p>
      </div>
    </div>
  );
}

function TestStep({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F0F10] text-[#8DC63F] font-bold">
        {num}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{children}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold">{q}</h3>
      <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
  );
}
