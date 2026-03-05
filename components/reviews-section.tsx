import { Star } from "lucide-react";

const reviews = [
  {
    name: "Philippe M.",
    rating: 5,
    text: "Excellent chariot, tres stable et puissant. La batterie tient facilement 36 trous. Le pliage VRAP est genial.",
    date: "Janvier 2026",
  },
  {
    name: "Marie-Claire D.",
    rating: 5,
    text: "Offert a mon mari pour Noel. Il est ravi ! La qualite de fabrication est irreprochable. Livraison rapide.",
    date: "Decembre 2025",
  },
  {
    name: "Jean-Luc R.",
    rating: 4,
    text: "Tres bon rapport qualite/prix. Le DHC est indispensable sur mon parcours vallonne. Seul bemol : un peu lourd a soulever.",
    date: "Fevrier 2026",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? "fill-[#F6A429] text-[#F6A429]" : "text-[#DBDBDB]"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="mt-16 border-t border-[#DBDBDB] pt-16">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2">
          <Stars count={5} />
          <span className="text-lg font-bold text-[#0F0F10]">4.8/5</span>
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">
          Base sur 5 800+ avis clients verifies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="card-glass rounded-xl p-6"
          >
            <Stars count={review.rating} />
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0F0F10]">
                {review.name}
              </span>
              <span className="text-xs text-[#6B7280]">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
