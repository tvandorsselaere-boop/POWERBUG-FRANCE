'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Star, ExternalLink } from 'lucide-react';

const REVIEWS = [
  {
    name: "Jean-Pierre M.",
    date: "Mars 2025",
    rating: 5,
    text: "Chariot exceptionnel, livraison rapide et emballage parfait. La batterie tient vraiment les 36 trous comme promis. Je recommande vivement PowerBug France !",
    source: "Trustpilot",
  },
  {
    name: "Sophie L.",
    date: "Février 2025",
    rating: 5,
    text: "Le NX DHC est incroyable sur les parcours vallonnés. Le Downhill Control change vraiment la vie. Service client très réactif pour une petite question sur le chargeur.",
    source: "Trustpilot",
  },
  {
    name: "Marc D.",
    date: "Janvier 2025",
    rating: 5,
    text: "Qualité de fabrication au top, pliage ultra-rapide. Mon ancien chariot plomb faisait le double du poids. J'aurais dû passer au PowerBug bien plus tôt.",
    source: "Reviews.co.uk",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#F6A429] text-[#F6A429]" />
      ))}
    </div>
  );
}

function ReviewsHeader() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
            Avis vérifiés
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Ce que disent nos clients
          </h2>
          {/* Platform scores */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <a
              href="https://uk.trustpilot.com/review/powerbug.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#DBDBDB] bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Trustpilot</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-[#0F0F10]">4.9</span>
                  <Stars count={5} />
                  <span className="text-xs text-[#6B7280]">— 3 895 avis</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#DBDBDB] transition-colors group-hover:text-[#356B0D]" />
            </a>
            <a
              href="https://www.reviews.co.uk/company-reviews/store/powerbug"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#DBDBDB] bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Reviews.co.uk</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-[#0F0F10]">4.7</span>
                  <Stars count={5} />
                  <span className="text-xs text-[#6B7280]">— 4 415 avis</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#DBDBDB] transition-colors group-hover:text-[#356B0D]" />
            </a>
          </div>
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className="card-glass rounded-2xl p-6"
    >
              <Stars count={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-[#0F0F10]">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#0F0F10]">{review.name}</p>
                  <p className="text-xs text-[#6B7280]">{review.date}</p>
                </div>
                <span className="rounded-full bg-[#356B0D]/10 px-2.5 py-1 text-[10px] font-medium text-[#356B0D]">
                  {review.source}
                </span>
              </div>
    </div>
  );
}

export function HomeReviews() {
  return (
    <section className="border-t border-[#DBDBDB] bg-[#F5F5F5] py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ReviewsHeader />

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
