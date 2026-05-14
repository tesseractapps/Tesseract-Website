import { defineField, defineType } from 'sanity'

export const solutionPageType = defineType({
  name: 'solutionPage',
  title: 'Solution Page',
  type: 'document',
  orderings: [
    {
      title: 'Category + Order',
      name: 'catOrder',
      by: [
        { field: 'navCategory', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'navCategory' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle }: any) {
      const categoryEmoji: Record<string, string> = {
        'BY CARE TYPE': '🏥',
        'BY ROLE': '👤',
        'BY STAGE': '📈',
      }
      return {
        title,
        subtitle: `${categoryEmoji[subtitle] ?? ''} ${subtitle}`,
      }
    },
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Disability Support (NDIS Providers)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug — e.g. "disability-support-ndis" (auto-generated from title)',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navCategory',
      title: 'Nav Category',
      type: 'string',
      description: 'Which Solutions mega-menu category this page belongs to',
      options: {
        list: [
          { title: 'By Care Type', value: 'BY CARE TYPE' },
          { title: 'By Role', value: 'BY ROLE' },
          { title: 'By Stage', value: 'BY STAGE' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order within the nav category (1 = first)',
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'H1 Heading',
      type: 'string',
      description: 'Page title / H1',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short supporting sentence shown below the H1',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'navSubtitle',
      title: 'Nav Subtitle',
      type: 'string',
      description: 'Short text shown below the title in the navbar mega-menu (1 line, ~50 chars)',
      validation: (Rule) => Rule.max(80),
    }),

    // ── Main content sections ─────────────────────────────────────────────────
    defineField({
      name: 'whoIsThisFor',
      title: 'Who Is This For?',
      type: 'text',
      rows: 4,
      description: 'Description of the provider type or role this solution targets',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyBenefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list of the key outcomes this solution delivers',
      validation: (Rule) => Rule.required().min(3).max(8),
    }),
    defineField({
      name: 'howWeSupport',
      title: 'How We Support You',
      type: 'text',
      rows: 4,
      description: 'Paragraph explaining specifically how TesseractApps supports this care type/role',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatYouGet',
      title: 'What You Get',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Feature/capability list — concrete deliverables',
      validation: (Rule) => Rule.required().min(4).max(10),
    }),
    defineField({
      name: 'isThisRightForYou',
      title: 'Is This Right for You?',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Self-qualify checklist — providers should answer "yes" to at least one',
      validation: (Rule) => Rule.required().min(3).max(6),
    }),

    // ── Related solutions ─────────────────────────────────────────────────────
    defineField({
      name: 'relatedSolutions',
      title: 'Related Solutions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'solutionPage' }],
          options: { disableNew: true },
        },
      ],
      description: 'Up to 3 related solution pages shown at the bottom of this page',
      validation: (Rule) => Rule.max(3),
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Override meta title, description, and open graph settings for this page',
    }),
  ],
})
