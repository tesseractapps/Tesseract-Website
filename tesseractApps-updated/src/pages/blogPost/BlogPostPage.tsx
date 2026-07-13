import './BlogPostPageStyles.css'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSanityBlogPost } from '../../hooks/useSanityBlogPost'
import { useSanityBlogList } from '../../hooks/useSanityBlogList'
import SEO from '../../components/common/SEO'
import PortableTextRenderer from '../../components/sanity/portable-text'
import { urlFor } from '../../sanity/lib/image'
import { formatDate } from '../../utils/formatDate'
import { extractHeadings } from '../../utils/extractHeadings'
import { buildBreadcrumbSchema, buildGraphSchema } from '../../utils/schemaHelpers'
import Breadcrumb from '../../components/common/Breadcrumb'
import BlogShareTools from '../../components/blog/BlogShareTools'
import BlogCard from '../../components/blog/BlogCard'
import SanityImage from '../../components/sanity/sanity-image'
import GuideCard from '../../components/guide/GuideCard'
import { useSanityGuides } from '../../hooks/useSanityGuides'
import '../resources/guides/GuidesStyles.css'
import BlogCtaBlock from '../../components/blog/BlogCtaBlock'
import { trackBlogPostView } from '../../utils/analytics'
import type { PostAuthor } from '../../types/sanityQueries'

// ── Author row component ───────────────────────────────────────────────────────

