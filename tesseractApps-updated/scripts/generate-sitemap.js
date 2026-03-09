import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://tesseractapps.com.au';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// --- Sanity client (uses same env vars as the app, but via process.env for Node) ---
const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET ?? 'production';
const apiVersion = process.env.VITE_SANITY_API_VERSION ?? '2024-01-01';

// --- Static site pages (not blog posts) for sitemap only ---
const STATIC_PAGES = [
  { loc: '/', priority: '1.0' },
  { loc: '/product' },
  { loc: '/scheduling' },
  { loc: '/time-management' },
  { loc: '/hr-management' },
  { loc: '/communication' },
  { loc: '/roster-management' },
  { loc: '/timesheet' },
  { loc: '/admin-console' },
  { loc: '/access-control-panel' },
  { loc: '/hr-operations' },
  { loc: '/t-sign' },
  { loc: '/clock-in-and-clock-out' },
  { loc: '/participant-management' },
  { loc: '/incident-management' },
  { loc: '/role-based-dashboard' },
  { loc: '/documents' },
  { loc: '/chat' },
  { loc: '/my-profile' },
  { loc: '/forms' },
  { loc: '/accounting' },
  { loc: '/t-learning-hub' },
  { loc: '/salesforce-integration' },
  { loc: '/xero' },
  { loc: '/wyzed' },
  { loc: '/ndis-industry' },
  { loc: '/ict-industry' },
  { loc: '/retail-hospitality' },
  { loc: '/multi-site-businesses' },
  { loc: '/construction' },
  { loc: '/manufacturing' },
  { loc: '/disability-support-ndis' },
  { loc: '/support-coordination' },
  { loc: '/aged-care-services' },
  { loc: '/child-care-services' },
  { loc: '/allied-health-services' },
  { loc: '/home-community-care-services' },
  { loc: '/administrator' },
  { loc: '/roster-manager' },
  { loc: '/ndis-staff' },
  { loc: '/hr-manager' },
  { loc: '/accountant' },
  { loc: '/participant' },
  { loc: '/small-businesses' },
  { loc: '/enterprise' },
  { loc: '/franchise' },
  { loc: '/startups' },
  { loc: '/compliance' },
  { loc: '/employee-engagement' },
  { loc: '/time-efficiency' },
  { loc: '/cost-optimisation' },
  { loc: '/blogs' },
  { loc: '/whitepapers' },
  { loc: '/help-center' },
  { loc: '/release-notes' },
  { loc: '/privacy-policy' },
  { loc: '/terms-and-conditions' },
  { loc: '/pricing' },
  { loc: '/about' },
  { loc: '/our-story' },
  { loc: '/team' },
  { loc: '/careers' },
  { loc: '/contact-us' },
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
        publishedAt
      }
    `);
    console.log(`[generate-sitemap] Fetched ${posts.length} posts from Sanity.`);
    return posts;
  } catch (err) {
    console.warn('[generate-sitemap] Sanity fetch failed — sitemap/RSS blog entries may be incomplete.', err.message);
    return [];
  }
}

// --- Generate sitemap.xml ---
function buildSitemap(posts, staticPages) {
  const now = new Date().toISOString().slice(0, 10);

  const staticUrls = staticPages.map(p => `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority ?? '0.8'}</priority>
  </url>`).join('\n');

  const blogUrls = posts.map(p => `  <url>
    <loc>${`${SITE_URL}/blog/${p.slug}`}</loc>
    <lastmod>${lastmod(p.publishedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${staticUrls}

${blogUrls}

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
  const posts = await fetchSanityPosts();

  const sitemap = buildSitemap(posts, STATIC_PAGES);
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
