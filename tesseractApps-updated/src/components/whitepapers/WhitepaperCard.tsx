import './WhitepaperCardStyles.css'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import type { WhitepaperItem } from '../../hooks/useSanityWhitepapers'

interface WhitepaperCardProps {
  whitepaper: WhitepaperItem
  loading?: 'lazy' | 'eager'
}

export default function WhitepaperCard({ whitepaper, loading = 'lazy' }: WhitepaperCardProps) {
  const href = `/whitepapers/${whitepaper.slug?.current ?? ''}`
  const coverUrl = whitepaper.coverImage?.asset?.url
  const coverAlt = whitepaper.coverImage?.alt ?? whitepaper.title

  return (
    <Link to={href} className="wc-card" aria-label={whitepaper.title}>
      {/* ── Image — 16:9 ── */}
      <div className="wc-image-wrap">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={coverAlt}
            className="wc-image"
            width={800}
            height={450}
            loading={loading}
          />
        ) : (
          <div className="wc-image wc-image--placeholder">
            <img
              src="/svg-logos/Full Logo Blue.svg"
              alt="TesseractApps"
              className="wc-image-logo"
            />
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="wc-body">
        <h3 className="wc-title">{whitepaper.title}</h3>

        {whitepaper.excerpt && (
          <p className="wc-excerpt">{whitepaper.excerpt}</p>
        )}

        {/* ── Footer ── */}
        <div className="wc-footer">
          {/* Stacked avatars */}
          {whitepaper.authors && whitepaper.authors.length > 0 && (
            <div className="wc-author">
              <div className="wc-author-avatars">
                {whitepaper.authors.slice(0, 3).map((a, i) => (
                  a.photo?.asset?.url
                    ? <img
                        key={a._id ?? i}
                        src={a.photo.asset.url}
                        alt={a.photo.alt ?? a.name ?? 'Author'}
                        className="wc-author-avatar"
                        width={25} height={25}
                        loading="lazy"
                      />
                    : <span key={a._id ?? i} className="wc-author-avatar wc-author-avatar--initials">
                        {(a.name ?? '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                ))}
              </div>
            </div>
          )}

          <div className="wc-meta">
            {whitepaper.publishedAt && (
              <>
                <span className="wc-dot" aria-hidden="true" />
                <time dateTime={whitepaper.publishedAt} className="wc-date">
                  {formatDate(whitepaper.publishedAt)}
                </time>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
