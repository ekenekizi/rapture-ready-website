import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";

import { book } from "@/lib/content";
import { Container, SectionHeading, Eyebrow } from "@/components/ui";

import { ContinueReadingLink } from "@/components/reader/continue-reading-link";
import { readerBook, sectionSummaries } from "@/lib/books/rapture-ready";
import { ShareBookButton } from "@/components/share-book-button";

export const metadata: Metadata = pageMetadata({
  title: "Library",
  description:
    "Read The Trumpet Is Blowing — Be Rapture Ready online in the Endtime Watch library, with saved reading progress and highlights on your device.",
  path: "/library",
});

export default function LibraryPage() {
  return (
    <main id="main-content">
      <Container className="py-16 md:py-24">
        <SectionHeading
          as="h1"
          eyebrow="Read. Study. Prepare."
          title="The Endtime Watch Library"
          description="Books and biblical teachings for believers who desire to understand the times and remain spiritually prepared."
        />

        <section className="mt-12 grid items-center gap-10 border-t border-border pt-12 md:grid-cols-[280px_minmax(0,1fr)] md:gap-16">
          <Image
            src="/images/book-cover.webp"
            alt={`${book.title} cover`}
            width={662}
            height={1158}
            sizes="(max-width: 767px) 220px, 280px"
            className="mx-auto h-auto w-56 shadow-xl md:w-full"
          />

          <div className="min-w-0">
            <Eyebrow>Endtime Watch publications</Eyebrow>

            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              {book.title}
            </h2>

            <p className="mt-3 font-serif text-2xl">{book.subtitle}</p>

            <p className="mt-4 text-xs text-muted">By {book.author}</p>

            <p className="mt-6 max-w-xl text-sm leading-8 text-muted">
              {book.description}
            </p>

            <p className="mt-5 text-xs text-muted">
              {book.chapters} chapters · Approximately {book.minutes} min read
            </p>

            {/* Book actions */}
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <ContinueReadingLink
                sections={sectionSummaries}
                startSectionId={readerBook.startSectionId}
              />

              <Link
                href={`/library/${book.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-black/5"
              >
                <BookOpen size={16} aria-hidden="true" />
                View Book
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>

              <ShareBookButton />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
