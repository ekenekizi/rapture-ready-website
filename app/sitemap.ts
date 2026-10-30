import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { absoluteUrl } from "@/lib/seo";
import { getTeachings } from "@/sanity/lib/teachings";
import { sectionSummaries } from "@/lib/books/rapture-ready";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  // Keep article discovery in sync with publishing and unpublishing.
  cacheTag("teachings");
  const teachings = await getTeachings();
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
    ...teachings.map((teaching) => ({
      url: absoluteUrl(`/teachings/${encodeURIComponent(teaching.slug)}`),
    })),
  ];
}
