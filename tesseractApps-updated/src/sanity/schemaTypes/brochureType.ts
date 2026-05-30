import { defineField, defineType } from 'sanity'

export const brochureType = defineType({
  name: 'brochure',
  title: 'Brochure',
  type: 'document',
  orderings: [
    {
      title: 'Featured First, Then Newest',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'coverImage',
    },
    prepare(selection) {
      const { status } = selection as { status?: string; title: string; media: unknown }
      return {
        ...selection,
        subtitle: status ?? 'draft',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Coming Soon', value: 'coming_soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the listing card. Max 200 characters.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Brochure PDF',
      type: 'file',
      description: 'Upload the brochure PDF. Users will be able to open it directly.',
      options: {
        accept: '.pdf,application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Optional cover image or thumbnail shown on the listing card.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this brochure at the top of the listing.',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
