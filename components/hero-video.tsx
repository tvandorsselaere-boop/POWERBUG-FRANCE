"use client";

import { useRef, useEffect, useState } from "react";

const VIDEOS_DESKTOP = ["/videos/nx-showcase.mp4", "/videos/nx-action.mp4"];
const VIDEOS_MOBILE = ["/videos/mobile.mp4"];

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const videos = isMobile ? VIDEOS_MOBILE : VIDEOS_DESKTOP;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const next = (videoIndex + 1) % videos.length;
      setVideoIndex(next);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [videoIndex, videos.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = videos[videoIndex];
    video.load();
    video.play().catch(() => {
      // Autoplay blocked — fail silently
    });
  }, [videoIndex, videos]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop={videos.length === 1}
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
