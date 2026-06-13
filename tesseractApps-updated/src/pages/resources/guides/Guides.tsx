import './GuidesStyles.css'
import { useState } from 'react'
import SEO from '../../../components/common/SEO'
import PageHero from '../../../components/common/PageHero'
import { useSanityGuides } from '../../../hooks/useSanityGuides'
import ResourceSearchModal from '../../../components/resourceSearch/ResourceSearchModal'
import type { ResourceSearchEntry } from '../../../components/resourceSearch/ResourceSearchModal'
import GuideCard from '../../../components/guide/GuideCard'

const SkeletonCard = () => (
  <div className="gd-skeleton-card" aria-hidden="true">
    <div className="gd-sk-thumb" />
    <div className="gd-sk-body">
      <div className="gd-sk gd-sk--badge" />
      <div className="gd-sk gd-sk--title" />
      <div className="gd-sk gd-sk--title2" />
      <div className="gd-sk gd-sk--line" />
      <div className="gd-sk gd-sk--line2" />
    </div>
  </div>
)

export default function Guides() {
  const { data: guides, loading, error } = useSanityGuides()
  const [searchOpen, setSearchOpen] = useState(false)
  const [topicFilter, setTopicFilter] = useState('All')

  const topics = ['All', ...Array.from(new Set(
    guides.map(g => g.topic).filter((t): t is string => Boolean(t))
  ))]

  const filtered = topicFilter === 'All'
    ? guides
    : guides.filter(g => g.topic === topicFilter)

  const searchEntries: ResourceSearchEntry[] = guides.map(g => ({
    id: g._id,
    title: g.title,
    subtitle: g.audience ? `Best for: ${g.audience}` : (g.excerpt ?? undefined),
    date: g.publishedAt ?? undefined,
    type: 'Guide',
    href: `/guides/${g.slug?.current ?? ''}`,
  }))

  return (
    <div>
      <SEO
        title="SIL & NDIS Guides | Free Checklists | TesseractApps"
        description="Download free SIL and NDIS guides, checklists, and toolkits. Practical resources for care providers, support coordinators, and compliance leads."
        url="https://tesseractapps.com.au/guides"
        canonical="https://tesseractapps.com.au/guides"
        type="website"
      />

      <PageHero
        label="Free Guides & Checklists"
        heading="Practical Tools for NDIS Providers"
        sub="Downloadable guides and checklists for SIL providers, support coordinators, and care leaders. Free, no paywall."
      >
        <button type="button" className="rsh-trigger" onClick={() => setSearchOpen(true)} aria-label="Search guides">
          <svg className="rsh-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="rsh-trigger-text">Search guides…</span>
        </button>
      </PageHero>

      <ResourceSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        entries={searchEntries}
        placeholder="Search guides…"
        latestLabel="Latest guides"
      />

      {/* Content */}
      <section id="gd-content">
        <div id="gd-outer">
          {/* Topic filter pills */}
          <div className="gd-filters">
            {topics.map(t => (
              <button
                key={t}
                type="button"
                className={`gd-filter-btn${topicFilter === t ? ' gd-filter-btn--active' : ''}`}
                onClick={() => setTopicFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {loading && (
            <div className="gd-grid">
              {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <p className="gd-state-message">Unable to load guides. Please try again later.</p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="gd-state-message">No guides found.</p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="gd-grid">
              {filtered.map(guide => (
                <GuideCard key={guide._id} guide={guide} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
