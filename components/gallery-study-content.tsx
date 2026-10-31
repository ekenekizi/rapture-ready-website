import type { ReactNode } from "react";
import type { GalleryPhoto } from "@/lib/gallery";
import { GalleryStudyImage } from "@/components/gallery-study-image";

export function GalleryStudyContent({
  photo,
  number,
  total,
  headingId,
  headingLevel = "h2",
  footer,
}: {
  photo: GalleryPhoto;
  number: number;
  total: number;
  headingId: string;
  headingLevel?: "h1" | "h2";
  footer?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <div className="prophecy-study-layout">
      <aside className="prophecy-study-visual">
        <GalleryStudyImage photo={photo} />
        <p>
          {photo.imageContext || "Image context has not been provided yet."}
        </p>
        <p>
          {photo.imageKind === "illustration"
            ? "Symbolic illustration / artwork"
            : photo.imageKind === "photograph"
              ? "Photograph"
              : "Image origin not verified"}
          {photo.credit ? ` · ${photo.credit}` : ""}
          {photo.source && (
            <>
              {" "}
              ·{" "}
              <a
                className="underline underline-offset-4"
                href={photo.source}
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
            {photo.minutes ? `${photo.minutes} MIN READ` : "PHOTO STUDY"}
          </span>
          <span>
            IMAGE {number} OF {total}
          </span>
        </div>
      </aside>
      <div className="prophecy-study-reading">
        <div className="eyebrow gold">{photo.category}</div>
        <Heading id={headingId}>{photo.title}</Heading>
        {photo.description && (
          <p className="prophecy-study-deck">{photo.description}</p>
        )}
        <section className="prophecy-scripture-first">
          <div className="eyebrow gold">01 / WHAT THE BIBLE SAYS FIRST</div>
          {photo.scriptures.length ? (
            photo.scriptures.map((verse, index) => (
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
            {photo.observation ||
              "The image explanation will be available soon."}
          </p>
        </section>
        <section>
          <div className="eyebrow">03 / A BIBLICAL REFLECTION</div>
          <h3>{photo.reflectionTitle || "Consider the Scriptures"}</h3>
          <p className="whitespace-pre-line">
            {photo.reflection ||
              "The ministry’s reflection will be available soon."}
          </p>
        </section>
        <section className="prophecy-reflect">
          <div className="eyebrow gold">04 / REFLECT & RESPOND</div>
          <h3>Bring the study into prayer.</h3>
          {photo.responses.length ? (
            <ul>
              {photo.responses.map((response, index) => (
                <li key={index}>{response}</li>
              ))}
            </ul>
          ) : (
            <p>Reflection questions will be available soon.</p>
          )}
        </section>
        <p className="prophecy-interpretation">
          Theological commentary reflects the ministry’s perspective. Consider
          the full biblical context alongside each image’s provenance.
        </p>
        {footer}
      </div>
    </div>
  );
}

