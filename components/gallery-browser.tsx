"use client";
import { useCallback, useId, useState, useSyncExternalStore } from "react";
import { SiteDialog } from "@/components/site-dialog";
import { ContentEmpty } from "@/components/content-empty";
import { GalleryStudyCard } from "@/components/gallery-study-card";
import { GalleryStudyImage } from "@/components/gallery-study-image";
import { ShareGalleryStudyButton } from "@/components/share-gallery-study-button";
import {
  galleryCategories,
  filterGallery,
  type GalleryCategory,
  type GalleryPhoto,
} from "@/lib/gallery";

function subscribeHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}
function currentStudy() {
  return new URLSearchParams(window.location.hash.slice(1)).get("study") || "";
}
function setStudy(slug: string) {
  // Replace the fragment without scrolling or creating a history entry per study.
  const url = new URL(window.location.href);
  url.hash = slug ? `study=${encodeURIComponent(slug)}` : "";
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
export function GalleryBrowser({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState<GalleryCategory>("All studies");
  const slug = useSyncExternalStore(subscribeHash, currentStudy, () => "");
  const active = photos.find((photo) => photo.slug === slug);
  const filtered = filterGallery(photos, category);
  const headingId = useId();
  const closeStudy = useCallback(() => setStudy(""), []);
  const sequence =
    active && !filtered.some((photo) => photo.id === active.id)
      ? photos
      : filtered;
  const activeIndex = sequence.findIndex((photo) => photo.id === active?.id);
  function step(direction: number) {
    if (!sequence.length) return;
    setStudy(
      sequence[(activeIndex + direction + sequence.length) % sequence.length]
        .slug,
    );
  }
  return (
    <>
      <div className="gallery-collection-head">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter photo studies"
        >
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={`chip ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite">
          {filtered.length} photo {filtered.length === 1 ? "study" : "studies"}
        </p>
      </div>
      <div className="prophecy-context-note">
        <span aria-hidden="true">ⓘ</span>
        <p>
          <strong>A note on context.</strong> These visual studies present the
          ministry’s biblical interpretation. Read each image’s source and
          context notes; a photograph alone does not establish a fulfilled
          prophecy.
        </p>
      </div>
      {slug && !active && (
        <p className="mb-6 text-sm text-muted" role="status">
          This study is unavailable or is no longer published. You can explore
          the collection below.
        </p>
      )}
      <div className="prophecy-grid">
        {filtered.map((photo) => (
          <GalleryStudyCard
            key={photo.id}
            photo={photo}
            number={photos.indexOf(photo) + 1}
            onOpen={() => setStudy(photo.slug)}
          />
        ))}
      </div>
      {!filtered.length && (
        <ContentEmpty
          title={
            photos.length
              ? "No studies in this topic yet."
              : "Photo studies are coming soon."
          }
          description={
            photos.length
              ? "Choose another topic to explore the collection."
              : "New images, Scripture passages, and biblical reflections will appear here when published."
          }
        />
      )}
      <SiteDialog
        open={Boolean(active)}
        onClose={closeStudy}
        labelledBy={headingId}
        className="prophecy-study"
      >
        {active && (
          <>
            <header className="prophecy-study-toolbar">
              <span className="eyebrow">
                PHOTO STUDY{" "}
                {String(photos.indexOf(active) + 1).padStart(2, "0")} ·{" "}
                {active.category}
              </span>
              <div className="prophecy-study-tools">
                <ShareGalleryStudyButton
                  title={active.title}
                  slug={active.slug}
                  excerpt={active.description}
                  returnToStudy
                />
                <button
                  type="button"
                  className="h-11 w-11 shrink-0 text-xl"
                  aria-label="Close photo study"
                  onClick={closeStudy}
                >
                  ×
                </button>
              </div>
            </header>
            <div key={active.id} className="prophecy-study-layout">
              <aside className="prophecy-study-visual">
                <GalleryStudyImage photo={active} />
                <p>
                  {active.imageContext ||
                    "Image context has not been provided yet."}
                </p>
                <p>
                  {active.imageKind === "illustration"
                    ? "Symbolic illustration / artwork"
                    : active.imageKind === "photograph"
                      ? "Photograph"
                      : "Image origin not verified"}
                  {active.credit ? ` · ${active.credit}` : ""}
                  {active.source && (
                    <>
                      {" "}
                      ·{" "}
                      <a
                        className="underline underline-offset-4"
                        href={active.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Original source ↗
                      </a>
                    </>
                  )}
                </p>
                <div className="prophecy-study-meta">
                  <span>
                    {active.minutes
                      ? `${active.minutes} MIN READ`
                      : "PHOTO STUDY"}
                  </span>
                  <span>
                    IMAGE {photos.indexOf(active) + 1} OF {photos.length}
                  </span>
                </div>
              </aside>
              <div className="prophecy-study-reading">
                <div className="eyebrow gold">{active.category}</div>
                <h2 id={headingId}>{active.title}</h2>
                {active.description && (
                  <p className="prophecy-study-deck">{active.description}</p>
                )}
                <section className="prophecy-scripture-first">
                  <div className="eyebrow gold">
                    01 / WHAT THE BIBLE SAYS FIRST
                  </div>
                  {active.scriptures.length ? (
                    active.scriptures.map((verse, index) => (
                      <blockquote key={index}>
                        <p>“{verse.quotation}”</p>
                        <cite>{verse.reference}</cite>
                      </blockquote>
                    ))
                  ) : (
                    <p className="mt-5 text-sm text-muted">
                      Scripture passages for this study will be available soon.
                    </p>
                  )}
                </section>
                <section>
                  <div className="eyebrow">02 / READING THE IMAGE</div>
                  <h3>What is visible</h3>
                  <p className="whitespace-pre-line">
                    {active.observation ||
                      "The image explanation will be available soon."}
                  </p>
                </section>
                <section>
                  <div className="eyebrow">03 / A BIBLICAL REFLECTION</div>
                  <h3>{active.reflectionTitle || "Consider the Scriptures"}</h3>
                  <p className="whitespace-pre-line">
                    {active.reflection ||
                      "The ministry’s reflection will be available soon."}
                  </p>
                </section>
                <section className="prophecy-reflect">
                  <div className="eyebrow gold">04 / REFLECT & RESPOND</div>
                  <h3>Bring the study into prayer.</h3>
                  {active.responses.length ? (
                    <ul>
                      {active.responses.map((response, index) => (
                        <li key={index}>{response}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Reflection questions will be available soon.</p>
                  )}
                </section>
                <p className="prophecy-interpretation">
                  Theological commentary reflects the ministry’s perspective.
                  Consider the full biblical context alongside each image’s
                  provenance.
                </p>
                {sequence.length > 1 && (
                  <div className="prophecy-study-bottom">
                    <button
                      type="button"
                      className="textlink"
                      onClick={(event) => {
                        event.currentTarget
                          .closest("dialog")
                          ?.scrollTo({ top: 0 });
                        step(-1);
                      }}
                    >
                      ← Previous study
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={(event) => {
                        event.currentTarget
                          .closest("dialog")
                          ?.scrollTo({ top: 0 });
                        step(1);
                      }}
                    >
                      Next study →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </SiteDialog>
    </>
  );
}
