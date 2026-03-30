import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { COMPETITOR_PAGE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { CompetitorPageDocument } from '../../sanity.types'

// Module-level cache, prevents redundant fetches when navigating back to a
// previously visited competitor page within the same session.
const cache = new Map<string, CompetitorPageDocument>()

type UseSanityCompetitorPageResult = {
  page: CompetitorPageDocument | null
  loading: boolean
  error: string | null
}

export function useSanityCompetitorPage(slug: string): UseSanityCompetitorPageResult {
  const [page, setPage] = useState<CompetitorPageDocument | null>(
    () => cache.get(slug) ?? null
  )
  const [loading, setLoading] = useState(() => !cache.has(slug))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setPage(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Cannot load competitor page.')
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
      .fetch<CompetitorPageDocument | null>(COMPETITOR_PAGE_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setPage(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load competitor page')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { page, loading, error }
}
