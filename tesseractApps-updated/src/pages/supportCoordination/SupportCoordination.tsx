import "./SupportCoordinationStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { trackCTAClick } from "../../utils/analytics";
import VideoThumbnailPlayButton from "../../components/ui/videoModal/VideoThumbnailPlayButton";
import scVideo from "../../assets/pricing_videos/SC APP VIDEO.mp4";
import VideoModal from "../../components/ui/videoModal/VideoModal";
import VideoThumbnailPlayButtonMobile from "../../components/ui/videoModal/VideoThumbnailPlayButtonMobile";
// ── Icons ────────────────────────────────────────────────────────────────────

const IconCheckCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClipboard = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const IconTarget = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconFileText = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconDollarSign = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconBarChart = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconShield = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconUsers = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconChevronDown = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── Static data ───────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  "Your case notes live in one place, service agreements in another, and invoicing in a third",
  "You can't see real-time funding balances - you're guessing until plan review",
  "Service agreements expire and nobody notices until a plan manager flags it",
  "You spend hours each week manually creating invoices and reconciling claims",
  "When an auditor asks for evidence, you're digging through shared drives and email",
  "Incident reporting is done on paper or email - escalation timelines are a risk",
];

type Feature = {
  id: string;
  label: string;
  heading: string;
  icon: React.ReactNode;
  bullets: string[];
};

const FEATURES_INTRO =
  "Everything below is live in the platform today. Book a demo and see it running, not as slides.";

