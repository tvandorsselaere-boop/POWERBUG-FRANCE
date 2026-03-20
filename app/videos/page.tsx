import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { VideoEmbed } from "@/components/video-embed";

export const metadata: Metadata = {
  title: "Vidéos PowerBug - Nos chariots en action",
  description:
    "Découvrez nos chariots électriques PowerBug en vidéo. Présentations, tutoriels et guides de maintenance.",
  alternates: { canonical: "/videos" },
};

const presentationVideos = [
  { id: "x5cDyT2jT9g", title: "PowerBug GTX1 Lithium Golf Trolley" },
];

const tutorialVideos = [
  { id: "cL7ygIYda6g", title: "Guide d'utilisation complet du PowerBug NX" },
  { id: "UPN07G1B2wY", title: "Connexion et retrait de la batterie (NX Lithium)" },
  { id: "bKXsyp8CA20", title: "Changement de batterie du manche" },
  { id: "Eljk3GDaQAA", title: "Installation des inserts bac batterie lithium" },
  { id: "FVrwNDoMuEM", title: "Convertir une batterie lithium universelle vers connecteur PowerBug" },
  { id: "2WiRZPa8S64", title: "Remplacement de la charniere" },
  { id: "B41lt06pXFQ", title: "Remplacement du boitier electronique (ECU)" },
  { id: "FbCoTKlglz4", title: "Remplacement du moteur" },
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
        Decouvrez les chariots electriques PowerBug en video : presentations
        produits, tutoriels et guides de maintenance.
      </p>

      {/* Presentations */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">
          Presentations
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {presentationVideos.map((video) => (
            <div key={video.id} className="card-glass rounded-2xl p-4">
              <VideoEmbed videoId={video.id} title={video.title} />
              <p className="mt-3 text-center text-sm font-medium text-[#6B7280]">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tutoriels & Maintenance */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-[#0F0F10]">
          Tutoriels & Maintenance
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tutorialVideos.map((video) => (
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
          href="https://www.youtube.com/@PowerBugElectricGolfTrolleys"
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
