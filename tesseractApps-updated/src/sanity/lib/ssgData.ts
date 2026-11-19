// Build-time Sanity data for pre-rendering.
//
// During SSG, main.tsx calls prefetchSanityForRoute() before each route renders,
// so data hooks can render real content into the static HTML instead of a
// skeleton. vite.config.ts serialises the same data into the page as
// window.__SANITY_SSG__, and the client seeds it before hydration so the first
// client render matches the server HTML. Hooks then revalidate once in the
// background so CMS edits still appear without a rebuild.

import { client } from './client'
import {
  BLOG_POST_BY_SLUG_QUERY,
  CAPABILITY_NAV_QUERY,
  CAPABILITY_PAGE_BY_SLUG_QUERY,
  COMPETITOR_PAGE_BY_SLUG_QUERY,
  GUIDES_QUERY,
  GUIDE_BY_SLUG_QUERY,
  SOLUTION_PAGE_BY_SLUG_QUERY,
  SOLUTION_PAGE_NAV_QUERY,
} from './queries'

export type SsgData = Record<string, unknown>

export const SSG_WINDOW_KEY = '__SANITY_SSG__'

export const ssgKeys = {
  capabilityNav: 'capabilityNav',
  solutionNav: 'solutionNav',
  guides: 'guides:all',
  capability: (slug: string) => `capability:${slug}`,
  solution: (slug: string) => `solution:${slug}`,
  competitor: (slug: string) => `competitor:${slug}`,
  guide: (slug: string) => `guide:${slug}`,
  blogPost: (slug: string) => `blogPost:${slug}`,
}

const store: SsgData = {}

export function seedSsgData(data: SsgData | undefined | null): void {
  if (data && typeof data === 'object') Object.assign(store, data)
}

/** Build time: the store holds exactly one route's data while it renders. */
export function replaceSsgData(data: SsgData): void {
  for (const key of Object.keys(store)) delete store[key]
  seedSsgData(data)
}

/** Client: load the data the build serialised into the page. */
export function seedSsgDataFromWindow(): void {
  if (typeof window === 'undefined') return
  seedSsgData((window as unknown as Record<string, SsgData | undefined>)[SSG_WINDOW_KEY])
}

export function getSsgData<T>(key: string): T | undefined {
  const value = store[key]
  return value === undefined || value === null ? undefined : (value as T)
}

/**
 * Client only: true when this key's content came from the build. A hook whose
 * cache is still empty should then refetch silently (keeping the pre-rendered
 * content on screen, no loading state) so CMS edits made after the build appear.
 */
export function hasSsgData(key: string): boolean {
  return typeof window !== 'undefined' && getSsgData(key) !== undefined
}

const PREFETCH_TIMEOUT_MS = 15000

async function fetchOrNull<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!client) return null
  try {
    return await Promise.race([
      client.fetch<T>(query, params),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), PREFETCH_TIMEOUT_MS)),
    ])
  } catch (err) {
    console.warn(`[ssg] Sanity prefetch failed: ${err instanceof Error ? err.message : err}`)
    return null
  }
}

// Routes with their own hand-built pages (not the Sanity slug templates).
const NON_TEMPLATE_ROUTES = new Set([
  '/capabilities/learning-management',
  '/capabilities/workflow-engine',
  '/solutions/support-coordination',
])

/** Build time: fetch the Sanity data a route renders. Returns only that route's data. */
export async function prefetchSanityForRoute(routePath: string): Promise<SsgData> {
  const path = routePath.replace(/\/$/, '') || '/'
  const data: SsgData = {}
  const add = async (key: string, query: string, params?: Record<string, string>) => {
    const result = await fetchOrNull<unknown>(query, params)
    if (result !== null && result !== undefined) data[key] = result
  }

  const jobs: Promise<void>[] = [
    // Navbar + footer render these on every page.
    add(ssgKeys.capabilityNav, CAPABILITY_NAV_QUERY),
    add(ssgKeys.solutionNav, SOLUTION_PAGE_NAV_QUERY),
  ]

  const slugOf = (prefix: string) =>
    path.startsWith(prefix) && !path.slice(prefix.length).includes('/') ? path.slice(prefix.length) : null

  if (!NON_TEMPLATE_ROUTES.has(path)) {
    const cap = slugOf('/capabilities/')
    if (cap) jobs.push(add(ssgKeys.capability(cap), CAPABILITY_PAGE_BY_SLUG_QUERY, { slug: cap }))
    const sol = slugOf('/solutions/')
    if (sol) jobs.push(add(ssgKeys.solution(sol), SOLUTION_PAGE_BY_SLUG_QUERY, { slug: sol }))
  }
  const comp = slugOf('/tesseract-vs/')
  if (comp) jobs.push(add(ssgKeys.competitor(comp), COMPETITOR_PAGE_BY_SLUG_QUERY, { slug: comp }))
  const guide = slugOf('/guides/')
  if (guide) jobs.push(add(ssgKeys.guide(guide), GUIDE_BY_SLUG_QUERY, { slug: guide }))
  const post = slugOf('/blog/')
  if (post) jobs.push(add(ssgKeys.blogPost(post), BLOG_POST_BY_SLUG_QUERY, { slug: post }))
  if (path === '/guides' || guide || post) jobs.push(add(ssgKeys.guides, GUIDES_QUERY))

  await Promise.all(jobs)
  return data
}
