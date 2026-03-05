import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { VideoEmbed } from "@/components/video-embed";

export const metadata: Metadata = {
  title: "Videos PowerBug - Nos chariots en action",
  description:
    "Decouvrez nos chariots electriques PowerBug en video. Presentations, demonstrations du pliage VRAP et du Downhill Control.",
};

const nxVideos = [
  { id: "PLACEHOLDER_NX_OVERVIEW", title: "NX Lithium — Presentation" },
  { id: "PLACEHOLDER_NX_FOLDING", title: "Pliage VRAP en action" },
];

const dhcVideos = [
  { id: "PLACEHOLDER_DHC_OVERVIEW", title: "NX DHC — Presentation" },
  { id: "PLACEHOLDER_DHC_DOWNHILL", title: "Downhill Control en action" },
  { id: "PLACEHOLDER_DHC_FOLDING", title: "Pliage VRAP en action" },
];

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-12 sm:py-16 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="hover:text-[#356B0D]">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#0F0F10]">Videos</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
        Nos chariots en action
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
        Decouvrez les chariots electriques PowerBug en video : presentations,
        demonstrations et fonctionnalites exclusives.
      </p>

      {/* NX Lithium Section */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">NX Lithium</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {nxVideos.map((video) => (
            <div key={video.id} className="card-glass rounded-2xl p-4">
              <VideoEmbed videoId={video.id} title={video.title} />
              <p className="mt-3 text-center text-sm font-medium text-[#6B7280]">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NX DHC Lithium Section */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">
          NX DHC Lithium
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dhcVideos.map((video) => (
            <div key={video.id} className="card-glass rounded-2xl p-4">
              <VideoEmbed videoId={video.id} title={video.title} />
              <p className="mt-3 text-center text-sm font-medium text-[#6B7280]">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube channel link */}
      <div className="mt-16 rounded-2xl border border-[#356B0D]/20 bg-[#356B0D]/5 p-8 text-center">
        <p className="text-lg font-semibold text-[#0F0F10]">
          Retrouvez toutes nos videos sur YouTube
        </p>
        <p className="mt-2 text-sm text-[#6B7280]">
          Tutoriels, presentations de produits et conseils d&apos;utilisation.
        </p>
        <a
          href="https://www.youtube.com/@PLACEHOLDER_POWERBUG_CHANNEL"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#356B0D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A5509]"
        >
          Voir la chaine YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
