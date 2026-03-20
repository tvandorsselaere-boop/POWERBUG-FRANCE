"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  FoldVertical,
  CircleDot,
  Gauge,
  Snowflake,
  Puzzle,
  ArrowDownToLine,
  ParkingMeter,
  Battery,
  Send,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { features } from "@/lib/data/features";

const iconMap: Record<string, React.ElementType> = {
  "28v-power": Zap,
  "pliage-vrap": FoldVertical,
  "roue-anti-colmatage": CircleDot,
  "nx-handle": Gauge,
  "pneus-winter-ready": Snowflake,
  "station-accessoires": Puzzle,
  "downhill-control": ArrowDownToLine,
  "frein-parking": ParkingMeter,
  "batterie-lithium": Battery,
  "vrap-distance-control": Send,
};

// Features to show on the trolleys comparison page (shared features only)
const trolleyFeatureSlugs = [
  "28v-power",
  "batterie-lithium",
  "vrap-distance-control",
  "pliage-vrap",
  "pneus-winter-ready",
  "nx-handle",
  "roue-anti-colmatage",
  "station-accessoires",
];

export function TrolleyFeaturesAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const featuresList = trolleyFeatureSlugs
    .map((slug) => features.find((f) => f.slug === slug))
    .filter(Boolean) as typeof features;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-center text-2xl font-bold text-[#0F0F10] sm:text-3xl">
        Technologies de la serie NX
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-[#6B7280]">
        Cliquez sur une fonctionnalite pour en savoir plus.
      </p>

      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
        {featuresList.map((feature) => {
          const Icon = iconMap[feature.slug] ?? Zap;
          const isOpen = openSlug === feature.slug;
          const isVideo = feature.image?.endsWith(".mp4");

          return (
            <div
              key={feature.slug}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-[#356B0D]/30 bg-white shadow-lg"
                  : "border-[#DBDBDB] bg-white hover:border-[#356B0D]/20 hover:shadow-md"
              }`}
            >
              {/* Card header — always visible */}
              <button
                onClick={() => setOpenSlug(isOpen ? null : feature.slug)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#356B0D]/10">
                  <Icon className="h-5 w-5 text-[#356B0D]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F0F10] sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#6B7280] truncate">
                    {feature.subtitle}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#6B7280] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expandable content — stays in same grid cell */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#DBDBDB]/50 px-5 pb-5 pt-4">
                    {/* Image on top when open */}
                    {feature.image && (
                      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-[#F5F5F5]">
                        {isVideo ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                          >
                            <source src={feature.image} type="video/mp4" />
                          </video>
                        ) : (
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 400px"
                          />
                        )}
                      </div>
                    )}

                    {/* Text content */}
                    <p className="text-sm leading-relaxed text-[#6B7280]">
                      {feature.description}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {feature.benefits.slice(0, 4).map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-[#0F0F10]"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#356B0D]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/fonctionnalites/${feature.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#356B0D] hover:underline"
                    >
                      En savoir plus
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
