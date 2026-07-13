import "./BrochuresStyles.css";
import { useState } from "react";
import SEO from "../../../components/common/SEO";
import PageHero from "../../../components/common/PageHero";
import { useSanityBrochures } from "../../../hooks/useSanityBrochures";
import ResourceSearchModal from "../../../components/resourceSearch/ResourceSearchModal";
import type { ResourceSearchEntry } from "../../../components/resourceSearch/ResourceSearchModal";

const SkeletonCard = () => (
  <article className="br-card br-card--skeleton" aria-hidden="true">
    <div className="br-card-thumb br-skeleton-thumb" />
    <div className="br-card-body">
      <div className="br-skeleton-badge" />
      <div className="br-skeleton-title" />
      <div className="br-skeleton-line" />
      <div className="br-skeleton-line br-skeleton-line--short" />
      <div className="br-skeleton-cta" />
    </div>
  </article>
);

const Brochures = () => {
  const { data: brochures, loading, error } = useSanityBrochures();
  const [searchOpen, setSearchOpen] = useState(false);

  const searchEntries: ResourceSearchEntry[] = brochures.map((br) => ({
    id: br._id,
    title: br.title,
    subtitle: br.description ?? undefined,
    date: br.publishedAt ?? undefined,
    type: 'Brochure',
    href: `/brochures`,
    externalUrl: br.pdfFile?.asset?.url,
  }));

  return (
    <div>
      <SEO
        title="Brochures | TesseractApps"
        description="Download TesseractApps brochures covering our NDIS software platform, key features, and care management solutions."
      />

      <PageHero
        label="Brochures"
        heading="Product Brochures & Guides"
        sub="Download our brochures to explore TesseractApps features, platform capabilities, and care management solutions at a glance."
      >
        <button type="button" className="rsh-trigger" onClick={() => setSearchOpen(true)} aria-label="Search brochures">
          <svg className="rsh-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="rsh-trigger-text">Search brochures…</span>
        </button>
      </PageHero>

      <ResourceSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        entries={searchEntries}
        placeholder="Search brochures…"
        latestLabel="Latest brochures"
      />

      {/* ── Content ── */}
      <section id="br-content">
        <div id="br-outer">
          <div id="br-section-label">Available Downloads</div>
          <h2 id="br-section-heading">Brochure library</h2>

          {/* Loading */}
          {loading && (
            <div className="br-grid-layout">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="br-state-message">
              Unable to load brochures at this time. Please try again later.
            </p>
          )}

          {/* Empty */}
          {!loading && !error && brochures.length === 0 && (
            <p className="br-state-message">No brochures published yet. Check back soon.</p>
          )}

          {/* Grid */}
          {!loading && !error && brochures.length > 0 && (
            <div id="br-grid">
              {brochures.map((br) => {
                const pdfUrl = br.pdfFile?.asset?.url;
                const coverUrl = br.coverImage?.asset?.url;
                const coverAlt = br.coverImage?.alt ?? `${br.title} cover`;
                const isComingSoon = br.status === "coming_soon" || !pdfUrl;
                const publishDate = br.publishedAt
                  ? new Date(br.publishedAt).toLocaleDateString("en-AU", {
                      month: "long",
                      year: "numeric",
                    })
                  : null;

                return (
                  <article key={br._id} className="br-card">
                    {coverUrl ? (
                      isComingSoon ? (
                        <div className="br-card-thumb-link" aria-hidden="true">
                          <div className="br-card-thumb">
                            <img src={coverUrl} alt={coverAlt} loading="lazy" />
                          </div>
                        </div>
                      ) : (
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="br-card-thumb-link"
                          aria-label={`Open ${br.title}`}
                        >
                          <div className="br-card-thumb">
                            <img src={coverUrl} alt={coverAlt} loading="lazy" />
                          </div>
                        </a>
                      )
                    ) : (
                      <div className="br-card-thumb-link" aria-hidden="true">
                        <div className="br-card-thumb br-card-thumb--placeholder" />
                      </div>
                    )}

                    <div className="br-card-body">
                      <div className="br-card-meta-row">
                        {publishDate && <div className="br-card-date">{publishDate}</div>}
                        {br.featured && <div className="br-card-featured">Featured</div>}
                      </div>
                      <h3 className="br-card-title">{br.title}</h3>
                      <p className="br-card-description">
                        {br.description ?? "A guide to TesseractApps features and care management capabilities."}
                      </p>

                      <div className="br-card-footer">
                        {!isComingSoon ? (
                          <a
                            href={pdfUrl}
                            className="br-card-cta"
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
                            Download PDF
                          </a>
                        ) : (
                          <span className="br-card-cta br-card-cta--disabled">Coming soon</span>
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

export default Brochures;
