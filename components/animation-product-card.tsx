'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export function AnimationProductCard({
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
      className="group card-glass rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      {children}
    </div>
  );
}
