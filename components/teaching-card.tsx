import Link from "next/link";
import type { Teaching } from "@/lib/content";
import { Eyebrow, TextLink } from "@/components/ui";

type TeachingCardProps = {
  teaching: Teaching;
};

export function TeachingCard({ teaching }: TeachingCardProps) {
  return (
    <article className="border-t border-border pt-6">
      <Eyebrow>{teaching.category}</Eyebrow>

      <h3 className="mt-4 font-serif text-3xl leading-tight">
        <Link href={`/teachings/${teaching.slug}`} className="hover:text-gold">
          {teaching.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-7 text-muted">{teaching.excerpt}</p>

      <p className="mt-5 text-[11px] leading-6 text-muted">
        {teaching.scripture} · {teaching.minutes} min read
      </p>

      <div className="mt-4">
        <TextLink href={`/teachings/${teaching.slug}`}>Read Teaching</TextLink>
      </div>
    </article>
  );
}
