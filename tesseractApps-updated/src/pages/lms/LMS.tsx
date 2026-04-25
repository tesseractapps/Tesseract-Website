import "./LMSStyles.css";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import wyzedLogo from "../../assets/wyzed.png";

// ── Static content ───────────────────────────────────────────────────────────

const FEATURES = [
  {
    heading: "Role-based learning pathways",
    body: "Training is assigned automatically based on the worker's role in TesseractApps. Support workers, team leaders, and coordinators each receive a pathway built for their responsibilities — not a generic list of modules.",
    Icon: IconUsers,
  },
  {
    heading: "Completion connected to the roster",
    body: "Training completion status from WYZED is visible inside TesseractApps. Managers can see who is compliant before a shift is published — without switching platforms.",
    Icon: IconCalendar,
  },
  {
    heading: "Induction connected to onboarding",
    body: "When a new worker is created in TesseractApps, WYZED triggers their induction sequence automatically. Paperless, trackable, and connected to their HR record from day one.",
    Icon: IconUserPlus,
  },
  {
    heading: "Your content alongside WYZED's modules",
    body: "Upload your own BSPs, internal policies, and procedures into WYZED. They sit alongside WYZED's 86+ NDIS-mapped modules — all accessible from within TesseractApps.",
    Icon: IconLayers,
  },
  {
    heading: "Certificate and expiry tracking",
    body: "WYZED tracks expiry dates on qualifications and certifications. Renewals are flagged before they lapse — and that status feeds back into TesseractApps where rostering decisions are made.",
    Icon: IconBadge,
  },
  {
    heading: "Audit-ready records",
    body: "Every completion, assessment result, and timestamp is stored in WYZED and connected to the worker profile in TesseractApps. When an auditor asks, the answer already exists in the system.",
    Icon: IconShield,
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    heading: "Worker is hired in TesseractApps",
    body: "A new worker profile is created. Their role triggers a WYZED induction pathway automatically — modules assigned, completion deadlines set, no manual setup required.",
  },
  {
    step: 2,
    heading: "Training is completed inside TesseractApps",
    body: "The worker accesses and completes their WYZED modules without leaving TesseractApps. No separate login. No external portal. No context-switching.",
  },
  {
    step: 3,
    heading: "The roster reflects compliance status",
    body: "TesseractApps rostering shows WYZED completion in real time. Managers know who is cleared to work before the shift goes out.",
  },
  {
    step: 4,
    heading: "Renewals are tracked and triggered automatically",
    body: "WYZED flags expiring certifications and triggers renewal pathways automatically. The updated status feeds back into TesseractApps.",
  },
  {
    step: 5,
    heading: "Audit evidence is ready",
    body: "Training records are stored in WYZED, connected to TesseractApps. Every step generates data that feeds the next. No compiling. No chasing.",
  },
];

const MODULE_FEATURES = [
  {
    heading: "NDIS Practice Standards alignment",
    body: "Every module is mapped to the relevant NDIS Practice Standards and Quality Indicators. Training is not generic — it is built for the regulatory environment your organisation operates in.",
    Icon: IconShield,
  },
  {
    heading: "High Intensity Skill Descriptors",
    body: "Modules covering high intensity supports are built to the skill descriptor requirements. Workers are trained to the standard the NDIS Commission expects.",
    Icon: IconUsers,
  },
  {
    heading: "Behaviour Support Plans",
    body: "BSP training can be delivered through WYZED — either from the module library or using your own uploaded content, specific to the participant.",
    Icon: IconClipboard,
  },
  {
    heading: "Inductions and internal policies",
    body: "Bring your own onboarding content, workplace policies, and organisational procedures into WYZED. Deliver and track them alongside the NDIS module library.",
    Icon: IconBook,
  },
  {
    heading: "Knowledge checks and assessments",
    body: "Modules include knowledge checks to verify understanding, not just completion. Assessment results are stored against the worker's profile.",
    Icon: IconCheck,
  },
  {
    heading: "Mobile accessible",
    body: "Support workers complete training on any device. Modules are accessible on mobile so learning happens when and where it suits the worker — not just at a desk.",
    Icon: IconMobile,
  },
];

type MaturityStage = {
  stage: string;
  staffRange: string;
  focusWord: string;
  body: string;
};

