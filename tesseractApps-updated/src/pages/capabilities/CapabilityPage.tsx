import "./CapabilityPageStyles.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSanityCapabilityPage } from "../../hooks/useSanityCapabilityPage";
import SEO from "../../components/common/SEO";
import { buildBreadcrumbSchema, buildSoftwareSchema, buildGraphSchema } from "../../utils/schemaHelpers";

// ── Skeleton ────────────────────────────────────────────────────────────────

function CapabilityPageSkeleton() {
  return (
    <div id="cap-page">
      <div className="cap-skeleton-hero" />
      <div className="cap-outer">
        <div className="cap-skeleton-section">
          <div className="cap-skeleton cap-skeleton-label" />
          <div className="cap-skeleton cap-skeleton-heading" />
          <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--full" />
          <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--lg" />
          <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--md" />
        </div>
        <div className="cap-skeleton-section">
          <div className="cap-skeleton cap-skeleton-label" />
          <div className="cap-skeleton cap-skeleton-heading" />
          <div className="cap-skeleton-insight-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="cap-skeleton cap-skeleton-card" />
            ))}
          </div>
        </div>
        <div className="cap-skeleton-section">
          <div className="cap-skeleton cap-skeleton-label" />
          <div className="cap-skeleton cap-skeleton-heading" />
          <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--full" />
          <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--lg" />
        </div>
      </div>
    </div>
  );
}

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconQuote = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const IconBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────

const CapabilityPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { page, loading, error } = useSanityCapabilityPage(slug);
  const navigate = useNavigate();

  if (loading) return <CapabilityPageSkeleton />;

  if (error) {
    return (
      <div id="cap-page">
        <div id="cap-not-found">
          <h2>Unable to load page</h2>
          <p>{error}</p>
          <Link to="/">Return to homepage</Link>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div id="cap-page">
        <div id="cap-not-found">
          <h2>Capability not found</h2>
          <p>This capability page doesn't exist or hasn't been published yet.</p>
          <Link to="/">Return to homepage</Link>
        </div>
      </div>
    );
  }

  const metaTitle = page.seo?.metaTitle ?? `${page.heroHeading} | TesseractApps`;
  const metaDescription = page.seo?.metaDescription ?? page.heroSubtitle ?? "";
  const pageUrl = `https://tesseractapps.com.au/capabilities/${slug}`;

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: "Home", url: "https://tesseractapps.com.au" },
      { name: "Capabilities", url: "https://tesseractapps.com.au/product" },
      { name: page.title, url: pageUrl },
    ]),
    buildSoftwareSchema({
      name: `${page.heroHeading}, TesseractApps`,
      description: page.heroSubtitle ?? page.problemStatement ?? metaDescription,
      features: page.whatYouGet,
    })
  );

  // Split howWeSolveThis into sentences for the proof panel (first 3)
  const proofPoints = page.howWeSolveThis
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 20)
    .slice(0, 3);

  return (
    <div id="cap-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={pageUrl}
        canonical={page.seo?.canonicalUrl ?? pageUrl}
        noIndex={page.seo?.noIndex}
        schemaMarkup={page.seo?.schemaMarkup}
        structuredData={structuredData}
      />

      {/* ── Hero ── */}
      <section id="cap-hero">
        <div id="cap-hero-inner">
          <div className="cap-hero-tag">{page.navGroup}</div>
          <h1 className="cap-hero-heading">{page.heroHeading}</h1>
          {page.heroSubtitle && (
            <p className="cap-hero-sub">{page.heroSubtitle}</p>
          )}
          <div className="cap-hero-badges">
            <span className="cap-hero-badge">✓ NDIS Compliant</span>
            <span className="cap-hero-badge">✓ Salesforce Native</span>
            <span className="cap-hero-badge">✓ Australian Hosted</span>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="cap-section" id="cap-problem">
        <div className="cap-outer">
          <div className="cap-section-label">The Problem</div>
          <div className="cap-problem-block">
            <div className="cap-problem-quote-icon">
              <IconQuote />
            </div>
            <div className="cap-problem-text">
              {page.problemStatement.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Matters Most ── */}
      <section className="cap-section">
        <div className="cap-outer">
          <div className="cap-section-label">What Matters Most</div>
          <h2 className="cap-section-heading">What providers at your stage need to get right.</h2>
          <div className="cap-insight-grid">
            {page.whatMattersMost.map((item, i) => (
              <div key={item} className="cap-insight-card">
                <div className="cap-insight-num">{i + 1}</div>
                <div className="cap-insight-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Solve This ── */}
      <section className="cap-section cap-section--light">
        <div className="cap-outer">
          <div className="cap-section-label">How We Solve This</div>
          <h2 className="cap-section-heading">One connected solution, built for NDIS providers.</h2>
          <div className="cap-solve-layout">
            <div className="cap-solve-text">
              {page.howWeSolveThis.split("\n\n").map((para, i) => (
                <p key={i} className="cap-body-text">{para}</p>
              ))}
            </div>
            <div className="cap-solve-proof">
              <div className="cap-solve-proof-heading">Why it works</div>
              <ul className="cap-solve-proof-list">
                {proofPoints.map((point, i) => (
                  <li key={i} className="cap-solve-proof-item">
                    <span className="cap-solve-proof-dot" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="cap-section">
        <div className="cap-outer">
          <div className="cap-section-label">What You Get</div>
          <h2 className="cap-section-heading">Everything you need. Nothing you don't.</h2>
          <div className="cap-feature-cards">
            {page.whatYouGet.map((item) => (
              <div key={item} className="cap-feature-card">
                <span className="cap-feature-icon">
                  <IconCheck />
                </span>
                <span className="cap-feature-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Is This Right for You? ── */}
      <section className="cap-section cap-section--light">
        <div className="cap-outer">
          <div className="cap-section-label">Is This Right for You?</div>
          <h2 className="cap-section-heading">Answer yes to any of these, this is for you.</h2>
          <div className="cap-qualify-list">
            {page.isThisRightForYou.map((item) => (
              <div key={item} className="cap-qualify-item">
                <span className="cap-qualify-icon">
                  <IconBadge />
                </span>
                <span className="cap-qualify-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Capabilities ── */}
      {page.relatedCapabilities && page.relatedCapabilities.length > 0 && (
        <section id="cap-related">
          <div className="cap-outer">
            <div className="cap-section-label">See Also</div>
            <h2 className="cap-section-heading">Related capabilities.</h2>
            <div className="cap-related-grid">
              {page.relatedCapabilities.map((cap) => (
                <Link
                  key={cap._id}
                  to={`/capabilities/${cap.slug.current}`}
                  className="cap-related-card"
                >
                  <div className="cap-related-strip" />
                  <div className="cap-related-body">
                    <div className="cap-related-group">{cap.navGroup}</div>
                    <div className="cap-related-title">{cap.title}</div>
                    {cap.heroSubtitle && (
                      <div className="cap-related-sub">{cap.heroSubtitle}</div>
                    )}
                    <span className="cap-related-arrow">
                      Explore <IconArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section id="cap-cta">
        <div className="cap-outer">
          <div id="cap-cta-inner">
            <h2 id="cap-cta-heading">
              See how TesseractApps works for your organisation.
            </h2>
            <p id="cap-cta-sub">
              Your demo is configured for your care type, team size, and provider maturity stage.
              30 minutes. Live platform, not a slide deck.
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
        </div>
      </section>
    </div>
  );
};

export default CapabilityPage;
