import type { TeachingImage } from "@/sanity/image-types";

export type Teaching = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  scripture: string;
  minutes: number;
  format?: "written" | "video";
  durationSeconds?: number | null;
  videoLabel?: string | null;
  video?: { url?: string | null; mimeType?: string | null } | null;
  coverImage?: TeachingImage | null;
};

export const book = {
  slug: "rapture-ready",
  title: "The Trumpet Is Blowing",
  subtitle: "Be Rapture Ready",
  author: "Evangelist Edwin Nwachukwu",
  description:
    "A call to watchfulness, biblical discernment, and spiritual readiness for the return of Jesus Christ.",
  chapters: 23,
  minutes: 134,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Teachings", href: "/teachings" },
  { label: "Library", href: "/library" },
  { label: "Gallery", href: "/gallery" },
];
