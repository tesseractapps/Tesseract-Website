// import FaqComponent from "../../components/faqComponent/FaqComponent";
import FeaturesComponent from "../../components/featuresComponent/FeaturesComponent";
import HomeHeroComponent from "../../components/homeHeroComponent/HomeHeroComponent";
import HowItWorksComponent from "../../components/howItWorksComponent/HowItWorksComponent";
// import MirroredArcsComponent from "../../components/mirroredArcsComponent/MirroredArcsComponent";
import OurBlogComponent from "../../components/ourBlogComponent/OurBlogComponent";
import ResultsComponent from "../../components/resultsComponent/ResultsComponent";
import TestimonialComponent from "../../components/testimonialComponent/TestimonialComponent";
import TrustedClientsComponent from "../../components/trustedClients/TrustedClientsComponent";
// import VideoComponent from "../../components/videoComponent/VideoComponent";
import "./HomeStyles.css";
import { useMetaTags } from "../../utils/useMetaTags";

const Home = () => {
  useMetaTags({
    title: "TesseractApps | NDIS Software & Workforce Management Platform Australia",
    description: "TesseractApps is Australia's leading NDIS software solution for workforce management, rostering, compliance, and billing. Streamline your care operations with our all-in-one Salesforce-based platform. Free trial available."
  });

  return (
    <div>
      <HomeHeroComponent />
      {/* <MirroredArcsComponent /> */}
      <FeaturesComponent />
      <HowItWorksComponent />
      {/* <VideoComponent /> */}
      <TrustedClientsComponent />
      <ResultsComponent />
      <TestimonialComponent />
      {/* <FaqComponent /> */}
      <OurBlogComponent />
    </div>
  );
};

export default Home;
