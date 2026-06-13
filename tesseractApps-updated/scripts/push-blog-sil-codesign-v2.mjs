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

const doc = {
  _type: 'blogPost',
  title: 'How the New SIL Practice Standard Is Being Co-Designed with Participants',
  slug: { _type: 'slug', current: 'ndis-sil-co-design-standards-participants' },
  status: 'draft',
  authors: [{ _type: 'reference', _ref: BELLE_ID, _key: key() }],
  category: { _type: 'reference', _ref: SIL_CATEGORY_ID },
  tags: ['NDIS', 'SIL', 'co-design', 'Inclusion Australia', 'participant voice', 'practice standards', 'NDIS reform 2026'],
  excerpt: 'The new NDIS SIL Practice Standard is being co-designed with participants through Inclusion Australia. Learn what this means for providers.',
  publishedAt: '2026-06-02T00:00:00.000Z',
  readingTime: 6,
  featured: false,
  cta: {
    heading: 'Stay ahead of every change to the SIL Practice Standard',
    body: 'Subscribe to our NDIS compliance update series. We will break down each element of the new SIL Practice Standard as it is finalised, so you are never caught off guard. Or book a free demo to see how our platform keeps you audit-ready.',
    primaryLabel: 'Book a Free Demo',
    primaryUrl: '/book-a-demo',
    secondaryLabel: 'Contact Us',
    secondaryUrl: '/contact',
  },
  seo: {
    _type: 'seo',
    metaTitle: 'NDIS SIL Co-Design Standards: How Participants Are Shaping the New Rules',
    metaDescription: 'The new NDIS SIL Practice Standard is being co-designed with participants through Inclusion Australia. Learn what this means for providers.',
    canonicalUrl: 'https://tesseractapps.com.au/blog/ndis-sil-co-design-standards-participants',
    noIndex: false,
  },
  body: [
    p('Something different is happening with the new SIL Practice Standard, and it is worth paying close attention to. Rather than having regulators write standards in isolation and hand them down to the sector, the NDIS Commission has partnered with Inclusion Australia to co-design the new standard with participants at the centre.'),
    p('This is not just a feel-good policy approach. It has real implications for what the standard will require, how providers will be assessed, and what participants will increasingly expect from their SIL providers.'),

    h2('What Co-Design Actually Means in This Context'),
    p("Co-design, in this context, means that people with disability have been active participants in shaping what the standard looks like, not just consulted after the fact. The Commission partnered with Inclusion Australia, a national organisation representing people with intellectual disability, to ensure that the voices of people who actually live in SIL settings informed the standard's direction."),
    p("The Commission's consultation process involved more than 800 stakeholders in 2024, generating an Insights Report that captured what participants and their families believe is most important in housing and living supports."),

    h2('What Participants Said They Want'),
    p('The Insights Report from the 2024 consultation provides a clear picture of participant priorities. Across the submissions, a consistent set of themes emerged:'),
    li('Choice and control in day-to-day decisions, not just in the support planning process'),
    li('Staff who are consistent, trustworthy, and genuinely understand their support needs'),
    li('Clear and accessible information about their rights and how to raise concerns'),
    li('Providers who actively involve them in decisions about their living arrangements'),
    li('Supports that help them connect with their communities, not just meet their care needs'),

    h2('What This Means for SIL Providers in Practice'),
    p('If participant feedback is genuinely shaping the new standard, providers can expect the standard to focus heavily on:'),
    li("Individualised support planning: Generic support plans will not pass audit. Each plan must reflect the individual's actual goals, preferences, and needs."),
    li('Feedback and grievance mechanisms: Providers will need to demonstrate not just that a complaints policy exists, but that participants know how to use it, feel safe doing so, and can see that their feedback leads to action.'),
    li('Workforce culture: The standard is expected to address how providers foster a workforce culture that respects participant autonomy and builds genuine relationships.'),
    li('Community participation: Supports that keep participants isolated in their homes will not align with what participants have said they want.'),

    h2('Why This Is Good News for Quality Providers'),
    p('If you are already running a participant-centred service, if your staff genuinely know and respect the people they support, if your plans are individualised, if your participants feel heard, then the new standard is essentially validating the way you already work. The challenge will be documenting it in a way that auditors can verify.'),
    p('The providers who will struggle are those who have treated compliance as a paperwork exercise while the quality of actual support has lagged behind. The new standard is designed to make that gap visible.'),

    h2('Frequently Asked Questions'),

    h3('Q: What does co-design mean in the NDIS context?'),
    p('A: Co-design means people with disability actively participate in shaping policies and standards that affect them, rather than being consulted after decisions are made.'),

    h3('Q: Who is Inclusion Australia?'),
    p('A: Inclusion Australia is a national organisation representing people with intellectual disability. The NDIS Commission partnered with them to co-design the new SIL Practice Standard.'),

    h3('Q: How will co-design affect NDIS providers?'),
    p('A: Providers can expect stronger requirements around individualised support planning, participant feedback mechanisms, workforce culture, and community participation.'),

    h2('How to Prepare for a Co-Designed Standard'),
    li('Talk to your participants now: ask them what is working and what is not, and document the conversations.'),
    li('Review your support plans with fresh eyes: are they genuinely individualised, or templates with names swapped?'),
    li('Audit your feedback mechanisms: do participants actually know how to raise a concern? Do they feel safe doing so?'),
    li('Look at your workforce culture honestly: would your participants describe their support workers as consistent, respectful, and genuinely caring?'),
    li('Ensure your documentation system can show evidence of participant involvement, not just staff activity.'),
  ],
}

client.create(doc)
  .then((result) => {
    console.log('Created document ID:', result._id)
    console.log('Slug:', result.slug.current)
    console.log('Status:', result.status)
  })
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
