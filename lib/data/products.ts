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
  { label: "Garantie", nx: "3 ans", nxDhc: "3 ans" },
];

// Accessoires offerts dans le bundle trolley
export const bundleAccessories = [
  "housse-transport",
  "drinks-holder",
  "porte-parapluie",
];

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
  inBundle?: boolean;
};

export const trolleys: Product[] = [
  {
    slug: "nx-lithium",
    name: "PowerBug NX Lithium",
    price: 899,
    badge: "Populaire",
    category: "trolley",
    description:
      "Le chariot electrique au rapport qualite-prix imbattable. Systeme 28V, batterie lithium 36 trous, pliage VRAP ultra-compact.",
    longDescription:
      "Le PowerBug NX Lithium est le chariot electrique parfait pour le golfeur exigeant. Son systeme 28V offre une puissance fiable sur tous les terrains. Le pliage VRAP permet un rangement ultra-compact en quelques secondes. La roue avant anti-colmatage et les pneus hiver garantissent une performance toute l'annee. La station accessoires integree vous permet de personnaliser votre trolley selon vos besoins.",
    specs: [
      { label: "Systeme", value: "28V Power System" },
      { label: "Batterie", value: "Lithium 36 trous" },
      { label: "Pliage", value: "Compact VRAP" },
      { label: "Roue avant", value: "Anti-colmatage" },
      { label: "Pneus", value: "Winter-Ready" },
      { label: "Accessoires", value: "Station integree" },
      { label: "Garantie", value: "3 ans" },
    ],
    features: [
      "Systeme 28V Power System",
      "Batterie lithium 36 trous incluse",
      "Pliage VRAP ultra-compact",
      "Roue avant anti-colmatage",
      "Pneus hiver integres",
      "Station accessoires integree",
      "Fiabilite best-in-class",
      "Garantie 3 ans France",
    ],
  },
  {
    slug: "nx-dhc-lithium",
    name: "PowerBug NX DHC Lithium",
    price: 999,
    badge: "Premium",
    category: "trolley",
    description:
      "Le haut de gamme avec Downhill Control et frein parking electronique. Tous les avantages du NX, plus le controle total en descente.",
    longDescription:
      "Le PowerBug NX DHC Lithium est le fleuron de la gamme. Il integre toutes les fonctionnalites du NX avec en plus la technologie exclusive Downhill Control (DHC) qui freine automatiquement en descente, et un frein parking electronique pour une immobilisation parfaite. Ideal pour les parcours vallonnes et les terrains exigeants.",
    specs: [
      { label: "Systeme", value: "28V Power System" },
      { label: "Batterie", value: "Lithium 36 trous" },
      { label: "Pliage", value: "Compact VRAP" },
      { label: "DHC", value: "Downhill Control integre" },
      { label: "Frein parking", value: "Electronique" },
      { label: "Roue avant", value: "Anti-colmatage" },
      { label: "Pneus", value: "Winter-Ready" },
      { label: "Accessoires", value: "Station integree" },
      { label: "Garantie", value: "3 ans" },
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
      "Garantie 3 ans France",
    ],
  },
];

