"use client";

import { motion } from "framer-motion";
import React from "react";

// ── Hero animated wrapper ─────────────────────────────────────────────────────
function Hero({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="contents"
    >
      {children}
    </motion.div>
  );
}

// ── Generic section fade-in ───────────────────────────────────────────────────
function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="group card-glass rounded-2xl p-8 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      {children}
    </motion.div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// ── Bundle banner slide-in ────────────────────────────────────────────────────
function BundleBanner({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export const HomeAnimations = {
  Hero,
  Section,
  ProductCard,
  FeatureCard,
  BundleBanner,
};
