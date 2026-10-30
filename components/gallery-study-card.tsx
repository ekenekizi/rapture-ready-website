"use client";
import Image from "next/image";
import Link from "next/link";
import { galleryStudyPath, type GalleryPhoto } from "@/lib/gallery";
import { ShareGalleryStudyButton } from "@/components/share-gallery-study-button";
export function GalleryStudyCard({
  photo,
  number,
  onOpen,
}: {
  photo: GalleryPhoto;
  number: number;
  onOpen?: () => void;
}) {
  const image = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw"
        className="object-cover"
      />
      <span className="prophecy-card-number">
        {String(number).padStart(2, "0")}
      </span>
      <span className="prophecy-open">Read study ↗</span>
      {photo.sensitiveImage && (
        <span className="prophecy-sensitive">
          Graphic imagery · Open study to reveal
        </span>
      )}
    </>
  );
  return (
    <article className="prophecy-card">
      {onOpen ? (
        <button
          type="button"
          className={`prophecy-card-image ${photo.sensitiveImage ? "sensitive-preview" : ""}`}
          onClick={onOpen}
          aria-label={`Read photo study: ${photo.title}`}
        >
          {image}
        </button>
      ) : (
        <Link
          href={galleryStudyPath(photo.slug)}
          className={`prophecy-card-image ${photo.sensitiveImage ? "sensitive-preview" : ""}`}
          aria-label={`Read photo study: ${photo.title}`}
        >
          {image}
        </Link>
      )}
      <div className="prophecy-card-copy">
        <div className="eyebrow gold">{photo.category}</div>
        <h3>
          {onOpen ? (
            <button type="button" onClick={onOpen}>
              {photo.title}
            </button>
          ) : (
            <Link href={galleryStudyPath(photo.slug)}>{photo.title}</Link>
          )}
        </h3>
        {photo.description && <p>{photo.description}</p>}
        <div className="prophecy-card-foot">
          <span>
            {photo.scriptures[0]?.reference || "Scripture study forthcoming"}
          </span>
          {photo.minutes && <span>{photo.minutes} min study</span>}
        </div>
        <ShareGalleryStudyButton
          title={photo.title}
          slug={photo.slug}
          excerpt={photo.description}
          label="Share study"
        />
      </div>
    </article>
  );
}
