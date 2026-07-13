import "./SCPricingStyles.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { trackCTAClick } from "../../../utils/analytics";
import scVideo from "../../../assets/pricing_videos/SC APP VIDEO.mp4";
import VideoThumbnailPlayButton from "../../../components/ui/videoModal/VideoThumbnailPlayButton";
import VideoModal from "../../../components/ui/videoModal/VideoModal";
import VideoThumbnailPlayButtonMobile from "../../../components/ui/videoModal/VideoThumbnailPlayButtonMobile";

// SC App feature data

// const SC_FEATURES: { label: string; description: string }[] = [
//   {
//     label: "Participant Management",
//     description:
//       "All your participant profiles in one place: demographics, support needs, goals, risk information, and contacts. Find anyone in seconds with search and filters.",
//   },
//   {
//     label: "Referrals Tracking",
//     description:
//       "Track every referral from first contact to onboarding. Know exactly where each potential participant is in the pipeline so no one gets missed.",
//   },
//   {
//     label: "Service Agreements",
//     description:
//       "Generate, e-sign with T-sign, and store every agreement in one place. SC agreements and third-party provider arrangements alike. Link funding to support items and never chase paperwork again.",
//   },
//   {
//     label: "Funding & Budget Tracking",
//     description:
//       "Always know where a participant's plan budget stands. See what's committed, what's been used, and what's remaining across every support category, in real time.",
//   },
//   {
//     label: "Budget Builder",
//     description:
//       "Model participant budgets before plans are confirmed. Show participants how their funding could be allocated across categories and make planning conversations easier.",
//   },
//   {
//     label: "Case Notes & Progress Reporting",
//     description:
//       "Write case notes connected to participant goals. Auto-generate progress reports for participants, families, and the NDIA when review time comes.",
//   },
//   {
//     label: "Note Templates",
//     description:
//       "Standardise case note formats across your team. Spend less time on structure and more time on the support you're providing.",
//   },
//   {
//     label: "Task Board",
//     description:
//       "A daily and weekly view of every coordination task. Drag tasks between days, add notes and charges on the same screen.",
//   },
//   {
//     label: "Participant Check-ins",
//     description:
//       "Know exactly when you last made contact with every participant. Spot who needs a follow-up before it becomes an issue and keep a clear record of your coordination activity when the NDIA asks.",
//   },
//   {
//     label: "Time Tracking & On-the-Go Billing",
//     description:
//       "Log time and bill for support coordination activities as you go, from any device, anywhere. Reduce end-of-day admin and keep billing accurate without doubling up on data entry.",
//   },
//   {
//     label: "NDIS Claiming & Invoicing",
//     description:
//       "Track claim status, reconcile payments, and generate invoices automatically. No double entry.",
//   },
//   {
//     label: "NDIA Bulk Uploads",
//     description:
//       "Save time on high-volume claiming and reduce the risk of errors from submitting one by one.",
//   },
//   {
//     label: "Custom Document Generation",
//     description:
//       "Populate professional documents from your own templates using live participant data. Cut hours of copy-paste work every week.",
//   },
//   {
//     label: "Dashboards",
//     description:
//       "See your whole caseload at a glance. Budget utilisation, claim volumes, compliance status, and team activity, all live, all in one screen.",
//   },
//   {
//     label: "Audit Evidence & Compliance",
//     description:
//       "Every action is logged. When an audit comes, generate a compliance pack or NDIS Commission submission document on demand. Nothing to scramble for.",
//   },
//   {
//     label: "Track Expiring Documents",
//     description:
//       "Automatic alerts before participant, staff, and provider compliance documents expire. Never miss a deadline that puts you or your participants out of compliance.",
//   },
//   {
//     label: "Staff Records Tracking",
//     description:
//       "Keep qualifications, certificates, and compliance documents in one place, with alerts when credentials are coming up for renewal.",
//   },
//   {
//     label: "Mobile Access",
//     description:
//       "Log case notes, access participant records, manage tasks, and capture signatures from your phone, whether you're in the office, at a participant's home, or on the road.",
//   },
//   {
//     label: "Teams",
//     description:
//       "Organise coordinators into teams, assign participants, and track workloads across your organisation so nothing falls through the cracks when staff are busy or away.",
//   },
//   {
//     label: "Unlimited Participants & Files",
//     description:
//       "No caps on how many participants you manage or how many documents you store. Your subscription scales with your business, not against it.",
//   },
// ];

