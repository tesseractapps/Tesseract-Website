import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { SOLUTION_PAGE_NAV_QUERY } from '../sanity/lib/queries'
import type { SolutionNavLink } from '../../sanity.types'

// Module-level cache, fetched once per session, shared across all consumers.
let cachedLinks: SolutionNavLink[] | null = null
let fetchPromise: Promise<SolutionNavLink[]> | null = null

type UseSanitySolutionNavResult = {
  links: SolutionNavLink[]
  loading: boolean
}

export function useSanitySolutionNav(): UseSanitySolutionNavResult {
  const [links, setLinks] = useState<SolutionNavLink[]>(() => cachedLinks ?? [])
  const [loading, setLoading] = useState(() => cachedLinks === null)

  useEffect(() => {
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
