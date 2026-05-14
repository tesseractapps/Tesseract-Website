# TesseractApps — SEO Audit, Strategy & 3-Month Growth Plan

> **Goal:** Rank #1 on Google Australia for NDIS-related searches. Demonstrable traffic improvement within 3 months. Sustained organic growth beyond.
>
> **Contract timeline:** 3 months. Must show measurable progress by end of Month 3.
>
> **Site:** [tesseractapps.com.au](https://tesseractapps.com.au) — Vite React SPA, Sanity CMS, Vercel deployment

---

## Table of Contents

1. [Current SEO State — Full Audit](#1-current-seo-state--full-audit)
2. [Target Keywords](#2-target-keywords)
3. [What We Are Doing Well](#3-what-we-are-doing-well)
4. [What We Are Missing](#4-what-we-are-missing)
5. [Implementation Plan by Phase](#5-implementation-plan-by-phase)
6. [3-Month Timeline & Expected Traffic Impact](#6-3-month-timeline--expected-traffic-impact)
7. [Non-Code Actions (Off-Page)](#7-non-code-actions-off-page)
8. [Monitoring Setup](#8-monitoring-setup)
9. [Summary Checklist](#9-summary-checklist)

---

## 1. Current SEO State — Full Audit

### Site Overview

| Property | Detail |
|----------|--------|
| **Type** | B2B SaaS — Workforce Management for NDIS Providers |
| **Stack** | Vite 6 + React 19 + TypeScript (SPA, no SSR) |
| **CMS** | Sanity v3 (embedded at /studio) |
| **Hosting** | Vercel (all routes → /index.html rewrite) |
| **Domain** | tesseractapps.com.au |
| **Location** | Phillip, ACT 2606, Australia |
| **Award** | 2025 Canberra Local Business Award Winner |

### Overall SEO Health Score

| Category | Score | Status |
|----------|-------|--------|
| Technical Foundation | 85/100 | ✅ Strong |
| Structured Data / Schema | 45/100 | ⚠️ Critical Gap |
| On-Page Content & Keywords | 60/100 | ⚠️ Needs Work |
| Internal Linking | 50/100 | ⚠️ Needs Work |
| Sitemap & Crawlability | 75/100 | ⚠️ Partial |
| Off-Page Authority | 20/100 | ❌ Major Gap |
| Blog Content Volume | 30/100 | ❌ Major Gap |
| Local SEO | 30/100 | ❌ Major Gap |

---

## 2. Target Keywords

### Primary Targets (High Volume, High Commercial Intent)

| Keyword | Est. Monthly Searches (AU) | Current Position | Target |
|---------|--------------------------|-----------------|--------|
| NDIS software | 1,000–2,000 | Unranked | #1–3 |
| NDIS provider software | 500–1,000 | Unranked | #1–3 |
| NDIS workforce management | 200–500 | Unranked | #1–3 |
| NDIS rostering software | 300–600 | Unranked | #1–3 |
| NDIS compliance software | 200–400 | Unranked | #1–3 |
| NDIS participant management software | 100–300 | Unranked | #1–3 |
| disability support worker scheduling software | 100–200 | Unranked | #1–3 |
| care management software Australia | 200–500 | Unranked | #3–5 |

### Secondary / Long-Tail Targets (Lower Volume, Easier to Rank)

| Keyword | Est. Monthly Searches (AU) | Notes |
|---------|--------------------------|-------|
| NDIS software Australia | 100–200 | Geo-modified — quick win |
| best NDIS software | 100–200 | Comparison intent |
| NDIS provider management system | 50–150 | High conversion intent |
| NDIS shift scheduling app | 50–100 | Mobile/app intent |
| TesseractApps vs ShiftCare | 50–100 | Competitor intent |
| TesseractApps vs HireUp | 50–100 | Competitor intent |
| NDIS timesheet software | 100–200 | Feature-specific |
| NDIS HR management software | 100–200 | Feature-specific |
| NDIS incident management software | 50–100 | Feature-specific |
| NDIS plan management software | 100–300 | Adjacent — high value |

### Branded Targets (Should Already Rank)

| Keyword | Expected Position |
|---------|-----------------|
| TesseractApps | #1 |
| Tesseract workforce management | #1 |
| TesseractApps NDIS | #1–2 |

---

## 3. What We Are Doing Well

> These are strengths already in place. Do not break these while making changes.

| Feature | Status | Detail |
|---------|--------|--------|
| **Custom SEO Component** | ✅ Done | `src/components/common/SEO.tsx` — handles OG, Twitter, JSON-LD, canonical, robots meta |
| **Auto-Generated Sitemap** | ✅ Done | `scripts/generate-sitemap.js` runs at build — fetches blog posts from Sanity |
| **robots.txt** | ✅ Done | Well-structured; blocks admin/api routes; allows AI bots (GPTBot, ClaudeBot, Perplexity, etc.) |
| **196-Route Meta Map** | ✅ Done | `src/data/metaTagsConfig.ts` — every route has a title and description |
| **RSS Feed** | ✅ Done | `public/rss.xml` auto-generated at build with blog post entries |
| **Google Tag Manager** | ✅ Done | GTM-TXGJDB6N; deferred load (fires on interaction or 4s idle — no impact on LCP) |
| **Google Site Verification** | ✅ Done | Meta tag in index.html |
| **Route-Based Lazy Loading** | ✅ Done | All pages except home are React.lazy() — reduces initial bundle size |
| **Gzip + Brotli Compression** | ✅ Done | Vite plugins compress all assets at build time |
| **Async CSS Loading** | ✅ Done | Custom Vite plugin prevents render-blocking CSS — improves LCP |
| **Sanity SEO Schema** | ✅ Done | Per-page metaTitle, metaDescription, OG tags, canonicalUrl, keywords, JSON-LD field |
| **LQIP Image Placeholders** | ✅ Done | `SanityImage` component with Low Quality Image Placeholder — prevents CLS |
| **www → non-www Redirect** | ✅ Done | `vercel.json` permanent redirect — canonical consolidation |
| **Organization Schema** | ✅ Partial | In index.html but missing address, phone, social links, areaServed |
| **BlogPosting Schema** | ✅ Done | Auto-generated for every Sanity blog post in `BlogPostPage.tsx` |
| **AI Bot Allowlisting** | ✅ Done | 15+ AI crawlers explicitly allowed in robots.txt — future-proofing for GEO |
| **Open Graph Tags** | ✅ Done | Full OG set including og:image with width/height |
| **Twitter Card Tags** | ✅ Done | summary_large_image configured |
| **Critical CSS Inlined** | ✅ Done | Above-the-fold styles inlined in index.html — fast first paint |
| **Competitor Pages (CMS)** | ✅ Done | `/tesseract-vs/:slug` route + Sanity schema built and ready |
| **Whitepapers Page** | ✅ Done | `/whitepapers` route + CMS-managed content |
| **Case Studies Page** | ✅ Done | `/case-studies` route exists |

---

## 4. What We Are Missing

### 4A. Critical Gaps (Fix First — High Impact, Low Effort)

| Gap | Impact | Effort | File(s) to Fix |
|-----|--------|--------|---------------|
| **No `dateModified` in BlogPosting schema** | High | 1h | `src/sanity/lib/queries.ts`, `src/pages/blogPost/BlogPostPage.tsx` |
| **Organization schema incomplete** — no address, phone, social links, areaServed | High | 30min | `index.html` |
| **No canonical tag in static HTML shell** — only injected by React after JS runs | High | 15min | `index.html` |
| **No FAQ JSON-LD schema** — `faqData.ts` has 100+ Q&As but none are schema-marked | High | 2h | `src/pages/resources/faq/FAQ.tsx` |
| **FAQ page renders no content** — `faqData.ts` exists but questions are not displayed | High | 2h | `src/pages/resources/faq/FAQ.tsx` |
| **No breadcrumb JSON-LD** on capability, solution, blog, or competitor pages | High | 3h | `CapabilityPage.tsx`, `SolutionPage.tsx`, `BlogPostPage.tsx`, `CompetitorPage.tsx` |
| **No SoftwareApplication schema** on capability pages | High | 1h | `src/pages/capabilities/CapabilityPage.tsx` |
| **No canonical URL prop** on capability and solution pages | High | 30min | `CapabilityPage.tsx`, `SolutionPage.tsx` |
| **Sitemap missing CMS page types** — capabilities, solutions, competitor pages from Sanity not included | High | 3h | `scripts/generate-sitemap.js` |
| **No hreflang tags** — site targets Australia but no `en-au` signal | Medium | 15min | `index.html` |
| **Publish date not displayed** in blog posts — date block is commented out | Medium | 30min | `src/pages/blogPost/BlogPostPage.tsx` |

### 4B. On-Page Content Gaps (Medium Impact)

| Gap | Impact | Effort | Notes |
|-----|--------|--------|-------|
| **Title tags not NDIS-keyword rich** — current titles are generic ("Roster Management – TesseractApps") | High | 4h | Update `metaTagsConfig.ts` for 10 key pages |
| **Meta descriptions don't follow CTR-optimised pattern** | High | 4h | Update `metaTagsConfig.ts` |
| **No question-based H2 headings** for featured snippet capture | High | 3h | Update page content in Sanity/JSX |
| **No LocalBusiness schema** (company at Phillip ACT 2606) | Medium | 1h | `index.html` |
| **No AggregateRating/Review schema** despite having testimonial data | Medium | 2h | `HomeV4.tsx` |
| **No WebSite schema** with SearchAction (sitelinks search box) | Medium | 30min | `index.html` |
| **Internal linking is ad hoc** — no systematic cross-linking between blog, capability, solution pages | High | 4h | Multiple files |
| **No `hreflang` for Australian locale** | Medium | 15min | `index.html` |

### 4C. Content Volume Gaps (High Impact, Ongoing)

| Gap | Impact | Notes |
|-----|--------|-------|
| **Blog volume too low** — few posts indexed | Very High | Need 2–3 NDIS-specific posts/month minimum |
| **No pillar/cluster content structure** — blog posts are isolated, not linked to pillar pages | High | Build 4 topic clusters |
| **No "best NDIS software" comparison content** | High | High commercial-intent query |
| **Competitor comparison pages not authored** — CMS schema exists but no content | High | Priority: ShiftCare, HireUp, Lumary |
| **FAQ page has no real content** — 100+ questions in data file but none rendered | High | Quick win — content already written |
| **No "what is NDIS..." educational content** | Medium | Informational intent → builds topical authority |

### 4D. Technical / SPA Gaps

| Gap | Impact | Notes |
|-----|--------|-------|
| **No prerendering** — Google sees near-empty HTML on first crawl (SPA two-wave indexing lag) | Very High | New pages can take 2–4 weeks to fully index |
| **`Disallow: /*?*`** in robots.txt blocks all query string URLs — verify this doesn't block Sanity Studio routes | Medium | Add explicit `Disallow: /studio/` as safety net |
| **No `<link rel="canonical">` in static HTML** — only injected by React | Medium | If Googlebot doesn't execute JS, pages are indexed without canonical |
| **No `lastmod` on static pages** in sitemap | Low | Add to improve crawl budget allocation |

### 4E. Off-Page / Authority Gaps (Highest Long-Term Impact)

| Gap | Impact | Notes |
|-----|--------|-------|
| **No G2 / Clutch profile** — these platforms rank on page 1 for "NDIS software" before the actual product site | Very High | G2 and Clutch appear for most "NDIS software" queries in AU |
| **No Capterra / GetApp listing** | High | Popular in AU for software procurement |
| **No Google Business Profile** | High | Local SEO for Canberra/ACT; Business Profile posts drive clicks |
| **No NDS (National Disability Services) directory listing** | High | DA80+ backlink from nds.org.au |
| **No link building strategy** — very few external sites linking to tesseractapps.com.au | Very High | Domain authority is the primary ranking factor for competitive NDIS queries |
| **2025 LBA Award win not amplified** — asset exists (`2025_CANB_WINNER_LBA.webp`) but no press release or PR coverage | High | Local news + industry links from award coverage |
| **Case study clients not linking back** | Medium | Testimonial companies should link to the case study from their own site |

---

## 5. Implementation Plan by Phase

### Phase 1 — Quick Technical Wins (Week 1–2)
> **Goal:** Fix all structural issues. No new content needed. All code tasks.
> **Total effort:** ~9 hours
> **Expected impact:** Rich snippets start appearing in SERP within 2–4 weeks

| # | Task | File(s) | Effort | Impact |
|---|------|---------|--------|--------|
| 1.1 | Fix Organization schema — add address (Phillip ACT 2606), areaServed (Australia), social links, award, merge `SoftwareApplication` @type | `index.html` | 30min | 🔴 High |
| 1.2 | Add `WebSite` schema with `SearchAction` | `index.html` | 30min | 🟡 Medium |
| 1.3 | Add static `<link rel="canonical">` fallback + `hreflang en-au` | `index.html` | 15min | 🔴 High |
| 1.4 | Add `_updatedAt` to blog post Sanity query → populate `dateModified` in BlogPosting schema | `queries.ts`, `BlogPostPage.tsx` | 1h | 🔴 High |
| 1.5 | Un-comment publish date display in blog posts | `BlogPostPage.tsx` | 30min | 🟡 Medium |
| 1.6 | Create `src/utils/schemaHelpers.ts` — `buildBreadcrumbSchema()`, `buildFAQSchema()`, `buildSoftwareSchema()`, `buildGraphSchema()` | new file | 1h | 🟡 Medium (enables all below) |
| 1.7 | Add `FAQPage` JSON-LD to FAQ page + render Q&A accordions (100+ questions already in `faqData.ts`) | `FAQ.tsx` | 2h | 🔴 High |
| 1.8 | Add breadcrumb JSON-LD to CapabilityPage, SolutionPage, BlogPostPage, CompetitorPage | 4 files | 3h | 🔴 High |
| 1.9 | Add `SoftwareApplication` schema + canonical URL prop to CapabilityPage | `CapabilityPage.tsx` | 1h | 🔴 High |
| 1.10 | Add canonical URL prop to SolutionPage | `SolutionPage.tsx` | 15min | 🔴 High |

---

### Phase 2 — On-Page SEO & Sitemap (Week 2–4)
> **Goal:** Improve keyword targeting, CTR, and ensure all pages are crawlable.
> **Total effort:** ~16 hours
> **Expected impact:** CTR improvements in GSC within 3–5 weeks; new pages indexed within 2 weeks of sitemap fix

| # | Task | File(s) | Effort | Impact |
|---|------|---------|--------|--------|
| 2.1 | Expand sitemap to include capability, solution, competitor CMS pages | `generate-sitemap.js` | 3h | 🔴 High |
| 2.2 | Rewrite title tags for 10 key NDIS pages with keyword-rich titles | `metaTagsConfig.ts` | 2h | 🔴 High |
| 2.3 | Rewrite meta descriptions with CTR-optimised pattern: [Pain point] + [Feature] + [Trust signal] + [CTA] | `metaTagsConfig.ts` | 2h | 🔴 High |
| 2.4 | Add question-based H2 headings to 5 core NDIS pages (featured snippet targeting) | Page JSX / Sanity content | 3h | 🔴 High |
| 2.5 | Add `LocalBusiness` JSON-LD schema | `index.html` | 1h | 🟡 Medium |
| 2.6 | Add `AggregateRating` + `Review` schema from `testimonialData.ts` to homepage | `HomeV4.tsx` | 2h | 🟡 Medium |
| 2.7 | Internal linking — homepage → NDIS pillar pages; pricing → capability pages; footer audit | `HomeV4.tsx`, `Pricing.tsx`, `FooterComponent.tsx` | 3h | 🔴 High |

**Title Tag Rewrites (Priority Pages):**

| Route | Current Title | Recommended Title |
|-------|--------------|------------------|
| `/` | TesseractApps – End-to-End Workforce Management Software | `#1 NDIS Workforce Management Software \| Rostering, Compliance & Payroll — TesseractApps` |
| `/ndis-industry` | NDIS Industry Solutions – TesseractApps | `NDIS Provider Software \| Purpose-Built for NDIS Compliance & Operations — TesseractApps` |
| `/disability-support-ndis` | Disability Support & NDIS – TesseractApps | `Disability Support Worker Scheduling Software \| NDIS Compliant — TesseractApps` |
| `/roster-management` | Roster Management – TesseractApps | `NDIS Rostering Software \| Automated Shift Scheduling for Care Providers — TesseractApps` |
| `/participant-management` | Participant Management – TesseractApps | `NDIS Participant Management Software \| Track Plans, Goals & NDIS Services — TesseractApps` |
| `/compliance` | Compliance Management – TesseractApps | `NDIS Compliance Software \| Automated Practice Standards & Audit Tracking — TesseractApps` |
| `/incident-management` | Incident Management – TesseractApps | `NDIS Incident Management Software \| Practice Standards Compliant — TesseractApps` |
| `/support-coordination` | Support Coordination – TesseractApps | `NDIS Support Coordination Software \| Manage Participants & Plans — TesseractApps` |
| `/timesheet` | Timesheet Management – TesseractApps | `NDIS Timesheet Software \| Automated Timesheets for Care Providers — TesseractApps` |
| `/pricing` | Pricing – TesseractApps | `NDIS Software Pricing \| Transparent Plans for Every NDIS Provider — TesseractApps` |

---

### Phase 3 — Content Strategy (Month 2–3)
> **Goal:** Build topical authority for NDIS search cluster. Drive long-tail traffic.
> **Total effort:** 40–60 hours (content production) + 8h code
> **Expected impact:** Long-tail keyword rankings from Week 6 onward; primary keywords improve from Month 3

#### 3A. Blog Pillar / Cluster Content

Build 4 topic clusters. Each cluster has a **pillar page** (existing) and **satellite blog posts** (new content):

**Cluster 1 — "NDIS Software"** → Pillar: `/ndis-industry`
| Post Title | Target Keyword | Word Count |
|-----------|---------------|------------|
| What is NDIS Software? A Complete Guide for Providers | ndis software | 2,000 |
| Best NDIS Software in Australia [Year]: Full Comparison | best ndis software australia | 2,500 |
| NDIS Provider Software: What to Look for in 2025–2026 | ndis provider software | 1,800 |
| NDIS Software Pricing: What to Expect | ndis software cost | 1,500 |

**Cluster 2 — "NDIS Rostering"** → Pillar: `/roster-management`
| Post Title | Target Keyword | Word Count |
|-----------|---------------|------------|
| NDIS Rostering Software: Complete Feature Guide | ndis rostering software | 2,000 |
| How to Build NDIS-Compliant Rosters (Step-by-Step) | ndis compliant rosters | 1,800 |
| Disability Support Worker Scheduling: Best Practices | disability support worker scheduling | 1,500 |
| Automating NDIS Shift Scheduling | ndis shift scheduling | 1,500 |

**Cluster 3 — "NDIS Compliance"** → Pillar: `/compliance`
| Post Title | Target Keyword | Word Count |
|-----------|---------------|------------|
| NDIS Practice Standards Checklist 2025 | ndis practice standards | 2,500 |
| How to Prepare for an NDIS Audit | ndis audit preparation | 2,000 |
| NDIS Incident Management: What Providers Need to Know | ndis incident management | 1,800 |
| Worker Screening & Compliance Documentation Guide | ndis worker screening | 1,500 |

**Cluster 4 — "NDIS Participant Management"** → Pillar: `/participant-management`
| Post Title | Target Keyword | Word Count |
|-----------|---------------|------------|
| What is NDIS Participant Management Software? | ndis participant management software | 1,800 |
| Managing NDIS Plans: How Technology Helps Providers | managing ndis plans | 1,500 |
| How to Document NDIS Goals and Progress Notes | ndis progress notes | 1,500 |

**Content specs for every post:**
- H1 contains primary keyword
- H2s phrased as questions (People Also Ask format): "What is...?", "How does...?", "Why...?"
- 40–60 word direct answer immediately after each H2 (featured snippet target)
- Minimum 2 internal links to capability pages
- 1 external link to NDIS.gov.au or NDIS Quality & Safeguards Commission
- CTA block → `/book-a-demo`
- Author bio with name + credentials (E-E-A-T signal)
- Visible publish date (requires Phase 1 fix)
- Tag with relevant category (enables automatic "Related Posts" linking)
- **Publish cadence: 2 posts/month minimum**

#### 3B. Competitor Comparison Pages
> Content to be authored in Sanity Studio (CMS schema already built)

| Page | Competitor | Target Query | Priority |
|------|-----------|-------------|----------|
| `/tesseract-vs/shiftcare` | ShiftCare | TesseractApps vs ShiftCare | 🔴 High |
| `/tesseract-vs/hireup` | HireUp | TesseractApps vs HireUp | 🔴 High |
| `/tesseract-vs/lumary` | Lumary | TesseractApps vs Lumary | 🟡 Medium |
| `/tesseract-vs/brevity` | Brevity Care Software | TesseractApps vs Brevity | 🟡 Medium |
| `/tesseract-vs/alayacare` | AlayaCare | TesseractApps vs AlayaCare | 🟡 Medium |

Specs: 2,000+ words, detailed feature table, H2 "Why NDIS providers switch from [X] to TesseractApps", `SoftwareApplication` schema with competitor comparison data.

#### 3C. Prerender/SSG Strategy (Code — 8h)
> This is the most impactful single technical change for the SPA indexation problem.

The SPA currently requires Google to execute JavaScript to see page content — this adds a 2–4 week delay for new pages to be indexed (Google's two-wave rendering). Fix:

- Create `scripts/prerender-pages.mjs` — reads sitemap.xml, visits each URL with Playwright, saves static HTML to `public/`
- Vercel serves static files before the SPA rewrite rule — pre-rendered pages are indexed immediately
- Update `package.json` prebuild: add `node scripts/prerender-pages.mjs` after sitemap generation

---

### Phase 4 — Off-Page Authority Building (Month 3+, Ongoing)
> **Goal:** Build domain authority through backlinks, citations, and social proof.
> **Note:** This is the primary factor separating TesseractApps from competitors for competitive NDIS queries.

#### 4A. Review Platforms (Do First — Highest ROI)

> G2 and Clutch appear on page 1 for "NDIS software" queries in Australia, *above* the actual product websites. Getting listed and reviewed here is essential.

| Platform | Priority | Action |
|----------|----------|--------|
| **G2.com** | 🔴 Critical | Create profile, invite 5–10 current clients to review; G2 ranks page 1 for "NDIS software" |
| **Clutch.co** | 🔴 Critical | Create profile with case studies; used by procurement teams for vendor shortlisting |
| **Capterra** | 🔴 High | Australia-specific listings for software buyers |
| **GetApp** | 🟡 Medium | Sister site to Capterra |
| **SoftwareAdvice** | 🟡 Medium | High commercial intent visitors |
| **TrustRadius** | 🟡 Medium | B2B software reviews |
| **ProductHunt** | 🟢 Low | Awareness + backlink |

#### 4B. NDIS Ecosystem Directories

| Site | Type | DA | Action |
|------|------|----|--------|
| **nds.org.au** | Provider tools directory | 60+ | Apply for listing; also pitch guest article/case study to NDS newsletter (1,000+ providers) |
| **disabilitysupportguide.com.au** | Software tools directory | 45+ | Create/claim listing in software section |
| **ACCPA (accpa.asn.au)** | Aged & community care vendor directory | 50+ | Many NDIS providers also deliver aged care |
| **ABN Lookup / ABR** | Business register | 80+ | Verify NAP (Name, Address, Phone) — free, high DA |
| **everyaustralian.org.au** | Disability advocacy resources | 55+ | Contribute to provider resources section |

#### 4C. Google Business Profile
- Claim at [maps.google.com/business](https://business.google.com) — Phillip, ACT 2606
- Category: "Software Company" + "Business Management Software"
- Upload: product screenshots, team photos, office photos, award photo
- Post weekly (blog post summaries with links appear in Knowledge Panel)
- Embed Google review request link in client onboarding emails
- Bing Places for Business (5–8% of AU search share)

#### 4D. PR & Link Opportunities

| Opportunity | Asset Available | Action |
|-------------|----------------|--------|
| **2025 Canberra LBA Award** | `2025_CANB_WINNER_LBA.webp` already in codebase | Press release → The Canberra Times, CityNews, StartupSmart, Dynamic Business |
| **Canberra Expo 2025** | Video asset in codebase | Write up conference presence; pitch to tech media |
| **Sydney Expo 2025** | Video asset in codebase | Same as above |
| **Digital Transformation whitepaper** | PDF already produced | Pitch to NDIS Compass, ProBono Australia, Community Care Review as contributed piece |
| **Client case studies** | Testimonials from Seed Disability, S-Square, others in `testimonialData.ts` | Develop full case studies; ask clients to add "as seen in" link on their own site |

---

## 6. 3-Month Timeline & Expected Traffic Impact

> **Important:** SEO results are not instant. The timeline below is realistic based on how Google indexes and ranks SPA sites with low existing authority. Structured data wins (rich snippets) are fastest. Content + authority wins take longer.

```
Month 1
├── Week 1–2: Phase 1 (Technical Fixes — Schema, Canonical, FAQ JSON-LD, Breadcrumbs)
├── Week 2–4: Phase 2 (Sitemap expansion, title/meta rewrites, internal linking)
├── Week 1:   Monitoring setup (GSC, rank tracking, G2/Clutch profile creation)
└── Week 4:   First blog cluster posts published (2 posts)

Month 2
├── Phase 3A: 4 more blog posts published (NDIS Rostering cluster)
├── Phase 3B: 2 competitor comparison pages authored in Sanity
├── Phase 3C: Prerender script implementation
└── Off-page: NDS listing, Capterra, Google Business Profile claimed

Month 3
├── Phase 3A: 4 more blog posts published (NDIS Compliance cluster)
├── Phase 3B: 2 more competitor pages
├── Off-page: G2/Clutch reviews accumulating, PR push for LBA award
└── Review: GSC data analysis, rank tracking report, strategy adjustment
```

### Expected Traffic Impact by Month

| Month | Impressions (GSC) | Clicks | Rankings Changed | Notes |
|-------|------------------|--------|-----------------|-------|
| **Baseline** | ~X | ~X | — | Record today before any changes |
| **Month 1** | +20–40% | +10–20% | Rich snippets appear (FAQ, breadcrumbs); branded queries stabilise | Schema fixes drive SERP feature eligibility |
| **Month 2** | +50–80% | +30–50% | Long-tail NDIS queries (15–30 position) start appearing | Blog content indexed; competitor pages live |
| **Month 3** | +100–150% | +60–100% | NDIS long-tail keywords entering top 10; primary keywords moving from unranked to 20–50 | Content authority building; links starting to accumulate |
| **Month 4–6** | +200–400% | +150–300% | Primary NDIS keywords entering top 10; long-tail in top 5 | Off-page authority compounding |
| **Month 9–12** | +500–1000% | +400–800% | Top 3 realistic for primary NDIS keywords | Sustained content + link building required |

> **Month 3 deliverable for client:** At minimum, demonstrate measurable increases in GSC impressions (+100%), clicks (+50–100%), and 10–20 target keywords now tracked and moving upward in position. Several long-tail NDIS queries should be in top 20 by end of Month 3.

### Why #1 for "NDIS software" Takes Time

"NDIS software" is a competitive commercial keyword. Current page 1 is likely dominated by:
- G2.com, Capterra, GetApp (review aggregators with DA 80–90)
- ShiftCare, HireUp (established NDIS SaaS with 5+ years of content & links)
- NDIS.gov.au / NDS.org.au (government/peak body DA 70–85)

**To beat these, TesseractApps needs:**
1. Technically excellent pages (Phase 1 & 2 fix this)
2. Deep topical content coverage (Phase 3 builds this)
3. External authority signals (Phase 4 — the slowest but most critical)

Long-tail keywords ("NDIS rostering software", "NDIS participant management software") are winnable within 3 months because competition is lower. Primary keyword ("NDIS software") realistically takes 6–12 months of sustained effort.

---

## 7. Non-Code Actions (Off-Page)

> These cannot be done in code. They require human action. Assign ownership for each.

| Action | Owner | Deadline | Impact |
|--------|-------|----------|--------|
| Create G2.com profile | Marketing | Week 1 | 🔴 Critical |
| Create Clutch.co profile | Marketing | Week 1 | 🔴 Critical |
| Claim Google Business Profile | Marketing | Week 1 | 🔴 High |
| Invite 5–10 clients to leave G2 reviews | Account Manager | Month 1 | 🔴 Critical |
| Submit NDS directory listing | Marketing | Week 2 | 🔴 High |
| Create Capterra / GetApp listing | Marketing | Week 2 | 🔴 High |
| Press release — 2025 LBA Award win | Marketing | Week 2 | 🔴 High |
| Verify ABN Lookup / ABR listing with correct NAP | Admin | Week 1 | 🟡 Medium |
| Pitch whitepaper to NDIS Compass / Community Care Review | Marketing | Month 2 | 🟡 Medium |
| Ask case study clients to add "as seen in" link | Account Manager | Month 2 | 🟡 Medium |
| Submit Bing Places for Business | Marketing | Month 2 | 🟡 Medium |
| Submit to ACCPA vendor directory | Marketing | Month 2 | 🟡 Medium |
| Provide real social media URLs for Organization schema | Dev/Marketing | Week 1 | 🟡 Medium |
| Provide phone number for LocalBusiness schema | Admin | Week 1 | 🟡 Medium |

---

## 8. Monitoring Setup

### Google Search Console (Do on Day 1)
- [ ] Verify `https://tesseractapps.com.au` (URL prefix, not domain property)
- [ ] Submit sitemap: `https://tesseractapps.com.au/sitemap.xml`
- [ ] Submit RSS: `https://tesseractapps.com.au/rss.xml`
- [ ] Set target country: Australia
- [ ] Create custom report filtered to Australia, tracking all 12 target keywords
- [ ] Run URL Inspection on 20 priority pages to confirm Google's rendered HTML matches what users see
- [ ] Screenshot and record baseline impressions, clicks, average position on Day 1

### Keyword Rank Tracking (Weekly)
Set up in Ahrefs, SERPRobot, or manually via GSC:

| Keyword | Track Weekly | Target by Month 3 |
|---------|-------------|------------------|
| NDIS software | ✅ | Top 20 |
| NDIS provider software | ✅ | Top 20 |
| NDIS workforce management | ✅ | Top 15 |
| NDIS rostering software | ✅ | Top 10 |
| NDIS compliance software | ✅ | Top 10 |
| NDIS participant management software | ✅ | Top 10 |
| disability support worker scheduling software | ✅ | Top 10 |
| care management software Australia | ✅ | Top 15 |
| best NDIS software | ✅ | Top 15 |
| NDIS software Australia | ✅ | Top 10 |
| TesseractApps | ✅ | #1 (maintain) |
| TesseractApps vs ShiftCare | ✅ | Top 5 |

### Core Web Vitals (Monthly)
- Run [PageSpeed Insights](https://pagespeed.web.dev) on `/`, `/ndis-industry`, `/roster-management` monthly
- Enable Vercel Speed Insights in project settings
- Target: LCP < 2.5s, INP < 200ms, CLS < 0.1

### Reporting Cadence
| Frequency | Report Content |
|-----------|---------------|
| Weekly | Keyword rank changes for 12 target queries |
| Monthly | GSC impressions + clicks vs baseline; new pages indexed; rich snippet status |
| End of Month 3 | Full traffic comparison (impressions, clicks, keyword positions) vs baseline |

---

## 9. Summary Checklist

### Code Tasks (Dev Team)

#### Week 1–2
- [ ] Fix Organization schema in `index.html` — add address, areaServed, social links, award
- [ ] Add `WebSite` schema + `SearchAction` to `index.html`
- [ ] Add static canonical + hreflang `en-au` to `index.html`
- [ ] Add `_updatedAt` to blog post query → `dateModified` in BlogPosting schema
- [ ] Un-comment blog post publish date display
- [ ] Create `src/utils/schemaHelpers.ts` with schema builder functions
- [ ] Add `FAQPage` JSON-LD + render Q&A accordions in `FAQ.tsx`
- [ ] Add breadcrumb JSON-LD to `CapabilityPage.tsx`, `SolutionPage.tsx`, `BlogPostPage.tsx`, `CompetitorPage.tsx`
- [ ] Add `SoftwareApplication` schema + canonical prop to `CapabilityPage.tsx`
- [ ] Add canonical prop to `SolutionPage.tsx`

#### Week 2–4
- [ ] Expand sitemap generator to include capabilities, solutions, competitor CMS pages
- [ ] Rewrite title tags for 10 priority NDIS pages in `metaTagsConfig.ts`
- [ ] Rewrite meta descriptions for 10 priority NDIS pages in `metaTagsConfig.ts`
- [ ] Update H1/H2 structure on 5 core NDIS pages for featured snippet targeting
- [ ] Add `LocalBusiness` JSON-LD to `index.html`
- [ ] Add `AggregateRating` + `Review` schema to `HomeV4.tsx`
- [ ] Internal linking — homepage → NDIS pillar pages; footer audit; pricing → features

#### Month 2
- [ ] Build prerender script (`scripts/prerender-pages.mjs`) for static HTML generation
- [ ] Add "Further Reading" section to `CapabilityPage.tsx` (related blog posts by tag)

### Content Tasks (Content/Marketing Team)

#### Month 1
- [ ] Sanity Studio: Update `heroHeading` on key capability pages to NDIS keyword titles
- [ ] Sanity Studio: Author 2 blog posts — Cluster 1 (NDIS Software)
- [ ] Sanity Studio: Author ShiftCare comparison page

#### Month 2
- [ ] Author 4 more blog posts — Cluster 2 (NDIS Rostering)
- [ ] Author HireUp comparison page
- [ ] Expand FAQ page with 10–15 NDIS-specific questions

#### Month 3
- [ ] Author 4 more blog posts — Cluster 3 (NDIS Compliance)
- [ ] Author Lumary + Brevity comparison pages
- [ ] Review and update any Month 1 blog posts with new data

### Off-Page / Marketing Tasks

#### Week 1
- [ ] Record baseline GSC metrics (impressions, clicks, top keywords)
- [ ] Set up rank tracking for 12 target keywords
- [ ] Create G2.com profile
- [ ] Create Clutch.co profile
- [ ] Claim Google Business Profile (Phillip ACT 2606)
- [ ] Provide social media URLs + phone number for schema updates

#### Month 1
- [ ] Invite 5–10 current clients to leave G2 reviews
- [ ] Submit NDS directory listing
- [ ] Create Capterra / GetApp listing
- [ ] Draft + distribute 2025 LBA Award press release

#### Month 2–3
- [ ] Pitch whitepaper to NDIS Compass / Community Care Review
- [ ] Ask case study clients for "as seen in" backlinks
- [ ] Submit ACCPA vendor directory
- [ ] Bing Places for Business

---

## Appendix — Key File Reference

| File | Purpose |
|------|---------|
| `index.html` | Global schema, static canonical, hreflang, preconnect hints |
| `src/components/common/SEO.tsx` | Per-page meta tags, OG, Twitter, JSON-LD injection |
| `src/data/metaTagsConfig.ts` | 196-route title/description map |
| `src/sanity/lib/queries.ts` | All GROQ queries incl. blog post query |
| `src/pages/blogPost/BlogPostPage.tsx` | Dynamic blog posts; BlogPosting JSON-LD auto-generated |
| `src/pages/capabilities/CapabilityPage.tsx` | Dynamic CMS capability pages |
| `src/pages/solutions/solutionPage/SolutionPage.tsx` | Dynamic CMS solution pages |
| `src/pages/competitors/CompetitorPage.tsx` | Dynamic CMS competitor comparison pages |
| `src/pages/resources/faq/FAQ.tsx` | FAQ/Help Centre page |
| `src/pages/home/HomeV4.tsx` | Homepage |
| `scripts/generate-sitemap.js` | Sitemap + RSS generation at build time |
| `public/robots.txt` | Crawler rules |
| `public/sitemap.xml` | Auto-generated sitemap |
| `vercel.json` | SPA rewrite rule + www → non-www redirect |

---

*Report generated: March 2026 | TesseractApps SEO Strategy v1.0*
