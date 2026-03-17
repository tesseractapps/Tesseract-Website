import "./TestimonialStyles.css";
import "keen-slider/keen-slider.min.css";
import { testimonialDummyData } from "../../../data/testimonialData";
import star from "../../../assets/star.webp";
const TestimonialComponent = () => {
  return (
    <div id="testimonial-container">
      <div className="heading testimonials-heading">TESTIMONIALS</div>
      <div className="subheading testimonials-subheading">
        Real Stories. Real Results. Trusted by Leading NDIS Providers.
      </div>
      <div id="testimonial-carousel-container">
        {/* <img loading="lazy" src={blurImage} alt="blurImage" id="blur-image" /> */}

        <div id="testimonial-carousel">
          {testimonialDummyData.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-rating-container">
                {Array.from({ length: item.rating }, (_, index) => (
                  <img loading="lazy"
                    key={index}
                    src={star}
                    alt="star"
                    className="star-image"
                    width="14"
                    height="14"
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
                <img loading="lazy"
                  src={item.authorImage}
                  alt="author"
                  className="author-image"
                  width="40"
                  height="40"
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
