"use client";

import Link from "next/link";
import { useReaderState } from "@/lib/reader-storage";
import type { SectionSummary } from "@/lib/books/rapture-ready";

type ContinueReadingLinkProps = {
  sections: SectionSummary[];
  startSectionId: string;
};

export function ContinueReadingLink({
  sections,
  startSectionId,
}: ContinueReadingLinkProps) {
  const state = useReaderState();

  const previous = sections.find(
    (section) => section.id === state.lastSectionId,
  );

  const sectionId = previous?.id ?? startSectionId;

  const totalWords = sections.reduce((sum, section) => sum + section.words, 0);

  const completedWords = sections.reduce(
    (sum, section) =>
      sum +
      (state.completedSectionIds.includes(section.id) ? section.words : 0),
    0,
  );

  const percentage = totalWords
    ? Math.round((completedWords / totalWords) * 100)
    : 0;

  return (
    <div>
      <Link
        href={`/read/rapture-ready/${sectionId}`}
        className="inline-flex min-h-12 items-center justify-center gap-5 rounded-sm bg-navy px-6 py-3 text-xs text-white hover:bg-navy-soft"
      >
        {previous ? "Continue Reading" : "Read Online"}
        <span aria-hidden="true">→</span>
      </Link>

      {previous && (
        <p className="mt-3 text-xs leading-6 text-muted">
          {previous.title} · {percentage}% complete
          {state.temporaryOnly
            ? " · Saved for this visit"
            : " · Saved on this device"}
        </p>
      )}
    </div>
  );
}
