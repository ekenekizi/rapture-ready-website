import { defineField, defineType } from "sanity";
import { paragraphField } from "./page-fields";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About the ministry",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small page label",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "title",
      title: "Page heading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(700),
    }),
    defineField({
      name: "sectionTitle",
      title: "Ministry story heading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "image",
      title: "About ministry image",
      type: "teachingImage",
      description:
        "Optional. Used on this About page and in the homepage About preview. Add alt text and adjust the crop/hotspot. Leave empty to retain the current About-page arch artwork and homepage text layout.",
    }),
    paragraphField(),
  ],
  preview: { prepare: () => ({ title: "About the ministry" }) },
});
