import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teachings } from "@/lib/content";
import { Container, Eyebrow, TextLink } from "@/components/ui";

type TeachingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return teachings.map((teaching) => ({
    slug: teaching.slug,
  }));
}

export async function generateMetadata({
  params,
}: TeachingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const teaching = teachings.find((item) => item.slug === slug);

  return {
    title: teaching?.title ?? "Teaching not found",
  };
}

export default async function TeachingPage({ params }: TeachingPageProps) {
  const { slug } = await params;
  const teaching = teachings.find((item) => item.slug === slug);

  if (!teaching) {
    notFound();
  }

  return (
    <main id="main-content">
      <Container className="py-12 md:py-20">
        <article className="mx-auto max-w-3xl">
          <TextLink href="/teachings">All Teachings</TextLink>

          <div className="mt-10">
            <Eyebrow>{teaching.category}</Eyebrow>
          </div>

          <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
            {teaching.title}
          </h1>

          <p className="mt-6 text-base leading-8 text-muted">
            {teaching.excerpt}
          </p>

          <p className="mt-6 text-xs text-muted">
            {teaching.scripture} · {teaching.minutes} min read
          </p>

          <blockquote className="my-12 border-l border-gold pl-6 font-serif text-3xl leading-relaxed">
            “What I say unto you I say unto all, Watch.”
            <cite className="mt-4 block font-sans text-xs text-muted not-italic">
              Mark 13:37
            </cite>
          </blockquote>

          <p className="font-serif text-2xl leading-10">
            The invitation to study begins with Scripture. Read the passages
            carefully, consider their context, and bring questions before God in
            prayer.
          </p>

          <div className="mt-10 border border-border bg-paper p-6 text-sm leading-7 text-muted">
            This is an illustrative teaching preview. The ministry’s complete
            articles will be published through Sanity.
          </div>
        </article>
      </Container>
    </main>
  );
}
