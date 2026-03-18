'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function AnimationFeatureCard({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      className="transition-all duration-300 hover:-translate-y-1"
    >
      {children}
    </div>
  );
}
