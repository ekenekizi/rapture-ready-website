import { Container, SectionHeading, TextLink } from "@/components/ui";
import { getGalleryPhotos } from "@/sanity/lib/gallery";
import { ContentEmpty } from "@/components/content-empty";
import { GalleryStudyCard } from "@/components/gallery-study-card";
export async function GalleryPreview() {
  const photos = (await getGalleryPhotos())
    .filter((photo) => photo.showOnHomepage)
    .slice(0, 3);
  return (
    <section className="prophecy-home border-t border-border py-16 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The photo journal"
            title="Bible Prophecy Photos"
            description="Visual studies. Biblical context. A call to discernment."
          />
          <TextLink href="/gallery">Explore the collection</TextLink>
        </div>
        {photos.length ? (
          <div className="prophecy-grid prophecy-home-grid">
            {photos.map((photo, index) => (
              <GalleryStudyCard
                key={photo.id}
                photo={photo}
                number={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="mt-9">
            <ContentEmpty
              title="Photo studies are coming soon."
              description="Images, Scripture passages, and biblical reflections will appear here when published."
            />
          </div>
        )}
      </Container>
    </section>
  );
}
