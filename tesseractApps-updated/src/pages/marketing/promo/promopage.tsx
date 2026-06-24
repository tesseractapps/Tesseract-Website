import { useState } from "react";
import SEO from "../../../components/common/SEO";
import "./PromoPage.css";
import { trackCTAClick } from "../../../utils/analytics";
import { useNavigate } from "react-router-dom";
const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "How much discount do I get?",
    answer:
      "You get a flat 50% off your total contract value -available for the NDIS Platform and the Support Coordination App. ",
  },
  {
    question: "Does the discount depend on how long my contract is?",
    answer:
      "No. The 50% discount applies to the full contract value regardless of term length. The requirements are booking a demo and having your signed contract in place before 31 July 2026. ",
  },
  {
    question: "When does the offer end?",
    answer:
      "The promotion ends at 23:59 UTC on 31 July 2026. No extensions will be granted. ",
  },
  {
    question: "Can this discount be combined with other offers?",
    answer:
      "No. This promotion cannot be combined with any other discount or promotional rate. Only one discount may apply per contract. ",
  },
  {
    question: "Is this available to existing customers?",
    answer:
      "No. This promotion is exclusively for new TesseractApps customers. ",
  },
];
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
const promopage = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const navigate = useNavigate();
  const scrollToSection = () => {
    document.getElementById("promo-pricng")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div id="promo-page">
      <SEO
        title="End Of Financial Year Discount | TesseractApps"
        description="Purpose-built NDIS Support Coordination software. One price, every feature included. Manage participants, stay compliant, and get paid without the admin overhead."
      />
      <section id="scp-hero">
        <div id="scp-hero-inner">
          <div className="scp-label scp-label--light">
            End Of Financial Year Discount
          </div>
          <h1 id="scp-hero-heading">
            Get 50% Off Your TesseractApps Contract
            <span id="scp-hero-heading-accent"> - EOFY Offer</span>
          </h1>
          <p id="scp-hero-sub">
            Book a demo and sign your contract before 31 July 2026 to save 50% -
            NDIS Platform or Support Coordination App. Cannot be combined with
            other offers.
          </p>

          <div id="scp-hero-ctas">
            <button
              type="button"
              className="primary-cta"
              onClick={() => {
                trackCTAClick(
                  "book_demo",
                  "end_of_year_discount",
                  "/events/eofy-discount",
                );
                navigate("/book-a-demo");
              }}
            >
              Book a Demo - Claim 50% Off
            </button>
            <button
              type="button"
              className="scp-btn-hero-outline"
              onClick={() => scrollToSection()}
            >
              See Pricing
            </button>
          </div>

          <p className="scp-cta-sub-note">
            12-month commitment required for the yearly plan.
          </p>
        </div>
      </section>
      <section className="sol-section" id="sol-who">
        <div className="sol-outer">
          <div className="sol-section-label">How the Offer Works</div>
          <div className="sol-problem-block">
            <div className="promo-description-text">
              Book Your Demo: Visit our website and book a demo to see
              TesseractApps in action. Select Your Product: Choose the NDIS
              Platform, the Support Coordination App, or both -the 50% discount
              applies to your total contract. Sign Before 31 July: Attend your
              demo and sign your contract before the EOFY deadline to lock in
              50% off your total contract value.
            </div>
          </div>
        </div>
      </section>
      <section id="scp-pricing">
        <div className="scp-outer" id="promo-pricng">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">Pricing</div>
          </div>
          <h2 className="scp-section-heading scp-section-heading--center">
            Simple, Transparent Pricing
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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Pricing card */}
            <div className="scp-price-card scp-price-card-max-width">
              <div className="scp-price-card-body">
                {/* Left: price rows */}
                <div className="scp-price-card-prices">
                  <div
                    className="scp-price-addon-label"
                    style={{ fontSize: "22px" }}
                  >
                    Start
                  </div>
                  <div className="scp-price-section-label">
                    Early Provider Setup
                  </div>
                  {/* <div
                    className="scp-price-section-label"
                    style={{ fontSize: "24px" }}
                  >
                    $ <s> {billing === "annual" ? "39.99" : "49.99"}</s> 50% OFF
                  </div> */}
                  <div className="scp-price-row-item">
                    <div className="scp-price-big">
                      {/* <span className="scp-price-dollar">$</span> */}
                      {/* <span className="scp-price-number">Start Free</span> */}
                      <span className="scp-price-cents">Start Free</span>
                    </div>
                    {/* <div className="scp-price-label">per seat / month</div> */}
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
                    <p className="scp-price-section-label">1-15 staff</p>
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">Best for:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Founder-led or early-stage providers establishing their
                      operations.
                    </p>
                  </div>

                  <div className="scp-price-row-item">
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">supports:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Participant onboarding
                    </p>
                    <p className="scp-price-addon-note">Rostering</p>
                    <p className="scp-price-addon-note">Case notes</p>
                    <p className="scp-price-addon-note">Incident logging</p>
                    <p className="scp-price-addon-note">Timesheets</p>
                    <p className="scp-price-addon-note">Payroll</p>
                    <p className="scp-price-addon-note">Invoicing</p>
                    <p className="scp-price-addon-note">
                      Structured document storage
                    </p>
                    <p className="scp-price-addon-note">Guided onboarding</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scp-price-card scp-price-card-max-width">
              <div className="scp-price-card-body">
                {/* Left: price rows */}
                <div className="scp-price-card-prices">
                  <div
                    className="scp-price-addon-label"
                    style={{ fontSize: "22px" }}
                  >
                    Growth
                  </div>
                  <div className="scp-price-section-label">
                    Operational Control
                  </div>
                  <div
                    className="scp-price-section-label"
                    style={{ fontSize: "24px" }}
                  >
                    $ <s> {billing === "annual" ? "39.99" : "49.99"}</s> 50% OFF
                  </div>
                  <div className="scp-price-row-item">
                    <div className="scp-price-big">
                      <span className="scp-price-dollar">$</span>
                      <span className="scp-price-number">
                        {billing === "annual" ? "19" : "24"}
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
                    <p className="scp-price-section-label">15–60 staff</p>
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">Best for:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Providers experiencing workforce expansion, payroll
                      pressure, and increasing reporting needs.
                    </p>
                  </div>
                  <div className="scp-price-row-item">
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">supports:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Operational dashboards
                    </p>
                    <p className="scp-price-addon-note">
                      Payroll-to-roster alignment visibility
                    </p>
                    <p className="scp-price-addon-note">Funding tracking</p>
                    <p className="scp-price-addon-note">
                      Manager-level reporting
                    </p>
                    <p className="scp-price-addon-note">
                      Documentation consistency
                    </p>
                    <p className="scp-price-addon-note">
                      Workflow structure across teams
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scp-price-card scp-price-card-max-width">
              <div className="scp-price-card-body">
                {/* Left: price rows */}
                <div className="scp-price-card-prices">
                  <div
                    className="scp-price-addon-label"
                    style={{ fontSize: "22px" }}
                  >
                    Scale
                  </div>
                  <div className="scp-price-section-label">
                    Governance & Oversight
                  </div>
                  <div
                    className="scp-price-section-label"
                    style={{ fontSize: "24px" }}
                  >
                    $ <s> {billing === "annual" ? "39.99" : "49.99"}</s> 50% OFF
                  </div>
                  <div className="scp-price-row-item">
                    <div className="scp-price-big">
                      <span className="scp-price-dollar">$</span>
                      <span className="scp-price-number">
                        {billing === "annual" ? "19" : "24"}
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
                    <p className="scp-price-section-label">60–120 staff</p>
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">Best for:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Multi-site providers, SIL providers, and organisations
                      managing increasing governance pressure.
                    </p>
                  </div>
                  <div className="scp-price-row-item">
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">supports:</span>
                    </div>
                    <p className="scp-price-addon-note">Approval workflows</p>
                    <p className="scp-price-addon-note">Delegation controls</p>
                    <p className="scp-price-addon-note">Audit trails</p>
                    <p className="scp-price-addon-note">Incident escalation</p>
                    <p className="scp-price-addon-note">Compliance reporting</p>
                    <p className="scp-price-addon-note">Executive dashboards</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scp-price-card scp-price-card-max-width">
              <div className="scp-price-card-body">
                {/* Left: price rows */}
                <div className="scp-price-card-prices">
                  <div
                    className="scp-price-addon-label"
                    style={{ fontSize: "22px" }}
                  >
                    Enterprise
                  </div>
                  <div className="scp-price-section-label">
                    Consolidation & Executive Visibility
                  </div>
                  {/* <div
                    className="scp-price-section-label"
                    style={{ fontSize: "24px" }}
                  >
                    $ <s> {billing === "annual" ? "39.99" : "49.99"}</s> 50% OFF
                  </div> */}
                  <div className="scp-price-row-item">
                    <div className="scp-price-big">
                      {/* <span className="scp-price-dollar">$</span>
                      <span className="scp-price-number">
                        {billing === "annual" ? "19" : "24"}
                      </span> */}
                      <span className="scp-price-cents">
                        Custom pricing for large organisations
                      </span>
                    </div>
                    {/* <div className="scp-price-label">per seat / month</div> */}
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
                    <p className="scp-price-section-label">120+ staff</p>
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">Best for:</span>
                    </div>
                    <p className="scp-price-addon-note">
                      Executive teams requiring financial consolidation,
                      multi-entity oversight, and board-level reporting.
                    </p>
                  </div>
                  <div className="scp-price-row-item">
                    <div className="scp-price-addon-row">
                      <span className="scp-price-addon-label">supports:</span>
                    </div>
                    <p className="scp-price-addon-note">Native payroll</p>
                    <p className="scp-price-addon-note">Native accounting</p>
                    <p className="scp-price-addon-note">
                      Multi-entity reporting
                    </p>
                    <p className="scp-price-addon-note">Executive dashboards</p>
                    <p className="scp-price-addon-note">
                      Consolidated financial visibility
                    </p>
                    <p className="scp-price-addon-note">
                      Board-ready reporting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="scp-faq">
        <div className="scp-outer">
          <div className="scp-label-wrapper">
            <div className="scp-label scp-label--dark">
              Frequently Asked Questions
            </div>
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
      <div className="eofy-terms-link" onClick={() => navigate("/promo-terms")}>
        TesseractApps End of Financial Year Promotion Terms
      </div>
    </div>
  );
};

export default promopage;
