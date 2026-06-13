/**
 * Sanity content → Markdown conversion utilities.
 * Used by gen-llms-docs.mjs at build time to generate LLM-readable markdown
 * from Sanity CMS content (blog posts, capability pages, solution pages, competitor pages).
 */

import { portableTextToMarkdown as ptToMd } from '@portabletext/markdown';

const SITE_URL = 'https://tesseractapps.com.au';

// ── Portable Text → Markdown ──────────────────────────────────────────────────

/** Fix garbled multi-byte sequences that can appear in Sanity content. */
function fixEncoding(str) {
  if (!str) return str;
  return str
    .replace(/â€"/g, '—')
    .replace(/â€˜/g, '‘')
    .replace(/â€™/g, '’')
    .replace(/â€œ/g, '“')
    .replace(/â€/g, '”')
    .replace(/Â·/g, '·')
    .replace(/Â /g, ' ');
}

/**
 * Convert a Portable Text block array to a markdown string.
 * @portabletext/markdown handles standard blocks (headings, lists, links, marks).
 * Custom types (callout, table, code, image) are handled with a serializer map.
 */
/** Deep-clone blocks and fix encoding in all text spans. */
function fixBlocksEncoding(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map(block => {
    if (block._type !== 'block') return block;
    return {
      ...block,
      children: (block.children ?? []).map(child =>
        child._type === 'span' && child.text
          ? { ...child, text: fixEncoding(child.text) }
          : child
      ),
    };
  });
}

export function portableTextToMarkdown(blocks) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return '';
  const cleanBlocks = fixBlocksEncoding(blocks);
  let raw;
  try {
    raw = ptToMd(cleanBlocks, {
      types: {
        callout: ({ value }) => {
          const type = (value.type ?? 'info').toUpperCase();
          const text = value.text ?? '';
          return `> [!${type}]\n> ${text}\n`;
        },
        code: ({ value }) => {
          const lang = value.language ?? '';
          const filename = value.filename ? `// ${value.filename}\n` : '';
          return `\`\`\`${lang}\n${filename}${value.code ?? ''}\n\`\`\`\n`;
        },
        table: ({ value }) => {
          const rows = value.rows ?? [];
          if (rows.length === 0) return '';
          const lines = rows.map((row, i) => {
            const cells = (row.cells ?? []).map(c => (c ?? '').replace(/\|/g, '\\|'));
            const line = `| ${cells.join(' | ')} |`;
            if (i === 0) {
              const sep = `| ${cells.map(() => '---').join(' | ')} |`;
              return `${line}\n${sep}`;
            }
            return line;
          });
          return `${lines.join('\n')}\n`;
        },
        image: ({ value }) => {
          const url = value?.asset?.url ?? '';
          const alt = value.alt ?? '';
          const caption = value.caption ? `\n*${value.caption}*` : '';
          if (!url) return '';
          return `![${alt}](${url})${caption}\n`;
        },
      },
    }).trim();
  } catch {
    // Fallback: extract plain text from block children
    raw = cleanBlocks
      .filter(b => b._type === 'block')
      .map(b => (b.children ?? []).map(c => c.text ?? '').join(''))
      .join('\n\n');
  }
  return fixEncoding(raw);
}

/**
 * Render a single Portable Text span with its marks to markdown.
 * markDefs is the block-level array of link/annotation definitions.
 */
function renderSpan(span, markDefs) {
  let text = fixEncoding(span.text ?? '');
  if (!text) return '';

  const marks = span.marks ?? [];

  // Resolve link marks first (wrap with [text](href))
  for (const mark of marks) {
    const def = (markDefs ?? []).find(d => d._key === mark);
    if (def?._type === 'link') {
      const href = def.href ?? '';
      text = `[${text}](${href})`;
    }
  }

  // Apply decorator marks (order matters: code before bold/em to avoid nesting issues)
  if (marks.includes('code')) text = `\`${text}\``;
  if (marks.includes('strong')) text = `**${text}**`;
  if (marks.includes('em')) text = `*${text}*`;
  if (marks.includes('strike-through') || marks.includes('strikeThrough')) text = `~~${text}~~`;
  if (marks.includes('underline')) text = `<u>${text}</u>`;

  return text;
}

/**
 * Convert simple Portable Text blocks (capabilities/solutions — no images/callouts).
 * Preserves marks (bold, italic, code, links) and list items.
 */
