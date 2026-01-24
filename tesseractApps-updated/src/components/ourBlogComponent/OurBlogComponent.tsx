import "./OurBlogStyles.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

// import image3 from "../../assets/image2.webp";
// import image4 from "../../assets/image3.webp";
// import leftArrow from "../../assets/Blue arrow.webp";
import rightArrow from "../../assets/white arrow.webp";
import { ourBlogDummyData } from "../../utils/DummyData";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../arrows/ArrowLeft";
import ArrowRight from "../arrows/ArrowRight";

const OurBlogComponent = () => {
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
    <div id="ourBlog-container">
      <div className="heading">OUR BLOG</div>
      <div className="subheading">Most Recent Updates and Research</div>
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
        {ourBlogDummyData
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((data, index) => {
            return (
              <div
                key={index}
                className="keen-slider__slide ourBlog-card"
                onClick={() => {
                  if (data.slug) navigate(data.slug);
                }}
              >
                <img
                  className="ourBlog-image"
                  src={data.image}
                  alt="ourBlog Image"
                />
                <div className="ourBlog-attributes-container">
                  <div className="ourBlog-attributes">{data?.date}</div>
                  {/* <div className="ourBlog-attributes">
                  {data?.comments} COMMENTS
                </div> */}
                </div>
                <div className="ourBlog-title">{data?.title}</div>
                <div className="ourBlog-description">{data?.description}</div>
                <div className="dividerLine" />
                <div className="ourBlog-footer">
                  <div className="ourBlog-author">
                    <img
                      src={data.authorImage}
                      alt="author Image"
                      className="ourBlog-author-image"
                    />
                    <div className="ourBlog-author-name">{data?.author}</div>
                  </div>
                  <div className="read-more-container">
                    <div className="ourBlog-read-more">Read More</div>
                    <img
                      className="ourBlog-right-arrow"
                      src={rightArrow}
                      alt="arrow Image"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OurBlogComponent;
