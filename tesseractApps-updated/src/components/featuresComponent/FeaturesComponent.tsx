import "./FeaturesStyles.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { featuresDummyData } from "../../utils/DummyData";
import useAppNavigate from "../../hooks/useAppNavigate";
// import { AppNavigate } from "../../routes/AppNavigate";
import ArrowLeft from "../arrows/ArrowLeft";
import ArrowRight from "../arrows/ArrowRight";
const FeaturesComponent = () => {
  // const navigate = useNavigate();
  const appNavigate = useAppNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // console.log(currentSlide, loaded);
  const [perView, setPerView] = useState(5);
  useEffect(() => {
    if (window.innerWidth <= 1150) {
      setPerView(2);
    }
    if (window.innerWidth <= 450) {
      setPerView(1);
    }
    console.log(currentSlide, loaded);
  }, []);
  const [sliderFeaturesRef, featuresSlider] = useKeenSlider(
    {
      mode: "free-snap",
      rubberband: true,
      loop: true,
      slides: {
        perView: perView,
        spacing: 30,
      },

      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel); // update active slide index
      },
      created() {
        setLoaded(true);
      },
    },
    [AutoplayPlugin]
  );
  function AutoplayPlugin(slider: import("keen-slider").KeenSliderInstance) {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    const clearTimeoutFn = () => clearTimeout(timeout);

    const startTimeout = () => {
      clearTimeout(timeout);
      if (!mouseOver) {
        timeout = setTimeout(() => slider.next(), 2000);
      }
    };

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearTimeoutFn();
      });

      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        startTimeout();
      });

      startTimeout();
    });

    slider.on("dragStarted", clearTimeoutFn);
    slider.on("animationEnded", startTimeout);
    slider.on("updated", startTimeout);
  }

  const clickHandler = (name: string) => {
    appNavigate(name);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [location]);
  return (
    <div id="features-container">
      <div className="heading">FEATURES</div>
      <h1 className="subheading features-subheading">
        How TesseractApps Supports Your Team.
      </h1>
      <h2 className="text features-text">
        Manage your team, automate compliance, and deliver high quality NDIS
        services in one platform.
      </h2>
      <div className="features-buttons">
        <div
          className="arrow-container"
          id="features-prev"
          onClick={() => featuresSlider.current?.prev()}
        >
          <ArrowLeft />
        </div>
        <div
          className="arrow-container"
          id="features-next"
          onClick={() => featuresSlider.current?.next()}
        >
          <ArrowRight />
        </div>
      </div>
      <div className="features-slider">
        <div ref={sliderFeaturesRef} className="keen-slider">
          {featuresDummyData.map((feature) => (
            <div
              key={feature.id}
              className="keen-slider__slide features-card"
              onClick={() => clickHandler(feature.title)}
            >
              <img
                className="features-card-image"
                src={feature.image}
                alt={feature.title}
              />
              <h2 className="features-card-title">{feature.title}</h2>
              <h3 className="features-card-description">
                {feature.description}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesComponent;
