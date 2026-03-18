"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Zap, ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";

type ProductImage = {
  url: string;
  alt_text: string | null;
  position: number;
  is_primary: boolean;
};

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(
    () => setSelected((s) => (s === 0 ? images.length - 1 : s - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setSelected((s) => (s === images.length - 1 ? 0 : s + 1)),
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, prev, next]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] aspect-square">
        <Zap className="h-24 w-24 text-[#DBDBDB]" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="group relative flex items-center justify-center rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] aspect-square overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[selected].url}
            alt={images[selected].alt_text ?? productName}
            width={600}
            height={600}
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            priority
          />

          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm">
            <ZoomIn className="h-3.5 w-3.5" />
            Agrandir
          </div>

          {/* Arrows (stop propagation to not trigger lightbox) */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-all hover:bg-white active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-[#0F0F10]" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-all hover:bg-white active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-[#0F0F10]" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#F5F5F5] transition-all sm:h-20 sm:w-20 ${
                  selected === i
                    ? "border-[#356B0D] shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text ?? `${productName} ${i + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {selected + 1} / {images.length}
            </span>
          )}

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected].url}
              alt={images[selected].alt_text ?? productName}
              width={1200}
              height={1200}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
          </div>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
