import "./ItemsPageStyles.css";
import { ourBlogDummyData } from "../../utils/DummyData";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const ItemsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [blogsData, setBlogsData] = useState(ourBlogDummyData);
  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };
  useEffect(() => {
    const filteredData = ourBlogDummyData.filter(
      (blog) =>
        blog?.categories?.includes(categoryFilter) || categoryFilter === "All"
    );
    setBlogsData(filteredData);
  }, [categoryFilter]); //
  return (
    <div id="items-page-container">
      <div className="heading" id="items-page-heading">
        {data?.heading || "Items Page"}
      </div>
      <div className="subheading" id="items-page-sub-heading">
        {data?.subHeading || "Insights, industry updates, and practical tips."}
      </div>
      <div className="text" id="items-page-text">
        {data?.text ||
          "Stay informed with expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation."}
      </div>
      {data?.heading == "Blog" && (
        <div id="items-page-category-filters">
          <div id="category-text">Category</div>
          <div
            className={
              "category-filter " +
              (categoryFilter == "All" ? "active-filter" : "")
            }
            onClick={() => handleCategoryFilter("All")}
          >
            All
          </div>
          <div
            className={
              "category-filter " +
              (categoryFilter == "Product" ? "active-filter" : "")
            }
            onClick={() => handleCategoryFilter("Product")}
          >
            Product
          </div>
          <div
            className={
              "category-filter " +
              (categoryFilter == "Technology" ? "active-filter" : "")
            }
            onClick={() => handleCategoryFilter("Technology")}
          >
            Technology
          </div>
          <div
            className={
              "category-filter " +
              (categoryFilter == "App" ? "active-filter" : "")
            }
            onClick={() => handleCategoryFilter("App")}
          >
            App
          </div>
          <div id="add-items-button" onClick={() => navigate("/addBlog")}>
            New Blog
          </div>
        </div>
      )}
      <div id="items-page-card-container">
        {blogsData.map((blog, index) => (
          <div
            onClick={() => {
              navigate("/article");
            }}
            className="items-page-card"
            key={index}
          >
            <img
              src={blog.image}
              alt="blog-image"
              className="items-card-image"
            />
            <div className="items-card-title">{blog.title}</div>
            <div className="items-card-description">{blog.description}</div>
            <div className="items-card-categories">
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

export default ItemsPage;
