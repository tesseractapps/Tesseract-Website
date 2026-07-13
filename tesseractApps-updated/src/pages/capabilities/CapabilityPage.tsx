import "./CapabilityPageStyles.css";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSanityCapabilityPage } from "../../hooks/useSanityCapabilityPage";
import { useSanityBlogList } from "../../hooks/useSanityBlogList";
import SEO from "../../components/common/SEO";
import { trackCapabilityView } from "../../utils/analytics";
import { buildBreadcrumbSchema, buildSoftwareSchema, buildGraphSchema } from "../../utils/schemaHelpers";
import Breadcrumb from "../../components/common/Breadcrumb";
import PortableTextRenderer from "../../components/sanity/portable-text";
import BlogCard from "../../components/blog/BlogCard";

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
  const { data: blogPosts } = useSanityBlogList({ from: 0, to: 100 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!page) return;
    trackCapabilityView({ name: page.title ?? "", slug });
  }, [slug, page?.title]);

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
    return <Navigate to="/not-found/" replace />;
  }

  const metaTitle = page.seo?.metaTitle ?? `${page.heroHeading} | TesseractApps`;
  const metaDescription = page.seo?.metaDescription ?? page.heroSubtitle ?? "";
  const pageUrl = `https://tesseractapps.com.au/capabilities/${slug}`;

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: "Home", url: "https://tesseractapps.com.au" },
      { name: "Capabilities", url: "https://tesseractapps.com.au/product" },
      { name: page.title ?? "", url: pageUrl },
    ]),
    buildSoftwareSchema({
      name: `${page.heroHeading}, TesseractApps`,
      description: page.heroSubtitle ?? metaDescription,
      features: page.whatYouGet,
    })
  );

  // Extract plain text from a Portable Text block array (blocks only, skip images etc.)
  const blocksToPlainText = (blocks: typeof page.howWeSolveThis) =>
    (blocks ?? [])
      .filter((b): b is Extract<typeof b, { _type: 'block' }> => b._type === 'block')
      .map((b) => (b.children ?? []).map((c) => c.text ?? '').join(''))
      .join(' ');

  // Split howWeSolveThis into sentences for the proof panel (first 3)
  const proofPoints = blocksToPlainText(page.howWeSolveThis)
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 20)
    .slice(0, 3);

  const capabilityTerms = Array.from(new Set(
    [
      page.title,
      page.heroHeading,
      page.heroSubtitle ?? "",
      page.navGroup,
      ...(page.whatYouGet ?? []),
      ...(page.whatMattersMost ?? []),
      slug.replace(/-/g, " "),
    ]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((term) => term.length >= 4)
  ));

  const relevantBlogs = blogPosts
    .map((post) => {
      const title = (post.title ?? "").toLowerCase();
      const excerpt = (post.excerpt ?? "").toLowerCase();
      const tags = (post.tags ?? []).map((tag) => tag.toLowerCase());

      let score = 0;
      for (const term of capabilityTerms) {
        if (tags.some((tag) => tag.includes(term) || term.includes(tag))) score += 5;
        if (title.includes(term)) score += 3;
        if (excerpt.includes(term)) score += 1;
      }

      return { post, score };
    })
    .filter(({ post, score }) => Boolean(post.slug?.current) && score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.post.publishedAt ?? "").localeCompare(a.post.publishedAt ?? "");
    })
    .slice(0, 3)
    .map(({ post }) => post);

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
          <Breadcrumb
            variant="light"
            steps={[
              { name: "Home", href: "/" },
              { name: "Capabilities", href: "/capabilities" },
              { name: page.title ?? "" },
            ]}
          />
          <div className="cap-hero-tag">{page.navGroup}</div>
          <h1 className="cap-hero-heading">{page.heroHeading}</h1>
          {page.heroSubtitle && (
            <p className="cap-hero-sub">{page.heroSubtitle}</p>
          )}
          <div className="cap-hero-badges">
            <span className="cap-hero-badge">✓ NDIS Compliant</span>
            {/* <span className="cap-hero-badge">✓ Salesforce Native</span> */}
            <span className="cap-hero-badge">✓ Australian Hosted</span>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="cap-section" id="cap-problem">
        <div className="cap-outer">
          <div className="cap-section-label">The Problem</div>
          <div className="cap-problem-block">
            <div className="cap-problem-text">
              <PortableTextRenderer value={page.problemStatement ?? []} />
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
            {(page.whatMattersMost ?? []).map((item, i) => (
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
              <PortableTextRenderer value={page.howWeSolveThis ?? []} />
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
            {(page.whatYouGet ?? []).map((item) => (
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
            {(page.isThisRightForYou ?? []).map((item) => (
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
                  to={`/capabilities/${cap.slug?.current}/`}
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

      {/* ── Further Reading ── */}
      {relevantBlogs.length > 0 && (
        <section id="cap-reading">
          <div className="cap-outer">
            <div className="cap-section-label">Further Reading</div>
            <h2 className="cap-section-heading">Related guides from our blog.</h2>
            <div className="cap-reading-grid">
              {relevantBlogs.map((post) => (
                <BlogCard key={post._id} post={post} />
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
              className="primary-cta-white"
              onClick={() => navigate("/book-a-demo/")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="outline-cta"
              onClick={() => navigate("/signup/")}
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
