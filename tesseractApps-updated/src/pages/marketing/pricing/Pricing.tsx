import "./PricingStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { Download } from "lucide-react";
import featuresPdf from "../../../assets/TesseractApps-Features-Redesigned 1.pdf";
import HeroArcsLeftComponent from "../../../components/sections/heroArcsComponent/HeroArcsComponent";
import HeroArcsRightComponent from "../../../components/sections/heroArcsComponent/HeroArcsComponent";
import { homeLeftArcsData, homeRightArcsData } from "../../../data/homeArcsData";

// ── Types ──────────────────────────────────────────────────────────────────

type Stage = {
  id: string;
  label: string;
  tagline: string;
  staffRange: string;
  bestFor: string;
  whatYouNeed: string;
  automationHeading: string;
  automationBody: string;
  commercial: string[];
  supports: string[];
  badge: string;
  videoId?: string;
};

// ── Start (featured) ───────────────────────────────────────────────────────

const START_STAGE: Stage = {
  id: "start",
  label: "Start",
  tagline: "Early Provider Setup",
  staffRange: "1-15 staff",
  bestFor: "Founder-led or early-stage providers establishing their operations.",
  whatYouNeed:
    "Clear processes, documentation integrity, workforce visibility, and reduced cognitive load.",
  automationHeading: "Simplify operations and establish foundations.",
  automationBody:
    "Start is designed to simplify operations and establish foundations. During the current launch window, expanded onboarding support can include payroll and e-signature workflows for eligible early adopters.",
  commercial: ["Setup fee only", "No subscription during Start", "Up to 18 months"],
  supports: [
    "Participant onboarding",
    "Rostering",
    "Case notes",
    "Incident logging",
    "Timesheets",
    "Claims",
    "Structured document storage",
    "Guided onboarding",
  ],
  badge: "Founding Window",
};

// ── Flip card stages ───────────────────────────────────────────────────────

const FLIP_STAGES: Stage[] = [
  {
    id: "growth",
    label: "Growth",
    tagline: "Operational Control",
    staffRange: "15–60 staff",
    bestFor:
      "Providers experiencing workforce expansion, payroll pressure, and increasing reporting needs.",
    whatYouNeed: "Control, reporting clarity, payroll alignment, and manager accountability.",
    automationHeading: "T-Flow automation",
    automationBody:
      "Growth introduces structured automation through T-Flow automation using template-driven boards, limited stage edits, and basic triggers. This is where automation begins to save meaningful time in day-to-day workflows such as onboarding, intake routing, document handling, and follow-up actions.",
    commercial: ["$39.99 per seat / month", "3-year agreement", "Up to 10% flex user buffer"],
    supports: [
      "Operational dashboards",
      "Payroll-to-roster alignment visibility",
      "Funding tracking",
      "Manager-level reporting",
      "Documentation consistency",
      "Workflow structure across teams",
    ],
    badge: "Most Common",
  },
  {
    id: "scale",
    label: "Scale",
    tagline: "Governance & Oversight",
    staffRange: "60–120 staff",
    bestFor:
      "Multi-site providers, SIL providers, and organisations managing increasing governance pressure.",
    whatYouNeed: "Oversight, accountability, approvals, audit trails, and compliance control.",
    automationHeading: "T-Flow automation becomes a governance tool.",
    automationBody:
      "At Scale, T-Flow automation expands into configurable boards, SLA rules, escalation logic, and workflow analytics. This is where process automation becomes a governance tool, not just an efficiency tool.",
    commercial: ["$39.99 per seat / month", "3-year agreement", "Up to 15% flex user buffer"],
    supports: [
      "Approval workflows",
      "Delegation controls",
      "Audit trails",
      "Incident escalation",
      "Compliance reporting",
      "Executive dashboards",
    ],
    badge: "Multi-Site",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    tagline: "Consolidation & Executive Visibility",
    staffRange: "120+ staff",
    bestFor:
      "Executive teams requiring financial consolidation, multi-entity oversight, and board-level reporting.",
    whatYouNeed:
      "One source of truth across operations, finance, workforce, and governance.",
    automationHeading: "T-Flow automation",
    automationBody:
      "Enterprise activates TFlow for cross-module automation and gives T-Flow automation full orchestration capability across the platform. This supports deeper operational automation, financial control, and governance execution at scale.",
    commercial: ["$39.99 per seat / month", "5-year agreement", "Strategic flex user pools"],
    supports: [
      "Native payroll",
      "Native accounting",
      "Multi-entity reporting",
      "Executive dashboards",
      "Consolidated financial visibility",
      "Board-ready reporting",
    ],
    badge: "Full Platform",
  },
];

