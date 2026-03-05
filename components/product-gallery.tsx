"use client";

import Image from "next/image";
import { useState } from "react";
import { Zap } from "lucide-react";

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

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] aspect-square">
        <Zap className="h-24 w-24 text-[#DBDBDB]" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="flex items-center justify-center rounded-2xl border border-[#DBDBDB] bg-[#F5F5F5] aspect-square overflow-hidden">
        <Image
          src={images[selected].url}
          alt={images[selected].alt_text ?? productName}
          width={600}
          height={600}
          className="h-full w-full object-contain p-6 transition-opacity duration-300"
          priority
        />
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
  );
}
