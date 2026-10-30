import { MinistryAboutImage } from "@/components/ministry-about-image";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Container, Eyebrow, TextLink, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { ContentEmpty } from "@/components/content-empty";
import { getAboutPage } from "@/sanity/lib/pages";

export const metadata: Metadata = pageMetadata({
  title: "About the Ministry",
  description:
    "Learn about Endtime Watch, its biblical teaching ministry, and its call to watch, discern, and prepare for the return of Jesus Christ.",
  path: "/about",
});

export default async function AboutPage() {
  const content = await getAboutPage();
  return (
    <main id="main-content">
      <Container>
        {content?.title && content.paragraphs?.length ? (
          <>
            <Reveal
              trigger="load"
              className="pt-14 pb-10 md:pt-[72px] md:pb-11"
            >
              <Eyebrow>{content.eyebrow ?? "Our ministry"}</Eyebrow>
              <h1 className="my-[18px] font-serif text-5xl leading-[1.05] tracking-tight whitespace-pre-line md:text-[66px]">
                {content.title}
              </h1>
              <p className="max-w-[610px] text-sm leading-7 text-muted whitespace-pre-line">
                {content.introduction}
              </p>
            </Reveal>
            <section className="grid items-center gap-9 border-t border-border py-14 md:grid-cols-2 md:gap-16 md:py-20 lg:gap-[85px]">
              <Reveal>
                <MinistryAboutImage image={content.image} />
              </Reveal>
              <Reveal delay={0.08}>
                {content.sectionTitle && (
                  <h2 className="mb-6 font-serif text-4xl leading-tight whitespace-pre-line md:text-[42px]">
                    {content.sectionTitle}
                  </h2>
                )}
                <div className="space-y-5 text-[13px] leading-7 text-muted">
                  {content.paragraphs.map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6">
                  <TextLink href="/library">Explore the Library</TextLink>
                </div>
              </Reveal>
            </section>
          </>
        ) : (
          <div className="py-16 md:py-24">
            <h1 className="mb-9 font-serif text-5xl md:text-6xl">
              About Endtime Watch
            </h1>
            <ContentEmpty
              title="Ministry information is coming soon."
              description="Our story and mission will appear here when the information is available."
            />
            <div className="mt-7">
              <ButtonLink href="/library">Explore the Library</ButtonLink>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
