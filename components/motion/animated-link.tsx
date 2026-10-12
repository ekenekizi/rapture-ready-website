"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

type AnimatedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function AnimatedLink({ href, className, children }: AnimatedLinkProps) {
  return (
    <MotionLink
      href={href}
      className={className}
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
    >
      {children}
    </MotionLink>
  );
}
