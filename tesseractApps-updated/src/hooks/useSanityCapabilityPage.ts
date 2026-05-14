import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { CAPABILITY_PAGE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { CapabilityPageDocument } from '../../sanity.types'

// Module-level cache, prevents redundant fetches when navigating back to a
// previously visited capability page within the same session.
const cache = new Map<string, CapabilityPageDocument>()

type UseSanityCapabilityPageResult = {
  page: CapabilityPageDocument | null
  loading: boolean
  error: string | null
}

export function useSanityCapabilityPage(slug: string): UseSanityCapabilityPageResult {
  const [page, setPage] = useState<CapabilityPageDocument | null>(
    () => cache.get(slug) ?? null
  )
  const [loading, setLoading] = useState(() => !cache.has(slug))
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

    // Serve from cache immediately, no loading state shown on repeated visits
    if (cache.has(slug)) {
      setPage(cache.get(slug)!)
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)
    setError(null)

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
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load capability page')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { page, loading, error }
}
