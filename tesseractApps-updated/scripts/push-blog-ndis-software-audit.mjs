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

// Table rendered as labelled rows
const tableRow = (col1, col2) => block('normal', [
  { _type: 'span', _key: key(), text: `${col1}  —  ${col2}`, marks: [] }
])

const doc = {
  _type: 'blogPost',
  title: 'How NDIS Software Helps You Stay Audit-Ready as Practice Standards Evolve',
  slug: { _type: 'slug', current: 'ndis-compliance-software-audit-ready-2026' },
  status: 'draft',
  authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }],
  category: { _type: 'reference', _ref: SIL_CATEGORY_ID },
  tags: ['NDIS', 'SIL', 'NDIS compliance software', 'audit ready', 'practice standards', 'NDIS reform 2026', 'quality management'],
  excerpt: 'Learn how purpose-built NDIS compliance software keeps providers audit-ready as Practice Standards evolve. Centralise policies, incidents, and evidence.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 7,
  featured: false,
  cta: {
    heading: 'See how TesseractApps keeps you audit-ready',
    body: 'Purpose-built for NDIS providers preparing for the July 2026 SIL registration deadline. Book a free demo to see how our platform centralises policies, incidents, workforce, and evidence in one place.',
    primaryLabel: 'Book a Free Demo',
    primaryUrl: '/book-a-demo',
    secondaryLabel: 'View Platform',
    secondaryUrl: '/platform',
  },
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS Compliance Software: Stay Audit-Ready as Standards Change in 2026',
    metaDescription: 'Learn how purpose-built NDIS compliance software keeps providers audit-ready as Practice Standards evolve. Centralise policies, incidents, and evidence.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-compliance-software-audit-ready-2026',
    noIndex: false,
  },
  body: [
    p('The NDIS Practice Standards have changed more in the past two years than in the preceding five. With mandatory SIL registration arriving in July 2026, a new dedicated SIL standard being finalised, and tougher enforcement from the Commission, including $1.6 million in fines and thousands of civil actions in 2024 alone, compliance is no longer a background task. It is a daily operational priority.'),
    p('This post is about what that means practically, and how the right NDIS compliance software makes the difference between a provider who breezes through an audit and one who scrambles for days beforehand.'),

    h2('The Compliance Challenge in 2026'),
    p('Most NDIS providers are managing compliance across a collection of disconnected tools: a policy document in Google Drive, incident reports in a spreadsheet, training records in an HR system, support plans in a different platform, and participant feedback in a paper form. When an auditor asks for evidence, the process of pulling it together can take days and still leave gaps.'),
    p('The 2026 standards update makes this problem more acute. Auditors are not just checking whether documents exist. They are looking for evidence of systems: ongoing monitoring, regular reviews, consistent staff behaviour, and participant involvement. That kind of evidence lives across dozens of touchpoints, and a disconnected system cannot surface it quickly.'),

    h2('What Audit-Ready Actually Looks Like'),
    p('Audit-ready means being able to answer any auditor question about an incident, a worker\'s qualifications, a participant\'s support plan, or a governance decision within minutes, with evidence to back it up.'),
    p('In practice, audit-ready providers have:'),
    li('All policies stored centrally with version history and acknowledgement records'),
    li('Staff credentials and training records with automatic expiry alerts'),
    li('Incident reports that link to investigation outcomes and improvement actions'),
    li('Support plans with a clear review history and documented participant involvement'),
    li('Participant feedback captured and linked to quality improvement actions'),
    li('Business continuity documentation with training records attached'),

    h2('How NDIS Compliance Software Supports Each Standard Requirement'),
    tableRow('Governance & Accountability', 'Policy library with version control, staff sign-off tracking, and governance logs'),
    tableRow('Risk Management', 'Live risk register with action tracking and escalation alerts'),
    tableRow('Incident Management', 'End-to-end incident workflow from report to closure, with pattern analysis'),
    tableRow('Workforce', 'Worker credential management with automated expiry reminders'),
    tableRow('Support Planning', 'Participant-linked plan reviews with involvement documentation'),
    tableRow('Business Continuity', 'BCP storage with linked training records and review scheduling'),
    tableRow('Quality Improvement', 'Feedback capture, action tracking, and outcome reporting'),

    h2('The Real Cost of Not Having the Right System'),
    p('Beyond the audit stress, there is a direct financial cost to poor compliance systems. Providers who receive adverse audit findings face costly corrective action periods, potential suspension of registration, and reputational damage that affects their ability to attract participants and staff.'),
    p('There is also the opportunity cost: every hour your team spends hunting for documents before an audit is an hour not spent on participant support.'),

    h2('Frequently Asked Questions'),

    h3('Q: What is NDIS compliance software?'),
    p('A: NDIS compliance software is a purpose-built platform that centralises policies, incidents, workforce credentials, support plans, and audit evidence so NDIS providers can demonstrate compliance with Practice Standards.'),

    h3('Q: How does software help with NDIS audits?'),
    p('A: Good NDIS software stores all compliance evidence centrally, generates audit-ready reports on demand, tracks staff credentials with expiry alerts, and links incidents to investigations and improvement actions.'),

    h3('Q: What should I look for in NDIS compliance software?'),
    p('A: Look for software built specifically for NDIS, updated as Practice Standards change, integrating policies, incidents, workforce, and support planning in one place, with one-click audit reports.'),

    h2('What to Look for in an NDIS Compliance Platform'),
    li('Built specifically for NDIS, not a generic quality management system adapted for the sector'),
    li('Updated as Practice Standards change, so you are not managing software updates yourself'),
    li('Integrates your policies, incidents, workforce, and support planning in one place'),
    li('Produces audit-ready reports with a click, not a day of manual work'),
    li('Includes participant feedback capture that links to improvement actions'),
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
