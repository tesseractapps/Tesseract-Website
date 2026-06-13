import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { GUIDE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { GuidePageItem } from './useSanityGuides'

type UseSanityGuidePageResult = {
  guide: GuidePageItem | null
  loading: boolean
  error: string | null
}

export function useSanityGuidePage(slug: string): UseSanityGuidePageResult {
  const [guide, setGuide] = useState<GuidePageItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setGuide(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured.')
      return
    }
    if (!slug) { setLoading(false); return }
    let cancelled = false
    setLoading(true)
    setError(null)
    client
      .fetch<GuidePageItem | null>(GUIDE_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          setGuide(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load guide')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [slug])

  return { guide, loading, error }
}
