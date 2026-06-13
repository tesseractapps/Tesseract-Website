import "./BlogStyles.css";
import "../resources/guides/GuidesStyles.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";
import PageHero from "../../components/common/PageHero";
import { useSanityBlogList } from "../../hooks/useSanityBlogList";
import { useSanityGuides } from "../../hooks/useSanityGuides";
import { useSanityWhitepapers } from "../../hooks/useSanityWhitepapers";
import { client } from "../../sanity/lib/client";
import { BLOG_CATEGORIES_QUERY } from "../../sanity/lib/queries";
import BlogCard from "../../components/blog/BlogCard";
import GuideCard from "../../components/guide/GuideCard";
import WhitepaperCard from "../../components/whitepapers/WhitepaperCard";
import ResourceSearchModal from "../../components/resourceSearch/ResourceSearchModal";
import type { ResourceSearchEntry } from "../../components/resourceSearch/ResourceSearchModal";

type SanityCategory = { _id: string; title: string };

const Blog = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!client) return;
    client.fetch<SanityCategory[]>(BLOG_CATEGORIES_QUERY).then((cats) => {
      setCategories(["All", ...cats.map((c) => c.title)]);
    }).catch(() => {});
  }, []);

  const { data: blogsData, loading, error } = useSanityBlogList({
    category: categoryFilter === "All" ? undefined : categoryFilter,
  });

  const { data: guides } = useSanityGuides();
  const { data: whitepapers } = useSanityWhitepapers();

  const searchEntries: ResourceSearchEntry[] = blogsData.map((b) => ({
    id: b._id,
    title: b.title ?? 'Untitled',
    subtitle: b.excerpt ?? undefined,
    date: b.publishedAt ?? undefined,
    type: 'Post',
    href: `/blog/${b.slug?.current ?? ''}`,
  }));

  return (
    <div className="bl-page">
      <SEO
        title="NDIS Blog & Resources | TesseractApps"
        description="Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation. Stay informed with industry updates and practical tips."
        url="https://tesseractapps.com.au/blogs"
        canonical="https://tesseractapps.com.au/blogs"
        type="website"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'TesseractApps Blog',
          description: 'Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation.',
          url: 'https://tesseractapps.com.au/blogs',
          publisher: {
            '@type': 'Organization',
            name: 'TesseractApps',
            url: 'https://tesseractapps.com.au',
            logo: { '@type': 'ImageObject', url: 'https://tesseractapps.com.au/tesseract_logo.webp' },
          },
        }}
      />

      <PageHero
        label="Our Blog"
        heading="Insights & Industry Updates"
        sub="Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation."
      >
        <button type="button" className="rsh-trigger" onClick={() => setSearchOpen(true)} aria-label="Search blog posts">
          <svg className="rsh-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span className="rsh-trigger-text">Search blog posts…</span>
        </button>
      </PageHero>

      <ResourceSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        entries={searchEntries}
        placeholder="Search blog posts…"
        latestLabel="Latest posts"
      />

      <div className="bl-outer">
        <div className="bl-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`bl-filter-btn${categoryFilter === cat ? " bl-filter-btn--active" : ""}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="bl-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bl-skeleton-card">
                <div className="bl-skeleton-image" />
                <div className="bl-skeleton-body">
                  <div className="bl-skeleton-line bl-skeleton-line--meta" />
                  <div className="bl-skeleton-line bl-skeleton-line--title1" />
                  <div className="bl-skeleton-line bl-skeleton-line--title2" />
                  <div className="bl-skeleton-line bl-skeleton-line--ex1" />
                  <div className="bl-skeleton-line bl-skeleton-line--ex2" />
                  <div className="bl-skeleton-line bl-skeleton-line--ex3" />
                  <div className="bl-skeleton-footer">
                    <div className="bl-skeleton-line bl-skeleton-line--avatar" />
                    <div className="bl-skeleton-line bl-skeleton-line--author" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bl-empty">Can&apos;t load blogs. Error loading blogs.</div>
        )}

        {!loading && !error && blogsData.length === 0 && (
          <div className="bl-empty">No posts found in this category.</div>
        )}

        {!loading && !error && blogsData.length > 0 && (
          <div className="bl-grid">
            {blogsData.map((blog) => (
              <BlogCard key={blog._id} post={blog} />
            ))}
          </div>
        )}

        {/* Free Guides */}
        {guides.filter(g => g.status === 'published').length > 0 && (
          <section className="bl-cross-section">
            <div className="bl-cross-header">
              <h2 className="bl-cross-heading">Free Guides</h2>
              <Link to="/guides" className="bl-cross-link">View all guides →</Link>
            </div>
            <div className="gd-grid">
              {guides.filter(g => g.status === 'published').slice(0, 3).map(g => (
                <GuideCard key={g._id} guide={g} loading="lazy" />
              ))}
            </div>
          </section>
        )}

        {/* Whitepapers */}
        {whitepapers.length > 0 && (
          <section className="bl-cross-section">
            <div className="bl-cross-header">
              <h2 className="bl-cross-heading">Whitepapers &amp; Research</h2>
              <Link to="/whitepapers" className="bl-cross-link">View all whitepapers →</Link>
            </div>
            <div className="gd-grid">
              {whitepapers.slice(0, 3).map(wp => (
                <WhitepaperCard key={wp._id} whitepaper={wp} loading="lazy" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blog;
