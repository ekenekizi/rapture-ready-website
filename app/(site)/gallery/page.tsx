import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { GalleryBrowser } from "@/components/gallery-browser";
import { getGalleryPhotos } from "@/sanity/lib/gallery";
import { ButtonLink } from "@/components/ui";
export const metadata: Metadata = pageMetadata({
  title: "Bible Prophecy Photos",
  description:
    "Visual Bible studies exploring prophecy, worship, Christian living, and spiritual readiness. Read Scripture first, then consider each image in context.",
  path: "/gallery",
});
export default async function GalleryPage() {
  const photos = await getGalleryPhotos();
  return (
    <main id="main-content" className="prophecy-page">
      <section className="prophecy-hero">
        <div className="prophecy-wrap">
          <div className="prophecy-hero-top">
            <div className="eyebrow gold">THE ENDTIME WATCH PHOTO JOURNAL</div>
            <span className="prophecy-edition">
              SCRIPTURE · CONTEXT · DISCERNMENT
            </span>
          </div>
          <div className="prophecy-hero-grid">
            <div>
              <h1>
                Bible Prophecy
                <br />
                <em>Photos.</em>
              </h1>
              <p className="prophecy-lead">
                Look carefully.
                <br />
                Read the Scriptures.
                <br />
                Grow in discernment.
              </p>
            </div>
            <div className="prophecy-intro">
              <span className="prophecy-small-rule" />
              <h2>
                A picture begins <br />
                the conversation. <br />
                Scripture guides it.
              </h2>
              <p>
                A collection of visual studies exploring biblical prophecy,
                worship, Christian living, and spiritual readiness. Open a
                photograph to read the passages first, then consider the
                ministry’s reflection.
              </p>
              <a className="textlink" href="#photo-studies">
                Explore the photo studies ↓
              </a>
            </div>
          </div>
          <blockquote className="prophecy-opening-verse">
            <p>
              “When ye shall see all these things,
              <br />
              know that it is near, even at the doors.”
            </p>
            <cite>MATTHEW 24:33 · KJV EXCERPT</cite>
          </blockquote>
        </div>
      </section>
      <section
        className="prophecy-guide prophecy-wrap"
        aria-label="How to read a photo study"
      >
        <span className="eyebrow">A THOUGHTFUL WAY TO READ</span>
        {[
          [
            "01",
            "Start with Scripture",
            "Read each passage in its wider biblical context.",
          ],
          [
            "02",
            "Consider the image",
            "Separate what is visible from what is interpreted.",
          ],
          [
            "03",
            "Reflect and respond",
            "Let study lead to prayer and faithful living.",
          ],
        ].map(([number, title, text]) => (
          <div key={number}>
            <span>{number}</span>
            <p>
              <strong>{title}</strong>
              {text}
            </p>
          </div>
        ))}
      </section>
      <section id="photo-studies" className="prophecy-collection prophecy-wrap">
        <div className="sectionhead">
          <div>
            <div className="eyebrow">THE COLLECTION</div>
            <h2>See. Study. Reflect.</h2>
          </div>
          <p className="prophecy-collection-intro">
            Every photograph opens a study.
            <br />
            Every study begins with the Word.
          </p>
        </div>
        <GalleryBrowser photos={photos} />
      </section>
      <section className="prophecy-closing">
        <div className="prophecy-wrap">
          <div className="eyebrow gold">THE CALL REMAINS</div>
          <h2>
            Be wise. Be watchful.
            <br />
            <em>Be Rapture Ready.</em>
          </h2>
          <blockquote>
            “And when these things begin to come to pass, then look up, and lift
            up your heads; for your redemption draweth nigh.”
          </blockquote>
          <p className="eyebrow gold">LUKE 21:28</p>
          <div className="mt-8">
            <ButtonLink href="/library">Continue in the Library</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
