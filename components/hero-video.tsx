"use client";

import { useEffect, useState } from "react";

export function HeroVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  return (
    <video
      key={isMobile ? "mobile" : "desktop"}
      src={isMobile ? "/videos/mobile.mp4" : "/videos/nx-showcase.mp4"}
      autoPlay
      muted
      playsInline
      loop
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
