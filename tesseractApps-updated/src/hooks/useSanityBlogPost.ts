import { useEffect, useState } from 'react'
import { client } from '../sanity/lib/client'
import { BLOG_POST_BY_SLUG_QUERY } from '../sanity/lib/queries'
import { sanityConfigError } from '../sanity/env'
import { getSsgData, hasSsgData, ssgKeys } from '../sanity/lib/ssgData'
import type { BlogPostDocument } from '../types/sanityQueries'

// Module-level cache for client-side navigation between blog posts.
const cache = new Map<string, BlogPostDocument>()

type UseSanityBlogPostResult = {
  post: BlogPostDocument | null
  loading: boolean
  error: string | null
}

export function useSanityBlogPost(slug: string): UseSanityBlogPostResult {
  const ssgKey = ssgKeys.blogPost(slug)
  // Pre-rendered data (build time / hydration) avoids a loading skeleton.
  const initial = cache.get(slug) ?? getSsgData<BlogPostDocument>(ssgKey) ?? null
  const [post, setPost] = useState<BlogPostDocument | null>(() => initial)
  const [loading, setLoading] = useState(() => initial === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!client) {
      setPost(null)
      setLoading(false)
      setError(sanityConfigError ?? 'Sanity is not configured. Error loading blogs.')
      return
    }
    if (!slug) { setLoading(false); return }

    // Content already on screen from the build: refresh silently.
    const revalidate = !cache.has(slug) && hasSsgData(ssgKey)
    if (cache.has(slug)) {
      setPost(cache.get(slug)!)
      setLoading(false)
      return
    }

    let cancelled = false
    if (!revalidate) {
      setLoading(true)
      setError(null)
    }
    client
      .fetch<BlogPostDocument | null>(BLOG_POST_BY_SLUG_QUERY, { slug })
      .then((result) => {
        if (!cancelled) {
          if (result) cache.set(slug, result)
          setPost(result ?? null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        // A failed background refresh keeps the pre-rendered content.
        if (!cancelled && !revalidate) {
          setError(err instanceof Error ? err.message : 'Failed to load blog post')
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [slug, ssgKey])

  return { post, loading, error }
}
