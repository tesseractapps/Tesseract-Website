import "./NotFoundStyles.css";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// ── Helpful links ───────────────────────────────────────────────────────────

const HELPFUL_LINKS = [
  { label: "Platform", to: "/platform" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blogs" },
  { label: "Contact Us", to: "/contact-us" },
];

// ── Component ───────────────────────────────────────────────────────────────

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <SEO
        title="Page Not Found | TesseractApps"
        description="The page you're looking for doesn't exist or has been moved."
        canonical="https://tesseractapps.com.au/404"
        noIndex={true}
      />

      <main className="nf-main">
        <div className="nf-card">
          <p className="nf-code">404</p>
          <h1 className="nf-heading">Page not found</h1>
          <p className="nf-description">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="nf-actions">
            <Link to="/" className="nf-btn-primary">
              <IconHome />
              Go Home
            </Link>
            <button
              type="button"
              className="nf-btn-secondary"
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft />
              Go Back
            </button>
          </div>

          <div className="nf-links">
            <div className="nf-links-label">Helpful Links</div>
            <div className="nf-links-grid">
              {HELPFUL_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} className="nf-link-chip">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
