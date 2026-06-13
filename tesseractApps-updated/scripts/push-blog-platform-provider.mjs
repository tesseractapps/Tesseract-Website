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
const PREV_POST_ID = 'uP2O0fCLiBDoZ6faSdfF8a'

const key = () => Math.random().toString(36).slice(2, 9)
const span = (text) => ({ _type: 'span', _key: key(), text, marks: [] })

const block = (style, text, listItem, level) => {
  const b = {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [span(text)],
  }
  if (listItem) { b.listItem = listItem; b.level = level ?? 1 }
  return b
}

const p = (text) => block('normal', text)
const h2 = (text) => block('h2', text)
const h3 = (text) => block('h3', text)
const li = (text) => block('normal', text, 'bullet', 1)

// --- Patch previous post (SIL standards) to add Belle as author ---
const patchPrev = client
  .patch(PREV_POST_ID)
  .set({ authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }] })
  .commit()

// --- New post: Platform Provider Registration ---
const newDoc = {
  _type: 'blogPost',
  title: 'Platform Providers: Are You Affected by the New NDIS Registration Rules?',
  slug: { _type: 'slug', current: 'ndis-platform-provider-registration-2026' },
  status: 'draft',
  authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }],
  category: { _type: 'reference', _ref: SIL_CATEGORY_ID },
  tags: ['NDIS', 'SIL', 'platform provider', 'mandatory registration', 'NDIS reform 2026', 'compliance'],
  excerpt: 'NDIS platform providers must register from 1 July 2026. Find out if your platform is affected and what registration requires.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 6,
  featured: false,
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS Platform Provider Registration 2026: Who Is Affected and What to Do',
    metaDescription: 'NDIS platform providers must register from 1 July 2026. Find out if your platform is affected and what registration requires.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-platform-provider-registration-2026',
    noIndex: false,
  },
  body: [
    p('If you run a digital platform that connects NDIS participants with support workers, you need to read this. The December 2025 announcement from NDIS Minister Jenny McAllister confirmed that platform providers, not just SIL providers, must register with the NDIS Commission from 1 July 2026.'),
    p('This is a significant change that many platform operators are not yet aware of. Here is what it means, who is affected, and what you need to do.'),

    h2('Who Counts as a Platform Provider?'),
    p('The term platform provider refers to organisations that connect NDIS participants with support workers or service providers through a digital marketplace or platform model. If your business operates a website, app, or online system where participants find and book support workers, and you take a fee or margin from that transaction, you are likely captured by this definition.'),
    p('The Commission is expected to provide more detailed guidance on transition arrangements in early 2026, but the direction is clear: if your platform touches NDIS funding, registration is coming.'),

    h2('Why Platform Providers Are Being Brought In'),
    p('The push to include platform providers in mandatory registration comes from participant safety concerns. The platform model has grown rapidly in the NDIS, and with it came reports of inconsistent support quality, inadequate worker screening, and limited recourse for participants when things went wrong.'),
    p('Mandatory registration brings platform providers under the same Practice Standards framework as other registered providers, including requirements for worker screening, incident reporting, governance, and quality management.'),

    h2('What Registration Will Require for Platform Providers'),
    p('While the specific registration requirements for platform providers are still being finalised, they are expected to align with the broader Practice Standards framework. At a minimum, plan to demonstrate:'),
    li('A governance structure with documented accountability'),
    li('Worker screening verification for all workers connecting through your platform'),
    li('An incident management system with reportable incident capability'),
    li('A complaints and feedback mechanism accessible to participants'),
    li('A risk management framework appropriate to your service model'),
    li('Policies and procedures aligned to the relevant Practice Standards'),

    h2('The Worker Screening Challenge for Platforms'),
    p('For many platform providers, worker screening is the most complex piece of the registration puzzle. Unlike traditional providers who employ workers directly, platforms often work with independent contractors. Verifying and maintaining current screening for a large, distributed workforce requires a systematic approach, not a manual one.'),
    p('Platform providers who do not yet have a centralised system for tracking worker screening status, credential expiry, and compliance history will need to build one before registration.'),

    h2('Frequently Asked Questions'),

    h3('Q: What is an NDIS platform provider?'),
    p('A: An NDIS platform provider is an organisation that connects participants with support workers through a digital marketplace, website, or app and takes a fee or margin from the transaction.'),

    h3('Q: Do NDIS platform providers need to register?'),
    p('A: Yes. From 1 July 2026, all platform providers must register with the NDIS Commission under the mandatory registration requirements.'),

    h3('Q: What is the biggest challenge for platform provider registration?'),
    p('A: Worker screening is typically the most complex requirement, because platforms often work with independent contractors rather than direct employees, making credential verification at scale challenging.'),

    h2('How to Prepare if You Are a Platform Provider'),
    li('Confirm your legal status: seek advice on whether your platform model falls within the Commission\'s definition of a platform provider.'),
    li('Map your current governance structure and identify gaps against the Practice Standards.'),
    li('Audit your worker screening processes: can you verify current screening status for every worker on your platform right now?'),
    li('Review your incident management capability: do you have a system to capture, investigate, and report incidents involving workers connected through your platform?'),
    li('Engage early with the Commission\'s transition guidance, expected in early 2026.'),

    h2('The Opportunity in Registration'),
    p('It is easy to see mandatory registration as a burden: more paperwork, more cost, more compliance overhead. But for platform providers who embrace it, registration is also a quality signal. Participants and their families increasingly check registration status before choosing a provider. Being registered tells them you have met an independently verified standard of quality and safety.'),
    p('The platform providers who prepare early and genuinely build their operations around the standards will be better positioned in a market where quality is increasingly the differentiator.'),
  ],
}

Promise.all([patchPrev, client.create(newDoc)])
  .then(([patched, created]) => {
    console.log('Patched previous post (added Belle):', patched._id)
    console.log('Created new post ID:', created._id)
    console.log('Slug:', created.slug.current)
    console.log('Status:', created.status)
    console.log('Category ref:', created.category._ref)
    console.log('Author ref:', created.authors[0]._ref)
  })
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
