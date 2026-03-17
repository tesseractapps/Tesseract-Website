import "./HomeHeroStyles.css";
import HeroArcsLeftComponent from "../../sections/heroArcsComponent/HeroArcsComponent.tsx";
import HeroArcsRightComponent from "../../sections/heroArcsComponent/HeroArcsComponent.tsx";
import { homeLeftArcsData, homeRightArcsData } from "../../../data/homeArcsData";
import useAppNavigate from "../../../hooks/useAppNavigate";
const HomeHeroComponent = () => {
  const appNavigate = useAppNavigate();
  return (
    <div id="home-hero-container">
      {/* <VideoComponent /> */}
      {/* <img loading="lazy"
        src={heroImage1}
        alt="hero background image 1"
        className="hero-backround-image"
      /> */}
      <HeroArcsLeftComponent pendulums={homeLeftArcsData} />
      <div id="home-text-container">
        {/* <img
          loading="eager"
          fetchPriority="high"
          src={logo_small}
          alt="tesseract logo"
          id="home-tesseract-logo"
          width="59"
          height="59"
        /> */}
        <div id="home-tesseract-logo" role="img" aria-label="Tesseract Apps Logo" />
        <h1 id="home-text-heading">End-to-End Workforce <br /> Management Software</h1>
        <h2 id="home-text-subText">
          TesseractApps streamlines compliance, team management, NDIS-related care and service delivery for providers, all on a secure, scalable platform.
        </h2>
        <div className="cta-button" onClick={() => appNavigate("/signup")}>
          <div>Begin Your Journey</div>
          {/* <ArrowRight className="arrow-icon" /> */}
        </div>
        <div id="home-button-subtext">
          No credit card is required.
        </div>
        {/* <div id="home-store-links-container">
          <img loading="lazy"
            src={ios}
            alt="ios"
            id="ios-store"
            className="home-store-links"
            onClick={() => {
              HandleClick("ios");
            }}
          />
          <img loading="lazy"
            src={android}
            alt="android"
            id="android-store"
            className="home-store-links"
            onClick={() => {
              HandleClick("android");
            }}
          />
        </div> */}
        {/* <div id="home-social-links-container">
          <img loading="lazy"
            src={facebook}
            alt="facebook-link"
            className="home-social-links"
            onClick={() => {
              HandleClick("facebook");
            }}
          />
          <img loading="lazy"
            src={youtube}
            alt="youtube-link"
            className="home-social-links"
            onClick={() => {
              HandleClick("youtube");
            }}
          />
          <img loading="lazy"
            src={linkedin}
            alt="linkedin-link"
            className="home-social-links"
            onClick={() => {
              HandleClick("linkedin");
            }}
          />
          <img loading="lazy"
            src={instagram}
            alt="instagram-link"
            className="home-social-links"
            onClick={() => {
              HandleClick("instagram");
            }}
          />
        </div> */}
      </div>
      <HeroArcsRightComponent pendulums={homeRightArcsData} />
      {/* <img loading="lazy"
        src={heroImage2}
        alt="hero background image 2"
        className="hero-backround-image"
      /> */}
    </div>
  );
};

export default HomeHeroComponent;
