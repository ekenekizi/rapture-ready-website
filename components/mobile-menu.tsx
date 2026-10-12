"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/lib/content";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          {open ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path d="M5 7h14M5 12h14M5 17h14" />
          )}
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-navigation"
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="absolute inset-x-0 top-full border-b border-border bg-ivory px-6 py-5 shadow-sm"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 text-sm"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/library"
              onClick={() => setOpen(false)}
              className="mt-5 block rounded-sm bg-navy px-5 py-4 text-center text-xs text-white"
            >
              Explore the Library ↗
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
