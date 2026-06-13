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
const tableRow = (col1, col2) => block('normal', [
  { _type: 'span', _key: key(), text: `${col1}  —  ${col2}`, marks: [] }
])

const doc = {
  _type: 'blogPost',
  title: 'Business Continuity Plans: What NDIS Auditors Now Expect in 2026',
  slug: { _type: 'slug', current: 'ndis-business-continuity-plan-2026-audit-requirements' },
  status: 'draft',
  authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }],
  category: { _type: 'reference', _ref: SIL_CATEGORY_ID },
  tags: ['NDIS', 'SIL', 'business continuity plan', 'BCP', 'NDIS audit requirements 2026', 'critical incident training', 'compliance'],
  excerpt: 'The 2026 NDIS Practice Standards raise the bar for business continuity plans. Learn what auditors now expect and how to make your BCP audit-ready.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 7,
  featured: false,
  cta: {
    heading: 'Download our free BCP Audit Checklist',
    body: 'Pre-structured for the 2026 audit requirements, covering all 6 key BCP sections. Or book a free demo to see how our platform keeps your BCP, training records, and compliance evidence in one place.',
    primaryLabel: 'Download the BCP Checklist',
    primaryUrl: '/guides/ndis-bcp-audit-checklist',
    secondaryLabel: 'Book a Free Demo',
    secondaryUrl: '/book-a-demo',
  },
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS Business Continuity Plan Requirements 2026: What Auditors Expect',
    metaDescription: 'The 2026 NDIS Practice Standards raise the bar for business continuity plans. Learn what auditors now expect and how to make your BCP audit-ready.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-business-continuity-plan-2026-audit-requirements',
    noIndex: false,
  },
  body: [
    p('Business continuity planning has always been a requirement for registered NDIS providers. But the 2026 Practice Standards update has significantly raised the bar, and the gap between what providers have on paper and what auditors now expect is wider than many realise.'),
    p('This post explains exactly what auditors are looking for in a business continuity plan, what the common gaps are, and how to make sure your plan is audit-ready.'),

    h2('What Has Changed'),
    p('The updated standards go further than previous versions, specifically requiring providers to demonstrate three things that were previously vague or assumed:'),
    li('A clear, documented business continuity plan'),
    li('A participant communication strategy: what you will tell participants and their families if service delivery is disrupted'),
    li('Staff training for critical incidents: not just a policy, but evidence that staff have completed the training and know how to respond'),
    p('The shift is from having a document to demonstrating a system. Auditors are not just asking to see your BCP; they are asking how it works in practice.'),

    h2('What a Compliant BCP Looks Like in 2026'),

    h3('Section 1: Risk Scenarios'),
    p('Your plan must identify specific risks to service continuity, not generic categories like "natural disaster". What specific events could disrupt your service? Staff illness, IT failure, loss of premises, utility interruption? Each scenario needs a likelihood and impact assessment.'),

    h3('Section 2: Response Protocols'),
    p('For each risk scenario, document the specific response: who does what, in what order, with what resources. Include escalation pathways and alternative service delivery arrangements.'),

    h3('Section 3: Participant Communication'),
    p('This is the section most providers are missing. The 2026 standards require a documented protocol for how and when you will communicate with participants and their families during a service disruption. Templates for emails, SMS, or phone scripts should be prepared in advance.'),

    h3('Section 4: Recovery and Review'),
    p('How will you restore normal service? How will you capture lessons learned? How will you update the plan based on what happened? These are the questions auditors will ask.'),

    h2('Staff Training Requirements'),
    p('Having a BCP is one thing; having staff who know what to do is another. The updated standards require evidence of critical incident training:'),
    li('All staff complete training that covers your specific BCP protocols'),
    li('Training completion is recorded and kept up to date'),
    li('New staff complete training as part of induction'),
    li('Refresher training occurs at least annually or when the plan is updated'),
    p('The most common audit finding in this area is providers who have a training policy but cannot produce records showing that training actually occurred.'),

    h2('Common Audit Failure Points'),
    tableRow('Generic scenarios', 'Plans list "natural disaster" without specifying what that means for your specific service.'),
    tableRow('Missing participant comms', 'No documented protocol for how and when to notify participants of service disruption.'),
    tableRow('No training records', 'BCP training policy exists but staff records do not show completion.'),
    tableRow('Untested plans', 'Plan has never been reviewed, tested, or updated since first written.'),
    tableRow('No ownership', 'No named person responsible for maintaining and implementing the plan.'),

    h2('Frequently Asked Questions'),

    h3('Q: What must an NDIS business continuity plan include in 2026?'),
    p('A: A compliant BCP must include specific risk scenarios, documented response protocols, a participant communication strategy, staff training records, and a recovery and review process.'),

    h3('Q: Do NDIS auditors check BCP training records?'),
    p('A: Yes. Auditors expect evidence that all staff have completed BCP-specific training, with completion dates recorded. A policy alone is not sufficient.'),

    h3('Q: How often should an NDIS BCP be reviewed?'),
    p('A: At least annually, and whenever the plan is updated or a significant incident occurs. Document every review.'),

    h2('How to Make Your BCP Audit-Ready'),
    li('Assign a named BCP owner: a specific person, not a role title, responsible for maintaining the plan.'),
    li('Schedule a BCP review at least annually and document it.'),
    li('Run a tabletop exercise: walk your leadership team through a scenario and test whether the plan works.'),
    li('Build participant communication into your BCP from the start, not as an afterthought.'),
    li('Use a software system that stores your BCP, training records, and incident history in one place so you can produce audit evidence in minutes.'),
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
