import Image from "next/image";
import type { TeachingImage } from "@/sanity/image-types";
import { teachingImageAspectRatio, teachingImageUrl } from "@/sanity/lib/image";

type TeachingPhotoProps = {
  image?: TeachingImage | null;
  variant?: "preview" | "compact" | "feature" | "cover" | "content";
  showCaption?: boolean;
};

const layouts = {
  preview: {
    className: "aspect-[16/10]",
    width: 1000,
    height: 625,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
  compact: {
    className: "aspect-[4/5]",
    width: 300,
    height: 375,
    sizes: "125px",
  },
  feature: {
    className: "aspect-[16/10] md:aspect-[2/1]",
    width: 1400,
    height: 875,
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  cover: {
    className: "aspect-[4/3] md:aspect-[16/8.5]",
    width: 2000,
    height: 1500,
    sizes: "(max-width: 1024px) 100vw, 1000px",
  },
  content: {
    className: "",
    width: 1600,
    height: undefined,
    sizes: "(max-width: 768px) 100vw, 770px",
  },
};

export function TeachingPhoto({
  image,
  variant = "preview",
  showCaption = false,
}: TeachingPhotoProps) {
  const layout = layouts[variant];
  const src = teachingImageUrl(image, layout.width, layout.height);
  if (!image || !src) return null;

  return (
    <figure>
      <div
        className={`relative overflow-hidden bg-paper ${layout.className}`}
        style={
          variant === "content"
            ? { aspectRatio: teachingImageAspectRatio(image) }
            : undefined
        }
      >
        <Image
          src={src}
          alt={image.alt ?? ""}
          fill
          sizes={layout.sizes}
          loading={variant === "cover" ? "eager" : "lazy"}
          className="object-cover saturate-[.65] transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
      {showCaption && (image.caption || image.credit) && (
        <figcaption className="flex flex-col justify-between gap-1 border-b border-border py-3 font-sans text-[10px] leading-5 text-muted sm:flex-row sm:gap-4">
          {image.caption && <span>{image.caption}</span>}
          {image.credit && <span>Photo: {image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
