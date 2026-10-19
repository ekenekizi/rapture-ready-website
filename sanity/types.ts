import type { PortableTextBlock } from "@portabletext/types";
import type { Teaching } from "@/lib/content";
import type { TeachingImage } from "@/sanity/image-types";

export type TeachingSummary = Teaching & {
  _id: string;
  author: string;
  publishedAt: string;
};

export type TeachingBodyBlock = PortableTextBlock | TeachingImage;

export type PublishedTeaching = TeachingSummary & {
  body: TeachingBodyBlock[];
};
