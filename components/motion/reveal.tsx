"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "scroll" | "load";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  trigger = "scroll",
}: RevealProps) {
  const visible = {
    opacity: 1,
    y: 0,
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={trigger === "load" ? visible : undefined}
      whileInView={trigger === "scroll" ? visible : undefined}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
