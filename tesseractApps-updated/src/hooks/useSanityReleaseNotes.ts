import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { RELEASE_NOTES_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { ReleaseNote } from '../../sanity.types'

const cache = new Map<string, ReleaseNote[]>()
const CACHE_KEY = 'release-notes'

type Result = { data: ReleaseNote[]; loading: boolean; error: string | null }

export function useSanityReleaseNotes(): Result {
  const [data, setData] = useState<ReleaseNote[]>(() => cache.get(CACHE_KEY) ?? [])
  const [loading, setLoading] = useState(() => !cache.has(CACHE_KEY))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setData([])
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity not configured')
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
      .fetch<ReleaseNote[]>(RELEASE_NOTES_QUERY)
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
          setError(err instanceof Error ? err.message : 'Failed to load release notes')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
