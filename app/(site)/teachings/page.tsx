import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getTeachings } from "@/sanity/lib/teachings";
import { TeachingBrowser } from "@/components/teaching-browser";
export const metadata: Metadata = pageMetadata({
  title: "Teachings",
  description:
    "Read written teachings and watch short biblical videos on the Rapture, Christian living, prophecy, and spiritual discernment from Endtime Watch.",
  path: "/teachings",
});
export default async function TeachingsPage() {
  const teachings = await getTeachings();
  return (
    <main id="main-content" className="teaching-hub video-surface">
      <div className="video-wrap">
        <header className="teaching-hub-hero">
          <div className="eyebrow gold">
            BIBLICAL PERSPECTIVES · WRITTEN & VIDEO TEACHINGS
          </div>
          <h1>Understand the Times</h1>
          <p>
            Read with intention. Watch with understanding. <br />
            Biblical teaching for a discerning heart and a life of faithful
            readiness.
          </p>
        </header>
        <Suspense
          fallback={
            <p role="status" className="py-8 text-sm text-muted">
              Loading teachings…
            </p>
          }
        >
          <TeachingBrowser teachings={teachings} />
        </Suspense>
        <section className="video-quiet-quote">
          <blockquote>
            “Thy word is a lamp unto my feet,
            <br />
            and a light unto my path.”
          </blockquote>
          <cite>PSALM 119:105</cite>
        </section>
      </div>
    </main>
  );
}
