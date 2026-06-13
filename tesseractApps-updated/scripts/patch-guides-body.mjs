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
const block = (style, children, listItem, level) => {
  const b = { _type: 'block', _key: key(), style, markDefs: [], children }
  if (listItem) { b.listItem = listItem; b.level = level ?? 1 }
  return b
}
const p = (text) => block('normal', [span(text)])
const h2 = (text) => block('h2', [span(text)])
const li = (text) => block('normal', [span(text)], 'bullet', 1)
const callout = (text, type = 'info') => ({
  _type: 'callout', _key: key(), type, text,
})

// ── Platform Provider Registration Guide ───────────────────────────────────
const platformBody = [
  h2('Are You a Platform Provider?'),
  p('Answer these 3 questions:'),
  li('Does your business operate a website or app where NDIS participants find and book support workers?'),
  li('Do you take a fee, commission, or margin from transactions between participants and workers?'),
  li('Do the workers on your platform include independent contractors (not just employees)?'),
  p('If you answered yes to any of these, this guide is for you.'),

  h2('What You Get'),
  p('Your free registration guide includes:'),
  li('A clear definition of who counts as a platform provider under the NDIS Commission'),
  li('7-step registration readiness walkthrough'),
  li('Governance requirements specific to platform models'),
  li('Worker screening verification guide for contractor workforces'),
  li('Incident management requirements for platform-connected workers'),
  li('Participant protection and complaints mechanism checklist'),
  li('Evidence and documentation systems guide'),
  li('Fillable PDF: add your platform details, track progress, and note action items'),

  callout(
    'For most platform providers, worker screening is the most complex registration requirement. Unlike traditional providers who employ workers directly, platforms often work with independent contractors. This guide includes a practical framework for verifying and maintaining current screening across a large, distributed workforce.',
    'info'
  ),
]

// ── SIL Compliance Readiness Checklist ─────────────────────────────────────
const silComplianceBody = [
  h2('What You Get'),
  p('Your free checklist includes:'),
  li('Registration and governance readiness assessment'),
  li('Policies and procedures compliance check across 6 areas'),
  li('Workforce and NDIS Worker Screening verification tracker'),
  li('Incident management system audit'),
  li('Participant support quality assessment'),
  li('Evidence and documentation systems review'),
  li('Scoring guide to prioritise your next steps'),
  li('Fillable PDF format: type directly into the checklist, add notes, and track progress'),
]

// ── BCP Audit Checklist ─────────────────────────────────────────────────────
const bcpBody = [
  h2('Having a BCP Is Not Enough'),
  p('The 2026 NDIS Practice Standards have shifted from checking whether a BCP document exists to verifying that the BCP system actually works. Auditors now expect evidence of testing, training, participant communication protocols, and regular reviews.'),
  p('The most common audit findings:'),
  li('Generic risk scenarios (e.g. "natural disaster" with no specifics)'),
  li('No documented participant communication protocol'),
  li('Training policy exists but no completion records'),
  li('Plan has never been tested or updated since first written'),
  li('No named person responsible for maintaining the plan'),

  h2('What You Get'),
  p('Your free BCP audit checklist covers 6 sections:'),
  li('Risk Scenarios: Are your risks specific to your service, with likelihood and impact assessed?'),
  li('Response Protocols: Does each risk have specific actions, named owners, and escalation pathways?'),
  li('Participant Communication: Do you have a documented protocol for notifying participants during disruption?'),
  li('Recovery and Review: Is your post-incident process defined, with lessons learned captured?'),
  li('Staff Training: Can you produce training completion records for every staff member?'),
  li('Plan Governance: Is there a named owner, annual review schedule, and tabletop exercise evidence?'),
  li('Fillable PDF format: type directly into each section and add your own notes'),
]

// ── Fetch all 3 guides by slug ──────────────────────────────────────────────
const guides = await client.fetch(
  '*[_type == "guide" && slug.current in ["ndis-platform-provider-registration-guide","sil-compliance-readiness-checklist","ndis-bcp-audit-checklist"]] { _id, slug }'
)

console.log('Found guides:', guides.map(g => `${g._id} → ${g.slug.current}`))

const bodyMap = {
  'ndis-platform-provider-registration-guide': {
    heroHeadline: 'Running an NDIS Platform? Mandatory Registration Starts 1 July 2026.',
    heroSubheadline: 'If your platform connects NDIS participants with support workers, you need to register with the NDIS Commission. Download our free Platform Provider Registration Guide for a plain-English walkthrough of what is required and how to prepare.',
    body: platformBody,
  },
  'sil-compliance-readiness-checklist': {
    heroHeadline: 'Is Your SIL Service Ready for the 2026 Practice Standards?',
    heroSubheadline: 'Download our free SIL Compliance Readiness Checklist and find out exactly where you stand before the 1 July 2026 deadline. Covers registration, governance, workforce, incidents, participant supports, and documentation systems.',
    body: silComplianceBody,
  },
  'ndis-bcp-audit-checklist': {
    heroHeadline: 'Is Your NDIS Business Continuity Plan Actually Audit-Ready?',
    heroSubheadline: 'Most providers have a BCP document. Few can prove it works. Download our free BCP Audit Checklist to test your plan against what NDIS auditors now expect in 2026, including risk scenarios, participant communication, staff training, and plan governance.',
    body: bcpBody,
  },
}

for (const guide of guides) {
  const slug = guide.slug.current
  const data = bodyMap[slug]
  if (!data) { console.log('No data for', slug); continue }

  const result = await client
    .patch(guide._id)
    .set(data)
    .commit()

  console.log(`Patched ${slug} (${result._id})`)
}

console.log('Done.')
