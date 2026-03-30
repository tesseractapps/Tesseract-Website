import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { WHITEPAPERS_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'

export interface WhitepaperItem {
  _id: string
  title: string
  slug?: { current: string }
  status: 'published' | 'coming_soon'
  excerpt?: string
  audience?: string
  publishedAt?: string
  gated: boolean
  tags?: string[]
  featured?: boolean
  pdfFile?: { asset?: { _id: string; url: string } }
  coverImage?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } }
    alt?: string
  }
  seo?: { metaTitle?: string; metaDescription?: string }
}

// Module-level cache, prevents redundant fetches across remounts
const cache = new Map<string, WhitepaperItem[]>()
const CACHE_KEY = 'whitepapers:all'

type UseSanityWhitepapersResult = {
  data: WhitepaperItem[]
  loading: boolean
  error: string | null
}

export function useSanityWhitepapers(): UseSanityWhitepapersResult {
  const [data, setData] = useState<WhitepaperItem[]>(() => cache.get(CACHE_KEY) ?? [])
  const [loading, setLoading] = useState(() => !cache.has(CACHE_KEY))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setData([])
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured.')
      return
    }

    if (cache.has(CACHE_KEY)) {
      setData(cache.get(CACHE_KEY)!)
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)
    setError(null)

    client
      .fetch<WhitepaperItem[]>(WHITEPAPERS_QUERY)
      .then((result) => {
        if (!cancelled) {
          const items = result ?? []
          cache.set(CACHE_KEY, items)
          setData(items)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load whitepapers')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
