import { MinistryAboutImage } from "@/components/ministry-about-image";
import { teachingImageUrl } from "@/sanity/lib/image";
import type { TeachingImage } from "@/sanity/image-types";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import {
  Container,
  Eyebrow,
  ButtonLink,
  TextLink,
  SectionHeading,
} from "@/components/ui";
import { ContentEmpty } from "@/components/content-empty";
import { book } from "@/lib/content";
import type {
  HomePageContent,
  MinistrySection,
  ScriptureQuote,
} from "@/sanity/page-types";

export function HomeIntroduction({
  content,
}: {
  content: HomePageContent | null;
}) {
  const hero = content?.hero;
  const heroImage = teachingImageUrl(hero?.image, 1122, 1402);
  return (
    <>
      {hero?.headline && hero.description ? (
        <section className="pt-14 pb-10 md:pt-20">
          <Container>
            <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                {hero.eyebrow && (
                  <Reveal trigger="load">
                    <Eyebrow>{hero.eyebrow}</Eyebrow>
                  </Reveal>
                )}
                <Reveal trigger="load" delay={0.08}>
                  <h1 className="mt-7 font-serif text-6xl leading-[1.02] tracking-tight whitespace-pre-line lg:text-8xl">
                    {hero.headline}
                    {hero.emphasis && (
                      <>
                        <br />
                        <em className="text-gold">{hero.emphasis}</em>
                      </>
                    )}
                  </h1>
                </Reveal>
                <Reveal trigger="load" delay={0.16}>
                  <p className="mt-7 max-w-lg text-sm leading-7 text-muted">
                    {hero.description}
                  </p>
                </Reveal>
                <Reveal trigger="load" delay={0.24}>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <ButtonLink href="/library">Explore the Library</ButtonLink>
                    {content?.mission && (
                      <TextLink href="#mission">Why We Watch</TextLink>
                    )}
                  </div>
                </Reveal>
                {hero.scripture && (
                  <blockquote className="mt-10 max-w-lg border-t border-border pt-5">
                    <p className="font-serif text-xl leading-relaxed">
                      “{hero.scripture.text}”
                    </p>
                    <cite className="mt-3 block text-[10px] tracking-widest text-muted not-italic">
                      {hero.scripture.reference}
                    </cite>
                  </blockquote>
                )}
              </div>
              <Reveal
                delay={0.15}
                className="mx-auto w-full max-w-md lg:max-w-lg"
              >
                <figure>
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={heroImage || "/images/watchtower.png"}
                      alt={
                        heroImage
                          ? hero?.image?.alt || "Endtime Watch ministry"
                          : "A watchman with a trumpet overlooking the dawn from a stone watchtower."
                      }
                      width={1122}
                      height={1402}
                      preload
                      sizes="(max-width: 767px) 90vw, 45vw"
                      className={
                        heroImage
                          ? "aspect-[4/5] h-auto w-full object-cover"
                          : "h-auto w-full mix-blend-multiply"
                      }
                    />
                  </div>
                  {(hero.imageCaption || hero.image?.caption) && (
                    <figcaption className="mt-4 text-center text-[8px] tracking-[.2em] text-muted">
                      {hero.imageCaption || hero.image?.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            </div>
            {!!hero.values?.length && (
              <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-[9px] tracking-[.15em] text-muted">
                {hero.values.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            )}
          </Container>
        </section>
      ) : (
        <section className="py-14 md:py-20">
          <Container>
            <Eyebrow>Endtime Watch</Eyebrow>
            <h1 className="mt-5 mb-8 font-serif text-5xl md:text-7xl">
              Welcome to Endtime Watch.
            </h1>
            <ContentEmpty
              title="Ministry information is coming soon."
              description="Our ministry introduction is being prepared. You can explore the library while more content is added."
            />
            <div className="mt-7">
              <ButtonLink href="/library">Explore the Library</ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {content?.mission && (
        <section
          id="mission"
          className="scroll-mt-24 border-t border-border py-16 md:py-24"
        >
          <Container>
            <div className="grid gap-8 md:grid-cols-2 md:gap-20">
              <SectionHeading
                eyebrow={content.mission.eyebrow ?? "Our purpose"}
                title={content.mission.title}
              />
              <div className="space-y-5 text-sm leading-8 text-muted">
                {content.mission.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            {!!content.mission.pillars?.length && (
              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                {content.mission.pillars.map((pillar, index) => (
                  <Reveal
                    key={pillar._key}
                    delay={index * 0.08}
                    className="border-t border-border pt-6"
                  >
                    <span className="font-serif text-2xl text-gold">
                      0{index + 1} /
                    </span>
                    <h3 className="mt-4 text-xs tracking-widest uppercase">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {pillar.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {content?.explainer && (
        <section className="bg-navy py-16 text-ivory md:py-24">
          <Container>
            {content.explainer.eyebrow && (
              <Eyebrow light>{content.explainer.eyebrow}</Eyebrow>
            )}
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">
              {content.explainer.title}
            </h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-20">
              {[content.explainer.endtime, content.explainer.rapture].map(
                (def) => (
                  <div key={def.title}>
                    {def.label && <Eyebrow light>{def.label}</Eyebrow>}
                    <h3 className="mt-4 font-serif text-6xl">{def.title}</h3>
                    <p className="mt-6 font-serif text-2xl leading-relaxed">
                      {def.definition}
                    </p>
                    <p className="mt-5 text-sm leading-8 text-ivory/65">
                      {def.explanation}
                    </p>
                    {def.scriptures && (
                      <p className="mt-6 text-[10px] leading-6 tracking-wider text-gold">
                        {def.scriptures}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
            <div className="mt-12 grid gap-6 border-t border-gold/40 pt-6 text-sm md:grid-cols-2">
              {[content.explainer.endtime, content.explainer.rapture].map(
                (def) =>
                  def.summary ? (
                    <p
                      key={def.title}
                      className="leading-7 whitespace-pre-line"
                    >
                      {def.summary.split(/\r?\n/).map((line, index) => (
                        <span
                          key={index}
                          className={index === 0 ? "block text-gold" : "block"}
                        >
                          {line || "\u00a0"}
                        </span>
                      ))}
                    </p>
                  ) : null,
              )}
            </div>
            {(content.explainer.scripture ||
              content.explainer.closingStatement) && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8">
                {content.explainer.scripture && (
                  <blockquote className="font-serif text-2xl">
                    “{content.explainer.scripture.text}”
                    <cite className="mt-3 block font-sans text-[10px] text-gold not-italic">
                      {content.explainer.scripture.reference}
                    </cite>
                  </blockquote>
                )}
                <p className="text-xs leading-7 tracking-widest whitespace-pre-line">
                  {content.explainer.closingStatement}
                </p>
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
}

export function HomeScripture({ quote }: { quote?: ScriptureQuote }) {
  if (!quote) return null;
  return (
    <section className="px-6 py-20 text-center md:py-28">
      <span aria-hidden="true" className="font-serif text-6xl text-gold">
        “
      </span>
      <blockquote className="mx-auto max-w-3xl font-serif text-4xl leading-tight whitespace-pre-line md:text-6xl">
        {quote.text}
      </blockquote>
      <p className="mt-7 text-[10px] tracking-widest text-muted">
        {quote.reference}
      </p>
    </section>
  );
}

export function HomeAbout({
  section,
  image,
}: {
  section?: MinistrySection;
  image?: TeachingImage | null;
}) {
  if (!section) return null;
  const heading = (
    <SectionHeading
      eyebrow={section.eyebrow ?? "About the ministry"}
      title={section.title}
    />
  );
  const text = (
    <div className="space-y-5 text-sm leading-8 text-muted">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="mt-7">
        <TextLink href="/about">Learn About Endtime Watch</TextLink>
      </div>
    </div>
  );
  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-20">
          {image?.asset?._ref ? (
            <>
              <Reveal>
                <MinistryAboutImage image={image} />
              </Reveal>
              <div>
                {heading}
                <div className="mt-6">{text}</div>
              </div>
            </>
          ) : (
            <>
              {heading}
              {text}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

export function HomeClosing({
  content,
}: {
  content?: HomePageContent["finalCta"];
}) {
  if (!content) return null;
  return (
    <section className="bg-navy px-6 py-20 text-center text-ivory">
      {content.eyebrow && <Eyebrow light>{content.eyebrow}</Eyebrow>}
      <h2 className="mt-6 font-serif text-5xl leading-tight whitespace-pre-line md:text-6xl">
        {content.title}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-ivory/65">
        {content.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
        <ButtonLink href="/library" light>
          Explore the Library
        </ButtonLink>
        <TextLink href={`/library/${book.slug}`}>Start with the Book</TextLink>
      </div>
    </section>
  );
}
