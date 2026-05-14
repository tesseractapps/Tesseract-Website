import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { BLOG_POST_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import type { BlogPostDocument } from '../../sanity.types'

type UseSanityBlogPostResult = {
  post: BlogPostDocument | null
  loading: boolean
  error: string | null
}

export function useSanityBlogPost(slug: string): UseSanityBlogPostResult {
  const [post, setPost] = useState<BlogPostDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setPost(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Error loading blogs.')
      return
    }

    if (!slug) {
      setLoading(false)
      return
    }

    let cancelled = false

    setLoading(true)
    setError(null)

    client
      .fetch<BlogPostDocument | null>(BLOG_POST_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          setPost(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load blog post')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { post, loading, error }
}
