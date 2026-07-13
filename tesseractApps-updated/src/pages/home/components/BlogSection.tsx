// src/pages/home/components/BlogSection.tsx
import { memo } from "react";
import { Link } from "react-router-dom";
import { useSanityBlogList } from "../../../hooks/useSanityBlogList";
import BlogCard from "../../../components/blog/BlogCard";

const BlogSection = memo(() => {
  const { data: blogPosts, loading } = useSanityBlogList({ to: 3 });

  return (
    <section id="hv4-blog">
      <div className="hv4-section-inner">
        <div className="hv4-blog-header">
          <div>
            <div className="hv4-section-label">From the Blog</div>
            <h2 className="hv4-section-h2">Insights for NDIS providers.</h2>
          </div>
          <Link to="/blogs/" className="outline-cta-dark">
            View all articles
          </Link>
        </div>

        {loading ? (
          <div className="hv4-blog-skeleton-row">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hv4-blog-skeleton-card" />
            ))}
          </div>
        ) : blogPosts.length === 0 ? null : (
          <div className="hv4-blog-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

BlogSection.displayName = "BlogSection";
export default BlogSection;
