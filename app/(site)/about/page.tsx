import type { Metadata } from "next";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About the Ministry",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="About Endtime Watch"
          title="Publishing the message. Sounding the warning."
          description="A ministry rooted in Scripture, devoted to discernment, and committed to spiritual readiness."
        />

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
          <h2 className="font-serif text-4xl">
            A call to watch,
            <br />
            discern and prepare.
          </h2>

          <div className="space-y-6 text-sm leading-8 text-muted">
            <p>
              Endtime Watch exists to publish biblical teachings that help
              believers understand the times, recognize error, and remain
              spiritually prepared for the return of Jesus Christ.
            </p>

            <p>
              Led by Evangelist Edwin Nwachukwu, the ministry invites readers to
              return to the Word of God as their foundation for truth, faithful
              living, and hope.
            </p>

            <p>
              Our publication, The Trumpet Is Blowing — Be Rapture Ready, is
              part of this teaching mission.
            </p>

            <ButtonLink href="/library">Explore the Library</ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
