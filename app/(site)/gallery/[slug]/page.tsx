import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { GalleryStudyContent } from "@/components/gallery-study-content";
import { ShareGalleryStudyButton } from "@/components/share-gallery-study-button";
import { getGalleryPhotos } from "@/sanity/lib/gallery";
import { galleryStudyPath } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

async function getGalleryPhoto(slug: string) {
  return (
    (await getGalleryPhotos()).find((photo) => photo.slug === slug) ?? null
  );
}

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const photo = await getGalleryPhoto(slug);
  if (!photo) notFound();
  return pageMetadata({
    title: photo.title,
    description:
      photo.description ||
      "Read this photo study, its Scripture passages, and the ministry’s biblical reflection.",
    path: galleryStudyPath(photo.slug),
    image: {
      url: photo.src,
      width: 1200,
      height: photo.portrait ? 1500 : 900,
      alt: photo.alt,
    },
  });
}
async function Study({ params }: Props) {
  const { slug } = await params;
  const photo = await getGalleryPhoto(slug);
  if (!photo) notFound();
  const photos = await getGalleryPhotos();
  const index = photos.findIndex((item) => item.id === photo.id);
  const previous = photos[index - 1],
    next = photos[index + 1];
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-ivory">
      <header className="prophecy-study-toolbar">
        <Link href="/gallery" className="textlink">
          ← All photo studies
        </Link>
        <ShareGalleryStudyButton
          title={photo.title}
          slug={photo.slug}
          excerpt={photo.description}
          label="Share study"
        />
      </header>
      <GalleryStudyContent
        photo={photo}
        number={index + 1}
        total={photos.length}
        headingId="photo-study-heading"
        headingLevel="h1"
        footer={
          previous || next ? (
            <nav className="prophecy-study-bottom" aria-label="Photo studies">
              {previous && (
                <Link
                  className="textlink"
                  href={galleryStudyPath(previous.slug)}
                >
                  ← Previous study
                </Link>
              )}
              {next && (
                <Link className="btn" href={galleryStudyPath(next.slug)}>
                  Next study →
                </Link>
              )}
            </nav>
          ) : undefined
        }
      />
    </article>
  );
}
export default function GalleryStudyPage({ params }: Props) {
  return (
    <main id="main-content" className="prophecy-page">
      <Container className="py-10 md:py-16">
        <Suspense fallback={<p role="status">Loading photo study…</p>}>
          <Study params={params} />
        </Suspense>
      </Container>
    </main>
  );
}
