import { Suspense, lazy, useEffect } from "react";
import HomeHeroComponent from "../../components/sections/homeHeroComponent/HomeHeroComponent";
import "./HomeStyles.css";
import SEO from "../../components/common/SEO";

// All below-fold components are lazy-loaded, they don't block the initial render
const FeaturesComponent = lazy(
  () => import("../../components/sections/featuresComponent/FeaturesComponent"),
);
const HowItWorksComponent = lazy(
  () => import("../../components/sections/howItWorksComponent/HowItWorksComponent"),
);
const TrustedClientsComponent = lazy(
  () =>
    import(
      "../../components/sections/trustedClients/TrustedClientsComponent"
    ),
);
const ResultsComponent = lazy(
  () => import("../../components/sections/resultsComponent/ResultsComponent"),
);
const TestimonialComponent = lazy(
  () =>
    import(
      "../../components/sections/testimonialComponent/TestimonialComponent"
    ),
);
const OurBlogComponent = lazy(
  () => import("../../components/sections/ourBlogComponent/OurBlogComponent"),
);

const Home = () => {
  useEffect(() => {
    document.body.classList.add("home-font-scope");
    return () => {
      document.body.classList.remove("home-font-scope");
    };
  }, []);

  return (
    <div className="home-page">
      <SEO
        title="TesseractApps | NDIS Software & Workforce Management Platform Australia"
        description="TesseractApps is Australia's leading NDIS software solution for workforce management, rostering, compliance, and billing. Streamline your care operations with our all-in-one Salesforce-based platform. Free trial available."
      />
      <HomeHeroComponent />
      <Suspense fallback={null}>
        {/* <MirroredArcsComponent /> */}
        <FeaturesComponent />
        <HowItWorksComponent />
        {/* <VideoComponent /> */}
        <TrustedClientsComponent />
        <ResultsComponent />
        <TestimonialComponent />
        {/* <FaqComponent /> */}
        <OurBlogComponent />
      </Suspense>
    </div>
  );
};

export default Home;