function simpleBlocksToMarkdown(blocks) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return '';

  const lines = [];
  let listBuffer = [];
  let currentListType = null;

  const flushList = () => {
    if (listBuffer.length === 0) return;
    lines.push(listBuffer.join('\n'));
    listBuffer = [];
    currentListType = null;
  };

  for (const b of blocks) {
    if (b._type !== 'block') continue;

    const style = b.style ?? 'normal';
    const listItem = b.listItem; // 'bullet' | 'number' | undefined
    const markDefs = b.markDefs ?? [];
    const text = (b.children ?? []).map(c => renderSpan(c, markDefs)).join('');

    if (!text.trim()) continue;

    if (listItem) {
      if (currentListType !== listItem) {
        flushList();
        currentListType = listItem;
      }
      const prefix = listItem === 'number' ? `${listBuffer.length + 1}.` : '-';
      listBuffer.push(`${prefix} ${text}`);
      continue;
    }

    flushList();

    if (style === 'h2') lines.push(`## ${text}`);
    else if (style === 'h3') lines.push(`### ${text}`);
    else if (style === 'h4') lines.push(`#### ${text}`);
    else if (style === 'blockquote') lines.push(`> ${text}`);
    else lines.push(text);
  }

  flushList();
  return lines.join('\n\n');
}

// ── YAML-safe string ──────────────────────────────────────────────────────────

function yamlStr(val) {
  if (val == null) return '""';
  const s = String(val)
    .replace(/\\/g, '\\\\')   // backslash must come first
    .replace(/"/g, '\\"')     // double-quote
    .replace(/\n/g, '\\n')   // literal newline
    .replace(/\r/g, '\\r');  // carriage return
  return `"${s}"`;
}

// ── Blog Post → Markdown ──────────────────────────────────────────────────────

export function blogPostToMarkdown(post) {
  const slug = post.slug?.current ?? '';
  const title = fixEncoding(post.title ?? '');
  const excerpt = fixEncoding(post.excerpt ?? '');
  const publishedAt = post.publishedAt ? post.publishedAt.slice(0, 10) : '';
  const updatedAt = post._updatedAt ? post._updatedAt.slice(0, 10) : publishedAt;
  const authorName = post.author?.name ?? '';
  const category = post.category?.title ?? '';
  const tags = Array.isArray(post.tags) && post.tags.length > 0
    ? `[${post.tags.map(t => `"${t}"`).join(', ')}]`
    : '[]';
  const readingTime = post.readingTime ?? '';
  const url = `${SITE_URL}/blog/${slug}`;

  const seo = post.seo ?? {};
  const primaryKeyword = seo.primaryKeyword ?? '';
  const secondaryKeywords = Array.isArray(seo.secondaryKeywords) && seo.secondaryKeywords.length > 0
    ? `[${seo.secondaryKeywords.map(k => `"${k}"`).join(', ')}]`
    : '[]';
  const lsiKeywords = Array.isArray(seo.lsiKeywords) && seo.lsiKeywords.length > 0
    ? `[${seo.lsiKeywords.map(k => `"${k}"`).join(', ')}]`
    : '[]';

  const bodyMd = post.body ? portableTextToMarkdown(post.body) : '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(title)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `publishedAt: ${yamlStr(publishedAt)}`,
    `updatedAt: ${yamlStr(updatedAt)}`,
    authorName ? `author: ${yamlStr(authorName)}` : null,
    category ? `category: ${yamlStr(category)}` : null,
    `tags: ${tags}`,
    readingTime ? `readingTime: ${readingTime}` : null,
    `excerpt: ${yamlStr(excerpt)}`,
    primaryKeyword ? `primaryKeyword: ${yamlStr(primaryKeyword)}` : null,
    secondaryKeywords !== '[]' ? `secondaryKeywords: ${secondaryKeywords}` : null,
    lsiKeywords !== '[]' ? `lsiKeywords: ${lsiKeywords}` : null,
    '---',
  ].filter(Boolean).join('\n');

  return fixEncoding(`${frontmatter}\n\n# ${title}\n\n${excerpt}\n\n${bodyMd}`.trim());
}

// ── Capability Page → Markdown ────────────────────────────────────────────────

