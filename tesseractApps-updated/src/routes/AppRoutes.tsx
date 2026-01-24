// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Blog from "../pages/blog/Blog";
import Details from "../pages/details/Details";
import Pricing from "../pages/pricing/Pricing";
import RequestADemo from "../pages/requestADemo/RequestADemo";
import AddBlog from "../pages/addBlog/AddBlog";
import SubPage from "../pages/SubPage/SubPage";
import ItemsPage from "../pages/ItemsPage/ItemsPage";
import OutStory from "../pages/ourStory/OutStory";
import AboutUsSubPage from "../pages/AboutUsSubPages/AboutUsSubPage";
import FAQ from "../pages/faq/FAQ";
import Teams from "../pages/teams/Teams";
import Careers from "../pages/careers/Careers";
import ContactInformation from "../pages/contactInformation/ContactInformation";
import Blogpost from "../pages/blogPost/Blogpost";
import FutureProofingBlog from "../pages/blogPost/FutureProofingBlog";
import Blog4 from "../pages/blogPost/Blog4";
import Blog5 from "../pages/blogPost/Blog5";
import CanberraNDISExpoBlog from "../pages/blogPost/CanberraNDISExpoBlog";
import BeyondComplianceBlog from "../pages/blogPost/BeyondComplianceBlog";
import ManualRosteringBlog from "../pages/blogPost/ManualRosteringBlog";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import ByRole from "../pages/byRole/ByRole";
import ByIndustry from "../pages/byIndustry/ByIndustry";
import ProductDetails from "../pages/productDetails/ProductDetails";
import ReleaseNotes from "../pages/ReleaseNotes/ReleaseNotes";
import ComingSoon from "../pages/comingSoon/ComingSoon";
import SalesPage from "../pages/salesPage/SalesPage";
import About from "../pages/about/About";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";
import Whitepapers from "../pages/whitepapers/Whitepapers";
import Blog8 from "../pages/blogPost/Blog8";
import Blog9 from "../pages/blogPost/Blog9";
import Blog10 from "../pages/blogPost/Blog10";
import Blog11 from "../pages/blogPost/Blog11";
import NDISComplianceBlog from "../pages/blogPost/NDISComplianceBlog";
// import BookADemoPage from "../pages/bookADemo/BookADemo";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    getRoute,
    handleSignup,
    handleBookADemo,
    setCloseRoute,
    setExpoBanner,
  } = useAppContext();

  useEffect(() => {
    // const prevPath = sessionStorage.getItem("prevPath");
    const cleanPath = location.pathname.replace(/\/$/, "");
    // If the route already has state data, do nothing
    console.log("AppROute => cleanPath => ", cleanPath);
    if (cleanPath == "/book-a-demo") {
      handleBookADemo(true);
      return;
    } else if (cleanPath == "/signup") {
      handleSignup(true);
      return;
    } else if (cleanPath == "/expo") {
      setExpoBanner(true);
      return;
    }
    setCloseRoute(cleanPath || "/");
    if ((location.state as any)?.data) return;
    sessionStorage.setItem("prevPath", location.pathname);

    // Lookup route config by path
    const routeConfig = getRoute(cleanPath);
    // If config has data, inject it into the current history entry
    if (routeConfig?.data) {
      // replace: true — avoid adding a duplicate history entry
      navigate(cleanPath, {
        replace: true,
        state: { data: routeConfig.data },
      });
    }

    // only run when pathname changes; getRoute is stable in AppContext (useMemo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/details" element={<Details />} />
      <Route path="/requestDemo" element={<RequestADemo />} />
      <Route path="/salesPage" element={<SalesPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/addBlog" element={<AddBlog />} />
      <Route path="/product" element={<SubPage />} />
      <Route path="/scheduling" element={<SubPage />} />
      <Route path="/time-management" element={<SubPage />} />
      <Route path="/hr-management" element={<SubPage />} />
      <Route path="/communication" element={<SubPage />} />
      <Route path="/blogs" element={<ItemsPage />} />
      <Route path="/case-studies" element={<ItemsPage />} />
      <Route path="/whitepapers" element={<Whitepapers />} />
      <Route path="/support-documentation" element={<ItemsPage />} />
      <Route path="/our-story" element={<OutStory />} />
      <Route path="/our-mission-and-vision" element={<AboutUsSubPage />} />
      <Route path="/help-center" element={<FAQ />} />
      <Route path="/team" element={<Teams />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact-us" element={<ContactInformation />} />
      <Route path="/protecting-participant-data" element={<Blogpost />} />
      <Route path="/future-proofing-disability-services" element={<FutureProofingBlog />} />
      <Route path="/hidden-costs-workforce-management" element={<Blog4 />} />
      <Route path="/sydney-disability-workability-expo-2025" element={<Blog5 />} />
      <Route path="/canberra-ndis-expo" element={<CanberraNDISExpoBlog />} />
      <Route path="/beyond-compliance-care-quality" element={<BeyondComplianceBlog />} />
      <Route path="/manual-rostering-hidden-costs" element={<ManualRosteringBlog />} />
      <Route path="/future-proof-ndis-organisation-2025" element={<Blog8 />} />
      <Route path="/top-3-compliance-myths-busted" element={<Blog9 />} />
      <Route path="/common-payroll-pitfalls-ndis" element={<Blog10 />} />
      <Route path="/melbourne-expo-2025" element={<Blog11 />} />
      <Route path="/ndis-compliance-audit-failures-2026" element={<NDISComplianceBlog />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-Conditions" element={<TermsAndConditions />} />
      <Route path="/administrator" element={<ByRole />} />
      <Route path="/roster-manager" element={<ByRole />} />
      <Route path="/ndis-staff" element={<ByRole />} />
      <Route path="/hr-manager" element={<ByRole />} />
      <Route path="/accountant" element={<ByRole />} />
      <Route path="/participant" element={<ByRole />} />
      <Route path="/ndis-industry" element={<ByIndustry />} />
      <Route path="/ict-industry" element={<ByIndustry />} />
      <Route path="/retail-hospitality" element={<ByIndustry />} />
      <Route path="/multi-site-businesses" element={<ByIndustry />} />
      <Route path="/construction" element={<ByIndustry />} />
      <Route path="/manufacturing" element={<ByIndustry />} />
      <Route path="/disability-support-ndis" element={<ByIndustry />} />
      <Route path="/support-coordination" element={<ByIndustry />} />
      <Route path="/aged-care-services" element={<ByIndustry />} />
      <Route path="/child-care-services" element={<ByIndustry />} />
      <Route path="/allied-health-services" element={<ByIndustry />} />
      <Route path="/home-community-care-services" element={<ByIndustry />} />
      <Route path="/small-businesses" element={<ByIndustry />} />
      <Route path="/enterprise" element={<ByIndustry />} />
      <Route path="/franchise" element={<ByIndustry />} />
      <Route path="/startups" element={<ByIndustry />} />
      <Route path="/compliance" element={<ByIndustry />} />
      <Route path="/employee-engagement" element={<ByIndustry />} />
      <Route path="/time-efficiency" element={<ByIndustry />} />
      <Route path="/cost-optimisation" element={<ByIndustry />} />
      <Route path="/roster-management" element={<ProductDetails />} />
      <Route path="/timesheet" element={<ProductDetails />} />
      <Route path="/admin-console" element={<ProductDetails />} />
      <Route path="/access-control-panel" element={<ProductDetails />} />
      <Route path="/hr-operations" element={<ProductDetails />} />
      <Route path="/t-sign" element={<ProductDetails />} />
      <Route path="/clock-in-and-clock-out" element={<ProductDetails />} />
      <Route path="/participant-management" element={<ProductDetails />} />
      <Route path="/incident-management" element={<ProductDetails />} />
      <Route path="/role-based-dashboard" element={<ProductDetails />} />
      <Route path="/repository" element={<ProductDetails />} />
      <Route path="/chat" element={<ProductDetails />} />
      <Route path="/my-profile" element={<ProductDetails />} />
      <Route path="/forms" element={<ProductDetails />} />
      <Route path="/accounting" element={<ProductDetails />} />
      <Route path="/t-learning-hub" element={<ProductDetails />} />
      <Route path="/salesforce-integration" element={<ProductDetails />} />
      <Route path="/xero" element={<ProductDetails />} />
      <Route path="/wyzed" element={<ProductDetails />} />
      <Route path="/release-notes" element={<ReleaseNotes />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      {/* any remaining single-route pages */}
      <Route path="/details" element={<Details />} />

      {/* <Route path="/book-a-demo" element={<BookADemoPage />} /> */}
      {/* <Route path="/sign-up" element={<BookADemoPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
