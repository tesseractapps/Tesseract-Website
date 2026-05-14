import { defineField, defineType } from 'sanity'

export const competitorPageType = defineType({
  name: 'competitorPage',
  title: 'Competitor Pages',
  type: 'document',
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Competitor A–Z',
      name: 'competitorAsc',
      by: [{ field: 'competitorName', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'competitorName', order: 'order' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, order }: any) {
      return {
        title,
        subtitle: `#${order ?? '?'} — vs ${subtitle ?? ''}`,
      }
    },
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "TesseractApps vs ShiftCare"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug — e.g. "shiftcare" → /tesseract-vs/shiftcare (auto-generated from competitor name)',
      options: { source: 'competitorName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitorName',
      title: 'Competitor Name',
      type: 'string',
      description: 'The competitor\'s exact brand name — used in headings and dynamic text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Sort order in Studio listings (1 = first)',
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'H1 Heading',
      type: 'string',
      description: 'Page title / H1 — e.g. "TesseractApps vs ShiftCare"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short supporting sentence shown below the H1 — make it SEO-distinct per competitor',
      validation: (Rule) => Rule.max(300),
    }),

    // ── About TesseractApps ───────────────────────────────────────────────────
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      description: 'Section heading — defaults to "About TesseractApps" if left blank',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Body Text',
      type: 'text',
      rows: 6,
      description: 'Brand narrative paragraphs — separate paragraphs with a blank line. Covers Salesforce Hyperforce, SCHADS, unified architecture, NDIS-native design.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutTrustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short trust signal labels shown in the hero and about section — e.g. "Salesforce Hyperforce", "SCHADS Award Compliant"',
      validation: (Rule) => Rule.max(6),
    }),

    // ── Award Badges ──────────────────────────────────────────────────────────
    defineField({
      name: 'awardBadges',
      title: 'Award / Trust Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'sub', title: 'Sub-label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'sub' },
          },
        },
      ],
      description: 'Circular badge items shown in the "Why providers choose TesseractApps" section',
      validation: (Rule) => Rule.max(6),
    }),

    // ── Comparison Table ──────────────────────────────────────────────────────
    defineField({
      name: 'comparisonCategories',
      title: 'Comparison Table Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Category Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'rows',
              title: 'Feature Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'feature', title: 'Feature', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'us', title: 'TesseractApps has this?', type: 'boolean' }),
                    defineField({
                      name: 'them',
                      title: 'Competitor status',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Yes ✅', value: 'yes' },
                          { title: 'No ❌', value: 'no' },
                          { title: 'Partial / Unknown —', value: 'partial' },
                        ],
                        layout: 'radio',
                      },
                    }),
                  ],
                  preview: { select: { title: 'feature' } },
                },
              ],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      description: 'Feature comparison table — add categories and rows. "them" value: yes/no/partial.',
    }),

    // ── Switch Steps ──────────────────────────────────────────────────────────
    defineField({
      name: 'switchSteps',
      title: 'How to Switch — Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Step Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      description: 'Steps shown in the "Switching to TesseractApps" section. 3 steps recommended.',
      validation: (Rule) => Rule.max(5),
    }),

    // ── When TesseractApps Is the Right Choice ────────────────────────────────
    defineField({
      name: 'rightChoiceHeading',
      title: 'Right Choice Section Heading',
      type: 'string',
      description: 'Section heading — if blank, defaults to "When TesseractApps Is the Right Choice"',
    }),
    defineField({
      name: 'rightChoiceItems',
      title: 'Right Choice Checklist Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Checklist items — providers who answer yes to any of these are ideal candidates. 5 items recommended.',
      validation: (Rule) => Rule.required().min(3).max(8),
    }),

    // ── CTA Section ───────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'CTA section heading',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      description: 'Short paragraph below the CTA heading — describe what the demo experience is like',
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Override meta title, description, and open graph settings for this comparison page',
    }),
  ],
})
