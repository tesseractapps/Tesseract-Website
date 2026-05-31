// src/routes/AppRoutes.tsx
// Static imports — no lazy() — so vite-react-ssg SSG renders actual page
// content synchronously, eliminating the Suspense fallback flash.
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";

import Home from "../pages/home/Home";
import Platform from "../pages/platform/Platform";
import Pricing from "../pages/marketing/pricing/Pricing";
import FAQ from "../pages/resources/faq/FAQ";
import PrivacyPolicy from "../pages/legal/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/legal/termsAndConditions/TermsAndConditions";
import ReleaseNotes from "../pages/legal/releaseNotes/ReleaseNotes";
import Careers from "../pages/marketing/careers/Careers";
import Blog from "../pages/blog/Blog";
import BlogPostPage from "../pages/blogPost/BlogPostPage";
import CapabilitiesListing from "../pages/capabilities/CapabilitiesListing";
import CapabilityPage from "../pages/capabilities/CapabilityPage";
import SolutionsListing from "../pages/solutions/SolutionsListing";
import SolutionPage from "../pages/solutions/solutionPage/SolutionPage";
import ContactInformation from "../pages/forms/contactInformation/ContactInformation";
import About from "../pages/marketing/about/About";
import Whitepapers from "../pages/resources/whitepapers/Whitepapers";
import Brochures from "../pages/resources/brochures/Brochures";
import BookADemo from "../pages/forms/bookADemo/BookADemo";
import Signup from "../pages/forms/signup/Signup";
import CompetitorPage from "../pages/competitors/CompetitorPage";
import NDISGlossary from "../pages/resources/glossary/NDISGlossary";
import SitemapPage from "../pages/resources/sitemapPage/SitemapPage";
import LMS from "../pages/lms/LMS";
import WorkflowEngine from "../pages/workflowEngine/WorkflowEngine";
import SupportCoordination from "../pages/supportCoordination/SupportCoordination";
import SCPricing from "../pages/marketing/scPricing/SCPricing";
import Register from "../pages/forms/register/Register";
import NotFound from "../pages/notFound/NotFound";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    getRoute,
    setCloseRoute,
  } = useAppContext();

  useEffect(() => {
    // Redirect uppercase URLs to lowercase (e.g. /TESSERACT-VS-SHIFTCARE → /tesseract-vs-shiftcare)
    if (location.pathname !== location.pathname.toLowerCase()) {
      navigate(location.pathname.toLowerCase() + location.search + location.hash, { replace: true });
      return;
    }
    const cleanPath = location.pathname.replace(/\/$/, "");
    // Redirect trailing slash URLs to their canonical non-slash equivalent
    if (location.pathname !== cleanPath && cleanPath !== "") {
      navigate(cleanPath + location.search + location.hash, { replace: true });
      return;
    }
    setCloseRoute(cleanPath || "/");
    if ((location.state as any)?.data) return;
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("prevPath", location.pathname);

    const routeConfig = getRoute(cleanPath);
    if (routeConfig?.data) {
      navigate(cleanPath, {
        replace: true,
        state: { data: routeConfig.data },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-a-demo" element={<BookADemo />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/learning-management" element={<Navigate to="/capabilities/learning-management" replace />} />
      <Route path="/workflow-engine" element={<Navigate to="/capabilities/workflow-engine" replace />} />
      <Route path="/capabilities/learning-management" element={<LMS />} />
      <Route path="/capabilities/workflow-engine" element={<WorkflowEngine />} />
      <Route path="/capabilities" element={<CapabilitiesListing />} />
      <Route path="/capabilities/:slug" element={<CapabilityPage />} />
      <Route path="/solutions" element={<SolutionsListing />} />
      <Route path="/solutions/:slug" element={<SolutionPage />} />
      <Route path="/whitepapers" element={<Whitepapers />} />
      <Route path="/brochures" element={<Brochures />} />
      <Route path="/help-centre" element={<FAQ />} />
      <Route path="/help-center" element={<FAQ />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact-us" element={<ContactInformation />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/changelog" element={<ReleaseNotes />} />
      <Route path="/ndis-glossary" element={<NDISGlossary />} />
      <Route path="/sitemap" element={<SitemapPage />} />
      <Route path="/support-coordination" element={<SupportCoordination />} />
      <Route path="/solutions/support-coordination" element={<SupportCoordination />} />
      <Route path="/register-support-coordination" element={<Register />} />
      <Route path="/sc-pricing" element={<SCPricing />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/tesseract-vs/:slug" element={<CompetitorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
