import "./SCPricingStyles.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { trackCTAClick } from "../../../utils/analytics";
import HeroArcsLeftComponent from "../../../components/sections/heroArcsComponent/HeroArcsComponent";
import HeroArcsRightComponent from "../../../components/sections/heroArcsComponent/HeroArcsComponent";
import { homeLeftArcsData, homeRightArcsData } from "../../../data/homeArcsData";

// ── SC App feature data ────────────────────────────────────────────────────

const SC_FEATURES: { label: string; description: string }[] = [
  {
    label: "Participant Management",
    description:
      "All your participant profiles in one place — demographics, support needs, goals, risk information, and contacts. Find anyone in seconds with search and filters.",
  },
  {
    label: "Referrals Tracking",
    description:
      "Track every referral from first contact to onboarding. Know exactly where each potential participant is in the pipeline so no one gets missed.",
  },
  {
    label: "Service Agreements",
    description:
      "Generate, e-sign with T-sign, and store every agreement in one place. SC agreements and third-party provider arrangements alike. Link funding to support items and never chase paperwork again.",
  },
  {
    label: "Funding & Budget Tracking",
    description:
      "Always know where a participant's plan budget stands. See what's committed, what's been used, and what's remaining across every support category — in real time.",
  },
  {
    label: "Budget Builder",
    description:
      "Model participant budgets before plans are confirmed. Show participants how their funding could be allocated across categories and make planning conversations easier.",
  },
  {
    label: "Case Notes & Progress Reporting",
    description:
      "Write case notes connected to participant goals. Auto-generate progress reports for participants, families, and the NDIA when review time comes.",
  },
  {
    label: "Note Templates",
    description:
      "Standardise case note formats across your team. Spend less time on structure and more time on the support you're providing.",
  },
  {
    label: "Task Board",
    description:
      "A daily and weekly view of every coordination task. Drag tasks between days, add notes and charges on the same screen.",
  },
  {
    label: "Participant Check-ins",
    description:
      "Know exactly when you last made contact with every participant. Spot who needs a follow-up before it becomes an issue and keep a clear record of your coordination activity when the NDIA asks.",
  },
  {
    label: "Time Tracking & On-the-Go Billing",
    description:
      "Log time and bill for support coordination activities as you go — from any device, anywhere. Reduce end-of-day admin and keep billing accurate without doubling up on data entry.",
  },
  {
    label: "NDIS Claiming & Invoicing",
    description:
      "Track claim status, reconcile payments, and generate invoices automatically — no double entry.",
  },
  {
    label: "NDIA Bulk Uploads",
    description:
      "Save time on high-volume claiming and reduce the risk of errors from submitting one by one.",
  },
  {
    label: "Custom Document Generation",
    description:
      "Populate professional documents from your own templates using live participant data. Cut hours of copy-paste work every week.",
  },
  {
    label: "Dashboards",
    description:
      "See your whole caseload at a glance. Budget utilisation, claim volumes, compliance status, and team activity — all live, all in one screen.",
  },
  {
    label: "Audit Evidence & Compliance",
    description:
      "Every action is logged. When an audit comes, generate a compliance pack or NDIS Commission submission document on demand — nothing to scramble for.",
  },
  {
    label: "Track Expiring Documents",
    description:
      "Automatic alerts before participant, staff, and provider compliance documents expire. Never miss a deadline that puts you or your participants out of compliance.",
  },
  {
    label: "Staff Records Tracking",
    description:
      "Keep qualifications, certificates, and compliance documents in one place, with alerts when credentials are coming up for renewal.",
  },
  {
    label: "Mobile Access",
    description:
      "Log case notes, access participant records, manage tasks, and capture signatures from your phone — whether you're in the office, at a participant's home, or on the road.",
  },
  {
    label: "Teams",
    description:
      "Organise coordinators into teams, assign participants, and track workloads across your organisation — so nothing falls through the cracks when staff are busy or away.",
  },
  {
    label: "Unlimited Participants & Files",
    description:
      "No caps on how many participants you manage or how many documents you store. Your subscription scales with your business, not against it.",
  },
];

