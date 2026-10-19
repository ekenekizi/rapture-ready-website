export type HighlightSegment = {
  blockId: string;
  start: number;
  end: number;
  text: string;
};

export type BookHighlight = {
  id: string;
  sectionId: string;
  quote: string;
  segments: HighlightSegment[];
  createdAt: number;
};

export function isHighlight(value: unknown): value is BookHighlight {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<BookHighlight>;

  return (
    typeof item.id === "string" &&
    /^[a-zA-Z0-9_-]+$/.test(item.id) &&
    typeof item.sectionId === "string" &&
    item.sectionId.length > 0 &&
    typeof item.quote === "string" &&
    item.quote.trim().length > 0 &&
    typeof item.createdAt === "number" &&
    Number.isFinite(item.createdAt) &&
    Array.isArray(item.segments) &&
    item.segments.length > 0 &&
    item.segments.every(
      (segment) =>
        segment &&
        typeof segment === "object" &&
        typeof segment.blockId === "string" &&
        /^page-\d+-\d+$/.test(segment.blockId) &&
        Number.isInteger(segment.start) &&
        Number.isInteger(segment.end) &&
        segment.start >= 0 &&
        segment.end > segment.start &&
        typeof segment.text === "string" &&
        segment.text.length === segment.end - segment.start,
    )
  );
}

export function getHighlightPieces(
  blockId: string,
  text: string,
  highlights: BookHighlight[],
) {
  const ranges = highlights.flatMap((highlight) =>
    highlight.segments.flatMap((segment, index) => {
      if (
        segment.blockId !== blockId ||
        segment.end > text.length ||
        text.slice(segment.start, segment.end) !== segment.text
      ) {
        return [];
      }

      return [
        {
          ...segment,
          highlightId: highlight.id,
          first: index === 0,
        },
      ];
    }),
  );

  const boundaries = [
    ...new Set([
      0,
      text.length,
      ...ranges.flatMap((range) => [range.start, range.end]),
    ]),
  ].sort((a, b) => a - b);

  return boundaries.slice(0, -1).map((start, index) => {
    const end = boundaries[index + 1];

    const active = ranges.filter(
      (range) => range.start <= start && range.end >= end,
    );

    return {
      start,
      text: text.slice(start, end),
      highlighted: active.length > 0,
      anchors: active
        .filter((range) => range.first && range.start === start)
        .map((range) => range.highlightId),
    };
  });
}

export function scrollToHighlight(id: string): boolean {
  const anchor = document.getElementById(`highlight-${id}`);

  if (!anchor) return false;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  anchor.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "center",
  });

  return true;
}
