import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useSanityGuides } from '../../../hooks/useSanityGuides'
import GuideCard from '../../../components/guide/GuideCard'
import '../../../pages/resources/guides/GuidesStyles.css'

const GuideSection = memo(() => {
  const { data: guides, loading } = useSanityGuides()

  const visible = guides
    .filter(g => g.status === 'published')
    .slice(0, 3)

  if (!loading && visible.length === 0) return null

  return (
    <section id="hv4-guides">
      <div className="hv4-section-inner">
        <div className="hv4-blog-header">
          <div>
            <div className="hv4-section-label">Free Guides</div>
            <h2 className="hv4-section-h2">Practical tools for NDIS providers.</h2>
          </div>
          <Link to="/guides/" className="outline-cta-dark">
            View all guides
          </Link>
        </div>

        {loading ? (
          <div className="hv4-blog-skeleton-row">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hv4-blog-skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="hv4-blog-grid">
            {visible.map(guide => (
              <GuideCard key={guide._id} guide={guide} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

GuideSection.displayName = 'GuideSection'
export default GuideSection