const ESIGN_FEATURES = [
  "Unlimited document signing — no per-document or per-signature fees",
  "Service agreements and consent forms with e-signature (T-Sign)",
  "Participant and guardian signatures captured digitally",
  "Legally binding e-signatures compliant with Australian law",
  "Automatic audit trail with timestamp, IP address, and signer identity",
  "Works with all document types within the platform",
  "Seamless integration with Service Agreement workflow",
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What does the 12 Month Plan cost?",
    answer:
      "$39.99 AUD per seat per month (excl. GST), billed monthly under a 12-month commitment. Organisations with fewer than 5 seats pay the full 12-month term upfront at commencement.",
  },
  {
    question: "How does the 3 months free offer work?",
    answer:
      "New 12 Month Plan subscribers receive a 3-month introductory waiver starting from the Billing Anchor Month (the calendar month the agreement is signed) plus the 2 following months. The first invoice issues after the waiver period ends. This waiver is forfeited if the subscription is cancelled before the 12-month term is completed and cannot be combined with any other free trial.",
  },
  {
    question: "Can I cancel early?",
    answer:
      "Yes, with 30 days' written notice. The 12 Month Plan is a fixed-term commitment — the outstanding balance for the remainder of the term remains payable on early exit. Access continues until the end of the paid period.",
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
    question: "Is e-signature included?",
    answer:
      "Yes. E-signature (T-Sign) is included as a standard integration on both plans at no extra cost. There are no per-document or per-signature fees.",
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
      "Competitors charge $1 per finalised signature in addition to the subscription fee. We only charge $10/month flat per organisation.",
  },
  {
    label: "One user type, one price",
    description:
      "No confusing standard vs support worker pricing tiers. Every user on your team gets the full platform.",
  },
  {
    label: "Audit-ready from day one",
    description:
      "Every action is logged. Compliance documentation generated on demand — nothing to scramble for when the NDIS Commission calls.",
  },
  {
    label: "Built only for Support Coordination",
    description:
      "Not a generic NDIS tool stretched to fit — designed specifically for the way Support Coordinators work.",
  },
  {
    label: "Local Australian support team",
    description:
      "Phone and email support from people who understand NDIS, based in Canberra.",
  },
];

// ── FAQ accordion item ─────────────────────────────────────────────────────

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
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <p className="scp-faq-answer">{answer}</p>}
    </div>
  );
}

// ── Plan note tooltip ──────────────────────────────────────────────────────

