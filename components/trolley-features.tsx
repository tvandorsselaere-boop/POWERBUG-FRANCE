import {
  Zap,
  FoldVertical,
  CircleDot,
  Gauge,
  Snowflake,
  Puzzle,
  Shield,
  Star,
  ArrowDownToLine,
  ParkingMeter,
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const nxFeatures: Feature[] = [
  {
    icon: Zap,
    title: "Systeme 28V Power",
    description:
      "Le systeme 28 volts offre une puissance superieure sur tous les terrains. Montees, pentes, fairways lourds : votre trolley avance sans effort.",
  },
  {
    icon: FoldVertical,
    title: "Pliage VRAP ultra-compact",
    description:
      "Un seul geste suffit. Le systeme VRAP plie le trolley en quelques secondes pour un rangement ultra-compact dans votre coffre.",
  },
  {
    icon: CircleDot,
    title: "Roue avant anti-colmatage",
    description:
      "Design exclusif qui empeche l'accumulation de boue et d'herbe. Performante en toutes saisons, nettoyage minimal.",
  },
  {
    icon: Gauge,
    title: "NX Handle — ecran + USB",
    description:
      "Poignee ergonomique avec ecran digital integre et port USB pour charger votre telephone ou GPS pendant la partie.",
  },
  {
    icon: Snowflake,
    title: "Pneus Winter-Ready",
    description:
      "Pneus inversibles avec profil crante pour l'hiver. Adherence maximale sur terrain humide, boueux ou givre. Jouez toute l'annee.",
  },
  {
    icon: Puzzle,
    title: "Station accessoires integree",
    description:
      "Systeme de fixation universel pour ajouter siege, porte-parapluie, GPS et tous les accessoires PowerBug en un clic.",
  },
  {
    icon: Shield,
    title: "Garantie 3 ans France",
    description:
      "Trolley et batterie garantis 3 ans. SAV base en France pour une prise en charge rapide et locale.",
  },
  {
    icon: Star,
    title: "5 800+ avis clients",
    description:
      "Classe N°1 en fiabilite et service client par les golfeurs du monde entier. Plus de 20 ans d'excellence britannique.",
  },
];

const dhcExtraFeatures: Feature[] = [
  {
    icon: ArrowDownToLine,
    title: "Downhill Control (DHC)",
    description:
      "Technologie exclusive de freinage automatique en descente. Le trolley adapte sa vitesse a la pente pour un controle total sans effort.",
  },
  {
    icon: ParkingMeter,
    title: "Frein parking electronique",
    description:
      "Immobilisation instantanee sur simple pression. Votre trolley reste parfaitement stable sur les pentes les plus raides.",
  },
];

export function TrolleyFeatures({ slug }: { slug: string }) {
  const isDhc = slug === "nx-dhc-lithium";
  const features = isDhc
    ? [...dhcExtraFeatures, ...nxFeatures]
    : nxFeatures;

  return (
    <section className="mt-16 border-t border-[#DBDBDB] pt-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[#0F0F10] sm:text-3xl">
        {isDhc ? "Tout ce que le NX offre, et bien plus" : "Concu pour performer"}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card-glass rounded-xl p-6 transition-all hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#356B0D]/10">
              <feature.icon className="h-5 w-5 text-[#356B0D]" />
            </div>
            <h3 className="text-base font-semibold text-[#0F0F10]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