const SC_FEATURES: { label: string; description: string }[] = [
  {
    label: "Participant Management",
    description:
      "Centralised participant profiles with complete NDIS information including plan details, funding allocations, disability classifications, support needs, contact information, and linked providers. Track active participants, pin important cases, and monitor plan periods at a glance. ",
  },
  {
    label: "Service Agreements",
    description:
      "Create, manage, and track service agreements with providers. Document service types, budgets, duration, and terms to ensure clear expectations and compliance with NDIS requirements. ",
  },
  {
    label: "Budget Builder",
    description:
      "Visualise and allocate participant budgets across support categories. Track spending against allocations in real-time, identify underspend or overspend risks, and make informed decisions about resource distribution. ",
  },
  {
    label: "Case Note Templates",
    description:
      "Standardise documentation with customisable note templates for common scenarios. Capture contact methods, duration, billable time, activity details, and budget impact efficiently. Includes voice-to-text functionality for faster note creation on the go. ",
  },
  {
    label: "Participant Check-ins",
    description:
      "Schedule and document regular participant contact. Track welfare checks, progress discussions, and support adjustments to maintain consistent engagement and demonstrate duty of care. ",
  },
  {
    label: "NDIS Claiming & Invoicing",
    description:
      "Generate compliant invoices and manage billing workflows. Track pending, generated, and cancelled invoices. Monitor total invoice values and maintain accurate financial records for audit purposes. ",
  },
  {
    label: "Custom Document Generation",
    description:
      "Create professional reports, correspondence, and compliance documents tailored to your organisation's branding and NDIS requirements. Streamline documentation workflows and maintain consistency across your team. ",
  },
  {
    label: "Audit Evidence & Compliance",
    description:
      "Maintain comprehensive audit trails with linked evidence, case notes, and progress records. Demonstrate compliance with NDIS Practice Standards and quality assurance requirements through organised, accessible documentation. ",
  },
  {
    label: "Staff Records Tracking",
    description:
      "Manage support coordinator details, qualifications, and capacity. Track staff allocations across participants and ensure appropriate caseload distribution. ",
  },
  {
    label: "Teams Collaboration",
    description:
      "Coordinate across your support coordination team with shared visibility of participants, tasks, and case notes. Facilitate handovers, collaborative case management, and consistent service delivery. ",
  },
  {
    label: "Referrals Management",
    description:
      "Track referrals to and from other providers, LACs, and support services. Monitor referral status, outcomes, and follow-up actions to ensure participants receive timely, appropriate supports. ",
  },
  {
    label: "Funding & Budget Tracking",
    description:
      "Monitor participant funding across all support categories. View total budgets, current spending, remaining funds, and budget status at both participant and cohort levels. Identify financial risks early and optimise resource utilisation. ",
  },
  {
    label: "Case Notes & Progress Reporting",
    description:
      "Document participant interactions, progress towards goals, and support effectiveness. Link case notes to specific goals, tasks, and billing entries for comprehensive outcome tracking and reporting. ",
  },
  {
    label: "Task Board",
    description:
      "Organise and prioritise work with visual task management. Assign tasks to team members, set due dates, track progress, and ensure nothing falls through the cracks. Link tasks to specific participants and goals for context. ",
  },
  {
    label: "Time Tracking & On-the-Go Billing",
    description:
      "Record billable and non-billable time with precision. Capture service types, item numbers, and estimated costs in real-time. Mobile access ensures you can log activities as they happen, improving accuracy and reducing administrative burden. ",
  },
  {
    label: "NDIA Bulk Uploads",
    description:
      "Streamline reporting to the NDIA with bulk upload capabilities. Prepare and submit required data efficiently, reducing manual entry and ensuring compliance with reporting obligations. ",
  },
  {
    label: "Dashboards",
    description:
      "Gain instant visibility into your caseload with customisable dashboards. Monitor active participants, goals, pending tasks, billable hours, upcoming events, and key performance indicators in one centralised view. ",
  },
  {
    label: "Track Expiring Documents",
    description:
      "Receive alerts for expiring participant documents, service agreements, and compliance requirements. Proactively manage renewals to maintain continuous service delivery and avoid compliance gaps. ",
  },
  {
    label: "Mobile Access",
    description:
      "Access the full platform from any device. Conduct community visits, document activities in real-time, and stay connected to your caseload whether you're in the office or in the field. ",
  },
  {
    label: "Unlimited Participants & Files",
    description:
      "Scale your practice without limitations. Manage as many participants as your caseload requires with no restrictions on file storage, attachments, or historical records. ",
  },
  {
    label: "Voice to Text",
    description:
      "Dictate case notes and activity details hands-free. Ideal for community visits and real-time documentation, voice-to-text functionality saves time and improves note accuracy while maintaining a natural workflow. ",
  },
  {
    label: "Document Storage",
    description:
      "Securely store and organise participant documents, reports, and compliance evidence within the platform. Centralised document management ensures easy retrieval, version control, and audit readiness. ",
  },
];

