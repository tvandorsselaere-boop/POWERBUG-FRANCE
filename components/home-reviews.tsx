'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Star, ExternalLink } from 'lucide-react';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#F6A429] text-[#F6A429]" />
      ))}
    </div>
  );
}

export function HomeReviews() {
  const ref = useScrollReveal();

  return (
    <section className="border-t border-[#DBDBDB] bg-[#F5F5F5] py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div ref={ref} className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6B7280]">
            Avis clients
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F0F10] sm:text-4xl">
            Plus de 8 300 avis vérifiés dans le monde
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#6B7280]">
            PowerBug est noté Excellent sur Trustpilot et Reviews.co.uk par des milliers de golfeurs.
          </p>
          {/* Platform scores — données réelles vérifiées */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <a
              href="https://uk.trustpilot.com/review/powerbug.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#DBDBDB] bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Trustpilot</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold text-[#0F0F10]">4.9</span>
                  <Stars count={5} />
                  <span className="text-sm text-[#6B7280]">&mdash; 3 895 avis</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#DBDBDB] transition-colors group-hover:text-[#356B0D]" />
            </a>
            <a
              href="https://www.reviews.co.uk/company-reviews/store/powerbug"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#DBDBDB] bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Reviews.co.uk</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold text-[#0F0F10]">4.7</span>
                  <Stars count={5} />
                  <span className="text-sm text-[#6B7280]">&mdash; 4 415 avis</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#DBDBDB] transition-colors group-hover:text-[#356B0D]" />
            </a>
          </div>
          <p className="mt-6 text-xs text-[#6B7280]">
            Consultez les avis directement sur les plateformes en cliquant ci-dessus.
          </p>
        </div>
      </div>
    </section>
  );
}
