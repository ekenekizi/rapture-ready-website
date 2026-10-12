import Image from "next/image";
import type { Metadata } from "next";
import { book } from "@/lib/content";
import { Container, Eyebrow, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Trumpet Is Blowing",
};

export default function BookPage() {
  return (
    <main id="main-content">
      <Container className="py-12 md:py-20">
        <TextLink href="/library">Back to Library</TextLink>

        <div className="mt-10 grid gap-10 md:grid-cols-[300px_1fr] md:gap-16">
          <Image
            src="/images/book-cover.webp"
            alt={`${book.title} cover`}
            width={662}
            height={1158}
            sizes="(max-width: 767px) 220px, 300px"
            className="mx-auto h-auto w-56 shadow-xl md:w-full"
          />

          <div>
            <Eyebrow>Rapture · Endtime Watch publications</Eyebrow>

            <h1 className="mt-5 font-serif text-5xl leading-tight md:text-6xl">
              {book.title}
            </h1>

            <p className="mt-4 font-serif text-3xl">{book.subtitle}</p>

            <p className="mt-5 text-sm text-muted">By {book.author}</p>

            <p className="mt-7 text-sm leading-8 text-muted">
              {book.description}
            </p>

            <p className="mt-6 text-xs text-muted">
              {book.chapters} chapters · Approximately {book.minutes} min read
            </p>

            <div className="mt-8 border border-border bg-paper p-5 text-sm leading-7 text-muted">
              The online reader will be connected in the reader implementation
              batch.
            </div>

            <h2 className="mt-10 font-serif text-3xl">About this book</h2>

            <p className="mt-5 text-sm leading-8 text-muted">
              This publication brings together teachings on the Rapture, the end
              times, spiritual discernment, and readiness. Its reading
              experience will include the original chapters, reading
              preferences, highlights, and progress saved on this device.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
