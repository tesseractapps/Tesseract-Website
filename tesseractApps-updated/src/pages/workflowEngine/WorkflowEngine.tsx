import "./WorkflowEngineStyles.css";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";

// ── Static content ───────────────────────────────────────────────────────────

const ENGINE_FEATURES = [
  {
    heading: "Approval workflows",
    body: "Define who approves what — shift changes, leave requests, incident reports, service agreements — before they progress. The platform routes and holds until approved.",
    Icon: IconThumbsUp,
  },
  {
    heading: "Incident escalation",
    body: "Set escalation paths by incident type and severity. When an incident is logged, the workflow triggers notifications, required actions, and follow-up tasks automatically.",
    Icon: IconAlertTriangle,
  },
  {
    heading: "Onboarding task sequences",
    body: "New worker onboarding becomes a tracked sequence — document collection, induction, system access, first shift sign-off — each step triggering the next.",
    Icon: IconUserPlus,
  },
  {
    heading: "Compliance checkpoints",
    body: "Build compliance gates into your processes. A service agreement cannot be activated without sign-off. A shift cannot be rostered without a cleared qualification.",
    Icon: IconShield,
  },
  {
    heading: "Automated notifications",
    body: "The right people are notified at the right time. No manual chasing. No relying on someone to remember.",
    Icon: IconBell,
  },
  {
    heading: "Multi-site consistency",
    body: "The same rules run across every site. Governance does not depend on which manager is on duty or which branch a worker is in.",
    Icon: IconGlobe,
  },
];

const HOW_IT_RUNS = [
  {
    step: 1,
    heading: "A trigger event occurs",
    body: "An incident is logged, a participant intake is received, a shift change is requested, or a new worker is onboarded.",
  },
  {
    step: 2,
    heading: "The workflow activates",
    body: "The platform identifies the relevant workflow, assigns tasks, and notifies the right people — based on the rules you have configured.",
  },
  {
    step: 3,
    heading: "Approvals and actions are tracked",
    body: "Every step — who actioned it, when, and what was decided — is recorded against the relevant record in real time.",
  },
  {
    step: 4,
    heading: "Compliance gates hold the process",
    body: "Steps that require sign-off, documentation, or completion cannot be bypassed. The workflow waits until the condition is met.",
  },
  {
    step: 5,
    heading: "The record is complete",
    body: "A full audit trail exists without anyone having to compile it. Every action is timestamped and stored.",
  },
];

const TFLOW_FEATURES = [
  {
    heading: "Cross-system data flow",
    body: "TFlow moves data between TesseractApps and connected platforms automatically. Timesheet data reaches payroll without manual export. Participant updates propagate across systems without re-entry.",
    Icon: IconArrows,
  },
  {
    heading: "Trigger-based automation",
    body: "Actions in one system trigger actions in another. A shift completion in TesseractApps can trigger a payroll calculation, a compliance check, and a participant billing event — without anyone intervening.",
    Icon: IconZap,
  },
  {
    heading: "Reduced manual handoffs",
    body: "The gaps between systems are where errors happen. TFlow closes those gaps so your team spends less time moving data and more time on the work that requires human judgment.",
    Icon: IconLink,
  },
  {
    heading: "Human control where it matters",
    body: "Automation handles the repetitive. Decisions that require oversight — approvals, escalations, exceptions — remain with your team. TFlow does not remove human control. It preserves it for what needs it.",
    Icon: IconUser,
  },
];

type MaturityStage = {
  stage: string;
  staffRange: string;
  focusWord: string;
  body: string;
  layer: string;
  isTflow: boolean;
};

