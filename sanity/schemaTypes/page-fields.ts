import { defineArrayMember, defineField } from "sanity";

export function paragraphField() {
  return defineField({
    name: "paragraphs",
    title: "Paragraphs",
    type: "array",
    of: [
      defineArrayMember({
        type: "text",
        rows: 4,
        validation: (rule) => rule.required(),
      }),
    ],
    validation: (rule) => rule.required().min(1),
  });
}

export function sectionFields() {
  return [
    defineField({
      name: "eyebrow",
      title: "Small section label",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
    paragraphField(),
  ];
}

export function quoteField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "text",
        title: "Scripture quotation",
        type: "text",
        rows: 3,
        validation: (rule) => rule.required().max(600),
      }),
      defineField({
        name: "reference",
        title: "Scripture reference",
        type: "string",
        validation: (rule) => rule.required().max(100),
      }),
    ],
  });
}

export function definitionFields() {
  return [
    defineField({
      name: "label",
      title: "Small label",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "title",
      title: "Term",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "definition",
      title: "Definition",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "explanation",
      title: "Explanation",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().max(1500),
    }),
    defineField({
      name: "scriptures",
      title: "Scripture references",
      type: "string",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      description:
        "Enter the complete summary as you want it displayed. You may put a heading on the first line and its explanation on the next. Line breaks are preserved; the website does not add the term automatically.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
  ];
}
