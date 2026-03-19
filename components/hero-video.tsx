"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState("/videos/desktop.mp4");

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    const newSrc = mobile ? "/videos/mobile.mp4" : "/videos/desktop.mp4";
    setSrc(newSrc);

    // Safari iOS: programmatic play() after src change
    const video = videoRef.current;
    if (video) {
      video.src = newSrc;
      video.load();
      video.play().catch(() => {
        // Autoplay blocked — poster will show as fallback
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster="/images/hero-poster.jpg"
      preload="none"
      autoPlay
      muted
      playsInline
      loop
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
