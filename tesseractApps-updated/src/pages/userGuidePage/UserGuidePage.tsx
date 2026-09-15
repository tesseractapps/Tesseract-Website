import { useEffect, useRef, useState } from "react";
import "./UserGuidePageStyles.css";
import { extractHeadings } from "../../utils/extractHeadings";
import { Link, Navigate, useParams } from "react-router-dom";
import { trackUserGuideView } from "../../utils/analytics";
import {
  buildBreadcrumbSchema,
  buildGraphSchema,
} from "../../utils/schemaHelpers";
import SEO from "../../components/common/SEO";
import Breadcrumb from "../../components/common/Breadcrumb";
import PortableTextRenderer from "../../components/sanity/portable-text";
import { formatDate } from "../../utils/formatDate";
import BlogCtaBlock from "../../components/blog/BlogCtaBlock";
import { useSanityUserGuidePage } from "../../hooks/useSanityUserGuidePage";
import { useSanityUserGuideNavigation } from "../../hooks/useSanityUserGuideNavigation";
type GuideNavItem = {
  title: string;
  slug: string;
};

function GuideNavigation({
  items,
  stageSlug,
  activeSlug,
}: {
  items: GuideNavItem[];
  stageSlug: string;
  activeSlug: string;
}) {
  return (
    <nav className="ugp-guide-nav">
      <p className="ugp-guide-nav-title">{stageSlug} Stage</p>

      <ul className="ugp-guide-nav-list">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={`/user-guide/${stageSlug}/${item.slug}`}
              className={
                item.slug === activeSlug
                  ? "ugp-guide-nav-link ugp-guide-nav-link--active"
                  : "ugp-guide-nav-link"
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
function TableOfContents({
  items,
}: {
  items: ReturnType<typeof extractHeadings>;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    // Watch all heading elements; highlight whichever is closest to top
    const headingEls = items
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="ugp-toc" aria-label="Table of contents">
      <p className="ugp-toc-title">On this page</p>
      <ol className="ugp-toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`ugp-toc-item ugp-toc-item--h${item.level}`}
          >
            <a
              href={`#${item.id}`}
              className={`ugp-toc-link${activeId === item.id ? " ugp-toc-link--active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  const y =
                    el.getBoundingClientRect().top + window.scrollY - 88;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
const UserGuidePage = () => {
  // const { slug } = useParams<{ slug: string }>();
  const { stageSlug, pageSlug } = useParams<{
    stageSlug: string;
    pageSlug: string;
  }>();
  const {
    guide: post,
    loading,
    error,
  } = useSanityUserGuidePage(stageSlug ?? "", pageSlug ?? "");
  const { navigation: guideNavigation, loading: navLoading } =
    useSanityUserGuideNavigation(post?.stage?.slug?.current ?? "");
  useEffect(() => {
    if (!post) return;
    trackUserGuideView({
      title: post.title ?? "",
      slug: post.slug?.current ?? "",
      stage: post.stage?.title,
    });
  }, [post?.slug?.current]);

  if (loading || navLoading) {
    return (
      <div className="ugp-page">
        <div className="ugp-skeleton-outer">
          <div className="ugp-skeleton-grid">
            <div className="ugp-skeleton-toc" />
            <div className="ugp-skeleton-main">
              <div className="ugp-skeleton-header" />
              <div className="ugp-skeleton-block ugp-skeleton-article" />
            </div>
            <div className="ugp-skeleton-sidebar">
              <div className="ugp-skeleton-sidebar-card" />
              <div className="ugp-skeleton-sidebar-card" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ugp-page">
        <div className="ugp-not-found">
          <h1>Can&apos;t load user guide</h1>
          <p>
            Error loading user guide.{" "}
            <Link to="/user-guide/" className="ugp-back-link">
              Back to all user guides
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (!post) return <Navigate to="/not-found/" replace />;

  const seo = post.seo;
  const siteUrl = "https://tesseractapps.com.au";
  const postUrl = `${siteUrl}/user-guide/${post.stage?.slug?.current ?? ""}/${
    post.slug?.current ?? ""
  }`;

  const metaTitle = seo?.metaTitle ?? post.title ?? "";
  const metaDescription = seo?.metaDescription ?? post.excerpt ?? "";
  const ogTitle = seo?.openGraphTitle ?? metaTitle;
  const ogDescription = seo?.openGraphDescription ?? metaDescription;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteUrl },

    {
      name: "User Guides",
      url: `${siteUrl}/user-guide`,
    },

    {
      name: post.stage?.title ?? "",
      url: `${siteUrl}/user-guide/${post.stage?.slug?.current ?? ""}`,
    },

    {
      name: post.title ?? "",
      url: postUrl,
    },
  ]);

  const blogPostingSchema = !seo?.schemaMarkup
    ? {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: postUrl,
        inLanguage: "en-AU",
        datePublished: post.publishedAt,
        ...(post._updatedAt && { dateModified: post._updatedAt }),
      }
    : null;

  const structuredData = blogPostingSchema
    ? buildGraphSchema(blogPostingSchema, breadcrumbSchema)
    : buildGraphSchema(breadcrumbSchema);
  const tocItems = post.body ? extractHeadings(post.body as any[]) : [];
  return (
    <div className="ugp-page">
      <SEO
        title={metaTitle}
        description={metaDescription}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        type="article"
        url={postUrl}
        publishedAt={post.publishedAt ?? undefined}
        section={post.stage?.title ?? undefined}
        canonical={seo?.canonicalUrl ?? postUrl}
        noIndex={seo?.noIndex ?? false}
        schemaMarkup={seo?.schemaMarkup ?? undefined}
        structuredData={structuredData}
      />

      {/* Breadcrumb */}
      <div className="ugp-breadcrumb-wrap">
        <Breadcrumb
          variant="dark"
          steps={[
            {
              name: "Home",
              href: "/",
            },

            {
              name: "User Guides",
              href: "/user-guide",
            },

            {
              name: post.stage?.title ?? "",
              href: `/user-guide/${post.stage?.slug?.current ?? ""}`,
            },

            {
              name: post.title ?? "",
            },
          ]}
        />
      </div>

      <div className="ugp-outer">
        {/* ── Three-panel grid ── */}
        <div className="ugp-grid">
          {/* Panel 1: TOC (left, sticky) */}
          <div className="ugp-toc-panel">
            <GuideNavigation
              items={guideNavigation}
              stageSlug={post.stage?.slug?.current ?? ""}
              activeSlug={post.slug?.current ?? ""}
            />
          </div>

          {/* Panel 2: Article (centre) */}
          <div className="ugp-main">
            {/* Hero image */}

            {/* Title */}
            <h1 className="ugp-title">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && <p className="ugp-excerpt">{post.excerpt}</p>}

            {/* Author row + meta */}
            <div className="ugp-byline">
              <div className="ugp-byline-meta">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt} className="ugp-byline-date">
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>
            </div>
            {/* Divider */}
            <hr className="ugp-divider" />

            {/* Article body */}
            <article className="ugp-article">
              <div className="ugp-body">
                {post.body && <PortableTextRenderer value={post.body} />}
              </div>
            </article>

            {/* Inline CTA block */}
            {(post as any).cta &&
              ((post as any).cta.heading || (post as any).cta.primaryLabel) && (
                <BlogCtaBlock cta={(post as any).cta} />
              )}

            {/* Back link */}
            <div className="ugp-back">
              <Link to={`/user-guide`} className="ugp-back-link">
                ← Back to all user guides
              </Link>
            </div>
          </div>
          <div className="ugp-toc-panel">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;
