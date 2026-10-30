import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Website settings",
  type: "document",
  fields: [
    defineField({
      name: "seoDescription",
      title: "Website description for search engines",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "footerDescription",
      title: "Footer ministry description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: "footerSlogan",
      title: "Footer slogan",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook profile URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok profile URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "xUrl",
      title: "X profile URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "contactEmail",
      title: "Ministry contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: { prepare: () => ({ title: "Website settings" }) },
});
