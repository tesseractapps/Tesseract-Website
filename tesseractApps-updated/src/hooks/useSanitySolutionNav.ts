import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { getSsgData, ssgKeys } from '../sanity/lib/ssgData'
import { SOLUTION_PAGE_NAV_QUERY } from '../sanity/lib/queries'
import type { SolutionNavLink } from '../types/sanityQueries'

// Module-level cache, fetched once per session, shared across all consumers.
let cachedLinks: SolutionNavLink[] | null = null
let fetchPromise: Promise<SolutionNavLink[]> | null = null

type UseSanitySolutionNavResult = {
  links: SolutionNavLink[]
  loading: boolean
}

export function useSanitySolutionNav(): UseSanitySolutionNavResult {
  const initial = cachedLinks ?? getSsgData<SolutionNavLink[]>(ssgKeys.solutionNav) ?? null
  const [links, setLinks] = useState<SolutionNavLink[]>(() => initial ?? [])
  const [loading, setLoading] = useState(() => initial === null)

  useEffect(() => {
    // Pre-rendered links (if any) stay on screen while this fetch refreshes them.
    if (cachedLinks !== null) {
      setLinks(cachedLinks)
      setLoading(false)
      return
    }

    if (!client) {
      setLoading(false)
      return
    }

    let cancelled = false

    if (!fetchPromise) {
      fetchPromise = client.fetch<SolutionNavLink[]>(SOLUTION_PAGE_NAV_QUERY)
    }

    fetchPromise
      .then((result) => {
        cachedLinks = result ?? []
        if (!cancelled) {
          setLinks(cachedLinks)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { links, loading }
}
