import type { GalleryPhoto, GalleryScripture } from "@/lib/gallery";
import type { TeachingImage } from "@/sanity/image-types";
import { teachingImageAspectRatio, teachingImageUrl } from "@/sanity/lib/image";
export type PublishedGalleryPhoto = {
  _id: string;
  title: string;
  slug?: { current?: string } | null;
  category: string;
  image: TeachingImage;
  source?: string | null;
  description?: string | null;
  showOnHomepage: boolean;
  minutes?: number | null;
  scriptures?: GalleryScripture[] | null;
  imageContext?: string | null;
  imageKind?: GalleryPhoto["imageKind"];
  sensitiveImage?: boolean;
  observation?: string | null;
  reflectionTitle?: string | null;
  reflection?: string | null;
  responses?: string[] | null;
};
function creditLink(value: string | null | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function toGalleryPhoto(
  document: PublishedGalleryPhoto,
): GalleryPhoto | null {
  const portrait = teachingImageAspectRatio(document.image) < 1;
  const src = teachingImageUrl(document.image, 1200, portrait ? 1500 : 900);
  const fullSrc = teachingImageUrl(document.image, 2200);
  if (!src || !fullSrc) return null;
  return {
    id: document._id,
    // Older photos remain addressable until the owner generates a slug in Studio.
    slug: document.slug?.current || document._id,
    title: document.title,
    category: document.category,
    src,
    fullSrc,
    alt: document.image.alt ?? document.title,
    description: document.description?.trim() || document.image.caption || "",
    credit: document.image.credit,
    source: creditLink(document.source),
    portrait,
    showOnHomepage: document.showOnHomepage,
    minutes:
      document.minutes && document.minutes > 0 ? document.minutes : undefined,
    scriptures: (document.scriptures ?? []).filter(
      (verse) => verse.reference?.trim() && verse.quotation?.trim(),
    ),
    imageContext: document.imageContext || undefined,
    imageKind: document.imageKind || "unverified",
    sensitiveImage: document.sensitiveImage ?? false,
    observation: document.observation || undefined,
    reflectionTitle: document.reflectionTitle || undefined,
    reflection: document.reflection || undefined,
    responses: (document.responses ?? []).filter((response) =>
      response?.trim(),
    ),
  };
}
