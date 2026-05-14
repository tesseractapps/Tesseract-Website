import { defineField, defineType } from 'sanity'

export const capabilityPageType = defineType({
  name: 'capabilityPage',
  title: 'Capability Page',
  type: 'document',
  orderings: [
    {
      title: 'Nav Group + Order',
      name: 'navGroupOrder',
      by: [
        { field: 'navGroup', direction: 'asc' },
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
    select: { title: 'title', subtitle: 'navGroup' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle }: any) {
      const groupEmoji: Record<string, string> = {
        Workforce: '👷',
        'Participant & Care': '🤝',
        Finance: '💰',
        'Operational Intelligence': '📊',
      }
      return {
        title,
        subtitle: `${groupEmoji[subtitle] ?? ''} ${subtitle}`,
      }
    },
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Rostering & Scheduling"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug — e.g. "rostering-scheduling" (auto-generated from title)',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navGroup',
      title: 'Nav Group',
      type: 'string',
      description: 'Which mega-menu group this capability belongs to in the navigation',
      options: {
        list: [
          { title: 'Workforce', value: 'Workforce' },
          { title: 'Participant & Care', value: 'Participant & Care' },
          { title: 'Finance', value: 'Finance' },
          { title: 'Operational Intelligence', value: 'Operational Intelligence' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order within the nav group (1 = first)',
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'H1 Heading',
      type: 'string',
      description: 'Page title / H1 — e.g. "Rostering That Actually Works for Disability Services."',
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
      name: 'problemStatement',
      title: 'The Problem',
      type: 'text',
      rows: 5,
      description: 'A specific, vivid scenario that describes the operational problem this capability solves',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatMattersMost',
      title: 'What Matters Most',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list of the key outcomes providers care about',
      validation: (Rule) => Rule.required().min(3).max(8),
    }),
    defineField({
      name: 'howWeSolveThis',
      title: 'How We Solve This',
      type: 'text',
      rows: 5,
      description: 'Paragraph explaining specifically how TesseractApps addresses the problem',
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
      description: 'Self-qualify checklist — providers should answer "yes" to at least one of these',
      validation: (Rule) => Rule.required().min(3).max(6),
    }),

    // ── Related capabilities ──────────────────────────────────────────────────
    defineField({
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'capabilityPage' }],
          options: { disableNew: true },
        },
      ],
      description: 'Up to 3 related capability pages shown at the bottom of this page',
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
