import { defineArrayMember, defineField, defineType } from "sanity";
import { definitionFields, quoteField, sectionFields } from "./page-fields";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  description:
    "Publish the ministry’s approved wording here. Optional sections remain hidden until provided.",
  fields: [
    defineField({
      name: "hero",
      title: "Hero introduction",
      type: "object",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "text",
          rows: 2,
          description: "Use a new line for each stacked line of the headline.",
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: "emphasis",
          title: "Gold emphasis line",
          type: "string",
          validation: (rule) => rule.max(100),
        }),
        defineField({
          name: "description",
          title: "Supporting message",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required().max(700),
        }),
        quoteField("scripture", "Hero scripture"),
        defineField({
          name: "image",
          title: "Hero image",
          type: "teachingImage",
          description:
            "Optional. Upload a photo or illustration and add alt text. Crop/hotspot controls set its framing. Leave empty to keep the current watchtower illustration.",
        }),
        defineField({
          name: "imageCaption",
          title: "Hero image caption",
          type: "string",
          validation: (rule) => rule.max(150),
        }),
        defineField({
          name: "values",
          title: "Short values below the hero",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      fields: [
        ...sectionFields(),
        defineField({
          name: "pillars",
          title: "Mission pillars",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required().max(80),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                  validation: (rule) => rule.required().max(350),
                }),
              ],
            }),
          ],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),
    defineField({
      name: "explainer",
      title: "Endtime and Rapture teaching feature",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "title",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: "endtime",
          title: "Endtime definition",
          type: "object",
          fields: definitionFields(),
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "rapture",
          title: "Rapture definition",
          type: "object",
          fields: definitionFields(),
          validation: (rule) => rule.required(),
        }),
        quoteField("scripture", "Closing scripture"),
        defineField({
          name: "closingStatement",
          title: "Closing statement",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(300),
        }),
      ],
    }),
    quoteField("scripture", "Spacious scripture feature"),
    defineField({
      name: "about",
      title: "About the ministry preview",
      type: "object",
      fields: sectionFields(),
    }),
    defineField({
      name: "finalCta",
      title: "Final invitation",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "title",
          title: "Heading",
          type: "text",
          rows: 2,
          validation: (rule) => rule.required().max(200),
        }),
        defineField({
          name: "description",
          title: "Supporting text",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(700),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
