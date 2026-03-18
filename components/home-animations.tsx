'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import React from 'react';

// ── Hero animated wrapper ─────────────────────────────────────────────────────
function Hero({ children }: { children: React.ReactNode }) {
  return <div className="contents">{children}</div>;
}

// ── Generic section fade-in ───────────────────────────────────────────────────
function Section({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        animationDelay: index ? `${index * 0.1}s` : undefined,
      }}
      className="group card-glass rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      {children}
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        animationDelay: index ? `${index * 0.1}s` : undefined,
      }}
      className="transition-all duration-300 hover:-translate-y-1"
    >
      {children}
    </div>
  );
}

// ── Bundle banner slide-in ────────────────────────────────────────────────────
function BundleBanner({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="animate-slide-left">
      {children}
    </div>
  );
}

export const HomeAnimations = {
  Hero,
  Section,
  ProductCard,
  FeatureCard,
  BundleBanner,
};
