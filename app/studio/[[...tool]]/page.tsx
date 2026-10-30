import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { NextStudio } from "next-sanity/studio";
import { connection } from "next/server";
import config from "@/sanity.config";

export const metadata: Metadata = {
  referrer: "same-origin",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

async function DynamicMarker() {
  await connection();
  return null;
}

export default function StudioPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>

      <Suspense fallback={null}>
        <NextStudio config={config} />
      </Suspense>
    </>
  );
}
