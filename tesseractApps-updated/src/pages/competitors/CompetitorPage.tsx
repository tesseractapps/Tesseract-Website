import "./CompetitorPageStyles.css";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useSanityCompetitorPage } from "../../hooks/useSanityCompetitorPage";
import SEO from "../../components/common/SEO";
import { buildBreadcrumbSchema, buildGraphSchema } from "../../utils/schemaHelpers";
import Breadcrumb from "../../components/common/Breadcrumb";

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const IconCheckFill = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#10b981" />
    <polyline points="7 12.5 10.5 16 17 9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const IconXFill = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#f87171" />
    <line x1="8" y1="8" x2="16" y2="16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="16" y1="8" x2="8" y2="16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconMaybe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#e2e8f0" />
    <line x1="7" y1="12" x2="17" y2="12" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Skeleton ─────────────────────────────────────────────────────────────────

function CompetitorPageSkeleton() {
  return (
    <div id="cmp-page">
      <div className="cmp-skeleton-hero" />
      <div className="cmp-outer">
        <div className="cmp-skeleton-section">
          <div className="cmp-skeleton cmp-skeleton-label" />
          <div className="cmp-skeleton cmp-skeleton-heading" />
          <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--full" />
          <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--lg" />
          <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--md" />
        </div>
        <div className="cmp-skeleton-section">
          <div className="cmp-skeleton cmp-skeleton-label" />
          <div className="cmp-skeleton cmp-skeleton-heading" />
          <div className="cmp-skeleton-table">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="cmp-skeleton cmp-skeleton-row" />
            ))}
          </div>
        </div>
      </div>
      <div className="cmp-skeleton-cta" />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

const CompetitorPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { page, loading, error } = useSanityCompetitorPage(slug);
  const navigate = useNavigate();

  if (loading) return <CompetitorPageSkeleton />;

  if (error) {
    return (
      <div id="cmp-page">
        <div id="cmp-not-found">
          <h2>Unable to load this page</h2>
          <p>{error}</p>
          <Link to="/">Return to home</Link>
        </div>
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/not-found" replace />;
  }

  const metaTitle = page.seo?.metaTitle ?? `TesseractApps vs ${page.competitorName} | NDIS Software Comparison`;
  const metaDescription = page.seo?.metaDescription ?? page.heroSubtitle ?? "";
  const pageUrl = `https://tesseractapps.com.au/tesseract-vs/${slug}`;

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: "Home", url: "https://tesseractapps.com.au" },
      { name: "Comparisons", url: "https://tesseractapps.com.au/product" },
      { name: `TesseractApps vs ${page.competitorName}`, url: pageUrl },
    ])
  );

  return (
    <div id="cmp-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={pageUrl}
        canonical={page.seo?.canonicalUrl ?? pageUrl}
        noIndex={page.seo?.noIndex}
        schemaMarkup={page.seo?.schemaMarkup}
        structuredData={structuredData}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="cmp-hero">
        <div className="cmp-hero-orb cmp-hero-orb--1" aria-hidden="true" />
        <div className="cmp-hero-orb cmp-hero-orb--2" aria-hidden="true" />

        <div id="cmp-breadcrumb-wrap">
          <Breadcrumb
            variant="light"
            steps={[
              { name: "Home", href: "/" },
              { name: "Comparisons", href: "/product" },
              { name: `TesseractApps vs ${page.competitorName}` },
            ]}
          />
        </div>

        <div id="cmp-hero-inner">
          <div id="cmp-hero-text">
            <div className="cmp-hero-eyebrow">
              <span className="cmp-hero-eyebrow-dot" />
              NDIS Software Comparison
            </div>
            <h1 className="cmp-hero-heading">{page.heroHeading}</h1>
            {page.heroSubtitle && (
              <p className="cmp-hero-subtitle">{page.heroSubtitle}</p>
            )}
            {page.aboutTrustBadges && page.aboutTrustBadges.length > 0 && (
              <ul className="cmp-hero-bullets">
                {page.aboutTrustBadges.slice(0, 4).map((badge) => (
                  <li key={badge} className="cmp-hero-bullet">
                    <span className="cmp-hero-bullet-icon"><IconCheck /></span>
                    {badge}
                  </li>
                ))}
              </ul>
            )}
            <div className="cmp-hero-actions">
              <button type="button" className="cmp-btn-primary" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
                <span className="cmp-btn-arrow"><IconArrow /></span>
              </button>
              <button type="button" className="cmp-btn-ghost" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            <p className="cmp-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          </div>

          {/* Right: VS card */}
          <div id="cmp-hero-visual" aria-hidden="true">
            <div className="cmp-vs-card cmp-vs-card--us">
              <div className="cmp-vs-card-label">TesseractApps</div>
              <div className="cmp-vs-card-tag">NDIS-Native Platform</div>
            </div>
            <div className="cmp-vs-badge">VS</div>
            <div className="cmp-vs-card cmp-vs-card--them">
              <div className="cmp-vs-card-label">{page.competitorName}</div>
              <div className="cmp-vs-card-tag">Generic Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why providers choose TesseractApps ───────────────────────────── */}
      <section id="cmp-why">
        <div className="cmp-outer">
          <div className="cmp-section-kicker">
            {page.aboutHeading ?? `Why NDIS providers choose TesseractApps over ${page.competitorName}`}
          </div>

          {/* Award badges, only rendered if provided */}
          {page.awardBadges && page.awardBadges.length > 0 && (
            <div className="cmp-award-row">
              {page.awardBadges.map((b, i) => (
                <div key={i} className="cmp-award-badge">
                  <div className="cmp-award-badge-inner">
                    <span className="cmp-award-badge-label">{b.label}</span>
                    {b.sub && <span className="cmp-award-badge-sub">{b.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cmp-why-body">
            {page.aboutBody.split("\n\n").map((para, i) => (
              <p key={i} className="cmp-body-text">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table, only rendered if provided ─────────────────── */}
      {page.comparisonCategories && page.comparisonCategories.length > 0 && (
        <section id="cmp-table-section">
          <div className="cmp-outer">
            <div className="cmp-section-kicker">Feature-by-feature breakdown</div>
            <h2 className="cmp-section-heading">
              TesseractApps vs {page.competitorName}:<br />
              The full comparison
            </h2>

            {page.comparisonCategories.map((cat, ci) => (
              <div key={ci} className="cmp-compare-block">
                <div className="cmp-compare-block-header">
                  <span className="cmp-compare-block-num">{String(ci + 1).padStart(2, "0")}</span>
                  <h3 className="cmp-compare-block-title">{cat.title}</h3>
                </div>
                <div className="cmp-compare-table">
                  <div className="cmp-compare-table-head">
                    <div className="cmp-compare-col-feature">Details</div>
                    <div className="cmp-compare-col-us">
                      <span className="cmp-compare-col-name">TesseractApps</span>
                      <span className="cmp-compare-col-tier cmp-compare-col-tier--us">NDIS NATIVE</span>
                    </div>
                    <div className="cmp-compare-col-them">
                      <span className="cmp-compare-col-name cmp-compare-col-name--them">{page.competitorName}</span>
                      <span className="cmp-compare-col-tier cmp-compare-col-tier--them">STANDARD</span>
                    </div>
                  </div>
                  {cat.rows.map((row, ri) => (
                    <div key={ri} className={`cmp-compare-row${ri % 2 === 0 ? " cmp-compare-row--alt" : ""}`}>
                      <div className="cmp-compare-row-feature">{row.feature}</div>
                      <div className="cmp-compare-row-cell cmp-compare-row-cell--us">
                        {row.us ? <IconCheckFill /> : <IconXFill />}
                      </div>
                      <div className="cmp-compare-row-cell cmp-compare-row-cell--them">
                        {row.them === "yes" ? <IconCheckFill /> : row.them === "no" ? <IconXFill /> : <IconMaybe />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Right Choice checklist ───────────────────────────────────────── */}
      <section id="cmp-right-choice">
        <div className="cmp-outer">
          <div className="cmp-right-choice-inner">
            <div className="cmp-right-choice-left">
              {page.rightChoiceHeading && (
                <div className="cmp-section-kicker cmp-section-kicker--light">
                  {page.rightChoiceHeading}
                </div>
              )}
              <button type="button" className="cmp-btn-primary cmp-btn-primary--green" onClick={() => navigate("/book-a-demo")}>
                See it in action
                <span className="cmp-btn-arrow"><IconArrow /></span>
              </button>
            </div>
            <div className="cmp-right-choice-right">
              {page.rightChoiceItems.map((item, i) => (
                <div key={i} className="cmp-check-item">
                  <span className="cmp-check-item-icon"><IconCheckFill /></span>
                  <span className="cmp-check-item-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Switch steps, only rendered if provided ─────────────────────── */}
      {page.switchSteps && page.switchSteps.length > 0 && (
        <section id="cmp-switch">
          <div className="cmp-outer">
            <div className="cmp-section-kicker">Migrate from {page.competitorName}</div>
            <h2 className="cmp-section-heading cmp-section-heading--center">
              Switching to TesseractApps is straightforward
            </h2>
            <div className="cmp-switch-steps">
              {page.switchSteps.map((step, i) => (
                <div key={i} className="cmp-switch-step">
                  <div className="cmp-switch-step-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cmp-switch-step-body">
                    <h3 className="cmp-switch-step-title">{step.title}</h3>
                    {step.body && <p className="cmp-switch-step-text">{step.body}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section id="cmp-cta">
        <div className="cmp-outer">
          <div id="cmp-cta-inner">
            {page.ctaHeading && <h2 id="cmp-cta-heading">{page.ctaHeading}</h2>}
            {page.ctaDescription && (
              <p id="cmp-cta-sub">{page.ctaDescription}</p>
            )}
            <div id="cmp-cta-actions">
              <button type="button" className="cmp-btn-primary" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
                <span className="cmp-btn-arrow"><IconArrow /></span>
              </button>
              <button type="button" className="cmp-btn-outline" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            <div id="cmp-cta-links">
              <Link to="/book-a-demo" className="cmp-cta-link">Book a Provider Maturity Review</Link>
              <span className="cmp-cta-divider">·</span>
              <Link to="/signup" className="cmp-cta-link">Begin Your Journey</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompetitorPage;
