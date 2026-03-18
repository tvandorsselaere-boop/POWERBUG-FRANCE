"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que PowerBug ?",
    answer:
      "PowerBug est la marque britannique de référence dans les chariots électriques de golf, fondée en 2003. Avec plus de 20 ans d'expérience, PowerBug conçoit des chariots lithium haut de gamme utilisés dans plus de 30 pays. En France, PowerBug.fr est le distributeur exclusif officiel, garantissant un service après-vente réactif et des pièces détachées disponibles localement.",
  },
  {
    question: "Quelle est la différence entre le NX Lithium et le NX DHC Lithium ?",
    answer:
      "Les deux modèles partagent la même base technique : système d'alimentation 28V, batterie lithium 36 trous, pliage VRAP ultra-compact et moteur brushless silencieux. La différence clé du NX DHC Lithium est le système Downhill Control (DHC), qui régule automatiquement la vitesse en descente, couplé à un frein parking électronique. Idéal pour les parcours vallonnés ou les golfeurs qui veulent un contrôle total dans toutes les conditions.",
  },
  {
    question: "Comment se passe la livraison en France ?",
    answer:
      "Nous livrons partout en France métropolitaine via DPD. Votre chariot est expédié dans un emballage sécurisé avec suivi en temps réel. Le délai moyen est de 2 à 4 jours ouvrés après confirmation de commande. Vous recevez une notification par email et SMS avec le lien de suivi dès l'expédition.",
  },
  {
    question: "Quelle est la garantie sur les chariots PowerBug ?",
    answer:
      "Tous nos chariots bénéficient d'une garantie constructeur de 2 ans, batterie lithium comprise. En cas de problème, notre SAV basé en France prend en charge la réparation ou le remplacement rapide. Nous disposons également d'un stock de pièces détachées pour assurer la longévité de votre chariot bien au-delà de la période de garantie.",
  },
  {
    question: "Comment entretenir la batterie lithium de mon PowerBug ?",
    answer:
      "Pour maximiser la durée de vie de votre batterie lithium (estimée à 5–7 ans), rechargez-la après chaque utilisation, même partiellement déchargée. Stockez-la à température ambiante (entre 10 °C et 25 °C), à l'abri de l'humidité. Évitez la décharge complète et ne la laissez pas branchée sur le chargeur plusieurs jours consécutifs. En hiver, si le chariot est rangé plusieurs semaines, maintenez la batterie à 50 % de charge.",
  },
];

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#DBDBDB]">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#356B0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-[#0F0F10]">{item.question}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#DBDBDB] bg-white transition-colors group-hover:border-[#8DC63F]">
                {isOpen ? (
                  <Minus className="h-3.5 w-3.5 text-[#356B0D]" />
                ) : (
                  <Plus className="h-3.5 w-3.5 text-[#356B0D]" />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-[#6B7280]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
