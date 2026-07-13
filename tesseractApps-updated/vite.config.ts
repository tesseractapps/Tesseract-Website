import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createClient } from '@sanity/client';
import { createRequire } from 'module';
import { readFileSync, existsSync } from 'fs';
import Beasties from 'beasties';

const _require = createRequire(import.meta.url);
const GLOSSARY_TERMS: { term: string; definition: string }[] = _require('./src/data/ndisGlossaryTerms.json');

const SITE = 'https://tesseractapps.com.au';
const OG_IMAGE = `${SITE}/og-image.jpg`;

// ── Static route meta ────────────────────────────────────────────────────────
// title ≤60 chars, description 130-160 chars

const STATIC_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'NDIS Workforce Management Software | TesseractApps',
    description: 'Streamline your NDIS provider operations with TesseractApps. From intake to compliance — one unified workforce management platform. Book a demo today.',
  },
  '/pricing': {
    title: 'NDIS Software Pricing | Start Free | TesseractApps',
    description: 'Explore flexible pricing plans for NDIS workforce management software. Find the right plan for your provider size and budget. Request a personalised quote.',
  },
  '/sc-pricing': {
    title: 'Support Coordination Pricing | TesseractApps',
    description: 'Simple, transparent pricing for NDIS support coordination software. One flat monthly rate with unlimited cases, case notes, and compliance tracking.',
  },
  '/platform': {
    title: 'Platform Overview – NDIS Workforce Tools | TesseractApps',
    description: 'Discover the TesseractApps platform — an integrated solution for NDIS providers covering workforce management, compliance, and service delivery.',
  },
  '/capabilities': {
    title: 'NDIS Software Capabilities & Features | TesseractApps',
    description: 'Explore all capabilities: learning management, workflow engine, compliance tracking, and more. See how TesseractApps streamlines NDIS operations.',
  },
  '/solutions': {
    title: 'NDIS Software Solutions by Role & Size | TesseractApps',
    description: 'Purpose-built NDIS software solutions for support workers, operations managers, compliance leads, and enterprise providers. Find your fit.',
  },
  '/about': {
    title: 'About TesseractApps | NDIS Software Provider',
    description: 'Learn about TesseractApps and our mission to simplify workforce management for NDIS and care providers across Australia.',
  },
  '/humans': {
    title: 'Humans — The people behind TesseractApps',
    description: 'Meet the team building TesseractApps — NDIS workforce management software for Australian care providers. Real people, real mission.',
  },
  '/careers': {
    title: 'Careers at TesseractApps | Join the Team',
    description: 'Join the TesseractApps team. Explore career opportunities in building software that transforms NDIS workforce management across Australia.',
  },
  '/contact-us': {
    title: 'Contact TesseractApps | Get in Touch',
    description: 'Get in touch with the TesseractApps team. Whether you need a demo, support, or partnership enquiries, we\'re here to help.',
  },
  '/help-centre': {
    title: 'Help Centre | TesseractApps Support',
    description: 'Find answers to common questions about TesseractApps. Browse our help centre for setup guides, FAQs, and troubleshooting tips.',
  },
  '/whitepapers': {
    title: 'NDIS Whitepapers & Research | TesseractApps',
    description: 'Access in-depth whitepapers and research on NDIS workforce management, compliance best practices, and industry trends.',
  },
  '/brochures': {
    title: 'TesseractApps Brochures & Downloads',
    description: 'Download TesseractApps product brochures, feature guides, and resources for NDIS providers evaluating workforce management software.',
  },
  '/guides': {
    title: 'SIL & NDIS Guides | Free Checklists | TesseractApps',
    description: 'Download free SIL and NDIS guides, checklists, and toolkits. Practical resources for care providers, support coordinators, and compliance leads.',
  },
  '/ndis-glossary': {
    title: 'NDIS Glossary – Key Terms Explained | TesseractApps',
    description: 'Confused by NDIS terminology? Our comprehensive glossary explains key terms and concepts for providers, participants, and support coordinators.',
  },
  '/sitemap': {
    title: 'Site Map of NDIS Software Pages & Resources | TesseractApps',
    description: 'Browse all pages on the TesseractApps website — capabilities, solutions, pricing, blog, and more.',
  },
  '/solutions/support-coordination': {
    title: 'NDIS Support Coordination Software | TesseractApps',
    description: 'Manage your entire NDIS support coordination caseload in one platform. Case notes, budgets, service agreements, and audit evidence connected automatically.',
  },
  '/register-support-coordination': {
    title: 'Register as Support Coordination Provider | TesseractApps',
    description: 'Register as a Support Coordination provider on TesseractApps. Streamline client management, plan tracking, and reporting.',
  },
  '/blogs': {
    title: 'NDIS Blog & Resources | TesseractApps',
    description: 'Stay informed with the latest NDIS news, compliance updates, and workforce management insights. Read expert articles and guides.',
  },
  '/capabilities/learning-management': {
    title: 'NDIS Learning Management System | TesseractApps',
    description: 'Role-based learning pathways with 86+ NDIS-mapped modules. Track compliance training, certifications, and worker development connected to the roster.',
  },
  '/capabilities/workflow-engine': {
    title: 'Workflow Engine | NDIS Automation | TesseractApps',
    description: 'Automate your NDIS operations with our Workflow Engine. Build custom workflows for intake, assessments, audits, and service delivery.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | TesseractApps',
    description: 'Read the TesseractApps Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with Australian law.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | TesseractApps',
    description: 'Review the Terms and Conditions for using TesseractApps services. Understand your rights and obligations as a user.',
  },
  '/changelog': {
    title: 'Changelog & Release Notes | TesseractApps',
    description: 'View the latest product updates, feature releases, and improvements to the TesseractApps platform. Stay up to date with everything we ship.',
  },
  '/events': {
    title: 'Events | TesseractApps',
    description: 'Meet the TesseractApps team at NDIS industry events across Australia. See live demos, enter prize draws, and connect with our team.',
  },
  '/events/adelaide-expo-2026': {
    title: 'Adelaide Disability & WorkAbility Expo 2026 | Register & Win – TesseractApps',
    description: 'Register for the Adelaide Disability & WorkAbility Expo 2026 with TesseractApps (Booth 8). Book your free demo, enter our giveaway for 12 months free, and see our NDIS platform in action.',
  },
  '/book-a-demo': {
    title: 'Book a Free NDIS Software Demo | TesseractApps',
    description: 'See TesseractApps in action. Book a personalised demo with our team and discover how NDIS workforce management software can transform your operations.',
  },
  '/book-a-demo/success': {
    title: 'Demo Booked | TesseractApps',
    description: 'Your TesseractApps demo has been successfully booked. Check your inbox for a confirmation email.',
  },
  '/signup': {
    title: 'Sign Up for NDIS Workforce Software | TesseractApps',
    description: 'Create your TesseractApps account and start managing your NDIS workforce operations from day one.',
  },
  '/signup/success': {
    title: "You're All Set | TesseractApps",
    description: 'Your TesseractApps account is being set up. Check your inbox for login details and next steps.',
  },
};

