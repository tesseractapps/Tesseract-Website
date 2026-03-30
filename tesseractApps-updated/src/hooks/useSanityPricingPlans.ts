import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { PRICING_PLANS_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { PricingPlan } from '../../sanity.types'

const cache = new Map<string, PricingPlan[]>()
const CACHE_KEY = 'pricing-plans'

type Result = { data: PricingPlan[]; loading: boolean; error: string | null }

export function useSanityPricingPlans(): Result {
  const [data, setData] = useState<PricingPlan[]>(() => cache.get(CACHE_KEY) ?? [])
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
      .fetch<PricingPlan[]>(PRICING_PLANS_QUERY)
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
          setError(err instanceof Error ? err.message : 'Failed to load pricing plans')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
