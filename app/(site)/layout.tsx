import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-24 bg-navy px-4 py-3 text-sm text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <SiteHeader />

      {children}

      <SiteFooter />
    </>
  );
}