function AuthorRow({ authors }: { authors: PostAuthor[] }) {
  if (!authors || authors.length === 0) return null

  return (
    <div className="bpp-authors">
      {/* Stacked avatars */}
      <div className="bpp-authors-avatars">
        {authors.slice(0, 4).map((a, i) => (
          <span key={a._id} className={`bpp-authors-avatar-wrap bpp-authors-avatar-wrap--${i}`}>
            {a.photo?.asset ? (
              <img
                src={urlFor(a.photo).width(40).height(40).fit('crop').auto('format').url()}
                alt={a.photo.alt ?? a.name ?? ''}
                className="bpp-authors-avatar"
                width={40}
                height={40}
                loading="eager"
              />
            ) : (
              <span className="bpp-authors-avatar bpp-authors-avatar--initials">
                {(a.name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Names */}
      <span className="bpp-authors-names">
        {authors.map((a, i) => (
          <span key={a._id}>
            {i > 0 && (i === authors.length - 1 ? ' & ' : ', ')}
            {a.slug?.current ? (
              <Link to={`/humans/${a.slug.current}/`} className="bpp-authors-name-link">
                {a.name?.split(' ')[0]}
              </Link>
            ) : (
              <span className="bpp-authors-name">{a.name?.split(' ')[0]}</span>
            )}
          </span>
        ))}
      </span>
    </div>
  )
}

// ── TOC component ─────────────────────────────────────────────────────────────

function TableOfContents({ items }: { items: ReturnType<typeof extractHeadings> }) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    // Watch all heading elements; highlight whichever is closest to top
    const headingEls = items
      .map(h => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    )

    headingEls.forEach(el => observerRef.current!.observe(el))
    return () => observerRef.current?.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="bpp-toc" aria-label="Table of contents">
      <p className="bpp-toc-title">On this page</p>
      <ol className="bpp-toc-list">
        {items.map(item => (
          <li key={item.id} className={`bpp-toc-item bpp-toc-item--h${item.level}`}>
            <a
              href={`#${item.id}`}
              className={`bpp-toc-link${activeId === item.id ? ' bpp-toc-link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(item.id)
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 88
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error } = useSanityBlogPost(slug ?? '')
  const { data: allPosts } = useSanityBlogList({ from: 0, to: 6 })
  const { data: guides } = useSanityGuides()

  useEffect(() => {
    if (!post) return
    trackBlogPostView({
      title: post.title ?? '',
      slug: post.slug?.current ?? '',
      category: post.category?.title,
    })
  }, [post?.slug?.current])

  if (loading) {
    return (
      <div className="bpp-page">
        <div className="bpp-skeleton-outer">
          <div className="bpp-skeleton-grid">
            <div className="bpp-skeleton-toc" />
            <div className="bpp-skeleton-main">
              <div className="bpp-skeleton-header" />
              <div className="bpp-skeleton-block bpp-skeleton-article" />
            </div>
            <div className="bpp-skeleton-sidebar">
              <div className="bpp-skeleton-sidebar-card" />
              <div className="bpp-skeleton-sidebar-card" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bpp-page">
        <div className="bpp-not-found">
          <h1>Can&apos;t load blog</h1>
          <p>Error loading blog. <Link to="/blogs/" className="bpp-back-link">Back to blog</Link></p>
        </div>
      </div>
    )
  }

  if (!post) return <Navigate to="/not-found/" replace />

  const seo     = post.seo
  const siteUrl = 'https://tesseractapps.com.au'
  const postUrl = `${siteUrl}/blog/${post.slug?.current ?? ''}`

  const metaTitle       = seo?.metaTitle       ?? post.title   ?? ''
  const metaDescription = seo?.metaDescription ?? post.excerpt ?? ''
  const ogTitle         = seo?.openGraphTitle       ?? metaTitle
  const ogDescription   = seo?.openGraphDescription ?? metaDescription
  const ogImage =
    seo?.openGraphImage?.asset?.url ??
    (post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).auto('format').url() : undefined)
  const ogImageAlt = post.mainImage?.alt ?? post.title ?? ''

  // Authors array from the new schema field
  const authors: PostAuthor[] = (post as any).authors ?? []
  const primaryAuthor = authors[0] ?? null

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blogs` },
    { name: post.title ?? '', url: postUrl },
  ])

  const blogPostingSchema = !seo?.schemaMarkup ? {
    '@type': 'BlogPosting',
    headline:      post.title,
    description:   post.excerpt,
    url:           postUrl,
    inLanguage:    'en-AU',
    datePublished: post.publishedAt,
    ...(post._updatedAt && { dateModified: post._updatedAt }),
    ...(post.mainImage  && { image: ogImage }),
    ...(authors.length > 0 && {
      author: authors.map(a => ({
        '@type': 'Person',
        name:    a.name,
        ...(a.linkedInUrl && { url: a.linkedInUrl }),
      })),
    }),
    publisher: {
      '@type': 'Organization',
      name: 'TesseractApps',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/tesseract_logo.webp` },
    },
    ...(post.category?.title                           && { articleSection: post.category.title }),
    ...(post.tags && post.tags.length > 0              && { keywords: post.tags.join(', ') }),
  } : null

  const structuredData = blogPostingSchema
    ? buildGraphSchema(blogPostingSchema, breadcrumbSchema)
    : buildGraphSchema(breadcrumbSchema)

  const validRelatedPosts = post.relatedPosts?.filter(
    r => r != null && r.slug?.current && r.slug.current.length > 0
  ) ?? []

  const suggestedPosts = allPosts
    .filter(p => p.slug?.current && p.slug.current !== slug)
    .slice(0, 4)

  const tocItems = post.body ? extractHeadings(post.body as any[]) : []

  return (
    <div className="bpp-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        type="article"
        url={postUrl}
        image={ogImage}
        imageAlt={ogImageAlt}
        publishedAt={post.publishedAt ?? undefined}
        author={primaryAuthor?.name ?? undefined}
        section={post.category?.title ?? undefined}
        tags={post.tags ?? undefined}
        canonical={seo?.canonicalUrl ?? postUrl}
        noIndex={seo?.noIndex ?? false}
        schemaMarkup={seo?.schemaMarkup ?? undefined}
        structuredData={structuredData}
      />

      {/* Breadcrumb */}
      <div className="bpp-breadcrumb-wrap">
        <Breadcrumb
          variant="dark"
          steps={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blogs' },
            { name: post.title ?? '' },
          ]}
        />
      </div>

      <div className="bpp-outer">
        {/* ── Three-panel grid ── */}
        <div className="bpp-grid">

          {/* Panel 1: TOC (left, sticky) */}
          <div className="bpp-toc-panel">
            <TableOfContents items={tocItems} />
          </div>

          {/* Panel 2: Article (centre) */}
          <div className="bpp-main">
            {/* Hero image */}

            {/* Title */}
            <h1 className="bpp-title">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="bpp-excerpt">{post.excerpt}</p>
            )}

            {/* Author row + meta */}
            <div className="bpp-byline">
              <AuthorRow authors={authors} />
              <div className="bpp-byline-meta">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt} className="bpp-byline-date">
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                {post.readingTime != null && (
                  <>
                    <span className="bpp-byline-dot" aria-hidden="true" />
                    <span className="bpp-byline-reading">{post.readingTime} min read</span>
                  </>
                )}
                {/* {post.category?.title != null && (
                  <>
                    <span className="bpp-byline-dot" aria-hidden="true" />
                    <span className="bpp-byline-reading">{post.category.title}</span>
                  </>
                )} */}
              </div>
            </div>

            {post.mainImage && (
              <div className="bpp-featured-image-wrap">
                <SanityImage
                  src={post.mainImage}
                  alt={post.mainImage.alt ?? post.title ?? ''}
                  className="bpp-featured-image"
                  width={780}
                  height={439}
                  loading="eager"
                />
              </div>
            )}
            {/* Divider */}
            <hr className="bpp-divider" />

            {/* Article body */}
            <article className="bpp-article">
              <div className="bpp-body">
                {post.body && <PortableTextRenderer value={post.body} />}
              </div>
            </article>

            {/* Inline CTA block */}
            {(post as any).cta && ((post as any).cta.heading || (post as any).cta.primaryLabel) && (
              <BlogCtaBlock cta={(post as any).cta} />
            )}

            {/* Back link */}
            <div className="bpp-back">
              <Link to="/blogs/" className="bpp-back-link">← Back to all posts</Link>
            </div>
          </div>

          {/* Panel 3: Sidebar (right, sticky) */}
          <aside className="bpp-sidebar">

            {/* Author card(s) */}
            {/* {authors.length > 0 && (
              <div className="bpp-sidebar-card">
                <p className="bpp-sidebar-card-title">Written by</p>
                <div className="bpp-sidebar-authors">
                  {authors.map(a => (
                    <div key={a._id} className="bpp-sidebar-author">
                      {a.photo?.asset ? (
                        <img
                          src={urlFor(a.photo).width(48).height(48).fit('crop').auto('format').url()}
                          alt={a.photo.alt ?? a.name ?? ''}
                          className="bpp-sidebar-author-avatar"
                          width={48}
                          height={48}
                          loading="lazy"
                        />
                      ) : (
                        <span className="bpp-sidebar-author-avatar bpp-sidebar-author-avatar--initials">
                          {(a.name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <div className="bpp-sidebar-author-info">
                        {a.slug?.current ? (
                          <Link
                            to={`/humans/${a.slug.current}/`}
                            className="bpp-sidebar-author-name bpp-sidebar-author-name--link"
                          >
                            {a.name}
                          </Link>
                        ) : (
                          <span className="bpp-sidebar-author-name">{a.name}</span>
                        )}
                        {a.role && <span className="bpp-sidebar-author-role">{a.role}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Article info */}
            {/* <div className="bpp-sidebar-card">
              <p className="bpp-sidebar-card-title">Article info</p>
              <ul className="bpp-sidebar-info-list">
                {post.publishedAt && (
                  <li className="bpp-sidebar-info-item">
                    <span className="bpp-sidebar-info-label">Published</span>
                    <span className="bpp-sidebar-info-value">{formatDate(post.publishedAt)}</span>
                  </li>
                )}
                {post.readingTime != null && (
                  <li className="bpp-sidebar-info-item">
                    <span className="bpp-sidebar-info-label">Reading time</span>
                    <span className="bpp-sidebar-info-value">{post.readingTime} min</span>
                  </li>
                )}
                {post.category?.title && (
                  <li className="bpp-sidebar-info-item">
                    <span className="bpp-sidebar-info-label">Category</span>
                    <span className="bpp-sidebar-info-value">{post.category.title}</span>
                  </li>
                )}
              </ul>
            </div> */}

            {/* Share tools */}
            {post.body && (
              <BlogShareTools
                title={post.title ?? ''}
                url={postUrl}
                body={post.body}
                author={primaryAuthor?.name}
                publishedAt={post.publishedAt ?? undefined}
              />
            )}

            {/* More articles */}
            {suggestedPosts.length > 0 && (
              <div className="bpp-sidebar-card">
                <p className="bpp-sidebar-card-title">More Articles</p>
                <ul className="bpp-sidebar-more-list">
                  {suggestedPosts.map(p => (
                    <li key={p._id} className="bpp-sidebar-more-item">
                      <Link to={`/blog/${p.slug!.current}/`} className="bpp-sidebar-more-link">
                        {p.mainImage?.asset && (
                          <img
                            src={urlFor(p.mainImage).width(56).height(56).fit('crop').auto('format').url()}
                            alt={p.mainImage.alt ?? p.title ?? ''}
                            className="bpp-sidebar-more-thumb"
                            width={56}
                            height={56}
                            loading="lazy"
                          />
                        )}
                        <div className="bpp-sidebar-more-text">
                          <span className="bpp-sidebar-more-title">{p.title}</span>
                          {p.publishedAt && (
                            <span className="bpp-sidebar-more-date">{formatDate(p.publishedAt)}</span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="bpp-sidebar-cta">
              <p className="bpp-sidebar-cta-heading">Ready to transform your operations?</p>
              <p className="bpp-sidebar-cta-text">
                See how TesseractApps streamlines NDIS compliance and workforce management.
              </p>
              <Link to="/book-a-demo/" className="bpp-sidebar-cta-btn">Book a Demo</Link>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {validRelatedPosts.length > 0 && (
          <section className="bpp-related">
            <h2 className="bpp-related-heading">Related Posts</h2>
            <div className="bpp-related-grid">
              {validRelatedPosts.map(related => (
                <BlogCard key={related._id} post={related} />
              ))}
            </div>
          </section>
        )}

        {/* Free Guides */}
        {guides.filter(g => g.status === 'published').length > 0 && (
          <section className="bpp-related">
            <h2 className="bpp-related-heading">Free Guides</h2>
            <div className="gd-grid">
              {guides.filter(g => g.status === 'published').slice(0, 3).map(g => (
                <GuideCard key={g._id} guide={g} loading="lazy" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
