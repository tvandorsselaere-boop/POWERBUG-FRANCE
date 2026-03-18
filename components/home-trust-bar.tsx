'use client';

import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Star, Shield, Truck, Lock } from 'lucide-react';

interface TrustItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  staticLabel: string;
}

const TRUST_ITEMS: TrustItem[] = [
  { icon: Star, label: 'avis clients', value: 8300, suffix: '+', staticLabel: '8 300+ avis clients' },
  { icon: Shield, label: 'Garantie', value: 2, suffix: ' ans', staticLabel: 'Garantie 2 ans' },
  { icon: Truck, label: 'Livraison France entière', value: 0, suffix: '', staticLabel: 'Livraison France entière' },
  { icon: Lock, label: 'Paiement sécurisé', value: 0, suffix: '', staticLabel: 'Paiement sécurisé' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || value === 0) return;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  if (value === 0) return null;

  return (
    <span ref={ref} className="font-bold text-[#356B0D]">
      {count.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}

function TrustItem({
  item,
  index,
}: {
  item: TrustItem;
  index: number;
}) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
      className="flex items-center gap-2.5 text-sm text-[#0F0F10]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#356B0D]/10">
        <item.icon className="h-4 w-4 text-[#356B0D]" />
      </div>
      <span className="font-medium leading-tight">
        {item.value > 0 ? (
          <>
            <AnimatedCounter value={item.value} suffix={item.suffix} />
            {' '}
            {item.label}
          </>
        ) : (
          item.staticLabel
        )}
      </span>
    </div>
  );
}

export function HomeTrustBar() {
  return (
    <section className="border-b border-[#DBDBDB] bg-white py-5">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
          {TRUST_ITEMS.map((item, i) => (
            <TrustItem key={item.staticLabel} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
