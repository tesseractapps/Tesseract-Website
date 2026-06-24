import './BlogCardStyles.css'
import { Link } from 'react-router-dom'
import { urlFor } from '../../sanity/lib/image'
import { formatDate } from '../../utils/formatDate'

type CardAuthor = {
  _id?: string | null
  name?: string | null
  slug?: { current?: string } | null
  photo?: { asset?: { url?: string } | null; alt?: string | null } | null
}

// Minimal shape — accepts blog list items, related posts, or any post subset.
// All fields are optional so the card degrades gracefully with partial data.
export interface BlogCardPost {
  _id: string
  slug?: { current?: string } | null
  title?: string | null
  excerpt?: string | null
  publishedAt?: string | null
  readingTime?: number | null
  mainImage?: {
    asset?: { url?: string; metadata?: { lqip?: string } } | null
    alt?: string | null
  } | null
  /** Legacy single-author field — kept for backwards compat with relatedPosts */
  author?: CardAuthor | null
  /** Multi-author array from the blog list query */
  authors?: CardAuthor[] | null
}

interface BlogCardProps {
  post: BlogCardPost
  /** Override loading strategy. Defaults to 'lazy'. Use 'eager' for above-fold cards. */
  loading?: 'lazy' | 'eager'
}

export default function BlogCard({ post, loading = 'lazy' }: BlogCardProps) {
  const href = post.slug?.current ? `/blog/${post.slug.current}` : undefined

  return (
    <Link
      to={href ?? '/blogs'}
      className="bc-card"
      aria-label={post.title ?? 'Blog post'}
    >
      {/* ── Image ── */}
      <div className="bc-image-wrap">
        {post.mainImage?.asset ? (
          <img
            src={urlFor(post.mainImage).width(800).height(450).fit('crop').auto('format').quality(90).url()}
            srcSet={[
              urlFor(post.mainImage).width(480).height(270).fit('crop').auto('format').quality(90).url() + ' 480w',
              urlFor(post.mainImage).width(800).height(450).fit('crop').auto('format').quality(90).url() + ' 800w',
              urlFor(post.mainImage).width(1200).height(675).fit('crop').auto('format').quality(85).url() + ' 1200w',
            ].join(', ')}
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 800px, 800px"
            alt={post.mainImage.alt ?? post.title ?? 'Blog post'}
            className="bc-image"
            width={800}
            height={450}
            loading={loading}
          />
        ) : (
          <div className="bc-image bc-image--placeholder">
            <img
              src="/svg-logos/Full Logo Blue.svg"
              alt="TesseractApps"
              className="bc-image-logo"
            />
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="bc-body">
        {post.title && <h3 className="bc-title">{post.title}</h3>}
        {post.excerpt && <p className="bc-excerpt">{post.excerpt}</p>}

        {/* ── Footer: avatars · names · date · reading time ── */}
        <div className="bc-footer">
          {(() => {
            // Prefer the multi-author array; fall back to single author field
            const authorList = (post.authors && post.authors.length > 0)
              ? post.authors
              : post.author ? [post.author] : []
            if (authorList.length === 0) return null
            const visible = authorList.slice(0, 3)
            return (
              <div className="bc-author">
                <div className="bc-author-avatars">
                  {visible.map((a, i) => (
                    a.photo?.asset
                      ? <img
                          key={a._id ?? i}
                          src={urlFor(a.photo).width(36).height(36).fit('crop').auto('format').url()}
                          alt={a.photo.alt ?? a.name ?? 'Author'}
                          className="bc-author-avatar"
                          width={36}
                          height={36}
                          loading="lazy"
                        />
                      : <span
                          key={a._id ?? i}
                          className="bc-author-avatar bc-author-avatar--initials"
                        >
                          {(a.name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                  ))}
                </div>
                {/* <span className="bc-author-name">{names}</span> */}
              </div>
            )
          })()}

          <div className="bc-meta">
            {post.publishedAt && (
              
              <>
                <span className="bc-dot" aria-hidden="true" />
                <time dateTime={post.publishedAt} className="bc-date">
                {formatDate(post.publishedAt)}
              </time>
              </>
            )}
            {post.readingTime != null && (
              <>
                <span className="bc-dot" aria-hidden="true" />
                <span className="bc-read-time">{post.readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
