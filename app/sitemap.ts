import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { absoluteUrl } from "@/lib/seo";
import { getGalleryPhotos } from "@/sanity/lib/gallery";
import { galleryStudyPath } from "@/lib/gallery";
import { getTeachings } from "@/sanity/lib/teachings";
import { sectionSummaries } from "@/lib/books/rapture-ready";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  // Keep article discovery in sync with publishing and unpublishing.
  cacheTag("teachings", "gallery");
  const [teachings, photos] = await Promise.all([
    getTeachings(),
    getGalleryPhotos(),
  ]);
  return [
    ...[
      "/",
      "/about",
      "/teachings",
      "/gallery",
      "/library",
      "/library/rapture-ready",
    ].map((path) => ({ url: absoluteUrl(path) })),
    ...sectionSummaries.map((section) => ({
      url: absoluteUrl(`/read/rapture-ready/${encodeURIComponent(section.id)}`),
    })),
    ...photos.map((photo) => ({
      url: absoluteUrl(galleryStudyPath(photo.slug)),
    })),
    ...teachings.map((teaching) => ({
      url: absoluteUrl(`/teachings/${encodeURIComponent(teaching.slug)}`),
    })),
  ];
}
