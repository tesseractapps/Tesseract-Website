import './WhitepaperPageStyles.css'
import '../guides/GuidesStyles.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSanityWhitepaperPage } from '../../../hooks/useSanityWhitepaperPage'
import { useSanityWhitepapers } from '../../../hooks/useSanityWhitepapers'
import { useSanityGuides } from '../../../hooks/useSanityGuides'
import { useSanityBlogList } from '../../../hooks/useSanityBlogList'
import type { WhitepaperAuthor } from '../../../hooks/useSanityWhitepapers'
import SEO from '../../../components/common/SEO'
import Breadcrumb from '../../../components/common/Breadcrumb'
import GuideCard from '../../../components/guide/GuideCard'
import BlogCard from '../../../components/blog/BlogCard'
import WhitepaperCard from '../../../components/whitepapers/WhitepaperCard'
import { trackWhitepaperDownload } from '../../../utils/analytics'

// ── Blog-style stacked avatars + names ──────────────────────────────────────
function AuthorRow({ authors }: { authors: WhitepaperAuthor[] }) {
  if (!authors || authors.length === 0) return null

  return (
    <div className="wpp-author-row">
      <div className="wpp-author-avatars">
        {authors.slice(0, 4).map((a, i) => (
          <span key={a._id} className={`wpp-author-avatar-wrap wpp-author-avatar-wrap--${i}`}>
            {a.photo?.asset?.url ? (
              <img
                src={a.photo.asset.url}
                alt={a.photo.alt ?? a.name ?? ''}
                className="wpp-author-avatar-img"
                width={32} height={32}
                loading="eager"
              />
            ) : (
              <span className="wpp-author-avatar-img wpp-author-avatar-img--initials">
                {(a.name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            )}
          </span>
        ))}
      </div>
      <span className="wpp-author-names">
        {authors.map((a, i) => (
          <span key={a._id}>
            {i > 0 && (i === authors.length - 1 ? ' & ' : ', ')}
            {a.slug?.current ? (
              <Link to={`/humans/${a.slug.current}/`} className="wpp-author-name-link">
                {a.name?.split(' ')[0]}
              </Link>
            ) : (
              <span className="wpp-author-name-plain">{a.name?.split(' ')[0]}</span>
            )}
          </span>
        ))}
      </span>
    </div>
  )
}

// ── PDF viewer ───────────────────────────────────────────────────────────────
function PdfViewer({ url, title }: { url: string; title: string }) {
  return (
    <div className="wpp-pdf-viewer">
      <div className="wpp-pdf-toolbar">
        <span className="wpp-pdf-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="wpp-pdf-open"
          onClick={() => trackWhitepaperDownload(title)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        </a>
      </div>
      <iframe
        src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
        title={title}
        className="wpp-pdf-frame"
        loading="lazy"
      />
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonPage() {
  return (
    <div className="wpp-page">
      <div className="wpp-breadcrumb-wrap" />
      <div className="wpp-outer">
        <div className="wpp-grid">
          <div className="wpp-main">
            <div className="wpp-sk wpp-sk--badge" />
            <div className="wpp-sk wpp-sk--title" />
            <div className="wpp-sk wpp-sk--title2" />
            <div className="wpp-sk wpp-sk--line" />
            <div className="wpp-sk wpp-sk--line wpp-sk--line2" />
          </div>
          <aside className="wpp-sidebar">
            <div className="wpp-sk wpp-sk--cover" />
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function WhitepaperPage() {
  const { slug } = useParams<{ slug: string }>()
  const { whitepaper, loading, error } = useSanityWhitepaperPage(slug ?? '')
  const { data: allWhitepapers } = useSanityWhitepapers()
  const { data: guides } = useSanityGuides()
  const { data: blogPosts } = useSanityBlogList({ to: 3 })

  if (loading) return <SkeletonPage />

  if (error) {
    return (
      <div className="wpp-page">
        <div className="wpp-not-found">
          <h1>Unable to load whitepaper</h1>
          <p><Link to="/whitepapers/" className="wpp-back-link">← Back to whitepapers</Link></p>
        </div>
      </div>
    )
  }

  if (!whitepaper) return <Navigate to="/not-found/" replace />

  const siteUrl      = 'https://tesseractapps.com.au'
  const pageUrl      = `${siteUrl}/whitepapers/${whitepaper.slug?.current ?? ''}`
  const pdfUrl       = whitepaper.pdfFile?.asset?.url
  const coverUrl     = whitepaper.coverImage?.asset?.url
  const coverAlt     = whitepaper.coverImage?.alt ?? whitepaper.title
  const isComingSoon = whitepaper.status === 'coming_soon' || !pdfUrl

  const metaTitle       = whitepaper.seo?.metaTitle ?? whitepaper.title
  const metaDescription = whitepaper.seo?.metaDescription ?? whitepaper.excerpt ?? ''

  const publishDate = whitepaper.publishedAt
    ? new Date(whitepaper.publishedAt).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
    : null

  const authors: WhitepaperAuthor[] = whitepaper.authors ?? []

  const related = allWhitepapers
    .filter(w => w._id !== whitepaper._id && w.status !== 'coming_soon')
    .slice(0, 3)

  return (
    <div className="wpp-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={pageUrl}
        canonical={(whitepaper.seo as any)?.canonicalUrl ?? pageUrl}
        noIndex={(whitepaper.seo as any)?.noIndex ?? false}
        type="article"
        image={coverUrl}
      />

      {/* Breadcrumb */}
      <div className="wpp-breadcrumb-wrap">
        <Breadcrumb
          variant="dark"
          steps={[
            { name: 'Home', href: '/' },
            { name: 'Whitepapers', href: '/whitepapers' },
            { name: whitepaper.title },
          ]}
        />
      </div>

      <div className="wpp-outer">
        <div className="wpp-grid">

          {/* ── Main ── */}
          <div className="wpp-main">

            <h1 className="wpp-title">{whitepaper.title}</h1>

            {/* Byline: author row + date */}
            <div className="wpp-byline">
              <AuthorRow authors={authors} />
              <div className="wpp-byline-meta">
                {publishDate && (
                  <time className="wpp-byline-date">{publishDate}</time>
                )}
              </div>
            </div>

            <hr className="wpp-divider" />

            {/* Cover on mobile */}
            {coverUrl && (
              <div className="wpp-cover-mobile">
                <img src={coverUrl} alt={coverAlt} loading="eager" />
              </div>
            )}

            {/* Abstract */}
            {(whitepaper.abstract || whitepaper.excerpt) && (
              <section className="wpp-section">
                <p className="wpp-section-label">Abstract</p>
                <p className="wpp-abstract-text">{whitepaper.abstract ?? whitepaper.excerpt}</p>
              </section>
            )}

            {/* PDF viewer */}
            {!isComingSoon && pdfUrl && (
              <PdfViewer url={pdfUrl} title={whitepaper.title} />
            )}

            {isComingSoon && (
              <div className="wpp-coming-soon-notice">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c78ba" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                This whitepaper is being finalised. Check back shortly.
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="wpp-sidebar">
            {coverUrl && (
              <div className="wpp-cover-wrap">
                <img src={coverUrl} alt={coverAlt} className="wpp-cover" loading="eager" />
              </div>
            )}

            {!isComingSoon && pdfUrl && (
              <a
                href={pdfUrl}
                className="wpp-download-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhitepaperDownload(whitepaper.title)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
            )}
          </aside>
        </div>

        {/* More Whitepapers */}
        {related.length > 0 && (
          <section className="gdp-related">
            <h2 className="gdp-related-heading">More Whitepapers</h2>
            <div className="gd-grid">
              {related.map(wp => (
                <WhitepaperCard key={wp._id} whitepaper={wp} loading="lazy" />
              ))}
            </div>
          </section>
        )}

        {/* Free Guides */}
        {guides.filter(g => g.status === 'published').length > 0 && (
          <section className="gdp-related">
            <h2 className="gdp-related-heading">Free Guides</h2>
            <div className="gd-grid">
              {guides.filter(g => g.status === 'published').slice(0, 3).map(g => (
                <GuideCard key={g._id} guide={g} loading="lazy" />
              ))}
            </div>
          </section>
        )}

        {/* From the Blog */}
        {blogPosts.length > 0 && (
          <section className="gdp-related">
            <h2 className="gdp-related-heading">From the Blog</h2>
            <div className="gd-grid">
              {blogPosts.slice(0, 3).map(post => (
                <BlogCard key={post._id} post={post} loading="lazy" />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
