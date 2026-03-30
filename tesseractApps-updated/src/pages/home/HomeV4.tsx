// src/pages/home/HomeV4.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeV4Styles.css";
import SEO from "../../components/common/SEO";
import { buildGraphSchema } from "../../utils/schemaHelpers";
import useAppNavigate from "../../hooks/useAppNavigate";
import { useSanityBlogList } from "../../hooks/useSanityBlogList";
import { useSanityCapabilityNav } from "../../hooks/useSanityCapabilityNav";
import { urlFor } from "../../sanity/lib/image";
import { formatDate } from "../../utils/formatDate";
import { testimonialDummyData } from "../../data/testimonialData";
// import adminConsoleImg from "../../assets/Admin Console N.webp";
import dashboardImg from "../../assets/Website-home-image.webp";
import starIcon from "../../assets/star.webp";
import company2 from "../../assets/thumbs/company-2-thumb.webp";
import company4 from "../../assets/thumbs/company-4-thumb.webp";
import company5 from "../../assets/thumbs/company-5-thumb.webp";
import company8 from "../../assets/thumbs/ANA Logo-thumb.webp";
import company9 from "../../assets/thumbs/FRAMILY VENTURES Final-thumb.webp";
import company10 from "../../assets/thumbs/PINNACLE Final-thumb.webp";
import company13 from "../../assets/thumbs/logo13-thumb.webp";
import company14 from "../../assets/thumbs/NEXUS Final-thumb.webp";
import company16 from "../../assets/thumbs/Blessing Care-thumb.webp";
import company17 from "../../assets/thumbs/Clear Choice-thumb.webp";
import company19 from "../../assets/thumbs/ImprovedAbility-thumb.webp";
import company20 from "../../assets/thumbs/RCG-Logo-thumb.webp";
import company21 from "../../assets/thumbs/Company-YDCS-thumb.webp";
import company22 from "../../assets/thumbs/KS PNG Logo.webp";
import company23 from "../../assets/thumbs/embrace logo.webp";
import company24 from "../../assets/thumbs/AveryCareLogo.webp";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Intersection hook ───────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7l3.5 3.5 6.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M4.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
// ─── Data ────────────────────────────────────────────────────────────────────
const FLOW_STEPS = [
  { n: "01", label: "Intake", desc: "Participant referral received. Profile created with demographics, support needs, and risk information." },
  { n: "02", label: "Service Agreement", desc: "Agreement created, linked to participant plan. Funding categories and budgets mapped." },
  { n: "03", label: "Funding Allocation", desc: "Budget allocated by support category and plan period. Real-time balance tracking begins." },
  { n: "04", label: "Roster Planning", desc: "Shifts created matching qualified, credentialed support workers to participant needs. SCHADS rules enforced at scheduling." },
  { n: "05", label: "Shift Delivery", desc: "Support worker clocks in via mobile with GPS verification. Service delivered. Clock out recorded." },
  { n: "06", label: "Case Notes & Progress", desc: "Progress notes captured on mobile at point of service. Linked to participant goals and funding categories." },
  { n: "07", label: "Incident Reporting", desc: "Any incident logged immediately on mobile. Escalation triggered automatically." },
  { n: "08", label: "Timesheet & Payroll", desc: "Worked hours reconciled against roster. SCHADS Award interpretation applied automatically. Payroll data ready." },
  { n: "09", label: "Invoice & Claim", desc: "NDIS claims generated from verified delivery. Pre-validated against participant budgets and price guides." },
  { n: "10", label: "Reconciliation", desc: "3-Layer Reconciliation: roster-to-timesheet, timesheet-to-claim, claim-to-payment. Every dollar accounted for." },
  { n: "11", label: "Reporting", desc: "Role-specific dashboards surface real-time data. Executive, compliance, finance, and operational views." },
  { n: "12", label: "Audit Evidence", desc: "Every action creates a timestamped, attributed audit trail. Evidence retrieved, not assembled." },
];

