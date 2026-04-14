import "./SolutionPageStyles.css";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useSanitySolutionPage } from "../../../hooks/useSanitySolutionPage";
import { useSanityBlogList } from "../../../hooks/useSanityBlogList";
import SEO from "../../../components/common/SEO";
import { formatDate } from "../../../utils/formatDate";
import { urlFor } from "../../../sanity/lib/image";
import { buildBreadcrumbSchema, buildGraphSchema } from "../../../utils/schemaHelpers";
import Breadcrumb from "../../../components/common/Breadcrumb";

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SolutionPageSkeleton() {
  return (
    <div id="sol-page">
      <div className="sol-skeleton-hero" />
      <div className="sol-outer">
        <div className="sol-skeleton-section">
          <div className="sol-skeleton sol-skeleton-label" />
          <div className="sol-skeleton sol-skeleton-heading" />
          <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--full" />
          <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--lg" />
          <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--md" />
        </div>
        <div className="sol-skeleton-section">
          <div className="sol-skeleton sol-skeleton-label" />
          <div className="sol-skeleton sol-skeleton-heading" />
          <div className="sol-skeleton-insight-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="sol-skeleton sol-skeleton-card" />
            ))}
          </div>
        </div>
        <div className="sol-skeleton-section">
          <div className="sol-skeleton sol-skeleton-label" />
          <div className="sol-skeleton sol-skeleton-heading" />
          <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--full" />
          <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--lg" />
        </div>
      </div>
    </div>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────

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

// ── Component ─────────────────────────────────────────────────────────────────

export { SolutionPageSkeleton };

const SolutionPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const { page, loading, error } = useSanitySolutionPage(slug);
  const { data: blogPosts } = useSanityBlogList({ from: 0, to: 100 });
  const navigate = useNavigate();

  if (loading) return <SolutionPageSkeleton />;

  if (error) {
    return (
      <div id="sol-page">
        <div id="sol-not-found">
          <h2>Unable to load page</h2>
          <p>{error}</p>
          <Link to="/">Return to homepage</Link>
        </div>
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/not-found" replace />;
  }

  const metaTitle = page.seo?.metaTitle ?? `${page.heroHeading} | TesseractApps`;
  const metaDescription = page.seo?.metaDescription ?? page.heroSubtitle ?? "";
  const pageUrl = `https://tesseractapps.com.au/solutions/${slug}`;

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: "Home", url: "https://tesseractapps.com.au" },
      { name: "Solutions", url: "https://tesseractapps.com.au/product" },
      { name: page.title, url: pageUrl },
    ])
  );

  // First 3 sentences from howWeSupport for the proof panel
  const proofPoints = page.howWeSupport
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 20)
    .slice(0, 3);

  const solutionTerms = Array.from(new Set(
    [
      page.title,
      page.heroHeading,
      page.heroSubtitle ?? "",
      page.navCategory,
      ...page.whatYouGet,
      ...page.isThisRightForYou,
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
      for (const term of solutionTerms) {
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
    <div id="sol-page">
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
      <section id="sol-hero">
        <div id="sol-hero-inner">
          <Breadcrumb
            variant="light"
            steps={[
              { name: "Home", href: "/" },
              { name: "Solutions", href: "/solutions" },
              { name: page.title },
            ]}
          />
          <div className="sol-hero-tag">{page.navCategory.replace("BY ", "")}</div>
          <h1 className="sol-hero-heading">{page.heroHeading}</h1>
          {page.heroSubtitle && (
            <p className="sol-hero-sub">{page.heroSubtitle}</p>
          )}
          <div className="sol-hero-badges">
            <span className="sol-hero-badge">✓ NDIS Compliant</span>
            <span className="sol-hero-badge">✓ Salesforce Native</span>
            <span className="sol-hero-badge">✓ Australian Hosted</span>
          </div>
        </div>
      </section>

      {/* ── Who Is This For? ── */}
      <section className="sol-section" id="sol-who">
        <div className="sol-outer">
          <div className="sol-section-label">Who Is This For?</div>
          <div className="sol-problem-block">
            <div className="sol-problem-quote-icon">
              <IconQuote />
            </div>
            <div className="sol-problem-text">
              {page.whoIsThisFor.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Benefits ── */}
      <section className="sol-section">
        <div className="sol-outer">
          <div className="sol-section-label">Key Benefits</div>
          <h2 className="sol-section-heading">What this solution delivers for your organisation.</h2>
          <div className="sol-insight-grid">
            {page.keyBenefits.map((item, i) => (
              <div key={item} className="sol-insight-card">
                <div className="sol-insight-num">{i + 1}</div>
                <div className="sol-insight-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Support You ── */}
      <section className="sol-section sol-section--light">
        <div className="sol-outer">
          <div className="sol-section-label">How We Support You</div>
          <h2 className="sol-section-heading">One connected solution, built for NDIS providers.</h2>
          <div className="sol-solve-layout">
            <div className="sol-solve-text">
              {page.howWeSupport.split("\n\n").map((para, i) => (
                <p key={i} className="sol-body-text">{para}</p>
              ))}
            </div>
            <div className="sol-solve-proof">
              <div className="sol-solve-proof-heading">Why it works</div>
              <ul className="sol-solve-proof-list">
                {proofPoints.map((point, i) => (
                  <li key={i} className="sol-solve-proof-item">
                    <span className="sol-solve-proof-dot" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="sol-section">
        <div className="sol-outer">
          <div className="sol-section-label">What You Get</div>
          <h2 className="sol-section-heading">Everything you need. Nothing you don't.</h2>
          <div className="sol-feature-cards">
            {page.whatYouGet.map((item) => (
              <div key={item} className="sol-feature-card">
                <span className="sol-feature-icon">
                  <IconCheck />
                </span>
                <span className="sol-feature-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Is This Right for You? ── */}
      <section className="sol-section sol-section--light">
        <div className="sol-outer">
          <div className="sol-section-label">Is This Right for You?</div>
          <h2 className="sol-section-heading">Answer yes to any of these, this is for you.</h2>
          <div className="sol-qualify-list">
            {page.isThisRightForYou.map((item) => (
              <div key={item} className="sol-qualify-item">
                <span className="sol-qualify-icon">
                  <IconBadge />
                </span>
                <span className="sol-qualify-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Solutions ── */}
      {page.relatedSolutions && page.relatedSolutions.length > 0 && (
        <section id="sol-related">
          <div className="sol-outer">
            <div className="sol-section-label">See Also</div>
            <h2 className="sol-section-heading">Related solutions.</h2>
            <div className="sol-related-grid">
              {page.relatedSolutions.map((sol) => (
                <Link
                  key={sol._id}
                  to={`/solutions/${sol.slug.current}`}
                  className="sol-related-card"
                >
                  <div className="sol-related-strip" />
                  <div className="sol-related-body">
                    <div className="sol-related-group">{sol.navCategory}</div>
                    <div className="sol-related-title">{sol.title}</div>
                    {sol.heroSubtitle && (
                      <div className="sol-related-sub">{sol.heroSubtitle}</div>
                    )}
                    <span className="sol-related-arrow">
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
        <section id="sol-reading">
          <div className="sol-outer">
            <div className="sol-section-label">Further Reading</div>
            <h2 className="sol-section-heading">Related guides from our blog.</h2>
            <div className="sol-reading-grid">
              {relevantBlogs.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug?.current}`}
                  className="sol-reading-card"
                >
                  {post.mainImage?.asset && (
                    <img
                      className="sol-reading-image"
                      src={urlFor(post.mainImage).width(720).height(420).fit("crop").auto("format").url()}
                      alt={post.mainImage.alt ?? post.title ?? "Blog post image"}
                      loading="lazy"
                      width={360}
                      height={210}
                    />
                  )}
                  <div className="sol-reading-body">
                    <h3 className="sol-reading-title">{post.title}</h3>
                    {post.excerpt && <p className="sol-reading-excerpt">{post.excerpt}</p>}
                    <div className="sol-reading-meta">
                      {post.category?.title && <span>{post.category.title}</span>}
                      {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                    </div>
                    <span className="sol-reading-arrow">
                      Read article <IconArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section id="sol-cta">
        <div className="sol-outer">
          <div id="sol-cta-inner">
            <h2 id="sol-cta-heading">
              See how TesseractApps works for your organisation.
            </h2>
            <p id="sol-cta-sub">
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

export default SolutionPage;
