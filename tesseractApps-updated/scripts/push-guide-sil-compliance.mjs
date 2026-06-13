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
  title: 'SIL Compliance Readiness Checklist',
  slug: { _type: 'slug', current: 'sil-compliance-readiness-checklist' },
  status: 'draft',
  topic: 'SIL',
  audience: 'SIL Providers and Compliance Managers',
  excerpt: 'Download our free SIL Compliance Readiness Checklist and find out exactly where you stand before the 1 July 2026 deadline. Covers registration, governance, workforce, incidents, participant supports, and documentation systems.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  featured: false,
  tags: ['NDIS', 'SIL', 'compliance', 'practice standards', 'NDIS 2026', 'audit readiness', 'checklist'],
  formConfig: {
    submitButtonText: 'Download My Free Checklist',
    confirmationMessage: "Thank you! Your SIL Compliance Readiness Checklist is downloading now. We've also sent a copy to your email.",
    trustIndicators: [
      'Updated for the 2026 NDIS Practice Standards reform',
      'Used by NDIS providers across Australia',
      'Created by TesseractApps, purpose-built NDIS compliance software',
    ],
  },
  seo: {
    _type: 'seo',
    metaTitle: 'Free SIL Compliance Readiness Checklist | NDIS Practice Standards 2026',
    metaDescription: 'Download our free SIL Compliance Readiness Checklist to assess your preparedness for the NDIS Practice Standards reform taking effect 1 July 2026.',
    canonicalUrl: 'https://tesseractapps.com.au/guides/sil-compliance-readiness-checklist',
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
