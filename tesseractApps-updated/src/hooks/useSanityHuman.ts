import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { sanityConfigError } from '../sanity/env'
import type { HumanDocument } from '../types/sanityQueries'

const cache = new Map<string, HumanDocument>()

type Result = { human: HumanDocument | null; loading: boolean; error: string | null }

export function useSanityHuman(slug: string): Result {
  const [human, setHuman] = useState<HumanDocument | null>(() => cache.get(slug) ?? null)
  const [loading, setLoading] = useState(() => !cache.has(slug))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    if (cache.has(slug)) {
      setHuman(cache.get(slug)!)
      setLoading(false)
      return
    }

    if (!client) {
      setHuman(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity not configured')
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    client
      .fetch<HumanDocument | null>(
        `*[_type == "human" && slug.current == $slug][0] {
          _id, name, slug, role, department, bio, order,
          showInTeam, isBlogAuthor,
          linkedInUrl, twitterHandle, githubHandle, websiteUrl,
          photo {
            asset->{ _id, url, metadata { lqip, dimensions } },
            alt, hotspot, crop
          }
        }`,
        { slug }
      )
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setHuman(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load profile')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [slug])

  return { human, loading, error }
}
