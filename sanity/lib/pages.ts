import "server-only";
import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { sanityClient } from "@/sanity/lib/client";
import type {
  AboutPageContent,
  HomePageContent,
  SiteSettings,
} from "@/sanity/page-types";

const homeQuery = defineQuery(
  `*[_type == "homePage" && _id == "home-page"][0]{hero{..., image{..., "dimensions": asset->metadata.dimensions}}, mission, explainer, scripture, about, finalCta}`,
);
const aboutQuery = defineQuery(
  `*[_type == "aboutPage" && _id == "about-page"][0]{eyebrow, title, introduction, sectionTitle, paragraphs, image{..., "dimensions": asset->metadata.dimensions}}`,
);
const settingsQuery = defineQuery(
  `*[_type == "siteSettings" && _id == "site-settings"][0]{seoDescription, footerDescription, footerSlogan, facebookUrl, tiktokUrl, xUrl, contactEmail}`,
);

export async function getHomePage(): Promise<HomePageContent | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("ministry-pages");
  return sanityClient.fetch<HomePageContent | null>(homeQuery);
}
export async function getAboutPage(): Promise<AboutPageContent | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("ministry-pages");
  return sanityClient.fetch<AboutPageContent | null>(aboutQuery);
}
export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  cacheTag("site-settings");
  try {
    return await sanityClient.fetch<SiteSettings | null>(settingsQuery);
  } catch (error) {
    // Next.js control-flow exceptions must still reach the framework.
    unstable_rethrow(error);
    console.error("Unable to load optional Sanity website settings.");
    // Keep pages usable without turning a short outage into an hour-long fallback.
    cacheLife({ stale: 0, revalidate: 5, expire: 30 });
    return null;
  }
}
