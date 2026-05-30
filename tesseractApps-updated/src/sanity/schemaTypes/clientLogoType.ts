import { defineField, defineType } from 'sanity'

export const clientLogoType = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: false },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'isVisible',
      title: 'Show in marquee',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
