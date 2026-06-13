import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gtnor2fs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skkpr3af1i7R1RMKpMDvvwxE4w4bVgwKcQAJbbNSx6O780C8mA8Fg2oQ4v3pJ3zlJUOk9zu70GXdez997wtB7zCPCAHEPZLJ0j6XucXqPpBc8CRnPdUFPQK2FuDThjIvNh8ErBRBk8Hi5xyKJWPq2YUaUsD8EmvijsBVC4ooXzf1rRZpH1Ny',
  useCdn: false,
})

const BELLE_ID = 'mF1po0NuolMqL6Wqd4VGJy'
const SIL_CATEGORY_ID = 'b40e98b1-c660-4b82-9058-eac097a9f893'

const key = () => Math.random().toString(36).slice(2, 9)
const span = (text) => ({ _type: 'span', _key: key(), text, marks: [] })
const block = (style, children, listItem, level) => {
  const b = { _type: 'block', _key: key(), style, markDefs: [], children }
  if (listItem) { b.listItem = listItem; b.level = level ?? 1 }
  return b
}
const p = (text) => block('normal', [span(text)])
const h2 = (text) => block('h2', [span(text)])
const h3 = (text) => block('h3', [span(text)])
const li = (text) => block('normal', [span(text)], 'bullet', 1)

// Simple table via paragraph rows (blockContent tables)
const tableRow = (col1, col2) => block('normal', [
  { _type: 'span', _key: key(), text: `${col1}  —  ${col2}`, marks: [] }
])

const doc = {
  _type: 'blogPost',
  title: 'Mandatory SIL Registration from 1 July 2026: Your Complete Checklist',
  slug: { _type: 'slug', current: 'ndis-sil-mandatory-registration-2026-checklist' },
  status: 'draft',
  authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }],
  category: { _type: 'reference', _ref: SIL_CATEGORY_ID },
  tags: ['NDIS', 'SIL', 'mandatory registration', 'NDIS registration requirements 2026', 'SIL registration deadline', 'compliance'],
  excerpt: 'Mandatory NDIS SIL registration starts 1 July 2026. Download our complete registration readiness checklist and prepare step by step.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 7,
  featured: false,
  cta: {
    heading: 'Download our free Registration Readiness Checklist',
    body: 'Track your progress step by step against the six key registration areas. Or book a free demo to see how our platform simplifies the entire registration process.',
    primaryLabel: 'Download the Checklist',
    primaryUrl: '/guides/sil-compliance-readiness-checklist',
    secondaryLabel: 'Book a Free Demo',
    secondaryUrl: '/book-a-demo',
  },
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS SIL Mandatory Registration 2026: Complete Provider Checklist',
    metaDescription: 'Mandatory NDIS SIL registration starts 1 July 2026. Download our complete registration readiness checklist and prepare step by step.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-sil-mandatory-registration-2026-checklist',
    noIndex: false,
  },
  body: [
    p('On 1 July 2026, the rules change. Supported Independent Living (SIL) providers who have operated outside the NDIS registration system will no longer be able to do so. The NDIS Minister confirmed this in December 2025, and it represents one of the most significant structural shifts the disability sector has seen.'),
    p('If you are currently unregistered or unsure of your status, this is your definitive guide to what NDIS SIL mandatory registration involves, what you need to have in place, and how to avoid last-minute scrambling.'),

    h2('Why Mandatory Registration Is Happening'),
    p('The push for mandatory SIL registration comes directly from the 2023 NDIS Review and subsequent stakeholder consultations. Participants and families reported significant variation in the quality of SIL supports, and a lack of oversight for unregistered providers was identified as a key risk. Mandatory registration brings all SIL providers under the Commission\'s regulatory framework for the first time.'),
    p('Platform providers, organisations that connect participants with support workers through digital platforms, are also required to register under the same deadline.'),

    h2('What NDIS SIL Registration Requires'),
    p('To become a registered NDIS provider, you must meet the requirements of the NDIS Practice Standards relevant to your registration group. For SIL providers, this includes a new dedicated SIL standard currently being finalised. At a high level, you will need to demonstrate:'),
    li('A governance structure with clear accountability'),
    li('Documented policies and procedures aligned to the Practice Standards'),
    li('A risk management framework with active monitoring'),
    li('Worker screening and credential verification processes'),
    li('An incident management system with reporting capability'),
    li('A business continuity plan'),
    li('Participant feedback mechanisms and continuous improvement processes'),

    h2('Your Registration Readiness Checklist'),
    p('Our Registration Readiness Checklist covers six key areas: governance, policies and procedures, workforce requirements, incident management, participant supports, and quality systems. Each section includes specific items to verify before you submit your application.'),

    h2('Registration Timeline: What to Do and When'),
    tableRow('Now (June 2026)', 'Complete a gap analysis against the Practice Standards checklist'),
    tableRow('Weeks 1–4', 'Update policies, procedures, and governance documentation'),
    tableRow('Weeks 5–8', 'Complete staff training; verify worker screening status'),
    tableRow('Weeks 9–12', 'Run an internal audit to identify remaining gaps'),
    tableRow('Before 1 July', 'Submit registration application with all supporting evidence'),

    h2('Frequently Asked Questions'),

    h3('Q: When does mandatory NDIS SIL registration start?'),
    p('A: 1 July 2026. All SIL providers must be registered by this date with no grace period.'),

    h3('Q: How long does NDIS provider registration take?'),
    p('A: Registration typically takes 8–12 weeks from application to certification. Starting early is essential.'),

    h3('Q: What happens if I am not registered by July 2026?'),
    p('A: Unregistered SIL providers will not be able to deliver NDIS-funded supports after 1 July 2026.'),

    h3('Q: Are platform providers also required to register?'),
    p('A: Yes. Platform providers that connect participants with support workers must also register by 1 July 2026.'),

    h2('Common Mistakes to Avoid'),
    li('Assuming the process is quick. Registration typically takes 8–12 weeks from application to certification.'),
    li('Treating documentation as a one-time exercise. Auditors want to see evidence of ongoing monitoring, not just a document written the day before the audit.'),
    li('Underestimating workforce requirements. Every worker needs current screening and training records.'),
    li('Using paper-based or spreadsheet systems that cannot produce audit-ready evidence quickly.'),

    h2('How Software Makes Registration Manageable'),
    p('The volume of documentation required for NDIS registration is significant. Providers who try to manage this across paper files, shared drives, and spreadsheets consistently report the same problem: they know the information exists somewhere, but they cannot produce it quickly when an auditor asks.'),
    p('Purpose-built NDIS compliance software keeps all of this in one place: policies, worker credentials, incident records, participant feedback, and audit logs, so that registration is a matter of exporting evidence, not hunting for it.'),
  ],
}

client.create(doc)
  .then((result) => {
    console.log('Created document ID:', result._id)
    console.log('Slug:', result.slug.current)
    console.log('Status:', result.status)
    console.log('CTA primary URL:', result.cta.primaryUrl)
  })
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
