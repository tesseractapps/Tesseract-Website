/**
 * LLM/GEO content generation script.
 *
 * Runs as part of the prebuild step. Generates:
 *
 *   Spec entrypoints
 *   ─────────────────────────────────────────────────────────
 *   public/llms.txt                    — spec-compliant navigation index
 *   public/llms-full.txt               — everything concatenated (spec expanded form)
 *
 *   Section index files (flat link lists, one per content type)
 *   ─────────────────────────────────────────────────────────
 *   public/llm/blog-index.md
 *   public/llm/capabilities-index.md
 *   public/llm/solutions-index.md
 *   public/llm/competitors-index.md
 *
 *   Static page summaries
 *   ─────────────────────────────────────────────────────────
 *   public/llm/{page}.md               — hand-written summaries for static pages
 *
 *   CMS-generated content
 *   ─────────────────────────────────────────────────────────
 *   public/llm/blog/{slug}.md          — one per published Sanity blog post
 *   public/llm/capabilities/{slug}.md  — one per Sanity capability page
 *   public/llm/solutions/{slug}.md     — one per Sanity solution page
 *   public/llm/competitors/{slug}.md   — one per Sanity competitor page
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { loadEnv } from 'vite';
import {
  blogPostToMarkdown,
  capabilityToMarkdown,
  solutionToMarkdown,
  competitorToMarkdown,
  guideToMarkdown,
  whitepaperToMarkdown,
} from './sanity-to-markdown.mjs';

// ── Config ────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://tesseractapps.com.au';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const LLM_DIR = path.join(PUBLIC_DIR, 'llm');

const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), '');
const projectId = process.env.VITE_SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || env.VITE_SANITY_API_VERSION || '2024-01-01';

// ── Static Page Markdowns ─────────────────────────────────────────────────────
// These are hand-written summaries — accurate, factual, LLM-optimised.
// No marketing fluff. Updated manually when page content changes significantly.

const STATIC_PAGES = {
  'home.md': `# TesseractApps

> TesseractApps is an Australian SaaS company providing all-in-one workforce management and compliance software purpose-built for NDIS providers, aged care, allied health, and disability support organisations.

## Quick Facts

- **Company:** TesseractApps
- **Type:** B2B SaaS — care sector workforce management
- **Market:** Australia (NDIS, aged care, allied health)
- **Infrastructure:** Salesforce Hyperforce (Australian data hosting)
- **Certifications:** ISO 27001 (Information Security), ISO 9001 (Quality Management)
- **Award:** 2025 Canberra Local Business Award Winner
- **Headquarters:** Level 1/45 Colbee Ct, Phillip ACT 2606, Australia
- **Website:** https://tesseractapps.com.au

## Value Proposition

Replace manual spreadsheets and disconnected tools with a single integrated platform. TesseractApps automates rostering, timesheets, payroll, participant management, and NDIS compliance — reducing administrative burden so providers can focus on care delivery.

## Key Features

- Smart Rostering & Scheduling (SCHADS-compliant, SIL-aware)
- NDIS Compliance Automation & Audit Readiness
- Time & Attendance — GPS-verified Clock In/Out
- Participant Management — care plans, goals, progress notes
- Incident Management — mobile logging, escalation, CAPA
- HR Operations — onboarding, credentials, expiry alerts
- T-Sign — electronic signatures for service agreements
- T Learning Hub — compliance training linked to credentials
- Digital Forms & Case Notes
- NDIS Claiming & Invoicing — PACE-aligned, 3-layer reconciliation
- Accounting & Payroll Alignment — Xero integration, SCHADS Award

## Target Audience

- NDIS Providers (registered and unregistered)
- Aged Care Services
- Allied Health Professionals
- Disability Support Services
- Supported Independent Living (SIL) Providers
- Home & Community Care Providers
`,

  'about.md': `# About TesseractApps

TesseractApps is an Australian B2B SaaS company helping care providers modernise their operations. Founded in 2022, the platform is built on Salesforce infrastructure and holds ISO 27001 and ISO 9001 certifications.

## Mission

To simplify NDIS compliance and care management so providers can focus on delivering quality care rather than managing administrative burden.

## Certifications & Awards

- ISO 27001 (Information Security Management)
- ISO 9001 (Quality Management System)
- 2025 Canberra Local Business Award Winner

## Target Audience

- NDIS Providers
- Aged Care Services
- Allied Health Professionals
- Disability Support Services
- Home & Community Care Providers

## Headquarters

Level 1/45 Colbee Ct, Phillip ACT 2606, Australia

## Contact

Website: https://tesseractapps.com.au
Email: hello@tesseractapps.com.au
`,

  'product.md': `# Tesseract Care Management Software

Tesseract Care Management Software is an all-in-one platform built specifically for NDIS and care providers. Built on Salesforce infrastructure for enterprise-grade reliability.

## Product Features

- **Roster Management**: Intelligent rostering and scheduling solutions for shift planning and worker allocation
- **Timesheets**: Time tracking and attendance management with payroll alignment
- **Admin Console**: Centralised administrative control panel for operations management
- **Access Control Panel**: Role-based access and permissions management
- **HR Operations**: Human resources management, onboarding, and compliance tools
- **T-Sign**: Electronic signature and document signing for contracts and agreements
- **Clock In & Clock Out**: Staff attendance and time tracking system with geolocation
- **Participant Management**: NDIS participant care, service agreements, and coordination
- **Incident Management**: Incident reporting, tracking, and compliance documentation
- **Forms**: Digital forms and data collection for care notes and assessments
- **Accounting**: Financial management, NDIS billing, and payroll integration
- **T Learning Hub**: Training and professional development platform (LMS)

## Technical Architecture

Built on Salesforce Hyperforce infrastructure. Available on Web, iOS, and Android. Australian data hosting.
`,

  'pricing.md': `# TesseractApps Pricing

TesseractApps offers tiered pricing based on provider maturity stage and team size. All plans are in AUD and designed for Australian care providers.

## Pricing Tiers

### Start (Founding Window)
- **Staff Range**: 1–15 staff
- **Best For**: Early-stage or founder-led providers establishing operations
- **Commercial**: Setup fee only, no subscription during Start phase (up to 18 months)
- **Includes**: Participant onboarding, rostering, case notes, incident logging, timesheets, payroll, invoicing, structured document storage, guided onboarding

### Growth
- **Staff Range**: 15–50 staff
- **Best For**: Scaling providers with established operations needing automation
- **Commercial**: Setup fee + per-seat subscription (AUD)
- **Includes**: Everything in Start, plus advanced rostering automation, compliance dashboards, performance reporting

### Scale
- **Staff Range**: 50–200+ staff
- **Best For**: Established mid-size providers with complex operational needs
- **Commercial**: Setup fee + per-seat subscription (AUD)
- **Includes**: Everything in Growth, plus multi-location management, advanced analytics, API integrations

### Enterprise
- **Staff Range**: 200+ staff / multi-site
- **Best For**: Large organisations with enterprise compliance and customisation requirements
- **Commercial**: Custom pricing, volume discounts
- **Includes**: Everything in Scale, plus custom integrations, dedicated account management, SLA support

For current pricing, visit: https://tesseractapps.com.au/pricing
`,

  'platform.md': `# TesseractApps Platform

The TesseractApps platform is an enterprise-grade care management solution built on Salesforce Hyperforce infrastructure, specifically designed for NDIS and care sector compliance requirements.

## Architecture

- **Infrastructure**: Salesforce Hyperforce (Australian data residency)
- **Availability**: Web browser, iOS app, Android app
- **Security**: ISO 27001 certified, enterprise-grade access controls
- **Quality**: ISO 9001 certified processes

## Key Platform Capabilities

- Role-based access control (RBAC) with granular permissions
- Real-time data synchronisation across devices
- Offline-capable mobile apps for field staff
- NDIS Price Guide compliance built-in
- Automated compliance reporting
- API-first architecture for integrations
- Audit trails and activity logging
- Multi-location and multi-provider support

## Integrations

Connects with Australian payroll providers, NDIS portals, accounting systems, and HR platforms. Custom API integrations available on Scale and Enterprise tiers.

## Security & Compliance

- ISO 27001 Information Security Management
- Data hosted in Australia (Salesforce Hyperforce)
- NDIS Quality and Safeguards Commission aligned
- Regular penetration testing and security audits
`,

  'careers.md': `# Careers at TesseractApps

TesseractApps is an Australian SaaS company based in Canberra, ACT, building workforce management software for the NDIS and care sector. We hire technologists, product specialists, and sector experts.

## Culture

Small, focused team building enterprise-grade technology for a sector that matters. We value domain expertise in NDIS/care alongside technical skill.

## Roles We Hire For

- Software Engineers (full-stack, backend, mobile)
- Product Designers
- Implementation Consultants
- Customer Success Managers
- Sales / Business Development

## How to Apply

Visit the Careers page for open roles: https://tesseractapps.com.au/careers
Email: hello@tesseractapps.com.au

## Location

Level 1/45 Colbee Ct, Phillip ACT 2606, Australia. Hybrid and remote arrangements considered for experienced candidates.
`,

  'contact.md': `# Contact TesseractApps

## Contact Information

- **Website**: https://tesseractapps.com.au
- **Email**: hello@tesseractapps.com.au
- **Location**: Level 1/45 Colbee Ct, Phillip ACT 2606, Australia

## Contact Options

- **Book a Demo**: https://tesseractapps.com.au/book-a-demo — 30-minute live platform demo, configured for your care type and team size
- **Start Free**: https://tesseractapps.com.au/signup — begin provider setup process
- **Contact Form**: https://tesseractapps.com.au/contact-us — general inquiries and support

## Business Hours

Monday to Friday, 9:00 AM – 5:00 PM AEST

## Support

Existing customers should use the in-platform support portal or contact their account manager directly.
`,

  'help-centre.md': `# TesseractApps Help Centre

Frequently asked questions and support documentation for TesseractApps users and prospective customers.

## Common Questions

**What is TesseractApps?**
An all-in-one workforce management and NDIS compliance platform for care providers in Australia.

**Who is it for?**
NDIS providers, aged care services, allied health professionals, disability support services, and home & community care organisations.

**Is TesseractApps NDIS compliant?**
Yes. The platform is built to align with NDIS Quality and Safeguards Commission requirements, including incident reporting, participant management, and service agreement documentation.

**What devices are supported?**
Web browser, iOS, and Android. Field staff can use the mobile apps for clock-in/out, case notes, and incident reporting.

**Is Australian data hosting available?**
Yes. Data is hosted in Australia via Salesforce Hyperforce infrastructure.

**How do I get started?**
Book a demo at https://tesseractapps.com.au/book-a-demo or start the onboarding process at https://tesseractapps.com.au/signup

## Support Contact

Email: hello@tesseractapps.com.au
Website: https://tesseractapps.com.au/help-centre
`,

  'glossary.md': `# NDIS Glossary — Key Terms

Key terminology for the National Disability Insurance Scheme (NDIS) and care sector in Australia.

## Core NDIS Terms

- **NDIS**: National Disability Insurance Scheme — Australian government scheme providing funding for people with permanent and significant disabilities
- **NDIA**: National Disability Insurance Agency — the government body that administers the NDIS
- **Participant**: A person who is eligible for and receives NDIS funding
- **Support Coordinator**: An NDIS-funded professional who helps participants implement their NDIS plan
- **Plan Manager**: Manages the financial aspects of a participant's NDIS plan (paying invoices, tracking budget)
- **Service Provider**: Organisation or individual registered with the NDIS to deliver supports and services
- **Service Agreement**: A contract between a participant and a provider outlining supports to be delivered
- **NDIS Price Guide**: Document published by NDIA setting maximum prices for NDIS-funded supports
- **Incident Report**: Formal documentation of an unexpected event that affects a participant's safety or wellbeing
- **Case Notes**: Records of support delivery, observations, and participant progress

## Provider Operations Terms

- **Rostering**: Scheduling of staff shifts and participant service appointments
- **Timesheet**: Record of hours worked by staff for payroll and compliance purposes
- **SIL**: Supported Independent Living — funded accommodation support for participants
- **ILO**: Individualised Living Options — flexible living arrangements for NDIS participants
- **SDA**: Specialist Disability Accommodation — housing designed for people with significant functional impairment

For the full NDIS glossary, visit: https://tesseractapps.com.au/ndis-glossary
`,

  'privacy.md': `# TesseractApps Privacy Policy Summary

TesseractApps collects and processes personal information in accordance with Australian privacy law (Privacy Act 1988) and the Australian Privacy Principles (APPs).

## Data We Collect

- Contact and account information (name, email, organisation)
- Platform usage data (session activity, feature usage)
- Support and communication records

## How We Use Data

- Providing and improving the TesseractApps platform
- Customer support and account management
- Compliance and security monitoring

## Data Storage

All data is stored in Australia via Salesforce Hyperforce infrastructure. TesseractApps holds ISO 27001 certification for information security management.

## Your Rights

Under Australian privacy law, you have the right to access, correct, or request deletion of your personal information.

## Contact

For privacy inquiries: hello@tesseractapps.com.au

Full policy: https://tesseractapps.com.au/privacy-policy
`,
};

// ── Sanity Client ─────────────────────────────────────────────────────────────

function getSanityClient() {
  if (!projectId) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false });
}

// ── Sanity Fetchers ───────────────────────────────────────────────────────────

async function fetchBlogPosts(client) {
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && status == "published"]
      | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt, _updatedAt, readingTime, featured, tags,
        "author": author->{ name, linkedInUrl },
        category->{ title },
        body,
        seo { metaTitle, metaDescription, primaryKeyword, secondaryKeywords, lsiKeywords }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${posts.length} blog posts`);
    return posts;
  } catch (err) {
    console.warn('[gen-llms-docs] Blog post fetch failed:', err.message);
    return [];
  }
}

async function fetchCapabilityPages(client) {
  try {
    const pages = await client.fetch(`
      *[_type == "capabilityPage"] | order(navGroup asc, order asc) {
        _id, title, slug, navGroup, heroHeading, heroSubtitle,
        problemStatement, whatMattersMost, howWeSolveThis, whatYouGet, isThisRightForYou,
        seo { metaTitle, metaDescription, primaryKeyword }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${pages.length} capability pages`);
    return pages;
  } catch (err) {
    console.warn('[gen-llms-docs] Capability page fetch failed:', err.message);
    return [];
  }
}

async function fetchSolutionPages(client) {
  try {
    const pages = await client.fetch(`
      *[_type == "solutionPage"] | order(navCategory asc, order asc) {
        _id, title, slug, navCategory, heroHeading, heroSubtitle,
        whoIsThisFor, keyBenefits, howWeSupport, whatYouGet, isThisRightForYou,
        seo { metaTitle, metaDescription, primaryKeyword }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${pages.length} solution pages`);
    return pages;
  } catch (err) {
    console.warn('[gen-llms-docs] Solution page fetch failed:', err.message);
    return [];
  }
}

async function fetchCompetitorPages(client) {
  try {
    const pages = await client.fetch(`
      *[_type == "competitorPage"] | order(order asc) {
        _id, title, slug, competitorName, heroHeading, heroSubtitle,
        aboutHeading, aboutBody, aboutTrustBadges, awardBadges[]{ label, sub },
        comparisonCategories[]{ title, rows[]{ feature, us, them } },
        switchSteps[]{ title, body }, rightChoiceHeading, rightChoiceItems,
        ctaHeading, ctaDescription,
        seo { metaTitle, metaDescription }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${pages.length} competitor pages`);
    return pages;
  } catch (err) {
    console.warn('[gen-llms-docs] Competitor page fetch failed:', err.message);
    return [];
  }
}

async function fetchTeamMembers(client) {
  try {
    const members = await client.fetch(`
      *[_type == "human"] | order(order asc) {
        _id, name, slug, role, department, bio,
        linkedInUrl, twitterHandle, githubHandle, websiteUrl,
        showInTeam, isBlogAuthor
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${members.length} team members`);
    return members;
  } catch (err) {
    console.warn('[gen-llms-docs] Team member fetch failed:', err.message);
    return [];
  }
}

async function fetchGuides(client) {
  try {
    const guides = await client.fetch(`
      *[_type == "guide" && status == "published"]
      | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt, topic, audience, featured, tags, status,
        body,
        "coverImage": coverImage{ alt, "asset": asset->{ url } },
        seo { metaTitle, metaDescription, primaryKeyword }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${guides.length} guides`);
    return guides;
  } catch (err) {
    console.warn('[gen-llms-docs] Guide fetch failed:', err.message);
    return [];
  }
}

async function fetchWhitepapers(client) {
  try {
    const whitepapers = await client.fetch(`
      *[_type == "whitepaper" && status != "coming_soon"]
      | order(publishedAt desc) {
        _id, title, slug, excerpt, abstract, publishedAt, audience, status,
        "authors": authors[]->{ _id, name, slug },
        seo { metaTitle, metaDescription, primaryKeyword }
      }
    `);
    console.log(`[gen-llms-docs] Fetched ${whitepapers.length} whitepapers`);
    return whitepapers;
  } catch (err) {
    console.warn('[gen-llms-docs] Whitepaper fetch failed:', err.message);
    return [];
  }
}

// ── humans.md builder ─────────────────────────────────────────────────────────

function buildHumansMd(members) {
  if (members.length === 0) return null;

  const byDept = {};
  for (const m of members) {
    const dept = m.department ?? 'Team';
    if (!byDept[dept]) byDept[dept] = [];
    byDept[dept].push(m);
  }

  // Leadership always first, then alphabetical by department name
  const deptOrder = ['Leadership', ...Object.keys(byDept).filter(d => d !== 'Leadership').sort()];

  const sections = deptOrder
    .filter(d => byDept[d])
    .map(dept => {
      const entries = byDept[dept].map(m => {
        const lines = [`### ${m.name}`];
        if (m.role) lines.push(`**${m.role}**`);
        if (m.bio) lines.push(m.bio.trim());

        const links = [];
        if (m.linkedInUrl) links.push(`[LinkedIn](${m.linkedInUrl})`);
        if (m.twitterHandle) links.push(`[X/@${m.twitterHandle}](https://x.com/${m.twitterHandle})`);
        if (m.githubHandle) links.push(`[GitHub/@${m.githubHandle}](https://github.com/${m.githubHandle})`);
        if (m.websiteUrl) links.push(`[Website](${m.websiteUrl})`);
        if (links.length > 0) lines.push(links.join(' · '));

        return lines.join('\n\n');
      });

      return `## ${dept}\n\n${entries.join('\n\n---\n\n')}`;
    });

  return [
    '# TesseractApps — Team',
    '',
    '> The people building TesseractApps — NDIS workforce management software for Australian care providers.',
    '',
    sections.join('\n\n'),
  ].join('\n');
}

// ── File Helpers ──────────────────────────────────────────────────────────────

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  // Normalise any garbled multi-byte sequences back to proper UTF-8 characters
  const clean = content
    .replace(/â€"/g, '—')
    .replace(/â€˜/g, '‘')
    .replace(/â€™/g, '’')
    .replace(/â€œ/g, '“')
    .replace(/â€/g, '”')
    .replace(/Â·/g, '·')
    .replace(/Â\s/g, ' ');
  fs.writeFileSync(filePath, clean, 'utf8');
  console.log(`[gen-llms-docs] Written: ${path.relative(process.cwd(), filePath)}`);
}

// ── Index file builders ───────────────────────────────────────────────────────
// Flat link lists — one per content type — so agents can discover all items
// without downloading the full context file.

function buildBlogIndex(posts) {
  const lines = posts.map(p => {
    const slug = p.slug?.current ?? p.slug;
    const title = p.title ?? slug;
    const date = p.publishedAt ? p.publishedAt.slice(0, 10) : '';
    const category = p.category?.title ?? '';
    const meta = [date, category].filter(Boolean).join(' · ');
    return `- [${title}](${SITE_URL}/llm/blog/${slug}.md)${meta ? `: ${meta}` : ''}`;
  });

  return [
    '# TesseractApps — Blog Index',
    '',
    '> All published blog posts. Each link points to a markdown version of the full article.',
    '',
    lines.join('\n'),
  ].join('\n');
}

function buildCapabilitiesIndex(pages) {
  const byGroup = {};
  for (const p of pages) {
    const group = p.navGroup ?? 'Other';
    if (!byGroup[group]) byGroup[group] = [];
    byGroup[group].push(p);
  }

  const sections = Object.entries(byGroup).map(([group, items]) => {
    const links = items.map(p =>
      `- [${p.title}](${SITE_URL}/llm/capabilities/${p.slug.current}.md)`
    ).join('\n');
    return `## ${group}\n\n${links}`;
  });

  return [
    '# TesseractApps — Capabilities Index',
    '',
    '> All product capabilities grouped by area. Each link points to a full capability markdown page.',
    '',
    sections.join('\n\n'),
  ].join('\n');
}

function buildSolutionsIndex(pages) {
  const byCategory = {};
  for (const p of pages) {
    const cat = p.navCategory ?? 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(p);
  }

  const sections = Object.entries(byCategory).map(([cat, items]) => {
    const links = items.map(p =>
      `- [${p.title}](${SITE_URL}/llm/solutions/${p.slug.current}.md)`
    ).join('\n');
    return `## ${cat}\n\n${links}`;
  });

  return [
    '# TesseractApps — Solutions Index',
    '',
    '> All solution pages grouped by category. Each link points to a full solution markdown page.',
    '',
    sections.join('\n\n'),
  ].join('\n');
}

function buildCompetitorsIndex(pages) {
  const links = pages.map(p =>
    `- [${p.title ?? `TesseractApps vs ${p.competitorName}`}](${SITE_URL}/llm/competitors/${p.slug.current}.md)`
  ).join('\n');

  return [
    '# TesseractApps — Competitor Comparisons Index',
    '',
    '> Feature comparison pages between TesseractApps and other NDIS software providers.',
    '',
    links,
  ].join('\n');
}

function buildGuidesIndex(guides) {
  const lines = guides.map(g => {
    const slug = g.slug?.current ?? g.slug;
    const title = g.title ?? slug;
    const topic = g.topic ? ` · ${g.topic}` : '';
    return `- [${title}](${SITE_URL}/llm/guides/${slug}.md)${topic}`;
  });

  return [
    '# TesseractApps — Guides Index',
    '',
    '> Free downloadable guides, checklists, and toolkits for NDIS providers, support coordinators, and care leaders.',
    '',
    lines.join('\n'),
  ].join('\n');
}

function buildWhitepapersIndex(whitepapers) {
  const lines = whitepapers.map(wp => {
    const slug = wp.slug?.current ?? wp.slug;
    const title = wp.title ?? slug;
    const date = wp.publishedAt ? wp.publishedAt.slice(0, 10) : '';
    const meta = date ? `: ${date}` : '';
    return `- [${title}](${SITE_URL}/llm/whitepapers/${slug}.md)${meta}`;
  });

  return [
    '# TesseractApps — Whitepapers Index',
    '',
    '> Research and decision guides on NDIS digital transformation, workforce management, and care sector innovation.',
    '',
    lines.join('\n'),
  ].join('\n');
}

// ── llms.txt — spec-compliant navigation index ────────────────────────────────
// Format per https://llmstxt.org/:
//   H1  — site name (required)
//   blockquote — one-sentence summary (recommended)
//   H2 sections — file lists with optional brief notes
//   ## Optional — links that can be skipped in short-context scenarios

function buildLlmsTxt(blogPosts, capabilityPages, solutionPages, competitorPages, guides, whitepapers, hasTeam = false) {
  const hasBlog = blogPosts.length > 0;
  const hasCaps = capabilityPages.length > 0;
  const hasSols = solutionPages.length > 0;
  const hasComps = competitorPages.length > 0;
  const hasGuides = guides.length > 0;
  const hasWPs = whitepapers.length > 0;

  return `# TesseractApps

> All-in-one workforce management and NDIS compliance software for Australian care providers — rostering, timesheets, participant management, incident reporting, and claiming in one platform.

## Company

- [Home](${SITE_URL}/llm/home.md): Overview, value proposition, key features, and target audience
- [About](${SITE_URL}/llm/about.md): Company background, certifications, and team
- [Platform](${SITE_URL}/llm/platform.md): Technical architecture, Salesforce Hyperforce infrastructure, security
- [Pricing](${SITE_URL}/llm/pricing.md): Start, Growth, Scale, and Enterprise tiers with commercial terms
- [NDIS Glossary](${SITE_URL}/llm/glossary.md): Key NDIS and care sector terminology explained
${hasTeam ? `- [Team](${SITE_URL}/llm/humans.md): Everyone at TesseractApps — names, roles, departments, and social links` : ''}

## Product

- [Product Overview](${SITE_URL}/llm/product.md): All platform modules and features
${hasCaps ? `- [Capabilities Index](${SITE_URL}/llm/capabilities-index.md): All product capabilities grouped by area` : ''}
${hasSols ? `- [Solutions Index](${SITE_URL}/llm/solutions-index.md): Solutions by care type, role, and provider stage` : ''}

## Blog

${hasBlog
  ? `- [Blog Index](${SITE_URL}/llm/blog-index.md): All published articles on NDIS compliance, workforce management, and operations`
  : `- [Blog](${SITE_URL}/blogs): NDIS industry insights and guides`}

## Resources

${hasGuides ? `- [Guides Index](${SITE_URL}/llm/guides-index.md): Free downloadable guides and checklists for NDIS providers` : ''}
${hasWPs ? `- [Whitepapers Index](${SITE_URL}/llm/whitepapers-index.md): Research and decision guides on NDIS digital transformation and workforce management` : ''}

## Comparisons
${hasComps
  ? `\n- [Competitor Comparisons Index](${SITE_URL}/llm/competitors-index.md): Feature comparisons between TesseractApps and other NDIS software providers`
  : '\n- Comparison pages available at https://tesseractapps.com.au'}

## Full Context

- [llms-full.txt](${SITE_URL}/llms-full.txt): Everything concatenated — static pages, all blog posts, capabilities, solutions, guides, whitepapers, and comparisons

## Optional

- [Help Centre](${SITE_URL}/llm/help-centre.md): FAQ and support documentation
- [Careers](${SITE_URL}/llm/careers.md): Open roles and company culture
- [Contact](${SITE_URL}/llm/contact.md): Contact details, demo booking, and support hours
- [Release Notes](${SITE_URL}/changelog): Product updates
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  ensureDir(LLM_DIR);
  ensureDir(path.join(LLM_DIR, 'blog'));
  ensureDir(path.join(LLM_DIR, 'capabilities'));
  ensureDir(path.join(LLM_DIR, 'solutions'));
  ensureDir(path.join(LLM_DIR, 'competitors'));
  ensureDir(path.join(LLM_DIR, 'guides'));
  ensureDir(path.join(LLM_DIR, 'whitepapers'));

  // ── 1. Write static page markdowns ─────────────────────────────────────────
  for (const [filename, content] of Object.entries(STATIC_PAGES)) {
    writeFile(path.join(LLM_DIR, filename), content);
  }

  // ── 2. Fetch CMS content ────────────────────────────────────────────────────
  const client = getSanityClient();

  let blogPosts = [];
  let capabilityPages = [];
  let solutionPages = [];
  let competitorPages = [];
  let teamMembers = [];
  let guides = [];
  let whitepapers = [];

  if (!client) {
    console.warn('[gen-llms-docs] VITE_SANITY_PROJECT_ID not set — skipping CMS content generation');
  } else {
    [blogPosts, capabilityPages, solutionPages, competitorPages, teamMembers, guides, whitepapers] = await Promise.all([
      fetchBlogPosts(client),
      fetchCapabilityPages(client),
      fetchSolutionPages(client),
      fetchCompetitorPages(client),
      fetchTeamMembers(client),
      fetchGuides(client),
      fetchWhitepapers(client),
    ]);
  }

  // ── 3. Generate CMS markdown files (and cache for reuse in full context) ──────
  // Maps of slug → markdown string, used in the full context aggregation below.
  const blogMd = new Map();
  const capsMd = new Map();
  const solsMd = new Map();
  const compsMd = new Map();
  const guidesMd = new Map();
  const wpsMd = new Map();

  function convertAndWrite(items, converter, dir, cache, label) {
    for (const item of items) {
      const slug = item.slug?.current;
      if (!slug) { console.warn(`[gen-llms-docs] ${label} missing slug, skipping _id:`, item._id); continue; }
      try {
        const md = converter(item);
        cache.set(slug, md);
        writeFile(path.join(LLM_DIR, dir, `${slug}.md`), md);
      } catch (err) {
        console.warn(`[gen-llms-docs] Failed to convert ${label} "${slug}":`, err.message);
      }
    }
  }

  convertAndWrite(blogPosts, blogPostToMarkdown, 'blog', blogMd, 'Blog post');
  convertAndWrite(capabilityPages, capabilityToMarkdown, 'capabilities', capsMd, 'Capability');
  convertAndWrite(solutionPages, solutionToMarkdown, 'solutions', solsMd, 'Solution');
  convertAndWrite(competitorPages, competitorToMarkdown, 'competitors', compsMd, 'Competitor');
  convertAndWrite(guides, guideToMarkdown, 'guides', guidesMd, 'Guide');
  convertAndWrite(whitepapers, whitepaperToMarkdown, 'whitepapers', wpsMd, 'Whitepaper');

  // ── 4. Generate section index files ────────────────────────────────────────
  if (blogPosts.length > 0) {
    writeFile(path.join(LLM_DIR, 'blog-index.md'), buildBlogIndex(blogPosts));
  }
  if (capabilityPages.length > 0) {
    writeFile(path.join(LLM_DIR, 'capabilities-index.md'), buildCapabilitiesIndex(capabilityPages));
  }
  if (solutionPages.length > 0) {
    writeFile(path.join(LLM_DIR, 'solutions-index.md'), buildSolutionsIndex(solutionPages));
  }
  if (competitorPages.length > 0) {
    writeFile(path.join(LLM_DIR, 'competitors-index.md'), buildCompetitorsIndex(competitorPages));
  }
  if (guides.length > 0) {
    writeFile(path.join(LLM_DIR, 'guides-index.md'), buildGuidesIndex(guides));
  }
  if (whitepapers.length > 0) {
    writeFile(path.join(LLM_DIR, 'whitepapers-index.md'), buildWhitepapersIndex(whitepapers));
  }

  // ── 5. Generate humans.md ───────────────────────────────────────────────────
  let humansMd = null;
  if (teamMembers.length > 0) {
    humansMd = buildHumansMd(teamMembers);
    writeFile(path.join(LLM_DIR, 'humans.md'), humansMd);
  }

  // ── 6. Build llms.txt — spec-compliant navigation index ────────────────────
  const llmsTxt = buildLlmsTxt(blogPosts, capabilityPages, solutionPages, competitorPages, guides, whitepapers, teamMembers.length > 0);
  writeFile(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt);

  // ── 6. Build llms-full.txt (everything: static + CMS) ─────────────────────
  // Reuses cached markdown from step 3 — no re-conversion needed.
  let fullContext = '';

  for (const [filename, content] of Object.entries(STATIC_PAGES)) {
    fullContext += `\n\n--- Start of ${filename} ---\n\n`;
    fullContext += content.trim();
    fullContext += `\n\n--- End of ${filename} ---\n\n`;
  }

  function appendSection(cache, prefix) {
    for (const [slug, md] of cache.entries()) {
      fullContext += `\n\n--- Start of ${prefix}/${slug}.md ---\n\n`;
      fullContext += md;
      fullContext += `\n\n--- End of ${prefix}/${slug}.md ---\n\n`;
    }
  }

  appendSection(blogMd, 'blog');
  appendSection(capsMd, 'capabilities');
  appendSection(solsMd, 'solutions');
  appendSection(compsMd, 'competitors');
  appendSection(guidesMd, 'guides');
  appendSection(wpsMd, 'whitepapers');

  if (humansMd) {
    fullContext += `\n\n--- Start of humans.md ---\n\n`;
    fullContext += humansMd;
    fullContext += `\n\n--- End of humans.md ---\n\n`;
  }

  writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), fullContext.trim());

  console.log('[gen-llms-docs] Done.');
}

main().catch(err => {
  console.error('[gen-llms-docs] Fatal error:', err);
  process.exit(1);
});
