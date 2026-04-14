const SITE_URL = 'https://tesseractapps.com.au'

// ── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SoftwareSchemaOptions {
  name: string
  description: string
  features?: string[]
  price?: string
}

// ── Builders ─────────────────────────────────────────────────────────────────

/**
 * BreadcrumbList JSON-LD — pass into SEO structuredData prop.
 * Always include Home as the first item.
 */
export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

/**
 * FAQPage JSON-LD — pass into SEO structuredData prop.
 * Enables FAQ rich snippets in Google SERP.
 */
export const buildFAQSchema = (items: FAQItem[]) => ({
  '@context': 'https://schema.org',  // standalone — not used inside @graph
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
})

/**
 * SoftwareApplication JSON-LD for capability/product pages.
 */
export const buildSoftwareSchema = ({
  name,
  description,
  features = [],
  price = '39.99',
}: SoftwareSchemaOptions) => ({
  '@type': 'SoftwareApplication',
  name,
  description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  ...(features.length > 0 && { featureList: features }),
  offers: {
    '@type': 'Offer',
    price,
    priceCurrency: 'AUD',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TesseractApps',
    url: SITE_URL,
  },
})

export interface HowToStep {
  name: string
  text: string
}

/**
 * Speakable JSON-LD — marks CSS selectors containing voice-search-friendly content.
 * Used on homepage hero and FAQ sections.
 */
export const buildSpeakableSchema = (cssSelectors: string[]) => ({
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: cssSelectors,
  },
  url: SITE_URL,
})

/**
 * HowTo JSON-LD — structured step-by-step process.
 * Used on homepage Getting Started section.
 */
export const buildHowToSchema = (name: string, description: string, steps: HowToStep[]) => ({
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
})

/**
 * Wraps multiple schema objects into a single @graph container.
 * This lets you pass multiple schemas to the SEO component's
 * structuredData prop without any changes to SEO.tsx.
 *
 * Usage:
 *   structuredData={buildGraphSchema(breadcrumbSchema, softwareSchema)}
 */
export const buildGraphSchema = (...schemas: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': schemas,
})
