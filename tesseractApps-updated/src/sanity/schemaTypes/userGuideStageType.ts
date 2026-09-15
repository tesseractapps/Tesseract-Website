// userGuideStageType.ts

import { defineField, defineType } from "sanity";

export const userGuideStageType = defineType({
  name: "userGuideStage",
  title: "User Guide Stage",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "focus",
      title: "Focus",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "staffRange",
      title: "Staff Range",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Draft", value: "draft" },
        ],
      },
      initialValue: "active",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
