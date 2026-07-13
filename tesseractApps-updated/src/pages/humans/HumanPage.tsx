import './HumanPageStyles.css'
import '../resources/guides/GuidesStyles.css'
import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useSanityHuman } from '../../hooks/useSanityHuman'
import { useSanityBlogList } from '../../hooks/useSanityBlogList'
import { useSanityGuides } from '../../hooks/useSanityGuides'
import { useSanityWhitepapers } from '../../hooks/useSanityWhitepapers'
import SEO from '../../components/common/SEO'
import Breadcrumb from '../../components/common/Breadcrumb'
import SanityImage from '../../components/sanity/sanity-image'
import BlogCard from '../../components/blog/BlogCard'
import GuideCard from '../../components/guide/GuideCard'
import WhitepaperCard from '../../components/whitepapers/WhitepaperCard'
import { urlFor } from '../../sanity/lib/image'
import { buildPersonSchema, buildGraphSchema, buildBreadcrumbSchema } from '../../utils/schemaHelpers'

const SITE_URL = 'https://tesseractapps.com.au'

type FilterType = 'All' | 'Blog' | 'Guide' | 'Whitepaper'

// ── Inline icons ──────────────────────────────────────────────────────────────

const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)

const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const IconGlobe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HumanPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { human, loading, error } = useSanityHuman(slug)
  const { data: allPosts } = useSanityBlogList({ from: 0, to: 100 })
  const { data: allGuides } = useSanityGuides()
  const { data: allWhitepapers } = useSanityWhitepapers()
  const [filter, setFilter] = useState<FilterType>('All')

  if (loading) return <HumanPageSkeleton />
  if (error || !human) return <Navigate to="/about/" replace />

  const pageUrl = `${SITE_URL}/humans/${slug}`
  const photoUrl = human.photo?.asset
    ? urlFor(human.photo).width(400).height(400).fit('crop').auto('format').url()
    : undefined

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Humans', url: `${SITE_URL}/humans` },
      { name: human.name ?? '', url: pageUrl },
    ]),
    buildPersonSchema({
      name: human.name ?? '',
      jobTitle: human.role,
      imageUrl: photoUrl,
      linkedInUrl: human.linkedInUrl,
    })
  )

  const authoredPosts = allPosts.filter(p => {
    if (!p.slug?.current) return false
    const post = p as any
    if (Array.isArray(post.authors) && post.authors.length > 0) {
      return post.authors.some((a: any) => a?.slug?.current === slug)
    }
    return post.author?.slug?.current === slug
  })

  const authoredGuides = allGuides.filter(
    g => g.status === 'published' && (g as any).author?.slug?.current === slug
  )

  const authoredWhitepapers = allWhitepapers.filter(wp =>
    Array.isArray((wp as any).authors) &&
    (wp as any).authors.some((a: any) => a?.slug?.current === slug)
  )

  const hasBlog = authoredPosts.length > 0
  const hasGuides = authoredGuides.length > 0
  const hasWhitepapers = authoredWhitepapers.length > 0
  const hasAny = hasBlog || hasGuides || hasWhitepapers
  const typeCount = [hasBlog, hasGuides, hasWhitepapers].filter(Boolean).length
  const showFilters = typeCount > 1

  const filterOptions: FilterType[] = [
    'All',
    ...(hasBlog ? ['Blog' as FilterType] : []),
    ...(hasGuides ? ['Guide' as FilterType] : []),
    ...(hasWhitepapers ? ['Whitepaper' as FilterType] : []),
  ]

  const initials = (human.name ?? '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="hp-page">
      <SEO
        title={`${human.name} — ${human.role} | TesseractApps`}
        description={human.bio ?? `${human.name} is ${human.role} at TesseractApps.`}
        url={pageUrl}
        structuredData={structuredData}
      />

      <div className="hp-breadcrumb-wrap">
        <Breadcrumb
          variant="dark"
          steps={[
            { name: 'Home', href: '/' },
            { name: 'Humans', href: '/humans' },
            { name: human.name ?? '' },
          ]}
        />
      </div>

      <div className="hp-layout">

        {/* ── Sidebar ── */}
        <aside className="hp-sidebar">
          {human.photo?.asset ? (
            <SanityImage
              src={human.photo}
              alt={human.photo.alt ?? human.name ?? ''}
              className="hp-avatar"
              width={120}
              height={120}
              loading="eager"
            />
          ) : (
            <div className="hp-avatar hp-avatar--initials" aria-hidden="true">
              {initials}
            </div>
          )}

          <h1 className="hp-name">{human.name}</h1>
          <p className="hp-role">{human.role}</p>
          {human.department && <span className="hp-dept">{human.department}</span>}

          {(human.linkedInUrl || human.twitterHandle || human.githubHandle || human.websiteUrl) && (
            <div className="hp-social">
              {human.linkedInUrl && (
                <a href={human.linkedInUrl} target="_blank" rel="noopener noreferrer" className="hp-social-link">
                  <span className="hp-social-icon"><IconLinkedIn /></span>
                  LinkedIn
                </a>
              )}
              {human.twitterHandle && (
                <a href={`https://x.com/${human.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="hp-social-link">
                  <span className="hp-social-icon"><IconX /></span>
                  @{human.twitterHandle}
                </a>
              )}
              {human.githubHandle && (
                <a href={`https://github.com/${human.githubHandle}`} target="_blank" rel="noopener noreferrer" className="hp-social-link">
                  <span className="hp-social-icon"><IconGitHub /></span>
                  {human.githubHandle}
                </a>
              )}
              {human.websiteUrl && (
                <a href={human.websiteUrl} target="_blank" rel="noopener noreferrer" className="hp-social-link">
                  <span className="hp-social-icon"><IconGlobe /></span>
                  Website
                </a>
              )}
            </div>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="hp-main">
          {human.bio && <p className="hp-bio">{human.bio}</p>}

          {hasAny && (
            <>
              {showFilters && (
                <div className="hp-filters">
                  {filterOptions.map(f => (
                    <button
                      key={f}
                      type="button"
                      className={`hp-filter-btn${filter === f ? ' hp-filter-btn--active' : ''}`}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}

              {(filter === 'All' || filter === 'Blog') && authoredPosts.length > 0 && (
                <div className="hp-posts-grid">
                  {authoredPosts.map(post => (
                    <BlogCard key={post._id} post={post} loading="lazy" />
                  ))}
                </div>
              )}

              {(filter === 'All' || filter === 'Guide') && authoredGuides.length > 0 && (
                <div className="hp-posts-grid">
                  {authoredGuides.map(g => (
                    <GuideCard key={g._id} guide={g} loading="lazy" />
                  ))}
                </div>
              )}

              {(filter === 'All' || filter === 'Whitepaper') && authoredWhitepapers.length > 0 && (
                <div className="hp-posts-grid">
                  {authoredWhitepapers.map(wp => (
                    <WhitepaperCard key={wp._id} whitepaper={wp} loading="lazy" />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function HumanPageSkeleton() {
  return (
    <div className="hp-page">
      <div className="hp-breadcrumb-wrap hp-skeleton hp-skeleton--breadcrumb" />
      <div className="hp-layout">
        <aside className="hp-sidebar">
          <div className="hp-skeleton hp-skeleton--avatar" />
          <div className="hp-skeleton hp-skeleton--name" />
          <div className="hp-skeleton hp-skeleton--role" />
          <div className="hp-skeleton hp-skeleton--dept" />
        </aside>
        <main className="hp-main">
          <div className="hp-skeleton hp-skeleton--bio" />
          <div className="hp-skeleton hp-skeleton--bio hp-skeleton--bio-short" />
        </main>
      </div>
    </div>
  )
}
