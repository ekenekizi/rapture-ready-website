import "server-only";
import data from "./rapture-ready.json";

export type BookBlock = {
  id: string;
  type: "heading" | "paragraph";
  text: string;
  sourcePage: number;
};

export type BookSection = {
  id: string;
  title: string;
  number: number | null;
  words: number;
  blocks: BookBlock[];
};

export type SectionSummary = Omit<BookSection, "blocks">;

export const readerBook = data as {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  startSectionId: string;
  sections: BookSection[];
};

export const sectionSummaries: SectionSummary[] = readerBook.sections.map(
  ({ id, title, number, words }) => ({
    id,
    title,
    number,
    words,
  }),
);
