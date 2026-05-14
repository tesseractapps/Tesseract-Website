import { defineField, defineType } from 'sanity'

export const pricingPlanType = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  orderings: [
    {
      title: 'Stage Order',
      name: 'stageOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'tagline' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle }: any) {
      return { title, subtitle }
    },
  },
  fields: [
    defineField({
      name: 'id',
      title: 'Stage ID',
      type: 'slug',
      description: 'URL-safe identifier — e.g. "start", "growth", "scale", "enterprise"',
      options: { source: 'label' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: '1 = Start, 2 = Growth, 3 = Scale, 4 = Enterprise',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: 'label',
      title: 'Stage Label',
      type: 'string',
      description: 'e.g. "Start", "Growth", "Scale", "Enterprise"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Early Provider Setup"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'staffRange',
      title: 'Staff Range',
      type: 'string',
      description: 'e.g. "Fewer than 15 staff"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g. "Founding Window", "Most Common"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Colour',
      type: 'string',
      description: 'CSS hex colour for this stage — e.g. "#10b981"',
      validation: (Rule) => Rule.required().regex(/^#[0-9a-fA-F]{3,8}$/, { name: 'hex' }),
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatYouNeed',
      title: 'What You Need',
      type: 'text',
      rows: 2,
      description: 'The emotional hook — what the buyer needs at this stage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'automationHeading',
      title: 'Automation Focus Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'automationBody',
      title: 'Automation Focus Body',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commercial',
      title: 'Commercial Terms',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. ["$39.99 per user / month", "Up to 10% flex user buffer"]',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'supports',
      title: 'What This Stage Supports',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'cta',
      title: 'Stage CTA Label',
      type: 'string',
      description: 'e.g. "Watch Start Overview"',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
