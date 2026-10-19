import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";
import type { TeachingImage } from "@/sanity/image-types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function teachingImageUrl(
  image: TeachingImage | null | undefined,
  width: number,
  height?: number,
) {
  if (!image?.asset?._ref) return null;

  const url = builder.image(image).width(width).auto("format");
  return height ? url.height(height).fit("crop").url() : url.fit("max").url();
}

export function teachingImageAspectRatio(image: TeachingImage) {
  const dimensions = image.dimensions;
  if (!dimensions?.width || !dimensions.height) return 3 / 2;

  const crop = image.crop;
  const width = dimensions.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0));
  const height =
    dimensions.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0));
  return width > 0 && height > 0 ? width / height : 3 / 2;
}
