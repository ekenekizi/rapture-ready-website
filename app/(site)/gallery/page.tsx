import type { Metadata } from "next";
import { Container, Eyebrow, ButtonLink, TextLink } from "@/components/ui";
import { GalleryBrowser } from "@/components/gallery-browser";
import { galleryPhotos } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Ministry Gallery",
  description:
    "Moments of evangelism, fellowship, and service from Endtime Watch.",
};

export default function GalleryPage() {
  return (
    <main id="main-content">
      <Container>
        <section className="grid items-end gap-8 pt-12 pb-10 md:grid-cols-[1.2fr_1fr] md:gap-20 md:pt-20 md:pb-16">
          <div>
            <Eyebrow>Endtime Watch · In the field</Eyebrow>
            <h1 className="mt-7 font-serif text-[56px] leading-[1.04] tracking-tight md:text-[76px]">
              The message.
              <br />
              <em className="font-normal text-gold">The people.</em>
              <br />
              The moments.
            </h1>
          </div>
          <div className="max-w-sm pb-2">
            <div className="mb-7 hidden h-px w-10 bg-gold md:block" />
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              Carrying the Word
              <br className="hidden md:block" /> beyond the page.
            </h2>
            <p className="mt-5 mb-5 text-sm leading-7 text-muted">
              A space for moments from evangelism, fellowship, and service. See
              the heart of the ministry through the people and places it
              reaches.
            </p>
            <TextLink href="/about">Discover the ministry</TextLink>
          </div>
        </section>
        <GalleryBrowser photos={galleryPhotos} />
        <section className="mt-5 flex flex-wrap items-center justify-between gap-8 border-t border-border pt-12 pb-16">
          <div>
            <Eyebrow>The message continues</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              Grounded in Scripture.
              <br />
              Shared with the world.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Explore the biblical teachings at the heart of the ministry.
            </p>
          </div>
          <ButtonLink href="/teachings">Explore Teachings</ButtonLink>
        </section>
      </Container>
    </main>
  );
}
