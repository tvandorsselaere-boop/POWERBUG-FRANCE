import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  ArrowLeft,
  Zap,
  FoldVertical,
  CircleDot,
  Gauge,
  Snowflake,
  Puzzle,
  ArrowDownToLine,
  ParkingMeter,
} from "lucide-react";
import { features, getFeatureBySlug } from "@/lib/data/features";

const featureIcons: Record<string, React.ElementType> = {
  "28v-power": Zap,
  "pliage-vrap": FoldVertical,
  "roue-anti-colmatage": CircleDot,
  "nx-handle": Gauge,
  "pneus-winter-ready": Snowflake,
  "station-accessoires": Puzzle,
  "downhill-control": ArrowDownToLine,
  "frein-parking": ParkingMeter,
};

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return {};
  return {
    title: `${feature.title} - PowerBug France`,
    description: feature.description,
  };
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const Icon = featureIcons[slug] ?? Zap;

  const trolleyLabel =
    feature.trolleys[0] === "both"
      ? "NX Lithium et NX DHC Lithium"
      : feature.trolleys[0] === "dhc"
        ? "NX DHC Lithium uniquement"
        : "NX Lithium uniquement";

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1600px] px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="transition-colors hover:text-[#356B0D]">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Fonctionnalites</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#0F0F10]">{feature.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/trolleys"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#356B0D] transition-colors hover:text-[#8DC63F]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux trolleys
        </Link>

        {/* Hero section */}
        <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="card-glass rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#356B0D]/10">
                <Icon className="h-8 w-8 text-[#356B0D]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F0F10] sm:text-4xl">
                  {feature.title}
                </h1>
                <p className="mt-2 text-lg font-medium text-[#356B0D]">
                  {feature.subtitle}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#6B7280]">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
          {feature.image && (
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F5F5F5]">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized={feature.image.endsWith(".gif")}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Benefits */}
          <div className="card-glass rounded-2xl p-8">
            <h2 className="mb-6 text-xl font-bold text-[#0F0F10]">
              Avantages
            </h2>
            <ul className="space-y-4">
              {feature.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#356B0D]/10">
                    <Check className="h-3.5 w-3.5 text-[#356B0D]" />
                  </div>
                  <span className="text-sm leading-relaxed text-[#6B7280]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Available on */}
          <div className="card-glass rounded-2xl p-8">
            <h2 className="mb-6 text-xl font-bold text-[#0F0F10]">
              Disponible sur
            </h2>
            <p className="mb-6 text-sm text-[#6B7280]">{trolleyLabel}</p>

            <div className="space-y-4">
              {(feature.trolleys[0] === "both" ||
                feature.trolleys[0] === "nx") && (
                <Link
                  href="/trolleys/nx-lithium"
                  className="card-glass flex items-center justify-between rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-[#0F0F10]">
                      PowerBug NX Lithium
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      899 EUR - Le choix intelligent
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#DBDBDB]" />
                </Link>
              )}

              {(feature.trolleys[0] === "both" ||
                feature.trolleys[0] === "dhc") && (
                <Link
                  href="/trolleys/nx-dhc-lithium"
                  className="card-glass flex items-center justify-between rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-[#0F0F10]">
                      PowerBug NX DHC Lithium
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      999 EUR - Premium avec DHC
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#DBDBDB]" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/trolleys"
            className="btn-glass inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white"
          >
            Voir les trolleys
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/accessoires"
            className="btn-glass-outline inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-[#0F0F10]"
          >
            Voir les accessoires
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
