import { defineField, defineType } from 'sanity'

export const jobListingType = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', isOpen: 'isOpen' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, isOpen }: any) {
      return { title, subtitle: isOpen ? 'Open' : 'Closed' }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isOpen',
      title: 'Actively Hiring',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this role without deleting it',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Meta Tags (salary, location, type)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'jobTag',
          fields: [
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: ['dollar', 'home', 'trending', 'users', 'zap', 'heart', 'map'],
                layout: 'dropdown',
              },
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
            },
          ],
          preview: { select: { title: 'label', subtitle: 'icon' } },
        },
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary Paragraph',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Job Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'jobSection',
          preview: { select: { title: 'heading', subtitle: 'layout' } },
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Section Heading',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              options: {
                list: [
                  { title: 'Prose paragraph', value: 'prose' },
                  { title: 'Bullet list', value: 'list' },
                  { title: 'Two-column lists', value: 'two-col' },
                  { title: 'Inline/grid list', value: 'inline-list' },
                ],
                layout: 'radio',
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'body',
              type: 'text',
              title: 'Body (for prose layout)',
              rows: 5,
            },
            {
              name: 'items',
              type: 'array',
              title: 'Items (for list / inline-list layout)',
              of: [{ type: 'string' }],
            },
            {
              name: 'col1Heading',
              type: 'string',
              title: 'Column 1 Heading (for two-col)',
            },
            {
              name: 'col1Items',
              type: 'array',
              title: 'Column 1 Items',
              of: [{ type: 'string' }],
            },
            {
              name: 'col2Heading',
              type: 'string',
              title: 'Column 2 Heading (for two-col)',
            },
            {
              name: 'col2Items',
              type: 'array',
              title: 'Column 2 Items',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'contactName',
      title: 'Contact Person Name & Role',
      type: 'string',
      description: 'e.g. "Bec McFarland (HR Manager)"',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
