import "./BlogStyles.css";
import { useState } from "react";
import SEO from "../../components/common/SEO";
import { useSanityBlogList } from "../../hooks/useSanityBlogList";
import { urlFor } from "../../sanity/lib/image";
import { formatDate } from "../../utils/formatDate";

const categories = ["All", "NDIS", "Aged Care", "Events", "Business"];

const Blog = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { data: blogsData, loading, error } = useSanityBlogList({
    category: categoryFilter === "All" ? undefined : categoryFilter,
  });

  return (
    <div className="bl-page">
      <SEO
        title="TesseractApps Blog | NDIS Industry Insights & Tips | Australia"
        description="Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation. Stay informed with industry updates and practical tips."
        url="https://www.tesseractapps.com.au/blogs"
        canonical="https://www.tesseractapps.com.au/blogs"
        type="website"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'TesseractApps Blog',
          description: 'Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation.',
          url: 'https://www.tesseractapps.com.au/blogs',
          publisher: {
            '@type': 'Organization',
            name: 'TesseractApps',
            url: 'https://www.tesseractapps.com.au',
            logo: { '@type': 'ImageObject', url: 'https://www.tesseractapps.com.au/tesseract_logo.webp' },
          },
        }}
      />

      {/* ── Hero banner ── */}
      <div className="bl-hero">
        <div className="bl-hero-overlay" />
        <div className="bl-hero-content">
          <div className="bl-hero-label">OUR BLOG</div>
          <h1 className="bl-hero-title">Insights &amp; Industry Updates</h1>
          <p className="bl-hero-subtitle">
            Expert articles on NDIS compliance, workforce management, digital
            transformation, and care sector innovation.
          </p>
        </div>
      </div>

      <div className="bl-outer">
        {/* ── Category filters ── */}
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

        {/* ── States ── */}
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

        {/* ── Cards grid ── */}
        {!loading && !error && blogsData.length > 0 && (
          <div className="bl-grid">
            {blogsData.map((blog) => (
              <a
                key={blog._id}
                className="bl-card"
                href={blog.slug?.current ? `/blog/${blog.slug.current}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bl-card-image-wrap">
                  {blog.mainImage?.asset ? (
                    <img
                      loading="lazy"
                      src={urlFor(blog.mainImage).width(480).height(240).fit('crop').auto('format').url()}
                      alt={blog.mainImage.alt ?? blog.title ?? "Blog"}
                      className="bl-card-image"
                      width={480}
                      height={240}
                    />
                  ) : (
                    <div className="bl-card-image bl-card-image--placeholder">
                      <img src="/svg-logos/Full Logo Blue.svg" alt="TesseractApps" className="bl-card-image-logo" />
                    </div>
                  )}
                  {blog.category?.title && (
                    <span className="bl-card-category">{blog.category.title}</span>
                  )}
                </div>

                <div className="bl-card-body">
                  <div className="bl-card-meta">
                    {blog.publishedAt && (
                      <span className="bl-card-date">{formatDate(blog.publishedAt)}</span>
                    )}
                    {blog.readingTime != null && (
                      <>
                        <span className="bl-card-dot" aria-hidden="true" />
                        <span className="bl-card-read-time">{blog.readingTime} min read</span>
                      </>
                    )}
                  </div>

                  <h2 className="bl-card-title">{blog.title}</h2>
                  <p className="bl-card-excerpt">{blog.excerpt}</p>

                  <div className="bl-card-footer">
                    {blog.author && (
                      <div className="bl-card-author">
                        {blog.author.avatar?.asset && (
                          <img
                            loading="lazy"
                            src={urlFor(blog.author.avatar).width(36).height(36).fit('crop').auto('format').url()}
                            alt={blog.author.avatar.alt ?? blog.author.name ?? "Author"}
                            className="bl-card-author-avatar"
                            width={36}
                            height={36}
                          />
                        )}
                        <span className="bl-card-author-name">{blog.author.name}</span>
                      </div>
                    )}
                    <span className="bl-card-read-more">Read more →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
