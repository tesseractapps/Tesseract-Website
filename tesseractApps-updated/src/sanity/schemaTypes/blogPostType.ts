import { defineField, defineType } from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First, Then Newest',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
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
      author0: 'authors.0.name',
      media: 'mainImage',
      status: 'status',
    },
    prepare(selection) {
      const { author0, status } = selection as {
        author0?: string
        status?: string
        title: string
        media: unknown
      }
      return {
        ...selection,
        subtitle: `${author0 ?? 'Unknown author'} · ${status ?? 'draft'}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
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
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'human' }] }],
      description: 'One or more authors. Each must have "Blog author" enabled on their Human record.',
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used as meta description fallback. Max 160 characters.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this post in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      description: 'Optional CTA block rendered at the bottom of the article.',
      fields: [
        defineField({
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Buttons (default)', value: 'buttons' },
              { title: 'Subscribe form', value: 'subscribe' },
            ],
            layout: 'radio',
          },
          initialValue: 'buttons',
          description: '"Subscribe form" shows an inline email sign-up instead of buttons.',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'e.g. "Download our free SIL Compliance Readiness Checklist"',
        }),
        defineField({
          name: 'body',
          title: 'Body Text',
          type: 'text',
          rows: 2,
          description: 'Short description beneath the heading.',
        }),
        defineField({
          name: 'primaryLabel',
          title: 'Primary Button Label',
          type: 'string',
          description: 'e.g. "Download the Checklist" — not used for subscribe variant.',
        }),
        defineField({
          name: 'primaryUrl',
          title: 'Primary Button URL',
          type: 'string',
          description: 'Use a relative path for internal links (e.g. /guides/sil-compliance-checklist).',
        }),
        defineField({
          name: 'secondaryLabel',
          title: 'Secondary Button Label',
          type: 'string',
          description: 'e.g. "Book a Free Demo"',
        }),
        defineField({
          name: 'secondaryUrl',
          title: 'Secondary Button URL',
          type: 'string',
          description: 'e.g. /book-a-demo',
        }),
      ],
    }),
  ],
})