export const accessories: Product[] = [
  {
    slug: "housse-transport",
    name: "Travel Cover",
    price: 24.99,
    category: "accessoire",
    inBundle: true,
    description:
      "Housse de transport robuste pour proteger votre trolley en deplacement.",
    longDescription:
      "La housse de transport PowerBug protege votre trolley lors de vos deplacements. Tissu resistant, poignees renforcees, fermeture zip integrale. Offerte avec l'achat d'un trolley.",
    specs: [
      { label: "Materiau", value: "Nylon resistant" },
      { label: "Fermeture", value: "Zip integrale" },
    ],
    features: [
      "Tissu nylon resistant",
      "Poignees renforcees",
      "Fermeture zip integrale",
      "Offerte avec un trolley",
    ],
  },
  {
    slug: "drinks-holder",
    name: "Drink Holder",
    price: 14.99,
    category: "accessoire",
    inBundle: true,
    description:
      "Porte-boisson pratique, maintien stable pendant toute la partie.",
    longDescription:
      "Le support boisson PowerBug maintient votre bouteille ou canette de maniere stable pendant toute la partie. Offert avec l'achat d'un trolley.",
    specs: [{ label: "Compatibilite", value: "Bouteilles et canettes standard" }],
    features: [
      "Maintien stable",
      "Compatible bouteilles et canettes",
      "Installation rapide",
      "Offert avec un trolley",
    ],
  },
  {
    slug: "porte-parapluie",
    name: "NX Umbrella Holder",
    price: 24.99,
    category: "accessoire",
    inBundle: true,
    description:
      "Support universel pour parapluie, fixation solide sur le mat du trolley.",
    longDescription:
      "Le porte-parapluie NX PowerBug maintient solidement votre parapluie pendant le jeu. Compatible avec tous les parapluies golf standard. Offert avec l'achat d'un trolley.",
    specs: [
      { label: "Compatibilite", value: "Tous modeles PowerBug" },
      { label: "Diametre max", value: "Parapluie golf standard" },
    ],
    features: [
      "Fixation universelle",
      "Maintien solide",
      "Installation en quelques secondes",
      "Offert avec un trolley",
    ],
  },
  {
    slug: "siege-rembourre",
    name: "Siege rembourre Deluxe",
    price: 39,
    category: "accessoire",
    description:
      "Siege confortable et rembourre, se fixe en un clic sur votre trolley PowerBug.",
    longDescription:
      "Le siege rembourre Deluxe PowerBug vous offre un confort optimal entre chaque coup. Installation rapide sans outil, compatible avec tous les modeles PowerBug.",
    specs: [
      { label: "Compatibilite", value: "Tous modeles PowerBug" },
      { label: "Materiau", value: "Mousse haute densite" },
    ],
    features: [
      "Rembourrage mousse haute densite",
      "Fixation rapide sans outil",
      "Compatible tous modeles PowerBug",
    ],
  },
  {
    slug: "scorecard-holder",
    name: "Porte-scorecard",
    price: 12,
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
    slug: "mitaines-electriques",
    name: "Mitaines electriques",
    price: 29,
    category: "accessoire",
    description:
      "Mitaines chauffantes alimentees par la batterie du trolley. Ideal pour l'hiver.",
    longDescription:
      "Les mitaines electriques PowerBug se branchent directement sur la batterie de votre trolley pour garder vos mains au chaud pendant les parties hivernales.",
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
    slug: "bag-extension",
    name: "Extension porte-sac",
    price: 29,
    category: "accessoire",
    description:
      "Extension pour adapter les sacs de golf oversize a votre trolley.",
    longDescription:
      "L'extension porte-sac PowerBug permet d'accueillir les sacs de golf les plus grands en toute stabilite sur votre trolley.",
    specs: [{ label: "Compatibilite", value: "Tous modeles PowerBug" }],
    features: [
      "Compatible sacs oversize",
      "Stabilite renforcee",
      "Installation rapide",
    ],
  },
  {
    slug: "roues-hiver",
    name: "Roues hiver Hedgehog",
    price: 39,
    category: "accessoire",
    description:
      "Paire de roues crantees pour une adherence maximale sur terrain humide ou givrant.",
    longDescription:
      "Les roues hiver Hedgehog offrent une adherence superieure sur les terrains humides, boueux ou givrants. Remplacement facile des roues standard.",
    specs: [
      { label: "Type", value: "Crantees Hedgehog" },
      { label: "Quantite", value: "Paire" },
    ],
    features: [
      "Adherence maximale terrain humide",
      "Profil Hedgehog crante",
      "Remplacement facile",
    ],
  },
  {
    slug: "range-finder",
    name: "Range Finder",
    price: 89,
    category: "accessoire",
    description:
      "Telemetre laser compact pour mesurer les distances avec precision.",
    longDescription:
      "Le telemetre PowerBug vous donne la distance exacte jusqu'au drapeau. Compact, leger et precis, c'est l'outil indispensable pour ameliorer votre jeu.",
    specs: [
      { label: "Portee", value: "Jusqu'a 400m" },
      { label: "Precision", value: "+/- 1m" },
    ],
    features: [
      "Mesure laser precise",
      "Portee jusqu'a 400m",
      "Compact et leger",
    ],
  },
  {
    slug: "support-gps",
    name: "Support GPS",
    price: 15,
    category: "accessoire",
    description:
      "Support universel pour GPS ou telephone, fixation sur le guidon du trolley.",
    longDescription:
      "Le support GPS PowerBug se fixe sur le guidon de votre trolley pour garder votre GPS ou telephone a portee de vue pendant le jeu.",
    specs: [{ label: "Compatibilite", value: "GPS et smartphones" }],
    features: [
      "Fixation guidon universelle",
      "Compatible GPS et smartphones",
      "Orientation reglable",
    ],
  },
];

