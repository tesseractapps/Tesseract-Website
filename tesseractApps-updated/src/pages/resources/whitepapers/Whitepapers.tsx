import "./WhitepapersStyles.css";
import { useState } from "react";
import SEO from "../../../components/common/SEO";
import PageHero from "../../../components/common/PageHero";
import { useSanityWhitepapers } from "../../../hooks/useSanityWhitepapers";
import WhitepaperCard from "../../../components/whitepapers/WhitepaperCard";
import ResourceSearchModal from "../../../components/resourceSearch/ResourceSearchModal";
import type { ResourceSearchEntry } from "../../../components/resourceSearch/ResourceSearchModal";

const Whitepapers = () => {
  const { data: whitepapers, loading, error } = useSanityWhitepapers();
  const [searchOpen, setSearchOpen] = useState(false);

  const searchEntries: ResourceSearchEntry[] = whitepapers.map((wp) => ({
    id: wp._id,
    title: wp.title,
    subtitle: wp.audience ? `Best for: ${wp.audience}` : (wp.excerpt ?? undefined),
    date: wp.publishedAt ?? undefined,
    type: 'Whitepaper',
    href: `/whitepapers/${wp.slug?.current ?? ''}`,
  }));

  return (
    <div className="wl-page">
      <SEO
        title="NDIS Whitepapers & Research | TesseractApps"
        description="Download free whitepapers on NDIS digital transformation, workforce management best practices, and care sector innovation for 2025–2030."
      />

      <PageHero
        label="Whitepapers & Research"
        heading="Research and Decision Guides for Care Leaders"
        sub="Free whitepapers on NDIS digital transformation, workforce management, and care sector innovation. Open any whitepaper directly, no form required."
      >
        <button type="button" className="rsh-trigger" onClick={() => setSearchOpen(true)} aria-label="Search whitepapers">
          <svg className="rsh-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="rsh-trigger-text">Search whitepapers…</span>
        </button>
      </PageHero>

      <ResourceSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        entries={searchEntries}
        placeholder="Search whitepapers…"
        latestLabel="Latest whitepapers"
      />

      <div className="wl-outer">
        <h2 className="wl-section-heading">Whitepaper library</h2>
        {loading && (
          <div className="wl-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="wl-skeleton-card">
                <div className="wl-skeleton-image" />
                <div className="wl-skeleton-body">
                  <div className="wl-skeleton-line wl-skeleton-line--title1" />
                  <div className="wl-skeleton-line wl-skeleton-line--title2" />
                  <div className="wl-skeleton-line wl-skeleton-line--ex1" />
                  <div className="wl-skeleton-line wl-skeleton-line--ex2" />
                  <div className="wl-skeleton-line wl-skeleton-line--ex3" />
                  <div className="wl-skeleton-footer">
                    <div className="wl-skeleton-line wl-skeleton-line--date" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="wl-empty">Unable to load whitepapers. Please try again later.</div>
        )}

        {!loading && !error && whitepapers.length === 0 && (
          <div className="wl-empty">No whitepapers published yet. Check back soon.</div>
        )}

        {!loading && !error && whitepapers.length > 0 && (
          <div className="wl-grid">
            {whitepapers.map((wp, i) => (
              <WhitepaperCard key={wp._id} whitepaper={wp} loading={i < 3 ? 'eager' : 'lazy'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Whitepapers;
