import { defineField, defineType } from 'sanity'

export const guideType = defineType({
  name: 'guide',
  title: 'Guide',
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
  ],
  preview: {
    select: { title: 'title', status: 'status', media: 'coverImage' },
    prepare(selection) {
      const { status } = selection as { status?: string; title: string; media: unknown }
      return { ...selection, subtitle: status ?? 'draft' }
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
      options: { source: 'title', maxLength: 96, isUnique: (v, ctx) => ctx.defaultIsUnique(v, ctx) },
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
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'e.g. "SIL", "Compliance", "Workforce" — used for filtering on the listing page.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (H1)',
      type: 'string',
      description: 'Main headline shown at the top of the landing page. Falls back to title if empty.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      description: 'Subheadline paragraph shown beneath the H1.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Description (Card / SEO)',
      type: 'text',
      rows: 3,
      description: 'Short description shown on listing cards and used as SEO fallback. Max 300 characters.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Page Body',
      type: 'blockContent',
      description: 'Full landing page content rendered between the hero and the form. Use H2/H3 headings, bullet lists, and callout blocks.',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'human' }] }],
      description: 'Team members who authored or contributed to this guide.',
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      description: 'e.g. "SIL Providers and Frontline Managers"',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      description: 'Upload the guide/checklist PDF. Delivered after form submission.',
      options: { accept: '.pdf,application/pdf' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Cover thumbnail shown on listing cards and the landing page hero.',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this guide at the top of the listing.',
      initialValue: false,
    }),
    defineField({
      name: 'formConfig',
      title: 'Download Form',
      type: 'object',
      description: 'Controls the gated download form on the guide landing page.',
      fields: [
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          description: 'e.g. "Download My Free Checklist"',
          initialValue: 'Download Now',
        }),
        defineField({
          name: 'confirmationMessage',
          title: 'Post-Submission Confirmation',
          type: 'text',
          rows: 3,
          description: 'Shown inline after a successful form submission. Include a fallback "click here" note if needed.',
        }),
        defineField({
          name: 'trustIndicators',
          title: 'Trust Indicators',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Bullet points shown below the form to build trust (e.g. "Updated for the 2026 NDIS Practice Standards reform").',
          options: { layout: 'tags' },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
