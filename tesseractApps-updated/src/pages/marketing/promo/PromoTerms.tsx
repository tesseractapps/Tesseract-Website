import { Helmet } from "react-helmet-async";
import "./PromoTerms.css";

const PromoTerms = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TesseractApps End of Financial Year Promotion",
    description:
      "Official terms for the TesseractApps End of Financial Year Promotion. Get 50% off your total contract value when you book a demo and sign before 31 July 2026.",
    url: "https://tesseractapps.com.au/promo-terms",
    isPartOf: {
      "@type": "Organization",
      name: "TesseractApps",
      url: "https://tesseractapps.com.au",
    },
  };

  return (
    <>
      <Helmet>
        <title>
          TesseractApps End of Financial Year Promotion | 50% Off Your Contract
        </title>

        <meta
          name="description"
          content="Official terms for the TesseractApps End of Financial Year Promotion. Get 50% off your total contract value - NDIS Platform and Support Coordination App - when you book a demo and sign before 31 July 2026."
        />

        <link rel="canonical" href="https://tesseractapps.com.au/promo-terms" />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <main className="promo-page">
        <div className="promo-container">
          <h1>
            TesseractApps End of Financial Year Promotion - Official Terms
          </h1>

          <p className="last-updated">
            <strong>Last Updated:</strong> 22 June 2026
          </p>

          <section>
            <h2>Promotion Summary</h2>

            <p>
              TesseractApps is offering new customers{" "}
              <strong>50% off their total contract value</strong> for the NDIS
              Platform and/or the Support Coordination App.
            </p>

            <p>
              To qualify, customers must book a demo and have their signed
              contract in place before <strong>31 July 2026</strong>.
            </p>

            <p>
              This discount cannot be combined with any other offer or
              promotional rate.
            </p>
          </section>

          <section className="promo-disclosures">
            <h2>Required Disclosures</h2>

            <ul>
              <li>
                The 50% discount applies to the total contract value at the time
                of contract signing.
              </li>

              <li>
                The promotion is available to new customers only. Existing and
                former paid subscribers are not eligible.
              </li>

              <li>
                The offer ends at 23:59 UTC on 31 July 2026. TesseractApps
                reserves the right to extend or modify the promotion at its
                discretion.
              </li>

              <li>
                All prices are exclusive of applicable taxes, which will be
                added where required by law.
              </li>

              <li>
                This promotion cannot be combined with other offers unless
                explicitly stated.
              </li>

              <li>
                TesseractApps reserves the right to revoke the discount if
                eligibility criteria are not met or if fraudulent activity is
                detected.
              </li>
            </ul>
          </section>

          <section>
            <h2>Eligibility Requirements</h2>

            <ol>
              <li>Customer must be a new TesseractApps customer.</li>
              <li>A demo must be booked before 31 July 2026.</li>
              <li>
                A signed agreement for the NDIS Platform and/or Support
                Coordination App must be completed before the promotion
                deadline.
              </li>
              <li>
                The customer must satisfy all onboarding and verification
                requirements requested by TesseractApps.
              </li>
            </ol>
          </section>

          <section>
            <h2>Discount Details</h2>

            <p>
              The promotion provides a 50% reduction in the total contract value
              applicable at the time the agreement is executed.
            </p>

            <p>
              The discount applies only to the products included in the signed
              agreement and does not apply to future upgrades, custom
              development, third-party services, implementation fees, or
              additional purchases unless otherwise stated in writing.
            </p>
          </section>

          <section>
            <h2>Promotion Period</h2>

            <p>
              The promotion begins on its publication date and ends at{" "}
              <strong>23:59 UTC on 31 July 2026</strong>.
            </p>

            <p>
              TesseractApps may amend, suspend, extend, or terminate the
              promotion at any time where permitted by law.
            </p>
          </section>

          <section>
            <h2>General Terms and Conditions</h2>

            <ol>
              <li>
                Participation in this promotion constitutes acceptance of these
                Terms and Conditions.
              </li>

              <li>
                The promotion is available only for eligible new customers.
              </li>

              <li>
                Discounts have no cash value and cannot be redeemed for cash,
                credits, or refunds.
              </li>

              <li>
                The promotion may not be transferred, assigned, or resold.
              </li>

              <li>
                TesseractApps reserves the right to verify eligibility at any
                stage.
              </li>

              <li>
                Any attempt to manipulate, abuse, or fraudulently access the
                promotion may result in immediate disqualification.
              </li>

              <li>
                TesseractApps reserves the right to revoke or recover any
                incorrectly applied discount where eligibility requirements were
                not met.
              </li>

              <li>
                To the extent permitted by law, TesseractApps shall not be
                liable for any loss arising from participation in this
                promotion.
              </li>

              <li>
                These Terms and Conditions are governed by the laws applicable
                in the jurisdiction in which TesseractApps operates.
              </li>
            </ol>
          </section>

          {/* <section className="promo-links">
            <h2>Useful Links</h2>

            <div className="link-grid">
              <a href="/pricing">View Pricing</a>
              <a href="/faq">Frequently Asked Questions</a>
              <a href="/contact">Contact Us</a>
              <a href="/book-demo" className="cta-button">
                Book a Demo
              </a>
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default PromoTerms;
