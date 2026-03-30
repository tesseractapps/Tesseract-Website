import "./CapabilitiesListingStyles.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { useSanityCapabilityNav } from "../../hooks/useSanityCapabilityNav";
import type { CapabilityNavGroup } from "../../../sanity.types";

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Category groups ─────────────────────────────────────────────────────────

const GROUPS: CapabilityNavGroup[] = [
  "Workforce",
  "Participant & Care",
  "Finance",
  "Operational Intelligence",
];

// ── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="cpl-grid">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="cpl-skeleton-card">
          <div className="cpl-skeleton-strip" />
          <div className="cpl-skeleton-body">
            <div className="cpl-skeleton-line cpl-skeleton-line--badge" />
            <div className="cpl-skeleton-line cpl-skeleton-line--title" />
            <div className="cpl-skeleton-line cpl-skeleton-line--sub1" />
            <div className="cpl-skeleton-line cpl-skeleton-line--sub2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Component ───────────────────────────────────────────────────────────────

const CapabilitiesListing = () => {
  const { links, loading } = useSanityCapabilityNav();
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const navigate = useNavigate();

  const filtered =
    activeGroup === "All"
      ? links
      : links.filter((l) => l.navGroup === activeGroup);

  return (
    <div className="cpl-page">
      <SEO
        title="Platform Capabilities | TesseractApps"
        description="Explore every capability TesseractApps offers, from rostering and payroll to participant management and operational intelligence. Built for NDIS providers."
        url="https://www.tesseractapps.com.au/capabilities"
        canonical="https://www.tesseractapps.com.au/capabilities"
        type="website"
      />

      {/* ── Hero ── */}
      <div className="cpl-hero">
        <div className="cpl-hero-overlay" />
        <div className="cpl-hero-content">
          <div className="cpl-hero-label">PLATFORM</div>
          <h1 className="cpl-hero-title">Capabilities</h1>
          <p className="cpl-hero-subtitle">
            Everything your NDIS organisation needs, workforce, care, finance,
            and intelligence, in one connected platform.
          </p>
        </div>
      </div>

      <div className="cpl-outer">
        {/* ── Filters ── */}
        <div className="cpl-filters">
          <button
            type="button"
            className={`cpl-filter-btn${activeGroup === "All" ? " cpl-filter-btn--active" : ""}`}
            onClick={() => setActiveGroup("All")}
          >
            All
          </button>
          {GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              className={`cpl-filter-btn${activeGroup === group ? " cpl-filter-btn--active" : ""}`}
              onClick={() => setActiveGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>

        {/* ── States ── */}
        {loading && <SkeletonGrid />}

        {!loading && filtered.length === 0 && (
          <div className="cpl-empty">No capabilities found in this category.</div>
        )}

        {/* ── Cards grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="cpl-grid">
            {filtered.map((cap) => (
              <Link
                key={cap._id}
                to={`/capabilities/${cap.slug.current}`}
                className="cpl-card"
              >
                <div className="cpl-card-strip" />
                <div className="cpl-card-body">
                  <span className="cpl-card-group">{cap.navGroup}</span>
                  <h2 className="cpl-card-title">{cap.title}</h2>
                  {cap.heroSubtitle && (
                    <p className="cpl-card-subtitle">{cap.heroSubtitle}</p>
                  )}
                  <span className="cpl-card-arrow">
                    Explore <IconArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA Banner ── */}
      <section className="cpl-cta">
        <div className="cpl-cta-inner">
          <h2 className="cpl-cta-heading">
            See how TesseractApps works for your organisation.
          </h2>
          <p className="cpl-cta-sub">
            Your demo is configured for your care type, team size, and provider
            maturity stage. 30 minutes. Live platform, not a slide deck.
          </p>
    <div className="sll-cta-actions">
            <button
              type="button"
              className="sll-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="sll-btn-outline"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
          <p className="sll-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesListing;
