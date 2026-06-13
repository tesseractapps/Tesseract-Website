import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { GUIDES_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'

export interface GuideItem {
  _id: string
  title: string
  slug?: { current: string }
  status: 'published' | 'coming_soon'
  topic?: string
  excerpt?: string
  audience?: string
  publishedAt?: string
  featured?: boolean
  tags?: string[]
  coverImage?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } }
    alt?: string
  }
  seo?: { metaTitle?: string; metaDescription?: string }
}

export interface GuideFormConfig {
  submitButtonText?: string
  confirmationMessage?: string
  trustIndicators?: string[]
}

// pdfFile, formConfig, heroHeadline, heroSubheadline, body are only fetched on the individual page
export interface GuidePageItem extends GuideItem {
  heroHeadline?: string
  heroSubheadline?: string
  body?: unknown[]
  pdfFile?: { asset?: { _id: string; url: string } }
  formConfig?: GuideFormConfig
}

const cache = new Map<string, GuideItem[]>()
const CACHE_KEY = 'guides:all'

type UseSanityGuidesResult = {
  data: GuideItem[]
  loading: boolean
  error: string | null
}

export function useSanityGuides(): UseSanityGuidesResult {
  const [data, setData] = useState<GuideItem[]>(() => cache.get(CACHE_KEY) ?? [])
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
      .fetch<GuideItem[]>(GUIDES_QUERY)
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
          setError(err instanceof Error ? err.message : 'Failed to load guides')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
