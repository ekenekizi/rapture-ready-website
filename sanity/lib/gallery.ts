import "server-only";

import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import { type GalleryPhoto } from "@/lib/gallery";
import {
  toGalleryPhoto,
  type PublishedGalleryPhoto,
} from "@/sanity/lib/gallery-photo";

const galleryQuery = defineQuery(`
  *[
    _type == "galleryPhoto" &&
    !(_id in path("drafts.**")) &&
    coalesce(isVisible, true) == true &&
    defined(title) &&
    defined(image.asset->url)
  ] | order(coalesce(displayOrder, 100) asc, photoDate desc, _createdAt desc) {
    _id,
    title,
    category, slug, description, minutes, scriptures, imageContext, imageKind, sensitiveImage, observation, reflectionTitle, reflection, responses,
    image { ..., "dimensions": asset->metadata.dimensions },
    source,
    "showOnHomepage": coalesce(showOnHomepage, true)
  }
`);

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  "use cache";

  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("gallery");

  const documents =
    await sanityClient.fetch<PublishedGalleryPhoto[]>(galleryQuery);

  return documents
    .map(toGalleryPhoto)
    .filter((photo): photo is GalleryPhoto => photo !== null);
}

