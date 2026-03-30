import "./PlatformStyles.css";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";

// ── Static content ──────────────────────────────────────────────────────────

const ARCHITECTURE_IMPROVEMENTS = [
  { title: "More automation", desc: "Routine operational steps handled by the system." },
  { title: "More governance structure", desc: "Approval workflows and enforcement rules deepen." },
  { title: "More reporting granularity", desc: "Executive, compliance, finance, and operational views." },
  { title: "More operational clarity", desc: "One source of truth across every site and service line." },
];

const ARCHITECTURE_PERMANENCE = [
  "The foundation never changes, it strengthens.",
  "Your team never starts again, it advances.",
  "Your data never fragments, it compounds.",
];

type MaturityStage = {
  stage: string;
  staffRange: string;
  focus: string;
  focusWord: string;
  accentColor: string;
};

const MATURITY_STAGES: MaturityStage[] = [
  {
    stage: "Start",
    staffRange: "1–15 staff",
    focusWord: "STRUCTURE",
    focus:
      "Visibility & structure. Compliant rostering, participant records, incident logging, and NDIS claiming from day one. Simplified navigation. No governance overhead, just the foundation done right.",
    accentColor: "#10b981",
  },
  {
    stage: "Growth",
    staffRange: "15–60 staff",
    focusWord: "CONTROL",
    focus:
      "Control & consistency. SCHADS Award engine activates. Operational dashboards provide cross-site visibility. Payroll data flows clean. Reporting moves from reactive to real-time.",
    accentColor: "#0c78ba",
  },
  {
    stage: "Scale",
    staffRange: "60–120 staff",
    focusWord: "GOVERNANCE",
    focus:
      "Governance & enforcement. Approval workflows for rosters, expenditure, and escalations. Multi-site audit trail depth. Executive reporting surfaces activated.",
    accentColor: "#7c3aed",
  },
  {
    stage: "Enterprise",
    staffRange: "120+ staff",
    focusWord: "CONSOLIDATION",
    focus:
      "Consolidation & executive truth. Native payroll and accounting. Multi-entity consolidation. Board reporting generated from live operational data. Single source of truth across every site and service line.",
    accentColor: "#dc2626",
  },
];

type SecurityItem = {
  heading: string;
  body: string;
  icon: React.ReactNode;
};

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SECURITY_ITEMS: SecurityItem[] = [
  {
    icon: <IconShield />,
    heading: "Salesforce Hyperforce",
    body: "TesseractApps runs natively on Salesforce Hyperforce, the same infrastructure trusted by government agencies, financial institutions, and healthcare organisations worldwide.",
  },
  {
    icon: <IconGlobe />,
    heading: "Australian Data Residency",
    body: "Your data is stored and processed exclusively in Australia. No cross-border data transfers.",
  },
  {
    icon: <IconLock />,
    heading: "ISO 27001 & ISO 9001 Certified",
    body: "Certified for information security management (ISO 27001) and quality management (ISO 9001).",
  },
  {
    icon: <IconZap />,
    heading: "99.9% Uptime SLA",
    body: "Enterprise-grade uptime commitment with role-based access control and a full audit trail on every action.",
  },
];

type OnboardingPhase = {
  phase: number;
  name: string;
  timeframe: string;
  what: string;
};

const ONBOARDING_PHASES: OnboardingPhase[] = [
  {
    phase: 1,
    name: "Discovery",
    timeframe: "Week 1",
    what: "Operational assessment and maturity mapping. You'll know exactly what your platform will look like before we build it.",
  },
  {
    phase: 2,
    name: "Configuration",
    timeframe: "Weeks 2–3",
    what: "Platform configured to your operational reality: rostering rules, SCHADS interpretation, claiming workflows, and approval chains.",
  },
  {
    phase: 3,
    name: "Data Migration",
    timeframe: "Weeks 3–4",
    what: "Participant records, worker profiles, historical service data and compliance documentation migrated with full validation.",
  },
  {
    phase: 4,
    name: "Training",
    timeframe: "Weeks 4–5",
    what: "Role-based training ensures every team member, from support worker to finance manager, knows exactly how to use the platform.",
  },
  {
    phase: 5,
    name: "Go-Live",
    timeframe: "Weeks 5–6",
    what: "Supported launch with a dedicated onboarding specialist. Ongoing support from day one.",
  },
];

