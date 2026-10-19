import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import type { GalleryPhoto } from "@/lib/gallery";

export function GalleryPreview({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Beyond the page"
            title="Faith, carried into the world."
            description="Moments of sharing the gospel, growing together, and serving others."
          />
          <TextLink href="/gallery">Visit the Gallery</TextLink>
        </div>
        <div className="mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-[1.25fr_1fr_1fr] md:gap-6">
          {photos.slice(0, 3).map((photo) => (
            <Link
              key={photo.id}
              href="/gallery"
              className="group relative aspect-[4/4.5] min-w-[78%] snap-start overflow-hidden bg-paper md:min-w-0"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 78vw, 33vw"
                className="object-cover saturate-[.6] transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/90 to-transparent px-6 pt-16 pb-6 text-white">
                <p className="text-[8px] tracking-[.16em] uppercase">
                  {photo.category}
                </p>
                <h3 className="mt-3 mr-4 font-serif text-[28px] leading-tight">
                  {photo.title}
                </h3>
                <span aria-hidden="true" className="absolute right-5 bottom-6">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
        {photos.some((photo) => photo.isSample) && (
          <p className="mt-4 text-[9px] text-muted">
            Sample photography for the design preview.
          </p>
        )}
      </Container>
    </section>
  );
}