const MATURITY_STAGES = [
  {
    stage: "Start",
    range: "1–15 staff",
    focus: "STRUCTURE",
    color: "#10b981",
    desc: "Build your compliance foundation. Compliant rostering, participant records, incident reporting, and NDIS claiming from day one. Founding Cohort pricing available.",
    href: "/solutions/start",
  },
  {
    stage: "Growth",
    range: "15–60 staff",
    focus: "CONTROL",
    color: "#0c78ba",
    desc: "Stabilise payroll and operations. Automate SCHADS interpretation, connect timesheets to invoicing, and gain real-time oversight across your workforce.",
    href: "/solutions/growth",
  },
  {
    stage: "Scale",
    range: "60–120 staff",
    focus: "GOVERNANCE",
    color: "#7c3aed",
    desc: "Enforce governance across every site. Approval workflows & multi-site consistency. The platform enforces the rules you set.",
    href: "/solutions/scale",
  },
  {
    stage: "Enterprise",
    range: "120+ staff",
    focus: "CONSOLIDATION",
    color: "#002a52",
    desc: "Consolidate finance, payroll, and board reporting. Unify multi-site operations and surface the data your leadership needs to act.",
    href: "/solutions/enterprise",
  },
];

const PROBLEMS = [
  { label: "Rostering–Payroll gap", desc: "Running rostering in one system and payroll in another, and they never agree.", href: "/capabilities/rostering-scheduling" },
  { label: "Incident trail gaps", desc: "Can't confidently tell the NDIS Commission when an incident was reported, escalated, and resolved.", href: "/capabilities/incidents" },
  { label: "SCHADS risk", desc: "Your SCHADS interpretation lives in someone's head, payroll errors surface weeks later.", href: "/capabilities/timesheets-payroll" },
  { label: "Revenue leakage", desc: "Submitting NDIS claims manually and reconciling against spreadsheets.", href: "/capabilities/ndis-claiming" },
  { label: "Audit anxiety", desc: "Compliance documentation scattered across email, shared drives, and filing cabinets.", href: "/capabilities/compliance-audit" },
  { label: "No visibility", desc: "No single view of your operations, every report requires chasing three people.", href: "/capabilities/dashboards-reporting" },
];

