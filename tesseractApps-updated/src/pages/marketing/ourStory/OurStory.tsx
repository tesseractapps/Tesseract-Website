import "./OurStoryStyles.css";
import ourStoryImage from "../../../assets/our story image.webp";
import ourStoryImage1 from "../../../assets/our-story-1.webp";
import ourStoryImage2 from "../../../assets/our-story-2.webp";
import ourStoryImage3 from "../../../assets/our-story-3.webp";
import ourStoryImage4 from "../../../assets/our-story-4.webp";
import ourStoryImage5 from "../../../assets/our-story-5.webp";

import { useEffect } from "react";
import SEO from "../../../components/common/SEO";

const OurStory = () => {
  // const imageRef = useRef<HTMLImageElement | null>(null);
  // useEffect(() => {
  //   if (window.innerWidth > 800 && imageRef.current) {
  //     const imageBottom =
  //       imageRef.current.offsetTop + imageRef.current.offsetHeight - 500;
  //     window.scrollTo({ top: imageBottom, behavior: "smooth" });
  //   }
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("our-story-bottom");
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle =
          absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;

        window.scrollTo({
          top: middle,
          behavior: "smooth",
        });
      }
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <div id="our-story-container">
      <SEO
        title="Our Story | TesseractApps Journey from 2022 to Today | NDIS Software"
        description="Discover how TesseractApps evolved from a 2022 conversation about NDIS compliance challenges to a fully operational workforce management platform helping care providers across Australia."
      />
      {window.innerWidth > 800 && (
        <>
          <div id="our-story-title" className="subheading">
            Our Story
          </div>
          <img loading="lazy" src={ourStoryImage} alt="our-story-image" id="our-story-image" />
        </>
      )}
      {window.innerWidth < 800 && (
        <>
          <div id="our-story-title" className="subheading">
            Our Story
          </div>
          <img loading="lazy"
            src={ourStoryImage1}
            alt="our-story-image1"
            id="our-story-image1"
          />
          <img loading="lazy"
            src={ourStoryImage2}
            alt="our-story-image2"
            id="our-story-image3"
          />
          <img loading="lazy"
            src={ourStoryImage3}
            alt="our-story-image3"
            id="our-story-image3"
          />
          <img loading="lazy"
            src={ourStoryImage4}
            alt="our-story-image4"
            id="our-story-image4"
          />
          <img loading="lazy"
            src={ourStoryImage5}
            alt="our-story-image5"
            id="our-story-image5"
          />
        </>
      )}
      <div id="our-story-bottom" />
    </div>
  );
};

export default OurStory;
