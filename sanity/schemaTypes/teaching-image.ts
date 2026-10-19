import { defineField, defineType } from "sanity";

export const teachingImageType = defineType({
  name: "teachingImage",
  title: "Content photo",
  type: "image",
  options: {
    hotspot: true,
    accept: "image/jpeg,image/png,image/webp,image/avif",
  },
  fields: [
    defineField({
      name: "alt",
      title: "Image description (alt text)",
      type: "string",
      description:
        "Describe what the photo shows for people using screen readers.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional text displayed below the photo on the teaching page.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "credit",
      title: "Photo credit",
      type: "string",
      description: "For example: Photographer name / Ministry name.",
      validation: (rule) => rule.max(150),
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "caption", media: "asset" },
  },
});
