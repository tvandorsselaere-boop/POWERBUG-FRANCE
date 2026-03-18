export type TrolleySpec = {
  label: string;
  nx: string;
  nxDhc: string;
  highlight?: boolean;
  compareNx?: string;
  compareNxDhc?: string;
};

export const trolleySpecs: TrolleySpec[] = [
  { label: "Prix", nx: "799 EUR", nxDhc: "899 EUR", compareNx: "899 EUR", compareNxDhc: "999 EUR" },
  { label: "Systeme", nx: "28V Power System", nxDhc: "28V Power System" },
  { label: "Batterie", nx: "Lithium 36 trous", nxDhc: "Lithium 36 trous" },
  { label: "Pliage", nx: "Compact VRAP", nxDhc: "Compact VRAP" },
  { label: "Roue avant", nx: "Anti-colmatage", nxDhc: "Anti-colmatage" },
  { label: "Pneus hiver", nx: "Oui", nxDhc: "Oui" },
  { label: "Station accessoires", nx: "Integree", nxDhc: "Integree" },
  {
    label: "Downhill Control (DHC)",
    nx: "Non",
    nxDhc: "Oui",
    highlight: true,
  },
  {
    label: "Frein parking electronique",
    nx: "Non",
    nxDhc: "Oui",
    highlight: true,
  },
  { label: "Garantie", nx: "2 ans", nxDhc: "2 ans" },
];

// Bundle offert : Score Card Holder (30€) + Umbrella Holder (30€) = 60€ (source: Fred, mars 2026 — aligné Golf des Marques)
export const ACCESSORY_DISCOUNT = 0; // Plus utilise — kept for type compatibility

export type Product = {
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  description: string;
  longDescription: string;
  specs: { label: string; value: string }[];
  features: string[];
  category: "trolley" | "accessoire" | "batterie";
  badge?: string;
};

export const trolleys: Product[] = [
  {
    slug: "nx-lithium",
    name: "PowerBug NX Lithium",
    price: 799,
    comparePrice: 899,
    badge: "Populaire",
    category: "trolley",
    description:
      "Qualite premium a un prix imbattable. Le choix intelligent pour votre prochain chariot.",
    longDescription:
      "Le PowerBug NX Lithium est le chariot electrique de nouvelle generation. Son systeme 28V offre une puissance fiable sur tous les terrains. Le pliage VRAP permet un rangement ultra-compact en quelques secondes. La roue avant anti-colmatage et les pneus hiver garantissent une performance toute l'annee. La station accessoires integree vous permet de personnaliser votre chariot selon vos besoins.",
    specs: [
      { label: "Systeme", value: "28V Power System" },
      { label: "Batterie", value: "Lithium 36 trous" },
      { label: "Pliage", value: "Compact VRAP" },
      { label: "Roue avant", value: "Anti-colmatage" },
      { label: "Pneus", value: "Winter-Ready" },
      { label: "Accessoires", value: "Station integree" },
      { label: "Garantie", value: "2 ans constructeur" },
    ],
    features: [
      "Systeme 28V Power System",
      "Batterie lithium 36 trous incluse",
      "Pliage VRAP ultra-compact",
      "Roue avant anti-colmatage",
      "Pneus hiver integres",
      "Station accessoires integree",
      "Garantie 2 ans constructeur",
    ],
  },
  {
    slug: "nx-dhc-lithium",
    name: "PowerBug NX DHC Lithium",
    price: 899,
    comparePrice: 999,
    badge: "Premium",
    category: "trolley",
    description:
      "Pour les golfeurs sur parcours vallonnes. Downhill Control (DHC) et frein parking electronique.",
    longDescription:
      "Le PowerBug NX DHC Lithium est le haut de gamme. Il integre toutes les fonctionnalites du NX avec en plus la technologie exclusive Downhill Control (DHC) qui freine automatiquement en descente, et un frein parking electronique pour une immobilisation parfaite. Ideal pour les parcours vallonnes et les terrains exigeants.",
    specs: [
      { label: "Systeme", value: "28V Power System" },
      { label: "Batterie", value: "Lithium 36 trous" },
      { label: "Pliage", value: "Compact VRAP" },
      { label: "DHC", value: "Downhill Control integre" },
      { label: "Frein parking", value: "Electronique" },
      { label: "Roue avant", value: "Anti-colmatage" },
      { label: "Pneus", value: "Winter-Ready" },
      { label: "Accessoires", value: "Station integree" },
      { label: "Garantie", value: "2 ans constructeur" },
    ],
    features: [
      "Downhill Control (DHC) : freinage automatique en descente",
      "Frein parking electronique",
      "Systeme 28V Power System",
      "Batterie lithium 36 trous incluse",
      "Pliage VRAP ultra-compact",
      "Roue avant anti-colmatage",
      "Pneus hiver integres",
      "Station accessoires integree",
      "Garantie 2 ans constructeur",
    ],
  },
];

