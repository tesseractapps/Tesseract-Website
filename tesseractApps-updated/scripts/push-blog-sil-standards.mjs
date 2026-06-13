import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gtnor2fs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skkpr3af1i7R1RMKpMDvvwxE4w4bVgwKcQAJbbNSx6O780C8mA8Fg2oQ4v3pJ3zlJUOk9zu70GXdez997wtB7zCPCAHEPZLJ0j6XucXqPpBc8CRnPdUFPQK2FuDThjIvNh8ErBRBk8Hi5xyKJWPq2YUaUsD8EmvijsBVC4ooXzf1rRZpH1Ny',
  useCdn: false,
})

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

const doc = {
  _type: 'blogPost',
  title: 'What the NDIS Practice Standards Review Means for SIL Providers in 2026',
  slug: { _type: 'slug', current: 'ndis-practice-standards-review-2026-sil-providers' },
  status: 'draft',
  category: { _type: 'reference', _ref: 'b40e98b1-c660-4b82-9058-eac097a9f893' },
  tags: ['NDIS', 'SIL', 'compliance', 'NDIS reform 2026', 'practice standards', 'mandatory registration'],
  excerpt: 'The NDIS Practice Standards review brings major changes for SIL providers from 1 July 2026. Understand what is changing, why it matters, and how to prepare.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 7,
  featured: false,
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS Practice Standards Review 2026: What SIL Providers Need to Know',
    metaDescription: 'The NDIS Practice Standards review brings major changes for SIL providers from 1 July 2026. Understand what is changing, why it matters, and how to prepare.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-practice-standards-review-2026-sil-providers',
    noIndex: false,
  },
  body: [
    p('If you provide Supported Independent Living (SIL) supports under the National Disability Insurance Scheme, the next 12 months will reshape how your service is regulated. The NDIS Quality and Safeguards Commission is conducting its most significant review of the Practice Standards in years, and the outcomes will directly affect every registered SIL provider in Australia.'),
    p('This guide explains exactly what the NDIS Practice Standards review covers, what the confirmed changes mean for SIL providers operationally, and what steps you should take now to stay compliant ahead of the 1 July 2026 deadline.'),

    h2('What Is the NDIS Practice Standards Review?'),
    p('The NDIS Practice Standards set the benchmark for how all registered NDIS providers must deliver supports. They cover governance, risk management, participant rights, workforce management, and the quality of day-to-day support delivery.'),
    p('In 2024, the Commission launched a major consultation process involving more than 800 stakeholders to gather feedback on the current standards, specifically around housing and living supports. The feedback was captured in a publicly available Insights Report, and the Commission is now using that feedback to guide updates.'),
    p('The timing is significant: new SIL Practice Standards are planned to take effect from 1 July 2026, aligned with the mandatory registration deadline for SIL and platform providers.'),

    h2('What Is Changing for SIL Providers?'),

    h3('1. A dedicated SIL Practice Standard is coming'),
    p('Unlike the current framework, which applies general standards across all registration groups, the new reforms will introduce a dedicated SIL Practice Standard. This standard will address the specific risks and quality expectations for housing and living supports, including individualised support planning, participant choice and control, and community participation.'),

    h3('2. Mandatory registration is now confirmed'),
    p('From 1 July 2026, all SIL providers must be registered with the NDIS Commission. There is no grace period. If you currently operate as an unregistered provider, you must complete the registration process before this date or risk being unable to deliver funded supports.'),

    h3('3. Business continuity planning is no longer optional'),
    p('The updated standards require a documented business continuity plan (BCP) that includes participant communication strategies and staff training for critical incidents. Auditors will expect to see evidence that your BCP has been tested, not just written.'),

    h3('4. Governance and accountability expectations have increased'),
    p('The sector has moved from assuming good governance to requiring providers to demonstrate it. Expect auditors to ask for board minutes, documented decision-making processes, and evidence of continuous improvement, not just policies on paper.'),

    h2('Why This Matters for Your Operations'),
    p('For many SIL providers, especially smaller organisations that have operated outside the registration system, this represents a significant operational shift. The documentation requirements alone can feel overwhelming if you have not built the underlying systems yet.'),
    p('The Commission has been transparent about the direction of change. Consultation on policy development and market readiness activities commenced in early 2026, giving providers time to prepare, but only if they act now.'),

    h2('Frequently Asked Questions'),

    h3('Q: When do the new NDIS Practice Standards take effect?'),
    p('A: The new SIL Practice Standards are planned to take effect from 1 July 2026, aligned with the mandatory registration deadline for SIL and platform providers.'),

    h3('Q: Do all SIL providers need to register?'),
    p('A: Yes. From 1 July 2026, mandatory registration applies to all SIL providers. Unregistered providers will not be able to deliver NDIS-funded supports.'),

    h3('Q: What is a SIL Practice Standard?'),
    p('A: A dedicated set of quality and safety requirements specifically designed for Supported Independent Living providers, covering governance, participant supports, workforce management, and business continuity.'),

    h3('Q: How can I prepare for the NDIS Practice Standards changes?'),
    p('A: Start with a gap analysis against the updated requirements. Review your registration status, audit your governance documentation, map staff training records, and ensure your systems can produce audit-ready evidence on demand.'),

    h2('What You Should Be Doing Right Now'),
    li('Review your current registration status and identify gaps against the new requirements.'),
    li('Download the Commission\'s Insights Report and familiarise yourself with the direction of the new SIL standard.'),
    li('Audit your governance documentation: policies, procedures, incident management, and business continuity plans.'),
    li('Map your staff training records against the updated expectations for critical incident protocols.'),
    li('Assess whether your current software systems can produce the evidence auditors will look for.'),

    h2('How NDIS Compliance Software Helps'),
    p('One of the most common pain points for providers preparing for audits is documentation: pulling together evidence across multiple systems, spreadsheets, and paper files. A purpose-built NDIS compliance platform centralises your records so that when an auditor asks to see your incident management history or your business continuity plan, you can produce it in minutes, not days.'),
    p('If your current system cannot do that, now is the time to evaluate alternatives.'),

    p('The NDIS Practice Standards review is not something providers can afford to watch from the sidelines. With mandatory SIL registration confirmed for 1 July 2026 and a dedicated SIL standard in development, the compliance landscape is shifting fast. The providers who prepare now will be in a much stronger position when auditors come knocking.'),
  ],
}

client.create(doc).then((result) => {
  console.log('Created document ID:', result._id)
  console.log('Slug:', result.slug.current)
  console.log('Status:', result.status)
  console.log('Category ref:', result.category._ref)
}).catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
