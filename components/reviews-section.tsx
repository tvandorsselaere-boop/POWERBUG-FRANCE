import { Star, ExternalLink } from "lucide-react";

export function ReviewsSection() {
  return (
    <section className="mt-16 border-t border-[#DBDBDB] pt-16">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5 fill-[#F6A429] text-[#F6A429]"
            />
          ))}
        </div>
        <p className="mt-3 text-lg font-bold text-[#0F0F10]">
          8 000+ avis clients verifies
        </p>
        <p className="mt-1 text-sm text-[#6B7280]">
          N°1 au classement client des marques de chariots electriques de golf.
        </p>
        <a
          href="https://powerbug.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#356B0D] hover:underline"
        >
          Voir les avis sur powerbug.co.uk
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
