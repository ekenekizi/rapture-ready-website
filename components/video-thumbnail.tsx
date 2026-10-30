import Link from "next/link";
import { TeachingPhoto } from "@/components/teaching-photo";
import { videoDuration } from "@/lib/video-teachings";
import type { Teaching } from "@/lib/content";
export function VideoThumbnail({ teaching }: { teaching: Teaching }) {
  return (
    <Link
      className="video-thumbnail"
      href={`/teachings/${encodeURIComponent(teaching.slug)}`}
      aria-label={`Watch video teaching: ${teaching.title}`}
    >
      {teaching.coverImage?.asset?._ref ? (
        <TeachingPhoto image={teaching.coverImage} variant="preview" />
      ) : (
        <div className="video-poster-fallback" aria-hidden="true">
          Endtime Watch
        </div>
      )}
      <span className="video-format-label">VIDEO TEACHING</span>
      <span className="video-play" aria-hidden="true">
        ▶
      </span>
      <span className="video-duration">
        {videoDuration(teaching.durationSeconds)}
      </span>
    </Link>
  );
}