const HERO_STATS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "ISO 27001", label: "Certified" },
];

// ── Component ────────────────────────────────────────────────────────────────

const Platform = () => {
  const navigate = useNavigate();

  return (
    <div id="pl-page">
      <SEO
        title="The Platform | One Architecture for Every NDIS Provider, TesseractApps"
        description="TesseractApps is built on a single, unified architecture, one data model, one codebase, no migration. The platform deepens as your provider organisation grows."
      />

      {/* ── Hero ── */}
      <section id="pl-hero">
        <div id="pl-hero-inner">
          <div className="pl-label pl-label--light">Platform</div>
          <h1 id="pl-hero-heading">
            One platform.{" "}
            <span id="pl-hero-heading-accent">360° view</span>
            <br />
            of your business operations.
          </h1>
          <p id="pl-hero-sub">
            NDIS providers don't grow in a straight line - their governance, systems, and
            operational maturity evolve in stages. Your software should evolve the same way.
          </p>
          <div id="pl-hero-ctas">
            <button
              type="button"
              className="pl-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="pl-btn-secondary"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
          <p className="pl-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          {/* Stat row */}
          <div id="pl-hero-stats">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="pl-hero-stat">
                <div className="pl-hero-stat-value">{s.value}</div>
                <div className="pl-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One Architecture ── */}
      <section id="pl-architecture">
        <div className="pl-outer">
          <div id="pl-architecture-grid">
            <div id="pl-architecture-left">
              <div className="pl-label">One Architecture</div>
              <h2 className="pl-section-heading">
                One Architecture. One Platform. A 360° View of Your Entire Business.
              </h2>
              <p className="pl-body-text">
                TesseractApps is built on a single, unified architecture designed for long-term
                maturity progression. Every provider runs on the same data model, the same
                codebase, and the same release cycle.
              </p>
              <p className="pl-body-text">
                There are no tiers to outgrow and no parallel products to graduate into. As your
                organisation matures, your configuration deepens.
              </p>
              <div id="pl-architecture-note">
                This isn't feature gating. This is a maturity model built into the architecture
                itself.
              </div>
            </div>
            <div id="pl-architecture-right">
              <div className="pl-point-group">
                <div className="pl-point-group-label">As you grow, you get</div>
                <div className="pl-arch-icon-grid">
                  {ARCHITECTURE_IMPROVEMENTS.map((item) => (
                    <div key={item.title} className="pl-arch-icon-card">
                      <span className="pl-arch-icon-dot" />
                      <div>
                        <div className="pl-arch-icon-title">{item.title}</div>
                        <div className="pl-arch-icon-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pl-point-group">
                <div className="pl-point-group-label">What never changes</div>
                {ARCHITECTURE_PERMANENCE.map((item) => (
                  <div key={item} className="pl-point-item">
                    <span className="pl-point-icon pl-point-icon--check">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Provider Maturity Deep-Dive ── */}
      <section id="pl-maturity">
        <div className="pl-outer">
          <div className="pl-label">Provider Maturity</div>
          <h2 className="pl-section-heading">
            Your stage determines configuration, not access.
          </h2>
          <p className="pl-body-text">
            Every provider operates the same core platform. What changes is the depth of
            governance, automation, and operational control available to your organisation.
          </p>

          {/* Desktop table */}
          <table id="pl-maturity-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Staff Range</th>
                <th>Focus</th>
                <th>Platform Focus & Configuration Depth</th>
              </tr>
            </thead>
            <tbody>
              {MATURITY_STAGES.map((row) => (
                <tr key={row.stage} className={`pl-maturity-row--${row.stage.toLowerCase()}`}>
                  <td>
                    <div className="pl-maturity-stage">{row.stage}</div>
                  </td>
                  <td>
                    <div className="pl-maturity-range">{row.staffRange}</div>
                  </td>
                  <td>
                    <span className="pl-maturity-focus-word">{row.focusWord}</span>
                  </td>
                  <td>{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div id="pl-maturity-cards">
            {MATURITY_STAGES.map((row) => (
              <div key={row.stage} className={`pl-maturity-card pl-maturity-card--${row.stage.toLowerCase()}`}>
                <div className="pl-maturity-card-header">
                  <div className="pl-maturity-card-stage">{row.stage}</div>
                  <span className="pl-maturity-card-word">{row.focusWord}</span>
                </div>
                <div className="pl-maturity-card-range">{row.staffRange}</div>
                <div className="pl-maturity-card-focus">{row.focus}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & Infrastructure ── */}
      <section id="pl-security">
        <div className="pl-outer">
          <div className="pl-label">Security & Infrastructure</div>
          <h2 className="pl-section-heading">
            Enterprise-grade infrastructure. Australian hosted.
          </h2>
          <p className="pl-body-text">
            TesseractApps runs natively on Salesforce Hyperforce, the same infrastructure
            trusted by government agencies, financial institutions, and healthcare organisations
            worldwide.
          </p>
          <div id="pl-security-grid">
            {SECURITY_ITEMS.map((item) => (
              <div key={item.heading} className="pl-security-card">
                <div className="pl-security-card-accent" />
                <div className="pl-security-card-inner">
                  <div className="pl-security-card-icon">{item.icon}</div>
                  <div className="pl-security-card-heading">{item.heading}</div>
                  <div className="pl-security-card-body">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Upgrades Work ── */}
      <section id="pl-upgrades">
        <div className="pl-outer">
          <div id="pl-upgrades-grid">
            <div>
              <div className="pl-label pl-label--light">Platform Upgrades</div>
              <h2 className="pl-section-heading pl-section-heading--light">
                Configuration deepens. You never migrate.
              </h2>
              <p className="pl-body-text pl-body-text--light">
                When you move from one maturity stage to the next, nothing breaks. There is no
                data migration. No re-implementation. No retraining from scratch.
              </p>
              <p className="pl-body-text pl-body-text--light">
                Your upgrade is a configuration change applied to your existing platform
                instance. New automation rules activate. Governance workflows enable. Reporting
                layers extend.
              </p>
              <div className="pl-upgrades-feature-list">
                {[
                  "Historical data & audit trails stay intact",
                  "Participant records preserved exactly as-is",
                  "No retraining from scratch for your team",
                  "New workflows activate on existing data",
                ].map((feat) => (
                  <div key={feat} className="pl-upgrades-feature-item">
                    <span className="pl-upgrades-feature-dot" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div id="pl-upgrades-callout">
              <div id="pl-upgrades-callout-heading">
                This is what "no migration" actually means.
              </div>
              <p id="pl-upgrades-callout-body">
                Your platform grows with you, and your operational history is never left behind.
                The providers building their operational foundation now are the ones who will
                navigate what's ahead with confidence.
              </p>
              <div className="pl-upgrades-tag-grid">
                {["Zero downtime", "Config-only change", "Full history retained", "Same team, same data"].map((tag) => (
                  <span key={tag} className="pl-coming-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Onboarding Overview ── */}
      <section id="pl-onboarding">
        <div className="pl-outer">
          <div className="pl-label">Onboarding</div>
          <h2 className="pl-section-heading">From assessment to go-live in weeks.</h2>
          <p className="pl-body-text">
            Getting onto TesseractApps is a structured process, not a six-month project. Most
            providers are fully operational within six weeks.
          </p>
          <div id="pl-phase-stepper">
            {ONBOARDING_PHASES.map((ph, idx) => (
              <div key={ph.phase} className="pl-phase-step">
                <div className="pl-phase-step-left">
                  <div className="pl-phase-circle">{ph.phase}</div>
                  {idx < ONBOARDING_PHASES.length - 1 && (
                    <div className="pl-phase-line" />
                  )}
                </div>
                <div className="pl-phase-step-content">
                  <div className="pl-phase-step-header">
                    <div className="pl-phase-step-name">{ph.name}</div>
                    <div className="pl-phase-step-time">{ph.timeframe}</div>
                  </div>
                  <div className="pl-phase-step-desc">{ph.what}</div>
                </div>
              </div>
            ))}
          </div>
          <p id="pl-onboarding-note">
            The above timeline is indicative. Each provider's onboarding charter is adjusted
            based on their stage, size, and operational complexity.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="pl-cta">
        <div className="pl-outer">
          <div id="pl-cta-inner">
            <h2 id="pl-cta-heading">See how TesseractApps works for your organisation.</h2>
            <p id="pl-cta-sub">
              Your demo is configured for your care type, team size, and provider maturity
              stage. 30 minutes. Live platform, not a slide deck. Start your provider setup.
            </p>
        <div className="sll-cta-actions">
            <button
              type="button"
              className="sll-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="sll-btn-outline"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
          <p className="sll-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
