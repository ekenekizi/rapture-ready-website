import Link from "next/link";
import type { Teaching } from "@/lib/content";
import { VideoThumbnail } from "@/components/video-thumbnail";
import { ShareTeachingButton } from "@/components/share-teaching-button";
import { videoDuration } from "@/lib/video-teachings";
export function VideoTeachingCard({ teaching }: { teaching: Teaching }) {
  return (
    <article className="video-card">
      <VideoThumbnail teaching={teaching} />
      <div className="video-card-copy">
        <div className="eyebrow gold">{teaching.category}</div>
        <h3>
          <Link href={`/teachings/${encodeURIComponent(teaching.slug)}`}>
            {teaching.title}
          </Link>
        </h3>
        <p>{teaching.excerpt}</p>
        <div className="video-card-meta">
          <span>{teaching.scripture}</span>
          <span>
            {videoDuration(teaching.durationSeconds)} ·{" "}
            {teaching.videoLabel || "Video teaching"}
          </span>
        </div>
        <div className="content-actions">
          <Link
            className="textlink"
            href={`/teachings/${encodeURIComponent(teaching.slug)}`}
          >
            Watch teaching ↗
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
