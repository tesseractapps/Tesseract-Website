import "./TrustedClientsStyles.css";
import company2 from "../../../assets/thumbs/company-2-thumb.webp";
import company4 from "../../../assets/thumbs/company-4-thumb.webp";
import company5 from "../../../assets/thumbs/company-5-thumb.webp";
import company8 from "../../../assets/thumbs/ANA Logo-thumb.webp";
import company9 from "../../../assets/thumbs/FRAMILY VENTURES Final-thumb.webp";
import company10 from "../../../assets/thumbs/PINNACLE Final-thumb.webp";
import company13 from "../../../assets/thumbs/logo13-thumb.webp";
import company14 from "../../../assets/thumbs/NEXUS Final-thumb.webp";
import company16 from "../../../assets/thumbs/Blessing Care-thumb.webp";
import company17 from "../../../assets/thumbs/Clear Choice-thumb.webp";
import company19 from "../../../assets/thumbs/ImprovedAbility-thumb.webp";
import company20 from "../../../assets/thumbs/RCG-Logo-thumb.webp";
import company21 from "../../../assets/thumbs/Company-YDCS-thumb.webp";
import company22 from "../../../assets/KS PNG Logo.webp";
import company23 from "../../../assets/embrace logo.webp";
import company24 from "../../../assets/AveryCareLogo.webp";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef, useState } from "react";

// Inner component: contains useKeenSlider, only mounts when shell is in view
// Deferring mount until intersection avoids the offsetWidth reflow during initial page load.
const TrustedClientsSlider = ({ companiesImages }: { companiesImages: string[] }) => {
  const animation = { duration: 20000, easing: (t: number) => t };

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 2,
      spacing: 30,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 30 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 40 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 50 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 6, spacing: 60 },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider clients-swiper">
      {companiesImages.map((logo, index) => (
        <div key={index} className="keen-slider__slide">
          <img loading="lazy"
            src={logo}
            alt={`Client logo ${index + 1}`}
            className="clients-slider-image"
            width="200"
            height="120"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
};

const TrustedClientsComponent = () => {
  const companiesImages = [
    // company1,
    company2,
    company10,
    company13,
    company4,
    company5,
    // company7,
    company8,
    company9,
    company14,
    // company15,
    company16,
    company17,
    // company18,
    company19,
    company20,
    company21,
    company22,
    company23,
    company24
  ];

  const shellRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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

  return (
    <div id="trusted-clients-container" ref={shellRef}>
      <div className="heading trusted-clients-heading">
        Our Most <br /> Trusted Clients
      </div>
      {isInView
        ? <TrustedClientsSlider companiesImages={companiesImages} />
        : <div style={{ minHeight: "120px" }} aria-hidden="true" />
      }
    </div>
  );
};

export default TrustedClientsComponent;