export const batteries: Product[] = [
  {
    slug: "batterie-lithium-standard",
    name: "Standard Lithium Battery",
    price: 149,
    category: "batterie",
    description:
      "Batterie lithium standard de remplacement, 36 trous d'autonomie.",
    longDescription:
      "Batterie lithium de remplacement officielle PowerBug. 36 trous d'autonomie pour 2 tours complets. Compatible NX et NX DHC.",
    specs: [
      { label: "Autonomie", value: "36 trous" },
      { label: "Technologie", value: "Lithium" },
      { label: "Compatibilite", value: "NX et NX DHC" },
    ],
    features: [
      "36 trous d'autonomie",
      "Technologie lithium legere",
      "Compatible NX et NX DHC",
    ],
  },
  {
    slug: "batterie-lithium-mini",
    name: "Mini Lithium Battery",
    price: 119,
    category: "batterie",
    description: "Batterie lithium compacte de remplacement, format reduit.",
    longDescription:
      "Batterie lithium compacte officielle PowerBug. Format reduit pour un poids minimal. Compatible NX et NX DHC.",
    specs: [
      { label: "Technologie", value: "Lithium" },
      { label: "Format", value: "Mini / compact" },
      { label: "Compatibilite", value: "NX et NX DHC" },
    ],
    features: [
      "Format compact et leger",
      "Technologie lithium",
      "Compatible NX et NX DHC",
    ],
  },
  {
    slug: "roue-avant",
    name: "Roue avant complete",
    price: 25,
    category: "batterie",
    description: "Roue avant de remplacement pour trolleys PowerBug.",
    longDescription:
      "Roue avant complete de remplacement officielle. Compatible avec tous les modeles PowerBug NX.",
    specs: [{ label: "Compatibilite", value: "Tous modeles NX" }],
    features: ["Piece officielle", "Montage facile", "Compatible tous NX"],
  },
  {
    slug: "roues-arriere",
    name: "Roues arriere (paire)",
    price: 35,
    category: "batterie",
    description: "Paire de roues arriere de remplacement pour trolleys PowerBug.",
    longDescription:
      "Paire de roues arriere de remplacement officielle. Compatible avec tous les modeles PowerBug NX.",
    specs: [
      { label: "Quantite", value: "Paire" },
      { label: "Compatibilite", value: "Tous modeles NX" },
    ],
    features: ["Piece officielle", "Paire complete", "Compatible tous NX"],
  },
  {
    slug: "chargeur-batterie",
    name: "Chargeur batterie",
    price: 29,
    category: "batterie",
    description: "Chargeur de remplacement pour batterie lithium PowerBug.",
    longDescription:
      "Chargeur officiel de remplacement pour batteries lithium PowerBug. Charge complete en quelques heures.",
    specs: [
      { label: "Compatibilite", value: "Batteries lithium PowerBug" },
      { label: "Tension", value: "Standard EU" },
    ],
    features: [
      "Chargeur officiel",
      "Charge rapide",
      "Prise standard EU",
    ],
  },
];

export const allProducts = [...trolleys, ...accessories, ...batteries];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export const BUNDLE_VALUE = accessories
  .filter((a) => a.inBundle)
  .reduce((sum, a) => sum + a.price, 0);
