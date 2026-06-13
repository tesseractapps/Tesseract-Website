import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';

const SITE_URL = 'https://tesseractapps.com.au';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// --- Sanity client ---
// Node scripts do not automatically load .env.local like Vite runtime does,
// so we load env files explicitly and then allow real process env to override.
const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), '');

const projectId = process.env.VITE_SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || env.VITE_SANITY_DATASET || 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION || env.VITE_SANITY_API_VERSION || '2024-01-01';

// --- Static pages ---
const STATIC_PAGES = [
  { loc: '/',                              priority: '1.0', changefreq: 'weekly'  },
  { loc: '/platform',                      priority: '0.9', changefreq: 'monthly' },
  { loc: '/pricing',                       priority: '0.9', changefreq: 'weekly'  },
  { loc: '/capabilities',                  priority: '0.8', changefreq: 'monthly' },
  { loc: '/solutions',                     priority: '0.8', changefreq: 'monthly' },
  { loc: '/about',                         priority: '0.7', changefreq: 'monthly' },
  { loc: '/humans',                        priority: '0.6', changefreq: 'monthly' },
  { loc: '/careers',                       priority: '0.6', changefreq: 'weekly'  },
  { loc: '/contact-us',                    priority: '0.7', changefreq: 'monthly' },
  { loc: '/help-center',                   priority: '0.6', changefreq: 'monthly' },
  { loc: '/ndis-glossary',                 priority: '0.8', changefreq: 'monthly' },
  { loc: '/blogs',                         priority: '0.8', changefreq: 'daily'   },
  { loc: '/guides',                        priority: '0.8', changefreq: 'weekly'  },
  { loc: '/whitepapers',                   priority: '0.6', changefreq: 'monthly' },
  { loc: '/brochures',                     priority: '0.6', changefreq: 'monthly' },
  { loc: '/events',                        priority: '0.7', changefreq: 'monthly' },
  { loc: '/events/adelaide-expo-2026',     priority: '0.8', changefreq: 'weekly'  },
  { loc: '/sc-pricing',                    priority: '0.9', changefreq: 'weekly'  },
  { loc: '/support-coordination',          priority: '0.9', changefreq: 'monthly' },
  { loc: '/changelog',                     priority: '0.5', changefreq: 'weekly'  },
  { loc: '/privacy-policy',               priority: '0.3', changefreq: 'yearly'  },
  { loc: '/terms-and-conditions',          priority: '0.3', changefreq: 'yearly'  },
  { loc: '/sitemap',                       priority: '0.3', changefreq: 'monthly' },
];

// --- LLM / AI context files ---
const LLM_PAGES = [
  { loc: '/llms.txt',      priority: '0.5', changefreq: 'weekly' },
  { loc: '/llms-full.txt', priority: '0.4', changefreq: 'weekly' },
];

