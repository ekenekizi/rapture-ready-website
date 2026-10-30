import type { TeachingImage } from "@/sanity/image-types";

export type ScriptureQuote = { text: string; reference: string };
export type MinistrySection = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
};
export type TeachingDefinition = {
  label?: string;
  title: string;
  definition: string;
  explanation: string;
  scriptures?: string;
  summary?: string;
};
export type HomePageContent = {
  hero: {
    eyebrow?: string;
    headline: string;
    emphasis?: string;
    description: string;
    scripture?: ScriptureQuote;
    image?: TeachingImage | null;
    imageCaption?: string;
    values?: string[];
  };
  mission?: MinistrySection & {
    pillars?: { _key: string; title: string; description: string }[];
  };
  explainer?: {
    eyebrow?: string;
    title: string;
    endtime: TeachingDefinition;
    rapture: TeachingDefinition;
    scripture?: ScriptureQuote;
    closingStatement?: string;
  };
  scripture?: ScriptureQuote;
  about?: MinistrySection;
  finalCta?: { eyebrow?: string; title: string; description: string };
};
export type AboutPageContent = {
  eyebrow?: string;
  title: string;
  introduction: string;
  sectionTitle?: string;
  image?: TeachingImage | null;
  paragraphs: string[];
};
export type SiteSettings = {
  seoDescription?: string;
  footerDescription?: string;
  footerSlogan?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  xUrl?: string;
  contactEmail?: string;
};
