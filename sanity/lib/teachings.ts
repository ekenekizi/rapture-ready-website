import "server-only";

import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import { playableVideo, isVideoTeaching } from "@/lib/video-teachings";
import type { TeachingSummary, PublishedTeaching } from "@/sanity/types";

const teachingsQuery = defineQuery(`
  *[
    _type == "teaching" &&
    coalesce(isVisible, true) == true &&
    !(_id in path("drafts.**")) &&
    coalesce(format, "written") in ["written", "video"] &&
    ((format == "video" && defined(videoFile.asset->url) && videoFile.asset->mimeType == "video/mp4") || (coalesce(format, "written") == "written" && count(body) > 0)) &&
    defined(title) &&
    defined(slug.current)
  ] | order(publishedAt desc) {
    _id,
    "format": coalesce(format, "written"), durationSeconds, videoLabel,
    "video": videoFile { "url": asset->url, "mimeType": asset->mimeType },
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
    coalesce(isVisible, true) == true &&
    !(_id in path("drafts.**")) &&
    coalesce(format, "written") in ["written", "video"] &&
    ((format == "video" && defined(videoFile.asset->url) && videoFile.asset->mimeType == "video/mp4") || (coalesce(format, "written") == "written" && count(body) > 0)) &&
    slug.current == $slug
  ][0] {
    _id,
    "format": coalesce(format, "written"), durationSeconds, videoLabel,
    "video": videoFile { "url": asset->url, "mimeType": asset->mimeType },
    title,
    "slug": slug.current,
    "category": coalesce(category, "Biblical Teaching"),
    "excerpt": coalesce(excerpt, ""),
    "scripture": coalesce(scripture, ""),
    "minutes": coalesce(minutes, 8),
    "author": coalesce(author, "Endtime Watch"),
    publishedAt,
    coverImage { ..., "dimensions": asset->metadata.dimensions },
    scriptureQuote, reflectionPoints, captionsLanguage,
    "captions": captionsFile { "url": asset->url },
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

  const items = await sanityClient.fetch<TeachingSummary[]>(teachingsQuery);
  return items.filter((item) => !isVideoTeaching(item) || playableVideo(item));
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

  const item = await sanityClient.fetch<PublishedTeaching | null>(
    teachingQuery,
    { slug },
  );
  return item && (!isVideoTeaching(item) || playableVideo(item)) ? item : null;
}
