import AboutSelectedToolComponent from "../../../components/details/aboutSelectedToolComponent/AboutSelectedToolComponent";
import DetailsDataComponent from "../../../components/details/detailsDataComponent/DetailsDataComponent";
import DetailsHeroComponent from "../../../components/details/detailsHeroComponent/DetailsHeroComponent";
import DownloadAppComponent from "../../../components/details/downloadAppComponent/DownloadAppComponent";
import FaqComponent from "../../../components/details/faqComponent/FaqComponent";
import TestimonialComponent from "../../../components/sections/testimonialComponent/TestimonialComponent";
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