function PlanNote({ text, tooltip }: { text: string; tooltip: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <span ref={ref} className="scp-plan-note-wrap">
      <span
        className="scp-plan-note"
        onMouseEnter={() => { if (!isTouchDevice.current) setOpen(true); }}
        onMouseLeave={() => { if (!isTouchDevice.current) setOpen(false); }}
        onClick={() => { if (isTouchDevice.current) setOpen((v) => !v); }}
        role="button"
        tabIndex={0}
        aria-label={`${text} — more info`}
      >
        {text}
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="scp-plan-note-icon">
          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
          <rect x="7.25" y="6.5" width="1.5" height="5.5" rx="0.75" fill="currentColor" />
          <circle cx="8" cy="4.25" r="0.875" fill="currentColor" />
        </svg>
      </span>
      {open && (
        <span className="scp-tooltip scp-plan-note-tooltip" role="tooltip">
          <p>{tooltip}</p>
        </span>
      )}
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

const SCPricing = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div id="scp-page">
      <SEO
        title="SC App Pricing & Features | TesseractApps"
        description="Purpose-built NDIS Support Coordination software. One price, every feature included. Manage participants, stay compliant, and get paid — without the admin overhead."
      />

      {/* ── Hero ── */}
      <section id="scp-hero">
        <HeroArcsLeftComponent pendulums={homeLeftArcsData} />
        <div id="scp-hero-inner">
          <div id="scp-hero-logo" role="img" aria-label="TesseractApps Logo" />
          <p id="scp-hero-eyebrow">SC App – Pricing &amp; Features</p>
          <h1 id="scp-hero-heading">
            Built for Support Coordinators.<br />
            Not adapted, built from scratch.
          </h1>
          <p id="scp-hero-sub">
            Everything you need to manage participants, stay compliant, and get paid — without the admin overhead.
          </p>
          <div id="scp-hero-ctas">
            <button
              type="button"
              className="scp-btn-primary"
              onClick={() => { trackCTAClick("book_demo", "sc_pricing", "/sc-pricing"); navigate("/book-a-demo"); }}
            >
              Try for 3 Months Free
            </button>
            <button
              type="button"
              className="scp-btn-secondary"
              onClick={() => { trackCTAClick("book_demo", "sc_pricing_hero_demo", "/sc-pricing"); navigate("/book-a-demo"); }}
            >
              Book a Demo
            </button>
          </div>
          <p className="scp-cta-sub-note">No credit card required. 12-month commitment required for the yearly plan.</p>
        </div>
        <HeroArcsRightComponent pendulums={homeRightArcsData} />
      </section>

      {/* ── Pricing ── */}
      <section id="scp-pricing">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Pricing</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            What does it cost?
          </h2>
          <p className="scp-body-text scp-body-text--center scp-pricing-sub">
            One price. Every feature included. No confusing tiers, no per-user add-ons for core tools.
          </p>

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

          {/* Pricing table — single active column based on toggle */}
          <div className="scp-pricing-table-wrap">
            <table className="scp-pricing-table">
              <thead>
                <tr className="scp-pricing-head-row">
                  <th className="scp-pricing-th scp-pricing-th--label" scope="col"><span className="sr-only">Feature</span></th>
                  <th className={`scp-pricing-th ${billing === "annual" ? "scp-pricing-th--yearly" : "scp-pricing-th--monthly"}`} scope="col">
                    {billing === "annual" ? (
                      <>
                        <div className="scp-pricing-plan-name">Yearly</div>
                        <div className="scp-pricing-per">per user / month</div>
                        <span className="scp-save-badge">Save 20%</span>
                      </>
                    ) : (
                      <>
                        <div className="scp-pricing-plan-name">Monthly</div>
                        <div className="scp-pricing-per">per user / month</div>
                      </>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="scp-pricing-row">
                  <td className="scp-pricing-td scp-pricing-td--label">
                    SC App
                    <span className="scp-pricing-td-sub">per user / month</span>
                  </td>
                  <td className={`scp-pricing-td ${billing === "annual" ? "scp-pricing-td--yearly" : "scp-pricing-td--monthly"}`}>
                    {billing === "annual"
                      ? <span className="scp-pricing-amount scp-pricing-amount--featured">$39.99</span>
                      : <span className="scp-pricing-amount">$49.99</span>
                    }
                  </td>
                </tr>
                <tr className="scp-pricing-row scp-pricing-row--alt">
                  <td className="scp-pricing-td scp-pricing-td--label">
                    eSignature Add-on
                    <span className="scp-pricing-td-sub">per org / month</span>
                  </td>
                  <td className={`scp-pricing-td ${billing === "annual" ? "scp-pricing-td--yearly" : "scp-pricing-td--monthly"}`}>
                    {billing === "annual"
                      ? <span className="scp-pricing-amount scp-pricing-amount--free">Included free</span>
                      : <span className="scp-pricing-amount">$10.00</span>
                    }
                  </td>
                </tr>
                <tr className="scp-pricing-row scp-pricing-row--footer">
                  <td className="scp-pricing-td scp-pricing-td--label" />
                  <td className={`scp-pricing-td ${billing === "annual" ? "scp-pricing-td--yearly" : "scp-pricing-td--monthly"}`}>
                    {billing === "annual"
                      ? <PlanNote
                          text="Yearly plan: 12-month commitment required"
                          tooltip="Billed monthly under a 12-month commitment. Organisations with fewer than 5 seats pay the full term upfront. Outstanding balance remains payable on early exit."
                        />
                      : <PlanNote
                          text="Monthly plan: no lock-in, cancel anytime"
                          tooltip="Billed monthly with no minimum term. Cancel anytime with 30 days' written notice. No early termination fee."
                        />
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Billing notes */}
          <div className="scp-billing-notes">
            <div className="scp-billing-notes-label">Billing Notes</div>
            <ul>
              <li>All prices are in AUD, exclusive of GST.</li>
              <li>SC App is priced per user. eSignature is priced per organisation.</li>
              <li>eSignature is included free on the Yearly plan; available as a $10/month add-on on the Monthly plan.</li>
              <li>New Yearly plan subscribers receive a 3-month introductory waiver (the Billing Anchor Month plus 2 following calendar months).</li>
              <li>Prices are subject to change with 30 days' written notice. Your rate is locked for the duration of your current billing term.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section id="scp-whats-included">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">What Is Included</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            What am I paying for?
          </h2>
          <p className="scp-body-text scp-body-text--center scp-features-sub">
            Your subscription covers everything below. No hidden upgrades needed to access any of these features.
          </p>
          <div className="scp-included-table-scroll">
          <div className="scp-included-table">
            <div className="scp-included-table-head">
              <div className="scp-included-col scp-included-col--feature">Feature</div>
              <div className="scp-included-col scp-included-col--desc">What it means for you</div>
            </div>
            {SC_FEATURES.map((f) => (
              <div key={f.label} className="scp-included-row">
                <div className="scp-included-col scp-included-col--feature">{f.label}</div>
                <div className="scp-included-col scp-included-col--desc">{f.description}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── Optional Add-ons ── */}
      <section id="scp-addons">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Optional Add-ons</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            More when you need it
          </h2>
          <div className="scp-addons-grid">
            {/* eSignature */}
            <div className="scp-addon-card">
              <h3 className="scp-addon-title">eSignature Add-on</h3>
              <p className="scp-addon-body">
                One flat fee covers your whole organisation. No per-document or per-signature costs — ever.
              </p>
              <div className="scp-addon-price-row">
                <span className="scp-addon-price">$10</span>
                <span className="scp-addon-price-unit">/ org / month <span className="scp-addon-price-note">(monthly plan) · included free on yearly</span></span>
              </div>
              <ul className="scp-esign-list">
                {ESIGN_FEATURES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Onboarding */}
            <div className="scp-addon-card">
              <h3 className="scp-addon-title">Onboarding (one-time)</h3>
              <p className="scp-addon-body">
                All subscriptions include self-serve setup at no cost. For organisations that want a faster, guided start, Assisted Onboarding is available as a one-time paid add-on.
              </p>
              <p className="scp-addon-body">
                Need more sessions? Additional guided onboarding sessions are available at <strong>$250 per session</strong>. L3 historical data migration (case notes and billable hours) is not included in any onboarding package and is quoted on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How Billing Works ── */}
      <section id="scp-billing">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Billing</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            How does billing work?
          </h2>
          <div className="scp-billing-plans">
            <div className="scp-billing-plan-card">
              <h3 className="scp-billing-plan-title">Month to Month</h3>
              <p className="scp-billing-plan-body">
                Billed monthly at <strong>$49.99 per user</strong>. No minimum term; cancel anytime with 30 days' written notice. No early termination fee. Ideal if you want to try the platform before committing.
              </p>
            </div>
            <div className="scp-billing-plan-card scp-billing-plan-card--featured">
              <div className="scp-billing-plan-badge">Best Value</div>
              <h3 className="scp-billing-plan-title">12 Month Plan</h3>
              <p className="scp-billing-plan-body">
                <strong>$39.99 per user per month</strong>, billed monthly under a 12-month commitment. Organisations with fewer than 5 seats pay the full 12 months upfront at commencement. Locks in a 20% discount on the monthly rate. Includes eSignature (T-Sign) at no extra cost.
              </p>
            </div>
            <div className="scp-billing-plan-card scp-billing-plan-card--highlight">
              <div className="scp-billing-plan-badge scp-billing-plan-badge--green">Introductory Offer</div>
              <h3 className="scp-billing-plan-title">3 Months Free</h3>
              <p className="scp-billing-plan-body">
                All new subscribers on the 12 Month Plan receive a 3-month introductory waiver. Subscription is waived for the Billing Anchor Month (the calendar month the agreement is signed) plus the following 2 calendar months — 3 full calendar months at no charge. The first chargeable invoice issues in the calendar month immediately after the waiver period ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why TesseractApps ── */}
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

      {/* ── FAQ ── */}
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
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="scp-cta-banner">
        <div className="scp-outer">
          <div id="scp-cta-banner-inner">
            <div className="scp-label scp-label--blue">Get Started</div>
            <h2 id="scp-cta-heading">Try for 3 months free.</h2>
            <p id="scp-cta-sub">
              No credit card required. Cancel anytime on the monthly plan.
              12-month commitment required on the yearly plan.
            </p>
            <div id="scp-cta-actions">
              <button
                type="button"
                className="scp-btn-primary scp-btn-large"
                onClick={() => { trackCTAClick("book_demo", "sc_pricing_cta", "/sc-pricing"); navigate("/book-a-demo"); }}
              >
                Book a Demo
              </button>
              <button
                type="button"
                className="scp-btn-outline scp-btn-large"
                onClick={() => { trackCTAClick("begin_journey", "sc_pricing_cta", "/sc-pricing"); navigate("/signup"); }}
              >
                Begin Your Journey
              </button>
            </div>
            <p className="scp-cta-sub-note">
              TesseractApps · Level 1/45 Colbee Ct, Phillip ACT 2606 · 1300 252 808 · sales@tesseractapps.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SCPricing;
