import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { CLIENT_LOGOS_QUERY } from '../sanity/lib/queries'

export type SanityClientLogo = {
  _id: string
  name: string
  order: number
  logo: {
    asset: { _id: string; url: string }
    alt?: string
  }
}

let cache: SanityClientLogo[] | null = null

export function useSanityClientLogos() {
  const [logos, setLogos] = useState<SanityClientLogo[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return
    if (!client) { setLoading(false); return }

    client.fetch<SanityClientLogo[]>(CLIENT_LOGOS_QUERY).then((data) => {
      cache = data
      setLogos(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return { logos, loading }
}
