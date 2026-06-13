import { defineField, defineType } from 'sanity'

/**
 * Single source of truth for every person associated with TesseractApps.
 * Used for: blog post authorship, About page team section, JSON-LD Person schema,
 * and the auto-generated /llm/humans.md AI context file.
 */
export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
  fields: [
    // ── Identity ───────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in blog bylines and future profile URLs.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Co-Founder & CEO", "Head of Engineering"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          'Leadership',
          'Engineering',
          'Product',
          'Design',
          'Sales',
          'Marketing',
          'Operations',
          'Customer Success',
        ],
      },
    }),

    // ── Bio & Photo ────────────────────────────────────────────────────────────
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short paragraph used in blog bylines and the About page. 1-3 sentences.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ── Social & Contact ───────────────────────────────────────────────────────
    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full URL e.g. https://linkedin.com/in/username',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'X / Twitter Handle',
      type: 'string',
      description: 'Without the @ symbol',
    }),
    defineField({
      name: 'githubHandle',
      title: 'GitHub Handle',
      type: 'string',
      description: 'Without the @ symbol — for engineering team members',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Personal Website',
      type: 'url',
    }),

    // ── Display & Visibility ───────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leadership should be 1–10.',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'isVisible',
      title: 'Show on About page',
      type: 'boolean',
      description: 'Controls visibility in the team grid on the About page.',
      initialValue: true,
    }),
    defineField({
      name: 'isBlogAuthor',
      title: 'Blog author',
      type: 'boolean',
      description: 'Enable to allow this person to be selected as a blog post author.',
      initialValue: false,
    }),
  ],
})
