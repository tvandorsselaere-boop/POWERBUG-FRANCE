export type FeatureDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  trolleys: ("nx" | "dhc" | "both")[];
  image?: string;
};

export const features: FeatureDetail[] = [
  {
    slug: "28v-power",
    title: "Systeme 28V Power",
    subtitle: "Puissance superieure sur tous les terrains",
    description:
      "Le systeme 28 volts offre une puissance superieure aux systemes 24V standard. Montees, pentes, fairways lourds apres la pluie : votre trolley avance sans effort et sans ralentir.",
    benefits: [
      "Puissance superieure aux systemes 24V",
      "Performances constantes en montee",
      "Adapte aux terrains lourds et humides",
      "Fiabilite eprouvee depuis 2003",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-6.jpg",
  },
  {
    slug: "pliage-vrap",
    title: "Pliage VRAP ultra-compact",
    subtitle: "Un seul geste, quelques secondes",
    description:
      "Le systeme brevete VRAP (Vertical Rapid Action Pack) permet de plier le trolley en un seul mouvement fluide. Le resultat : un encombrement minimal qui tient facilement dans n'importe quel coffre de voiture.",
    benefits: [
      "Pliage en quelques secondes",
      "Un seul geste suffit",
      "Encombrement minimal dans le coffre",
      "Pas d'outils necessaires",
    ],
    trolleys: ["both"],
    image: "/videos/nx-folding.mp4",
  },
  {
    slug: "roue-anti-colmatage",
    title: "Roue avant anti-colmatage",
    subtitle: "Performante en toutes saisons",
    description:
      "Le design exclusif de la roue avant empeche l'accumulation de boue, d'herbe et de debris. Votre trolley roule librement meme sur les terrains les plus boueux, avec un nettoyage minimal apres la partie.",
    benefits: [
      "Pas d'accumulation de boue ou d'herbe",
      "Roulement libre en toutes conditions",
      "Nettoyage rapide et facile",
      "Design exclusif PowerBug",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-26-Front-Wheel-Detail.jpg",
  },
  {
    slug: "nx-handle",
    title: "NX Handle — ecran + USB",
    subtitle: "Controle et connectivite",
    description:
      "La poignee NX integre un ecran digital pour controler la vitesse et un port USB pour charger votre telephone ou GPS pendant la partie. Tout est a portee de main.",
    benefits: [
      "Ecran digital de controle",
      "Port USB integre pour recharger vos appareils",
      "Reglage de vitesse intuitif",
      "Design ergonomique",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-18-Handle-Detail.jpg",
  },
  {
    slug: "pneus-winter-ready",
    title: "Pneus Winter-Ready",
    subtitle: "Jouez toute l'annee",
    description:
      "Les pneus inversibles avec profil crante offrent une adherence maximale sur terrain humide, boueux ou givre. Inversez simplement les pneus pour passer du mode ete au mode hiver.",
    benefits: [
      "Profil crante pour l'hiver",
      "Inversibles ete/hiver",
      "Adherence sur terrain humide et givre",
      "Pas besoin d'acheter des pneus supplementaires",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-52-Rear-Wheel-Detail.jpg",
  },
  {
    slug: "station-accessoires",
    title: "Station accessoires integree",
    subtitle: "Personnalisez votre trolley",
    description:
      "Le systeme de fixation universel permet d'ajouter tous les accessoires PowerBug en un clic : siege, porte-parapluie, GPS, porte-boisson et bien plus.",
    benefits: [
      "Fixation universelle en un clic",
      "Compatible tous accessoires PowerBug",
      "Ajout et retrait sans outils",
      "Large gamme d'accessoires disponibles",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-33-Folded-Wheels-Inverted.jpg",
  },
  {
    slug: "downhill-control",
    title: "Downhill Control (DHC)",
    subtitle: "Controle total en descente",
    description:
      "La technologie exclusive Downhill Control freine automatiquement le trolley en descente. Le trolley adapte sa vitesse a la pente pour un controle total sans effort. Indispensable pour les parcours vallonnes.",
    benefits: [
      "Freinage automatique en descente",
      "Adaptation automatique a la pente",
      "Securite maximale sur terrain vallonne",
      "Technologie exclusive PowerBug",
    ],
    trolleys: ["dhc"],
  },
  {
    slug: "frein-parking",
    title: "Frein parking electronique",
    subtitle: "Immobilisation instantanee",
    description:
      "Le frein parking electronique immobilise votre trolley sur simple pression d'un bouton. Votre trolley reste parfaitement stable sur les pentes les plus raides pendant que vous jouez.",
    benefits: [
      "Immobilisation instantanee",
      "Activation par simple pression",
      "Stable sur les pentes les plus raides",
      "Exclusif au modele NX DHC",
    ],
    trolleys: ["dhc"],
  },
  {
    slug: "batterie-lithium",
    title: "Batterie lithium 36 trous",
    subtitle: "Legere, puissante, durable",
    description:
      "La batterie lithium 28,8V ne pese que 1,5 kg et offre une autonomie de 36 trous, soit 2 tours complets sur une seule charge. Elle se loge dans un compartiment dedie integre au chassis, protegee des intemperies et des chocs. Duree de vie estimee : 5 a 7 ans avec un entretien standard.",
    benefits: [
      "1,5 kg seulement (contre 8-10 kg pour une batterie plomb)",
      "36 trous d'autonomie — 2 tours complets",
      "Duree de vie 5 a 7 ans",
      "Garantie constructeur 2 ans",
      "Chargeur officiel inclus avec le chariot",
    ],
    trolleys: ["both"],
    image: "/images/nx-battery-lithium.webp",
  },
  {
    slug: "vrap-distance-control",
    title: "Envoi a distance VRAP",
    subtitle: "Envoyez votre chariot en autonomie",
    description:
      "La fonction VRAP Distance Control permet d'envoyer votre chariot en ligne droite sur une distance predefinie. D'une simple pression sur le bouton, programmez la distance de deplacement : le chariot avance de maniere autonome et s'arrete automatiquement a la distance definie. Jusqu'a 50 yards (environ 45 metres) en 5 paliers de 10 yards.",
    benefits: [
      "Envoi autonome jusqu'a 50 yards (~45 m)",
      "5 distances predefinies (paliers de 10 yards)",
      "Arret automatique a la distance choisie",
      "Ideal pour envoyer le chariot vers le depart ou le green",
      "Gain de temps et d'energie sur chaque trou",
      "Integre de serie sur les deux modeles NX",
    ],
    trolleys: ["both"],
    image: "/images/lifestyle/NX-Lifestyle-18-Handle-Detail.jpg",
  },
];

export function getFeatureBySlug(slug: string) {
  return features.find((f) => f.slug === slug);
}