// --- Helpers ---
function lastmod(isoDate) {
  return isoDate ? isoDate.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function toRfc822(isoDate) {
  return new Date(isoDate).toUTCString().replace('GMT', '+0000');
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function writeFile(name, content) {
  fs.writeFileSync(path.join(PUBLIC_DIR, name), content, 'utf8');
  console.log(`[generate-sitemap] Written: public/${name}`);
}

// ── XML builders ──────────────────────────────────────────────────────────────

function urlEntry({ loc, lastmodDate, changefreq = 'weekly', priority = '0.8' }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmodDate}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function urlset(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    entries.join('\n\n'),
    '',
    '</urlset>',
  ].join('\n');
}

function sitemapIndexEntry(loc, lastmodDate) {
  return [
    '  <sitemap>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmodDate}</lastmod>`,
    '  </sitemap>',
  ].join('\n');
}

// ── Sub-sitemap builders ──────────────────────────────────────────────────────

function buildPagesSitemap(now) {
  return urlset(
    STATIC_PAGES.map(p => urlEntry({
      loc: `${SITE_URL}${p.loc}`,
      lastmodDate: now,
      changefreq: p.changefreq,
      priority: p.priority,
    }))
  );
}

function buildBlogSitemap(posts) {
  if (posts.length === 0) return null;
  return urlset(
    posts.map(p => urlEntry({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmodDate: lastmod(p._updatedAt ?? p.publishedAt),
      changefreq: 'weekly',
      priority: '0.8',
    }))
  );
}

function buildCapabilitiesSitemap(pages) {
  if (pages.length === 0) return null;
  return urlset(
    pages.map(p => urlEntry({
      loc: `${SITE_URL}/capabilities/${p.slug}`,
      lastmodDate: lastmod(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.9',
    }))
  );
}

function buildSolutionsSitemap(pages) {
  if (pages.length === 0) return null;
  return urlset(
    pages.map(p => urlEntry({
      loc: `${SITE_URL}/solutions/${p.slug}`,
      lastmodDate: lastmod(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.9',
    }))
  );
}

function buildCompetitorsSitemap(pages) {
  if (pages.length === 0) return null;
  return urlset(
    pages.map(p => urlEntry({
      loc: `${SITE_URL}/tesseract-vs/${p.slug}`,
      lastmodDate: lastmod(p._updatedAt),
      changefreq: 'monthly',
      priority: '0.8',
    }))
  );
}

function buildGuidesSitemap(guides) {
  if (guides.length === 0) return null;
  return urlset(
    guides.map(g => urlEntry({
      loc: `${SITE_URL}/guides/${g.slug}`,
      lastmodDate: lastmod(g._updatedAt ?? g.publishedAt),
      changefreq: 'monthly',
      priority: '0.8',
    }))
  );
}

function buildWhitepapersSitemap(whitepapers) {
  if (whitepapers.length === 0) return null;
  return urlset(
    whitepapers.map(wp => urlEntry({
      loc: `${SITE_URL}/whitepapers/${wp.slug}`,
      lastmodDate: lastmod(wp._updatedAt ?? wp.publishedAt),
      changefreq: 'monthly',
      priority: '0.7',
    }))
  );
}

function buildLlmSitemap(now) {
  return urlset(
    LLM_PAGES.map(p => urlEntry({
      loc: `${SITE_URL}${p.loc}`,
      lastmodDate: now,
      changefreq: p.changefreq,
      priority: p.priority,
    }))
  );
}

function buildSitemapIndex(entries, now) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    entries.map(([loc]) => sitemapIndexEntry(loc, now)).join('\n\n'),
    '',
    '</sitemapindex>',
  ].join('\n');
}

// ── RSS builder ───────────────────────────────────────────────────────────────

function buildRss(posts) {
  const buildDate = toRfc822(new Date().toISOString());
  const items = posts.map(p => {
    const link = `${SITE_URL}/blog/${p.slug}`;
    return [
      '  <item>',
      `    <title>${escapeXml(p.title ?? '')}</title>`,
      `    <link>${link}</link>`,
      `    <description>${escapeXml(p.excerpt ?? '')}</description>`,
      `    <pubDate>${toRfc822(p.publishedAt)}</pubDate>`,
      `    <guid isPermaLink="true">${link}</guid>`,
      '  </item>',
    ].join('\n');
  }).join('\n\n');

  return [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '  <title>TesseractApps Blog</title>',
    `  <link>${SITE_URL}</link>`,
    '  <description>Latest insights, guides, and updates for NDIS providers and care organisations from TesseractApps.</description>',
    '  <language>en-au</language>',
    `  <lastBuildDate>${buildDate}</lastBuildDate>`,
    `  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    '',
    items,
    '',
    '</channel>',
    '</rss>',
  ].join('\n');
}

// ── Sanity fetchers ───────────────────────────────────────────────────────────

async function fetchSanityPosts() {
  if (!projectId) {
    console.warn('[generate-sitemap] VITE_SANITY_PROJECT_ID not set — blog sitemap will be empty.');
    return [];
  }

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && status == "published"]
      | order(publishedAt desc) {
        "slug": slug.current,
        title,
        excerpt,
        publishedAt,
        _updatedAt
      }
    `);
    console.log(`[generate-sitemap] Fetched ${posts.length} blog posts.`);
    return posts;
  } catch (err) {
    console.warn('[generate-sitemap] Blog post fetch failed:', err.message);
    return [];
  }
}

