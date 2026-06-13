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
  title: 'Business Continuity Plan (BCP) Audit Checklist',
  slug: { _type: 'slug', current: 'ndis-bcp-audit-checklist' },
  status: 'draft',
  topic: 'SIL',
  audience: 'SIL Providers and Compliance Managers',
  excerpt: 'Most providers have a BCP document. Few can prove it works. Download our free BCP Audit Checklist to test your plan against what NDIS auditors now expect in 2026, including risk scenarios, participant communication, staff training, and plan governance.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  featured: false,
  tags: ['NDIS', 'SIL', 'BCP', 'business continuity', 'audit', 'compliance', 'NDIS 2026'],
  formConfig: {
    submitButtonText: 'Download My BCP Checklist',
    confirmationMessage: 'Thank you! Your BCP Audit Checklist is downloading now. We have also sent a copy to your email.',
    trustIndicators: [
      'Updated for the 2026 NDIS Practice Standards reform',
      'Covers all 6 key BCP audit sections',
      'Created by TesseractApps, purpose-built NDIS compliance software',
    ],
  },
  seo: {
    _type: 'seo',
    metaTitle: 'Free NDIS BCP Audit Checklist | Business Continuity Plan 2026',
    metaDescription: 'Is your NDIS business continuity plan audit-ready? Download our free BCP audit checklist covering risk scenarios, participant comms, and training.',
    canonicalUrl: 'https://tesseractapps.com.au/guides/ndis-bcp-audit-checklist',
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
