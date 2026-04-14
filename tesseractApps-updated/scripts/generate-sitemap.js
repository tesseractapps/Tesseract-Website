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

// --- Static site pages (not blog posts) for sitemap only ---
const STATIC_PAGES = [
  { loc: '/', priority: '1.0' },
  { loc: '/capabilities' },
  { loc: '/solutions' },
  { loc: '/platform' },
  { loc: '/pricing' },
  { loc: '/case-studies' },
  { loc: '/webinars' },
  { loc: '/whitepapers' },
  { loc: '/blogs' },
  { loc: '/help-center' },
  { loc: '/changelog' },
  { loc: '/about' },
  { loc: '/our-story' },
  { loc: '/team' },
  { loc: '/careers' },
  { loc: '/contact-us' },
  { loc: '/privacy-policy' },
  { loc: '/terms-and-conditions' },
  { loc: '/ndis-glossary', priority: '0.8' },
  { loc: '/sitemap', priority: '0.5' },
];

// --- Helpers ---
function toRfc822(isoDate) {
  const d = new Date(isoDate);
  return d.toUTCString().replace('GMT', '+0000');
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function lastmod(isoDate) {
  return isoDate ? isoDate.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

// --- Fetch all published posts from Sanity ---
async function fetchSanityPosts() {
  if (!projectId) {
    console.warn('[generate-sitemap] VITE_SANITY_PROJECT_ID not set — sitemap/RSS will be empty. Set the env var and rebuild.');
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
    console.log(`[generate-sitemap] Fetched ${posts.length} posts from Sanity.`);
    return posts;
  } catch (err) {
    console.warn('[generate-sitemap] Sanity fetch failed — sitemap/RSS blog entries may be incomplete.', err.message);
    return [];
  }
}

// --- Fetch CMS dynamic pages (capabilities, solutions, competitors) ---
async function fetchSanityCmsPages() {
  if (!projectId) return { capabilityPages: [], solutionPages: [], competitorPages: [] };

  const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

  try {
    const [capabilityPages, solutionPages, competitorPages] = await Promise.all([
      client.fetch(`
        *[_type == "capabilityPage"] | order(order asc) {
          "slug": slug.current,
          _updatedAt
        }
      `),
      client.fetch(`
        *[_type == "solutionPage"] | order(order asc) {
          "slug": slug.current,
          _updatedAt
        }
      `),
      client.fetch(`
        *[_type == "competitorPage"] | order(order asc) {
          "slug": slug.current,
          _updatedAt
        }
      `),
    ]);
    console.log(`[generate-sitemap] Fetched ${capabilityPages.length} capability pages, ${solutionPages.length} solution pages, ${competitorPages.length} competitor pages.`);
    return { capabilityPages, solutionPages, competitorPages };
  } catch (err) {
    console.warn('[generate-sitemap] Sanity CMS page fetch failed — dynamic pages may be missing from sitemap.', err.message);
    return { capabilityPages: [], solutionPages: [], competitorPages: [] };
  }
}

// --- Generate sitemap.xml ---
function buildSitemap(posts, staticPages, capabilityPages, solutionPages, competitorPages) {
  const now = new Date().toISOString().slice(0, 10);

  const staticUrls = staticPages.map(p => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority ?? '0.8'}</priority>
  </url>`).join('\n');

  const blogUrls = posts.map(p => `  <url>
    <loc>${`${SITE_URL}/blog/${p.slug}`}</loc>
    <lastmod>${lastmod(p._updatedAt ?? p.publishedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  const capabilityUrls = capabilityPages.map(p => `  <url>
    <loc>${SITE_URL}/capabilities/${p.slug}</loc>
    <lastmod>${lastmod(p._updatedAt)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n');

  const solutionUrls = solutionPages.map(p => `  <url>
    <loc>${SITE_URL}/solutions/${p.slug}</loc>
    <lastmod>${lastmod(p._updatedAt)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n');

  const competitorUrls = competitorPages.map(p => `  <url>
    <loc>${SITE_URL}/tesseract-vs/${p.slug}</loc>
    <lastmod>${lastmod(p._updatedAt)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticUrls}

${blogUrls}

${capabilityUrls}

${solutionUrls}

${competitorUrls}

</urlset>`;
}

// --- Generate rss.xml ---
function buildRss(posts) {
  const items = posts.map(p => {
    const link = `${SITE_URL}/blog/${p.slug}`;
    return `  <item>
    <title>${escapeXml(p.title ?? '')}</title>
    <link>${link}</link>
    <description>${escapeXml(p.excerpt ?? '')}</description>
    <pubDate>${toRfc822(p.publishedAt)}</pubDate>
    <guid isPermaLink="true">${link}</guid>
  </item>`;
  }).join('\n\n');

  const buildDate = toRfc822(new Date().toISOString());

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TesseractApps Blog</title>
  <link>${SITE_URL}</link>
  <description>Latest insights, guides, and updates for NDIS providers and care organisations from TesseractApps.</description>
  <language>en-au</language>
  <lastBuildDate>${buildDate}</lastBuildDate>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />

${items}

</channel>
</rss>`;
}

// --- Main ---
async function main() {
  const [posts, { capabilityPages, solutionPages, competitorPages }] = await Promise.all([
    fetchSanityPosts(),
    fetchSanityCmsPages(),
  ]);

  const sitemap = buildSitemap(posts, STATIC_PAGES, capabilityPages, solutionPages, competitorPages);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
  console.log('[generate-sitemap] Written: public/sitemap.xml');

  const rss = buildRss(posts);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf8');
  console.log('[generate-sitemap] Written: public/rss.xml');
}

main().catch(err => {
  console.error('[generate-sitemap] Fatal error:', err);
  process.exit(1);
});
