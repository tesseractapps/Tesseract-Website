import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gtnor2fs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skkpr3af1i7R1RMKpMDvvwxE4w4bVgwKcQAJbbNSx6O780C8mA8Fg2oQ4v3pJ3zlJUOk9zu70GXdez997wtB7zCPCAHEPZLJ0j6XucXqPpBc8CRnPdUFPQK2FuDThjIvNh8ErBRBk8Hi5xyKJWPq2YUaUsD8EmvijsBVC4ooXzf1rRZpH1Ny',
  useCdn: false,
})

const doc = {
  _type: 'guide',
  title: 'Platform Provider Registration Readiness Guide',
  slug: { _type: 'slug', current: 'ndis-platform-provider-registration-guide' },
  status: 'draft',
  topic: 'SIL',
  audience: 'NDIS Platform Providers and Digital Marketplace Operators',
  excerpt: 'If your platform connects NDIS participants with support workers, mandatory registration starts 1 July 2026. Download our free Platform Provider Registration Guide for a plain-English walkthrough of what is required and how to prepare.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  featured: false,
  tags: ['NDIS', 'SIL', 'platform provider', 'mandatory registration', 'NDIS 2026', 'compliance', 'worker screening'],
  formConfig: {
    submitButtonText: 'Download My Registration Guide',
    confirmationMessage: 'Thank you! Your Platform Provider Registration Guide is downloading now. We have also sent a copy to your email.',
    trustIndicators: [
      'Updated for the 2026 NDIS mandatory registration deadline',
      'Includes worker screening framework for contractor workforces',
      'Created by TesseractApps, purpose-built NDIS compliance software',
    ],
  },
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS Platform Provider Registration Guide | Free Download 2026',
    metaDescription: 'Running an NDIS platform? Mandatory registration starts 1 July 2026. Download our free Platform Provider Registration Guide.',
    canonicalUrl: 'https://tesseractapps.com.au/guides/ndis-platform-provider-registration-guide',
    noIndex: false,
  },
}

client.create(doc)
  .then((result) => {
    console.log('Created guide ID:', result._id)
    console.log('Slug:', result.slug.current)
    console.log('Status:', result.status)
    console.log('Topic:', result.topic)
  })
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
