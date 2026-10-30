import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { teachingImageUrl } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoTeachingContent } from "@/components/video-teaching-content";
import { isVideoTeaching } from "@/lib/video-teachings";
import { getTeachings } from "@/sanity/lib/teachings";
import { getTeaching } from "@/sanity/lib/teachings";
import { Container, Eyebrow, TextLink } from "@/components/ui";
import { TeachingBody } from "@/components/teaching-body";
import { TeachingPhoto } from "@/components/teaching-photo";
import { ShareTeachingButton } from "@/components/share-teaching-button";

type TeachingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TeachingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const teaching = await getTeaching(slug);

  if (!teaching) notFound();
  const cover = teachingImageUrl(teaching.coverImage, 1200, 630);
  const publishedTime = Number.isFinite(Date.parse(teaching.publishedAt))
    ? new Date(teaching.publishedAt).toISOString()
    : undefined;
  return pageMetadata({
    title: teaching.title,
    description: teaching.excerpt,
    path: `/teachings/${encodeURIComponent(teaching.slug)}`,
    article: { publishedTime, authors: [teaching.author] },
    image: cover
      ? {
          url: cover,
          width: 1200,
          height: 630,
          alt: teaching.coverImage?.alt || teaching.title,
        }
      : undefined,
  });
}

async function TeachingContent({ params }: TeachingPageProps) {
  const { slug } = await params;
  const teaching = await getTeaching(slug);

  if (!teaching) {
    notFound();
  }

  if (isVideoTeaching(teaching)) {
    const related = (await getTeachings())
      .filter((item) => isVideoTeaching(item) && item._id !== teaching._id)
      .slice(0, 2);
    return <VideoTeachingContent teaching={teaching} related={related} />;
  }

  const publicationDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "Africa/Lagos",
  }).format(new Date(teaching.publishedAt));

  return (
    <article className="mx-auto max-w-[1000px]">
      <TextLink href="/teachings">All Teachings</TextLink>

      <header className="mx-auto max-w-[700px]">
        <div className="mt-10">
          <Eyebrow>{teaching.category}</Eyebrow>
        </div>

        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
          {teaching.title}
        </h1>

        <p className="mt-6 text-base leading-8 text-muted">
          {teaching.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span>{teaching.author}</span>

          <time dateTime={teaching.publishedAt}>{publicationDate}</time>

          <span>{teaching.minutes} min read</span>
        </div>

        <p className="mt-5 text-xs text-muted">
          Scripture: {teaching.scripture}
        </p>
        <div className="mt-5">
          <ShareTeachingButton
            title={teaching.title}
            slug={teaching.slug}
            excerpt={teaching.excerpt}
            label="Share Teaching"
          />
        </div>
      </header>

      {teaching.coverImage?.asset?._ref && (
        <div className="-mx-6 mt-10 md:mx-0">
          <TeachingPhoto
            image={teaching.coverImage}
            variant="cover"
            showCaption
          />
        </div>
      )}

      <div
        className={`mx-auto mt-10 max-w-[680px] ${teaching.coverImage?.asset?._ref ? "" : "border-t border-border pt-10"}`}
      >
        <TeachingBody value={teaching.body} />
        <section
          className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-border py-7"
          aria-label="Share this teaching"
        >
          <div>
            <h2 className="font-serif text-3xl">Pass the Word along.</h2>
            <p className="mt-2 max-w-xs text-xs leading-6 text-muted">
              Share this teaching with someone who would find it encouraging.
            </p>
          </div>
          <ShareTeachingButton
            title={teaching.title}
            slug={teaching.slug}
            excerpt={teaching.excerpt}
            variant="button"
          />
        </section>
      </div>
    </article>
  );
}

export default function TeachingPage({ params }: TeachingPageProps) {
  return (
    <main id="main-content">
      <Container className="py-12 md:py-20">
        <Suspense
          fallback={
            <p role="status" className="text-sm text-muted">
              Loading teaching…
            </p>
          }
        >
          <TeachingContent params={params} />
        </Suspense>
      </Container>
    </main>
  );
}
