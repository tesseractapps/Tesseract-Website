// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import "../pages/blog/BlogStyles.css";
import "../pages/blogPost/BlogPostPageStyles.css";
import "../pages/capabilities/CapabilityPageStyles.css";
import "../pages/solutions/solutionPage/SolutionPageStyles.css";
import "../pages/competitors/CompetitorPageStyles.css";

// Home stays as eager import — it is the "/" route and must render immediately
// import Home from "../pages/home/Home";
const HomeV4 = lazy(() => import("../pages/home/HomeV4"));

// All other pages are lazy-loaded — they only download when the user navigates to them
const Blog = lazy(() => import("../pages/blog/Blog"));
const CapabilitiesListing = lazy(() => import("../pages/capabilities/CapabilitiesListing"));
const CapabilityPage = lazy(() => import("../pages/capabilities/CapabilityPage"));
const Platform = lazy(() => import("../pages/platform/Platform"));
const Details = lazy(() => import("../pages/products/details/Details"));
const Pricing = lazy(() => import("../pages/marketing/pricing/Pricing"));
const RequestADemo = lazy(() => import("../pages/forms/requestADemo/RequestADemo"));
const SubPage = lazy(() => import("../pages/products/subPage/SubPage"));
const OurStory = lazy(() => import("../pages/marketing/ourStory/OurStory"));
const AboutUsSubPage = lazy(() => import("../pages/resources/aboutUsSubPages/AboutUsSubPage"));
const FAQ = lazy(() => import("../pages/resources/faq/FAQ"));
const CaseStudies = lazy(() => import("../pages/resources/caseStudies/CaseStudies"));
const Webinars = lazy(() => import("../pages/resources/webinars/Webinars"));
const Teams = lazy(() => import("../pages/resources/teams/Teams"));
const Careers = lazy(() => import("../pages/marketing/careers/Careers"));
const ContactInformation = lazy(() => import("../pages/forms/contactInformation/ContactInformation"));
const PrivacyPolicy = lazy(() => import("../pages/legal/privacyPolicy/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/legal/termsAndConditions/TermsAndConditions"));
const ReleaseNotes = lazy(() => import("../pages/legal/releaseNotes/ReleaseNotes"));
const ComingSoon = lazy(() => import("../pages/marketing/comingSoon/ComingSoon"));
const SalesPage = lazy(() => import("../pages/forms/salesPage/SalesPage"));
const About = lazy(() => import("../pages/marketing/about/About"));
const Whitepapers = lazy(() => import("../pages/resources/whitepapers/Whitepapers"));
const BlogPostPage = lazy(() => import("../pages/blogPost/BlogPostPage"));
const StudioPage = lazy(() => import("../pages/studio/StudioPage"));
const BookADemo = lazy(() => import("../pages/forms/bookADemo/BookADemo"));
const Signup = lazy(() => import("../pages/forms/signup/Signup"));
const SolutionsListing = lazy(() => import("../pages/solutions/SolutionsListing"));
const SolutionPage = lazy(() => import("../pages/solutions/solutionPage/SolutionPage"));
const CompetitorPage = lazy(() => import("../pages/competitors/CompetitorPage"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

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
    setCloseRoute(cleanPath || "/");
    if ((location.state as any)?.data) return;
    sessionStorage.setItem("prevPath", location.pathname);

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
    <Suspense fallback={<div className="app-page-loader"><div className="app-page-spinner" /></div>}>
      <Routes>
        <Route path="/" element={<HomeV4 />} />
        {/* <Route path="/home-v4" element={<Home />} /> */}
        {/* Blog listing — own Suspense so skeleton shows directly */}
        <Route
          path="/blogs"
          element={
            <Suspense fallback={
              <div className="bl-page">
                <div className="bl-hero">
                  <div className="bl-hero-overlay" />
                  <div className="bl-hero-content">
                    <div className="bl-hero-label">OUR BLOG</div>
                    <h1 className="bl-hero-title">Insights &amp; Industry Updates</h1>
                  </div>
                </div>
                <div className="bl-outer">
                  <div className="bl-grid">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="bl-skeleton-card">
                        <div className="bl-skeleton-image" />
                        <div className="bl-skeleton-body">
                          <div className="bl-skeleton-line bl-skeleton-line--meta" />
                          <div className="bl-skeleton-line bl-skeleton-line--title1" />
                          <div className="bl-skeleton-line bl-skeleton-line--title2" />
                          <div className="bl-skeleton-line bl-skeleton-line--ex1" />
                          <div className="bl-skeleton-line bl-skeleton-line--ex2" />
                          <div className="bl-skeleton-line bl-skeleton-line--ex3" />
                          <div className="bl-skeleton-footer">
                            <div className="bl-skeleton-line bl-skeleton-line--avatar" />
                            <div className="bl-skeleton-line bl-skeleton-line--author" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <Blog />
            </Suspense>
          }
        />
        <Route path="/requestdemo" element={<RequestADemo />} />
        <Route path="/requestDemo" element={<RequestADemo />} />
        <Route path="/salesPage" element={<SalesPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/capabilities" element={<CapabilitiesListing />} />
        <Route
          path="/capabilities/:slug"
          element={
            <Suspense fallback={
              <div id="cap-page">
                <div className="cap-skeleton-hero" />
                <div className="cap-outer">
                  <div className="cap-skeleton-section">
                    <div className="cap-skeleton cap-skeleton-label" />
                    <div className="cap-skeleton cap-skeleton-heading" />
                    <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--full" />
                    <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--lg" />
                    <div className="cap-skeleton cap-skeleton-line cap-skeleton-line--md" />
                  </div>
                </div>
              </div>
            }>
              <CapabilityPage />
            </Suspense>
          }
        />
        <Route path="/solutions" element={<SolutionsListing />} />
        {/* Sanity CMS dynamic solution pages */}
        <Route
          path="/solutions/:slug"
          element={
            <Suspense fallback={
              <div id="sol-page">
                <div className="sol-skeleton-hero" />
                <div className="sol-outer">
                  <div className="sol-skeleton-section">
                    <div className="sol-skeleton sol-skeleton-label" />
                    <div className="sol-skeleton sol-skeleton-heading" />
                    <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--full" />
                    <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--lg" />
                    <div className="sol-skeleton sol-skeleton-line sol-skeleton-line--md" />
                  </div>
                </div>
              </div>
            }>
              <SolutionPage />
            </Suspense>
          }
        />
        {/* Sanity CMS dynamic competitor comparison pages */}
        <Route
          path="/tesseract-vs/:slug"
          element={
            <Suspense fallback={
              <div id="cmp-page">
                <div className="cmp-skeleton-hero" />
                <div className="cmp-outer">
                  <div className="cmp-skeleton-section">
                    <div className="cmp-skeleton cmp-skeleton-label" />
                    <div className="cmp-skeleton cmp-skeleton-heading" />
                    <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--full" />
                    <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--lg" />
                    <div className="cmp-skeleton cmp-skeleton-line cmp-skeleton-line--md" />
                  </div>
                  <div className="cmp-skeleton-section">
                    <div className="cmp-skeleton cmp-skeleton-label" />
                    <div className="cmp-skeleton cmp-skeleton-heading" />
                    <div className="cmp-skeleton-choice-grid">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="cmp-skeleton cmp-skeleton-card" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cmp-skeleton-cta" />
              </div>
            }>
              <CompetitorPage />
            </Suspense>
          }
        />
        <Route path="/product" element={<SubPage />} />
        <Route path="/scheduling" element={<SubPage />} />
        <Route path="/time-management" element={<SubPage />} />
        <Route path="/hr-management" element={<SubPage />} />
        <Route path="/communication" element={<SubPage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/whitepapers" element={<Whitepapers />} />
        <Route path="/support-documentation" element={<FAQ />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/our-mission-and-vision" element={<AboutUsSubPage />} />
        <Route path="/help-center" element={<FAQ />} />
        <Route path="/help-centre" element={<FAQ />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<ContactInformation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/changelog" element={<ReleaseNotes />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        {/* Sanity CMS dynamic blog posts — own Suspense so skeleton shows directly */}
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={
              <div className="bpp-page">
                <div className="bpp-skeleton-hero" />
                <div className="bpp-skeleton-outer">
                  <div className="bpp-skeleton-header" />
                  <div className="bpp-skeleton-grid">
                    <div className="bpp-skeleton-block bpp-skeleton-article" />
                    <div className="bpp-skeleton-sidebar">
                      <div className="bpp-skeleton-sidebar-card" />
                      <div className="bpp-skeleton-sidebar-card" />
                    </div>
                  </div>
                </div>
              </div>
            }>
              <BlogPostPage />
            </Suspense>
          }
        />
        {/* Sanity Studio — embedded at /studio */}
        <Route path="/studio/*" element={<StudioPage />} />
        {/* any remaining single-route pages */}
        <Route path="/details" element={<Details />} />

        <Route path="/book-a-demo" element={<BookADemo />} />
        <Route path="/signup" element={<Signup />} />
        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
