import { Suspense } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-sm">Loading the content editor…</div>}
    >
      <NextStudio config={config} />
    </Suspense>
  );
}
