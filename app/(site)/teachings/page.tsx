import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { TeachingCard } from "@/components/teaching-card";
import { teachings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teachings",
};

export default function TeachingsPage() {
  return (
    <main id="main-content">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Biblical perspectives"
          title="Understand the Times"
          description="Read, reflect, and grow in biblical discernment through Scripture-centered teachings."
        />

        <p className="mt-5 text-xs text-muted">
          Illustrative previews. Published ministry teachings will come from
          Sanity.
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {teachings.map((teaching) => (
            <TeachingCard key={teaching.slug} teaching={teaching} />
          ))}
        </div>
      </Container>
    </main>
  );
}
