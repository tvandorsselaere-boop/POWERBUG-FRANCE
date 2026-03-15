"use client";

import { VideoEmbed } from "@/components/video-embed";

type Video = {
  id: string;
  title: string;
};

const nxVideos: Video[] = [
  { id: "cL7ygIYda6g", title: "Guide d'utilisation du NX" },
];

const dhcVideos: Video[] = [
  { id: "x5cDyT2jT9g", title: "PowerBug GTX1 Lithium — Presentation" },
  { id: "cL7ygIYda6g", title: "Guide d'utilisation du NX" },
];

export function VideoSection({ slug }: { slug: string }) {
  const videos = slug === "nx-dhc-lithium" ? dhcVideos : nxVideos;

  return (
    <section className="mt-16 border-t border-[#DBDBDB] pt-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[#0F0F10] sm:text-3xl">
        Voir en action
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {videos.map((video) => (
          <div key={video.id}>
            <VideoEmbed videoId={video.id} title={video.title} />
            <p className="mt-3 text-center text-sm font-medium text-[#6B7280]">
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