const PAID_STAGE_ORDER: Array<"growth" | "scale" | "enterprise"> = [
  "growth",
  "scale",
  "enterprise",
];

const PAID_STAGE_LOOKUP = FLIP_STAGES.reduce<Record<string, Stage>>((acc, stage) => {
  acc[stage.id] = stage;
  return acc;
}, {});

const PAID_COMPARISON_ROWS = [
  {
    label: "Team size fit",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].staffRange),
  },
  {
    label: "Best for",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].bestFor),
  },
  {
    label: "What you need",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].whatYouNeed),
  },
  {
    label: "Automation focus",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].automationHeading),
  },
  {
    label: "Commercial terms",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].commercial),
  },
  {
    label: "What this stage supports",
    values: PAID_STAGE_ORDER.map((id) => PAID_STAGE_LOOKUP[id].supports),
  },
];

// ── Flip Card ──────────────────────────────────────────────────────────────

// function FlipCard({ stage, onCtaClick }: { stage: Stage; onCtaClick: () => void }) {
//   const [flipped, setFlipped] = useState(false);
//   const [videoPlaying, setVideoPlaying] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(() =>
//     typeof window !== "undefined" ? window.innerWidth < 900 : false
//   );

//   useEffect(() => {
//     const mq = window.matchMedia("(max-width: 899px)");
//     const handler = (e: MediaQueryListEvent) => {
//       setIsMobile(e.matches);
//       if (!e.matches) setOpen(false);
//     };
//     mq.addEventListener("change", handler);
//     setIsMobile(mq.matches);
//     return () => mq.removeEventListener("change", handler);
//   }, []);

//   // ── Mobile: single accordion card ─────────────────────────────────────
//   if (isMobile) {
//     return (
//       <div className="pr-accordion-card">
//         {/* Always-visible header */}
//         <button
//           type="button"
//           className="pr-accordion-header"
//           onClick={() => setOpen((v) => !v)}
//         >
//           <div className="pr-accordion-header-left">
//             <div className="pr-flip-badge">{stage.badge}</div>
//             <h3 className="pr-flip-name">{stage.label}</h3>
//             <p className="pr-flip-tagline">{stage.tagline}</p>
//             <p className="pr-flip-range">{stage.staffRange}</p>
//             <div className="pr-flip-commercial">
//               {stage.commercial.map((line) => (
//                 <div key={line} className="pr-flip-commercial-item">
//                   <span className="pr-flip-dot" />
//                   {line}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="pr-accordion-chevron">
//             {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </div>
//         </button>

//         {/* Expandable details */}
//         <div className={`pr-accordion-body${open ? " pr-accordion-body--open" : ""}`}>
//           <div className="pr-accordion-body-inner">
//             <p className="pr-accordion-best-for">{stage.bestFor}</p>
//             <div className="pr-flip-back-label">What you need</div>
//             <p className="pr-accordion-what-you-need">{stage.whatYouNeed}</p>
//             <div className="pr-flip-back-label pr-flip-back-label--mt">What this stage supports</div>
//             <ul className="pr-flip-supports">
//               {stage.supports.map((item) => (
//                 <li key={item} className="pr-flip-supports-item">
//                   <span className="pr-flip-dot" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//             <div className="pr-flip-back-label pr-flip-back-label--mt">Automation focus</div>
//             <p className="pr-flip-automation-heading">{stage.automationHeading}</p>
//             <button
//               type="button"
//               className="pr-flip-cta"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onCtaClick();
//               }}
//             >
//               Book a Demo
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Desktop: 3D flip card ──────────────────────────────────────────────
//   return (
//     <div
//       className={`pr-flip-card${flipped ? " pr-flip-card--flipped" : ""}`}
//       onMouseEnter={() => setFlipped(true)}
//       onMouseLeave={() => {
//         setFlipped(false);
//         setVideoPlaying(false);
//       }}
//       onClick={() => setFlipped((f) => !f)}
//     >
//       <div className="pr-flip-card-inner">
//         {/* Front */}
//         <div className="pr-flip-card-front">
//           <div className="pr-flip-badge">{stage.badge}</div>
//           <h3 className="pr-flip-name">{stage.label}</h3>
//           <p className="pr-flip-tagline">{stage.tagline}</p>
//           <p className="pr-flip-range">{stage.staffRange}</p>
//           <div className="pr-flip-commercial">
//             {stage.commercial.map((line) => (
//               <div key={line} className="pr-flip-commercial-item">
//                 <span className="pr-flip-dot" />
//                 {line}
//               </div>
//             ))}
//           </div>
//           <p className="pr-flip-best-for">{stage.bestFor}</p>
//           <div className="pr-flip-hint">See what's included →</div>
//         </div>

