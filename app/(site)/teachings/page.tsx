import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { TeachingCard } from "@/components/teaching-card";
import { getTeachings } from "@/sanity/lib/teachings";

export const metadata: Metadata = {
  title: "Teachings",
};

export default async function TeachingsPage() {
  const teachings = await getTeachings();

  return (
    <main id="main-content">
      <Container className="py-16 md:py-24">
        <SectionHeading
          as="h1"
          eyebrow="Biblical perspectives"
          title="Understand the Times"
          description="Read, reflect, and grow in biblical discernment through Scripture-centered teachings."
        />

        {teachings.length > 0 ? (
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teachings.map((teaching) => (
              <TeachingCard key={teaching._id} teaching={teaching} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border-t border-border pt-8">
            <p className="font-serif text-3xl">Teachings are being prepared.</p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Published biblical teachings will appear here.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
