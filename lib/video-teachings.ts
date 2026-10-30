import type { Teaching } from "@/lib/content";
export function isVideoTeaching(teaching: Teaching) {
  return teaching.format === "video";
}
export function videoDuration(seconds?: number | null) {
  if (!seconds || !Number.isFinite(seconds) || seconds <= 0)
    return "Video teaching";
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
export function teachingMediaUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "cdn.sanity.io" &&
      url.pathname.startsWith("/files/")
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
export function playableVideo(teaching: Teaching) {
  return (
    isVideoTeaching(teaching) &&
    teaching.video?.mimeType === "video/mp4" &&
    Boolean(teachingMediaUrl(teaching.video.url))
  );
}
