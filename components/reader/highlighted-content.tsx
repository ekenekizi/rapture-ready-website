"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { BookBlock } from "@/lib/books/rapture-ready";
import { useHighlights, addHighlight } from "@/lib/highlight-storage";
import { getHighlightPieces, scrollToHighlight } from "@/lib/highlights";
import { captureSelection } from "@/lib/highlight-selection";

type HighlightedContentProps = {
  sectionId: string;
  blocks: BookBlock[];
};

export function HighlightedContent({
  sectionId,
  blocks,
}: HighlightedContentProps) {
  const root = useRef<HTMLDivElement>(null);
  const resolvedHash = useRef("");

  const [pending, setPending] =
    useState<ReturnType<typeof captureSelection>>(null);
  const [message, setMessage] = useState("");

  const { items, temporaryOnly } = useHighlights();

  const sectionHighlights = items.filter(
    (item) => item.sectionId === sectionId,
  );

  useEffect(() => {
    let frame = 0;

    const updateSelection = () => {
      if (document.activeElement?.closest("[data-highlight-tools]")) {
        return;
      }

      setPending(root.current ? captureSelection(root.current) : null);
    };

    const queue = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateSelection);
    };

    document.addEventListener("selectionchange", queue);
    window.addEventListener("scroll", queue, true);
    window.addEventListener("resize", queue);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("selectionchange", queue);
      window.removeEventListener("scroll", queue, true);
      window.removeEventListener("resize", queue);
    };
  }, [sectionId]);

  useEffect(() => {
    const restore = () => {
      const hash = window.location.hash;
      const target = `${sectionId}/${hash}`;

      if (!hash.startsWith("#highlight-") || resolvedHash.current === target) {
        return;
      }

      const id = hash.slice("#highlight-".length);

      if (scrollToHighlight(id)) {
        resolvedHash.current = target;
        return;
      }

      const saved = items.find(
        (item) => item.id === id && item.sectionId === sectionId,
      );

      const paragraph = saved
        ? document.getElementById(saved.segments[0].blockId)
        : null;

      if (paragraph) {
        paragraph.scrollIntoView({ block: "center" });
        resolvedHash.current = target;
      }
    };

    const frame = requestAnimationFrame(restore);
    window.addEventListener("hashchange", restore);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", restore);
    };
  }, [items, sectionId]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);

  function saveSelection() {
    if (!pending) return;

    const id =
      globalThis.crypto?.randomUUID?.() ??
      `h-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    addHighlight({
      id,
      sectionId,
      quote: pending.quote,
      segments: pending.segments,
      createdAt: Date.now(),
    });

    window.getSelection()?.removeAllRanges();
    setPending(null);
    setMessage("Highlight saved.");
  }

  return (
    <>
      <div ref={root}>
        {blocks.map((block) => {
          const Tag = block.type === "heading" ? "h2" : "p";

          return (
            <Tag key={block.id} id={block.id} data-block-id={block.id}>
              {getHighlightPieces(block.id, block.text, sectionHighlights).map(
                (piece) =>
                  piece.highlighted ? (
                    <mark key={piece.start} className="reader-highlight">
                      {piece.anchors.map((id) => (
                        <span
                          key={id}
                          id={`highlight-${id}`}
                          className="highlight-anchor"
                          aria-hidden="true"
                        />
                      ))}

                      {piece.text}
                    </mark>
                  ) : (
                    <Fragment key={piece.start}>{piece.text}</Fragment>
                  ),
              )}
            </Tag>
          );
        })}
      </div>

      {pending && (
        <div
          data-highlight-tools
          className="reader-highlight-tools"
          role="toolbar"
          aria-label="Selected passage actions"
        >
          <button
            type="button"
            className="save-highlight"
            onPointerDown={(event) => event.preventDefault()}
            onClick={saveSelection}
          >
            Highlight selection <span aria-hidden="true">✦</span>
          </button>
          <button
            type="button"
            className="dismiss-highlight"
            aria-label="Dismiss highlighting"
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => {
              setPending(null);
              window.getSelection()?.removeAllRanges();
            }}
          >
            ×
          </button>
        </div>
      )}

      <p className={message ? "highlight-toast" : "sr-only"} role="status" aria-live="polite">
        {message}
        {temporaryOnly
          ? " Browser storage unavailable; highlights are kept for this visit."
          : ""}
      </p>
    </>
  );
}
