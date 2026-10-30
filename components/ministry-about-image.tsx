import Image from "next/image";
import type { TeachingImage } from "@/sanity/image-types";
import { teachingImageAspectRatio, teachingImageUrl } from "@/sanity/lib/image";

export function MinistryAboutImage({
  image,
}: {
  image?: TeachingImage | null;
}) {
  const src = teachingImageUrl(image, 1400);
  if (src) {
    return (
      <figure>
        <div className="mx-auto w-full max-w-[420px]">
          <Image
            src={src}
            alt={image?.alt || "Endtime Watch ministry"}
            width={1400}
            height={Math.round(1400 / (image ? teachingImageAspectRatio(image) : 1))}
            sizes="(max-width: 480px) 90vw, 420px"
            className="h-auto w-full object-contain"
          />
        </div>
        {image?.caption && (
          <figcaption className="mt-3 text-[10px] leading-5 text-muted">
            {image.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <figure className="relative flex h-[260px] items-center justify-center overflow-hidden bg-[#dcd8cc] md:h-[350px]">
      <svg
        viewBox="0 0 300 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-[70%] text-[#8f8b7b]"
        aria-hidden="true"
      >
        <path d="M80 155V82a70 70 0 0 1 140 0v73M92 155V84a58 58 0 0 1 116 0v71M104 155V86a46 46 0 0 1 92 0v69M116 155V88a34 34 0 0 1 68 0v67" />
        <path d="M40 156h220M150 34v122M132 72h36" />
      </svg>
      <figcaption className="absolute bottom-5 text-[8px] tracking-[2px] uppercase">
        Grounded in Scripture
      </figcaption>
    </figure>
  );
}

