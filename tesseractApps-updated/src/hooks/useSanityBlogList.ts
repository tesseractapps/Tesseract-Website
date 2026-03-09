import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { BLOG_CATEGORY_QUERY, BLOG_LIST_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { BlogListItem } from '../../sanity.types'

// Module-level cache: prevents redundant fetches when multiple components
// (e.g. OurBlogComponent on homepage + Blog page) mount in the same session.
const cache = new Map<string, BlogListItem[]>()

type UseSanityBlogListParams = {
  category?: string
  from?: number
  to?: number
}

type UseSanityBlogListResult = {
  data: BlogListItem[]
  loading: boolean
  error: string | null
}

export function useSanityBlogList({
  category,
  from = 0,
  to = 100,
}: UseSanityBlogListParams = {}): UseSanityBlogListResult {
  const cacheKey = category ? `cat:${category}` : `list:${from}:${to}`

  const [data, setData] = useState<BlogListItem[]>(() => cache.get(cacheKey) ?? [])
  const [loading, setLoading] = useState(() => !cache.has(cacheKey))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setData([])
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Error loading blogs.')
      return
    }

    // Serve from cache immediately — no loading state shown on repeated mounts
    if (cache.has(cacheKey)) {
      setData(cache.get(cacheKey)!)
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)
    setError(null)

    const query = category ? BLOG_CATEGORY_QUERY : BLOG_LIST_QUERY
    const params: Record<string, unknown> = category
      ? { category }
      : { from, to }

    client
      .fetch<BlogListItem[]>(query, params)
      .then((result) => {
        if (!cancelled) {
          const items = result ?? []
          cache.set(cacheKey, items)
          setData(items)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load blog posts')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [cacheKey, category, from, to])

  return { data, loading, error }
}

/** Call this to bust the blog list cache (e.g. after a mutation in a future admin UI). */
export function invalidateBlogListCache(): void {
  cache.clear()
}
