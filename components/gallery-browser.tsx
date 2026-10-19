"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { SiteDialog } from "@/components/site-dialog";
import {
  galleryCategories,
  filterGallery,
  type GalleryCategory,
  type GalleryPhoto,
} from "@/lib/gallery";

export function GalleryBrowser({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState<GalleryCategory>("All photos");
  const [activeId, setActiveId] = useState<number | null>(null);
  const headingId = useId();
  const filtered = filterGallery(photos, category);
  const activeIndex = filtered.findIndex((photo) => photo.id === activeId);
  const active = filtered[activeIndex];

  function step(direction: number) {
    if (!filtered.length) return;
    const index = (activeIndex + direction + filtered.length) % filtered.length;
    setActiveId(filtered[index].id);
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 pb-4 md:flex-row md:items-center">
        <div
          role="group"
          aria-label="Filter gallery"
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setActiveId(null);
              }}
              className={`min-h-11 shrink-0 rounded-sm border px-4 py-2 text-[11px] transition-colors ${category === item ? "border-navy bg-navy text-white" : "border-border hover:border-gold"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p
          role="status"
          aria-live="polite"
          className="shrink-0 text-[10px] text-muted"
        >
          {filtered.length} photograph{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      {photos.some((photo) => photo.isSample) && (
        <p className="mb-7 text-[9px] leading-5 text-muted">
          DESIGN PREVIEW · Sample photography illustrates the layout. These are
          not photographs of Endtime Watch activities.
        </p>
      )}

      <div className="columns-2 gap-4 md:columns-3 md:gap-7">
        {filtered.map((photo) => (
          <figure
            key={photo.id}
            className="mb-8 inline-block w-full break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setActiveId(photo.id)}
              aria-label={`View photo: ${photo.title}`}
              className={`group relative block w-full cursor-zoom-in overflow-hidden bg-paper ${photo.portrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover saturate-[.6] transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-ivory text-lg text-navy"
              >
                ↗
              </span>
            </button>
            <figcaption className="pt-4">
              <p className="text-[8px] tracking-[.16em] text-gold uppercase">
                {photo.category}
              </p>
              <h2 className="mt-2 font-serif text-2xl leading-tight md:text-[26px]">
                {photo.title}
              </h2>
              {photo.isSample && (
                <p className="mt-2 text-[9px] text-muted">Sample photograph</p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {!filtered.length && (
        <p className="py-16 text-center text-sm text-muted">
          Photographs will appear here as they are added.
        </p>
      )}

      <SiteDialog
        open={Boolean(active)}
        onClose={() => setActiveId(null)}
        labelledBy={headingId}
        className="max-w-[1060px]"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            step(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {active && (
          <>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-[9px] tracking-wider text-muted uppercase">
                {active.category} · {activeIndex + 1} / {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close photo viewer"
                className="h-11 w-11 text-xl"
              >
                ×
              </button>
            </div>
            <div className="relative h-[51dvh] bg-paper md:h-[62dvh]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                loading="eager"
                sizes="(max-width: 1100px) 100vw, 1000px"
                className="object-contain"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-5">
              <div>
                <h2 id={headingId} className="font-serif text-3xl">
                  {active.title}
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-muted">
                  {active.description}
                </p>
                <a
                  href={active.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[9px] text-muted underline underline-offset-4"
                >
                  {active.isSample ? "Sample photo" : "Photo"} · {active.credit}
                </a>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() => step(-1)}
                  className="h-11 w-11 border border-border"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() => step(1)}
                  className="h-11 w-11 border border-border"
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </SiteDialog>
    </>
  );
}
