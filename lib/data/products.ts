export type TrolleySpec = {
  label: string;
  nx: string;
  nxDhc: string;
  highlight?: boolean;
};

export const trolleySpecs: TrolleySpec[] = [
  { label: "Prix", nx: "899 EUR", nxDhc: "999 EUR" },
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

// -50% sur les accessoires avec l'achat d'un trolley (source: powerbug.eu)
export const ACCESSORY_DISCOUNT = 0.5;

export type Product = {
  slug: string;
  name: string;
  price: number;
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
    price: 899,
    badge: "Populaire",
    category: "trolley",
    description:
      "Qualite premium a un prix imbattable. Le choix intelligent pour votre prochain trolley.",
    longDescription:
      "Le PowerBug NX Lithium est le chariot electrique de nouvelle generation. Son systeme 28V offre une puissance fiable sur tous les terrains. Le pliage VRAP permet un rangement ultra-compact en quelques secondes. La roue avant anti-colmatage et les pneus hiver garantissent une performance toute l'annee. La station accessoires integree vous permet de personnaliser votre trolley selon vos besoins.",
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
    price: 999,
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

// Prix EUR source: powerbug.eu (screenshots mars 2026)
export const accessories: Product[] = [
  {
    slug: "range-finder",
    name: "PowerBug Range Finder",
    price: 149,
    category: "accessoire",
    description:
      "Telemetre laser avec compensation de pente, batterie rechargeable et zoom optique 6x.",
    longDescription:
      "Le telemetre PowerBug Range Finder combine precision, puissance et performance. Mode pente commutable, batterie rechargeable longue duree, vibration lock et zoom optique 6x. L'outil indispensable pour ameliorer votre jeu.",
    specs: [
      { label: "Zoom", value: "6x optique" },
      { label: "Batterie", value: "Rechargeable" },
      { label: "Mode pente", value: "Commutable" },
      { label: "Verrouillage", value: "Vibration lock" },
    ],
    features: [
      "Zoom optique 6x",
      "Compensation de pente commutable",
      "Batterie rechargeable",
      "Vibration lock technology",
      "Fixation magnetique",
    ],
  },
  {
    slug: "caddy-pack",
    name: "Caddy Pack",
    price: 39.99,
    category: "accessoire",
    description:
      "Sac de rangement compact pour vos accessoires de golf.",
    longDescription:
      "Le Caddy Pack PowerBug offre un espace de rangement pratique et accessible pour tous vos accessoires pendant la partie.",
    specs: [{ label: "Compatibilite", value: "Tous modeles PowerBug" }],
    features: [
      "Rangement pratique",
      "Installation rapide",
      "Compatible tous modeles PowerBug",
    ],
  },
  {
    slug: "mitaines-electriques",
    name: "NX Heated Mitt",
    price: 64.99,
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
    name: "Travel Cover",
    price: 44.99,
    category: "accessoire",
    description:
      "Housse de transport robuste pour proteger votre trolley en deplacement.",
    longDescription:
      "La housse de transport PowerBug protege votre trolley lors de vos deplacements. Tissu resistant, poignees renforcees, fermeture zip integrale.",
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
    name: "NX Umbrella Holder",
    price: 34.99,
    category: "accessoire",
    description:
      "Support pour parapluie, fixation solide sur le mat du trolley.",
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
    name: "Score Card Holder",
    price: 24.99,
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
    name: "Drink Holder",
    price: 14.99,
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
    slug: "support-gps",
    name: "NX GPS / Device Holder",
    price: 24.99,
    category: "accessoire",
    description:
      "Support universel pour GPS ou telephone, fixation sur le guidon du trolley.",
    longDescription:
      "Le support GPS/Device PowerBug se fixe sur le guidon de votre trolley pour garder votre GPS ou telephone a portee de vue pendant le jeu.",
    specs: [{ label: "Compatibilite", value: "GPS et smartphones" }],
    features: [
      "Fixation guidon universelle",
      "Compatible GPS et smartphones",
      "Orientation reglable",
    ],
  },
  {
    slug: "siege-rembourre",
    name: "Trolley Seat",
    price: 109,
    category: "accessoire",
    description:
      "Siege confortable, se fixe en un clic sur votre trolley PowerBug.",
    longDescription:
      "Le siege PowerBug vous offre un confort optimal entre chaque coup. Installation rapide sans outil, compatible avec tous les modeles PowerBug.",
    specs: [
      { label: "Compatibilite", value: "Tous modeles PowerBug" },
    ],
    features: [
      "Fixation rapide sans outil",
      "Compatible tous modeles PowerBug",
    ],
  },
  {
    slug: "umbrella-holder-extension",
    name: "Umbrella Holder Extension",
    price: 24.99,
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
];

// Prix EUR source: powerbug.eu (screenshots mars 2026)
export const batteries: Product[] = [
  {
    slug: "batterie-nx-lithium",
    name: "NX Lithium Battery & Charger",
    price: 299,
    category: "batterie",
    description:
      "Batterie lithium NX de remplacement avec chargeur, 36 trous d'autonomie.",
    longDescription:
      "Batterie lithium NX officielle PowerBug avec chargeur inclus. 36 trous d'autonomie pour 2 tours complets. Compatible NX et NX DHC.",
    specs: [
      { label: "Autonomie", value: "36 trous" },
      { label: "Technologie", value: "Lithium" },
      { label: "Chargeur", value: "Inclus" },
      { label: "Compatibilite", value: "NX et NX DHC" },
    ],
    features: [
      "36 trous d'autonomie",
      "Chargeur inclus",
      "Technologie lithium legere",
      "Compatible NX et NX DHC",
    ],
  },
  {
    slug: "batterie-universelle",
    name: "Universal Lithium Battery & Charger",
    price: 210,
    category: "batterie",
    description:
      "Batterie lithium universelle de remplacement avec chargeur.",
    longDescription:
      "Batterie lithium universelle officielle PowerBug avec chargeur inclus. Compatible avec les anciens modeles PowerBug.",
    specs: [
      { label: "Technologie", value: "Lithium" },
      { label: "Chargeur", value: "Inclus" },
      { label: "Compatibilite", value: "Modeles PowerBug universels" },
    ],
    features: [
      "Chargeur inclus",
      "Technologie lithium",
      "Compatible modeles universels",
    ],
  },
  {
    slug: "chargeur-mini-lithium",
    name: "Mini Lithium Battery Charger",
    price: 55.98,
    category: "batterie",
    description: "Chargeur pour batterie Mini Lithium PowerBug.",
    longDescription:
      "Chargeur officiel de remplacement pour batteries Mini Lithium PowerBug.",
    specs: [
      { label: "Compatibilite", value: "Batteries Mini Lithium PowerBug" },
      { label: "Tension", value: "Standard EU" },
    ],
    features: [
      "Chargeur officiel",
      "Charge rapide",
      "Prise standard EU",
    ],
  },
  {
    slug: "extended-battery-lead",
    name: "Extended Battery Lead Set",
    price: 14.99,
    category: "batterie",
    description: "Jeu de cables rallonges pour batterie PowerBug.",
    longDescription:
      "Cables rallonges officiels pour batterie PowerBug. Permet une installation plus flexible de la batterie.",
    specs: [{ label: "Compatibilite", value: "Batteries PowerBug" }],
    features: ["Cables officiels", "Installation flexible"],
  },
];

export const allProducts = [...trolleys, ...accessories, ...batteries];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}
