import "./BlogPostStyles.css";
import blogImage from "../../assets/MelbourneExpo.webp";
import { useMetaTags } from "../../utils/useMetaTags";

const Blog11 = () => {
  useMetaTags({
    title: "NDIS Industry Trends 2025 | Care Sector Outlook | TesseractApps",
    description:
      "Explore NDIS industry trends for 2025. Technology adoption, regulatory changes, workforce challenges, and opportunities for Australian care providers.",
  });

  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="Manual Rostering Costs"
        className="blog-image blog-11-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            TesseractApps at the Melbourne Expo 2025 Driving Smarter NDIS
            Operations
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            TesseractApps was proud to showcase our NDIS management platform at
            the <strong>Melbourne Expo 2025</strong>, connecting with providers
            across Victoria to demonstrate how technology can simplify
            compliance, reduce administrative workload, and improve participant
            outcomes.
          </p>

          <section className="section">
            <h2 className="section-title">Streamline Your NDIS Operations</h2>
            <p>
              Our platform offers end-to-end solutions for NDIS providers,
              including :
            </p>
            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">
                  Participant Management: Secure, centralised records with
                  real-time updates.
                </h3>
                <h3 className="feature-title">
                  Rostering & Payroll: Efficient staff scheduling and automated
                  payroll management.
                </h3>
                <h3 className="feature-title">
                  Cost & Service Tracking: Simplified invoicing and reporting to
                  stay compliant.
                </h3>
                <h3 className="feature-title">
                  Mobile Access: Empower staff and participants with secure
                  access anytime, anywhere.
                </h3>
              </div>
            </div>
          </section>
          <section className="section">
            <p>
              With <strong>ISO 27001 and ISO 9001 certifications</strong>,
              TesseractApps ensures data security and operational excellence,
              helping providers focus on what matters most – delivering quality
              care.
            </p>
          </section>

          <section className="section highlight-section">
            <h2 className="section-title">
              Why Providers Choose TesseractApps
            </h2>
            <p>
              At Melbourne Expo 2025, we engaged with NDIS providers to discuss:
            </p>
            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">
                  Upcoming compliance changes and pricing updates
                </h3>
              </div>
              <div className="security-feature">
                <h3 className="feature-title">
                  Efficient ways to manage administrative tasks
                </h3>
              </div>
              <div className="security-feature">
                <h3 className="feature-title">
                  Solutions tailored to different provider needs
                </h3>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Stay Ahead in NDIS Compliance</h2>
            <p>
              If you missed us at Melbourne Expo, you can still discover how
              TesseractApps can transform your NDIS operations. Request a
              personalised demo today and see how our platform helps providers
              stay <strong>compliant, efficient, and future-ready</strong>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Blog11;
