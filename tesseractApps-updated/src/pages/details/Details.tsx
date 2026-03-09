import AboutSelectedToolComponent from "../../components/aboutSelectedToolComponent/AboutSelectedToolComponent";
import DetailsDataComponent from "../../components/detailsDataComponent/DetailsDataComponent";
import DetailsHeroComponent from "../../components/detailsHeroComponent/DetailsHeroComponent";
import DownloadAppComponent from "../../components/donloadAppComponent/DownloadAppComponent";
import FaqComponent from "../../components/faqComponent/FaqComponent";
import TestimonialComponent from "../../components/testimonialComponent/TestimonialComponent";
// import selectedTool from "../../assets/about selected tool.webp";
import "./DetailsStyles.css";
const Details = () => {
  return (
    <div id="details-container">
      <DetailsHeroComponent />
      <AboutSelectedToolComponent />
      <DetailsDataComponent />
      {/* <img loading="lazy"
        id="details-selecetd-tool"
        src={selectedTool}
        alt="details-selecetd-tool"
      /> */}
      <TestimonialComponent />
      <DownloadAppComponent />
      <FaqComponent />
    </div>
  );
};

export default Details;
