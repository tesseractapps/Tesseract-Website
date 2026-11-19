import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { GUIDE_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import { getSsgData, hasSsgData, ssgKeys } from '../sanity/lib/ssgData'
import type { GuidePageItem } from './useSanityGuides'

// Module-level cache for client-side navigation between guides.
const cache = new Map<string, GuidePageItem>()

type UseSanityGuidePageResult = {
  guide: GuidePageItem | null
  loading: boolean
  error: string | null
}

export function useSanityGuidePage(slug: string): UseSanityGuidePageResult {
  const ssgKey = ssgKeys.guide(slug)
  // Pre-rendered data (build time / hydration) avoids a loading skeleton.
  const initial = cache.get(slug) ?? getSsgData<GuidePageItem>(ssgKey) ?? null
  const [guide, setGuide] = useState<GuidePageItem | null>(() => initial)
  const [loading, setLoading] = useState(() => initial === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setGuide(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured.')
      return
    }
    if (!slug) { setLoading(false); return }

    // Content already on screen from the build: refresh silently.
    const revalidate = !cache.has(slug) && hasSsgData(ssgKey)
    if (cache.has(slug)) {
      setGuide(cache.get(slug)!)
      setLoading(false)
      return
    }

    let cancelled = false
    if (!revalidate) {
      setLoading(true)
      setError(null)
    }
    client
      .fetch<GuidePageItem | null>(GUIDE_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setGuide(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        // A failed background refresh keeps the pre-rendered content.
        if (!cancelled && !revalidate) {
          setError(err instanceof Error ? err.message : 'Failed to load guide')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [slug, ssgKey])

  return { guide, loading, error }
}
