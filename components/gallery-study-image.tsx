"use client";
import { useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/gallery";
export function GalleryStudyImage({ photo }: { photo: GalleryPhoto }) {
  const [revealed, setRevealed] = useState(false);
  const concealed = photo.sensitiveImage && !revealed;
  return (
    <div className={`prophecy-study-image ${concealed ? "is-concealed" : ""}`}>
      <Image
        src={photo.fullSrc ?? photo.src}
        alt={photo.alt}
        width={900}
        height={photo.portrait ? 1125 : 675}
        loading="eager"
        sizes="(max-width: 760px) 100vw, 50vw"
        className="h-auto w-full object-contain"
      />
      {concealed && (
        <button
          type="button"
          className="reveal-artwork"
          onClick={() => setRevealed(true)}
        >
          Graphic imagery
          <br />
          <span>Show image</span>
        </button>
      )}
    </div>
  );
}