async function fetchSanityCmsPages() {
  if (!projectId) {
    return { capabilityPages: [], solutionPages: [], competitorPages: [], guides: [], whitepapers: [] };
  }

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

  try {
    const [capabilityPages, solutionPages, competitorPages, guides, whitepapers] = await Promise.all([
      client.fetch(`*[_type == "capabilityPage"] | order(order asc) { "slug": slug.current, _updatedAt }`),
      client.fetch(`*[_type == "solutionPage"]   | order(order asc) { "slug": slug.current, _updatedAt }`),
      client.fetch(`*[_type == "competitorPage"] | order(order asc) { "slug": slug.current, _updatedAt }`),
      client.fetch(`*[_type == "guide" && status == "published"] | order(publishedAt desc) { "slug": slug.current, publishedAt, _updatedAt }`),
      client.fetch(`*[_type == "whitepaper" && status != "coming_soon"] | order(publishedAt desc) { "slug": slug.current, publishedAt, _updatedAt }`),
    ]);
    console.log(
      `[generate-sitemap] Fetched ${capabilityPages.length} capabilities,`,
      `${solutionPages.length} solutions,`,
      `${competitorPages.length} competitors,`,
      `${guides.length} guides,`,
      `${whitepapers.length} whitepapers.`
    );
    return { capabilityPages, solutionPages, competitorPages, guides, whitepapers };
  } catch (err) {
    console.warn('[generate-sitemap] CMS page fetch failed:', err.message);
    return { capabilityPages: [], solutionPages: [], competitorPages: [], guides: [], whitepapers: [] };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const now = new Date().toISOString().slice(0, 10);

  const [posts, { capabilityPages, solutionPages, competitorPages, guides, whitepapers }] = await Promise.all([
    fetchSanityPosts(),
    fetchSanityCmsPages(),
  ]);

  // ── Sub-sitemaps — write each only if it has content ─────────────────────────
  // Each entry: [absolute URL for the index, filename, xml content]
  const subSitemaps = [
    [
      `${SITE_URL}/sitemap-pages.xml`,
      'sitemap-pages.xml',
      buildPagesSitemap(now),
    ],
    posts.length > 0 && [
      `${SITE_URL}/sitemap-blog.xml`,
      'sitemap-blog.xml',
      buildBlogSitemap(posts),
    ],
    capabilityPages.length > 0 && [
      `${SITE_URL}/sitemap-capabilities.xml`,
      'sitemap-capabilities.xml',
      buildCapabilitiesSitemap(capabilityPages),
    ],
    solutionPages.length > 0 && [
      `${SITE_URL}/sitemap-solutions.xml`,
      'sitemap-solutions.xml',
      buildSolutionsSitemap(solutionPages),
    ],
    competitorPages.length > 0 && [
      `${SITE_URL}/sitemap-competitors.xml`,
      'sitemap-competitors.xml',
      buildCompetitorsSitemap(competitorPages),
    ],
    guides.length > 0 && [
      `${SITE_URL}/sitemap-guides.xml`,
      'sitemap-guides.xml',
      buildGuidesSitemap(guides),
    ],
    whitepapers.length > 0 && [
      `${SITE_URL}/sitemap-whitepapers.xml`,
      'sitemap-whitepapers.xml',
      buildWhitepapersSitemap(whitepapers),
    ],
    [
      `${SITE_URL}/sitemap-llm.xml`,
      'sitemap-llm.xml',
      buildLlmSitemap(now),
    ],
  ].filter(Boolean);

  for (const [, filename, xml] of subSitemaps) {
    writeFile(filename, xml);
  }

  // ── Sitemap index ─────────────────────────────────────────────────────────────
  const sitemapIndex = buildSitemapIndex(subSitemaps, now);
  writeFile('sitemap.xml', sitemapIndex);

  // ── RSS feed ──────────────────────────────────────────────────────────────────
  writeFile('rss.xml', buildRss(posts));
}

main().catch(err => {
  console.error('[generate-sitemap] Fatal error:', err);
  process.exit(1);
});
