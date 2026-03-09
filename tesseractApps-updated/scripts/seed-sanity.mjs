/**
 * Sanity Seed Script — Migrates all 12 hardcoded blog posts to Sanity CMS
 *
 * Usage:
 *   1. Add your write token to .env.local:
 *        SANITY_API_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *   2. Run:
 *        node scripts/seed-sanity.mjs
 *
 * Notes:
 *   - Safe to run multiple times (uses _id-based upserts via createOrReplace)
 *   - Images from the existing /public or /assets folders are NOT uploaded —
 *     the seed creates posts with a placeholder mainImage reference.
 *     After running, open the Studio at /studio and manually assign cover images.
 *   - All posts are created with status: 'published'
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

// Manually parse .env.local (avoids needing the `dotenv` package)
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  const lines = readFileSync(filePath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) process.env[key] = val
  }
}

loadEnvFile(resolve(rootDir, '.env.local'))
loadEnvFile(resolve(rootDir, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || projectId === 'your-project-id') {
  console.error('❌  VITE_SANITY_PROJECT_ID is not set or still has placeholder value.')
  console.error('   Set it in .env.local and re-run.')
  process.exit(1)
}

if (!token) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set.')
  console.error('   Get a write token from https://sanity.io/manage → API → Tokens')
  console.error('   Add SANITY_API_WRITE_TOKEN=sk... to .env.local and re-run.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Helpers — build Portable Text blocks
// ---------------------------------------------------------------------------

/** Plain paragraph block */
function p(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [{ _type: 'span', _key: key(), text }],
    markDefs: [],
  }
}

/** Heading block (h2, h3, h4) */
function h(level, text) {
  return {
    _type: 'block',
    _key: key(),
    style: `h${level}`,
    children: [{ _type: 'span', _key: key(), text }],
    markDefs: [],
  }
}

/** Paragraph with mixed marks (bold/italic/links).
 *  Pass an array of { text, marks? } spans.
 */
function pSpans(spans) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: spans.map((s) => ({
      _type: 'span',
      _key: key(),
      text: s.text,
      marks: s.marks ?? [],
    })),
  }
}

/** Bulleted list item */
function li(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: key(), text }],
    markDefs: [],
  }
}

/** Callout block (info / warning / tip) */
function callout(type, text) {
  return { _type: 'callout', _key: key(), type, text }
}

