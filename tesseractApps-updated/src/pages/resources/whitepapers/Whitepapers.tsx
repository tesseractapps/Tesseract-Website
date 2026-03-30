import "./WhitepapersStyles.css";
import SEO from "../../../components/common/SEO";
import { useSanityWhitepapers } from "../../../hooks/useSanityWhitepapers";

const SkeletonCard = () => (
  <article className="wp-card wp-card--skeleton" aria-hidden="true">
    <div className="wp-card-thumb wp-skeleton-thumb" />
    <div className="wp-card-body">
      <div className="wp-skeleton-badge" />
      <div className="wp-skeleton-title" />
      <div className="wp-skeleton-line" />
      <div className="wp-skeleton-line wp-skeleton-line--short" />
      <div className="wp-skeleton-audience" />
      <div className="wp-skeleton-cta" />
    </div>
  </article>
);

const Whitepapers = () => {
  const { data: whitepapers, loading, error } = useSanityWhitepapers();

  return (
    <div>
      <SEO
        title="Whitepapers & Research | NDIS Digital Transformation | TesseractApps"
        description="Download free whitepapers on NDIS digital transformation, workforce management best practices, and care sector innovation for 2025-2030."
      />

      {/* ── Hero ── */}
      <section id="wp-hero">
        <div id="wp-hero-inner">
          <div id="wp-hero-label">Whitepapers & Research</div>
          <h1 id="wp-hero-heading">Research and Decision Guides for Care Leaders</h1>
          <p id="wp-hero-sub">
            Free whitepapers on NDIS digital transformation, workforce management, and care sector
            innovation. Open any whitepaper directly, no form required.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section id="wp-content">
        <div id="wp-outer">
          <div id="wp-section-label">Available Downloads</div>
          <h2 id="wp-section-heading">Whitepaper library</h2>

          {/* Loading */}
          {loading && (
            <div className="wp-grid-layout">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="wp-state-message">
              Unable to load whitepapers at this time. Please try again later.
            </p>
          )}

          {/* Empty */}
          {!loading && !error && whitepapers.length === 0 && (
            <p className="wp-state-message">No whitepapers published yet. Check back soon.</p>
          )}

          {/* Grid */}
          {!loading && !error && whitepapers.length > 0 && (
            <div id="wp-grid">
              {whitepapers.map((wp) => {
                const pdfUrl = wp.pdfFile?.asset?.url;
                const coverUrl = wp.coverImage?.asset?.url;
                const coverAlt = wp.coverImage?.alt ?? `${wp.title} cover`;
                const isComingSoon = wp.status === "coming_soon" || !pdfUrl;
                const publishDate = wp.publishedAt
                  ? new Date(wp.publishedAt).toLocaleDateString("en-AU", {
                      month: "long",
                      year: "numeric",
                    })
                  : null;

                return (
                  <article key={wp._id} className="wp-card">
                    {coverUrl ? (
                      isComingSoon ? (
                        <div className="wp-card-thumb-link" aria-hidden="true">
                          <div className="wp-card-thumb">
                            <img src={coverUrl} alt={coverAlt} loading="lazy" />
                          </div>
                        </div>
                      ) : (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="wp-card-thumb-link"
                          aria-label={`Open ${wp.title}`}
                        >
                          <div className="wp-card-thumb">
                            <img src={coverUrl} alt={coverAlt} loading="lazy" />
                          </div>
                        </a>
                      )
                    ) : (
                      <div className="wp-card-thumb-link" aria-hidden="true">
                        <div className="wp-card-thumb wp-card-thumb--placeholder" />
                      </div>
                    )}

                    <div className="wp-card-body">
                      <div className="wp-card-meta-row">
                        {publishDate && <div className="wp-card-status">{publishDate}</div>}
                        {wp.featured && <div className="wp-card-featured">Featured</div>}
                      </div>
                      <h3 className="wp-card-title">{wp.title}</h3>
                      <p className="wp-card-description">
                        {wp.excerpt ?? "Practical guidance for care leaders planning the next stage of service delivery and operations."}
                      </p>

                      <div className="wp-card-footer">
                        <div className="wp-card-audience">
                          {wp.audience ? `Best for: ${wp.audience}` : "Best for: Operations and care teams"}
                        </div>

                        {!isComingSoon ? (
                          <a
                            href={pdfUrl}
                            className="wp-card-download"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Open PDF
                          </a>
                        ) : (
                          <span className="wp-card-download wp-card-download--disabled">Coming soon</span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Whitepapers;
