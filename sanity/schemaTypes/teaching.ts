import { defineArrayMember, defineField, defineType } from "sanity";

export const teachingType = defineType({
  name: "teaching",
  title: "Teaching",
  type: "document",

  fields: [
    defineField({
      name: "format",
      title: "Teaching format",
      type: "string",
      options: {
        list: [
          { title: "Written article", value: "written" },
          { title: "Video teaching", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "written",
      description:
        "Existing teachings without a format are treated as written articles.",
      validation: (r) => r.required(),
    }),
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
      validation: (r) =>
        r.custom((value, context) =>
          context.document?.format === "video" &&
          !(value as { asset?: { _ref?: string } } | undefined)?.asset?._ref
            ? "Add a thumbnail for this video teaching."
            : true,
        ),
      title: "Cover photo / video thumbnail",
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
      hidden: ({ document }) => document?.format === "video",
      type: "number",
      description: "Enter the approximate reading time in minutes.",
      initialValue: 8,
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.format === "video" ||
          (typeof value === "number" && Number.isInteger(value) && value >= 1)
            ? true
            : "Enter a reading time of at least 1 minute.",
        ),
    }),

    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "isVisible",
      title: "Show on the website",
      type: "boolean",
      initialValue: true,
      description:
        "Turn off and publish to hide this teaching without deleting it.",
    }),

    defineField({
      name: "videoFile",
      title: "Video file (MP4)",
      type: "file",
      options: { accept: "video/mp4,.mp4" },
      hidden: ({ document }) => document?.format !== "video",
      description:
        "Upload an MP4 exported with H.264 video and AAC audio. The website plays this file directly; it does not convert other formats or generate multiple streaming qualities.",
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (context.document?.format !== "video") return true;
          const ref = (value as { asset?: { _ref?: string } } | undefined)
            ?.asset?._ref;
          if (!ref) return "Upload an MP4 video before publishing.";
          try {
            const asset = await context
              .getClient({ apiVersion: "2026-01-01" })
              .fetch<{ mimeType: string }>("*[_id == $id][0]{mimeType}", {
                id: ref,
              });
            return asset?.mimeType === "video/mp4"
              ? true
              : "Please upload an MP4 video file.";
          } catch {
            return "Unable to verify the video file. Check your connection and try again.";
          }
        }),
    }),
    defineField({
      name: "durationSeconds",
      title: "Video duration in seconds",
      type: "number",
      hidden: ({ document }) => document?.format !== "video",
      description: "For 4 minutes 32 seconds, enter 272.",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.format !== "video" ||
          (typeof value === "number" && Number.isInteger(value) && value > 0)
            ? true
            : "Enter the video duration in seconds.",
        ),
    }),
    defineField({
      name: "videoLabel",
      title: "Video label",
      type: "string",
      hidden: ({ document }) => document?.format !== "video",
      initialValue: "Short teaching",
      description: "For example: Short teaching or Biblical reflection.",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "scriptureQuote",
      title: "Scripture quotation",
      type: "text",
      rows: 4,
      hidden: ({ document }) => document?.format !== "video",
      description:
        "Optional. Add the quotation that accompanies the Main scripture reference. Include the translation in the reference.",
    }),
    defineField({
      name: "reflectionPoints",
      title: "Reflect & respond",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ document }) => document?.format !== "video",
      description: "Optional reflection questions or key teaching points.",
    }),
    defineField({
      name: "captionsFile",
      title: "Captions (WebVTT)",
      type: "file",
      options: { accept: "text/vtt,.vtt" },
      hidden: ({ document }) => document?.format !== "video",
      description: "Optional .vtt captions file for the video.",
      validation: (rule) =>
        rule.custom(async (value, context) => {
          const ref = (value as { asset?: { _ref?: string } } | undefined)
            ?.asset?._ref;
          if (!ref || context.document?.format !== "video") return true;
          try {
            const asset = await context
              .getClient({ apiVersion: "2026-01-01" })
              .fetch<{ extension: string }>("*[_id == $id][0]{extension}", {
                id: ref,
              });
            return asset?.extension === "vtt"
              ? true
              : "Upload a WebVTT (.vtt) captions file.";
          } catch {
            return "Unable to verify captions. Try again.";
          }
        }),
    }),
    defineField({
      name: "captionsLanguage",
      title: "Captions language",
      type: "string",
      initialValue: "en",
      hidden: ({ document }) => document?.format !== "video",
      description: "Language code, for example en for English.",
      validation: (r) =>
        r
          .regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/)
          .error("Enter a language code such as en or en-NG."),
    }),
    defineField({
      name: "body",
      title: "Teaching content / video notes or transcript",
      description:
        "Required for written articles. For videos, optionally add notes or a transcript. Video descriptions use the Short introduction field above.",
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
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.format === "video" ||
          (Array.isArray(value) && value.length > 0)
            ? true
            : "Add the written teaching content.",
        ),
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
