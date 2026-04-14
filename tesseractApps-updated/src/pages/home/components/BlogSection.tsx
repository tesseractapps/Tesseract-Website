// src/pages/home/components/BlogSection.tsx
import { memo } from "react";
import { useSanityBlogList } from "../../../hooks/useSanityBlogList";
import { urlFor } from "../../../sanity/lib/image";
import { formatDate } from "../../../utils/formatDate";
import useAppNavigate from "../../../hooks/useAppNavigate";
import type { BlogListItem } from "../../../../sanity.types";

// ─── Types ────────────────────────────────────────────────────────────────────
// (BlogListItem is imported from Sanity types — no duplicate interface needed)

const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Leaf component for a single blog post card ────────────────────────────────
const BlogCard = memo(({ post, onNavigate }: { post: BlogListItem; onNavigate: (slug: string) => void }) => (
  <article
    className="hv4-blog-card"
    onClick={() => post.slug?.current && onNavigate(post.slug.current)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && post.slug?.current && onNavigate(post.slug.current)}
  >
    <div className="hv4-blog-img-wrap">
      {post.mainImage?.asset ? (
        <img
          src={urlFor(post.mainImage).width(600).height(320).fit("crop").auto("format").url()}
          alt={post.mainImage?.alt ?? post.title ?? "Blog post"}
          className="hv4-blog-img"
          loading="lazy"
          width="600"
          height="320"
        />
      ) : (
        <div className="hv4-blog-img hv4-blog-img--placeholder" />
      )}
      {post.category?.title && (
        <span className="hv4-blog-cat">{post.category.title}</span>
      )}
    </div>
    <div className="hv4-blog-body">
      <div className="hv4-blog-meta">
        <span>{formatDate(post.publishedAt)}</span>
        {post.readingTime != null && <span className="hv4-blog-meta-sep">·</span>}
        {post.readingTime != null && <span>{post.readingTime} min read</span>}
      </div>
      <h3 className="hv4-blog-title">{post.title}</h3>
      <p className="hv4-blog-excerpt">{post.excerpt}</p>
      <div className="hv4-blog-footer">
        {post.author?.avatar?.asset && (
          <img
            src={urlFor(post.author.avatar).width(36).height(36).fit("crop").auto("format").url()}
            alt={post.author.name ?? "Author"}
            className="hv4-blog-avatar"
            width="36"
            height="36"
            loading="lazy"
          />
        )}
        {post.author?.name && (
          <span className="hv4-blog-author">{post.author.name}</span>
        )}
        <span className="hv4-blog-readmore">
          Read article <IconArrowRight />
        </span>
      </div>
    </div>
  </article>
));
BlogCard.displayName = "BlogCard";

/**
 * BlogSection owns the useSanityBlogList hook (Step 4 — hook descent).
 * memo() prevents re-renders from unrelated parent state updates.
 * Individual BlogCard leaves are also memo-wrapped (Step 3).
 */
const BlogSection = memo(() => {
  const navigate = useAppNavigate();
  const { data: blogPosts, loading: blogLoading } = useSanityBlogList({ to: 3 });

  const handleNavigate = (slug: string) => navigate(`/blog/${slug}`);

  return (
    <section id="hv4-blog">
      <div className="hv4-section-inner">
        <div className="hv4-blog-header">
          <div>
            <div className="hv4-section-label">From the Blog</div>
            <h2 className="hv4-section-h2">Insights for NDIS providers.</h2>
          </div>
          <a href="/blogs" className="hv4-btn-outline hv4-blog-all-link">
            View all articles <IconArrowRight />
          </a>
        </div>

        {blogLoading ? (
          <div className="hv4-blog-skeleton-row">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hv4-blog-skeleton-card" />
            ))}
          </div>
        ) : blogPosts.length === 0 ? null : (
          <div className="hv4-blog-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} onNavigate={handleNavigate} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";
export default BlogSection;
