import "./OurBlogStyles.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import rightArrow from "../../../assets/white arrow.webp";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../ui/arrows/ArrowLeft";
import ArrowRight from "../../ui/arrows/ArrowRight";
import { useSanityBlogList } from "../../../hooks/useSanityBlogList";
import { urlFor } from "../../../sanity/lib/image";
import { formatDate } from "../../../utils/formatDate";
import type { BlogListItem } from "../../../../sanity.types";

// Inner component: contains useKeenSlider, only mounts when shell is in view
// Deferring mount until intersection avoids the offsetWidth reflow during initial page load.
const OurBlogSlider = ({ posts }: { posts: BlogListItem[] }) => {
  const getPerView = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 570) return 1;
    if (window.innerWidth <= 1000) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
  };

  const [sliderRef, slider] = useKeenSlider(
    {
      mode: "free-snap",
      slides: {
        perView: getPerView(),
        spacing: 50,
      },
    },
    [
      (slider) => {
        const handleResize = () => {
          slider.update({
            slides: {
              perView: getPerView(),
              spacing: 50,
            },
          });
        };
        slider.on("created", () => {
          window.addEventListener("resize", handleResize);
        });
        slider.on("destroyed", () => {
          window.removeEventListener("resize", handleResize);
        });
      },
    ]
  );

  const navigate = useNavigate();
  return (
    <>
      <div className="ourBlog-buttons">
        <div
          className="arrow-container ourBlog-button"
          onClick={() => slider.current?.prev()}
        >
          <ArrowLeft />
        </div>
        <div
          className="arrow-container ourBlog-button"
          onClick={() => slider.current?.next()}
        >
          <ArrowRight />
        </div>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {posts.map((data, index) => (
          <div
            key={data._id ?? index}
            className="keen-slider__slide ourBlog-card"
            onClick={() => {
              if (data.slug?.current) navigate(`/blog/${data.slug.current}`);
            }}
          >
            {data.mainImage?.asset ? (
              <img
                loading="lazy"
                className="ourBlog-image"
                src={urlFor(data.mainImage).width(400).height(210).fit('crop').auto('format').url()}
                alt={data.mainImage?.alt ?? data.title ?? "Blog image"}
                width="400"
                height="210"
              />
            ) : (
              <div className="ourBlog-image ourBlog-image-placeholder" aria-hidden="true" />
            )}

            <div className="ourBlog-attributes-container">
              {data.category?.title && (
                <span className="ourBlog-category">{data.category.title}</span>
              )}
              <div className="ourBlog-attributes-right">
                <span className="ourBlog-attributes">{formatDate(data.publishedAt)}</span>
                {data.readingTime != null && (
                  <span className="ourBlog-reading-time">{data.readingTime} min read</span>
                )}
              </div>
            </div>

            <div className="ourBlog-title">{data.title}</div>
            <div className="ourBlog-description">{data.excerpt}</div>
            <div className="dividerLine" />
            <div className="ourBlog-footer">
              <div className="ourBlog-author">
                {data.author?.avatar?.asset && (
                  <img
                    loading="lazy"
                    src={urlFor(data.author.avatar).width(45).height(45).fit('crop').auto('format').url()}
                    alt={data.author.avatar.alt ?? data.author.name ?? "Author"}
                    className="ourBlog-author-image"
                    width="45"
                    height="45"
                  />
                )}
                <div className="ourBlog-author-name">{data.author?.name}</div>
              </div>
              <div className="read-more-container">
                <div className="ourBlog-read-more">Read More</div>
                <img
                  loading="lazy"
                  className="ourBlog-right-arrow"
                  src={rightArrow}
                  alt=""
                  width="30"
                  height="30"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const OurBlogComponent = () => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { data: posts, loading, error } = useSanityBlogList();

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // one-shot: init slider once, never re-observe
        }
      },
      { rootMargin: "200px" } // pre-init 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!loading && error) {
    return (
      <div id="ourBlog-container" ref={shellRef}>
        <div className="heading">OUR BLOG</div>
        <div className="subheading">Most Recent Updates and Research</div>
            <div className="ourBlog-error">Error loading blogs.</div>
      </div>
    );
  }

  if (!loading && posts.length === 0) return null;

  return (
    <div id="ourBlog-container" ref={shellRef}>
      <div className="heading">OUR BLOG</div>
      <div className="subheading">Most Recent Updates and Research</div>
      {loading ? (
        <div className="ourBlog-skeleton-row" aria-busy="true" aria-label="Loading blog posts">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="ourBlog-skeleton-card" />
          ))}
        </div>
      ) : isInView ? (
        <OurBlogSlider posts={posts} />
      ) : (
        <div className="ourBlog-placeholder" aria-hidden="true" />
      )}
    </div>
  );
};

export default OurBlogComponent;
