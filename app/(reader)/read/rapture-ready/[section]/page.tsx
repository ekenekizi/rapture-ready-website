import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { readerBook, sectionSummaries } from "@/lib/books/rapture-ready";
import { BookReader } from "@/components/reader/book-reader";
import { HighlightedContent } from "@/components/reader/highlighted-content";

type ReaderPageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return readerBook.sections.map((section) => ({
    section: section.id,
  }));
}

export async function generateMetadata({
  params,
}: ReaderPageProps): Promise<Metadata> {
  const { section: id } = await params;

  const section = readerBook.sections.find((item) => item.id === id);

  if (!section) notFound();
  return pageMetadata({
    title: `${section.title} — ${readerBook.title}`,
    description: `Read ${section.title} in ${readerBook.title} — ${readerBook.subtitle}, by ${readerBook.author}.`,
    path: `/read/rapture-ready/${encodeURIComponent(section.id)}`,
  });
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { section: id } = await params;

  const section = readerBook.sections.find((item) => item.id === id);

  if (!section) {
    notFound();
  }

  return (
    <BookReader
      key={section.id}
      title={readerBook.title}
      author={readerBook.author}
      sections={sectionSummaries}
      sectionId={section.id}
    >
      <HighlightedContent sectionId={section.id} blocks={section.blocks} />
    </BookReader>
  );
}
