import type { Metadata } from "next";

const configuredUrl = new URL(
  process.env.SITE_URL || "https://www.endtimewatch.org",
);
if (!["https:", "http:"].includes(configuredUrl.protocol)) {
  throw new Error("SITE_URL must be an absolute HTTP or HTTPS website URL.");
}
export const siteUrl = configuredUrl.origin;
export const siteDescription =
  "Biblical teachings on the Rapture, the end times, and spiritual discernment to help believers prepare for the return of Jesus Christ.";
export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).href;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  article?: { publishedTime?: string; authors: string[] };
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  article,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle =
    title === "Endtime Watch" ? title : `${title} | Endtime Watch`;
  const preview = image ?? {
    url: absoluteUrl("/social-preview.png"),
    width: 1200,
    height: 630,
    alt: "Endtime Watch — Watch. Discern. Be Ready.",
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...(article
        ? { type: "article" as const, ...article }
        : { type: "website" as const }),
      title: socialTitle,
      description,
      siteName: "Endtime Watch",
      url,
      images: [preview],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: preview.url, alt: preview.alt }],
    },
  };
}
