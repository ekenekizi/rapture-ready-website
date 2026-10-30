"use client";

import { useState } from "react";
import { Share2, Check, Link2 } from "lucide-react";

export function ShareBookButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = new URL("/library/rapture-ready", window.location.origin).href;

    const shareData = {
      title: "The Trumpet Is Blowing — Be Rapture Ready",
      text: "Read this inspiring ebook about spiritual readiness.",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this book link:", url);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-border px-6 py-3 text-xs transition-colors hover:bg-paper"
    >
      {copied ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Share2 size={16} aria-hidden="true" />
      )}

      {copied ? "Link Copied!" : "Share Book"}
    </button>
  );
}