const STATIC_ROUTES = Object.keys(STATIC_META);

// Conversion/form pages — intentionally rendered without nav/footer and not
// listed in the sitemap. Mark them noindex so search engines don't index thin,
// link-less pages (resolves Screaming Frog "Pages Without Internal Outlinks").
// Keep this in sync with the runtime <SEO noIndex> flag on each page so the raw
// SSG HTML and the JS-rendered HTML agree.
const NOINDEX_ROUTES = new Set<string>([
  '/book-a-demo',
  '/book-a-demo/success',
  '/signup',
  '/signup/success',
  '/register-support-coordination',
]);

// ── Sanity types ─────────────────────────────────────────────────────────────

interface SanityRouteMeta {
  slug: { current: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface SanityBlogMeta extends SanityRouteMeta {
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  _updatedAt?: string;
  author?: { name?: string };
  mainImage?: { asset?: { url?: string } };
}

// ── Route data cache ─────────────────────────────────────────────────────────

interface RouteData {
  routes: string[];
  dynamicMeta: Record<string, { title: string; description: string }>;
  // Blog-specific data for BlogPosting schema injection
  blogData: Record<string, {
    title: string;
    excerpt?: string;
    publishedAt?: string;
    updatedAt?: string;
    authorName?: string;
    imageUrl?: string;
  }>;
}

let cachedRouteData: RouteData | null = null;

async function getSsgRoutes(): Promise<RouteData> {
  const env = loadEnv('production', process.cwd(), '');
  const projectId = env.VITE_SANITY_PROJECT_ID;
  const dataset = env.VITE_SANITY_DATASET ?? 'production';
  const apiVersion = env.VITE_SANITY_API_VERSION ?? '2024-01-01';

  if (!projectId) {
    console.warn('[SSG] VITE_SANITY_PROJECT_ID not set — skipping dynamic route pre-render');
    return { routes: STATIC_ROUTES, dynamicMeta: {}, blogData: {} };
  }

  const sanity = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' });

  const [blogDocs, capabilitySlugs, solutionSlugs, competitorSlugs, humanSlugs] = await Promise.all([
    // Extended blog fetch — includes fields needed for BlogPosting schema
    sanity.fetch<SanityBlogMeta[]>(
      `*[_type == "blogPost" && status == "published"]{
        slug, seo, title, excerpt, publishedAt, _updatedAt,
        "author": author->{ name },
        "mainImage": mainImage{ "asset": asset->{ url } }
      }`
    ),
    sanity.fetch<SanityRouteMeta[]>(`*[_type == "capabilityPage"]{ slug, seo }`),
    sanity.fetch<SanityRouteMeta[]>(`*[_type == "solutionPage"]{ slug, seo }`),
    sanity.fetch<SanityRouteMeta[]>(`*[_type == "competitorPage"]{ slug, seo }`),
    sanity.fetch<SanityRouteMeta[]>(`*[_type == "human" && defined(slug.current)]{ slug }`),
  ]);

  const dynamic: string[] = [];
  const dynamicMeta: Record<string, { title: string; description: string }> = {};
  const blogData: RouteData['blogData'] = {};

  for (const doc of blogDocs) {
    if (!doc.slug?.current) continue;
    const path = `/blog/${doc.slug.current}`;
    dynamic.push(path);
    if (doc.seo?.metaTitle || doc.seo?.metaDescription) {
      dynamicMeta[path] = {
        title: doc.seo.metaTitle ?? doc.title ?? 'Blog | TesseractApps',
        description: doc.seo.metaDescription ?? doc.excerpt ?? '',
      };
    }
    // Store blog-specific data for BlogPosting schema
    blogData[path] = {
      title: doc.seo?.metaTitle ?? doc.title ?? '',
      excerpt: doc.seo?.metaDescription ?? doc.excerpt,
      publishedAt: doc.publishedAt,
      updatedAt: doc._updatedAt,
      authorName: doc.author?.name,
      imageUrl: doc.mainImage?.asset?.url,
    };
  }
  for (const doc of capabilitySlugs) {
    if (!doc.slug?.current) continue;
    const path = `/capabilities/${doc.slug.current}`;
    dynamic.push(path);
    if (doc.seo?.metaTitle || doc.seo?.metaDescription) {
      dynamicMeta[path] = {
        title: doc.seo.metaTitle ?? 'Capability | TesseractApps',
        description: doc.seo.metaDescription ?? '',
      };
    }
  }
  for (const doc of solutionSlugs) {
    if (!doc.slug?.current) continue;
    const path = `/solutions/${doc.slug.current}`;
    dynamic.push(path);
    if (doc.seo?.metaTitle || doc.seo?.metaDescription) {
      dynamicMeta[path] = {
        title: doc.seo.metaTitle ?? 'Solution | TesseractApps',
        description: doc.seo.metaDescription ?? '',
      };
    }
  }
  for (const doc of competitorSlugs) {
    if (!doc.slug?.current) continue;
    const path = `/tesseract-vs/${doc.slug.current}`;
    dynamic.push(path);
    if (doc.seo?.metaTitle || doc.seo?.metaDescription) {
      dynamicMeta[path] = {
        title: doc.seo.metaTitle ?? 'TesseractApps vs Competitor',
        description: doc.seo.metaDescription ?? '',
      };
    }
  }
  for (const doc of humanSlugs) {
    if (!doc.slug?.current) continue;
    dynamic.push(`/humans/${doc.slug.current}`);
  }

  console.log(`[SSG] ${STATIC_ROUTES.length} static + ${dynamic.length} dynamic routes`);
  return { routes: [...STATIC_ROUTES, ...dynamic], dynamicMeta, blogData };
}

async function getRouteData(): Promise<RouteData> {
  if (!cachedRouteData) {
    cachedRouteData = await getSsgRoutes();
  }
  return cachedRouteData;
}

// ── HTML helpers ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Breadcrumb builder ────────────────────────────────────────────────────────
// Derives a BreadcrumbList from the URL path. Returns null for homepage.

const SEGMENT_LABELS: Record<string, string> = {
  'capabilities': 'Capabilities',
  'solutions': 'Solutions',
  'blog': 'Blog',
  'blogs': 'Blog',
  'tesseract-vs': 'Compare',
  'pricing': 'Pricing',
  'platform': 'Platform',
  'about': 'About',
  'careers': 'Careers',
  'contact-us': 'Contact',
  'help-center': 'Help Centre',
  'help-centre': 'Help Centre',
  'whitepapers': 'Whitepapers',
  'brochures': 'Brochures',
  'ndis-glossary': 'NDIS Glossary',
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms & Conditions',
  'changelog': 'Changelog',
  'sitemap': 'Sitemap',
  'register-support-coordination': 'Register',
  'support-coordination': 'Support Coordination',
  'sc-pricing': 'SC Pricing',
};

function toTitleCase(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildBreadcrumbSchema(path: string, pageTitle: string): object | null {
  if (path === '/') return null;

  const segments = path.replace(/^\//, '').split('/').filter(Boolean);
  const items: object[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
  ];

  let accumulated = '';
  for (let i = 0; i < segments.length; i++) {
    accumulated += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    const name = isLast
      ? pageTitle  // Use the actual page title for the last crumb
      : (SEGMENT_LABELS[segments[i]] ?? toTitleCase(segments[i]));
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name,
      item: `${SITE}${accumulated}/`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

// ── BlogPosting schema builder ────────────────────────────────────────────────

function buildBlogPostingSchema(
  path: string,
  pageTitle: string,
  blogEntry: RouteData['blogData'][string]
): object {
  const postUrl = `${SITE}${path}`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: pageTitle,
    description: blogEntry.excerpt ?? '',
    url: postUrl,
    inLanguage: 'en-AU',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    publisher: {
      '@type': 'Organization',
      name: 'TesseractApps',
      logo: { '@type': 'ImageObject', url: `${SITE}/tesseract_logo.webp` },
    },
  };

  if (blogEntry.publishedAt) schema.datePublished = blogEntry.publishedAt;
  if (blogEntry.updatedAt) schema.dateModified = blogEntry.updatedAt;
  if (blogEntry.imageUrl) schema.image = blogEntry.imageUrl;
  if (blogEntry.authorName) {
    schema.author = { '@type': 'Person', name: blogEntry.authorName };
  }

  return schema;
}

// ── Main injection function ───────────────────────────────────────────────────

function injectMetaIntoHtml(
  html: string,
  path: string,
  meta: { title: string; description: string },
  options: {
    blogEntry?: RouteData['blogData'][string];
  } = {}
): string {
  // Apache serves all pages with trailing slashes — canonical must match exactly.
  // Homepage stays as bare domain. All other paths get a trailing slash.
  const canonical = path === '/' ? SITE : `${SITE}${path}/`;
  const pageType = path.startsWith('/blog/') ? 'article' : 'website';

  const safeTitle = escapeHtml(meta.title);
  const safeDescription = escapeHtml(meta.description);
  const safeCanonical = escapeHtml(canonical);
  const safeOgImage = escapeHtml(OG_IMAGE);

  // ── Core meta tags (title, description, robots, canonical) ──
  const robots = NOINDEX_ROUTES.has(path) ? 'noindex, nofollow' : 'index, follow';
  const coreTags = [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${safeDescription}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${safeCanonical}">`,
    // Self-referencing hreflang annotation (single-language en-AU site).
    // Google treats this as optional but best practice; x-default covers
    // users in other regions.
    `<link rel="alternate" hreflang="en-au" href="${safeCanonical}">`,
    `<link rel="alternate" hreflang="x-default" href="${safeCanonical}">`,
  ];

  // ── OG tags — per-page values baked into static HTML ──
  // Social crawlers (Facebook, LinkedIn, Slack) read raw HTML before JS runs.
  const ogTags = [
    `<meta property="og:type" content="${pageType}">`,
    `<meta property="og:url" content="${safeCanonical}">`,
    `<meta property="og:title" content="${safeTitle}">`,
    `<meta property="og:description" content="${safeDescription}">`,
    `<meta property="og:image" content="${safeOgImage}">`,
    `<meta name="twitter:title" content="${safeTitle}">`,
    `<meta name="twitter:description" content="${safeDescription}">`,
  ];

  // ── BreadcrumbList schema ──
  const breadcrumb = buildBreadcrumbSchema(path, meta.title);
  const extraSchemas: string[] = [];
  if (breadcrumb) {
    extraSchemas.push(
      `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>`
    );
  }

  // ── BlogPosting schema (blog posts only) ──
  if (options.blogEntry) {
    const blogSchema = buildBlogPostingSchema(path, meta.title, options.blogEntry);
    extraSchemas.push(
      `<script type="application/ld+json">\n${JSON.stringify(blogSchema, null, 2)}\n</script>`
    );
  }

  // ── ContactPage schema (/contact-us only) ──
  if (path === '/contact-us') {
    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact TesseractApps',
      url: `${SITE}/contact-us`,
      description: meta.description,
      mainEntity: {
        '@type': 'Organization',
        name: 'TesseractApps',
        url: SITE,
        email: 'hello@tesseractapps.com.au',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Level 1/45 Colbee Ct, Phillip',
          addressRegion: 'ACT',
          postalCode: '2606',
          addressCountry: 'AU',
        },
      },
    };
    extraSchemas.push(
      `<script type="application/ld+json">\n${JSON.stringify(contactSchema, null, 2)}\n</script>`
    );
  }

  // ── FAQPage schema (/ndis-glossary only) ──
  // Terms are hardcoded in src/data/ndisGlossaryTerms.json — same source the
  // component uses, so schema stays in sync when terms are updated.
  if (path === '/ndis-glossary') {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: GLOSSARY_TERMS.map(t => ({
        '@type': 'Question',
        name: `What is ${t.term}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.definition,
        },
      })),
    };
    extraSchemas.push(
      `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`
    );
  }

  const allTags = [...coreTags, ...ogTags, ...extraSchemas];
  const injection = allTags.map(t => `    ${t}`).join('\n');

  return html.replace('</head>', `${injection}\n  </head>`);
}

// ── Per-route CSS injection ───────────────────────────────────────────────────
// Maps static routes to their lazy-loaded page component's source path.
// Used to look up page-specific CSS from the ssr-manifest and inject it as
// a render-blocking stylesheet so each page only loads its own CSS.

const ROUTE_ENTRY_MODULE: Record<string, string> = {
  '/': 'src/pages/home/Home.tsx',
  '/pricing': 'src/pages/marketing/pricing/Pricing.tsx',
  '/sc-pricing': 'src/pages/marketing/scPricing/SCPricing.tsx',
  '/platform': 'src/pages/platform/Platform.tsx',
  '/capabilities': 'src/pages/capabilities/CapabilitiesListing.tsx',
  '/capabilities/learning-management': 'src/pages/lms/LMS.tsx',
  '/capabilities/workflow-engine': 'src/pages/workflowEngine/WorkflowEngine.tsx',
  '/solutions': 'src/pages/solutions/SolutionsListing.tsx',
  '/solutions/support-coordination': 'src/pages/supportCoordination/SupportCoordination.tsx',
  '/about': 'src/pages/marketing/about/About.tsx',
  '/humans': 'src/pages/humans/HumansPage.tsx',
  '/careers': 'src/pages/marketing/careers/Careers.tsx',
  '/contact-us': 'src/pages/forms/contactInformation/ContactInformation.tsx',
  '/help-centre': 'src/pages/resources/faq/FAQ.tsx',
  '/whitepapers': 'src/pages/resources/whitepapers/Whitepapers.tsx',
  '/brochures': 'src/pages/resources/brochures/Brochures.tsx',
  '/guides': 'src/pages/resources/guides/Guides.tsx',
  '/ndis-glossary': 'src/pages/resources/glossary/NDISGlossary.tsx',
  '/sitemap': 'src/pages/resources/sitemapPage/SitemapPage.tsx',
  '/register-support-coordination': 'src/pages/forms/register/Register.tsx',
  '/blogs': 'src/pages/blog/Blog.tsx',
  '/privacy-policy': 'src/pages/legal/privacyPolicy/PrivacyPolicy.tsx',
  '/terms-and-conditions': 'src/pages/legal/termsAndConditions/TermsAndConditions.tsx',
  '/changelog': 'src/pages/legal/releaseNotes/ReleaseNotes.tsx',
  '/events': 'src/pages/events/eventsListing/EventsListing.tsx',
  '/events/adelaide-expo-2026': 'src/pages/events/adelaideExpo2026/AdelaideExpo2026.tsx',
  '/book-a-demo': 'src/pages/forms/bookADemo/BookADemo.tsx',
  '/book-a-demo/success': 'src/pages/forms/bookADemo/BookADemoSuccess.tsx',
  '/signup': 'src/pages/forms/signup/Signup.tsx',
  '/signup/success': 'src/pages/forms/signup/SignupSuccess.tsx',
};

function getEntryModuleForPath(routePath: string): string | null {
  if (ROUTE_ENTRY_MODULE[routePath]) return ROUTE_ENTRY_MODULE[routePath];
  if (routePath.startsWith('/blog/')) return 'src/pages/blogPost/BlogPostPage.tsx';
  if (routePath.startsWith('/capabilities/')) return 'src/pages/capabilities/CapabilityPage.tsx';
  if (routePath.startsWith('/solutions/')) return 'src/pages/solutions/solutionPage/SolutionPage.tsx';
  if (routePath.startsWith('/tesseract-vs/')) return 'src/pages/competitors/CompetitorPage.tsx';
  if (routePath.startsWith('/humans/')) return 'src/pages/humans/HumanPage.tsx';
  if (routePath.startsWith('/whitepapers/')) return 'src/pages/resources/whitepapers/WhitepaperPage.tsx';
  if (routePath.startsWith('/guides/')) return 'src/pages/resources/guides/GuidePage.tsx';
  return null;
}

let ssrManifestCache: Record<string, string[]> | null = null;
function getSsrManifest(): Record<string, string[]> {
  if (!ssrManifestCache) {
    const manifestPath = './dist/.vite/ssr-manifest.json';
    ssrManifestCache = existsSync(manifestPath)
      ? JSON.parse(readFileSync(manifestPath, 'utf-8'))
      : {};
  }
  return ssrManifestCache!;
}

// Inline the page's own CSS as a <style> block instead of a render-blocking
// <link>. This keeps styles present at first paint (no FOUC) while removing the
// blocking network request from the critical path. Falls back to a <link> if the
// file can't be read at build time.
function getPageCssLinks(routePath: string): string {
  const entryModule = getEntryModuleForPath(routePath);
  if (!entryModule) return '';
  const manifest = getSsrManifest();
  const assets: string[] = manifest[entryModule] ?? [];
  return assets
    .filter(a => a.endsWith('.css'))
    .map(href => `<link rel="stylesheet" crossorigin href="${href}">`)
    .join('\n    ');
}

// Emit <link rel="modulepreload"> for the route's lazily-imported page chunk.
// Page components are React.lazy(); during SSG the module is synchronous so the
// server HTML is complete, but on the client the chunk is fetched only after the
// entry runs — so React's Suspense (fallback={null}) blanks the pre-rendered page
// until the chunk arrives, then re-renders it. That blank→content swap is a large
// layout shift (CLS) and a hydration mismatch (#418). Preloading the chunk in
// parallel with the entry means it's cached when hydration runs, so the fallback
// never shows.
function getPageJsPreloads(routePath: string): string {
  const entryModule = getEntryModuleForPath(routePath);
  if (!entryModule) return '';
  const manifest = getSsrManifest();
  const assets: string[] = manifest[entryModule] ?? [];
  return assets
    .filter(a => a.endsWith('.js'))
    .map(href => `<link rel="modulepreload" crossorigin href="${href}">`)
    .join('\n    ');
}

// ── Vite config ──────────────────────────────────────────────────────────────

export default defineConfig({
  ssgOptions: {
    dirStyle: 'nested',
    concurrency: 1,
    includedRoutes: async () => {
      const { routes } = await getRouteData();
      return routes;
    },
    onBeforePageRender: async (path: string, indexHTML: string) => {
      const { dynamicMeta, blogData } = await getRouteData();
      const allMeta = { ...STATIC_META, ...dynamicMeta };
      const meta = allMeta[path];
      if (!meta) return indexHTML;

      let html = injectMetaIntoHtml(indexHTML, path, meta, {
        blogEntry: blogData[path],
      });

      // Inject per-route page CSS as a <link> (discovered via the ssr-manifest
      // since lazy routes only link the shared app CSS). beasties (in
      // onPageRendered) then extracts the above-fold critical CSS inline and
      // defers the full stylesheets — fast first paint AND no render-blocking.
      const pageCssLinks = getPageCssLinks(path);
      if (pageCssLinks) {
        html = html.replace('</head>', `    ${pageCssLinks}\n  </head>`);
      }

      // Preload the route's lazy JS chunk so it's ready at hydration (prevents
      // the Suspense fallback from blanking the pre-rendered page → CLS/#418).
      const pageJsPreloads = getPageJsPreloads(path);
      if (pageJsPreloads) {
        html = html.replace('</head>', `    ${pageJsPreloads}\n  </head>`);
      }

      return html;
    },
    onPageRendered: async (_route: string, renderedHTML: string) => {
      // React 19 auto-generates resource <link rel="preload"> tags (e.g. for the
      // eager hero image). With renderToString-based SSG, React leaks them into
      // <body>, right after the #root open. The client keeps such resources in
      // <head>, so leaving them in <body> makes the server markup differ from the
      // client tree → hydration mismatch (React #418) → a full client re-render
      // that shifts layout (large CLS). Relocate them into <head>, where React's
      // client resource system dedupes against them and hydration of #root
      // matches. The preload (and its LCP benefit) is preserved.
      const leaked: string[] = [];
      let html = renderedHTML.replace(
        /(<div id="root"[^>]*>)((?:\s*<link\b[^>]*>)+)/,
        (_m: string, open: string, links: string) => {
          leaked.push(...(links.match(/<link\b[^>]*>/g) ?? []));
          return open;
        }
      );
      if (leaked.length) {
        html = html.replace('</head>', `    ${leaked.join('\n    ')}\n  </head>`);
      }

      // Extract critical (above-the-fold) CSS inline and defer the full
      // stylesheets. This keeps first paint fast (small critical CSS parse) while
      // taking the 60KB+ of full CSS off the render-blocking critical path — the
      // remaining sheets load async (preload→stylesheet) and cache across pages.
      try {
        const beasties = new Beasties({
          path: './dist',
          publicPath: '/',
          pruneSource: false,
          preload: 'swap',
          inlineFonts: false,
          fonts: false,
          logLevel: 'silent',
        });
        html = await beasties.process(html);
      } catch {
        // If critical-CSS extraction fails for a page, ship it with the plain
        // <link> stylesheets rather than breaking the build.
      }
      return html;
    },
  },
  plugins: [
    react(),
    // Move stylesheet <link> tags before JS <script> tags to eliminate FOUC.
    // vite-react-ssg injects CSS after the entry script; this reorders them.
    {
      name: 'css-first',
      enforce: 'post' as const,
      transformIndexHtml(html: string) {
        // Extract all stylesheet link tags injected by Vite
        const stylesheetRe = /<link[^>]+rel="stylesheet"[^>]*>/gi;
        const stylesheets = html.match(stylesheetRe) ?? [];
        if (stylesheets.length === 0) return html;
        // Remove them from wherever Vite placed them
        let result = html;
        for (const tag of stylesheets) {
          result = result.replace(tag, '');
        }
        // Re-insert them immediately after <meta charset> — before anything else
        const injection = stylesheets.join('\n    ');
        result = result.replace(
          /(<meta charset=[^>]+>)/i,
          `$1\n    ${injection}`
        );
        return result;
      },
    },
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    ssrManifest: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/@sanity/client') ||
            id.includes('node_modules/@sanity/image-url')
          ) {
            return 'vendor-sanity-client';
          }
        },
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.names?.[0]?.split('.').pop() || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) return `assets/images/[name]-[hash][extname]`;
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) return `assets/fonts/[name]-[hash][extname]`;
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) return `assets/media/[name]-[hash][extname]`;
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
})
