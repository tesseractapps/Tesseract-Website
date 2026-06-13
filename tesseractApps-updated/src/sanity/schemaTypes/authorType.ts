import { defineType } from 'sanity'

/**
 * @deprecated — Kept only to avoid breaking existing Sanity documents during migration.
 * All new blog posts should reference `teamMember` instead.
 * Once all existing `author` documents have been re-created as `teamMember`
 * documents in Studio and blog posts updated to reference them,
 * remove this type and its registration from index.ts.
 */
export const authorType = defineType({
  name: 'author',
  title: 'Author (deprecated — use Team Member)',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'avatar', title: 'Avatar', type: 'image' },
    { name: 'twitterHandle', title: 'Twitter Handle', type: 'string' },
    { name: 'linkedInUrl', title: 'LinkedIn URL', type: 'url' },
  ],
  preview: {
    select: { title: 'name', media: 'avatar' },
  },
})