let _keyCounter = 1
function key() {
  return `k${String(_keyCounter++).padStart(6, '0')}`
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

const AUTHOR_ID = 'author-belle-bai'
const CAT_NDIS_ID = 'category-ndis'
const CAT_EVENTS_ID = 'category-events'

const authorDoc = {
  _id: AUTHOR_ID,
  _type: 'author',
  name: 'Belle Bai',
  slug: { _type: 'slug', current: 'belle-bai' },
  bio: 'Marketing Executive at TesseractApps, passionate about NDIS technology and care sector innovation.',
  twitterHandle: '',
  linkedInUrl: '',
}

const categoryNDIS = {
  _id: CAT_NDIS_ID,
  _type: 'category',
  title: 'NDIS',
  slug: { _type: 'slug', current: 'ndis' },
  description: 'Articles covering NDIS provider management, compliance, and operations.',
}

const categoryEvents = {
  _id: CAT_EVENTS_ID,
  _type: 'category',
  title: 'Events',
  slug: { _type: 'slug', current: 'events' },
  description: 'TesseractApps expo appearances, launches, and community events.',
}

function authorRef() {
  return { _type: 'reference', _ref: AUTHOR_ID }
}

function categoryRef(id) {
  return { _type: 'reference', _ref: id }
}

// ---------------------------------------------------------------------------
// Blog Post: 1 — Protecting Participant Data
// ---------------------------------------------------------------------------
const post1 = {
  _id: 'blogpost-protecting-participant-data',
  _type: 'blogPost',
  title: 'Protecting Participant Data: Why Security Matters for NDIS and Care Providers',
  slug: { _type: 'slug', current: 'protecting-participant-data' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['data security', 'NDIS', 'compliance', 'cybersecurity'],
  excerpt: 'Every day, disability support and aged care providers collect sensitive information that participants trust us to protect. Strong data security is essential for compliance, service continuity, and client trust.',
  publishedAt: '2025-06-01T00:00:00.000Z',
  readingTime: 5,
  featured: false,
  seo: {
    metaTitle: 'NDIS Workforce Insights | Industry Blog | TesseractApps',
    metaDescription: 'Discover insights on NDIS workforce management, compliance best practices, and digital transformation strategies for Australian care providers.',
    noIndex: false,
  },
  body: [
    p('Every day, disability support and aged care providers collect sensitive information — including health records, personal details, and care plans — that participants trust us to protect. Strong data security isn\'t a luxury, it\'s essential for compliance, service continuity, and, most importantly, client trust.'),
    pSpans([
      { text: 'Cyberattacks targeting the healthcare and disability sectors are rising. In July 2024, a ransomware attack on prescription service ' },
      { text: 'MediSecure', marks: ['strong'] },
      { text: ' exposed the health and personal data of approximately ' },
      { text: '12.9 million Australians', marks: ['strong'] },
      { text: '. Alarming figures show that ' },
      { text: '41% of Australian healthcare organisations experienced a cyberattack in 2023', marks: ['strong'] },
      { text: '. These breaches can compromise privacy, disrupt care delivery, and result in serious regulatory and reputational consequences.' },
    ]),
    h(2, 'Real Breaches Highlight the Risks'),
    p('Recent incidents serve as stark reminders of what\'s at stake:'),
    h(3, 'MediSecure (2024)'),
    p('A cyberattack exposed prescription and health data of millions of Australians.'),
    h(3, 'CTARS (2022)'),
    p('An NDIS case management software platform was breached, with a "large volume" of sensitive participant and caregiver data compromised.'),
    h(3, 'Eastern Health (2021)'),
    p('Four Melbourne hospitals were forced to postpone surgeries due to a suspected ransomware incident.'),
    h(3, 'Engedi (2024)'),
    p('A Queensland-based NDIS provider suffered a ransomware attack that resulted in staff data being leaked on the dark web.'),
    p('These examples illustrate that even responsible care organisations can be targeted — and that the fallout can be both operational and deeply personal for clients.'),
    h(2, 'How TesseractApps Protects Your Data'),
    pSpans([
      { text: 'At ' },
      { text: 'TesseractApps', marks: ['strong'] },
      { text: ', we understand the critical importance of safeguarding participant data. Built on the ' },
      { text: 'Salesforce platform', marks: ['strong'] },
      { text: ', our software inherits ' },
      { text: 'enterprise grade, globally recognised security measures', marks: ['strong'] },
      { text: ', tailored for the needs of NDIS, aged care, and community health providers.' },
    ]),
    p('Here\'s how we ensure your data is protected at every step:'),
    h(3, 'End-to-End Encryption'),
    p('All data is encrypted:'),
    li('In transit via HTTPS using SSL/TLS protocols.'),
    li('At rest with strong AES-256 encryption, making stored information unreadable even in the event of unauthorised access.'),
    h(3, 'Audit Trails and Monitoring'),
    pSpans([
      { text: 'Using ' },
      { text: 'Salesforce Shield', marks: ['strong'] },
      { text: ', TesseractApps maintains detailed logs of user actions:' },
    ]),
    li('Every login, change, or access to participant records is traceable.'),
    li('You gain full visibility into who accessed what, and when.'),
    h(3, 'Granular Access Control'),
    pSpans([
      { text: 'We implement strict, ' },
      { text: 'role-based access permissions', marks: ['strong'] },
      { text: ':' },
    ]),
    li('Staff only access the information necessary for their responsibilities.'),
    pSpans([
      { text: '' },
      { text: 'Multi-factor authentication (MFA)', marks: ['strong'] },
      { text: ' adds another layer of defence.' },
    ]),
    h(3, 'Australian Data Residency & ISO 27001 Certification'),
    pSpans([
      { text: 'Your data remains securely hosted on ' },
      { text: 'Salesforce Hyperforce data centres in Australia', marks: ['strong'] },
      { text: ':' },
    ]),
    li('Governed by local privacy laws.'),
    pSpans([
      { text: 'Built on ' },
      { text: 'ISO 27001-certified', marks: ['strong'] },
      { text: ' infrastructure that complies with international information security standards.' },
    ]),
    h(2, 'Why It Matters'),
    p('Data breaches are no longer hypothetical — they are a lived reality for care providers across Australia. For NDIS and aged care organisations, protecting participant data is not only a compliance issue under the NDIS Practice Standards, but a moral obligation. At TesseractApps, we combine the convenience of the cloud with the rigour of enterprise-level security to give providers peace of mind and help them focus on what matters most, delivering quality care.'),
    h(2, 'Sources'),
    li('Australian Government Department of Home Affairs. MediSecure Cyber Security Incident — https://www.homeaffairs.gov.au/about-us/our-portfolios/cyber-security/cyber-coordinator/medisecure-cyber-security-incident'),
    li('Eftsure. Healthcare Cybersecurity, Data Breach & Cybercrime Statistics in Australia — https://eftsure.com/en-au/statistics/healthcare-cybersecurity-data-breach-cybercrime-statistics-in-australia/'),
    li('iTnews. NDIS case management system provider breached — https://www.itnews.com.au/news/ndis-case-management-system-provider-breached-580729'),
    li('UpGuard. 13 Biggest Data Breaches in Australia [Updated 2025] — https://www.upguard.com/blog/biggest-data-breaches-australia'),
    li('Cyber Daily. Rhysida ransomware gang claims hack on disability support organisation Engedi — https://www.cyberdaily.au/security/11010-exclusive-rhysida-ransomware-gang-claims-hack-on-disability-support-org-engedi'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 2 — Future-Proofing Disability Services
// ---------------------------------------------------------------------------
const post2 = {
  _id: 'blogpost-future-proofing-disability-services',
  _type: 'blogPost',
  title: 'Future-Proofing Disability Services: Why NDIS Providers Need Smarter Systems Now',
  slug: { _type: 'slug', current: 'future-proofing-disability-services' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['NDIS', 'technology', 'digital transformation', 'compliance'],
  excerpt: 'Australia\'s NDIS is evolving at pace. By March 2025, the scheme supported over 717,000 active participants. NDIS providers must modernise to remain competitive and compliant.',
  publishedAt: '2025-06-12T00:00:00.000Z',
  readingTime: 5,
  featured: false,
  seo: {
    metaTitle: 'Future-Proofing Your NDIS Business | Technology Trends | TesseractApps',
    metaDescription: 'Learn how to future-proof your NDIS business with technology. Digital transformation strategies, automation trends, and compliance preparation for providers.',
    noIndex: false,
  },
  body: [
    p('Australia\'s NDIS (National Disability Insurance Scheme) is evolving at pace. By March 2025, the scheme supported over 717,000 active participants — a 3.5% increase in just one quarter. This rapid expansion creates significant operational, compliance, and workforce challenges for NDIS providers. To remain competitive and compliant, NDIS service providers must modernise. Adopting NDIS-specific software platforms enables providers to streamline operations, meet regulatory demands, and deliver person-centred care efficiently.'),
    h(2, 'What\'s Driving the Urgent Need for Smarter NDIS Systems?'),
    h(3, '1. Rapid Growth in Participant Numbers'),
    p('Thousands of new participants enter the NDIS each quarter — each requiring assessments, budgets, service agreements, reports, and ongoing documentation. Without integrated software, managing this growth increases risks of errors, service delays, and compliance breaches.'),
    h(3, '2. Increasing Compliance and Audit Pressure'),
    p('The NDIS Quality and Safeguards Commission continues to tighten audit standards. Providers must now:'),
    li('Maintain real-time support documentation'),
    li('Track incidents and corrective actions'),
    li('Provide on-demand audit-ready reports'),
    p('Manual methods, such as spreadsheets or paper-based records, often result in costly delays and gaps. In contrast, NDIS management platforms like TesseractApps offer:'),
    li('Automatic time-stamped logs'),
    li('Secure storage of care records'),
    li('Real-time reporting dashboards'),
    h(3, '3. Workforce Pressures and Operational Strain'),
    pSpans([
      { text: 'With ' },
      { text: '78%', marks: ['strong'] },
      { text: ' of NDIS providers struggling to attract and retain support staff, operational efficiency is vital. Lean teams must do more — faster.' },
    ]),
    p('Smarter software helps reduce admin time so staff can focus on participant support:'),
    li('Auto-generate rosters based on staff availability and qualifications'),
    li('Capture notes and attendance via a mobile app'),
    li('Seamlessly link service delivery to invoicing and payroll'),
    h(2, 'How TesseractApps Helps NDIS Providers Thrive'),
    p('At TesseractApps, we specialise in scalable, integrated NDIS provider software built on Salesforce, tailored to the needs of Australian disability service organisations.'),
    h(3, 'Participant & Care Management'),
    p('Track participant goals, budgets, progress notes, and care plans from a secure, unified system — accessible only by authorised staff.'),
    h(3, 'Smarter HR and Rostering'),
    p('Easily manage shifts, availability, leave, certifications, and compliance checks in one dashboard.'),
    h(3, 'Mobile App for Support Workers'),
    p('Enable GPS-tagged care logs, mobile clock-in/clock-out, and real-time updates — streamlining communication between staff and office teams.'),
    h(3, 'Invoicing & Payroll Automation'),
    p('Auto-generate NDIA claims and self-managed invoices. Automate STP, superannuation, and award interpretation in payroll processing.'),
    h(3, 'Compliance & Audit Readiness'),
    p('Track incidents, assign actions, and generate auditable reports with full transparency. Alerts ensure deadlines are never missed.'),
    h(3, '24/7 Support & Data Security'),
    p('Hosted securely in Australia, with 24/7 support available under our Premium Plan — always ensuring peace of mind.'),
    h(2, 'Trusted NDIS Software for Scalable, Compliant Growth'),
    p('With the NDIS set to exceed 800,000 participants by 2026, there\'s never been a better time to upgrade your systems. TesseractApps gives you the tools to scale sustainably, reduce admin costs, and exceed compliance expectations.'),
    p('Book a Demo to see how we can support your growth as an NDIS provider.'),
    h(2, 'Sources'),
    li('NDIS. NDIS Quarterly Report published - March 2025 — https://www.ndis.gov.au'),
    li('NDIS Commission. Regulatory Priorities 2024–25 Summary — https://www.ndiscommission.gov.au'),
    li('CentroQMS. Key Stats – State of the Disability Sector 2023 — https://www.centroqms.com.au'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 3 — Hidden Costs of Poor Workforce Management
// ---------------------------------------------------------------------------
const post3 = {
  _id: 'blogpost-hidden-costs-workforce-management',
  _type: 'blogPost',
  title: 'The Hidden Costs of Poor Workforce Management for NDIS Providers',
  slug: { _type: 'slug', current: 'hidden-costs-workforce-management' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['workforce management', 'NDIS', 'rostering', 'compliance', 'costs'],
  excerpt: 'NDIS service providers rely on having their operations staffed properly. But the hidden costs associated with overtime, absence, compliance, and reputation damage are costing providers out of control.',
  publishedAt: '2025-07-28T00:00:00.000Z',
  readingTime: 6,
  featured: false,
  seo: {
    metaTitle: 'Hidden Costs of Poor Workforce Management | NDIS Providers | TesseractApps',
    metaDescription: 'Discover the hidden costs of poor workforce management for NDIS providers. Compliance risks, staff turnover, and inefficiency impacts on your bottom line.',
    noIndex: false,
  },
  body: [
    p('NDIS service providers rely on having their operations staffed properly. But too many organisations don\'t realize how much bad workforce management can rip into their bottom line. It\'s easy to see where the money is being spent in the form of staffing hours, but the hidden costs associated with overtime, absence, compliance, and the negative impact on reputation are costing providers out of control due to their inability to track, manage and analyze schedules effectively.'),
    p('For directors, HR professionals, and operations managers, it is important to identify and deal with these problems. In this blog, we explore the visible and hidden costs of inefficient workforce management and present some realistic solutions NDIS providers can use to combat these issues.'),
    h(2, 'How Visible Costs Spiral: Overtime and Agency Spend'),
    p('One of the most obvious symptoms of poor workforce management is an over-reliance on overtime and temporary staff from agencies. Constantly filling roster gaps with costly agency workers inflates expenses without providing long-term value.'),
    p('Similarly, unplanned overtime quickly adds up. Paying penalty rates due to inefficient rostering can create severe financial strain, particularly for NDIS providers operating within tight margins.'),
    p('A key driver of these visible costs is poorly optimised systems. Manual rostering processes or outdated tools leave little room for proactive scheduling. This leads to last-minute changes and unnecessary expense.'),
    h(2, 'The Hidden Costs Few Providers Realise'),
    p('Beneath these surface challenges exist more profound, hidden issues that threaten the sustainability and standing of an organisation.'),
    h(3, '1. Burnout and Workforce Turnover'),
    p('Ineffective workforce management, such as improper workload allocation, often results in staff taking on more than they can handle. Overworked employees are more likely to experience burnout, leading to higher absenteeism, reduced engagement, and mistakes in service delivery.'),
    p('When burnout goes unchecked, staff turnover becomes inevitable. Hiring and training new staff is not only expensive but also disruptive to team cohesion and operational efficiency.'),
    h(3, '2. Non-Compliance Risks'),
    p('NDIS providers operate in a highly regulated environment, and non-compliance can lead to lawsuits and hefty penalties. Gaps in workforce management often result in missed credential renewals, improper shift allocations, or unqualified staff overseeing critical tasks.'),
    p('Non-compliance doesn\'t just pose operational risks; it can also jeopardise funding and accreditation.'),
    h(3, '3. Reputation Damage'),
    p('Poorly managed workforces can lead to service delays, errors, or dissatisfied clients — tarnishing the organisation\'s reputation. Given the competitive nature of the NDIS sector, retaining a good industry reputation is critical for growth and long-term success.'),
    h(2, 'Common Workforce Management Mistakes Providers Make'),
    p('Preventing these costs starts with recognising common missteps in workforce management, including:'),
    h(3, 'Over-reliance on manual processes'),
    p('These are prone to human error and inefficiencies.'),
    h(3, 'Outdated technology'),
    p('Legacy systems often lack the real-time tracking and automation capabilities needed in today\'s fast-paced environment.'),
    h(3, 'Reactive, not proactive approaches'),
    p('Waiting until issues arise rather than planning ahead results in higher costs and inefficiencies.'),
    h(3, 'Neglecting compliance tracking'),
    p('Failing to monitor staff credentials and qualifications closely can lead to audits or fines.'),
    h(2, 'Your Solution to Workforce Management Challenges'),
    p('Poor workforce management doesn\'t just hurt your bottom line; it threatens your organisation\'s ability to provide quality care. By adopting modern tools like smart rostering, payroll automation, and compliance tracking, NDIS providers can reduce visible and hidden costs while improving service delivery.'),
    p('If your organisation is ready to take the next step, TesseractApps offers cutting-edge workforce management solutions tailored to the needs of NDIS providers. Streamline your operations, reduce costs, and ensure compliance with our tools.'),
    h(2, 'Contact TesseractApps Today'),
    p('Contact us today to learn more about how TesseractApps can transform your workforce management strategies.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 4 — Sydney Expo 2025
// ---------------------------------------------------------------------------
const post4 = {
  _id: 'blogpost-sydney-disability-workability-expo-2025',
  _type: 'blogPost',
  title: 'Unforgettable Moments at the Disability & WorkAbility Sydney Expo 2025',
  slug: { _type: 'slug', current: 'sydney-disability-workability-expo-2025' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_EVENTS_ID),
  tags: ['events', 'expo', 'Sydney', 'NDIS', 'community'],
  excerpt: 'On August 8–9, 2025, the TesseractApps team joined the Sydney Disability & WorkAbility Expo, connecting with NDIS providers, support coordinators, participants, and sector leaders.',
  publishedAt: '2025-08-13T00:00:00.000Z',
  readingTime: 3,
  featured: false,
  seo: {
    metaTitle: 'Sydney Disability & WorkAbility Expo 2025 | TesseractApps',
    metaDescription: 'TesseractApps at the Sydney Disability & WorkAbility Expo 2025. Connecting with NDIS providers, support coordinators, and the disability community.',
    noIndex: false,
  },
  body: [
    p('On August 8–9, 2025, the TesseractApps team had the honour of joining the Sydney Disability & WorkAbility Expo, where the air was alive with connection, innovation, and the shared commitment that drives the NDIS community.'),
    p('Those two days gave rise to moments we won\'t forget, as we conversed directly with NDIS providers, support coordinators, participants, and sector leaders — each focused on refining care and boosting operational excellence across the country.'),
    h(2, 'What We Did at the Expo'),
    h(3, 'Streamlined Operations'),
    p('We demonstrated how TesseractApps automates rostering, payroll, and compliance workflows — freeing providers to focus on what matters most: participant care.'),
    h(3, 'Compliance Made Simple'),
    p('Our platform helps providers stay audit-ready with real-time documentation, incident tracking, and automated alerts for credential renewals.'),
    h(3, 'Secure & Accessible'),
    p('Built on Salesforce with Australian data residency and ISO 27001 certification, TesseractApps provides enterprise-grade security accessible from any device.'),
    h(3, 'Community & Insights'),
    p('The expo was a valuable opportunity to hear directly from providers about their challenges and aspirations — insights that continue to shape our product roadmap.'),
    h(2, 'Looking Ahead'),
    p('The energy at the Sydney Expo reinforced what we already know: the NDIS community is passionate, resilient, and ready for smarter tools. We left with renewed purpose and a clearer understanding of how TesseractApps can better serve Australian disability providers.'),
    h(2, 'Missed the Expo?'),
    p('Book a free demo to see TesseractApps in action and discover how we can transform your NDIS operations.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 5 — Canberra NDIS Expo
// ---------------------------------------------------------------------------
const post5 = {
  _id: 'blogpost-canberra-ndis-expo',
  _type: 'blogPost',
  title: 'TesseractApps Connects with Canberra\'s NDIS Community at the Expo',
  slug: { _type: 'slug', current: 'canberra-ndis-expo' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_EVENTS_ID),
  tags: ['events', 'expo', 'Canberra', 'NDIS', 'community'],
  excerpt: 'TesseractApps, a proudly Canberra-based company, participated in the Canberra NDIS Expo, connecting with local providers and sharing how our platform supports disability service excellence.',
  publishedAt: '2025-09-15T00:00:00.000Z',
  readingTime: 3,
  featured: false,
  seo: {
    metaTitle: 'TesseractApps at Canberra NDIS Expo | Event Recap | Australia',
    metaDescription: 'TesseractApps connects with Canberra\'s NDIS community at the expo. Read about our conversations with providers and insights from the Australian disability sector.',
    noIndex: false,
  },
  body: [
    p('As a proudly Canberra-based company, TesseractApps was thrilled to participate in the Canberra NDIS Expo — an event that brought together the heart of our local disability community.'),
    p('The expo provided a fantastic opportunity to engage face-to-face with NDIS providers, support coordinators, and participants from across the ACT and surrounding regions. We had rich conversations about the unique challenges facing providers in our region and how TesseractApps can help.'),
    h(2, 'Connecting with Our Local Community'),
    p('Being headquartered in Canberra means we have a special connection to the providers and participants in our backyard. The Canberra NDIS Expo gave us the chance to deepen these relationships and listen to what matters most to the local NDIS community.'),
    p('From compliance concerns to workforce challenges, the conversations at the expo helped us understand how TesseractApps can continue to evolve to meet the needs of ACT providers.'),
    h(2, 'Looking Ahead'),
    p('Following the success of the Canberra Expo, we\'re planning a series of webinars and one-on-one consultations to continue supporting Canberra-based NDIS providers. If you missed us at the expo, reach out to book a personalised demo and discover how TesseractApps can transform your operations.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 6 — Beyond Compliance
// ---------------------------------------------------------------------------
const post6 = {
  _id: 'blogpost-beyond-compliance-care-quality',
  _type: 'blogPost',
  title: 'Beyond Compliance: How TesseractApps NDIS Software Elevates Care Quality and Staff Experience',
  slug: { _type: 'slug', current: 'beyond-compliance-care-quality' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['NDIS', 'care quality', 'staff experience', 'compliance', 'software'],
  excerpt: 'Balancing compliance requirements with delivering quality care is one of the greatest challenges for NDIS providers. TesseractApps helps providers achieve both — without compromise.',
  publishedAt: '2025-09-16T00:00:00.000Z',
  readingTime: 5,
  featured: false,
  seo: {
    metaTitle: 'Beyond Compliance: Building Quality Care | NDIS Excellence | TesseractApps',
    metaDescription: 'Move beyond basic NDIS compliance to deliver quality care. Strategies for provider excellence, participant outcomes, and operational improvement.',
    noIndex: false,
  },
  body: [
    p('Balancing the demands of regulatory compliance with the aspiration to deliver outstanding care is one of the greatest challenges facing NDIS providers today. At TesseractApps, we believe these goals aren\'t in conflict — our platform helps providers achieve both, simultaneously.'),
    h(2, 'Streamlined Operations'),
    p('TesseractApps automates time-consuming administrative tasks, from rostering and payroll to invoicing and reporting. This frees your team to focus on participant outcomes rather than paperwork.'),
    h(2, 'Improved Care Coordination'),
    p('Our centralised platform gives coordinators a complete view of each participant\'s care journey — goals, budgets, service history, and progress notes — enabling more personalised and responsive support.'),
    h(2, 'Enhanced Staff Experience'),
    p('When support workers have the right tools — a mobile app for clock-in/out, easy access to care plans, and clear rostering — they\'re more engaged and effective. Happy staff means better care outcomes.'),
    h(2, 'Real-Time Insights'),
    p('Live dashboards and customisable reports give managers the data they need to make informed decisions quickly. Spot trends, address issues early, and demonstrate value to stakeholders.'),
    h(2, 'Compliance Without Friction'),
    p('TesseractApps embeds compliance into everyday workflows. Incident tracking, credential monitoring, and audit-ready documentation happen automatically — without adding burden to your team.'),
    h(2, 'Integrated Learning and Training'),
    p('Our T-Learning Hub provides a built-in training platform where staff can complete mandatory modules, track certifications, and stay up to date with NDIS requirements — all within the same system.'),
    h(2, 'Secure Document Management'),
    p('All participant documents, policies, and records are stored securely in one place, with role-based access controls ensuring only authorised personnel can view sensitive information.'),
    p('Ready to go beyond compliance and truly elevate your care quality? Explore our Roster Management, Accounting, HR Operations, and T-Learning Hub features — or visit our NDIS compliance page to learn more.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 7 — Manual Rostering Hidden Costs
// ---------------------------------------------------------------------------
const post7 = {
  _id: 'blogpost-manual-rostering-hidden-costs',
  _type: 'blogPost',
  title: 'Why Manual Rostering Is Costing You More Than You Think',
  slug: { _type: 'slug', current: 'manual-rostering-hidden-costs' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['rostering', 'NDIS', 'automation', 'workforce', 'compliance'],
  excerpt: 'Manual rostering may seem manageable, but the true costs — lost productivity, compliance risks, higher labour expenses, and staff turnover — far exceed what most NDIS providers realise.',
  publishedAt: '2025-09-25T00:00:00.000Z',
  readingTime: 6,
  featured: true,
  seo: {
    metaTitle: 'Why Manual Rostering Costs More Than You Think | NDIS | TesseractApps',
    metaDescription: 'Calculate the true cost of manual rostering for your NDIS business. Time waste, errors, compliance risks, and how automation delivers ROI.',
    noIndex: false,
    schemaMarkup: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Why Manual Rostering Costs More Than You Think',
          description: 'Calculate the true cost of manual rostering for your NDIS business. Time waste, errors, compliance risks, and how automation delivers ROI.',
          author: { '@type': 'Organization', name: 'TesseractApps' },
          publisher: { '@type': 'Organization', name: 'TesseractApps', logo: { '@type': 'ImageObject', url: 'https://tesseractapps.com.au/tesseract_logo.webp' } },
          datePublished: '2025-09-25T00:00:00+10:00',
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What are the hidden costs of manual rostering in NDIS?', acceptedAnswer: { '@type': 'Answer', text: 'Manual rostering leads to lost productivity (10-15 hours/week), compliance risks (audits/fines), higher labor costs due to overstaffing, and reduced staff retention.' } },
            { '@type': 'Question', name: 'How does automated rostering improve NDIS compliance?', acceptedAnswer: { '@type': 'Answer', text: 'Automated systems like TesseractApps prevent non-compliant shifts by checking qualifications, fatigue management rules, and mandatory breaks in real-time.' } },
            { '@type': 'Question', name: 'How much time can NDIS providers save with rostering software?', acceptedAnswer: { '@type': 'Answer', text: 'Providers typically save 10-15 hours per week on rostering administration by switching from manual to automated systems.' } },
          ],
        },
      ],
    }),
  },
  body: [
    callout('info', 'Key Takeaways: Manual rostering costs NDIS providers 10-15 hours/week in admin time. Compliance risks include missed certifications, award breaches, and fatigue violations. Automated rostering reduces costs, improves staff retention, and enhances care quality.'),
    p('The care sector is under increasing pressure to do more with less. For NDIS providers juggling complex rosters, workforce compliance, and tight margins, manual rostering is often the default approach. But what seems manageable on the surface can quietly drain your organisation\'s resources, resilience, and staff morale.'),
    h(2, 'The Hidden Costs of Manual Rostering'),
    h(3, 'Lost Productivity and Administrative Burden'),
    p('Roster managers in NDIS organisations spend an estimated 10-15 hours per week on manual scheduling tasks — matching availability, managing last-minute changes, and handling shift swaps. That\'s the equivalent of nearly two full working days consumed by administration rather than strategic planning or participant outcomes.'),
    h(3, 'Compliance Risks'),
    p('Manual rostering significantly increases the risk of non-compliance. Without automated checks, organisations can inadvertently schedule staff with expired certifications, breach SCHADS Award conditions, violate fatigue management requirements, or miss mandatory break requirements.'),
    p('In a highly regulated environment like the NDIS, these oversights can result in financial penalties, audit failures, and reputational damage.'),
    h(3, 'Higher Labour Costs'),
    p('Without data-driven insights, manual rostering often results in overstaffing during low-demand periods and understaffing during peak times. Skill mismatches — placing overqualified staff in entry-level roles — further inflate labour costs without improving care outcomes.'),
    h(3, 'Reduced Staff Engagement and Retention'),
    pSpans([
      { text: 'With ' },
      { text: '78% of NDIS providers', marks: ['strong'] },
      { text: ' reporting difficulties retaining support workers, roster management practices play a significant role. Unpredictable schedules, last-minute changes, and perceived unfairness in shift allocation are major contributors to dissatisfaction and turnover.' },
    ]),
    h(3, 'Limited Data and Insights'),
    p('Manual systems provide little visibility into rostering patterns, staff utilisation, or cost trends. Without this data, identifying inefficiencies or making evidence-based decisions becomes nearly impossible.'),
    h(2, 'How Smarter Rostering Transforms Care Delivery'),
    p('Modern rostering platforms like TesseractApps address these challenges through automation and intelligent scheduling:'),
    li('Automated compliance checks prevent non-compliant shifts before they\'re published'),
    li('Smart matching ensures the right staff member is assigned based on qualifications, availability, and participant preferences'),
    li('Real-time visibility across your workforce reduces last-minute scrambles'),
    li('Integrated payroll processing eliminates double-handling and award interpretation errors'),
    li('Data analytics provide insights into staff utilisation, overtime trends, and cost drivers'),
    h(2, 'Why It Matters'),
    p('The shift from manual to automated rostering isn\'t just about saving time — it\'s about building a more resilient, compliant, and engaged workforce. Providers who invest in smarter rostering tools consistently report improved staff satisfaction, reduced compliance incidents, and lower administrative costs.'),
    h(2, 'Frequently Asked Questions'),
    h(3, 'What are the hidden costs of manual rostering in NDIS?'),
    p('Manual rostering leads to lost productivity (10-15 hours/week), compliance risks (audits/fines), higher labor costs due to overstaffing, and reduced staff retention.'),
    h(3, 'How does automated rostering improve NDIS compliance?'),
    p('Automated systems like TesseractApps prevent non-compliant shifts by checking qualifications, fatigue management rules, and mandatory breaks in real-time.'),
    h(3, 'How much time can NDIS providers save with rostering software?'),
    p('Providers typically save 10-15 hours per week on rostering administration by switching from manual to automated systems.'),
    h(2, 'Sources'),
    li('National Disability Services. State of the Disability Sector Report 2023 — https://www.nds.org.au'),
    li('Fair Work Commission. Social, Community, Home Care and Disability Services (SCHADS) Award — https://www.fairwork.gov.au'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 8 — Future-Proof Your NDIS Organisation: Strategies for 2025
// ---------------------------------------------------------------------------
const post8 = {
  _id: 'blogpost-future-proof-ndis-organisation-2025',
  _type: 'blogPost',
  title: 'Future-Proof Your NDIS Organisation: Strategies for 2025 and Beyond',
  slug: { _type: 'slug', current: 'future-proof-ndis-organisation-2025' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['NDIS', 'strategy', 'automation', 'compliance', 'technology', '2025'],
  excerpt: 'The NDIS landscape is evolving rapidly. Providers who invest in smarter systems, data-driven decisions, and empowered workforces will be best positioned to thrive in 2025 and beyond.',
  publishedAt: '2025-10-22T00:00:00.000Z',
  readingTime: 6,
  featured: false,
  seo: {
    metaTitle: 'NDIS Automation Guide | Workflow Efficiency | TesseractApps',
    metaDescription: 'Automate your NDIS operations for efficiency. Guide to workflow automation, time savings, and reducing administrative burden for care providers.',
    noIndex: false,
  },
  body: [
    p('The NDIS landscape is evolving rapidly. Regulatory changes, participant growth, and workforce pressures mean that providers who rely on legacy systems or manual processes risk falling behind. Future-proofing your NDIS organisation means investing in the right systems, strategies, and culture today.'),
    h(2, 'Smarter Compliance and Efficiency'),
    h(3, 'Automated Workflows'),
    p('Replace manual, error-prone processes with automated workflows for rostering, invoicing, incident reporting, and documentation. Automation reduces administrative burden and ensures consistency.'),
    h(3, 'Built-In Compliance'),
    p('TesseractApps embeds NDIS compliance requirements directly into your workflows. Alerts for expiring certifications, automated audit trails, and real-time incident logging mean compliance happens as a by-product of normal operations.'),
    h(3, 'Financial Clarity'),
    p('Real-time financial dashboards give managers visibility into budget utilisation, funding gaps, and claim status — enabling proactive financial management rather than reactive firefighting.'),
    h(2, 'Optimised Participant Experience'),
    h(3, 'Transparent Communication'),
    p('Participants and their families expect transparency. TesseractApps enables providers to share care plans, progress notes, and service schedules digitally — building trust and engagement.'),
    h(3, 'Flexible Service Delivery'),
    p('Modern NDIS participants expect flexible, person-centred support. Our platform supports diverse service types, funding categories, and delivery models — enabling providers to adapt quickly to participant needs.'),
    h(3, 'Continuous Feedback'),
    p('Built-in feedback mechanisms help providers capture participant satisfaction data and identify areas for improvement — supporting a culture of continuous quality improvement.'),
    h(2, 'Empowered Workforce'),
    h(3, 'Comprehensive Training (T-Learning Hub)'),
    p('TesseractApps\' T-Learning Hub provides an integrated training platform where support workers can complete mandatory inductions, compliance training, and professional development modules — all within the platform.'),
    h(3, 'Better Staff Experience'),
    p('The TesseractApps mobile app gives support workers everything they need: their schedule, care plans, clock-in/out functionality, and communication tools — reducing friction and improving job satisfaction.'),
    h(3, 'Ongoing Development'),
    p('Investing in your workforce\'s professional development not only improves care quality but also reduces turnover — a critical consideration in the current NDIS workforce climate.'),
    h(2, 'Data-Driven Decision Making'),
    h(3, 'Live Dashboards'),
    p('TesseractApps provides real-time dashboards for every level of your organisation — from frontline supervisors to executive leadership. Make faster, more informed decisions backed by accurate data.'),
    h(3, 'Stronger Foundations'),
    p('Historical data and trend analysis help providers identify patterns, anticipate challenges, and build stronger operational foundations for the future.'),
    h(2, 'Scalable, Secure Technology'),
    h(3, 'Unified System'),
    p('TesseractApps consolidates participant management, HR, rostering, payroll, finance, and compliance into a single integrated platform — eliminating data silos and reducing integration complexity.'),
    h(3, 'Automation'),
    p('From NDIA claims processing to payroll calculations, automation reduces manual effort and the risk of costly errors.'),
    h(3, 'Scalable & Secure'),
    p('Built on Salesforce with Australian data residency, TesseractApps scales with your organisation — from a handful of participants to thousands — without compromising security or performance.'),
    h(3, 'Reliable Infrastructure'),
    p('With 99.9% uptime and enterprise-grade infrastructure, TesseractApps ensures your operations are never disrupted by system downtime.'),
    p('TesseractApps gives NDIS providers the tools to operate efficiently, stay compliant, and deliver outstanding care — today and into the future. Contact us to learn how we can help future-proof your organisation.'),
    h(2, 'References'),
    li('NDIS. Quarterly Report — https://www.ndis.gov.au'),
    li('NDIS Quality and Safeguards Commission. Practice Standards — https://www.ndiscommission.gov.au'),
    li('Department of Social Services. NDIS Review Final Report — https://www.dss.gov.au'),
    li('Fair Work Commission. SCHADS Award — https://www.fairwork.gov.au'),
    li('Australian Bureau of Statistics. Disability, Ageing and Carers — https://www.abs.gov.au'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 9 — Top 3 Compliance Myths Busted
// ---------------------------------------------------------------------------
const post9 = {
  _id: 'blogpost-top-3-compliance-myths-busted',
  _type: 'blogPost',
  title: 'Top 3 Compliance Myths Busted',
  slug: { _type: 'slug', current: 'top-3-compliance-myths-busted' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['NDIS', 'compliance', 'myths', 'audit', 'culture'],
  excerpt: 'Three persistent myths about NDIS compliance are holding providers back. Let\'s clear the air and show how the right approach — and the right tools — can make compliance straightforward.',
  publishedAt: '2025-11-11T00:00:00.000Z',
  readingTime: 4,
  featured: false,
  seo: {
    metaTitle: 'Top 3 NDIS Compliance Myths Busted | Provider Guide | TesseractApps',
    metaDescription: 'Debunking common NDIS compliance myths. Understand what\'s really required, avoid costly mistakes, and simplify your compliance approach.',
    noIndex: false,
  },
  body: [
    p('Compliance is one of the most talked-about — and most misunderstood — topics in the NDIS sector. For many providers, it\'s a source of anxiety, confusion, and sometimes paralysis. But much of this stems from persistent myths that distort what compliance actually requires.'),
    p('Let\'s clear the air with the top 3 compliance myths we hear most often:'),
    h(2, 'Myth 1: Compliance Is Only About Paperwork'),
    p('Many providers think compliance means having the right forms filled out and filed away. While documentation is important, real compliance is about consistent, transparent processes embedded in your daily operations.'),
    p('What actually matters: Are your policies being followed in practice? Are incidents being identified, reported, and acted on promptly? Is your team trained and supported to deliver safe, quality care?'),
    p('TesseractApps helps providers embed compliance into their workflows — making it a natural outcome of doing good work, not an additional burden.'),
    h(2, 'Myth 2: Compliance Is the Job of One Person'),
    p('It\'s tempting to assign compliance to a designated "compliance officer" and assume the job is done. But in reality, compliance is an organisational culture, not an individual responsibility.'),
    p('Every support worker who clocks in accurately, every manager who reviews an incident report, every coordinator who updates a care plan — they\'re all contributing to compliance.'),
    p('TesseractApps makes it easy for the whole team to contribute, with intuitive tools that guide staff through compliant processes without requiring specialist knowledge.'),
    h(2, 'Myth 3: Compliance Slows Down Service Delivery'),
    p('This is perhaps the most damaging myth. The assumption that compliance and efficiency are in tension leads some providers to cut corners — with potentially serious consequences.'),
    p('In reality, well-designed compliance systems make service delivery faster and more reliable. When you have automated checklists, real-time alerts, and pre-built audit trails, you spend less time on manual administration and more time delivering care.'),
    p('TesseractApps users consistently report that compliance becomes easier — not harder — once the right systems are in place.'),
    callout('tip', 'Ready to simplify compliance? TesseractApps makes NDIS compliance a natural outcome of great operations — not an extra burden. Book a Demo to see how.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 10 — Common Payroll Pitfalls
// ---------------------------------------------------------------------------
const post10 = {
  _id: 'blogpost-common-payroll-pitfalls-ndis',
  _type: 'blogPost',
  title: 'Avoid These Common Payroll Pitfalls: A Guide for NDIS Providers',
  slug: { _type: 'slug', current: 'common-payroll-pitfalls-ndis' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['payroll', 'NDIS', 'SCHADS', 'compliance', 'HR'],
  excerpt: 'Payroll management is one of the most complex and consequential aspects of running an NDIS provider business. Here are the seven most common pitfalls — and how to avoid them.',
  publishedAt: '2025-11-11T00:00:00.000Z',
  readingTime: 5,
  featured: false,
  seo: {
    metaTitle: 'Common Payroll Pitfalls for NDIS Providers | Avoid Mistakes | TesseractApps',
    metaDescription: 'Avoid common payroll mistakes as an NDIS provider. SCHADS Award compliance, timesheet accuracy, and payroll processing best practices.',
    noIndex: false,
  },
  body: [
    p('Payroll management is one of the most complex and consequential aspects of running an NDIS provider business. Mistakes can lead to underpayment claims, ATO penalties, staff dissatisfaction, and compliance failures. Yet many providers continue to struggle with the same recurring issues.'),
    p('Here are the seven most common payroll pitfalls — and how TesseractApps helps you avoid them:'),
    h(2, '1. Incorrect Employee Classification'),
    p('Misclassifying employees as casual when they are entitled to permanent status, or incorrectly applying award levels, can result in significant underpayment liability. The SCHADS Award is complex, and getting classification right is critical.'),
    p('TesseractApps automates award interpretation, ensuring employees are classified correctly and paid at the right rate from day one.'),
    h(2, '2. Late or Inaccurate Payments'),
    p('Late payment of wages is a breach of the Fair Work Act and can result in penalties. Inaccurate payments — whether through timesheet errors, incorrect allowances, or missed overtime — erode staff trust and create legal risk.'),
    p('Our integrated timesheets and automated payroll processing ensure payments are accurate and on time, every time.'),
    h(2, '3. Failure to Stay Updated with Payroll Regulations'),
    p('Payroll regulations change regularly — minimum wage increases, superannuation rate changes, STP Phase 2 requirements, and SCHADS Award updates all require prompt action.'),
    p('TesseractApps updates its payroll engine automatically when regulations change, keeping your organisation compliant without manual intervention.'),
    h(2, '4. Poor Record-Keeping'),
    p('Inadequate payroll records are a common audit finding. Providers must retain pay slips, timesheets, and employment records for at least seven years under the Fair Work Act.'),
    p('TesseractApps stores all payroll records securely in the cloud, making them instantly accessible for audits or employee queries.'),
    h(2, '5. Overlooking Employee Entitlements'),
    p('Missed leave accruals, unpaid allowances, and incorrect penalty rates are common sources of underpayment. These errors, even when unintentional, can result in costly back-pay obligations.'),
    p('Our platform automatically calculates all entitlements based on employment type, award classification, and hours worked — eliminating the risk of oversight.'),
    h(2, '6. Lack of System Integration'),
    p('When rostering, timesheets, and payroll operate in separate systems, data must be manually transferred between them — creating opportunities for errors and inconsistencies.'),
    p('TesseractApps integrates rostering, attendance, and payroll in a single platform, eliminating manual data transfer and ensuring consistency across all records.'),
    h(2, '7. Neglecting Data Security'),
    p('Payroll data is highly sensitive. Inadequate security controls can expose employee financial information to unauthorised access — with serious privacy and legal consequences.'),
    p('TesseractApps is built on Salesforce with enterprise-grade security, AES-256 encryption, and role-based access controls — protecting your payroll data at every level.'),
    h(2, 'Why NDIS Providers Need Integrated Payroll Solutions'),
    p('The complexity of NDIS payroll — combining SCHADS Award interpretation, NDIS pricing rules, and multi-funder invoicing — means that off-the-shelf solutions often fall short. TesseractApps is purpose-built for NDIS providers, with deep expertise in the regulatory requirements of the care sector.'),
    p('Ready to simplify your payroll? Request a demo today to see how TesseractApps can transform your payroll processes.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 11 — Melbourne Expo 2025
// ---------------------------------------------------------------------------
const post11 = {
  _id: 'blogpost-melbourne-expo-2025',
  _type: 'blogPost',
  title: 'TesseractApps at the Melbourne Expo 2025 Driving Smarter NDIS Operations',
  slug: { _type: 'slug', current: 'melbourne-expo-2025' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_EVENTS_ID),
  tags: ['events', 'expo', 'Melbourne', 'NDIS', 'operations'],
  excerpt: 'TesseractApps showcased its platform at the Melbourne Expo 2025, demonstrating how NDIS providers can streamline operations, stay compliant, and deliver outstanding care.',
  publishedAt: '2025-12-04T00:00:00.000Z',
  readingTime: 4,
  featured: false,
  seo: {
    metaTitle: 'NDIS Industry Trends 2025 | Care Sector Outlook | TesseractApps',
    metaDescription: 'Explore NDIS industry trends for 2025. Technology adoption, regulatory changes, workforce challenges, and opportunities for Australian care providers.',
    noIndex: false,
  },
  body: [
    p('TesseractApps was proud to showcase its platform at the Melbourne Expo 2025, connecting with NDIS providers from across Victoria and beyond. The expo was a fantastic opportunity to demonstrate how our integrated software can help providers streamline operations, stay compliant, and deliver outstanding care.'),
    h(2, 'Streamline Your NDIS Operations'),
    h(3, 'Participant Management'),
    p('Our comprehensive participant management module gives coordinators a complete view of each participant\'s care journey — goals, budgets, service history, and progress notes in one secure platform.'),
    h(3, 'Rostering & Payroll'),
    p('Automate your rostering with smart scheduling that considers staff availability, qualifications, and participant preferences. Integrated payroll processing eliminates double-handling and award interpretation errors.'),
    h(3, 'Cost & Service Tracking'),
    p('Real-time financial dashboards provide visibility into budget utilisation, funding gaps, and NDIA claim status — enabling proactive financial management.'),
    h(3, 'Mobile Access'),
    p('The TesseractApps mobile app gives support workers everything they need on the go — their schedule, care plans, GPS clock-in/out, and communication tools.'),
    h(2, 'ISO Certified Security'),
    p('TesseractApps is certified to both ISO 27001 (information security) and ISO 9001 (quality management) standards, providing providers with confidence that their data and operations are protected at the highest level.'),
    h(2, 'Why Providers Choose TesseractApps'),
    p('At the Melbourne Expo, providers told us they were looking for solutions that could help them:'),
    li('Navigate upcoming NDIS compliance changes and pricing updates'),
    li('Manage administrative tasks more efficiently with a lean team'),
    li('Find solutions tailored to their specific provider size and model'),
    p('TesseractApps delivers on all three — with a scalable platform that grows with your organisation and dedicated support from our Canberra-based team.'),
    h(2, 'Stay Ahead in NDIS Compliance'),
    p('The NDIS landscape is changing rapidly. Providers who invest in the right systems now will be best positioned to navigate upcoming changes and deliver exceptional care. Request a demo today to see TesseractApps in action.'),
  ],
}

// ---------------------------------------------------------------------------
// Blog Post: 12 — NDIS Compliance Audit Failures 2026
// ---------------------------------------------------------------------------
const post12 = {
  _id: 'blogpost-ndis-compliance-audit-failures-2026',
  _type: 'blogPost',
  title: 'Why NDIS Providers Fail Compliance Audits in 2026 | How to Fix It',
  slug: { _type: 'slug', current: 'ndis-compliance-audit-failures-2026' },
  status: 'published',
  author: authorRef(),
  category: categoryRef(CAT_NDIS_ID),
  tags: ['NDIS', 'compliance', 'audit', '2026', 'documentation', 'governance'],
  excerpt: 'NDIS compliance audits are not failing providers because of poor care delivery. They fail because providers cannot demonstrate compliance with evidence. Here\'s how to fix it.',
  publishedAt: '2026-01-20T00:00:00.000Z',
  readingTime: 8,
  featured: true,
  seo: {
    metaTitle: 'Why NDIS Providers Fail Compliance Audits in 2026 | How to Fix It',
    metaDescription: 'NDIS compliance audits are not failing providers because of poor care delivery. They fail because providers cannot demonstrate compliance with evidence.',
    noIndex: false,
  },
  body: [
    p('NDIS compliance audits are failing providers — not because of poor care delivery, but because they cannot demonstrate compliance with sufficient evidence. In 2026, with NDIS Quality and Safeguards Commission audit standards tighter than ever, providers need a proactive approach to audit readiness.'),
    p('Here are the four most common reasons providers fail compliance audits — and how to fix them.'),
    h(2, '1. Documentation and Records'),
    h(3, 'Why Providers Fail'),
    li('Fragmented records across multiple systems and formats'),
    li('Outdated policies that don\'t reflect current practice'),
    li('Poor version control leading to staff using superseded documents'),
    h(3, 'How to Fix It'),
    li('Centralise all documentation in a secure digital hub with version control'),
    li('Align policies with current NDIS Practice Standards and review annually'),
    li('Implement document acknowledgement workflows to ensure staff have read key policies'),
    h(2, '2. Training and Workforce Compliance'),
    h(3, 'Why Providers Fail'),
    li('Expired mandatory training with no alert system'),
    li('Missing training acknowledgements or completion records'),
    li('Incomplete workforce screening records (WWCC, police checks)'),
    h(3, 'How to Fix It'),
    li('Maintain a digital training register with automated alerts for upcoming expirations'),
    li('Require training completion acknowledgements within the platform'),
    li('Set mandatory refresher schedules for key compliance training'),
    h(2, '3. Risk and Incident Management'),
    h(3, 'Why Providers Fail'),
    li('Informal risk assessments not documented in a register'),
    li('Delayed incident reporting that misses NDIS Commission timeframes'),
    li('No documented follow-up actions or root cause analysis'),
    h(3, 'How to Fix It'),
    li('Maintain a live risk register that is reviewed and updated regularly'),
    li('Implement a formal incident management process with clear escalation pathways'),
    li('Track all corrective actions to completion and document outcomes'),
    h(2, '4. Governance and Compliance Culture'),
    h(3, 'Why Providers Fail'),
    li('No clear compliance ownership or accountability framework'),
    li('Reactive approach — only addressing compliance issues when they arise'),
    h(3, 'How to Fix It'),
    li('Establish clear roles and responsibilities for compliance at all levels'),
    li('Conduct regular internal compliance reviews before external audits'),
    li('Build a culture where compliance is everyone\'s responsibility'),
    h(2, 'Real-World Compliance Failures'),
    p('Recent cases illustrate the consequences of compliance failures:'),
    h(3, 'Lifestyle Solutions'),
    p('One of Australia\'s largest disability service providers had its registration suspended after auditors found systemic failures in incident management and governance. The provider was delivering high volumes of care but lacked the documentation infrastructure to demonstrate compliance.'),
    h(3, 'Valmar Support Services'),
    p('This Queensland provider faced significant compliance action after audits revealed inadequate staff training records and failure to maintain current policies aligned with NDIS Practice Standards.'),
    h(3, 'Aurora Community Care'),
    p('Audit findings revealed gaps in risk management processes and incident reporting, highlighting how even well-intentioned providers can fail on process compliance.'),
    h(2, 'The Role of Software in Audit Readiness'),
    callout('info', 'The right technology transforms compliance from a reactive burden into a proactive, embedded practice. TesseractApps is purpose-built for NDIS audit readiness — centralising documentation, automating training tracking, streamlining incident management, and providing real-time compliance dashboards.'),
    p('Providers using integrated management platforms like TesseractApps consistently report shorter audit preparation times, fewer audit findings, and greater confidence going into audits.'),
    h(2, 'Strengthen Your Audit Readiness for 2026'),
    p('Don\'t wait for an audit finding to address your compliance gaps. TesseractApps can help you build the systems, processes, and culture needed to pass audits confidently — and more importantly, to deliver safe, quality care every day.'),
    p('Contact us today to discuss your compliance challenges and discover how TesseractApps can help you prepare for 2026 and beyond.'),
  ],
}

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log(`\n🌱  Seeding Sanity dataset "${dataset}" on project "${projectId}"...\n`)

  const docs = [
    authorDoc,
    categoryNDIS,
    categoryEvents,
    post1,
    post2,
    post3,
    post4,
    post5,
    post6,
    post7,
    post8,
    post9,
    post10,
    post11,
    post12,
  ]

  let created = 0
  let errors = 0

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc)
      console.log(`  ✅  ${doc._type.padEnd(12)}  ${doc._id}`)
      created++
    } catch (err) {
      console.error(`  ❌  ${doc._id}: ${err.message}`)
      errors++
    }
  }

  console.log(`\n📊  Done: ${created} created/updated, ${errors} errors.\n`)

  if (errors === 0) {
    console.log('🎉  All documents seeded successfully!')
    console.log('   → Open /studio to assign cover images to each post.')
    console.log('   → Run `npm run typegen` to refresh type definitions if schemas changed.\n')
  } else {
    console.log('⚠️   Some documents failed. Check the errors above and re-run to retry.\n')
    process.exit(1)
  }
}

seed().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
