import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { SOLUTION_PAGE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { SolutionPageDocument } from '../../sanity.types'

// Module-level cache, prevents redundant fetches when navigating back to a
// previously visited solution page within the same session.
const cache = new Map<string, SolutionPageDocument>()

type UseSanitySolutionPageResult = {
  page: SolutionPageDocument | null
  loading: boolean
  error: string | null
}

export function useSanitySolutionPage(slug: string): UseSanitySolutionPageResult {
  const [page, setPage] = useState<SolutionPageDocument | null>(
    () => cache.get(slug) ?? null
  )
  const [loading, setLoading] = useState(() => !cache.has(slug))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setPage(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Cannot load solution page.')
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
      .fetch<SolutionPageDocument | null>(SOLUTION_PAGE_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setPage(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load solution page')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { page, loading, error }
}
