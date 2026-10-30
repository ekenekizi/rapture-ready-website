import Link from "next/link";
import type { Teaching } from "@/lib/content";
import { VideoThumbnail } from "@/components/video-thumbnail";
import { ShareTeachingButton } from "@/components/share-teaching-button";
import { videoDuration } from "@/lib/video-teachings";
export function FeaturedVideoTeaching({ teaching }: { teaching: Teaching }) {
  return (
    <article className="featured-video">
      <VideoThumbnail teaching={teaching} />
      <div className="featured-video-copy">
        <div className="eyebrow gold">
          FEATURED VIDEO · {videoDuration(teaching.durationSeconds)}
        </div>
        <h2>{teaching.title}</h2>
        <p>{teaching.excerpt}</p>
        <span className="video-scripture">{teaching.scripture}</span>
        <div className="actions">
          <Link
            className="btn"
            href={`/teachings/${encodeURIComponent(teaching.slug)}`}
          >
            Watch teaching <span aria-hidden="true">▶</span>
          </Link>
          <ShareTeachingButton
            title={teaching.title}
            slug={teaching.slug}
            excerpt={teaching.excerpt}
            contentKind="video"
          />
        </div>
      </div>
    </article>
  );
}
