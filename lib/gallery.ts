import photos from "./gallery-data.json";

export const galleryCategories = [
  "All photos",
  "Evangelism",
  "Fellowship",
  "Community outreach",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryPhoto = {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All photos">;
  src: string;
  alt: string;
  description: string;
  credit: string;
  source: string;
  portrait?: boolean;
  isSample: boolean;
};

// Local preview content. This can later be supplied by a Sanity query.
export const galleryPhotos = photos as GalleryPhoto[];

export function filterGallery(
  photos: GalleryPhoto[],
  category: GalleryCategory,
) {
  return category === "All photos"
    ? photos
    : photos.filter((photo) => photo.category === category);
}
