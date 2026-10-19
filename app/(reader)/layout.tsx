import type { ReactNode } from "react";
import "./reader.css";
import "./highlights.css";

export default function ReaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-24 bg-navy px-4 py-3 text-sm text-white focus:translate-y-0"
      >
        Skip to reading
      </a>

      {children}
    </>
  );
}
