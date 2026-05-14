import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { TEAM_MEMBERS_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { TeamMember } from '../../sanity.types'

const cache = new Map<string, TeamMember[]>()
const CACHE_KEY = 'team-members'

type Result = { data: TeamMember[]; loading: boolean; error: string | null }

export function useSanityTeamMembers(): Result {
  const [data, setData] = useState<TeamMember[]>(() => cache.get(CACHE_KEY) ?? [])
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
      .fetch<TeamMember[]>(TEAM_MEMBERS_QUERY)
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
          setError(err instanceof Error ? err.message : 'Failed to load team members')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
