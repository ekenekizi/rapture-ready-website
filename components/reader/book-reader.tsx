"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import type { SectionSummary } from "@/lib/books/rapture-ready";
import {
  useReaderState,
  updateReaderState,
  type ReaderSettings,
} from "@/lib/reader-storage";
import { useHighlights } from "@/lib/highlight-storage";
import { HighlightsPanel } from "@/components/reader/highlights-panel";

type BookReaderProps = {
  title: string;
  author: string;
  sections: SectionSummary[];
  sectionId: string;
  children: ReactNode;
};

export function BookReader({
  title,
  author,
  sections,
  sectionId,
  children,
}: BookReaderProps) {
  const [contentsOpen, setContentsOpen] = useState(false);
  const [desktopContentsOpen, setDesktopContentsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const state = useReaderState();
  const { items: highlights } = useHighlights();
  const [highlightsOpen, setHighlightsOpen] = useState(false);

  const index = sections.findIndex((section) => section.id === sectionId);

  const section = sections[index];
  const previous = sections[index - 1];
  const next = sections[index + 1];

  const complete = state.completedSectionIds.includes(sectionId);

  const totalWords = sections.reduce((sum, item) => sum + item.words, 0);

  const completedWords = sections.reduce(
    (sum, item) =>
      sum + (state.completedSectionIds.includes(item.id) ? item.words : 0),
    0,
  );

  const percentage = totalWords
    ? Math.round((completedWords / totalWords) * 100)
    : 0;

  useEffect(() => {
    updateReaderState((current) => ({
      ...current,
      lastSectionId: sectionId,
    }));
  }, [sectionId]);

  function changeSettings(patch: Partial<ReaderSettings>) {
    updateReaderState((current) => ({
      ...current,
      settings: {
        ...current.settings,
        ...patch,
      },
    }));
  }

  function markComplete() {
    updateReaderState((current) => ({
      ...current,
      completedSectionIds: [
        ...new Set([...current.completedSectionIds, sectionId]),
      ],
    }));
  }

  return (
    <div
      className="reader-shell"
      data-theme={state.settings.theme}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setContentsOpen(false);
          setSettingsOpen(false);
          setHighlightsOpen(false);
        }
      }}
    >
      <header className="reader-toolbar">
        <Link href="/library" className="reader-back">
          ← Library
        </Link>

        <span className="reader-book-title">{title}</span>

        <span className="reader-progress-label">{percentage}% complete</span>

        <button
          className="reader-mobile-toggle"
          type="button"
          aria-expanded={contentsOpen}
          aria-controls="reader-contents"
          onClick={() => {
            setContentsOpen(!contentsOpen);
            setSettingsOpen(false);
            setHighlightsOpen(false);
          }}
        >
          Contents
        </button>

        <button
          className="reader-desktop-toggle"
          type="button"
          aria-expanded={desktopContentsOpen}
          aria-controls="reader-contents"
          onClick={() => setDesktopContentsOpen(!desktopContentsOpen)}
        >
          Contents
        </button>

        <button
          type="button"
          aria-expanded={settingsOpen}
          aria-controls="reader-settings"
          onClick={() => {
            setSettingsOpen(!settingsOpen);
            setContentsOpen(false);
            setHighlightsOpen(false);
          }}
        >
          Aa
          <span className="sr-only"> Reading settings</span>
        </button>

      </header>

      <HighlightsPanel
        title={title}
        open={highlightsOpen}
        onClose={() => setHighlightsOpen(false)}
        sectionId={sectionId}
        sections={sections}
      />

      <div
        className="reader-progress-track"
        role="progressbar"
        aria-label="Book completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>

      <aside
        id="reader-settings"
        className="reader-settings"
        hidden={!settingsOpen}
        aria-label="Reading settings"
      >
        <div className="reader-panel-heading">
          <h2>Reading settings</h2>

          <button
            type="button"
            aria-label="Close reading settings"
            onClick={() => setSettingsOpen(false)}
          >
            ×
          </button>
        </div>

        <label>
          Font size
          <select
            value={state.settings.fontSize}
            onChange={(event) =>
              changeSettings({
                fontSize: Number(event.target.value),
              })
            }
          >
            {[18, 20, 22, 24].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </label>

        <label>
          Line spacing
          <select
            value={state.settings.lineHeight}
            onChange={(event) =>
              changeSettings({
                lineHeight: Number(event.target.value),
              })
            }
          >
            {[1.7, 1.9, 2.1].map((spacing) => (
              <option key={spacing} value={spacing}>
                {spacing}
              </option>
            ))}
          </select>
        </label>

        <label>
          Reading width
          <select
            value={state.settings.width}
            onChange={(event) =>
              changeSettings({
                width: event.target.value === "wide" ? "wide" : "comfortable",
              })
            }
          >
            <option value="comfortable">Comfortable</option>
            <option value="wide">Wide</option>
          </select>
        </label>

        <fieldset>
          <legend>Reading theme</legend>

          <div className="reader-theme-options">
            {(["light", "sepia", "dark"] as const).map((theme) => (
              <button
                key={theme}
                type="button"
                aria-pressed={state.settings.theme === theme}
                onClick={() => changeSettings({ theme })}
              >
                {theme}
              </button>
            ))}
          </div>
        </fieldset>
      </aside>

      <div
        className={`reader-layout ${
          desktopContentsOpen ? "" : "contents-collapsed"
        }`}
      >
        <aside
          id="reader-contents"
          className={`reader-contents ${contentsOpen ? "is-open" : ""}`}
          aria-label="Table of contents"
        >
          <div className="reader-panel-heading">
            <h2>{title}</h2>

            <button
              type="button"
              aria-label="Close table of contents"
              onClick={() => setContentsOpen(false)}
            >
              ×
            </button>
          </div>

          <p className="reader-author">{author}</p>

          <nav aria-label="Book sections">
            {sections.map((item) => (
              <Link
                key={item.id}
                href={`/read/rapture-ready/${item.id}`}
                aria-current={item.id === sectionId ? "page" : undefined}
                onClick={() => setContentsOpen(false)}
              >
                <span className="reader-section-number">
                  {item.number ? String(item.number).padStart(2, "0") : "—"}
                </span>

                <span>{item.title}</span>

                {state.completedSectionIds.includes(item.id) && (
                  <span aria-label="Completed">✓</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        <main id="main-content" className="reader-main">
          <article
            className="reader-column"
            style={
              {
                maxWidth: state.settings.width === "wide" ? "850px" : "680px",
                "--reader-font-size": `${state.settings.fontSize}px`,
                "--reader-line-height": state.settings.lineHeight,
              } as CSSProperties
            }
          >
            <p className="reader-eyebrow">
              {section.number
                ? `Chapter ${section.number} of 23`
                : "Endtime Watch publications"}
            </p>

            <h1>{section.title}</h1>

            <p className="reader-save-status" role="status">
              {percentage}% complete ·{" "}
              {state.temporaryOnly
                ? "Browser storage unavailable. Progress is kept for this visit."
                : "Progress saved automatically on this device"}
            </p>

            <div className="highlight-access">
              <button
                type="button"
                className="highlights-button"
                aria-expanded={highlightsOpen}
                aria-controls="reader-highlights"
                onClick={() => {
                  setHighlightsOpen(true);
                  setSettingsOpen(false);
                  setContentsOpen(false);
                }}
              >
                ▤ &nbsp; Highlights <span>{highlights.length}</span>
              </button>
              <small>Select a passage to highlight it.</small>
            </div>

            <div className="reader-prose">{children}</div>

            <div className="reader-chapter-end">
              <p>{complete ? "Section complete" : "Finished this section?"}</p>

              <button
                type="button"
                className="reader-primary"
                onClick={markComplete}
                disabled={complete}
              >
                {complete ? "Completed ✓" : "Mark as complete"}
              </button>
            </div>

            <nav
              className="reader-chapter-navigation"
              aria-label="Chapter navigation"
            >
              {previous ? (
                <Link href={`/read/rapture-ready/${previous.id}`}>
                  ← Previous
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  href={`/read/rapture-ready/${next.id}`}
                  onClick={markComplete}
                >
                  Continue →<span>{next.title}</span>
                </Link>
              ) : (
                <Link href="/library">Return to Library →</Link>
              )}
            </nav>
          </article>
        </main>
      </div>
    </div>
  );
}