export function capabilityToMarkdown(page) {
  const slug = page.slug?.current ?? '';
  const title = page.title ?? '';
  const navGroup = page.navGroup ?? '';
  const url = `${SITE_URL}/capabilities/${slug}`;
  const heroHeading = page.heroHeading ?? title;
  const heroSubtitle = page.heroSubtitle ?? '';

  const seo = page.seo ?? {};
  const primaryKeyword = seo.primaryKeyword ?? '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(title)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `navGroup: ${yamlStr(navGroup)}`,
    primaryKeyword ? `primaryKeyword: ${yamlStr(primaryKeyword)}` : null,
    heroSubtitle ? `excerpt: ${yamlStr(heroSubtitle)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const sections = [];

  sections.push(`# ${heroHeading}`);
  if (heroSubtitle) sections.push(heroSubtitle);

  if (page.problemStatement?.length > 0) {
    sections.push('## The Problem');
    sections.push(simpleBlocksToMarkdown(page.problemStatement));
  }

  if (Array.isArray(page.whatMattersMost) && page.whatMattersMost.length > 0) {
    sections.push('## What Matters Most');
    sections.push(page.whatMattersMost.map(i => `- ${i}`).join('\n'));
  }

  if (page.howWeSolveThis?.length > 0) {
    sections.push('## How We Solve This');
    sections.push(simpleBlocksToMarkdown(page.howWeSolveThis));
  }

  if (Array.isArray(page.whatYouGet) && page.whatYouGet.length > 0) {
    sections.push('## What You Get');
    sections.push(page.whatYouGet.map(i => `- ${i}`).join('\n'));
  }

  if (Array.isArray(page.isThisRightForYou) && page.isThisRightForYou.length > 0) {
    sections.push('## Is This Right for You?');
    sections.push(page.isThisRightForYou.map(i => `- ${i}`).join('\n'));
  }

  return `${frontmatter}\n\n${sections.join('\n\n')}`.trim();
}

// ── Solution Page → Markdown ──────────────────────────────────────────────────

export function solutionToMarkdown(page) {
  const slug = page.slug?.current ?? '';
  const title = page.title ?? '';
  const navCategory = page.navCategory ?? '';
  const url = `${SITE_URL}/solutions/${slug}`;
  const heroHeading = page.heroHeading ?? title;
  const heroSubtitle = page.heroSubtitle ?? '';

  const seo = page.seo ?? {};
  const primaryKeyword = seo.primaryKeyword ?? '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(title)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `navCategory: ${yamlStr(navCategory)}`,
    primaryKeyword ? `primaryKeyword: ${yamlStr(primaryKeyword)}` : null,
    heroSubtitle ? `excerpt: ${yamlStr(heroSubtitle)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const sections = [];

  sections.push(`# ${heroHeading}`);
  if (heroSubtitle) sections.push(heroSubtitle);

  if (page.whoIsThisFor?.length > 0) {
    sections.push('## Who Is This For?');
    sections.push(simpleBlocksToMarkdown(page.whoIsThisFor));
  }

  if (Array.isArray(page.keyBenefits) && page.keyBenefits.length > 0) {
    sections.push('## Key Benefits');
    sections.push(page.keyBenefits.map(i => `- ${i}`).join('\n'));
  }

  if (page.howWeSupport?.length > 0) {
    sections.push('## How We Support You');
    sections.push(simpleBlocksToMarkdown(page.howWeSupport));
  }

  if (Array.isArray(page.whatYouGet) && page.whatYouGet.length > 0) {
    sections.push('## What You Get');
    sections.push(page.whatYouGet.map(i => `- ${i}`).join('\n'));
  }

  if (Array.isArray(page.isThisRightForYou) && page.isThisRightForYou.length > 0) {
    sections.push('## Is This Right for You?');
    sections.push(page.isThisRightForYou.map(i => `- ${i}`).join('\n'));
  }

  return `${frontmatter}\n\n${sections.join('\n\n')}`.trim();
}

// ── Guide → Markdown ─────────────────────────────────────────────────────────

export function guideToMarkdown(guide) {
  const slug = guide.slug?.current ?? '';
  const title = fixEncoding(guide.title ?? '');
  const excerpt = fixEncoding(guide.excerpt ?? '');
  const publishedAt = guide.publishedAt ? guide.publishedAt.slice(0, 10) : '';
  const topic = guide.topic ?? '';
  const audience = guide.audience ?? '';
  const url = `${SITE_URL}/guides/${slug}`;

  const seo = guide.seo ?? {};
  const primaryKeyword = seo.primaryKeyword ?? '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(title)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `type: "guide"`,
    publishedAt ? `publishedAt: ${yamlStr(publishedAt)}` : null,
    topic ? `topic: ${yamlStr(topic)}` : null,
    audience ? `audience: ${yamlStr(audience)}` : null,
    excerpt ? `excerpt: ${yamlStr(excerpt)}` : null,
    primaryKeyword ? `primaryKeyword: ${yamlStr(primaryKeyword)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const sections = [`# ${title}`];
  if (excerpt) sections.push(excerpt);
  if (topic) sections.push(`**Topic:** ${topic}`);
  if (audience) sections.push(`**Best for:** ${audience}`);

  const bodyMd = guide.body ? portableTextToMarkdown(guide.body) : '';
  if (bodyMd) sections.push(bodyMd);

  sections.push(`[Download this guide](${url})`);

  return fixEncoding(`${frontmatter}\n\n${sections.join('\n\n')}`.trim());
}

