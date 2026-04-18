// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import "../pages/blog/BlogStyles.css";
import "../pages/blogPost/BlogPostPageStyles.css";
import "../pages/capabilities/CapabilityPageStyles.css";
import "../pages/solutions/solutionPage/SolutionPageStyles.css";
import "../pages/competitors/CompetitorPageStyles.css";

import Home from "../pages/home/Home";

const Platform = lazy(() => import("../pages/platform/Platform"));
const Pricing = lazy(() => import("../pages/marketing/pricing/Pricing"));
const FAQ = lazy(() => import("../pages/resources/faq/FAQ"));
const PrivacyPolicy = lazy(() => import("../pages/legal/privacyPolicy/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/legal/termsAndConditions/TermsAndConditions"));
const ReleaseNotes = lazy(() => import("../pages/legal/releaseNotes/ReleaseNotes"));
const Careers = lazy(() => import("../pages/marketing/careers/Careers"));
const Blog = lazy(() => import("../pages/blog/Blog"));
const BlogPostPage = lazy(() => import("../pages/blogPost/BlogPostPage"));
const CapabilitiesListing = lazy(() => import("../pages/capabilities/CapabilitiesListing"));
const CapabilityPage = lazy(() => import("../pages/capabilities/CapabilityPage"));
const SolutionsListing = lazy(() => import("../pages/solutions/SolutionsListing"));
const SolutionPage = lazy(() => import("../pages/solutions/solutionPage/SolutionPage"));
const ContactInformation = lazy(() => import("../pages/forms/contactInformation/ContactInformation"));
const About = lazy(() => import("../pages/marketing/about/About"));
const Whitepapers = lazy(() => import("../pages/resources/whitepapers/Whitepapers"));
const StudioPage = lazy(() => import("../pages/studio/StudioPage"));
const BookADemo = lazy(() => import("../pages/forms/bookADemo/BookADemo"));
const Signup = lazy(() => import("../pages/forms/signup/Signup"));
const CompetitorPage = lazy(() => import("../pages/competitors/CompetitorPage"));
const NDISGlossary = lazy(() => import("../pages/resources/glossary/NDISGlossary"));
const SitemapPage = lazy(() => import("../pages/resources/sitemapPage/SitemapPage"));
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
    // Redirect trailing slash URLs to their canonical non-slash equivalent
    if (location.pathname !== cleanPath && cleanPath !== "") {
      navigate(cleanPath + location.search + location.hash, { replace: true });
      return;
    }
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
  const pageSpinner = <div className="app-page-loader"><div className="app-page-spinner" /></div>;

  return (
    <Routes>
      {/* No outer Suspense — each lazy route has its own boundary so the
          SSR pre-rendered HTML is never hidden behind a deferred marker. */}
      <Route path="/" element={<Home />} />
        <Route path="/book-a-demo" element={<Suspense fallback={pageSpinner}><BookADemo /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={pageSpinner}><Signup /></Suspense>} />
        <Route path="/pricing" element={<Suspense fallback={pageSpinner}><Pricing /></Suspense>} />
        <Route path="/platform" element={<Suspense fallback={pageSpinner}><Platform /></Suspense>} />
        <Route path="/capabilities" element={<Suspense fallback={pageSpinner}><CapabilitiesListing /></Suspense>} />
        <Route path="/solutions" element={<Suspense fallback={pageSpinner}><SolutionsListing /></Suspense>} />
        <Route path="/whitepapers" element={<Suspense fallback={pageSpinner}><Whitepapers /></Suspense>} />
        <Route path="/help-centre" element={<Suspense fallback={pageSpinner}><FAQ /></Suspense>} />
        <Route path="/help-center" element={<Suspense fallback={pageSpinner}><FAQ /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={pageSpinner}><About /></Suspense>} />
        <Route path="/careers" element={<Suspense fallback={pageSpinner}><Careers /></Suspense>} />
        <Route path="/contact-us" element={<Suspense fallback={pageSpinner}><ContactInformation /></Suspense>} />
        <Route path="/privacy-policy" element={<Suspense fallback={pageSpinner}><PrivacyPolicy /></Suspense>} />
        <Route path="/terms-and-conditions" element={<Suspense fallback={pageSpinner}><TermsAndConditions /></Suspense>} />
        <Route path="/changelog" element={<Suspense fallback={pageSpinner}><ReleaseNotes /></Suspense>} />
        <Route path="/ndis-glossary" element={<Suspense fallback={pageSpinner}><NDISGlossary /></Suspense>} />
        <Route path="/sitemap" element={<Suspense fallback={pageSpinner}><SitemapPage /></Suspense>} />

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
        <Route path="/studio/*" element={<Suspense fallback={pageSpinner}><StudioPage /></Suspense>} />

        {/* Catch-all 404 */}
        <Route path="*" element={<Suspense fallback={pageSpinner}><NotFound /></Suspense>} />
      </Routes>
  );
};

export default AppRoutes;
