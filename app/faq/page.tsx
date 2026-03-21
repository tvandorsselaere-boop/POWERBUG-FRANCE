import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - PowerBug France",
  description:
    "Questions fréquentes sur les chariots de golf électriques PowerBug : autonomie, garantie, livraison, SAV, accessoires.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "Quelle est la difference entre le NX et le NX DHC ?",
    answer:
      "Le NX Lithium (899\u00A0\u20AC) est le modele essentiel avec toutes les fonctionnalites dont vous avez besoin sur le parcours : systeme de pliage VRAP, batterie lithium 36 trous, moteurs silencieux et station d\u2019accessoires integree. Le NX DHC Lithium (999\u00A0\u20AC) ajoute le Downhill Control (DHC), un systeme electronique de controle en descente qui ralentit automatiquement le chariot dans les pentes, ainsi qu\u2019un frein parking pour plus de securite sur les terrains vallonnes.",
  },
  {
    question: "Quelle est l\u2019autonomie de la batterie ?",
    answer:
      "La batterie lithium PowerBug offre une autonomie de 36 trous, soit 2 tours complets sans recharge. Elle se recharge completement en quelques heures avec le chargeur fourni. La batterie est legere et compacte, concue pour durer dans le temps.",
  },
  {
    question: "Comment plier le chariot ?",
    answer:
      "Le systeme de pliage VRAP (brevetee PowerBug) permet de plier le chariot en quelques secondes sans effort. Le chariot plie se range facilement dans un coffre de voiture. Aucun outil n\u2019est necessaire, le mecanisme est intuitif des la premiere utilisation.",
  },
  {
    question: "Livrez-vous dans toute la France ?",
    answer:
      "Nous livrons en France metropolitaine (hors Corse, Monaco, Ile de Re et Ile d'Oleron). Chariots : livraison DPD a domicile 14,90\u00A0\u20AC. Accessoires et pieces : livraison DPD Relais 3,90\u00A0\u20AC en point relais (plus de 5 000 commerces de proximite). Vous recevez un numero de suivi par email des l\u2019expedition.",
  },
  {
    question: "Quelle est la garantie ?",
    answer:
      "PowerBug offre une garantie constructeur de 2 ans couvrant le chariot et la batterie. Cette garantie couvre les defauts de fabrication et de materiaux dans des conditions d\u2019utilisation normales. Vous beneficiez egalement des garanties legales (conformite et vices caches) prevues par le Code de la consommation et le Code civil. Le SAV est gere en France par Golf des Marques.",
  },
  {
    question: "Comment commander des accessoires ?",
    answer:
      "Vous pouvez consulter tous nos accessoires disponibles sur la page Accessoires du site. Pour toute question ou commande specifique, contactez-nous par email a contact@powerbug.fr ou par telephone au 07 88 23 97 84.",
  },
  {
    question: "Puis-je retourner mon chariot ?",
    answer:
      "Oui, vous disposez d\u2019un delai de retractation de 14 jours a compter de la reception de votre commande, conformement a la legislation francaise. Le produit doit etre retourne dans son emballage d\u2019origine, non utilise et en parfait etat. Contactez-nous a contact@powerbug.fr pour initier une demande de retour.",
  },
  {
    question: "Comment contacter le SAV ?",
    answer:
      "Notre service apres-vente est gere en France par Golf des Marques. Vous pouvez nous joindre par email a contact@powerbug.fr ou par telephone au 07 88 23 97 84. Nous repondons a toutes les demandes sous 24h ouvrees. Pour les demandes de garantie, munissez-vous de votre numero de commande et d\u2019une description du probleme (photos ou video si possible).",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les paiements par carte bancaire (Visa, Mastercard, American Express), Apple Pay et Google Pay. Tous les paiements sont securises par Stripe. Vos informations bancaires ne sont jamais stockees sur nos serveurs.",
  },
  {
    question: "Les accessoires sont-ils compatibles avec tous les modeles NX ?",
    answer:
      "Oui, tous les accessoires PowerBug (porte-parapluie, support boisson, siege, housse de transport, etc.) sont compatibles avec le NX Lithium et le NX DHC Lithium. Ils se fixent sur la station d\u2019accessoires integree au guidon du chariot.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">FAQ</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Questions frequentes
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-[#6B7280]">
        Retrouvez les reponses aux questions les plus posees sur les chariots
        de golf electriques PowerBug, la livraison, la garantie et le SAV.
      </p>

      {/* FAQ list */}
      <div className="mt-12 divide-y divide-[#DBDBDB]">
        {faqs.map((faq, index) => (
          <div key={index} className="py-8 first:pt-0 last:pb-0">
            <h2 className="text-lg font-bold text-[#0F0F10]">
              {faq.question}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6B7280]">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-[#0F0F10]">
          Vous ne trouvez pas la reponse a votre question ?
        </h2>
        <p className="mt-3 max-w-xl text-[#6B7280]">
          Contactez-nous directement, nous vous repondons sous 24h ouvrees.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
          <a
            href="mailto:contact@powerbug.fr"
            className="font-medium text-[#356B0D] hover:underline"
          >
            contact@powerbug.fr
          </a>
          <a
            href="tel:+33788239784"
            className="font-medium text-[#356B0D] hover:underline"
          >
            07 88 23 97 84
          </a>
          <Link
            href="/contact"
            className="font-medium text-[#356B0D] hover:underline"
          >
            Formulaire de contact &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