const MATURITY_STAGES: MaturityStage[] = [
  {
    stage: "Start",
    staffRange: "1–15 staff",
    focusWord: "STRUCTURE",
    body: "Inductions and mandatory NDIS modules running from day one. No separate system. No manual tracking.",
  },
  {
    stage: "Growth",
    staffRange: "15–60 staff",
    focusWord: "CONTROL",
    body: "Role-based pathways, expiry tracking, and completion visible inside the roster. Training stays current as the team grows.",
  },
  {
    stage: "Scale",
    staffRange: "60–120 staff",
    focusWord: "GOVERNANCE",
    body: "Multi-site training governance. Consistent pathway delivery and compliance visibility across every site.",
  },
  {
    stage: "Enterprise",
    staffRange: "120+ staff",
    focusWord: "CONSOLIDATION",
    body: "Board-level workforce compliance reporting. Training data connected to governance and audit requirements across the organisation.",
  },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconUserPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

const LMS = () => {
  const navigate = useNavigate();

  return (
    <div id="lms-page">
      <SEO
        title="Learning Management | Training Inside TesseractApps, Powered by WYZED"
        description="WYZED integrated directly into TesseractApps. Role-based learning pathways, compliance tracking, and 86+ NDIS-mapped modules — connected to the roster, the role, and the worker profile."
      />

      {/* ── Hero ── */}
      <section id="lms-hero">
        <div id="lms-hero-inner">
          <div className="lms-eyebrow">
            <span className="lms-eyebrow-seg">Platform</span>
            <span className="lms-eyebrow-dot" aria-hidden="true">·</span>
            <span className="lms-eyebrow-seg">Learning Management</span>
            <span className="lms-eyebrow-dot" aria-hidden="true">·</span>
            <span className="lms-eyebrow-seg">Powered by</span>
            <img
              src={wyzedLogo}
              alt="WYZED"
              className="lms-eyebrow-logo"
            />
          </div>
          <h1 id="lms-hero-heading">
            Training that lives inside{" "}
            <span id="lms-hero-accent">your operations.</span>
          </h1>
          <p id="lms-hero-sub">
            TesseractApps manages your workforce. WYZED manages your training. Together, every
            learning record, completion status, and compliance requirement sits inside the same
            platform your team already uses — connected to the roster, the role, and the worker
            profile.
          </p>
          <div id="lms-hero-ctas">
            <button
              type="button"
              className="lms-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="lms-btn-secondary"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
          <p className="lms-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          <div id="lms-hero-stats">
            <div className="lms-hero-stat">
              <div className="lms-hero-stat-value">86+</div>
              <div className="lms-hero-stat-label">NDIS-mapped modules</div>
            </div>
            <div className="lms-hero-stat">
              <div className="lms-hero-stat-value">0</div>
              <div className="lms-hero-stat-label">Separate logins</div>
            </div>
            <div className="lms-hero-stat">
              <div className="lms-hero-stat-value">100%</div>
              <div className="lms-hero-stat-label">Audit-ready records</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section id="lms-problem">
        <div className="lms-outer">
          <div className="lms-label">The Problem</div>
          <h2 className="lms-section-heading">
            Training is the last thing to get connected.
          </h2>
          <div id="lms-problem-grid">
            <div id="lms-problem-narrative">
              <p className="lms-body-text">
                A new support worker joins. Their profile is set up in TesseractApps. Their induction
                checklist lives in an email thread. Their mandatory NDIS modules are tracked in a
                spreadsheet — or not tracked at all.
              </p>
              <p className="lms-body-text">
                By the time they start their first shift, nobody knows with certainty what they have
                or haven't completed. That is a compliance risk.
              </p>
              <p className="lms-body-text">
                When the NDIS Commission asks for evidence of training, the answer is scattered across
                three systems and someone's inbox.
              </p>
            </div>
            <div id="lms-problem-callout">
              <div id="lms-problem-callout-inner">
                <div className="lms-problem-risk-label">Compliance risk</div>
                <div className="lms-problem-risk-items">
                  {[
                    "Induction in an email thread",
                    "NDIS modules in a spreadsheet",
                    "Certifications in someone's inbox",
                    "No single source of truth",
                  ].map((item) => (
                    <div key={item} className="lms-problem-risk-item">
                      <span className="lms-problem-risk-dot" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What It Is ── */}
      <section id="lms-what">
        <div className="lms-outer">
          <div id="lms-what-header">
            <div id="lms-what-header-text">
              <div className="lms-label lms-label--light">What It Is</div>
              <h2 className="lms-section-heading lms-section-heading--light">
                WYZED, integrated directly into TesseractApps.
              </h2>
              <p className="lms-body-text lms-body-text--light lms-body-text--wide">
                WYZED is a purpose-built learning management system for NDIS providers. When integrated
                with TesseractApps, training records, completion status, and learning pathways connect
                directly to the worker profile, the role, and the roster — without your team ever
                leaving the platform.
              </p>
            </div>
          </div>
          <div id="lms-features-grid">
            {FEATURES.map(({ heading, body, Icon }) => (
              <div key={heading} className="lms-feature-card">
                <div className="lms-feature-card-icon">
                  <Icon />
                </div>
                <div className="lms-feature-card-heading">{heading}</div>
                <div className="lms-feature-card-body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="lms-how">
        <div className="lms-outer">
          <div id="lms-how-inner">
            <div id="lms-how-left">
              <div className="lms-label lms-label--light">How It Works</div>
              <h2 className="lms-section-heading lms-section-heading--light">
                One connected flow.<br />From hire to compliant.
              </h2>
              <p className="lms-body-text lms-body-text--light">
                Every step in the worker lifecycle generates a record. No manual assembly. No chasing
                completions across platforms.
              </p>
            </div>
            <div id="lms-stepper">
              {HOW_IT_WORKS.map((step, idx) => (
                <div key={step.step} className="lms-step">
                  <div className="lms-step-left">
                    <div className="lms-step-circle">{step.step}</div>
                    {idx < HOW_IT_WORKS.length - 1 && (
                      <div className="lms-step-line" />
                    )}
                  </div>
                  <div className="lms-step-content">
                    <div className="lms-step-heading">{step.heading}</div>
                    <div className="lms-step-body">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Module Library ── */}
      <section id="lms-modules">
        <div className="lms-outer">
          <div className="lms-label">WYZED Module Library</div>
          <h2 className="lms-section-heading">
            86+ modules. Mapped to NDIS standards. Audit-ready.
          </h2>
          <p className="lms-body-text">
            Every WYZED module is developed by industry experts and mapped to the NDIS Practice
            Standards. Your team completes training that will pass any audit, at any level.
          </p>
          <div id="lms-modules-grid">
            {MODULE_FEATURES.map(({ heading, body, Icon }) => (
              <div key={heading} className="lms-module-card">
                <div className="lms-module-card-icon">
                  <Icon />
                </div>
                <div className="lms-module-card-heading">{heading}</div>
                <div className="lms-module-card-body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where It Applies (Maturity) ── */}
      <section id="lms-maturity">
        <div className="lms-outer">
          <div className="lms-label lms-label--light">Where It Applies</div>
          <h2 className="lms-section-heading lms-section-heading--light">
            Available at every provider maturity stage.
          </h2>
          <p className="lms-body-text lms-body-text--light">
            The platform meets you where you are. Training capability scales as your organisation grows.
          </p>

          {/* Desktop table */}
          <table id="lms-maturity-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Staff Range</th>
                <th>Focus</th>
                <th>Training Capability</th>
              </tr>
            </thead>
            <tbody>
              {MATURITY_STAGES.map((row) => (
                <tr key={row.stage} className={`lms-maturity-row--${row.stage.toLowerCase()}`}>
                  <td><div className="lms-maturity-stage">{row.stage}</div></td>
                  <td><div className="lms-maturity-range">{row.staffRange}</div></td>
                  <td><span className="lms-maturity-focus-word">{row.focusWord}</span></td>
                  <td>{row.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div id="lms-maturity-cards">
            {MATURITY_STAGES.map((row) => (
              <div key={row.stage} className={`lms-maturity-card lms-maturity-card--${row.stage.toLowerCase()}`}>
                <div className="lms-maturity-card-header">
                  <div className="lms-maturity-card-stage">{row.stage}</div>
                  <span className="lms-maturity-card-word">{row.focusWord}</span>
                </div>
                <div className="lms-maturity-card-range">{row.staffRange}</div>
                <div className="lms-maturity-card-body">{row.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section id="lms-testimonial">
        <div className="lms-outer">
          <div id="lms-testimonial-inner">
            <div id="lms-testimonial-quote-mark" aria-hidden="true">"</div>
            <blockquote id="lms-testimonial-text">
              TesseractApps has made a big difference in how we run our NDIS operations. Having
              rostering, payroll, and participant management in one system saves a lot of time.
            </blockquote>
            <div id="lms-testimonial-author">— Seed Disability Services</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="lms-cta">
        <div className="lms-outer">
          <div id="lms-cta-inner">
            <h2 id="lms-cta-heading">
              See how WYZED works inside TesseractApps.
            </h2>
            <p id="lms-cta-sub">
              Book a demo configured for your provider size and care type. 30 minutes. Live
              platform, not a slide deck.
            </p>
            <div id="lms-cta-actions">
              <button
                type="button"
                className="lms-btn-primary"
                onClick={() => navigate("/book-a-demo")}
              >
                Book a Demo
              </button>
              <button
                type="button"
                className="lms-btn-secondary"
                onClick={() => navigate("/signup")}
              >
                Begin Your Journey
              </button>
            </div>
            <p className="lms-cta-footnote">
              Book a Provider Maturity Review. Start your provider setup. · tesseractapps.com.au
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LMS;
