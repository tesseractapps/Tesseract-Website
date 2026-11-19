import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { CAPABILITY_PAGE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import { getSsgData, hasSsgData, ssgKeys } from '../sanity/lib/ssgData'
import type { CapabilityPageDocument } from '../types/sanityQueries'

// Module-level cache, prevents redundant fetches when navigating back to a
// previously visited capability page within the same session.
const cache = new Map<string, CapabilityPageDocument>()

type UseSanityCapabilityPageResult = {
  page: CapabilityPageDocument | null
  loading: boolean
  error: string | null
}

export function useSanityCapabilityPage(slug: string): UseSanityCapabilityPageResult {
  const ssgKey = ssgKeys.capability(slug)
  // Pre-rendered data (build time / hydration) takes the place of a cache hit.
  const initial = cache.get(slug) ?? getSsgData<CapabilityPageDocument>(ssgKey) ?? null
  const [page, setPage] = useState<CapabilityPageDocument | null>(() => initial)
  const [loading, setLoading] = useState(() => initial === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setPage(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Cannot load capability page.')
      return
    }

    if (!slug) {
      setLoading(false)
      return
    }

    // Pre-rendered content is already on screen: refresh it once, silently,
    // so CMS edits made after the build still show up.
    const revalidate = !cache.has(slug) && hasSsgData(ssgKey)

    // Serve from cache immediately, no loading state shown on repeated visits
    if (cache.has(slug) && !revalidate) {
      setPage(cache.get(slug)!)
      setLoading(false)
      return
    }

    let cancelled = false

    if (!revalidate) {
      setLoading(true)
      setError(null)
    }

    client
      .fetch<CapabilityPageDocument | null>(CAPABILITY_PAGE_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setPage(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        // A failed background refresh keeps the pre-rendered content.
        if (!cancelled && !revalidate) {
          setError(err instanceof Error ? err.message : 'Failed to load capability page')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug, ssgKey])

  return { page, loading, error }
}
