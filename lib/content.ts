import type { TeachingImage } from "@/sanity/image-types";

export type Teaching = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  scripture: string;
  minutes: number;
  coverImage?: TeachingImage | null;
};

export const teachings: Teaching[] = [
  {
    slug: "what-is-the-rapture",
    title: "What Is the Rapture?",
    category: "Rapture",
    excerpt:
      "Understanding the promise of being caught up to meet the Lord, and the hope it gives every believer.",
    scripture: "1 Thessalonians 4:16–17",
    minutes: 8,
  },
  {
    slug: "the-wise-and-foolish-virgins",
    title: "Understanding the Wise and Foolish Virgins",
    category: "Spiritual Readiness",
    excerpt:
      "A call to examine our preparation through the parable of the ten virgins.",
    scripture: "Matthew 25:1–13",
    minutes: 10,
  },
  {
    slug: "what-does-it-mean-to-watch",
    title: "What Does It Mean to Watch?",
    category: "Christian Living",
    excerpt:
      "Watchfulness is a daily practice of prayer, discernment, and faithful living.",
    scripture: "Mark 13:37",
    minutes: 6,
  },
  {
    slug: "recognizing-false-teaching",
    title: "Recognizing False Teaching",
    category: "Discernment",
    excerpt: "Learning to test teachings and voices against the Word of God.",
    scripture: "1 John 4:1",
    minutes: 9,
  },
];

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
