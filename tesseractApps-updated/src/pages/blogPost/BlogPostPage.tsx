import './BlogPostPageStyles.css'
import { useParams, Link } from 'react-router-dom'
import { useSanityBlogPost } from '../../hooks/useSanityBlogPost'
import { useSanityBlogList } from '../../hooks/useSanityBlogList'
import SEO from '../../components/common/SEO'
import SanityImage from '../../components/sanity/sanity-image'
import PortableTextRenderer from '../../components/sanity/portable-text'
import { urlFor } from '../../sanity/lib/image'
import { formatDate } from '../../utils/formatDate'
import { buildBreadcrumbSchema, buildGraphSchema } from '../../utils/schemaHelpers'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error } = useSanityBlogPost(slug ?? '')
  const { data: allPosts } = useSanityBlogList({ from: 0, to: 6 })

  if (loading) {
    return (
      <div className="bpp-page">
        <div className="bpp-skeleton-hero" />
        <div className="bpp-skeleton-outer">
          <div className="bpp-skeleton-header" />
          <div className="bpp-skeleton-grid">
            <div className="bpp-skeleton-block bpp-skeleton-article" />
            <div className="bpp-skeleton-sidebar">
              <div className="bpp-skeleton-sidebar-card" />
              <div className="bpp-skeleton-sidebar-card" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="bpp-page">
        <div className="bpp-not-found">
          {error ? (
            <>
              <h1>Can&apos;t load blog</h1>
              <p>
                Error loading blogs.{' '}
                <Link to="/blogs" className="bpp-back-link">Back to blog</Link>
              </p>
            </>
          ) : (
            <>
              <h1>Post not found</h1>
              <p>
                This post doesn&apos;t exist or has been unpublished.{' '}
                <Link to="/blogs" className="bpp-back-link">Back to blog</Link>
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  const seo = post.seo
  const siteUrl = 'https://tesseractapps.com.au'
  const postUrl = `${siteUrl}/blog/${post.slug?.current ?? ''}`

  const metaTitle = seo?.metaTitle ?? post.title ?? ''
  const metaDescription = seo?.metaDescription ?? post.excerpt ?? ''
  const ogTitle = seo?.openGraphTitle ?? metaTitle
  const ogDescription = seo?.openGraphDescription ?? metaDescription
  const ogImage =
    seo?.openGraphImage?.asset?.url ??
    (post.mainImage ? urlFor(post.mainImage).width(1200).height(630).auto('format').url() : undefined)
  const ogImageAlt = post.mainImage?.alt ?? post.title ?? ''

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blogs` },
    { name: post.title ?? '', url: postUrl },
  ])

  const blogPostingSchema = !seo?.schemaMarkup ? {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt,
    ...(post._updatedAt && { dateModified: post._updatedAt }),
    ...(post.mainImage && { image: ogImage }),
    ...(post.author?.name && {
      author: {
        '@type': 'Person',
        name: post.author.name,
        ...(post.author.linkedInUrl && { url: post.author.linkedInUrl }),
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'TesseractApps',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/tesseract_logo.webp` },
    },
    ...(post.category?.title && { articleSection: post.category.title }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(', ') }),
  } : null

  const structuredData = blogPostingSchema
    ? buildGraphSchema(blogPostingSchema, breadcrumbSchema)
    : buildGraphSchema(breadcrumbSchema)

  const validRelatedPosts = post.relatedPosts?.filter(
    (r) => r.slug?.current && r.slug.current.length > 0
  ) ?? []

  const suggestedPosts = allPosts
    .filter((p) => p.slug?.current && p.slug.current !== slug)
    .slice(0, 4)

  const hasHero = Boolean(post.mainImage)

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
        author={post.author?.name ?? undefined}
        section={post.category?.title ?? undefined}
        tags={post.tags ?? undefined}
        canonical={seo?.canonicalUrl ?? postUrl}
        noIndex={seo?.noIndex ?? false}
        schemaMarkup={seo?.schemaMarkup ?? undefined}
        structuredData={structuredData}
      />

      {/* Hero image */}
      {hasHero && (
        <div className="bpp-hero">
          <SanityImage
            src={post.mainImage!}
            alt={post.mainImage!.alt ?? post.title ?? ''}
            className="bpp-hero-image"
            width={1400}
            height={520}
            loading="eager"
          />
          <div className="bpp-hero-overlay" />
        </div>
      )}

      <div className="bpp-outer">
        {/* Header card, pulls up over hero */}
        <div className={`bpp-header${hasHero ? '' : ' bpp-header--no-hero'}`}>
          {post.category?.title && (
            <div className="bpp-category">{post.category.title}</div>
          )}

          <h1 className="bpp-title">{post.title}</h1>

          {post.excerpt && (
            <p className="bpp-excerpt">{post.excerpt}</p>
          )}

          <div className="bpp-meta">
            {post.author && (
              <div className="bpp-author">
                {post.author.avatar?.asset && (
                  <img
                    src={urlFor(post.author.avatar).width(40).height(40).fit('crop').auto('format').url()}
                    alt={post.author.avatar.alt ?? post.author.name ?? ''}
                    className="bpp-author-avatar"
                    width={40}
                    height={40}
                    loading="eager"
                  />
                )}
                <span className="bpp-author-name">{post.author.name}</span>
              </div>
            )}

            {post.publishedAt && (
              <>
                <span className="bpp-dot" aria-hidden="true" />
                <time dateTime={post.publishedAt} className="bpp-date">
                  {formatDate(post.publishedAt)}
                </time>
              </>
            )}

            {post.readingTime != null && (
              <>
                <span className="bpp-dot" aria-hidden="true" />
                <span className="bpp-reading-time">{post.readingTime} min read</span>
              </>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="bpp-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="bpp-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Two-column grid: article + sidebar */}
        <div className="bpp-grid">
          {/* Article body */}
          <article className="bpp-article">
            <div className="bpp-body">
              {post.body && <PortableTextRenderer value={post.body} />}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bpp-sidebar">
            {/* Author card */}
            {post.author && (
              <div className="bpp-sidebar-card">
                <p className="bpp-sidebar-card-title">Written by</p>
                <div className="bpp-sidebar-author">
                  {post.author.avatar?.asset && (
                    <img
                      src={urlFor(post.author.avatar).width(68).height(68).fit('crop').auto('format').url()}
                      alt={post.author.avatar.alt ?? post.author.name ?? ''}
                      className="bpp-sidebar-author-avatar"
                      width={68}
                      height={68}
                      loading="lazy"
                    />
                  )}
                  <p className="bpp-sidebar-author-name">{post.author.name}</p>
                  {post.author.linkedInUrl && (
                    <a
                      href={post.author.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bpp-sidebar-author-link"
                    >
                      View LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Article info */}
            <div className="bpp-sidebar-card">
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
            </div>

            {/* More articles */}
            {suggestedPosts.length > 0 && (
              <div className="bpp-sidebar-card">
                <p className="bpp-sidebar-card-title">More Articles</p>
                <ul className="bpp-sidebar-more-list">
                  {suggestedPosts.map((p) => (
                    <li key={p._id} className="bpp-sidebar-more-item">
                      <Link to={`/blog/${p.slug!.current}`} className="bpp-sidebar-more-link">
                        {p.mainImage?.asset && (
                          <img
                            src={urlFor(p.mainImage).width(64).height(64).fit('crop').auto('format').url()}
                            alt={p.mainImage.alt ?? p.title ?? ''}
                            className="bpp-sidebar-more-thumb"
                            width={64}
                            height={64}
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
              <Link to="/book-a-demo" className="bpp-sidebar-cta-btn">
                Book a Demo
              </Link>
            </div>
          </aside>
        </div>

        {/* Related posts */}
        {validRelatedPosts.length > 0 && (
          <section className="bpp-related">
            <h2 className="bpp-related-heading">Related Posts</h2>
            <div className="bpp-related-grid">
              {validRelatedPosts.map((related) => (
                <Link
                  key={related._id}
                  to={`/blog/${related.slug!.current}`}
                  className="bpp-related-card"
                >
                  {related.mainImage?.asset && (
                    <img
                      src={urlFor(related.mainImage).width(400).height(140).fit('crop').auto('format').url()}
                      alt={related.mainImage.alt ?? related.title ?? ''}
                      className="bpp-related-image"
                      width={400}
                      height={140}
                      loading="lazy"
                    />
                  )}
                  <div className="bpp-related-body">
                    <p className="bpp-related-title">{related.title}</p>
                    {related.publishedAt && (
                      <time dateTime={related.publishedAt} className="bpp-related-date">
                        {formatDate(related.publishedAt)}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="bpp-back">
          <Link to="/blogs" className="bpp-back-link">← Back to all posts</Link>
        </div>
      </div>
    </div>
  )
}
