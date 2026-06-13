import './GuidePageStyles.css'
import './GuidesStyles.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import GuideCard from '../../../components/guide/GuideCard'
import { useSanityGuidePage } from '../../../hooks/useSanityGuidePage'
import { useSanityGuides } from '../../../hooks/useSanityGuides'
import { useSanityBlogList } from '../../../hooks/useSanityBlogList'
import { useSanityWhitepapers } from '../../../hooks/useSanityWhitepapers'
import SEO from '../../../components/common/SEO'
import Breadcrumb from '../../../components/common/Breadcrumb'
import GuideAccessForm from '../../../components/guides/GuideAccessForm'
import BlogCard from '../../../components/blog/BlogCard'
import WhitepaperCard from '../../../components/whitepapers/WhitepaperCard'
import PortableTextRenderer from '../../../components/sanity/portable-text'
import type { BlockContentType } from '../../../../sanity.types'

function SkeletonPage() {
  return (
    <div className="gdp-page">
      <div className="gdp-breadcrumb-wrap" />
      <div className="gdp-outer">
        <div className="gdp-grid">
          <div className="gdp-main">
            <div className="gdp-sk gdp-sk--label" />
            <div className="gdp-sk gdp-sk--title" />
            <div className="gdp-sk gdp-sk--title2" />
            <div className="gdp-sk gdp-sk--line" />
            <div className="gdp-sk gdp-sk--line gdp-sk--line2" />
            <div className="gdp-sk gdp-sk--line" />
          </div>
          <aside className="gdp-sidebar">
            <div className="gdp-sk gdp-sk--cover" />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>()
  const { guide, loading, error } = useSanityGuidePage(slug ?? '')
  const { data: allGuides } = useSanityGuides()
  const { data: blogPosts } = useSanityBlogList({ to: 3 })
  const { data: whitepapers } = useSanityWhitepapers()

  if (loading) return <SkeletonPage />

  if (error) {
    return (
      <div className="gdp-page">
        <div className="gdp-not-found">
          <h1>Unable to load guide</h1>
          <p><Link to="/guides" className="gdp-back-link">← Back to guides</Link></p>
        </div>
      </div>
    )
  }

  if (!guide) return <Navigate to="/not-found" replace />

  const siteUrl      = 'https://tesseractapps.com.au'
  const pageUrl      = `${siteUrl}/guides/${guide.slug?.current ?? ''}`
  const pdfUrl       = guide.pdfFile?.asset?.url
  const coverUrl     = guide.coverImage?.asset?.url
  const coverAlt     = guide.coverImage?.alt ?? guide.title
  const isComingSoon = guide.status === 'coming_soon' || !pdfUrl

  const metaTitle       = guide.seo?.metaTitle ?? guide.title
  const metaDescription = guide.seo?.metaDescription ?? guide.excerpt ?? ''

  const publishDate = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  const related = allGuides
    .filter(g => g._id !== guide._id && g.status !== 'coming_soon')
    .slice(0, 3)

  const displayHeadline = guide.heroHeadline || guide.title

  return (
    <div className="gdp-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={pageUrl}
        canonical={(guide.seo as any)?.canonicalUrl ?? pageUrl}
        noIndex={(guide.seo as any)?.noIndex ?? false}
        type="article"
        image={coverUrl}
      />

      {/* Breadcrumb */}
      <div className="gdp-breadcrumb-wrap">
        <Breadcrumb
          variant="dark"
          steps={[
            { name: 'Home', href: '/' },
            { name: 'Guides', href: '/guides' },
            { name: guide.title },
          ]}
        />
      </div>

      <div className="gdp-outer">
        <div className="gdp-grid">

          {/* ── Main content ── */}
          <div className="gdp-main">
            {/* <div className="gdp-type-badge">
              {guide.topic ? `${guide.topic} · ` : ''}Free Guide
            </div> */}

            <h1 className="gdp-title">{displayHeadline}</h1>

            {guide.heroSubheadline && (
              <p className="gdp-hero-sub">{guide.heroSubheadline}</p>
            )}

            <div className="gdp-meta-row">
              {publishDate && (
                <span className="gdp-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {publishDate}
                </span>
              )}
            </div>

            <hr className="gdp-divider" />

            {/* Cover image on mobile (hidden on desktop — sidebar has it) */}
            {coverUrl && (
              <div className="gdp-cover-mobile">
                <img src={coverUrl} alt={coverAlt} loading="eager" />
              </div>
            )}

            {/* Rich body content from blockContent */}
            {guide.body && (guide.body as unknown[]).length > 0 ? (
              <div className="gdp-body">
                <PortableTextRenderer value={guide.body as BlockContentType} />
              </div>
            ) : guide.excerpt ? (
              <section>
                <h2 className="gdp-section-heading">About this guide</h2>
                <p className="gdp-description">{guide.excerpt}</p>
              </section>
            ) : null}
          </div>

          {/* ── Sidebar ── */}
          <aside className="gdp-sidebar">
            {coverUrl && (
              <div className="gdp-cover-wrap">
                <img src={coverUrl} alt={coverAlt} className="gdp-cover" loading="eager" />
              </div>
            )}
            <div className="gdp-form-card">
              <GuideAccessForm
                guideTitle={guide.title}
                pdfUrl={isComingSoon ? undefined : pdfUrl}
                isComingSoon={isComingSoon}
                formConfig={guide.formConfig}
              />
            </div>
          </aside>
        </div>

        {/* More Guides */}
        {related.length > 0 && (
          <section className="gdp-related">
            <h2 className="gdp-related-heading">More Guides</h2>
            <div className="gd-grid">
              {related.map(g => (
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

        {/* Whitepapers */}
        {whitepapers.length > 0 && (
          <section className="gdp-related">
            <h2 className="gdp-related-heading">Whitepapers &amp; Research</h2>
            <div className="gd-grid">
              {whitepapers.slice(0, 3).map(wp => (
                <WhitepaperCard key={wp._id} whitepaper={wp} loading="lazy" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
