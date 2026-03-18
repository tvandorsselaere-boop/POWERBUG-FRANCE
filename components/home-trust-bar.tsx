"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Shield, Truck, Lock } from "lucide-react";

interface TrustItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  staticLabel: string;
}

const TRUST_ITEMS: TrustItem[] = [
  { icon: Star, label: "avis clients", value: 8300, suffix: "+", staticLabel: "8 300+ avis clients" },
  { icon: Shield, label: "Garantie", value: 2, suffix: " ans", staticLabel: "Garantie 2 ans" },
  { icon: Truck, label: "Livraison France entière", value: 0, suffix: "", staticLabel: "Livraison France entière" },
  { icon: Lock, label: "Paiement sécurisé", value: 0, suffix: "", staticLabel: "Paiement sécurisé" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || value === 0) return;
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
  }, [inView, value]);

  if (value === 0) return null;

  return (
    <span ref={ref} className="font-bold text-[#356B0D]">
      {count.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}

export function HomeTrustBar() {
  return (
    <section className="border-b border-[#DBDBDB] bg-white py-5">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.staticLabel}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-sm text-[#0F0F10]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#356B0D]/10">
                <item.icon className="h-4 w-4 text-[#356B0D]" />
              </div>
              <span className="font-medium leading-tight">
                {item.value > 0 ? (
                  <>
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                    {" "}{item.label}
                  </>
                ) : (
                  item.staticLabel
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
