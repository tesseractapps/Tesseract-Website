import "./TestimonialStyles.css";
import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
import { testimonialDummyData } from "../../utils/DummyData";
// import leftArrow from "../../assets/Blue arrow.webp";
// import rightArrow from "../../assets/white arrow.webp";
import star from "../../assets/star.webp";
// import blurImage from "../../assets/blurPinkImage.webp";
// import { useEffect, useState } from "react";
const TestimonialComponent = () => {
  return (
    <div id="testimonial-container">
      <div className="heading testimonials-heading">TESTIMONIALS</div>
      <div className="subheading testimonials-subheading">
        Real Stories. Real Results. Trusted by Leading NDIS Providers.
      </div>
      <div id="testimonial-carousel-container">
        {/* <img src={blurImage} alt="blurImage" id="blur-image" /> */}

        <div id="testimonial-carousel">
          {testimonialDummyData.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-rating-container">
                {Array.from({ length: item.rating }, (_, index) => (
                  <img
                    key={index}
                    src={star}
                    alt="star"
                    className="star-image"
                  />
                ))}
              </div>
              <div className="testimonial-text-container">
                <div className="testimonial-text">{item.testimonial}</div>

                {/* {item?.testimonialPoints &&
                  item.testimonialPoints.map((point, index) => {
                    return (
                      <div key={index} className="testimonial-text">
                        {point}
                      </div>
                    );
                  })} */}
              </div>

              <div className="testimonial-author-details">
                <img
                  src={item.authorImage}
                  alt="author"
                  className="author-image"
                />
                <div className="author-details">
                  <div className="author-name">{item.author}</div>
                  <div className="author-title">{item.authorTitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;
