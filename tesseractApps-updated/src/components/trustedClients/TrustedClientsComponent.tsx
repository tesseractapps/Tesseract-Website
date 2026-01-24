import "./TrustedClientsStyles.css";
// import company1 from "../../assets/company-1.webp";
import company2 from "../../assets/company-2.webp";
// import company3 from "../../assets/company-3.webp";
import company4 from "../../assets/company-4.webp";
import company5 from "../../assets/company-5.webp";
// import company6 from "../../assets/company-6.webp";
// import company7 from "../../assets/company-7.webp";
import company8 from "../../assets/ANA Logo.webp";
import company9 from "../../assets/FRAMILY VENTURES Final.webp";
import company10 from "../../assets/PINNACLE Final.webp";
import company13 from "../../assets/logo13.webp";
import company14 from "../../assets/NEXUS Final.webp";
// import company15 from "../../assets/Bright Path Psychosocial & disability Services Pty Ltd.webp";
import company16 from "../../assets/Blessing Care and Support Pty Ltd.webp";
import company17 from "../../assets/Clear Choice Clinic Pty Ltd.webp";
// import company18 from "../../assets/I've Got You Empowerment Pty Ltd.webp";
import company19 from "../../assets/ImprovedAbility.webp";
import company20 from "../../assets/RCG-Logo_2[12038376].webp";
import company21 from "../../assets/Company-YDCS-.webp";
// import company19 from "../../assets/Aussie Care Health Services Pty Ltd.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import "../../../node_modules/swiper/swiper.min.css";
import "../../../node_modules/swiper/modules/pagination.min.css";
// import Slider from "./Slider";
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
  ];
  return (
    <div id="trusted-clients-container">
      <div className="heading trusted-clients-heading">
        Our Most <br /> Trusted Clients
      </div>
      {/* <Slider images={companiesImages} speed={20000} /> */}
      {/* <div id="trusted-clients-images-container">
        {companiesImages?.map((image, index) => (
          <img key={index} src={image} alt="Client 1" className="client-logo" />
        ))}
      </div> */}
      <Swiper
        slidesPerView={2}
        breakpoints={{
          1280: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={0}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: true, // Remove pause to maintain smoothness
        }}
        speed={2000} // Slower, smoother transition
        loop={true}
        allowTouchMove={false} // Disable touch interaction for smoother auto-scroll
        modules={[Autoplay]}
        className="mySwiper clients-swiper"
      >
        {companiesImages.map((logo, index) => (
          <SwiperSlide key={index}>
            <img
              src={logo}
              alt={`Client Logo ${index + 1}`}
              className="clients-slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrustedClientsComponent;