const FEATURES: Feature[] = [
  {
    id: "caseload",
    label: "Task and Caseload Management",
    heading: "Manage your entire caseload from one connected view.",
    icon: <IconClipboard />,
    bullets: [
      "Centralised participant dashboard across your whole caseload.",
      "Pinned participants for fast access to priority cases.",
      "Tasks connected directly to billing, with no manual data entry.",
      "Overdue items flagged automatically with escalation.",
    ],
  },
  {
    id: "case-notes",
    label: "Case Notes with Live Budget Visibility",
    heading: "Write the note, see the budget move.",
    icon: <IconFileText />,
    bullets: [
      "Billable time entry linked to NDIS service items and rates.",
      "Budget overview recalculates in real time as you log time.",
      "Note types for Support Coordination, Plan Review, Goal Setting, Incident Report, Progress Update, and Provider Contact.",
      "Contact method and duration captured on every entry.",
    ],
  },
  {
    id: "goals",
    label: "Participant and Goal Tracking",
    heading: "Track engagement and demonstrate the outcomes auditors expect.",
    icon: <IconTarget />,
    bullets: [
      "Participant records with plan period, risk rating, and remaining budget.",
      "NDIS goals linked to plan outcomes and participant aspirations.",
      "Goal progress tracked per participant with review frequency.",
      "Structured goal setup covering category, priority, and SMART detail.",
    ],
  },
  {
    id: "agreements",
    label: "Service Agreements and T-Sign",
    heading: "Generate, send, sign, and link, all in one flow.",
    icon: <IconUsers />,
    bullets: [
      "NDIS-compliant agreement templates built in.",
      "Digital signing with T-Sign, flat monthly rate, unlimited signatures.",
      "Version control with complete amendment history.",
      "Expiry alerts so renewals are never missed.",
      "Signed agreements auto linked to funding lines and invoicing.",
    ],
  },
  {
    id: "providers",
    label: "Provider Directory",
    heading: "Keep your provider network in one place.",
    icon: <IconUsers />,
    bullets: [
      "Provider records with capacity, service type, and NDIS provider ID.",
      "Searchable directory by provider name or contact.",
      "Active and inactive status tracking.",
      "Industry type classification for fast filtering.",
    ],
  },
  {
    id: "billing",
    label: "SC Billing",
    heading: "See and reconcile the services you have delivered.",
    icon: <IconDollarSign />,
    bullets: [
      "Billable hours captured from notes and tasks automatically.",
      "Pending, generated, and cancelled invoice tracking.",
      "Editable billable hours before invoice generation.",
      "Invoice generation across a defined service period.",
    ],
  },
  {
    id: "reporting",
    label: "Funding and Utilisation Reporting",
    heading: "Live funding data, not a report you run after the fact.",
    icon: <IconBarChart />,
    bullets: [
      "Approved budget, planned spend, actual spend, and remaining budget per participant.",
      "Utilisation view per participant.",
      "Budget figures updated as case notes and tasks are logged.",
      "Plan review preparation data available on demand.",
    ],
  },
  {
    id: "compliance",
    label: "Compliance and Audit Readiness",
    heading:
      "Every action generates audit evidence. It is architectural, not a feature.",
    icon: <IconShield />,
    bullets: [
      "ISO 27001 and ISO 9001 certified platform.",
      "Audit trail on every interaction.",
      "Role-based access, with organisation and financial settings gated to org administrators.",
      "Compliance built into how the platform records work, not bolted on.",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    name: "Register & Set Up",
    desc: "Create your account, configure your organisation, and invite your team. Takes under 10 minutes.",
  },
  {
    step: 2,
    name: "Onboard Participants",
    desc: "Import participant data, NDIS plans, and funding allocations. Our team helps migrate your existing records from your current system.",
  },
  {
    step: 3,
    name: "Coordinate Services",
    desc: "Create service agreements, connect participants with providers, track goal progress, log case notes, and manage your caseload from one dashboard.",
  },
  {
    step: 4,
    name: "Invoice & Claim",
    desc: "Invoices generate automatically from delivered services. Submit NDIS claims with correct line items in bulk.",
  },
  {
    step: 5,
    name: "Report & Grow",
    desc: "Access real-time dashboards showing funding utilisation, participant outcomes, compliance status, and operational health.",
  },
];

const FAQS = [
  {
    q: "What is NDIS support coordination software?",
    a: "NDIS support coordination software is a platform that helps support coordinators manage participant caseloads, track NDIS goals, generate service agreements, coordinate services between providers, automate invoicing and claims, and maintain compliance documentation. It replaces disconnected spreadsheets, email chains, and manual processes with a single connected system.",
  },
  {
    q: "What does TesseractApps offer for support coordination?",
    a: "TesseractApps offers task management, goal tracking, service agreements, and NDIS claims within a unified platform architecture. Key advantages include real-time funding visibility (vs report-based), flat-rate E-Sign (vs per-signature), and ISO 9001 quality certification alongside ISO 27001. See the pricing page for cost comparison.",
  },
  {
    q: "Can I switch from other software to TesseractApps?",
    a: "Yes. TesseractApps provides dedicated data migration support. Your participant records, service agreements, case notes, and historical data are transferred with full validation. Most providers are operational within 6 weeks.",
  },
  {
    q: "Does TesseractApps have a mobile app?",
    a: "Yes. The platform is accessible from any device with a browser. Support workers and coordinators can access case notes, service agreements, schedules, and incident reporting on mobile devices.",
  },
];

const HERO_STATS = [
  { value: "ISO 27001", label: "Info Security Certified" },
  { value: "ISO 9001", label: "Quality Management Certified" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "AU Hosted", label: "Data Residency" },
];

const TRUST_BADGES = [
  "ISO 27001",
  "ISO 9001",
  "99.9% Uptime",
  "Australian Hosted",
  "No Credit Card Required",
];

// ── FAQ Item ─────────────────────────────────────────────────────────────────

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sc-faq-item${open ? " sc-faq-item--open" : ""}`}>
      <button
        type="button"
        className="sc-faq-question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? "true" : "false"}
      >
        <span>{q}</span>
        <span className="sc-faq-chevron">
          <IconChevronDown />
        </span>
      </button>
      {open && <div className="sc-faq-answer">{a}</div>}
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const LAUNCH_DATE = new Date("2026-05-31T00:00:00+10:00");

const SupportCoordination = () => {
  const navigate = useNavigate();
  const launched = Date.now() >= LAUNCH_DATE.getTime();
  const [videoOpen, setVideoOpen] = useState(false);
  const primaryCtaLabel = launched ? "Book a Demo" : "Register Your Interest";
  const primaryCtaRoute = launched
    ? "/book-a-demo"
    : "/register-support-coordination";
  const primaryCtaEvent = launched ? "book_demo" : "register_interest";

  return (
    <div id="sc-page">
      <SEO
        title="Support Coordination Software | TesseractApps"
        description="Support coordination software that connects your entire operation - from participant intake to service agreements, goal tracking, invoicing, claims, and audit evidence. No more disconnected tools."
        url="https://tesseractapps.com.au/solutions/support-coordination"
        canonical="https://tesseractapps.com.au/solutions/support-coordination"
        type="website"
      />

      {/* ── Hero ── */}
      <section id="sc-hero">
        <div id="sc-hero-inner">
          <div className="sc-label sc-label--light">Support Coordination</div>
          <h1 id="sc-hero-heading">
            Support Coordination Software That{" "}
            <span id="sc-hero-accent">Actually Connects Everything</span>
          </h1>
          <p id="sc-hero-sub">
            Most support coordination tools manage tasks. TesseractApps connects
            your entire operation - from participant intake to service
            agreements, goal tracking, invoicing, claims, and audit evidence -
            in one platform. No more jumping between Xero, spreadsheets, email,
            and disconnected apps.
          </p>
          <VideoThumbnailPlayButton
            onClick={() => setVideoOpen(true)}
            videoData={scVideo}
          />
          <div id="sc-hero-ctas">
            <button
              type="button"
              className="sc-btn-primary"
              onClick={() => {
                trackCTAClick(
                  primaryCtaEvent,
                  "sc_hero",
                  "/solutions/support-coordination",
                );
                navigate(primaryCtaRoute);
              }}
            >
              {primaryCtaLabel}
            </button>
          </div>
          <VideoThumbnailPlayButtonMobile
            onClick={() => setVideoOpen(true)}
            videoData={scVideo}
          />
          <p className="sc-cta-note">
            No credit card required. ISO 27001 certified. Australian hosted.
            99.9% uptime.
          </p>
          <div id="sc-hero-stats">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="sc-hero-stat">
                <div className="sc-hero-stat-value">{s.value}</div>
                <div className="sc-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {videoOpen && (
        <VideoModal onClose={() => setVideoOpen(false)} videoData={scVideo} />
      )}
      {/* ── Pain Points ── */}
      <section id="sc-pain">
        <div className="sc-outer">
          <div className="sc-label">The Real Problem</div>
          <h2 className="sc-section-heading">
            "I spend more time on admin than actually coordinating supports."
          </h2>
          <p className="sc-body-text">
            If you're running a support coordination business in 2026, you know
            the reality:
          </p>
          <div id="sc-pain-list">
            {PAIN_POINTS.map((point) => (
              <div key={point} className="sc-pain-item">
                <span className="sc-pain-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div id="sc-pain-callout">
            <p>
              This isn't about working harder. It's about your tools not being
              designed for how support coordination actually works.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features intro ── */}
      <section id="sc-features-intro">
        <div className="sc-outer">
          <div className="sc-label sc-label--light">
            What TesseractApps Does
          </div>
          <h2 className="sc-section-heading sc-section-heading--light">
            One connected platform. Plus what other tools can't do at all.
          </h2>
          <p className="sc-body-text sc-body-text--light">{FEATURES_INTRO}</p>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="sc-features">
        <div className="sc-outer">
          <div id="sc-features-grid">
            {FEATURES.map((feat, idx) => (
              <div
                key={feat.id}
                className={`sc-feature-card${idx % 2 !== 0 ? " sc-feature-card--alt" : ""}`}
              >
                <div className="sc-feature-card-icon">{feat.icon}</div>
                <div className="sc-feature-card-content">
                  <div className="sc-feature-number">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="sc-feature-label">{feat.label}</div>
                  <h3 className="sc-feature-heading">{feat.heading}</h3>
                  <ul className="sc-feature-bullets">
                    {feat.bullets.map((b) => (
                      <li key={b} className="sc-feature-bullet">
                        <span className="sc-feature-bullet-icon">
                          <IconCheckCircle />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="sc-how">
        <div className="sc-outer">
          <div id="sc-how-header">
            <div className="sc-label">How It Works</div>
            <h2 className="sc-section-heading">
              From setup to full operation in weeks.
            </h2>
            <p className="sc-body-text">
              Getting started with TesseractApps is a structured process with
              dedicated support at every step.
            </p>
          </div>
          <div id="sc-stepper">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="sc-step">
                <div className="sc-step-circle">{step.step}</div>
                <div className="sc-step-name">{step.name}</div>
                <div className="sc-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="sc-faq">
        <div className="sc-outer">
          <div className="sc-label">FAQ</div>
          <h2 className="sc-section-heading">Common questions</h2>
          <div id="sc-faq-list">
            {FAQS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="sc-cta">
        <div className="sc-outer">
          <div id="sc-cta-inner">
            <h2 id="sc-cta-heading">
              Get back to what you actually signed up for.
            </h2>
            <p id="sc-cta-sub">
              Stop fighting admin. Start coordinating supports. Everything
              connected in one platform.
            </p>
            <div id="sc-cta-actions">
              <button
                type="button"
                className="sc-btn-primary"
                onClick={() => {
                  trackCTAClick(
                    primaryCtaEvent,
                    "sc_bottom",
                    "/solutions/support-coordination",
                  );
                  navigate(primaryCtaRoute);
                }}
              >
                {primaryCtaLabel}
              </button>
            </div>
            <div id="sc-trust-badges">
              {TRUST_BADGES.map((badge) => (
                <span key={badge} className="sc-trust-badge">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportCoordination;
