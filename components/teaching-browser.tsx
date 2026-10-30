"use client";
import { useRouter, useSearchParams } from "next/navigation";
import type { TeachingSummary } from "@/sanity/types";
import { TeachingCard } from "@/components/teaching-card";
import { VideoTeachingCard } from "@/components/video-teaching-card";
import { FeaturedVideoTeaching } from "@/components/featured-video-teaching";
import { ContentEmpty } from "@/components/content-empty";
import { isVideoTeaching } from "@/lib/video-teachings";
export function TeachingBrowser({
  teachings,
}: {
  teachings: TeachingSummary[];
}) {
  const router = useRouter();
  const search = useSearchParams();
  const selected = search.get("format");
  const format = selected === "read" || selected === "watch" ? selected : "all";
  const written = teachings.filter((item) => !isVideoTeaching(item));
  const videos = teachings.filter(isVideoTeaching);
  const featured = format === "read" ? undefined : videos[0];
  const filtered = (
    format === "read" ? written : format === "watch" ? videos : teachings
  ).filter((item) => item._id !== featured?._id);
  return (
    <>
      <div className="teaching-format-bar">
        <div
          className="teaching-format-filters"
          role="group"
          aria-label="Teaching format"
        >
          {(
            [
              ["all", "All teachings", teachings.length],
              ["read", "Read", written.length],
              ["watch", "Watch", videos.length],
            ] as const
          ).map(([value, label, count]) => (
            <button
              type="button"
              key={value}
              aria-pressed={format === value}
              className={format === value ? "active" : ""}
              onClick={() =>
                router.replace(
                  value === "all" ? "/teachings" : `/teachings?format=${value}`,
                  { scroll: false },
                )
              }
            >
              {label}
              <span>{String(count).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <span role="status" aria-live="polite">
          {format === "all"
            ? `${teachings.length} teachings · ${written.length} to read · ${videos.length} to watch`
            : format === "read"
              ? `${written.length} written teaching${written.length === 1 ? "" : "s"}`
              : `${videos.length} video teaching${videos.length === 1 ? "" : "s"}`}
        </span>
      </div>
      <div className="mt-8">
        {featured && <FeaturedVideoTeaching teaching={featured} />}
      </div>
      <div className="video-teaching-grid">
        {filtered.map((item) =>
          isVideoTeaching(item) ? (
            <VideoTeachingCard key={item._id} teaching={item} />
          ) : (
            <TeachingCard key={item._id} teaching={item} />
          ),
        )}
      </div>
      {!featured && filtered.length === 0 && (
        <div className="my-12">
          <ContentEmpty
            title={
              format === "watch"
                ? "Video teachings are coming soon."
                : format === "read"
                  ? "Written teachings are coming soon."
                  : "Teachings are coming soon."
            }
            description="New biblical teachings will appear here when published by the ministry."
          />
        </div>
      )}
    </>
  );
}
