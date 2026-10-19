"use client";

import { useId, useRef, useState } from "react";
import { SiteDialog } from "@/components/site-dialog";
import { teachingShareLinks } from "@/lib/share";

type ShareTeachingButtonProps = {
  title: string;
  slug: string;
  excerpt: string;
  variant?: "link" | "button";
  label?: string;
};

export function ShareTeachingButton({
  title,
  slug,
  excerpt,
  variant = "link",
  label,
}: ShareTeachingButtonProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [local, setLocal] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const headingId = useId();

  function openShare() {
    setUrl(
      new URL(`/teachings/${encodeURIComponent(slug)}`, window.location.origin)
        .href,
    );
    setLocal(
      ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname),
    );
    setCanShare(typeof navigator.share === "function");
    setStatus("");
    setOpen(true);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      input.current?.focus();
      input.current?.select();
      setStatus("Select and copy the link above.");
    }
  }

  async function shareOnDevice() {
    try {
      await navigator.share({
        title: `${title} | Endtime Watch`,
        text: excerpt,
        url,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setStatus("Use Copy Link or choose a platform above.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openShare}
        aria-label={`Share teaching: ${title}`}
        aria-haspopup="dialog"
        className={
          variant === "button"
            ? "inline-flex min-h-12 cursor-pointer items-center gap-6 rounded-sm bg-navy px-5 py-3 text-xs text-white hover:bg-navy-soft"
            : "inline-flex min-h-11 cursor-pointer items-center gap-2 border-b border-gold py-2 text-xs hover:text-gold"
        }
      >
        {label ?? (variant === "button" ? "Share Teaching" : "Share")}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <SiteDialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={headingId}
        className="max-w-[510px]"
      >
        <div className="flex items-center justify-between gap-5">
          <h2 id={headingId} className="font-serif text-3xl">
            Share this teaching
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close share panel"
            className="h-11 w-11 shrink-0 text-xl"
          >
            ×
          </button>
        </div>
        <p className="mt-6 font-serif text-2xl leading-tight">{title}</p>
        <p className="mt-3 mb-6 text-xs leading-6 text-muted">
          {local
            ? "This is a local preview. Links work on this device; public sharing will use the published website address."
            : "Encourage someone to read, study, and prepare."}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {teachingShareLinks(title, url).map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Email" ? undefined : "_blank"}
              rel={item.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex min-h-12 items-center justify-center border border-border px-3 py-3 text-xs hover:bg-paper"
            >
              {item.label} ↗
            </a>
          ))}
        </div>
        <label className="mt-6 block text-[10px] text-muted">
          Teaching link
          <input
            ref={input}
            readOnly
            value={url}
            onClick={(event) => event.currentTarget.select()}
            className="mt-2 block w-full border border-border bg-paper p-3 text-xs text-navy"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyLink}
            className="min-h-11 bg-navy px-5 py-3 text-xs text-white"
          >
            Copy Link
          </button>
          {canShare && (
            <button
              type="button"
              onClick={shareOnDevice}
              className="min-h-11 border border-border px-5 py-3 text-xs"
            >
              More Options ↗
            </button>
          )}
        </div>
        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-xs">
          {status}
        </p>
      </SiteDialog>
    </>
  );
}
