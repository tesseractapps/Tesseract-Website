import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { getSsgData, ssgKeys } from '../sanity/lib/ssgData'
import { CAPABILITY_NAV_QUERY } from '../sanity/lib/queries'
import type { CapabilityNavLink } from '../types/sanityQueries'

// Module-level cache, fetched once per session, shared across all consumers.
let cachedLinks: CapabilityNavLink[] | null = null
let fetchPromise: Promise<CapabilityNavLink[]> | null = null

type UseSanityCapabilityNavResult = {
  links: CapabilityNavLink[]
  loading: boolean
}

export function useSanityCapabilityNav(): UseSanityCapabilityNavResult {
  const initial = cachedLinks ?? getSsgData<CapabilityNavLink[]>(ssgKeys.capabilityNav) ?? null
  const [links, setLinks] = useState<CapabilityNavLink[]>(() => initial ?? [])
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
      fetchPromise = client.fetch<CapabilityNavLink[]>(CAPABILITY_NAV_QUERY)
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
