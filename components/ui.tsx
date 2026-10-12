import Link from "next/link";
import type { ReactNode } from "react";

import { AnimatedLink } from "@/components/motion/animated-link";
import { Reveal } from "@/components/motion/reveal";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

type EyebrowProps = {
  children: ReactNode;
  light?: boolean;
};

export function Eyebrow({ children, light = false }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] font-medium tracking-[0.22em] uppercase ${
        light ? "text-gold" : "text-muted"
      }`}
    >
      {children}
    </p>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  light?: boolean;
};

export function ButtonLink({ href, children, light = false }: ButtonLinkProps) {
  return (
    <AnimatedLink
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-6 rounded-sm px-6 py-3 text-xs font-medium transition-colors ${
        light
          ? "bg-ivory text-navy hover:bg-paper"
          : "bg-navy text-white hover:bg-navy-soft"
      }`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </AnimatedLink>
  );
}

type TextLinkProps = {
  href: string;
  children: ReactNode;
};

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-5 border-b border-gold py-2 text-xs transition-colors hover:text-gold"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>

      <Heading className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
        {title}
      </Heading>

      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