const MATURITY_STAGES: MaturityStage[] = [
  {
    stage: "Start",
    staffRange: "1–15 staff",
    focusWord: "STRUCTURE",
    body: "Internal approval workflows and compliance checkpoints for rostering, incident reporting, and onboarding.",
    layer: "Workflow Engine",
    isTflow: false,
  },
  {
    stage: "Growth",
    staffRange: "15–60 staff",
    focusWord: "CONTROL",
    body: "Approval chains across teams. Escalation paths for incidents. Automated notifications and compliance gates.",
    layer: "Workflow Engine",
    isTflow: false,
  },
  {
    stage: "Scale",
    staffRange: "60–120 staff",
    focusWord: "GOVERNANCE",
    body: "Multi-site workflow consistency. Cross-platform automation begins — payroll, finance, and reporting connections.",
    layer: "Workflow Engine + TFlow",
    isTflow: true,
  },
  {
    stage: "Enterprise",
    staffRange: "120+ staff",
    focusWord: "CONSOLIDATION",
    body: "Full cross-system automation. Board-level reporting flows. Complex operational environments with minimal manual handoff.",
    layer: "Workflow Engine + TFlow",
    isTflow: true,
  },
];

const USE_CASES = [
  {
    heading: "Incident management",
    body: "Log, escalate, notify, resolve, and close — with every action timestamped and every required step enforced.",
    Icon: IconAlertTriangle,
  },
  {
    heading: "Service agreement sign-off",
    body: "Participant service agreements move through review, approval, and activation without falling into an inbox.",
    Icon: IconClipboard,
  },
  {
    heading: "Worker onboarding",
    body: "From offer accepted to first shift — every task in the sequence is tracked and nothing is missed.",
    Icon: IconUserPlus,
  },
  {
    heading: "Shift approval and changes",
    body: "Shift changes, cancellations, and overtime requests follow a defined approval path before they reach payroll.",
    Icon: IconClock,
  },
  {
    heading: "Funding and plan management",
    body: "Funding allocations and plan reviews move through structured steps before they affect participant budgets.",
    Icon: IconDollar,
  },
  {
    heading: "Governance reporting",
    body: "Scheduled reporting workflows surface the data your leadership needs — without someone manually pulling it together.",
    Icon: IconBarChart,
  },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconGitBranch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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

function IconAlertTriangle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconThumbsUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconArrows() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

const WorkflowEngine = () => {
  const navigate = useNavigate();

  return (
    <div id="we-page">
      <SEO
        title="Workflow Engine | Operational Automation for NDIS Providers, TesseractApps"
        description="TesseractApps structures your operational and governance workflows inside the platform. At deeper maturity stages, TFlow extends that automation across systems."
      />

      {/* ── Hero ── */}
      <section id="we-hero">
        <div id="we-hero-inner">
          <div className="we-eyebrow">
            <span className="we-eyebrow-seg">Platform</span>
            <span className="we-eyebrow-dot" aria-hidden="true">·</span>
            <span className="we-eyebrow-seg">Workflow Engine</span>
          </div>
          <h1 id="we-hero-heading">
            Automate repetitive tasks.{" "}
            <span id="we-hero-accent">Maintain human control</span>{" "}
            where it matters.
          </h1>
          <p id="we-hero-sub">
            TesseractApps structures your operational and governance workflows inside the platform.
            At deeper maturity stages, TFlow extends that automation across systems.
          </p>
          <div id="we-hero-ctas">
            <button type="button" className="we-btn-primary" onClick={() => navigate("/book-a-demo")}>
              Book a Demo
            </button>
            <button type="button" className="we-btn-secondary" onClick={() => navigate("/signup")}>
              Begin Your Journey
            </button>
          </div>
          <p className="we-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          <div id="we-hero-stats">
            <div className="we-hero-stat">
              <div className="we-hero-stat-value">2</div>
              <div className="we-hero-stat-label">Automation layers</div>
            </div>
            <div className="we-hero-stat">
              <div className="we-hero-stat-value">0</div>
              <div className="we-hero-stat-label">Manual audit compiling</div>
            </div>
            <div className="we-hero-stat">
              <div className="we-hero-stat-value">100%</div>
              <div className="we-hero-stat-label">Process consistency</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Layers (white) ── */}
      <section id="we-layers">
        <div className="we-outer">
          <div className="we-label">Two Layers. One Goal.</div>
          <h2 className="we-section-heading">
            Operational automation that grows with your organisation.
          </h2>
          <p className="we-body-text">
            Workflow automation in TesseractApps works at two levels — matched to where your
            organisation is on the provider maturity path.
          </p>
          <div id="we-layers-grid">
            <div className="we-layer-card we-layer-card--engine">
              <div className="we-layer-card-top">
                <div className="we-layer-card-icon we-layer-card-icon--engine">
                  <IconGitBranch />
                </div>
                <div>
                  <div className="we-layer-card-tag">Workflow Engine</div>
                  <div className="we-layer-card-sub">Built into TesseractApps</div>
                </div>
              </div>
              <p className="we-layer-card-body">
                Structures your internal operational and governance workflows — approvals,
                escalations, task sequences, compliance checkpoints. Available from the Start stage.
              </p>
              <div className="we-layer-card-badge">Available from Start stage</div>
            </div>
            <div className="we-layer-card we-layer-card--tflow">
              <div className="we-layer-card-top">
                <div className="we-layer-card-icon we-layer-card-icon--tflow">
                  <IconZap />
                </div>
                <div>
                  <div className="we-layer-card-tag we-layer-card-tag--tflow">TFlow</div>
                  <div className="we-layer-card-sub">Cross-platform automation</div>
                </div>
              </div>
              <p className="we-layer-card-body">
                Introduces automation across connected systems for providers operating at deeper
                maturity stages — Scale and Enterprise. Reduces manual handoffs between platforms.
              </p>
              <div className="we-layer-card-badge we-layer-card-badge--tflow">Scale &amp; Enterprise</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Engine features (dark navy) ── */}
      <section id="we-engine">
        <div className="we-outer">
          <div className="we-label we-label--light">Workflow Engine</div>
          <h2 className="we-section-heading we-section-heading--light">
            The rules you set. The platform enforces.
          </h2>
          <div id="we-engine-intro">
            <p className="we-body-text we-body-text--light">
              NDIS compliance does not fail because providers don't know the rules. It fails because
              the rules live in someone's head, in a policy document nobody opens, or in a process
              that depends on the right person being available.
            </p>
            <p className="we-body-text we-body-text--light">
              The Workflow Engine puts your operational rules into the platform itself — so they run
              consistently, across every team member, every site, and every shift.
            </p>
          </div>
          <div id="we-engine-grid">
            {ENGINE_FEATURES.map(({ heading, body, Icon }) => (
              <div key={heading} className="we-engine-card">
                <div className="we-engine-card-icon">
                  <Icon />
                </div>
                <div className="we-engine-card-heading">{heading}</div>
                <div className="we-engine-card-body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Runs (dark — two-col stepper) ── */}
      <section id="we-how">
        <div className="we-outer">
          <div id="we-how-inner">
            <div id="we-how-left">
              <div className="we-label we-label--light">How It Runs</div>
              <h2 className="we-section-heading we-section-heading--light">
                Every step generates data<br />that feeds the next.
              </h2>
              <p className="we-body-text we-body-text--light">
                When an auditor, plan manager, or board member asks a question, the answer already
                exists in the system.
              </p>
            </div>
            <div id="we-stepper">
              {HOW_IT_RUNS.map((item, idx) => (
                <div key={item.step} className="we-step">
                  <div className="we-step-left">
                    <div className="we-step-circle">{item.step}</div>
                    {idx < HOW_IT_RUNS.length - 1 && <div className="we-step-line" />}
                  </div>
                  <div className="we-step-content">
                    <div className="we-step-heading">{item.heading}</div>
                    <div className="we-step-body">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TFlow (white) ── */}
      <section id="we-tflow">
        <div className="we-outer">
          <div className="we-label">TFlow — For Deeper Maturity Stages</div>
          <h2 className="we-section-heading">
            Cross-platform automation for complex operational environments.
          </h2>
          <p className="we-body-text">
            As organisations grow, operations span multiple systems — workforce management,
            finance, payroll, participant records, external reporting. TFlow connects those
            systems so data moves between them automatically, without manual re-entry.
          </p>
          <div id="we-tflow-grid">
            {TFLOW_FEATURES.map(({ heading, body, Icon }) => (
              <div key={heading} className="we-tflow-card">
                <div className="we-tflow-card-icon">
                  <Icon />
                </div>
                <div className="we-tflow-card-heading">{heading}</div>
                <div className="we-tflow-card-body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where Each Layer Applies / Maturity (dark navy) ── */}
      <section id="we-maturity">
        <div className="we-outer">
          <div className="we-label we-label--light">Where Each Layer Applies</div>
          <h2 className="we-section-heading we-section-heading--light">
            Matched to your provider maturity stage.
          </h2>
          <p className="we-body-text we-body-text--light">
            The platform meets you where you are and grows with you. Configuration deepens. You
            never start again.
          </p>

          {/* Desktop table */}
          <table id="we-maturity-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Staff Range</th>
                <th>Focus</th>
                <th>Automation Capability</th>
                <th>Layer</th>
              </tr>
            </thead>
            <tbody>
              {MATURITY_STAGES.map((row) => (
                <tr key={row.stage} className={`we-maturity-row--${row.stage.toLowerCase()}`}>
                  <td><div className="we-maturity-stage">{row.stage}</div></td>
                  <td><div className="we-maturity-range">{row.staffRange}</div></td>
                  <td><span className="we-maturity-focus-word">{row.focusWord}</span></td>
                  <td>{row.body}</td>
                  <td>
                    <span className={`we-maturity-layer${row.isTflow ? " we-maturity-layer--tflow" : ""}`}>
                      {row.layer}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div id="we-maturity-cards">
            {MATURITY_STAGES.map((row) => (
              <div key={row.stage} className={`we-maturity-card we-maturity-card--${row.stage.toLowerCase()}`}>
                <div className="we-maturity-card-header">
                  <div className="we-maturity-card-stage">{row.stage}</div>
                  <span className="we-maturity-card-word">{row.focusWord}</span>
                </div>
                <div className="we-maturity-card-range">{row.staffRange}</div>
                <div className="we-maturity-card-body">{row.body}</div>
                <div className={`we-maturity-card-layer${row.isTflow ? " we-maturity-card-layer--tflow" : ""}`}>
                  {row.layer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases (white) ── */}
      <section id="we-usecases">
        <div className="we-outer">
          <div className="we-label">Where It Applies</div>
          <h2 className="we-section-heading">
            Workflows across your entire operation.
          </h2>
          <div id="we-usecases-grid">
            {USE_CASES.map(({ heading, body, Icon }) => (
              <div key={heading} className="we-usecase-card">
                <div className="we-usecase-card-icon">
                  <Icon />
                </div>
                <div className="we-usecase-card-heading">{heading}</div>
                <div className="we-usecase-card-body">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (dark gradient) ── */}
      <section id="we-cta">
        <div className="we-outer">
          <div id="we-cta-inner">
            <div id="we-cta-icon" aria-hidden="true">
              <IconGitBranch />
            </div>
            <h2 id="we-cta-heading">Book a Provider Maturity Review.</h2>
            <p id="we-cta-sub">
              We assess your current operations, identify your maturity stage, and show you exactly
              how the Workflow Engine — and TFlow, if relevant — maps to your existing processes.
            </p>
            <div id="we-cta-actions">
              <button type="button" className="we-btn-primary" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
              </button>
              <button type="button" className="we-btn-secondary" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            <p className="we-cta-footnote">
              Book a Provider Maturity Review. Start your provider setup. · tesseractapps.com.au
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkflowEngine;
