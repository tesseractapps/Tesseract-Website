import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gtnor2fs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skkpr3af1i7R1RMKpMDvvwxE4w4bVgwKcQAJbbNSx6O780C8mA8Fg2oQ4v3pJ3zlJUOk9zu70GXdez997wtB7zCPCAHEPZLJ0j6XucXqPpBc8CRnPdUFPQK2FuDThjIvNh8ErBRBk8Hi5xyKJWPq2YUaUsD8EmvijsBVC4ooXzf1rRZpH1Ny',
});

const posts = await client.fetch(`
  *[_type == "blogPost" && status == "published"]
  | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    "category": category->title
  }
`);

posts.forEach(p => console.log(JSON.stringify(p)));
