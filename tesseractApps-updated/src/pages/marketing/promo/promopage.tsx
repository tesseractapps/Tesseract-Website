import { useState } from "react";
import SEO from "../../../components/common/SEO";
import "./PromoPage.css";
import { trackCTAClick } from "../../../utils/analytics";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default promopage;
