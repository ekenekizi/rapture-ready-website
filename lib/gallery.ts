export const galleryCategories = [
  "All studies",
  "Prophecy",
  "Discernment",
  "Christian living",
  "Worship",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryScripture = { reference: string; quotation: string };
export type GalleryPhoto = {
  id: string;
  slug: string;
  title: string;
  category: string;
  src: string;
  fullSrc?: string;
  alt: string;
  description: string;
  credit?: string;
  source?: string;
  portrait?: boolean;
  showOnHomepage: boolean;
  minutes?: number;
  scriptures: GalleryScripture[];
  imageContext?: string;
  imageKind?: "photograph" | "illustration" | "unverified";
  sensitiveImage?: boolean;
  observation?: string;
  reflectionTitle?: string;
  reflection?: string;
  responses: string[];
};
export function filterGallery(
  photos: GalleryPhoto[],
  category: GalleryCategory,
) {
  return category === "All studies"
    ? photos
    : photos.filter((photo) => photo.category === category);
}
export function galleryStudyPath(slug: string) {
  return `/gallery#study=${encodeURIComponent(slug)}`;
}