// ─── Client logo list ─────────────────────────────────────────────────────────
const CLIENT_LOGOS = [
  company2, company10, company13, company4, company5,
  company8, company9, company14, company16, company17,
  company19, company20, company21, company22,company23,company24
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomeV4() {
  const navigate = useAppNavigate();
  const routerNavigate = useNavigate();
  const { data: blogPosts, loading: blogLoading } = useSanityBlogList({ to: 3 });
  const { links: capLinks } = useSanityCapabilityNav();

  // Stats counter section
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const c1 = useCountUp(1000, 1600, statsInView);
  const c2 = useCountUp(40, 1600, statsInView);
  const c3 = useCountUp(99, 1600, statsInView);
  const c4 = useCountUp(16, 1600, statsInView);

  // Flow active step
  const [activeStep, setActiveStep] = useState(0);

  // Hero words animation
  const HERO_WORDS = ["Rostering.", "Payroll.", "Compliance.", "Claiming.", "Reporting."];
  const [wordIdx, setWordIdx] = useState(0);
  const [wordFade, setWordFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % HERO_WORDS.length);
        setWordFade(true);
      }, 220);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // Flow auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep((s) => (s + 1) % FLOW_STEPS.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  // Fade-in sections
  const { ref: matRef, inView: matInView } = useInView(0.1);
  const { ref: flowRef, inView: flowInView } = useInView(0.1);
  const { ref: probRef, inView: probInView } = useInView(0.1);
  const { ref: capRef, inView: capInView } = useInView(0.1);
  const { ref: whyRef, inView: whyInView } = useInView(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.1);

  const avgRating = (
    testimonialDummyData.reduce((sum, t) => sum + t.rating, 0) / testimonialDummyData.length
  ).toFixed(1);

  const homepageStructuredData = buildGraphSchema(
    {
      '@type': 'SoftwareApplication',
      name: 'TesseractApps',
      description: 'Purpose-built NDIS provider software connecting rostering, payroll, compliance, and participant management on one platform.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      offers: { '@type': 'Offer', price: '39.99', priceCurrency: 'AUD' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        reviewCount: String(testimonialDummyData.length),
        bestRating: '5',
        worstRating: '1',
      },
      review: testimonialDummyData.map((t) => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5' },
        author: { '@type': 'Organization', name: t.author.trim() },
        reviewBody: t.testimonial.replace(/^[\u201C"]+|[\u201D"]+$/g, '').trim(),
      })),
    }
  );

  return (
    <>
      <SEO
        title="One platform for every NDIS operation | Rostering, Payroll, Compliance & Claiming - TesseractApps"
        description="Purpose-built NDIS operational infrastructure connecting rostering, payroll, compliance, and participant management on one platform. Starting at $39.99/seat/month."
        structuredData={homepageStructuredData}
      />

      <div id="hv4-page">

        {/* ── Section 1: Hero ────────────────────────────────────────────── */}
        <div id="hv4-hero-wrap">
        <section id="hv4-hero">
          {/* Background mesh */}
          <div className="hv4-hero-mesh" aria-hidden="true">
            <div className="hv4-mesh-orb hv4-mesh-orb--1" />
            <div className="hv4-mesh-orb hv4-mesh-orb--2" />
            <div className="hv4-mesh-orb hv4-mesh-orb--3" />
            <svg className="hv4-mesh-grid" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hv4-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(12,120,186,0.07)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hv4-grid)" />
            </svg>
          </div>

          <div className="hv4-hero-inner">
            {/* Badge */}
            <div className="hv4-hero-badge">
              <span className="hv4-badge-dot" />
              Purpose-built NDIS operational infrastructure
            </div>

            {/* H1 */}
            <h1 className="hv4-hero-h1">
              One platform for every<br />
              NDIS operation.
            </h1>

            {/* Animated word */}
            <div className="hv4-hero-word-row">
              <span className={`hv4-hero-word${wordFade ? " hv4-hero-word--in" : " hv4-hero-word--out"}`}>
                {HERO_WORDS[wordIdx]}
              </span>
              <span className="hv4-hero-word-static">All connected.</span>
            </div>

            <p className="hv4-hero-sub">
              Stop stitching together disconnected tools. TesseractApps gives NDIS providers a single
              operational platform, purpose-built, running natively on Salesforce Hyperforce.
              Everything stays connected. Everything stays compliant.
            </p>

            {/* CTAs */}
            <div className="hv4-hero-ctas">
              <button type="button" className="hv4-btn-primary" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
              </button>
              <button type="button" className="hv4-btn-outline" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            {/* <p className="hv4-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p> */}

            {/* Trust line */}
            <p className="hv4-hero-trust">
              <IconCheck /> No credit card required
            </p>
          </div>

          {/* Platform preview image */}
          <div className="hv4-hero-img-wrap">
            <img
              src={dashboardImg}
              alt="TesseractApps Dashboard"
              className="hv4-hero-img"
            />
          </div>
        </section>
        </div>{/* /hv4-hero-wrap */}

        {/* ── Section: Trusted clients ──────────────────────────────────── */}
        <section id="hv4-trusted">
          <p className="hv4-trusted-label">Trusted by NDIS providers across Australia</p>
          <div className="hv4-marquee-outer" aria-hidden="true">
            <div className="hv4-marquee-track">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
                <div key={i} className="hv4-marquee-item">
                  <img src={src} alt="" loading="lazy" width="120" height="60" />
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* ── Section 3: Operational Flow ────────────────────────────────── */}
        <section id="hv4-flow" ref={flowRef} className={flowInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-section-inner">
            <div className="hv4-section-label hv4-section-label--light">How It Works</div>
            <h2 className="hv4-section-h2 hv4-section-h2--light">From intake to audit evidence, one connected flow.</h2>
            <p className="hv4-section-sub hv4-section-sub--light">
              Every step in your NDIS operations connects to the next. No re-entry. No reconciliation gaps.
              No data lost between systems.
            </p>

            <div className="hv4-flow-layout">
              {/* Step list */}
              <div className="hv4-flow-list">
                {FLOW_STEPS.map((step, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`hv4-flow-item${activeStep === i ? " hv4-flow-item--active" : ""}`}
                    onClick={() => setActiveStep(i)}
                  >
                    <span className="hv4-flow-num">{step.n}</span>
                    <span className="hv4-flow-label">{step.label}</span>
                    <span className="hv4-flow-chevron"><IconChevronRight /></span>
                  </button>
                ))}
              </div>

              {/* Active step detail */}
              <div className="hv4-flow-detail">
                <div className="hv4-flow-detail-inner">
                  <div className="hv4-flow-detail-num">{FLOW_STEPS[activeStep].n}</div>
                  <h3 className="hv4-flow-detail-label">{FLOW_STEPS[activeStep].label}</h3>
                  <p className="hv4-flow-detail-desc">{FLOW_STEPS[activeStep].desc}</p>
                  <div className="hv4-flow-progress">
                    {FLOW_STEPS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`hv4-flow-dot${activeStep === i ? " hv4-flow-dot--active" : ""}`}
                        onClick={() => setActiveStep(i)}
                        aria-label={`Step ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="hv4-flow-footer">
              Every step generates data that feeds the next. When an auditor, plan manager, or board member asks a question,
              the answer already exists in the system.
            </p>
          </div>
        </section>

        {/* ── Section: Stats ─────────────────────────────────────────────── */}
        <section id="hv4-stats" ref={statsRef}>
          <div className="hv4-stats-inner">
            {[
              { n: c1, suffix: "+", label: "NDIS Professionals" },
              { n: c2, suffix: "%", label: "Faster Incident Resolution" },
              { n: c3, suffix: ".9%", label: "Platform Uptime" },
              { n: c4, suffix: "+", label: "Integrated Modules" },
            ].map((s, i) => (
              <div key={i} className="hv4-stat-item">
                <div className="hv4-stat-n">
                  {s.n}<span className="hv4-stat-suffix">{s.suffix}</span>
                </div>
                <div className="hv4-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Provider Maturity Model ─────────────────────────── */}
        <section id="hv4-maturity" ref={matRef} className={matInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-section-inner">
            <div className="hv4-section-label">Provider Maturity Model</div>
            <h2 className="hv4-section-h2">Where are you on your provider journey?</h2>
            <p className="hv4-section-sub">
              Every NDIS provider follows a maturity path. TesseractApps is built around it, so the platform
              meets you where you are and grows with you. Same architecture at every stage. Configuration deepens. You never start again.
            </p>

            <div className="hv4-maturity-grid">
              {MATURITY_STAGES.map((s, i) => (
                <div
                  key={i}
                  className={`hv4-maturity-card hv4-maturity-card--${s.stage.toLowerCase()}`}
                  onClick={() => routerNavigate(s.href)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && routerNavigate(s.href)}
                >
                  <div className="hv4-maturity-top">
                    <div className="hv4-maturity-focus">{s.focus}</div>
                    <div className="hv4-maturity-range">{s.range}</div>
                  </div>
                  <h3 className="hv4-maturity-stage">{s.stage}</h3>
                  <p className="hv4-maturity-desc">{s.desc}</p>
                  <div className="hv4-maturity-link">
                    Learn More <IconChevronRight />
                  </div>
                  <div className="hv4-maturity-bar" />
                </div>
              ))}
            </div>

            <div className="hv4-maturity-note">
              <a href="/pricing" className="hv4-text-link">See pricing for every stage →</a>
            </div>
          </div>
        </section>



        {/* ── Section 4: Getting Started ─────────────────────────────────── */}
        <section id="hv4-start">
          <div className="hv4-section-inner">
            <div className="hv4-section-label">Getting Started</div>
            <p className="hv4-section-sub">
              Getting onto TesseractApps is a structured process, not a six-month project.
            </p>

            <div className="hv4-start-steps">
              {[
                { n: "01", title: "Assess", desc: "Book a demo. We evaluate your operations, identify your provider maturity stage, and map the configuration your organisation needs." },
                { n: "02", title: "Configure", desc: "Your dedicated onboarding team configures TesseractApps to match your operational reality, rostering rules, SCHADS interpretation, claiming workflows." },
                { n: "03", title: "Migrate & Train", desc: "Your data is migrated with full validation. Role-based training ensures every team member, from support worker to finance manager, is ready." },
                { n: "04", title: "Go Live", desc: "You launch with a dedicated onboarding specialist. Ongoing support from day one. Most providers are fully operational within six weeks." },
              ].map((step, i) => (
                <div key={i} className="hv4-start-step">
                  <div className="hv4-start-connector" aria-hidden="true" />
                  <div className="hv4-start-num">{step.n}</div>
                  <h3 className="hv4-start-title">{step.title}</h3>
                  <p className="hv4-start-desc">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="hv4-start-ctas">
              <button type="button" className="hv4-btn-primary" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
              </button>
              <button type="button" className="hv4-btn-outline" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            <p className="hv4-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
          </div>
        </section>

        {/* ── Section 5: Why Now ─────────────────────────────────────────── */}
        <section id="hv4-why-now" ref={whyRef} className={whyInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-section-inner">
            <div className="hv4-why-now-grid">
              <div className="hv4-why-now-content">
                <div className="hv4-section-label">Why Now</div>
                <h2 className="hv4-section-h2">The cost of waiting is rising.</h2>
                <p className="hv4-why-now-body">
                  The NDIS regulatory environment is tightening. Audit frequency is increasing.
                  The NDIS Commission now expects providers to demonstrate compliance continuously,
                  not scramble to prove it when an auditor arrives.
                </p>
                <p className="hv4-why-now-body">
                  Every month you run on disconnected spreadsheets, siloed systems, or manual workarounds,
                  the risk compounds. Gaps in incident reporting, payroll errors under SCHADS, and missing
                  audit trails do not get easier to fix later, they get more expensive.
                </p>
                <p className="hv4-why-now-emphasis">
                  The providers building their operational foundation now are the ones who will navigate
                  what's ahead with confidence.
                </p>
                <div className="hv4-why-now-ctas">
                  <button type="button" className="hv4-btn-primary" onClick={() => navigate("/book-a-demo")}>
                    Book a Demo
                  </button>
                  <button type="button" className="hv4-btn-outline" onClick={() => navigate("/signup")}>
                    Begin Your Journey
                  </button>
                </div>
                <p className="hv4-why-now-sub">Book a Provider Maturity Review. Start your provider setup.</p>
              </div>

              <div className="hv4-why-now-visual" aria-hidden="true">
                <div className="hv4-risk-chart">
                  <div className="hv4-risk-label">Operational risk over time</div>
                  <div className="hv4-risk-bars">
                    {(["30", "42", "58", "71", "85", "95"] as const).map((h, i) => (
                      <div key={i} className="hv4-risk-bar-wrap">
                        <div className={`hv4-risk-bar hv4-risk-bar--h${h}`} />
                        <div className="hv4-risk-bar-month">{["M1", "M2", "M3", "M4", "M5", "M6"][i]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hv4-risk-curve" aria-hidden="true">
                    <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                      <path d="M10 100 Q60 90 100 70 Q150 45 200 25 Q250 8 290 5" stroke="#e0302a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="hv4-risk-caption">Without operational infrastructure</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 6: Problems We Solve ───────────────────────────────── */}
        <section id="hv4-problems" ref={probRef} className={probInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-section-inner">
            <div className="hv4-section-label">Problems We Solve</div>
            <h2 className="hv4-section-h2">Sound familiar?</h2>

            <div className="hv4-problems-grid">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="hv4-problem-card" role="button" tabIndex={0}>
                  <div className="hv4-problem-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="#e0302a" strokeWidth="1.5" />
                      <line x1="10" y1="6" x2="10" y2="11" stroke="#e0302a" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="10" cy="14" r="1" fill="#e0302a" />
                    </svg>
                  </div>
                  <div className="hv4-problem-body">
                    <h3 className="hv4-problem-label">{p.label}</h3>
                    <p className="hv4-problem-desc">{p.desc}</p>
                  </div>
                  {/* <div className="hv4-problem-arrow"><IconChevronRight /></div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 7: Capabilities grid ───────────────────────────────── */}
        <section id="hv4-capabilities" ref={capRef} className={capInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-section-inner">
            <div className="hv4-section-label">The Platform</div>
            <h2 className="hv4-section-h2">See what connects.</h2>
            <p className="hv4-section-sub">
              Every capability on TesseractApps is designed to work as one. Click any module to explore.
            </p>

            <div className="hv4-cap-grid">
              {capLinks.slice(0, 8).map((cap) => (
                <div
                  key={cap._id}
                  className="hv4-cap-card"
                  onClick={() => routerNavigate(`/capabilities/${cap.slug.current}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && routerNavigate(`/capabilities/${cap.slug.current}`)}
                >
                  <h3 className="hv4-cap-label">{cap.title}</h3>
                  <p className="hv4-cap-desc">{cap.navSubtitle ?? cap.heroSubtitle ?? ""}</p>
                  <div className="hv4-cap-link">
                    Explore <IconArrowRight />
                  </div>
                </div>
              ))}
            </div>

            <div className="hv4-cap-footer">
       <a href="/capabilities" className="hv4-cap-extra-link">
                   View all capabilities<IconArrowRight />
                </a>
              <div className="hv4-cap-footer-spacer" />
            </div>
          </div>
        </section>

        {/* ── Section: Testimonials ─────────────────────────────────────── */}
        <section id="hv4-testimonials">
          <div className="hv4-section-inner">
            <div className="hv4-section-label">What Providers Say</div>
            <h2 className="hv4-section-h2">Real Stories. Real Results.</h2>
            <p className="hv4-section-sub">
              Trusted by NDIS providers across Australia.
            </p>
            <div className="hv4-testimonials-grid">
              {testimonialDummyData.map((item) => (
                <div key={item.id} className="hv4-testimonial-card">
                  <div className="hv4-testimonial-stars">
                    {Array.from({ length: item.rating }, (_, i) => (
                      <img key={i} src={starIcon} alt="" width="14" height="14" loading="lazy" />
                    ))}
                  </div>
                  <p className="hv4-testimonial-text">{item.testimonial}</p>
                  <div className="hv4-testimonial-author">
                    <img
                      src={item.authorImage}
                      alt={item.author}
                      className="hv4-testimonial-avatar"
                      width="44"
                      height="44"
                      loading="lazy"
                    />
                    <div className="hv4-testimonial-author-info">
                      <div className="hv4-testimonial-author-name">{item.author}</div>
                      {item.authorTitle && (
                        <div className="hv4-testimonial-author-title">{item.authorTitle}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: Blog ──────────────────────────────────────────────── */}
        <section id="hv4-blog">
          <div className="hv4-section-inner">
            <div className="hv4-blog-header">
              <div>
                <div className="hv4-section-label">From the Blog</div>
                <h2 className="hv4-section-h2">Insights for NDIS providers.</h2>
              </div>
              <a href="/blogs" className="hv4-btn-outline hv4-blog-all-link">
                View all articles <IconArrowRight />
              </a>
            </div>

            {blogLoading ? (
              <div className="hv4-blog-skeleton-row">
                {[0, 1, 2].map((i) => <div key={i} className="hv4-blog-skeleton-card" />)}
              </div>
            ) : blogPosts.length === 0 ? null : (
              <div className="hv4-blog-grid">
                {blogPosts.slice(0, 3).map((post) => (
                  <article
                    key={post._id}
                    className="hv4-blog-card"
                    onClick={() => post.slug?.current && navigate(`/blog/${post.slug.current}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && post.slug?.current && navigate(`/blog/${post.slug.current}`)}
                  >
                    <div className="hv4-blog-img-wrap">
                      {post.mainImage?.asset ? (
                        <img
                          src={urlFor(post.mainImage).width(600).height(320).fit("crop").auto("format").url()}
                          alt={post.mainImage?.alt ?? post.title ?? "Blog post"}
                          className="hv4-blog-img"
                          loading="lazy"
                          width="600"
                          height="320"
                        />
                      ) : (
                        <div className="hv4-blog-img hv4-blog-img--placeholder" />
                      )}
                      {post.category?.title && (
                        <span className="hv4-blog-cat">{post.category.title}</span>
                      )}
                    </div>
                    <div className="hv4-blog-body">
                      <div className="hv4-blog-meta">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.readingTime != null && (
                          <span className="hv4-blog-meta-sep">·</span>
                        )}
                        {post.readingTime != null && (
                          <span>{post.readingTime} min read</span>
                        )}
                      </div>
                      <h3 className="hv4-blog-title">{post.title}</h3>
                      <p className="hv4-blog-excerpt">{post.excerpt}</p>
                      <div className="hv4-blog-footer">
                        {post.author?.avatar?.asset && (
                          <img
                            src={urlFor(post.author.avatar).width(36).height(36).fit("crop").auto("format").url()}
                            alt={post.author.name ?? "Author"}
                            className="hv4-blog-avatar"
                            width="36"
                            height="36"
                            loading="lazy"
                          />
                        )}
                        {post.author?.name && (
                          <span className="hv4-blog-author">{post.author.name}</span>
                        )}
                        <span className="hv4-blog-readmore">
                          Read article <IconArrowRight />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Section 8: Final CTA ───────────────────────────────────────── */}
        <section id="hv4-cta" ref={ctaRef} className={ctaInView ? "hv4-fade-in" : "hv4-fade-pre"}>
          <div className="hv4-cta-bg" aria-hidden="true">
            <div className="hv4-cta-orb hv4-cta-orb--1" />
            <div className="hv4-cta-orb hv4-cta-orb--2" />
          </div>
          <div className="hv4-cta-inner">
            <div className="hv4-section-label hv4-section-label--light">Get Started</div>
            <h2 className="hv4-cta-h2">See how TesseractApps works for your organisation.</h2>
            <p className="hv4-cta-sub">
              Your demo is configured for your care type, team size, and provider maturity stage.
              30 minutes. Live platform, not a slide deck. Start your provider setup.
            </p>
            <div className="hv4-cta-actions">
              <button type="button" className="hv4-btn-white" onClick={() => navigate("/book-a-demo")}>
                Book a Demo
              </button>
              <button type="button" className="hv4-btn-outline-white" onClick={() => navigate("/signup")}>
                Begin Your Journey
              </button>
            </div>
            <p className="hv4-cta-sub2">
              <IconCheck /> Book a Provider Maturity Review &nbsp;·&nbsp;
              <IconCheck /> Begin Your Journey &nbsp;·&nbsp;
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
