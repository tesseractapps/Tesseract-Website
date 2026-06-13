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

// ── SIL Compliance Readiness Checklist ─────────────────────────────────────
const silData = {
  heroHeadline: 'Is Your SIL Service Ready for the 2026 Practice Standards?',
  heroSubheadline: 'Download our free SIL Compliance Readiness Checklist and find out exactly where you stand before the 1 July 2026 deadline. Covers registration, governance, workforce, incidents, participant supports, and documentation systems.',
  body: [
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
  ],
  formConfig: {
    submitButtonText: 'Download My Free Checklist',
    confirmationMessage: "Thank you! Your SIL Compliance Readiness Checklist is downloading now. If it doesn't start automatically, click here. We've also sent a copy to your email.",
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

// ── BCP Audit Checklist ─────────────────────────────────────────────────────
const bcpData = {
  heroHeadline: 'Is Your NDIS Business Continuity Plan Actually Audit-Ready?',
  heroSubheadline: 'Most providers have a BCP document. Few can prove it works. Download our free BCP Audit Checklist to test your plan against what NDIS auditors now expect in 2026, including risk scenarios, participant communication, staff training, and plan governance.',
  body: [
    h2('Having a BCP Is Not Enough'),
    p('The 2026 NDIS Practice Standards have shifted from checking whether a BCP document exists to verifying that the BCP system actually works. Auditors now expect evidence of testing, training, participant communication protocols, and regular reviews.'),
    p('The most common audit findings:'),
    li("Generic risk scenarios (e.g. 'natural disaster' with no specifics)"),
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
  ],
  formConfig: {
    submitButtonText: 'Download My BCP Checklist',
    confirmationMessage: "Thank you! Your BCP Audit Checklist is downloading now. If it doesn't start automatically, click here. We have also sent a copy to your email.",
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

const patches = [
  { slug: 'sil-compliance-readiness-checklist', data: silData },
  { slug: 'ndis-bcp-audit-checklist', data: bcpData },
]

const guides = await client.fetch(
  '*[_type == "guide" && slug.current in ["sil-compliance-readiness-checklist","ndis-bcp-audit-checklist"]] { _id, slug }'
)

for (const { slug, data } of patches) {
  const guide = guides.find(g => g.slug.current === slug)
  if (!guide) { console.log('Not found:', slug); continue }
  await client.patch(guide._id).set(data).commit()
  console.log(`Patched: ${slug} (${guide._id})`)
}

console.log('Done.')