// const SC_COMING_SOON: { label: string; description: string }[] = [
//   {
//     label: "Provider Match Score",
//     description:
//       "Automatically score and rank service providers against a participant's needs, location, and preferences — so you spend less time searching and more time coordinating.",
//   },
//   {
//     label: "Referral Tracking",
//     description:
//       "Track every referral from first contact to onboarding. A full pipeline view so no participant slips through the cracks.",
//   },
//   {
//     label: "Plan Review & Reassessment Alerts",
//     description:
//       "Automated alerts before plan reviews and reassessments are due. Never miss a deadline that affects a participant's funding.",
//   },
//   {
//     label: "Proactive Action Queue",
//     description:
//       "A prioritised daily queue of actions requiring your attention — follow-ups, expiring documents, budget thresholds, and check-in reminders surfaced automatically.",
//   },
//   {
//     label: "Document Storage",
//     description:
//       "Centralised storage for all participant and provider documents. Linked directly to service agreements, plans, and compliance records.",
//   },
//   {
//     label: "Voice to Text",
//     description:
//       "Dictate case notes hands-free and have them transcribed instantly. Capture support coordination activity on the go without typing.",
//   },
//   {
//     label: "Forms Module",
//     description:
//       "Build, send, and collect structured forms for referrals, assessments, and consent. Responses linked automatically to participant profiles.",
//   },
//   {
//     label: "SC Reporting to NDIA & Plan Managers",
//     description:
//       "Generate and submit NDIS Commission-ready SC reports and plan manager statements directly from your case notes and coordination activity — no copy-paste required.",
//   },
// ];
const SC_COMING_SOON: { label: string; description: string }[] = [
  {
    label: "Provider Match Score",
    description:
      "Intelligently match participants with suitable providers based on location, specialisation, capacity, cultural considerations, and participant needs. Streamline the referral process and improve support outcomes. ",
  },
  {
    label: "Plan Review & Reassessment Alerts",
    description:
      "Automated notifications for upcoming plan reviews, reassessment dates, and key milestones. Ensure timely preparation for plan reviews and proactive participant engagement. ",
  },
  {
    label: "Forms Module",
    description:
      "Create custom forms for participant intake, assessments, service requests, and feedback. Digitise paper-based processes and capture structured data that integrates directly with participant records. ",
  },
  {
    label: "Proactive Action Queue",
    description:
      "Intelligent task prioritisation based on participant needs, compliance requirements, and upcoming deadlines. Stay ahead of critical actions and reduce the risk of missed obligations. ",
  },
  {
    label: "SC Reporting to NDIA & Plan Managers",
    description:
      "Generate comprehensive reports for the NDIA and plan managers demonstrating support coordination activities, participant progress, and outcomes. Streamline reporting obligations and showcase the value of your support. ",
  },
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "How does the 3 months free offer work?",
    answer:
      "New 12 Month Plan subscribers receive a 3-month introductory waiver starting from the Billing Anchor Month (the calendar month the agreement is signed) plus the 2 following months. The first invoice issues after the waiver period ends. This waiver is forfeited if the subscription is cancelled before the 12-month term is completed and cannot be combined with any other free trial.",
  },
  {
    question: "Can I cancel early?",
    answer:
      "Yes, with 30 days' written notice. The 12 Month Plan is a fixed-term commitment. The outstanding balance for the remainder of the term remains payable on early exit. Access continues until the end of the paid period.",
  },
  {
    question: "What happens when my term ends?",
    answer:
      "Your subscription auto-renews on a 12-month basis at the then-current rate unless cancelled with 30 days' written notice before the renewal date. The introductory waiver does not apply on renewal.",
  },
  {
    question: "Can I switch from the Monthly plan?",
    answer:
      "Yes. Contact sales@tesseractapps.com to arrange the switch. Your new 12-month commitment begins from the Billing Anchor Month of your upgrade date.",
  },
  {
    question: "Are there any other fees?",
    answer:
      "The subscription covers all core features and standard integrations. Optional paid add-ons (such as Assisted Onboarding) are available separately. All prices are in AUD and exclude GST, which is added at checkout. Pricing is subject to change with 30 days' written notice; your rate is locked for the duration of your current billing term.",
  },
  {
    question: "How do I get started?",
    answer:
      "Visit tesseractapps.com.au or reach us at sales@tesseractapps.com or 1300 252 808. By subscribing you agree to these terms. All plans are governed by the laws of the Australian Capital Territory, Australia.",
  },
];