// ── Whitepaper → Markdown ─────────────────────────────────────────────────────

export function whitepaperToMarkdown(wp) {
  const slug = wp.slug?.current ?? '';
  const title = fixEncoding(wp.title ?? '');
  const excerpt = fixEncoding(wp.excerpt ?? '');
  const abstract = fixEncoding(wp.abstract ?? '');
  const publishedAt = wp.publishedAt ? wp.publishedAt.slice(0, 10) : '';
  const audience = wp.audience ?? '';
  const url = `${SITE_URL}/whitepapers/${slug}`;

  const seo = wp.seo ?? {};
  const primaryKeyword = seo.primaryKeyword ?? '';

  const authors = Array.isArray(wp.authors) && wp.authors.length > 0
    ? wp.authors.map(a => a.name).filter(Boolean).join(', ')
    : '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(title)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `type: "whitepaper"`,
    publishedAt ? `publishedAt: ${yamlStr(publishedAt)}` : null,
    authors ? `authors: ${yamlStr(authors)}` : null,
    audience ? `audience: ${yamlStr(audience)}` : null,
    excerpt ? `excerpt: ${yamlStr(excerpt)}` : null,
    primaryKeyword ? `primaryKeyword: ${yamlStr(primaryKeyword)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const sections = [`# ${title}`];
  if (abstract || excerpt) sections.push(abstract || excerpt);
  if (authors) sections.push(`**Authors:** ${authors}`);
  if (audience) sections.push(`**Best for:** ${audience}`);
  sections.push(`[Read whitepaper](${url})`);

  return fixEncoding(`${frontmatter}\n\n${sections.join('\n\n')}`.trim());
}

// ── Competitor Page → Markdown ────────────────────────────────────────────────

export function competitorToMarkdown(page) {
  const slug = page.slug?.current ?? '';
  const competitorName = page.competitorName ?? slug;
  const url = `${SITE_URL}/tesseract-vs/${slug}`;
  const heroHeading = page.heroHeading ?? `TesseractApps vs ${competitorName}`;
  const heroSubtitle = page.heroSubtitle ?? '';

  const frontmatter = [
    '---',
    `title: ${yamlStr(heroHeading)}`,
    `slug: ${yamlStr(slug)}`,
    `url: ${yamlStr(url)}`,
    `competitorName: ${yamlStr(competitorName)}`,
    heroSubtitle ? `excerpt: ${yamlStr(heroSubtitle)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const sections = [];

  sections.push(`# ${heroHeading}`);
  if (heroSubtitle) sections.push(heroSubtitle);

  if (page.aboutBody) {
    sections.push('## About TesseractApps');
    sections.push(fixEncoding(page.aboutBody.trim()));
    if (Array.isArray(page.aboutTrustBadges) && page.aboutTrustBadges.length > 0) {
      sections.push(`**Trust Badges:** ${page.aboutTrustBadges.join(', ')}`);
    }
  }

  // Comparison table(s)
  if (Array.isArray(page.comparisonCategories) && page.comparisonCategories.length > 0) {
    sections.push('## Feature Comparison');
    for (const cat of page.comparisonCategories) {
      if (cat.title) sections.push(`### ${cat.title}`);
      if (Array.isArray(cat.rows) && cat.rows.length > 0) {
        const header = `| Feature | TesseractApps | ${competitorName} |`;
        const sep = '|---|---|---|';
        const rows = cat.rows.map(row => {
          const feature = (row.feature ?? '').replace(/\|/g, '\\|');
          const us = row.us ? '✅ Yes' : '❌ No';
          const them = row.them === 'yes' ? '✅ Yes' : row.them === 'partial' ? '⚠️ Partial' : '❌ No';
          return `| ${feature} | ${us} | ${them} |`;
        });
        sections.push([header, sep, ...rows].join('\n'));
      }
    }
  }

  if (Array.isArray(page.switchSteps) && page.switchSteps.length > 0) {
    sections.push('## Why Switch?');
    sections.push(page.switchSteps.map((step, i) =>
      `${i + 1}. **${step.title}** — ${step.body ?? ''}`
    ).join('\n'));
  }

  if (Array.isArray(page.rightChoiceItems) && page.rightChoiceItems.length > 0) {
    sections.push(`## Is TesseractApps Right for You?`);
    sections.push(page.rightChoiceItems.map(i => `- ${i}`).join('\n'));
  }

  return `${frontmatter}\n\n${sections.join('\n\n')}`.trim();
}
