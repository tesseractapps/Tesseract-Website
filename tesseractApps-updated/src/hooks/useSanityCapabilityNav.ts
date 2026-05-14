import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { CAPABILITY_NAV_QUERY } from '../sanity/lib/queries'
import type { CapabilityNavLink } from '../../sanity.types'

// Module-level cache, fetched once per session, shared across all consumers.
let cachedLinks: CapabilityNavLink[] | null = null
let fetchPromise: Promise<CapabilityNavLink[]> | null = null

type UseSanityCapabilityNavResult = {
  links: CapabilityNavLink[]
  loading: boolean
}

export function useSanityCapabilityNav(): UseSanityCapabilityNavResult {
  const [links, setLinks] = useState<CapabilityNavLink[]>(() => cachedLinks ?? [])
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
