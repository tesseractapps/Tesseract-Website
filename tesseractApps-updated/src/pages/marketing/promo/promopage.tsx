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
                navigate("/book-a-demo/");
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
          {/* Pricing card */}
          <div className="scp-price-card scp-price-card-max-width">
            <div className="scp-price-card-body">
              {/* Left: price rows */}
              <div className="scp-price-card-prices">
                <div
                  className="scp-price-addon-label"
                  style={{ fontSize: "22px" }}
                >
                  NDIS Platform & Support Coordination App
                </div>
                <div
                  className="scp-price-section-label"
                  style={{ fontSize: "16px" }}
                >
                  🏷️ 50% OFF - EOFY Offer
                </div>

                <div className="scp-price-row-item">
                  <div className="scp-price-big">
                    <span className="scp-price-cents">
                      <s> Full contract value </s>→ 50% off your total contract
                    </span>
                  </div>
                </div>
                <div className="scp-price-divider" />
                <div className="scp-price-row-item">
                  <p className="scp-price-addon-note">
                    NDIS Platform, Support Coordination App, or both
                  </p>
                  <p className="scp-price-addon-note">
                    Discount applied to full contract value, regardless of term
                    length
                  </p>
                  <p className="scp-price-addon-note">New customers only</p>
                  <p className="scp-price-addon-note">
                    Contract signed before 31 July 2026
                  </p>
                </div>
              </div>
              <div className="scp-price-card-right">
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
                    Book a Demo - Claim 50% Off
                  </button>
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
      <div className="eofy-terms-link" onClick={() => navigate("/promo-terms/")}>
        TesseractApps End of Financial Year Promotion Terms
      </div>
    </div>
  );
};

export default promopage;
