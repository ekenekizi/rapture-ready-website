import { defineArrayMember, defineField, defineType } from "sanity";

export const teachingType = defineType({
  name: "teaching",
  title: "Teaching",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(150),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        "Click Generate after entering the title. Avoid changing this after publication.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Rapture",
          "End Times",
          "Discernment",
          "Christian Living",
          "Prophecy",
          "Salvation",
          "Spiritual Readiness",
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Short introduction",
      type: "text",
      rows: 3,
      description:
        "Shown on teaching listings and at the beginning of the article.",
      validation: (rule) => rule.required().max(350),
    }),

    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "teachingImage",
      description:
        "Optional. Shown on the homepage, teaching previews, and above the article. Use the crop and hotspot controls to choose the focal point.",
    }),

    defineField({
      name: "scripture",
      title: "Main scripture reference",
      type: "string",
      description: "For example: Matthew 24:42",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Evangelist Edwin Nwachukwu",
    }),

    defineField({
      name: "minutes",
      title: "Estimated reading time",
      type: "number",
      description: "Enter the approximate reading time in minutes.",
      initialValue: 8,
      validation: (rule) => rule.required().integer().min(1),
    }),

    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "body",
      title: "Teaching content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",

          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Scripture quotation", value: "blockquote" },
            { title: "Scripture reference", value: "scriptureReference" },
          ],

          lists: [
            { title: "Bullet list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],

          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        }),
        defineArrayMember({ type: "teachingImage", title: "Content photo" }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "newestFirst",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
