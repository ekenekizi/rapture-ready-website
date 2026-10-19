import Image from "next/image";
import Link from "next/link";
import { TeachingPhoto } from "@/components/teaching-photo";
import { Reveal } from "@/components/motion/reveal";
import {
  Container,
  Eyebrow,
  ButtonLink,
  TextLink,
  SectionHeading,
} from "@/components/ui";
import { TeachingCard } from "@/components/teaching-card";
import { book } from "@/lib/content";
import { getTeachings } from "@/sanity/lib/teachings";
import { GalleryPreview } from "@/components/gallery-preview";
import { galleryPhotos } from "@/lib/gallery";
import { ShareTeachingButton } from "@/components/share-teaching-button";

const pillars = [
  {
    title: "Watch",
    description: "Understand the signs of the times through Scripture.",
  },
  {
    title: "Discern",
    description:
      "Test teachings, traditions and voices against the Word of God.",
  },
  {
    title: "Prepare",
    description: "Live faithfully and remain ready for the return of Christ.",
  },
];

export default async function HomePage() {
  const teachings = await getTeachings();
  const featuredTeaching = teachings[0];

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="pt-14 pb-10 md:pt-20">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div>
              <Reveal trigger="load">
                <Eyebrow>Endtime Watch — A Ministry of the Word</Eyebrow>
              </Reveal>

              <Reveal trigger="load" delay={0.08}>
                <h1 className="mt-7 font-serif text-6xl leading-[1.02] tracking-tight lg:text-8xl">
                  Watch.
                  <br />
                  Discern.
                  <br />
                  <em className="text-gold">Be Ready.</em>
                </h1>
              </Reveal>

              <Reveal trigger="load" delay={0.16}>
                <p className="mt-7 max-w-lg text-sm leading-7 text-muted">
                  Helping believers understand the times, return to biblical
                  truth, and prepare their hearts for the coming of Jesus
                  Christ.
                </p>
              </Reveal>

              <Reveal trigger="load" delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <ButtonLink href="/library">Explore the Library</ButtonLink>

                  <TextLink href="#mission">Why We Watch</TextLink>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <blockquote className="mt-10 max-w-lg border-t border-border pt-5">
                  <p className="font-serif text-xl leading-relaxed">
                    “Watch therefore: for ye know not what hour your Lord doth
                    come.”
                  </p>

                  <cite className="mt-3 block text-[10px] tracking-widest text-muted not-italic">
                    MATTHEW 24:42
                  </cite>
                </blockquote>
              </Reveal>
            </div>

            <Reveal
              delay={0.15}
              className="mx-auto w-full max-w-md lg:max-w-lg"
            >
              <figure>
                <Image
                  src="/images/watchtower.png"
                  alt="A watchman with a trumpet overlooking the dawn from a stone watchtower."
                  width={1122}
                  height={1402}
                  preload
                  sizes="(max-width: 767px) 90vw, 45vw"
                  className="h-auto w-full mix-blend-multiply"
                />

                <figcaption className="mt-4 text-center text-[8px] tracking-[0.2em] text-muted">
                  WATCHFUL IN HOPE · GROUNDED IN THE WORD
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-[9px] tracking-[0.15em] text-muted">
            <span>GROUNDED IN SCRIPTURE</span>
            <span>CREATED FOR SPIRITUAL READINESS</span>
            <span>READ AT YOUR OWN PACE</span>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="scroll-mt-24 border-t border-border py-16 md:py-24"
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-20">
            <SectionHeading
              eyebrow="Our purpose"
              title="A call to watch, discern and prepare."
            />

            <div className="space-y-5 text-sm leading-8 text-muted">
              <p>
                In a world of competing voices, the Word of God remains our sure
                foundation. Endtime Watch publishes biblical teachings to help
                believers understand the times, recognize error, and remain
                spiritually prepared for the return of Christ.
              </p>
              <p>
                Our calling is simple: bring attention back to Scripture,
                strengthen discernment, and encourage a life of faithful
                readiness.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
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
        </Container>
      </section>

      {/* Rapture and endtime explainer */}
      <section className="bg-navy py-16 text-ivory md:py-24">
        <Container>
          <Eyebrow light>A foundation for understanding</Eyebrow>

          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            The season. The moment.
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <Eyebrow light>01 / The season</Eyebrow>
              <h3 className="mt-4 font-serif text-6xl">Endtime</h3>

              <p className="mt-6 font-serif text-2xl leading-relaxed">
                The final season before the Rapture and Second Coming of Christ.
              </p>

              <p className="mt-5 text-sm leading-8 text-ivory/65">
                Scripture describes wars, false prophets, increasing sin,
                rebellion, falling away from the faith, and the gospel reaching
                the nations. These signs call believers to discernment and
                faithful living.
              </p>

              <p className="mt-6 text-[10px] tracking-wider text-gold">
                MATTHEW 24:6–14
              </p>
            </div>

            <div>
              <Eyebrow light>02 / The moment</Eyebrow>
              <h3 className="mt-4 font-serif text-6xl">Rapture</h3>

              <p className="mt-6 font-serif text-2xl leading-relaxed">
                The sudden catching away of the saints to meet the Lord Jesus
                Christ in the air.
              </p>

              <p className="mt-5 text-sm leading-8 text-ivory/65">
                The word “Rapture” comes from the Latin <em>rapio</em>, meaning
                “caught up,” corresponding to the biblical expression “caught up
                together with them in the clouds.”
              </p>

              <p className="mt-6 text-[10px] leading-6 tracking-wider text-gold">
                1 THESSALONIANS 4:16–17 · 1 CORINTHIANS 15:52 · MATTHEW 25:10
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-gold/40 pt-6 text-sm md:grid-cols-2">
            <p>
              <span className="text-gold">ENDTIME</span> — the period in which
              believers watch and prepare.
            </p>
            <p>
              <span className="text-gold">RAPTURE</span> — the moment when those
              who are ready meet Christ.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8">
            <blockquote className="font-serif text-2xl">
              “Watch ye therefore, and pray always...”
              <cite className="mt-3 block font-sans text-[10px] text-gold not-italic">
                LUKE 21:36
              </cite>
            </blockquote>

            <p className="text-xs leading-7 tracking-widest">
              BE WISE. BE WATCHFUL.
              <br />
              BE RAPTURE READY.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured teachings */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Biblical perspectives"
              title="Understand the Times"
            />

            <TextLink href="/teachings">Explore Teachings</TextLink>
          </div>

          {featuredTeaching ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <article className="bg-paper p-7 md:p-10">
                {featuredTeaching.coverImage?.asset?._ref && (
                  <Link
                    href={`/teachings/${featuredTeaching.slug}`}
                    aria-label={`Read ${featuredTeaching.title}`}
                    className="group -mx-7 -mt-7 mb-8 block md:-mx-10 md:-mt-10"
                  >
                    <TeachingPhoto
                      image={featuredTeaching.coverImage}
                      variant="feature"
                    />
                  </Link>
                )}
                <Eyebrow>
                  Featured teaching · {featuredTeaching.category}
                </Eyebrow>

                <h3 className="mt-6 font-serif text-4xl">
                  {featuredTeaching.title}
                </h3>

                <p className="mt-5 text-sm leading-8 text-muted">
                  {featuredTeaching.excerpt}
                </p>

                <p className="mt-6 text-xs text-muted">
                  {featuredTeaching.scripture} · {featuredTeaching.minutes} min
                  read
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <TextLink href={`/teachings/${featuredTeaching.slug}`}>
                    Read Teaching
                  </TextLink>
                  <ShareTeachingButton
                    title={featuredTeaching.title}
                    slug={featuredTeaching.slug}
                    excerpt={featuredTeaching.excerpt}
                  />
                </div>
              </article>

              <div className="space-y-8">
                {teachings.slice(1, 3).map((teaching) => (
                  <TeachingCard
                    key={teaching._id}
                    teaching={teaching}
                    compact
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">
              Biblical teachings are being prepared.
            </p>
          )}
        </Container>
      </section>

      {/* Library */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The Endtime Watch Library"
            title="Read. Study. Prepare."
            description="Explore our featured publication, created to strengthen biblical understanding and spiritual readiness."
          />

          <div className="mt-10 grid items-center gap-8 border border-border bg-ivory p-7 md:grid-cols-[190px_1fr] md:gap-12 md:p-10">
            <Image
              src="/images/book-cover.webp"
              alt={`${book.title} book cover`}
              width={662}
              height={1158}
              sizes="190px"
              className="mx-auto h-auto w-40 shadow-lg md:w-full"
            />

            <div>
              <Eyebrow>Endtime Watch publications</Eyebrow>

              <h3 className="mt-4 font-serif text-4xl md:text-5xl">
                {book.title}
              </h3>

              <p className="mt-3 font-serif text-2xl">{book.subtitle}</p>

              <p className="mt-3 text-xs text-muted">By {book.author}</p>

              <p className="mt-5 max-w-xl text-sm leading-8 text-muted">
                {book.description}
              </p>

              <p className="mt-5 text-xs text-muted">
                {book.chapters} chapters · Approximately {book.minutes} min read
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <ButtonLink href={`/library/${book.slug}`}>
                  Explore the Book
                </ButtonLink>
                <TextLink href="/library">Visit the Library</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Scripture */}
      <section className="px-6 py-20 text-center md:py-28">
        <span aria-hidden="true" className="font-serif text-6xl text-gold">
          “
        </span>

        <blockquote className="mx-auto max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          What I say unto you
          <br />I say unto all, Watch.
        </blockquote>

        <p className="mt-7 text-[10px] tracking-widest text-muted">
          MARK 13:37
        </p>
      </section>

      {/* Latest teachings */}
      <section className="border-t border-border py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="From the journal" title="Latest Teachings" />

          {teachings.length > 0 ? (
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {teachings.slice(0, 3).map((teaching) => (
                <TeachingCard key={teaching._id} teaching={teaching} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">
              Published teachings will appear here.
            </p>
          )}
        </Container>
      </section>

      {/* About */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-20">
            <SectionHeading
              eyebrow="About the ministry"
              title="Publishing the message. Sounding the warning."
            />

            <div>
              <p className="text-sm leading-8 text-muted">
                Endtime Watch is a Christian teaching ministry and digital
                publishing platform led by Evangelist Edwin Nwachukwu. Its
                purpose is to help believers return to biblical truth, grow in
                discernment, and prepare spiritually for the coming of Jesus
                Christ.
              </p>

              <div className="mt-7">
                <TextLink href="/about">Learn About Endtime Watch</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final call to action */}
      <GalleryPreview photos={galleryPhotos} />

      <section className="bg-navy px-6 py-20 text-center text-ivory">
        <Eyebrow light>A call to readiness</Eyebrow>

        <h2 className="mt-6 font-serif text-5xl leading-tight md:text-6xl">
          The hour is late.
          <br />
          Stay watchful.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-ivory/65">
          Explore biblical teachings created to help you understand the times
          and prepare for the return of Christ.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <ButtonLink href="/library" light>
            Explore the Library
          </ButtonLink>

          <TextLink href={`/library/${book.slug}`}>
            Start with the Book
          </TextLink>
        </div>
      </section>
    </main>
  );
}
