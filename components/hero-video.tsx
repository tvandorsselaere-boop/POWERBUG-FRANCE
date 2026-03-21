"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Autoplay blocked — poster will show as fallback
      });
    }
  }, [isDesktop]);

  return (
    <>
      {/* Mobile: image statique (LCP optimisé, pas de vidéo téléchargée) */}
      {!isDesktop && (
        <Image
          src="/images/hero-mobile.webp"
          alt="Chariot de golf électrique PowerBug NX sur un parcours"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      {/* Desktop: vidéo autoplay loop */}
      {isDesktop && (
        <video
          ref={videoRef}
          src="/videos/desktop.mp4"
          poster="/images/hero-poster.webp"
          preload="none"
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      )}
    </>
  );
}
