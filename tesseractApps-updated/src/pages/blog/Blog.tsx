import "./BlogStyles.css";
import { ourBlogDummyData } from "../../utils/DummyData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetaTags } from "../../utils/useMetaTags";

const Blog = () => {
  useMetaTags({
    title: "TesseractApps Blog | NDIS Industry Insights & Tips | Australia",
    description: "Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation. Stay informed with industry updates and practical tips."
  });
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [blogsData, setBlogsData] = useState(ourBlogDummyData);
  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };
  useEffect(() => {
    const filteredData = (
      categoryFilter === "All"
        ? ourBlogDummyData
        : ourBlogDummyData.filter((blog) =>
            blog?.categories?.includes(categoryFilter)
          )
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    // Sort by date in descending order
    setBlogsData(filteredData);
  }, [categoryFilter]); //
  const categories = ["All", "NDIS", "Aged Care", "Events", "Business"];
  return (
    <div id="blog-container">
      <div className="heading">BLOG</div>
      <div className="subheading" id="blog-sub-heading">
        Insights, industry updates, and practical tips.
      </div>
      <div className="text" id="blog-text">
        Stay informed with expert articles on NDIS compliance, workforce
        management, digital transformation, and care sector innovation.
      </div>

      <div id="blog-category-filters">
        <div id="category-text">Category</div>

        {categories.map((category) => (
          <div
            key={category}
            className={`category-filter ${
              categoryFilter === category ? "active-filter" : ""
            }`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </div>
        ))}

        {/* <div id="add-blog-button" onClick={() => navigate("/addBlog")}>
    New Blog
  </div> */}
      </div>
      <div id="blog-page-card-container">
        {blogsData.map((blog, index) => (
          <div
            onClick={() => {
              if (blog.slug) navigate(blog.slug);
            }}
            className="blog-page-card"
            key={index}
          >
            {typeof blog.image === "string" ? (
              <img src={blog.image} alt="Blog" className="blog-page-image" />
            ) : (
              ""
            )}
            <div className="blog-page-title">{blog.title}</div>
            <div className="blog-page-description">{blog.description}</div>
            <div className="blog-page-categories">
              {blog.categories.map((category, index) => (
                <span className="category-filter" key={index}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
