import type { Metadata } from "next";
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

  return {
    title: section
      ? `${section.title} — ${readerBook.title}`
      : "Section not found",
  };
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
