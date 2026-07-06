import { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

// Lazy-loaded page components — each becomes its own JS/CSS chunk.
// vite-react-ssg's SSR bundle includes all modules synchronously, so lazy()
// resolves immediately during pre-rendering and SSG output is unaffected.
const Home = lazy(() => import("../pages/home/Home"));
const Platform = lazy(() => import("../pages/platform/Platform"));
const Pricing = lazy(() => import("../pages/marketing/pricing/Pricing"));
const FAQ = lazy(() => import("../pages/resources/faq/FAQ"));
const PrivacyPolicy = lazy(
  () => import("../pages/legal/privacyPolicy/PrivacyPolicy"),
);
const TermsAndConditions = lazy(
  () => import("../pages/legal/termsAndConditions/TermsAndConditions"),
);
const ReleaseNotes = lazy(
  () => import("../pages/legal/releaseNotes/ReleaseNotes"),
);
const Careers = lazy(() => import("../pages/marketing/careers/Careers"));
const Blog = lazy(() => import("../pages/blog/Blog"));
const BlogPostPage = lazy(() => import("../pages/blogPost/BlogPostPage"));
const CapabilitiesListing = lazy(
  () => import("../pages/capabilities/CapabilitiesListing"),
);
const CapabilityPage = lazy(
  () => import("../pages/capabilities/CapabilityPage"),
);
const SolutionsListing = lazy(
  () => import("../pages/solutions/SolutionsListing"),
);
const SolutionPage = lazy(
  () => import("../pages/solutions/solutionPage/SolutionPage"),
);
const ContactInformation = lazy(
  () => import("../pages/forms/contactInformation/ContactInformation"),
);
const About = lazy(() => import("../pages/marketing/about/About"));
const Whitepapers = lazy(
  () => import("../pages/resources/whitepapers/Whitepapers"),
);
const WhitepaperPage = lazy(
  () => import("../pages/resources/whitepapers/WhitepaperPage"),
);
const Brochures = lazy(() => import("../pages/resources/brochures/Brochures"));
const Guides = lazy(() => import("../pages/resources/guides/Guides"));
const GuidePage = lazy(() => import("../pages/resources/guides/GuidePage"));
// const EventsListing = lazy(() => import("../pages/events/eventsListing/EventsListing"));
// const AdelaideExpo2026 = lazy(() => import("../pages/events/adelaideExpo2026/AdelaideExpo2026"));
const BookADemo = lazy(() => import("../pages/forms/bookADemo/BookADemo"));
const BookADemoSuccess = lazy(
  () => import("../pages/forms/bookADemo/BookADemoSuccess"),
);
const Signup = lazy(() => import("../pages/forms/signup/Signup"));
const SignupSuccess = lazy(() => import("../pages/forms/signup/SignupSuccess"));
const CompetitorPage = lazy(
  () => import("../pages/competitors/CompetitorPage"),
);
const NDISGlossary = lazy(
  () => import("../pages/resources/glossary/NDISGlossary"),
);
const SitemapPage = lazy(
  () => import("../pages/resources/sitemapPage/SitemapPage"),
);
const LMS = lazy(() => import("../pages/lms/LMS"));
const WorkflowEngine = lazy(
  () => import("../pages/workflowEngine/WorkflowEngine"),
);
const SupportCoordination = lazy(
  () => import("../pages/supportCoordination/SupportCoordination"),
);
const SCPricing = lazy(() => import("../pages/marketing/scPricing/SCPricing"));
const Register = lazy(() => import("../pages/forms/register/Register"));
const HumansPage = lazy(() => import("../pages/humans/HumansPage"));
const HumanPage = lazy(() => import("../pages/humans/HumanPage"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getRoute, setCloseRoute } = useAppContext();

  useEffect(() => {
    // Redirect uppercase URLs to lowercase (e.g. /TESSERACT-VS-SHIFTCARE → /tesseract-vs-shiftcare)
    if (location.pathname !== location.pathname.toLowerCase()) {
      navigate(
        location.pathname.toLowerCase() + location.search + location.hash,
        { replace: true },
      );
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
    if (typeof sessionStorage !== "undefined")
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
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/events" element={<EventsListing />} />
        <Route path="/events/adelaide-expo-2026" element={<AdelaideExpo2026 />} /> */}
        <Route path="/book-a-demo" element={<BookADemo />} />
        <Route path="/book-a-demo/success" element={<BookADemoSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/success" element={<SignupSuccess />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/platform" element={<Platform />} />
        <Route
          path="/learning-management"
          element={<Navigate to="/capabilities/learning-management" replace />}
        />
        <Route
          path="/workflow-engine"
          element={<Navigate to="/capabilities/workflow-engine" replace />}
        />
        <Route path="/capabilities/learning-management" element={<LMS />} />
        <Route
          path="/capabilities/workflow-engine"
          element={<WorkflowEngine />}
        />
        <Route path="/capabilities" element={<CapabilitiesListing />} />
        <Route path="/capabilities/:slug" element={<CapabilityPage />} />
        <Route path="/solutions" element={<SolutionsListing />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:slug" element={<GuidePage />} />
        <Route path="/whitepapers" element={<Whitepapers />} />
        <Route path="/whitepapers/:slug" element={<WhitepaperPage />} />
        <Route path="/brochures" element={<Brochures />} />
        <Route path="/help-centre" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<ContactInformation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/changelog" element={<ReleaseNotes />} />
        <Route path="/ndis-glossary" element={<NDISGlossary />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route
          path="/solutions/support-coordination"
          element={<SupportCoordination />}
        />
        <Route path="/register-support-coordination" element={<Register />} />
        <Route path="/sc-pricing" element={<SCPricing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/humans" element={<HumansPage />} />
        <Route path="/humans/:slug" element={<HumanPage />} />
        <Route path="/tesseract-vs/:slug" element={<CompetitorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
