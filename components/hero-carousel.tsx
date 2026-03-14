"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const heroImages = [
  {
    src: "/images/lifestyle/NX-Lifestyle-1.jpg",
    alt: "PowerBug NX sur le parcours de golf",
  },
  {
    src: "/images/lifestyle/NX-Lifestyle-2.jpg",
    alt: "PowerBug NX en action",
  },
  {
    src: "/images/lifestyle/NX-Lifestyle-3.jpg",
    alt: "PowerBug NX sur le green",
  },
  {
    src: "/images/lifestyle/NX-Lifestyle-4.jpg",
    alt: "PowerBug NX detail",
  },
  {
    src: "/images/lifestyle/NX-Lifestyle-5.jpg",
    alt: "PowerBug NX lifestyle",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      {heroImages.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}
    </>
  );
}