const WHY_ITEMS = [
  {
    label: "No per-signature fees",
    description:
      "We include unlimited e-signatures for a flat $10/seat/month add-on, no per-document fees, ever.",
  },
  {
    label: "One user type, one price",
    description:
      "No confusing standard vs support worker pricing tiers. Every user on your team gets the full platform.",
  },
  {
    label: "Audit-ready from day one",
    description:
      "Every action is logged. Compliance documentation generated on demand. Nothing to scramble for when the NDIS Commission calls.",
  },
  {
    label: "Built only for Support Coordination",
    description:
      "Not a generic NDIS tool stretched to fit. Designed specifically for the way Support Coordinators work.",
  },
];

// Feature chip with tooltip

function FeatureChip({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <li
      ref={ref}
      className={`scp-feature-chip${open ? " scp-feature-chip--open" : ""}`}
      onMouseEnter={() => {
        if (!isTouchDevice.current) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice.current) setOpen(false);
      }}
      onClick={() => {
        if (isTouchDevice.current) setOpen((v) => !v);
      }}
      aria-label={`${label}, tap for details`}
    >
      <svg
        className="scp-chip-check"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.12" />
        <path
          d="M4 7l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="scp-chip-label">{label}</span>
      <svg
        className="scp-chip-info"
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="8"
          cy="8"
          r="7.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="7.25"
          y="6.5"
          width="1.5"
          height="5.5"
          rx="0.75"
          fill="currentColor"
        />
        <circle cx="8" cy="4.25" r="0.875" fill="currentColor" />
      </svg>
      {open && (
        <span className="scp-chip-tooltip" role="tooltip">
          {description}
        </span>
      )}
    </li>
  );
}

// FAQ accordion item

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`scp-faq-item${open ? " scp-faq-item--open" : ""}`}>
      <button
        type="button"
        className="scp-faq-question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          className="scp-faq-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && <p className="scp-faq-answer">{answer}</p>}
    </div>
  );
}

// Component

