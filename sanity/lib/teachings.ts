import "server-only";

import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import type { TeachingSummary, PublishedTeaching } from "@/sanity/types";

const teachingsQuery = defineQuery(`
  *[
    _type == "teaching" &&
    defined(title) &&
    defined(slug.current)
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category, "Biblical Teaching"),
    "excerpt": coalesce(excerpt, ""),
    "scripture": coalesce(scripture, ""),
    "minutes": coalesce(minutes, 8),
    "author": coalesce(author, "Endtime Watch"),
    publishedAt,
    coverImage { ..., "dimensions": asset->metadata.dimensions }
  }
`);

const teachingQuery = defineQuery(`
  *[
    _type == "teaching" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    "category": coalesce(category, "Biblical Teaching"),
    "excerpt": coalesce(excerpt, ""),
    "scripture": coalesce(scripture, ""),
    "minutes": coalesce(minutes, 8),
    "author": coalesce(author, "Endtime Watch"),
    publishedAt,
    coverImage { ..., "dimensions": asset->metadata.dimensions },
    "body": coalesce(body[] {
      ...,
      _type == "teachingImage" => {
        "dimensions": asset->metadata.dimensions
      }
    }, [])
  }
`);

export async function getTeachings(): Promise<TeachingSummary[]> {
  "use cache";

  cacheLife({
    stale: 30,
    revalidate: 60,
    expire: 3600,
  });

  cacheTag("teachings");

  return sanityClient.fetch<TeachingSummary[]>(teachingsQuery);
}

export async function getTeaching(
  slug: string,
): Promise<PublishedTeaching | null> {
  "use cache";

  cacheLife({
    stale: 30,
    revalidate: 60,
    expire: 3600,
  });

  cacheTag("teachings");

  return sanityClient.fetch<PublishedTeaching | null>(teachingQuery, { slug });
}
