import { defineField, defineType } from "sanity";

export const releaseNoteType = defineType({
  name: "releaseNote",
  title: "Release Note",
  type: "document",
  orderings: [
    {
      title: "Release Date, Newest First",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "version", subtitle: "releaseDate" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ? `v${title}` : "Untitled", subtitle };
    },
  },
  fields: [
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: 'Semver without "v" prefix — e.g. "1.29.0"',
      validation: (Rule) =>
        Rule.required().regex(/^\d+\.\d+\.\d+$/, {
          name: "semver",
          invert: false,
        }),
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "releaseType",
      title: "Release Type",
      type: "string",
      options: {
        list: [
          { title: "Major", value: "major" },
          { title: "Minor", value: "minor" },
          { title: "Patch", value: "patch" },
        ],
        layout: "radio",
      },
      initialValue: "minor",
    }),
    defineField({
      name: "changes",
      title: "Changes",
      type: "array",
      of: [
        {
          type: "object",
          name: "changeItem",
          title: "Change Item",
          preview: {
            select: {
              title: "title",
              category: "category",
            },
            prepare({ title, category }) {
              return {
                title,
                subtitle: category?.join(", ") ?? "",
              };
            },
          },
          fields: [
            {
              name: "title",
              type: "string",
              title: "Feature/Change Title",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "description",
              type: "blockContent",
              title: "Description",
            },
            {
              name: "category",
              type: "array",
              title: "Categories",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "New Feature", value: "New Feature" },
                  { title: "Enhancement", value: "Enhancement" },
                  { title: "Bug Fix", value: "Bug Fix" },
                  { title: "Mobile", value: "Mobile" },
                  { title: "Accounting", value: "Accounting" },
                  { title: "Integration", value: "Integration" },
                ],
                layout: "grid",
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
