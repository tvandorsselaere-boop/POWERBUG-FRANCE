import Image from "next/image";
import Link from "next/link";
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
  ArrowRight,
} from "lucide-react";
import { features as featureData } from "@/lib/data/features";

const iconMap: Record<string, React.ElementType> = {
  "28v-power": Zap,
  "pliage-vrap": FoldVertical,
  "roue-anti-colmatage": CircleDot,
  "nx-handle": Gauge,
  "pneus-winter-ready": Snowflake,
  "station-accessoires": Puzzle,
  "downhill-control": ArrowDownToLine,
  "frein-parking": ParkingMeter,
};

type ExtraFeature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const extraFeatures: ExtraFeature[] = [
  {
    icon: Shield,
    title: "Garantie 2 ans constructeur",
    description:
      "Trolley et batterie couverts par la garantie constructeur de 2 ans. SAV base en France pour une prise en charge rapide et locale.",
  },
  {
    icon: Star,
    title: "8 000+ avis clients",
    description:
      "N°1 au classement client des marques de chariots electriques de golf. Depuis 2003.",
  },
];

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof featureData)[number];
  index: number;
}) {
  const Icon = iconMap[feature.slug] ?? Zap;
  const imageLeft = index % 2 === 0;
  const hasImage = !!feature.image;

  const textContent = (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#356B0D]/10">
        <Icon className="h-6 w-6 text-[#356B0D]" />
      </div>
      <h3 className="text-2xl font-bold text-[#0F0F10]">{feature.title}</h3>
      <p className="mt-1 text-sm font-medium text-[#356B0D]">
        {feature.subtitle}
      </p>
      <p className="mt-4 leading-relaxed text-[#6B7280]">
        {feature.description}
      </p>
      <ul className="mt-4 space-y-2">
        {feature.benefits.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-[#0F0F10]">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
            {b}
          </li>
        ))}
      </ul>
      <Link
        href={`/fonctionnalites/${feature.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#356B0D] transition-colors hover:text-[#2A5509]"
      >
        En savoir plus
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );

  if (!hasImage) {
    // Fallback: card style for features without images (DHC-only)
    return (
      <div className="card-glass rounded-2xl p-8">
        {textContent}
      </div>
    );
  }

  const imageContent = (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F5F5F5]">
      <Image
        src={feature.image!}
        alt={feature.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized={feature.image!.endsWith(".gif")}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
      {imageLeft ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
}

export function TrolleyFeatures({ slug }: { slug: string }) {
  const isDhc = slug === "nx-dhc-lithium";

  // Get features for this trolley
  const trolleyFeatures = featureData.filter((f) =>
    f.trolleys.includes("both") || f.trolleys.includes(isDhc ? "dhc" : "nx")
  );

  // Split: features with images get visual sections, DHC-only without images get cards
  const visualFeatures = trolleyFeatures.filter((f) => f.image);
  const cardFeatures = trolleyFeatures.filter((f) => !f.image);

  return (
    <section className="mt-16 border-t border-[#DBDBDB] pt-16">
      <h2 className="mb-16 text-center text-2xl font-bold text-[#0F0F10] sm:text-3xl">
        {isDhc ? "Tout ce que le NX offre, et bien plus" : "Concu pour performer"}
      </h2>

      {/* Visual feature sections with alternating layout */}
      <div className="space-y-16 md:space-y-24">
        {visualFeatures.map((feature, i) => (
          <FeatureSection key={feature.slug} feature={feature} index={i} />
        ))}
      </div>

      {/* Card features (DHC-only without images + trust badges) */}
      {cardFeatures.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cardFeatures.map((feature) => {
            const Icon = iconMap[feature.slug] ?? Zap;
            return (
              <Link
                key={feature.slug}
                href={`/fonctionnalites/${feature.slug}`}
                className="card-glass block rounded-xl p-6 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#356B0D]/10">
                  <Icon className="h-5 w-5 text-[#356B0D]" />
                </div>
                <h3 className="text-base font-semibold text-[#0F0F10]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {feature.description}
                </p>
                <p className="mt-3 flex items-center gap-1 text-xs font-medium text-[#356B0D]">
                  En savoir plus
                  <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* Trust badges */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {extraFeatures.map((f) => (
          <div
            key={f.title}
            className="card-glass rounded-xl p-6"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#356B0D]/10">
              <f.icon className="h-5 w-5 text-[#356B0D]" />
            </div>
            <h3 className="text-base font-semibold text-[#0F0F10]">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
