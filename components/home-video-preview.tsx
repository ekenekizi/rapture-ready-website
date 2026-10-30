import Link from "next/link";
import type { TeachingSummary } from "@/sanity/types";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { FeaturedVideoTeaching } from "@/components/featured-video-teaching";
import { ContentEmpty } from "@/components/content-empty";
export function HomeVideoPreview({ videos }: { videos: TeachingSummary[] }) {
  return (
    <section className="video-home-section video-surface">
      <Container>
        <div className="sectionhead">
          <div>
            <SectionHeading
              eyebrow="A moment in the Word"
              title="Pause. Watch. Reflect."
              description="Short biblical teachings to carry into your day."
            />
          </div>
          <TextLink href="/teachings?format=watch">
            Browse video teachings
          </TextLink>
        </div>
        {videos[0] ? (
          <FeaturedVideoTeaching teaching={videos[0]} />
        ) : (
          <ContentEmpty
            title="Video teachings are coming soon."
            description="Short biblical videos will appear here once the ministry publishes them."
          />
        )}
        <Link className="sr-only" href="/teachings">
          All written and video teachings
        </Link>
      </Container>
    </section>
  );
}
