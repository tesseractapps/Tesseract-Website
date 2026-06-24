// Types for GROQ query projections that don't map 1:1 onto a generated
// `sanity.types.ts` document type (narrowed/dereferenced fields, nav-menu
// projections, etc). Keep these in sync with the query shapes in
// `src/sanity/lib/queries.ts`.
import type { CapabilityPage, SolutionPage, Slug, BlockContent } from '../../sanity.types'

export type SanityImageObject = {
  asset?: {
    _id?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: { width?: number; height?: number; aspectRatio?: number }
    }
  }
  alt?: string
  caption?: string
  hotspot?: { x?: number; y?: number; height?: number; width?: number }
  crop?: { top?: number; bottom?: number; left?: number; right?: number }
}

// Capability mega-menu nav — CAPABILITY_NAV_QUERY
export type CapabilityNavGroup = NonNullable<CapabilityPage['navGroup']>
export type CapabilityNavLink = Pick<
  CapabilityPage,
  '_id' | 'title' | 'slug' | 'navGroup' | 'order' | 'navSubtitle' | 'heroSubtitle'
>

// Solution mega-menu nav — SOLUTION_PAGE_NAV_QUERY
export type SolutionNavCategory = NonNullable<SolutionPage['navCategory']>
export type SolutionNavLink = Pick<
  SolutionPage,
  '_id' | 'title' | 'slug' | 'navCategory' | 'order' | 'navSubtitle' | 'heroSubtitle'
>

// Dereferenced author — authorFragment / authorsFragment in queries.ts
export type PostAuthor = {
  _id: string
  _type?: 'human'
  name?: string
  slug?: Slug
  bio?: string
  role?: string
  linkedInUrl?: string
  twitterHandle?: string
  githubHandle?: string
  websiteUrl?: string
  photo?: SanityImageObject
}

// Human profile — ALL_HUMANS_QUERY / HUMAN_BY_SLUG_QUERY / TEAM_MEMBERS_QUERY
export type HumanDocument = PostAuthor & {
  department?:
    | 'Leadership'
    | 'Engineering'
    | 'Product'
    | 'Design'
    | 'Sales'
    | 'Marketing'
    | 'Operations'
    | 'Customer Success'
  order?: number
  showInTeam?: boolean
  isBlogAuthor?: boolean
}

// Blog card projection — BLOG_LIST_QUERY / BLOG_CATEGORY_QUERY
export type BlogListItem = {
  _id: string
  title?: string
  slug?: Slug
  excerpt?: string
  publishedAt?: string
  category?: {
    _id: string
    title?: string
    slug?: Slug
    description?: string
  }
  tags?: string[]
  readingTime?: number
  featured?: boolean
  mainImage?: SanityImageObject
  author?: PostAuthor
  authors?: PostAuthor[]
}

// Full post — BLOG_POST_BY_SLUG_QUERY
export type BlogPostDocument = {
  _id: string
  _updatedAt?: string
  title?: string
  slug?: Slug
  status?: 'draft' | 'published' | 'archived'
  authors?: PostAuthor[]
  category?: BlogListItem['category']
  tags?: string[]
  excerpt?: string
  publishedAt?: string
  mainImage?: SanityImageObject
  body?: BlockContent
  seo?: {
    metaTitle?: string
    metaDescription?: string
    openGraphTitle?: string
    openGraphDescription?: string
    openGraphImage?: { asset?: { url?: string } }
    canonicalUrl?: string
    noIndex?: boolean
    schemaMarkup?: string
  }
  readingTime?: number
  featured?: boolean
  cta?: {
    variant?: 'buttons' | 'subscribe'
    heading?: string
    body?: string
    primaryLabel?: string
    primaryUrl?: string
    secondaryLabel?: string
    secondaryUrl?: string
  }
  relatedPosts?: BlogListItem[]
}

type PageSeo = {
  metaTitle?: string
  metaDescription?: string
  openGraphTitle?: string
  openGraphDescription?: string
  openGraphImage?: { asset?: { url?: string } }
  canonicalUrl?: string
  noIndex?: boolean
  schemaMarkup?: string
}

// Full page — CAPABILITY_PAGE_BY_SLUG_QUERY (relatedCapabilities is dereferenced)
export type CapabilityPageDocument = Omit<CapabilityPage, 'relatedCapabilities' | 'seo'> & {
  relatedCapabilities?: Array<
    Pick<CapabilityPage, '_id' | 'title' | 'slug' | 'navGroup' | 'heroSubtitle'>
  >
  seo?: PageSeo
}

// Full page — SOLUTION_PAGE_BY_SLUG_QUERY (relatedSolutions is dereferenced)
export type SolutionPageDocument = Omit<SolutionPage, 'relatedSolutions' | 'seo'> & {
  relatedSolutions?: Array<
    Pick<SolutionPage, '_id' | 'title' | 'slug' | 'navCategory' | 'heroSubtitle'>
  >
  seo?: PageSeo
}
