import { defineArrayMember, defineField, defineType } from "sanity";
import { galleryCategories } from "@/lib/gallery";
import type { TeachingImage } from "@/sanity/image-types";
export const galleryPhotoType = defineType({
  name: "galleryPhoto",
  title: "Gallery photo study",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "image", title: "Image & context" },
    { name: "study", title: "Scripture & study" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Study title",
      type: "string",
      group: "overview",
      validation: (r) => r.required().max(150),
    }),
    defineField({
      name: "slug",
      title: "Sharing URL slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      description:
        "Click Generate. Keep this unchanged after sharing the study. Existing photos use their document ID until a slug is set.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Topic",
      type: "string",
      group: "overview",
      options: { list: galleryCategories.filter((c) => c !== "All studies") },
      description:
        "For older activity photos, select one of the new study topics.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short introduction",
      type: "text",
      rows: 3,
      group: "overview",
      description: "Shown on the study card and beneath the study title.",
      validation: (r) => r.required().max(350),
    }),
    defineField({
      name: "minutes",
      title: "Reading time in minutes",
      type: "number",
      group: "overview",
      initialValue: 5,
      validation: (r) => r.required().integer().min(1).max(120),
    }),
    defineField({
      name: "image",
      title: "Study image",
      type: "teachingImage",
      group: "image",
      description:
        "Upload the image, add neutral alt text and a credit, and adjust the crop/hotspot.",
      validation: (r) =>
        r
          .required()
          .custom((v) =>
            v && !(v as Partial<TeachingImage>).asset?._ref
              ? "Upload an image before publishing."
              : true,
          ),
    }),
    defineField({
      name: "imageKind",
      title: "Image type",
      type: "string",
      group: "image",
      options: {
        list: [
          { title: "Photograph", value: "photograph" },
          { title: "Symbolic illustration / artwork", value: "illustration" },
          { title: "Origin not verified", value: "unverified" },
        ],
      },
      initialValue: "unverified",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imageContext",
      title: "Image context & provenance",
      type: "text",
      rows: 3,
      group: "image",
      description:
        "State what is verified, the source, and whether the image is illustrative. Avoid presenting an illustration as a documented event.",
      validation: (r) => r.required().max(700),
    }),
    defineField({
      name: "sensitiveImage",
      title: "Conceal graphic imagery until the reader chooses to reveal it",
      type: "boolean",
      group: "image",
      initialValue: false,
    }),
    defineField({
      name: "source",
      title: "Original source / credit link",
      type: "url",
      group: "image",
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "scriptures",
      title: "01 · What the Bible says first",
      type: "array",
      group: "study",
      of: [
        defineArrayMember({
          name: "scripture",
          title: "Scripture passage",
          type: "object",
          fields: [
            defineField({
              name: "reference",
              title: "Reference and translation",
              type: "string",
              description: "For example: Matthew 24:33 · KJV excerpt",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "quotation",
              title: "Quotation",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "reference", subtitle: "quotation" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "observation",
      title: "02 · What is visible",
      type: "text",
      rows: 5,
      group: "study",
      description: "Describe the image separately from your interpretation.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reflectionTitle",
      title: "03 · Reflection heading",
      type: "string",
      group: "study",
      validation: (r) => r.required().max(150),
    }),
    defineField({
      name: "reflection",
      title: "03 · Biblical reflection",
      type: "text",
      rows: 10,
      group: "study",
      description:
        "Explain the Scripture references and the ministry’s interpretation. Separate theological commentary from factual claims.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "responses",
      title: "04 · Reflect & respond",
      type: "array",
      group: "study",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Add prayer prompts, reflection questions, or suggested further reading.",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "photoDate",
      title: "Image date (if known)",
      type: "date",
      group: "publishing",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "publishing",
      initialValue: 100,
      validation: (r) => r.required().integer().min(0).max(9999),
    }),
    defineField({
      name: "showOnHomepage",
      title: "Feature on the homepage",
      type: "boolean",
      group: "publishing",
      initialValue: true,
      description: "The first three featured studies appear on the homepage.",
    }),
    defineField({
      name: "isVisible",
      title: "Show on the website",
      type: "boolean",
      group: "publishing",
      initialValue: true,
      description: "Turn off and publish to hide a study without deleting it.",
    }),
  ],
  orderings: [
    {
      title: "Website display order",
      name: "websiteOrder",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
