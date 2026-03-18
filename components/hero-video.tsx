"use client";

import { useRef, useEffect, useState } from "react";

const VIDEOS = ["/videos/nx-showcase.mp4", "/videos/nx-action.mp4"];

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const next = (videoIndex + 1) % VIDEOS.length;
      setVideoIndex(next);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [videoIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = VIDEOS[videoIndex];
    video.load();
    video.play().catch(() => {
      // Autoplay blocked — fail silently, fallback image is shown via CSS
    });
  }, [videoIndex]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
