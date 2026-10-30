"use client";
import { useState } from "react";
export function TeachingVideoPlayer({
  src,
  poster,
  title,
  captions,
  language = "en",
}: {
  src: string;
  poster?: string;
  title: string;
  captions?: string;
  language?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-player-shell">
      <video
        crossOrigin="anonymous"
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={title}
        onError={(event) => {
          if (event.target === event.currentTarget) setFailed(true);
        }}
      >
        <source src={src} type="video/mp4" onError={() => setFailed(true)} />
        {captions && (
          <track
            kind="captions"
            src={captions}
            srcLang={language}
            label="Captions"
            default
          />
        )}
        Your browser does not support this video. Please try a current browser.
      </video>
      {failed && (
        <div className="video-playback-error" role="alert">
          <strong>We couldn’t play this video.</strong>
          <p>Please refresh and try again, or return to the other teachings.</p>
          <button
            type="button"
            onClick={(event) => {
              setFailed(false);
              event.currentTarget
                .closest(".video-player-shell")
                ?.querySelector("video")
                ?.load();
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
