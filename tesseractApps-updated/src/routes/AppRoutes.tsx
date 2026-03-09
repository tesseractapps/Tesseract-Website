// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import "../pages/blog/BlogStyles.css";
import "../pages/blogPost/BlogPostPageStyles.css";

// Home stays as eager import — it is the "/" route and must render immediately
import Home from "../pages/home/Home";

// All other pages are lazy-loaded — they only download when the user navigates to them
const Blog = lazy(() => import("../pages/blog/Blog"));
const Details = lazy(() => import("../pages/details/Details"));
const Pricing = lazy(() => import("../pages/pricing/Pricing"));
const RequestADemo = lazy(() => import("../pages/requestADemo/RequestADemo"));
const AddBlog = lazy(() => import("../pages/addBlog/AddBlog"));
const SubPage = lazy(() => import("../pages/SubPage/SubPage"));
const ItemsPage = lazy(() => import("../pages/ItemsPage/ItemsPage"));
const OutStory = lazy(() => import("../pages/ourStory/OutStory"));
const AboutUsSubPage = lazy(() => import("../pages/AboutUsSubPages/AboutUsSubPage"));
const FAQ = lazy(() => import("../pages/faq/FAQ"));
const Teams = lazy(() => import("../pages/teams/Teams"));
const Careers = lazy(() => import("../pages/careers/Careers"));
const ContactInformation = lazy(() => import("../pages/contactInformation/ContactInformation"));
const Blogpost = lazy(() => import("../pages/blogPost/Blogpost"));
const FutureProofingBlog = lazy(() => import("../pages/blogPost/FutureProofingBlog"));
const Blog4 = lazy(() => import("../pages/blogPost/Blog4"));
const Blog5 = lazy(() => import("../pages/blogPost/Blog5"));
const CanberraNDISExpoBlog = lazy(() => import("../pages/blogPost/CanberraNDISExpoBlog"));
const BeyondComplianceBlog = lazy(() => import("../pages/blogPost/BeyondComplianceBlog"));
const ManualRosteringBlog = lazy(() => import("../pages/blogPost/ManualRosteringBlog"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions/TermsAndConditions"));
const ByRole = lazy(() => import("../pages/byRole/ByRole"));
const ByIndustry = lazy(() => import("../pages/byIndustry/ByIndustry"));
const ProductDetails = lazy(() => import("../pages/productDetails/ProductDetails"));
const ReleaseNotes = lazy(() => import("../pages/ReleaseNotes/ReleaseNotes"));
const ComingSoon = lazy(() => import("../pages/comingSoon/ComingSoon"));
const SalesPage = lazy(() => import("../pages/salesPage/SalesPage"));
const About = lazy(() => import("../pages/about/About"));
const Whitepapers = lazy(() => import("../pages/whitepapers/Whitepapers"));
const Blog8 = lazy(() => import("../pages/blogPost/Blog8"));
const Blog9 = lazy(() => import("../pages/blogPost/Blog9"));
const Blog10 = lazy(() => import("../pages/blogPost/Blog10"));
const Blog11 = lazy(() => import("../pages/blogPost/Blog11"));
const NDISComplianceBlog = lazy(() => import("../pages/blogPost/NDISComplianceBlog"));
const BlogPostPage = lazy(() => import("../pages/blogPost/BlogPostPage"));
const StudioPage = lazy(() => import("../pages/studio/StudioPage"));
const BookADemo = lazy(() => import("../pages/bookADemo/BookADemo"));
const Signup = lazy(() => import("../pages/signup/Signup"));

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    getRoute,
    setCloseRoute,
    setExpoBanner,
  } = useAppContext();

  useEffect(() => {
    const cleanPath = location.pathname.replace(/\/$/, "");
    if (cleanPath === "/expo") {
      setExpoBanner(true);
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
  return (
    <Suspense fallback={<div className="app-page-loader"><div className="app-page-spinner" /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
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
                    {[0,1,2,3,4,5].map((i) => (
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
        <Route path="/requestDemo" element={<RequestADemo />} />
        <Route path="/salesPage" element={<SalesPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/product" element={<SubPage />} />
        <Route path="/scheduling" element={<SubPage />} />
        <Route path="/time-management" element={<SubPage />} />
        <Route path="/hr-management" element={<SubPage />} />
        <Route path="/communication" element={<SubPage />} />
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
        <Route path="/Documents" element={<ProductDetails />} />
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
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
