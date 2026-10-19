import Link from "next/link";
import type { Teaching } from "@/lib/content";
import { Eyebrow, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { TeachingPhoto } from "@/components/teaching-photo";
import { ShareTeachingButton } from "@/components/share-teaching-button";

type TeachingCardProps = {
  teaching: Teaching;
  compact?: boolean;
};

export function TeachingCard({ teaching, compact = false }: TeachingCardProps) {
  const hasPhoto = Boolean(teaching.coverImage?.asset?._ref);

  return (
    <Reveal className="h-full">
      <article
        className={`h-full border-t border-border pt-6 ${compact && hasPhoto ? "grid grid-cols-[94px_minmax(0,1fr)] gap-5 md:grid-cols-[125px_minmax(0,1fr)]" : ""}`}
      >
        {hasPhoto && (
          <Link
            href={`/teachings/${teaching.slug}`}
            className={`group block ${compact ? "" : "mb-6"}`}
            aria-label={`Read ${teaching.title}`}
          >
            <TeachingPhoto
              image={teaching.coverImage}
              variant={compact ? "compact" : "preview"}
            />
          </Link>
        )}
        <div>
          <Eyebrow>{teaching.category}</Eyebrow>

          <h3
            className={`mt-4 font-serif leading-tight ${compact ? "text-[26px]" : "text-3xl"}`}
          >
            <Link
              href={`/teachings/${teaching.slug}`}
              className="hover:text-gold"
            >
              {teaching.title}
            </Link>
          </h3>

          {!compact && (
            <p className="mt-4 text-sm leading-7 text-muted">
              {teaching.excerpt}
            </p>
          )}

          <p className="mt-5 text-[11px] leading-6 text-muted">
            {teaching.scripture} · {teaching.minutes} min read
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-5">
            <TextLink href={`/teachings/${teaching.slug}`}>
              Read Teaching
            </TextLink>
            <ShareTeachingButton
              title={teaching.title}
              slug={teaching.slug}
              excerpt={teaching.excerpt}
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
