"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useHighlights, removeHighlight } from "@/lib/highlight-storage";
import { scrollToHighlight, type BookHighlight } from "@/lib/highlights";
import type { SectionSummary } from "@/lib/books/rapture-ready";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  sectionId: string;
  sections: SectionSummary[];
};

export function HighlightsPanel({ open, onClose, title, sectionId, sections }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { items, temporaryOnly } = useHighlights();
  const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      window.getSelection()?.removeAllRanges();
      element.showModal();
    } else if (!open && element.open) element.close();
  }, [open]);

  function goToPassage(highlight: BookHighlight) {
    const section = sections.find((item) => item.id === highlight.sectionId);
    if (!section) return;
    dialog.current?.close();
    onClose();
    const hash = `#highlight-${highlight.id}`;
    if (section.id === sectionId) {
      window.history.replaceState(window.history.state, "", hash);
      if (!scrollToHighlight(highlight.id)) {
        document.getElementById(highlight.segments[0].blockId)
          ?.scrollIntoView({ block: "center" });
      }
    } else {
      router.push(`/read/rapture-ready/${encodeURIComponent(section.id)}${hash}`, { scroll: false });
    }
  }

  return (
    <dialog ref={dialog} id="reader-highlights" className="highlights-drawer"
      aria-labelledby="highlights-heading" onCancel={onClose} onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}>
      <div className="highlights-drawer-head">
        <h2 id="highlights-heading">Your highlights</h2>
        <button type="button" onClick={onClose} aria-label="Close highlights">×</button>
      </div>
      <p className="highlight-bookname">{title}</p>
      <p className="highlight-saving-note">
        {temporaryOnly ? "Available for this visit · Device storage unavailable"
          : `Saved on this device · ${items.length} passage${items.length === 1 ? "" : "s"}`}
      </p>
      {sorted.length ? sorted.map((highlight) => {
        const section = sections.find((item) => item.id === highlight.sectionId);
        const page = Number(highlight.segments[0].blockId.split("-")[1]);
        return (
          <article key={highlight.id} className="highlight-item">
            <p className="highlight-source">
              {section?.number ? `Chapter ${section.number}` : section?.title ?? "Reading passage"}
              {page > 0 && ` · ${page >= 16 && page <= 119 ? `Print page ${page - 15}` : `PDF page ${page}`}`}
            </p>
            <h3>{section?.title ?? "Section unavailable"}</h3>
            <blockquote>{highlight.quote}</blockquote>
            <div className="highlight-item-actions">
              <button className="highlight-go" type="button" disabled={!section}
                onClick={() => goToPassage(highlight)}>Go to passage →</button>
              <button className="remove-highlight" type="button"
                onClick={() => removeHighlight(highlight.id)}
                aria-label={`Remove highlight from ${section?.title ?? "this section"}`}>Remove</button>
            </div>
          </article>
        );
      }) : (
        <div className="highlights-empty">
          <span aria-hidden="true">✦</span>
          <h3>Keep the words that stay with you.</h3>
          <p>Select a passage, then choose <strong>Highlight selection</strong>.
            Your saved passages will appear here, each with a link back to its place in the book.</p>
        </div>
      )}
      <p className="highlight-privacy">
        No account needed. Highlights stay in this browser and can be lost if its saved site data is cleared.
      </p>
    </dialog>
  );
}