// Prix EUR source: golfdesmarques.com (vérifié mars 2026 — alignement Fred)
export const accessories: Product[] = [
  {
    slug: "mitaines-electriques",
    name: "Mitaines chauffantes NX",
    price: 60,
    category: "accessoire",
    description:
      "Mitaines chauffantes alimentees par la batterie du trolley. Ideal pour l'hiver.",
    longDescription:
      "Les mitaines chauffantes NX PowerBug se branchent directement sur la batterie de votre trolley pour garder vos mains au chaud pendant les parties hivernales.",
    specs: [
      { label: "Alimentation", value: "Batterie trolley" },
      { label: "Taille", value: "Universelle" },
    ],
    features: [
      "Chauffage par batterie trolley",
      "Taille universelle",
      "Ideal pour le golf d'hiver",
    ],
  },
  {
    slug: "housse-transport",
    name: "Housse de transport NX",
    price: 40,
    category: "accessoire",
    description:
      "Housse de transport robuste pour proteger votre chariot en deplacement.",
    longDescription:
      "La housse de transport PowerBug protege votre chariot lors de vos deplacements. Tissu resistant, poignees renforcees, fermeture zip integrale.",
    specs: [
      { label: "Materiau", value: "Nylon resistant" },
      { label: "Fermeture", value: "Zip integrale" },
    ],
    features: [
      "Tissu nylon resistant",
      "Poignees renforcees",
      "Fermeture zip integrale",
    ],
  },
  {
    slug: "porte-parapluie",
    name: "Porte-parapluie NX",
    price: 30,
    category: "accessoire",
    description:
      "Support pour parapluie, fixation solide sur le mat du chariot.",
    longDescription:
      "Le porte-parapluie NX PowerBug maintient solidement votre parapluie pendant le jeu. Compatible avec tous les parapluies golf standard.",
    specs: [
      { label: "Compatibilite", value: "Tous modeles PowerBug NX" },
      { label: "Diametre max", value: "Parapluie golf standard" },
    ],
    features: [
      "Fixation universelle",
      "Maintien solide",
      "Installation en quelques secondes",
    ],
  },
  {
    slug: "scorecard-holder",
    name: "Porte-scorecard NX",
    price: 30,
    category: "accessoire",
    description:
      "Support pour carte de score avec protection transparente.",
    longDescription:
      "Gardez votre carte de score visible et protegee pendant toute la partie grace au porte-scorecard PowerBug.",
    specs: [{ label: "Compatibilite", value: "Tous modeles PowerBug" }],
    features: [
      "Protection transparente",
      "Acces facile pour ecrire",
      "Fixation rapide",
    ],
  },
  {
    slug: "drinks-holder",
    name: "Porte-gobelet NX",
    price: 20,
    category: "accessoire",
    description:
      "Porte-boisson pratique, maintien stable pendant toute la partie.",
    longDescription:
      "Le support boisson PowerBug maintient votre bouteille ou canette de maniere stable pendant toute la partie.",
    specs: [{ label: "Compatibilite", value: "Bouteilles et canettes standard" }],
    features: [
      "Maintien stable",
      "Compatible bouteilles et canettes",
      "Installation rapide",
    ],
  },
  {
    slug: "support-telephone",
    name: "Support telephone NX",
    price: 30,
    category: "accessoire",
    description:
      "Support universel pour telephone ou GPS, fixation sur le guidon du chariot.",
    longDescription:
      "Le support telephone NX PowerBug se fixe sur le guidon de votre chariot pour garder votre telephone ou GPS a portee de vue pendant le jeu.",
    specs: [{ label: "Compatibilite", value: "GPS et smartphones" }],
    features: [
      "Fixation guidon universelle",
      "Compatible GPS et smartphones",
      "Orientation reglable",
    ],
  },
  {
    slug: "umbrella-holder-extension",
    name: "Extension porte-parapluie NX",
    price: 25,
    category: "accessoire",
    description:
      "Extension pour porte-parapluie, augmente la hauteur de fixation.",
    longDescription:
      "L'extension porte-parapluie PowerBug permet d'augmenter la hauteur de fixation pour un meilleur maintien de votre parapluie.",
    specs: [{ label: "Compatibilite", value: "Porte-parapluie PowerBug" }],
    features: [
      "Extension de hauteur",
      "Compatible porte-parapluie PowerBug",
      "Installation rapide",
    ],
  },
  {
    slug: "sac-isotherme",
    name: "Sac isotherme NX",
    price: 40,
    category: "accessoire",
    description:
      "Sac isotherme pour maintenir vos boissons a temperature pendant tout le tour.",
    longDescription:
      "Le sac isotherme NX PowerBug combine hydratation et organisation pendant vos parcours. Fixation rapide sur le chariot, compartiments multiples.",
    specs: [{ label: "Compatibilite", value: "Chariots PowerBug NX" }],
    features: [
      "Maintien en temperature",
      "Compartiments multiples",
      "Fixation rapide sur chariot",
    ],
  },
  {
    slug: "sac-rangement",
    name: "Sac de rangement NX",
    price: 45,
    category: "accessoire",
    description:
      "Sac de rangement pour proteger et transporter votre chariot entre les sorties.",
    longDescription:
      "Le sac de rangement NX PowerBug protege votre chariot lors du stockage. Tissu resistant, fermeture integrale, poignees de transport.",
    specs: [{ label: "Compatibilite", value: "Chariots PowerBug NX" }],
    features: [
      "Protection complete du chariot",
      "Poignees de transport renforcees",
      "Fermeture integrale",
    ],
  },
];

