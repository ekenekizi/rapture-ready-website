import { HomeVideoPreview } from "@/components/home-video-preview";
import { isVideoTeaching } from "@/lib/video-teachings";
import { getHomePage, getAboutPage } from "@/sanity/lib/pages";
import {
  HomeIntroduction,
  HomeScripture,
  HomeAbout,
  HomeClosing,
} from "@/components/ministry-home";
import Image from "next/image";
import Link from "next/link";
import { TeachingPhoto } from "@/components/teaching-photo";

import {
  Container,
  Eyebrow,
  ButtonLink,
  TextLink,
  SectionHeading,
} from "@/components/ui";
import { TeachingCard } from "@/components/teaching-card";
import { book } from "@/lib/content";
import { getTeachings } from "@/sanity/lib/teachings";
import { GalleryPreview } from "@/components/gallery-preview";
import { ShareTeachingButton } from "@/components/share-teaching-button";

export default async function HomePage() {
  const [teachings, homeContent, aboutContent] = await Promise.all([
    getTeachings(),
    getHomePage(),
    getAboutPage(),
  ]);
  const writtenTeachings = teachings.filter((item) => !isVideoTeaching(item));
  const videos = teachings.filter(isVideoTeaching);
  const featuredTeaching = writtenTeachings[0];

  return (
    <main id="main-content">
      <HomeIntroduction content={homeContent} />

      {/* Featured teachings */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Biblical perspectives"
              title="Understand the Times"
            />

            <TextLink href="/teachings">Explore Teachings</TextLink>
          </div>

          {featuredTeaching ? (
            <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
              <article className="bg-paper p-7 md:p-10">
                {featuredTeaching.coverImage?.asset?._ref && (
                  <Link
                    href={`/teachings/${featuredTeaching.slug}`}
                    aria-label={`Read ${featuredTeaching.title}`}
                    className="group -mx-7 -mt-7 mb-8 block md:-mx-10 md:-mt-10"
                  >
                    <TeachingPhoto
                      image={featuredTeaching.coverImage}
                      variant="feature"
                    />
                  </Link>
                )}
                <Eyebrow>
                  Featured teaching · {featuredTeaching.category}
                </Eyebrow>

                <h3 className="mt-6 font-serif text-4xl">
                  {featuredTeaching.title}
                </h3>

                <p className="mt-5 text-sm leading-8 text-muted">
                  {featuredTeaching.excerpt}
                </p>

                <p className="mt-6 text-xs text-muted">
                  {featuredTeaching.scripture} · {featuredTeaching.minutes} min
                  read
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <TextLink href={`/teachings/${featuredTeaching.slug}`}>
                    Read Teaching
                  </TextLink>
                  <ShareTeachingButton
                    title={featuredTeaching.title}
                    slug={featuredTeaching.slug}
                    excerpt={featuredTeaching.excerpt}
                  />
                </div>
              </article>

              <div className="flex min-w-0 flex-col gap-8">
                {writtenTeachings.slice(1, 3).map((teaching) => (
                  <TeachingCard
                    key={teaching._id}
                    teaching={teaching}
                    compact
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">
              Biblical teachings are being prepared.
            </p>
          )}
        </Container>
      </section>

      {/* Library */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The Endtime Watch Library"
            title="Read. Study. Prepare."
            description="Explore our featured publication, created to strengthen biblical understanding and spiritual readiness."
          />

          <div className="mt-10 grid items-center gap-8 border border-border bg-ivory p-7 md:grid-cols-[190px_1fr] md:gap-12 md:p-10">
            <Image
              src="/images/book-cover.webp"
              alt={`${book.title} book cover`}
              width={662}
              height={1158}
              sizes="190px"
              className="mx-auto h-auto w-40 shadow-lg md:w-full"
            />

            <div>
              <Eyebrow>Endtime Watch publications</Eyebrow>

              <h3 className="mt-4 font-serif text-4xl md:text-5xl">
                {book.title}
              </h3>

              <p className="mt-3 font-serif text-2xl">{book.subtitle}</p>

              <p className="mt-3 text-xs text-muted">By {book.author}</p>

              <p className="mt-5 max-w-xl text-sm leading-8 text-muted">
                {book.description}
              </p>

              <p className="mt-5 text-xs text-muted">
                {book.chapters} chapters · Approximately {book.minutes} min read
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <ButtonLink href={`/library/${book.slug}`}>
                  Explore the Book
                </ButtonLink>
                <TextLink href="/library">Visit the Library</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <HomeScripture quote={homeContent?.scripture} />

      <HomeAbout section={homeContent?.about} image={aboutContent?.image} />

      {/* Final call to action */}
      <HomeVideoPreview videos={videos} />

      <GalleryPreview />

      <HomeClosing content={homeContent?.finalCta} />
    </main>
  );
}