//         {/* Back */}
//         <div className="pr-flip-card-back">
//           <div className="pr-flip-back-label">What you need</div>
//           <p className="pr-flip-what-you-need">{stage.whatYouNeed}</p>
//           <div className="pr-flip-back-label pr-flip-back-label--mt">What this stage supports</div>
//           <ul className="pr-flip-supports">
//             {stage.supports.map((item) => (
//               <li key={item} className="pr-flip-supports-item">
//                 <span className="pr-flip-dot" />
//                 {item}
//               </li>
//             ))}
//           </ul>
//           <p className="pr-flip-automation-heading pr-flip-automation-heading--footer">
//             {stage.automationHeading}
//           </p>
//           <div className="pr-flip-back-actions">
//             {stage.videoId && (
//               videoPlaying ? (
//                 <div className="pr-video-frame">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${stage.videoId}?autoplay=1`}
//                     title={`${stage.label} Overview`}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   className="pr-flip-video-btn pr-flip-video-btn--active"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setVideoPlaying(true);
//                   }}
//                 >
//                   <Play size={12} fill="currentColor" />
//                   Watch {stage.label} Overview
//                 </button>
//               )
//             )}
//             <button
//               type="button"
//               className="pr-flip-cta"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onCtaClick();
//               }}
//             >
//               Book a Demo
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// ── Component ──────────────────────────────────────────────────────────────

