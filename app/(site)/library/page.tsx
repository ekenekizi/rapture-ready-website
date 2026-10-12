import Image from "next/image";
import type { Metadata } from "next";
import { book } from "@/lib/content";
import {
  Container,
  SectionHeading,
  Eyebrow,
  ButtonLink,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Library",
};

export default function LibraryPage() {
  return (
    <main id="main-content">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Read. Study. Prepare."
          title="The Endtime Watch Library"
          description="Books and biblical teachings for believers who desire to understand the times and remain spiritually prepared."
        />

        <section className="mt-12 grid items-center gap-10 border-t border-border pt-12 md:grid-cols-[280px_1fr] md:gap-16">
          <Image
            src="/images/book-cover.webp"
            alt={`${book.title} cover`}
            width={662}
            height={1158}
            sizes="(max-width: 767px) 220px, 280px"
            className="mx-auto h-auto w-56 shadow-xl md:w-full"
          />

          <div>
            <Eyebrow>Endtime Watch publications</Eyebrow>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
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

            <div className="mt-8">
              <ButtonLink href={`/library/${book.slug}`}>View Book</ButtonLink>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
