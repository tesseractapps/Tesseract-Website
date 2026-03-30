import "./SolutionsListingStyles.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { useSanitySolutionNav } from "../../hooks/useSanitySolutionNav";
import type { SolutionNavCategory } from "../../../sanity.types";

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Category groups ─────────────────────────────────────────────────────────

const CATEGORIES: { label: string; value: SolutionNavCategory }[] = [
  { label: "By Care Type", value: "BY CARE TYPE" },
  { label: "By Role", value: "BY ROLE" },
  { label: "By Stage", value: "BY STAGE" },
];

// ── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="sll-grid">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="sll-skeleton-card">
          <div className="sll-skeleton-strip" />
          <div className="sll-skeleton-body">
            <div className="sll-skeleton-line sll-skeleton-line--badge" />
            <div className="sll-skeleton-line sll-skeleton-line--title" />
            <div className="sll-skeleton-line sll-skeleton-line--sub1" />
            <div className="sll-skeleton-line sll-skeleton-line--sub2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Friendly category label ─────────────────────────────────────────────────

const friendlyLabel = (raw: SolutionNavCategory): string => {
  const found = CATEGORIES.find((c) => c.value === raw);
  return found?.label ?? raw;
};

// ── Component ───────────────────────────────────────────────────────────────

const SolutionsListing = () => {
  const { links, loading } = useSanitySolutionNav();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? links
      : links.filter((l) => l.navCategory === activeCategory);

  return (
    <div className="sll-page">
      <SEO
        title="Solutions | TesseractApps"
        description="Find the right TesseractApps solution for your care type, role, or growth stage. Purpose-built software for NDIS providers across Australia."
        url="https://www.tesseractapps.com.au/solutions"
        canonical="https://www.tesseractapps.com.au/solutions"
        type="website"
      />

      {/* ── Hero ── */}
      <div className="sll-hero">
        <div className="sll-hero-overlay" />
        <div className="sll-hero-content">
          <div className="sll-hero-label">SOLUTIONS</div>
          <h1 className="sll-hero-title">Solutions</h1>
          <p className="sll-hero-subtitle">
            Purpose-built for every care type, role, and growth stage, find the
            right fit for your NDIS organisation.
          </p>
        </div>
      </div>

      <div className="sll-outer">
        {/* ── Filters ── */}
        <div className="sll-filters">
          <button
            type="button"
            className={`sll-filter-btn${activeCategory === "All" ? " sll-filter-btn--active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {CATEGORIES.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              className={`sll-filter-btn${activeCategory === value ? " sll-filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── States ── */}
        {loading && <SkeletonGrid />}

        {!loading && filtered.length === 0 && (
          <div className="sll-empty">No solutions found in this category.</div>
        )}

        {/* ── Cards grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="sll-grid">
            {filtered.map((sol) => (
              <Link
                key={sol._id}
                to={`/solutions/${sol.slug.current}`}
                className="sll-card"
              >
                <div className="sll-card-strip" />
                <div className="sll-card-body">
                  <span className="sll-card-category">
                    {friendlyLabel(sol.navCategory)}
                  </span>
                  <h2 className="sll-card-title">{sol.title}</h2>
                  {sol.heroSubtitle && (
                    <p className="sll-card-subtitle">{sol.heroSubtitle}</p>
                  )}
                  <span className="sll-card-arrow">
                    Explore <IconArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA Banner ── */}
      <section className="sll-cta">
        <div className="sll-cta-inner">
          <h2 className="sll-cta-heading">
            Find the right solution for your organisation.
          </h2>
          <p className="sll-cta-sub">
            Whether you manage disability support, aged care, or allied health,
            we'll show you exactly how TesseractApps fits your operations.
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

export default SolutionsListing;
