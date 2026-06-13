import { Link } from 'react-router-dom'
import type { GuideItem } from '../../hooks/useSanityGuides'

interface GuideCardProps {
  guide: GuideItem
  loading?: 'lazy' | 'eager'
}

export default function GuideCard({ guide, loading = 'lazy' }: GuideCardProps) {
  const coverUrl = guide.coverImage?.asset?.url
  const coverAlt = guide.coverImage?.alt ?? guide.title
  const href = `/guides/${guide.slug?.current ?? ''}`

  return (
    <Link to={href} className="gd-card">
      <div className="gd-card-thumb-wrap">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={coverAlt}
            className="gd-card-thumb"
            loading={loading}
          />
        ) : (
          <div className="gd-card-thumb--placeholder" />
        )}
      </div>
      <div className="gd-card-body">
        <h2 className="gd-card-title">{guide.title}</h2>
        {guide.excerpt && <p className="gd-card-excerpt">{guide.excerpt}</p>}
      </div>
    </Link>
  )
}