const Pricing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"growth" | "scale" | "enterprise">("growth");

  return (
    <div id="pr-page">
      <SEO
        title="NDIS Software Pricing | $39.99 per seat/month | TesseractApps"
        description="Transparent NDIS software pricing with one unified platform across Growth, Scale, and Enterprise. Start stage supports early-stage providers for up to 18 months with setup only. Governance depth grows with operational maturity."
      />

      {/* ── Hero ── */}
      <section id="pr-hero">
        <HeroArcsLeftComponent pendulums={homeLeftArcsData} />
        <div id="pr-hero-inner">
          <div id="pr-hero-logo" role="img" aria-label="Tesseract Apps Logo" />
          <h1 id="pr-hero-heading">
            One Platform.<br />
            Unified Architecture.<br />
            Scalable Governance.
          </h1>
          <p id="pr-hero-sub">
            Operations remain consistent.<br />
            Governance depth increases as your organisation grows.
          </p>
          <div id="pr-hero-price-block">
            <div id="pr-hero-price">$39.99</div>
            <div id="pr-hero-price-meta">
              <span id="pr-hero-price-unit">/ seat / month</span>
              <span id="pr-hero-price-note">Stable across Growth, Scale, and Enterprise</span>
            </div>
          </div>
          <p id="pr-hero-start-note">
            Start is designed for early-stage providers during the first 18 months of operational
            formation. Setup fee applies. No subscription during Start.
          </p>
          <div id="pr-hero-ctas">
            <button
              type="button"
              className="pr-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="pr-btn-secondary"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
            <a
              href={featuresPdf}
              download="TesseractApps-Features.pdf"
              className="pr-btn-download"
            >
              <Download size={15} />
              Download Features PDF
            </a>
          </div>
          <p className="pr-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
        </div>
        <HeroArcsRightComponent pendulums={homeRightArcsData} />
      </section>

      {/* ── Start Featured ── */}
      <section id="pr-start">
        <div className="pr-outer">
          <div className="pr-label-wrapper">
            <div className="pr-label pr-label--dark">Primary Entry Point</div>
          </div>
          <div
            id="pr-featured-plan"
          >
            <div id="pr-featured-left">
              <div id="pr-featured-header">
                <div className="pr-stage-badge pr-stage-badge--featured">
                  {START_STAGE.badge}
                </div>
                <h3 id="pr-featured-name">
                  {START_STAGE.label}
                  <span id="pr-featured-tagline"> - {START_STAGE.tagline}</span>
                </h3>
                <p id="pr-featured-range">{START_STAGE.staffRange}</p>
              </div>

              <div id="pr-featured-commercial">
                {START_STAGE.commercial.map((line) => (
                  <div key={line} className="pr-commercial-item pr-commercial-item--featured">
                    <span className="pr-commercial-dot" />
                    {line}
                  </div>
                ))}
              </div>

              <div id="pr-featured-detail-grid">
                <div>
                  <div className="pr-featured-detail-label">Best for</div>
                  <p className="pr-featured-detail-text">{START_STAGE.bestFor}</p>
                </div>
                <div>
                  <div className="pr-featured-detail-label">What you need</div>
                  <p className="pr-featured-detail-text">{START_STAGE.whatYouNeed}</p>
                </div>
                <div>
                  <div className="pr-featured-detail-label">Automation focus</div>
                  <p className="pr-featured-detail-text pr-featured-detail-text--accent">
                    {START_STAGE.automationHeading}
                  </p>
                  <p className="pr-featured-detail-text pr-featured-detail-text--sm">
                    {START_STAGE.automationBody}
                  </p>
                </div>
                <div>
                  <div className="pr-featured-detail-label">What this stage supports</div>
                  <ul className="pr-supports-list">
                    {START_STAGE.supports.map((item) => (
                      <li key={item} className="pr-supports-item">
                        <span className="pr-supports-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="pr-featured-actions">
                <button
                  type="button"
                  className="pr-btn-primary"
                  onClick={() => navigate("/book-a-demo")}
                >
                  Book a Demo
                </button>
                <button
                  type="button"
                  className="pr-btn-secondary--dark"
                  onClick={() => navigate("/signup")}
                >
                  Begin Your Journey
                </button>
              </div>
              <p className="pr-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Find Your Stage (flip cards) ── */}
      {/* <section id="pr-stages">
        <div className="pr-outer">
          <div className="pr-label-wrapper">
            <div className="pr-label pr-label--dark">Find Your Stage</div>
          </div>
          <h2 className="pr-section-heading">Growth. Scale. Enterprise.</h2>
          <p className="pr-body-text pr-body-text--center">
            Every provider operates the same core lifecycle. What changes as organisations grow is
            how much visibility, control, automation, and governance they need.
          </p>
          <div id="pr-flip-grid">
            {FLIP_STAGES.map((stage) => (
              <FlipCard
                key={stage.id}
                stage={stage}
                onCtaClick={() => navigate("/book-a-demo")}
              />
            ))}
          </div>
          <p className="pr-flip-hint-text">Hover or tap a card to explore each stage.</p>
        </div>
      </section> */}

      {/* ── Paid Plans Comparison ── */}
      <section id="pr-paid-compare">
        <div className="pr-outer">
          <div className="pr-label-wrapper">
            <div className="pr-label pr-label--dark">Paid Plans Comparison</div>
          </div>
          <h2 className="pr-section-heading pr-section-heading--center">
            Compare Growth, Scale, and Enterprise
          </h2>
          <p className="pr-body-text pr-body-text--center pr-paid-compare-sub">
            One price per seat. Different governance depth, controls, and visibility as your
            organisation matures.
          </p>

          {/* ── Desktop: unified sticky-header table ── */}
          <div className="pr-cmp-table-wrap" aria-label="Paid plans comparison">
            <table className="pr-cmp-table">
              <thead>
                <tr className="pr-cmp-head-row">
                  <th className="pr-cmp-th pr-cmp-th--label" scope="col" aria-label="Category" />
                  {PAID_STAGE_ORDER.map((id) => {
                    const stage = PAID_STAGE_LOOKUP[id];
                    return (
                      <th
                        key={id}
                        className={`pr-cmp-th pr-cmp-th--plan pr-cmp-th--${id}`}
                        scope="col"
                      >
                        <div className="pr-cmp-plan-name">{stage.label}</div>
                        <div className="pr-cmp-plan-tag">{stage.tagline}</div>
                        <div className="pr-cmp-plan-badge">{stage.badge}</div>
                        <div className="pr-cmp-plan-range">{stage.staffRange}</div>
                        <ul className="pr-cmp-plan-commercial">
                          {stage.commercial.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PAID_COMPARISON_ROWS.map((row, rowIndex) => (
                  <tr
                    key={row.label}
                    className={`pr-cmp-row${rowIndex % 2 === 0 ? " pr-cmp-row--alt" : ""}`}
                  >
                    <th className="pr-cmp-td pr-cmp-td--label" scope="row">
                      {row.label}
                    </th>
                    {row.values.map((value, colIndex) => (
                      <td
                        className={`pr-cmp-td pr-cmp-td--${PAID_STAGE_ORDER[colIndex]}`}
                        key={`${row.label}-${PAID_STAGE_ORDER[colIndex]}`}
                      >
                        {Array.isArray(value) ? (
                          <ul className="pr-cmp-cell-list">
                            {value.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="pr-cmp-cell-text">{value}</p>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile: plan-selector tabs + single-plan card ── */}
          <div className="pr-cmp-mobile" aria-label="Paid plans comparison">
            <div className="pr-cmp-tabs" role="tablist">
              {PAID_STAGE_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id ? "true" : "false"}
                  className={`pr-cmp-tab pr-cmp-tab--${id}${activeTab === id ? " pr-cmp-tab--active" : ""}`}
                  onClick={() => setActiveTab(id)}
                >
                  {PAID_STAGE_LOOKUP[id].label}
                </button>
              ))}
            </div>

            {(() => {
              const stage = PAID_STAGE_LOOKUP[activeTab];
              const colIndex = PAID_STAGE_ORDER.indexOf(activeTab);
              return (
                <div
                  key={activeTab}
                  className={`pr-cmp-mobile-card pr-cmp-mobile-card--${activeTab}`}
                  role="tabpanel"
                >
                  <div className="pr-cmp-mobile-card-header">
                    <div className="pr-cmp-plan-badge">{stage.badge}</div>
                    <div className="pr-cmp-plan-name">{stage.label}</div>
                    <div className="pr-cmp-plan-tag">{stage.tagline}</div>
                    <div className="pr-cmp-plan-range">{stage.staffRange}</div>
                    <ul className="pr-cmp-plan-commercial">
                      {stage.commercial.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <dl className="pr-cmp-mobile-rows">
                    {PAID_COMPARISON_ROWS.map((row, i) => (
                      <div
                        key={row.label}
                        className={`pr-cmp-mobile-row${i % 2 === 0 ? " pr-cmp-mobile-row--alt" : ""}`}
                      >
                        <dt className="pr-cmp-mobile-row-label">{row.label}</dt>
                        <dd className="pr-cmp-mobile-row-value">
                          {Array.isArray(row.values[colIndex]) ? (
                            <ul className="pr-cmp-cell-list">
                              {(row.values[colIndex] as string[]).map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="pr-cmp-cell-text">{row.values[colIndex] as string}</p>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── Why Different ── */}
      <section id="pr-why">
        <div className="pr-outer">
          <div id="pr-why-compare">
            <div className="pr-compare-grid">
              <div className="pr-compare-col pr-compare-col--other">
                <div className="pr-compare-col-label">Most software platforms</div>
                <ul className="pr-compare-list">
                  <li>Different prices for different feature sets</li>
                  <li>Multiple disconnected systems</li>
                  <li>Providers often replace systems as they grow</li>
                </ul>
              </div>
              <div className="pr-compare-col pr-compare-col--ours">
                <div className="pr-compare-col-label">TesseractApps</div>
                <ul className="pr-compare-list">
                  <li>One unified architecture</li>
                  <li>Governance depth evolves with maturity</li>
                  <li>Providers grow inside the same platform</li>
                </ul>
              </div>
            </div>
            <div id="pr-why-footer">
              TesseractApps grows with you, this is infrastructure, not a simple tool.
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="pr-cta-banner">
        <div className="pr-outer">
          <div id="pr-cta-banner-inner">
            <div className="pr-label pr-label--blue">Get Started</div>
            <h2 id="pr-cta-heading">See how TesseractApps works for your organisation.</h2>
            <p id="pr-cta-sub">
              Your demo is configured for your care type, team size, and provider maturity stage.
              30 minutes. Live platform, not a slide deck. Start your provider setup.
            </p>
            <div id="pr-cta-actions">
              <button
                type="button"
                className="pr-btn-primary pr-btn-large"
                onClick={() => navigate("/book-a-demo")}
              >
                Book a Demo
              </button>
              <button
                type="button"
                className="pr-btn-outline pr-btn-large"
                onClick={() => navigate("/signup")}
              >
                Begin Your Journey
              </button>
            </div>
            <p className="pr-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