// Pièces détachées (source: golfdesmarques.com/3847, vérifié mars 2026)
export const batteries: Product[] = [
  {
    slug: "chargeur-batterie",
    name: "Chargeur de batterie Lithium NX",
    price: 60,
    category: "batterie",
    description: "Chargeur officiel PowerBug pour recharger votre batterie Lithium NX en toute securite.",
    longDescription:
      "Le chargeur de batterie Lithium PowerBug est l'equipement officiel concu pour recharger votre batterie en toute securite. Compatible NX et NX DHC.",
    specs: [
      { label: "Compatibilite", value: "NX et NX DHC" },
      { label: "Tension", value: "Standard EU" },
    ],
    features: [
      "Chargeur officiel PowerBug",
      "Charge securisee",
      "Prise standard EU",
    ],
  },
  {
    slug: "roue-avant-complete",
    name: "Roue avant pour chariots NX",
    price: 50,
    category: "batterie",
    description: "Ensemble de roue avant officiel PowerBug, piece de rechange pour la longevite de votre chariot.",
    longDescription:
      "La roue avant officielle PowerBug garantit les meilleures performances sur tous les terrains. Compatible NX et NX DHC.",
    specs: [
      { label: "Compatibilite", value: "NX et NX DHC" },
    ],
    features: [
      "Piece officielle PowerBug",
      "Demontage sans outil",
      "Compatible NX et NX DHC",
    ],
  },
  {
    slug: "moteur-200w-nx",
    name: "Moteur 200W NX",
    price: 120,
    category: "batterie",
    description: "Moteur de remplacement 200W officiel pour chariot de golf PowerBug NX.",
    longDescription:
      "Le moteur de remplacement 200W pour chariot PowerBug NX est la piece officielle pour redonner une seconde jeunesse a votre equipement.",
    specs: [
      { label: "Puissance", value: "200W" },
      { label: "Compatibilite", value: "NX Lithium" },
    ],
    features: [
      "Piece officielle PowerBug",
      "200W de puissance",
      "Compatible NX Lithium",
    ],
  },
  {
    slug: "moteur-nx-dhc",
    name: "Moteur NX DHC",
    price: 150,
    category: "batterie",
    description: "Moteur de remplacement specifique aux chariots NX DHC avec Downhill Control.",
    longDescription:
      "Moteur officiel de remplacement pour les chariots NX DHC. Compatible avec le systeme Downhill Control (DHC).",
    specs: [
      { label: "Compatibilite", value: "NX DHC Lithium" },
      { label: "DHC", value: "Compatible" },
    ],
    features: [
      "Piece officielle PowerBug",
      "Compatible DHC",
      "Specifique NX DHC",
    ],
  },
];

export const allProducts = [...trolleys, ...accessories, ...batteries];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}
