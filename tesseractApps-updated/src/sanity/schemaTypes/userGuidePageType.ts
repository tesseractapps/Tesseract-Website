import { defineField, defineType } from "sanity";

export const userGuidePageType = defineType({
  name: "userGuidePage",
  title: "User Guide Page",
  type: "document",
  orderings: [
    {
      title: "Published Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      stage: "stage.title",
    },

    prepare(selection) {
      const { status, stage } = selection;

      return {
        title: selection.title,
        subtitle: `${stage ?? "No Stage"} • ${status ?? "draft"}`,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "stage",
    //   title: "Stage",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Start", value: "start" },
    //       { title: "Growth", value: "growth" },
    //       { title: "Scale", value: "scale" },
    //       { title: "Enterprise", value: "enterprise" },
    //     ],
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "reference",

      to: [{ type: "userGuideStage" }],

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Guide Order",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Used as meta description fallback. Max 160 characters.",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "object",
      description: "Optional CTA block rendered at the bottom of the article.",
      fields: [
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: {
            list: [
              { title: "Buttons (default)", value: "buttons" },
              { title: "Subscribe form", value: "subscribe" },
            ],
            layout: "radio",
          },
          initialValue: "buttons",
          description:
            '"Subscribe form" shows an inline email sign-up instead of buttons.',
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description:
            'e.g. "Download our free SIL Compliance Readiness Checklist"',
        }),
        defineField({
          name: "body",
          title: "Body Text",
          type: "text",
          rows: 2,
          description: "Short description beneath the heading.",
        }),
        defineField({
          name: "primaryLabel",
          title: "Primary Button Label",
          type: "string",
          description:
            'e.g. "Download the Checklist" — not used for subscribe variant.',
        }),
        defineField({
          name: "primaryUrl",
          title: "Primary Button URL",
          type: "string",
          description:
            "Use a relative path for internal links (e.g. /guides/sil-compliance-checklist).",
        }),
        defineField({
          name: "secondaryLabel",
          title: "Secondary Button Label",
          type: "string",
          description: 'e.g. "Book a Free Demo"',
        }),
        defineField({
          name: "secondaryUrl",
          title: "Secondary Button URL",
          type: "string",
          description: "e.g. /book-a-demo",
        }),
      ],
    }),
  ],
});