const SCPricing = () => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <div id="scp-page">
      <SEO
        title="SC App Pricing & Features | TesseractApps"
        description="Purpose-built NDIS Support Coordination software. One price, every feature included. Manage participants, stay compliant, and get paid without the admin overhead."
      />

      {/* Hero */}
      <section id="scp-hero">
        <div id="scp-hero-inner">
          <div className="scp-label scp-label--light">
            Support Coordination Pricing &amp; Features
          </div>
          <h1 id="scp-hero-heading">
            Built for Support Coordinators.{" "}
            <span id="scp-hero-heading-accent">
              Not adapted,
              <br />
              built from scratch.
            </span>
          </h1>
          <p id="scp-hero-sub">
            Everything you need to manage participants, stay compliant, and get
            paid, without the admin overhead.
          </p>
          <VideoThumbnailPlayButton
            marginTop="40px"
            onClick={() => setVideoOpen(true)}
            videoData={scVideo}
          />
          <VideoThumbnailPlayButtonMobile
            onClick={() => setVideoOpen(true)}
            videoData={scVideo}
            marginBottom="20px"
          />
          <div id="scp-hero-ctas">
            <button
              type="button"
              className="primary-cta"
              onClick={() => {
                trackCTAClick(
                  "book_demo",
                  "sc_pricing_hero_demo",
                  "/sc-pricing",
                );
                navigate("/book-a-demo/");
              }}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="scp-btn-hero-outline"
              onClick={() => navigate("/solutions/support-coordination/")}
            >
              Learn More
            </button>
          </div>

          <p className="scp-cta-sub-note">
            12-month commitment required for the yearly plan.
          </p>
        </div>

        <div id="scp-hero-stats">
          <div className="scp-hero-stat">
            <div className="scp-hero-stat-value">14+</div>
            <div className="scp-hero-stat-label">Features included</div>
          </div>
          <div className="scp-hero-stat">
            <div className="scp-hero-stat-value">$0</div>
            <div className="scp-hero-stat-label">Setup cost</div>
          </div>
          <div className="scp-hero-stat">
            <div className="scp-hero-stat-value">99.9%</div>
            <div className="scp-hero-stat-label">Uptime SLA</div>
          </div>
          <div className="scp-hero-stat">
            <div className="scp-hero-stat-value">ISO</div>
            <div className="scp-hero-stat-label">
              27001 &amp; 9001 certified
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="scp-pricing">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Pricing</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            What does it cost?
          </h2>

          {/* Billing toggle */}
          <div className="scp-toggle-wrap">
            <div className="scp-toggle">
              <button
                type="button"
                className={`scp-toggle-btn${billing === "monthly" ? " scp-toggle-btn--active" : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`scp-toggle-btn${billing === "annual" ? " scp-toggle-btn--active" : ""}`}
                onClick={() => setBilling("annual")}
              >
                Yearly
                <span className="scp-save-badge">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing card */}
          <div className="scp-price-card">
            {billing === "annual" && (
              <div className="scp-price-card-banner">
                3 months free · Save 20% with annual billing
              </div>
            )}
            <div className="scp-price-card-body">
              {/* Left: price rows */}
              <div className="scp-price-card-prices">
                <div className="scp-price-row-item">
                  <div className="scp-price-big">
                    <span className="scp-price-dollar">$</span>
                    <span className="scp-price-number">
                      {billing === "annual" ? "39" : "49"}
                    </span>
                    <span className="scp-price-cents">.99</span>
                  </div>
                  <div className="scp-price-label">per seat / month</div>
                  {/* <VideoThumbnailPlayButton
                    onClick={() => setVideoOpen(true)}
                    videoData={scVideo}
                  /> */}
                </div>
                <div className="scp-price-divider" />
                <div className="scp-price-row-item">
                  {/* <VideoThumbnailPlayButtonMobile
                    onClick={() => setVideoOpen(true)}
                    videoData={scVideo}
                  /> */}
                  <p className="scp-price-section-label">Add-ons:</p>
                  <div className="scp-price-addon-row">
                    <span className="scp-price-addon-label">
                      E-signature{" "}
                      <a href="/capabilities/t-sign-digital-signatures/">
                        (T-Sign)
                      </a>{" "}
                      $10 per seat/month
                    </span>
                  </div>
                  <p className="scp-price-addon-note">
                    Unlimited T-Sign with no per-document fees
                  </p>
                </div>
                <div className="scp-price-row-item">
                  <div className="scp-price-addon-row">
                    <span className="scp-price-addon-label">Onboarding</span>
                  </div>
                  <p className="scp-price-addon-note">
                    Assisted Onboarding is available as a one-time fee.
                  </p>
                  <p className="scp-price-addon-note">
                    Need more sessions? Contact us at{" "}
                    <a href="mailto:sales@tesseractapps.com">
                      sales@tesseractapps.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Right: assurances + CTA */}
              <div className="scp-price-card-right">
                <ul className="scp-price-assurances">
                  {billing === "annual" ? (
                    <li>12-month commitment required</li>
                  ) : (
                    <li>No lock-in contracts. Cancel anytime</li>
                  )}
                </ul>
                <div className="scp-price-card-actions">
                  <button
                    type="button"
                    className="primary-cta"
                    onClick={() => {
                      trackCTAClick(
                        "book_demo",
                        "sc_pricing_card",
                        "/sc-pricing",
                      );
                      navigate("/book-a-demo/");
                    }}
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included, merged into pricing section */}
          <div id="scp-whats-included-inner">
            <div className="scp-label-wrapper">
              <div className="scp-label scp-label--dark">What Is Included</div>
            </div>
            <h2 className="scp-section-heading scp-section-heading--center">
              What am I paying for?
            </h2>
            <p className="scp-body-text scp-body-text--center scp-features-sub">
              Your subscription covers everything below. No hidden upgrades
              needed to access any of these features.
            </p>
            <ul className="scp-features-chips">
              {SC_FEATURES.map((f) => (
                <FeatureChip
                  key={f.label}
                  label={f.label}
                  description={f.description}
                />
              ))}
            </ul>

            <div id="scp-coming-soon-heading">
              <span id="scp-coming-soon-badge">Coming Soon</span>
              <span id="scp-coming-soon-label">On the roadmap</span>
            </div>
            <ul className="scp-features-chips scp-features-chips--soon">
              {SC_COMING_SOON.map((f) => (
                <FeatureChip
                  key={f.label}
                  label={f.label}
                  description={f.description}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
      {videoOpen && (
        <VideoModal onClose={() => setVideoOpen(false)} videoData={scVideo} />
      )}
      {/* Why TesseractApps */}
      <section id="scp-why">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Why TesseractApps</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            Why Support Coordinators choose us
          </h2>
          <div className="scp-why-grid">
            {WHY_ITEMS.map((item) => (
              <div key={item.label} className="scp-why-card">
                <h3 className="scp-why-title">{item.label}</h3>
                <p className="scp-why-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="scp-faq">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Common Questions</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            Pricing, plans &amp; terms
          </h2>
          <div className="scp-faq-list">
            {FAQ_ITEMS.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SCPricing;
