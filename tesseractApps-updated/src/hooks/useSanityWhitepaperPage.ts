import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { WHITEPAPER_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { WhitepaperItem } from './useSanityWhitepapers'

type UseSanityWhitepaperPageResult = {
  whitepaper: WhitepaperItem | null
  loading: boolean
  error: string | null
}

export function useSanityWhitepaperPage(slug: string): UseSanityWhitepaperPageResult {
  const [whitepaper, setWhitepaper] = useState<WhitepaperItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setWhitepaper(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured.')
      return
    }

    if (!slug) {
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)
    setError(null)

    client
      .fetch<WhitepaperItem | null>(WHITEPAPER_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          setWhitepaper(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load whitepaper')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [slug])

  return { whitepaper, loading, error }
}
