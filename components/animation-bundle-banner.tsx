'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function AnimationBundleBanner({ children }: { children: React.ReactNode }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="animate-slide-left">
      {children}
    </div>
  );
}
