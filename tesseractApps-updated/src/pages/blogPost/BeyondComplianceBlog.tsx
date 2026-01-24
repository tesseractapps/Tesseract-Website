// import { useNavigate } from "react-router-dom";
// import { AppNavigate } from "../../routes/AppNavigate";
import "./BlogPostStyles.css";
import blogImage from "../../assets/Beyond Compliance_ How TesseractApps NDIS Software Elevates Care Quality and Staff Experience.webp"; // replace with actual image
import useAppNavigate from "../../hooks/useAppNavigate";
import { useMetaTags } from "../../utils/useMetaTags";

const BeyondComplianceBlog = () => {
  useMetaTags({
    title: "Beyond Compliance: Building Quality Care | NDIS Excellence | TesseractApps",
    description: "Move beyond basic NDIS compliance to deliver quality care. Strategies for provider excellence, participant outcomes, and operational improvement."
  });

  const appNavigate = useAppNavigate();
  // const navigate = useNavigate();
  function handleClick(name: string) {
    appNavigate(name);
  }

  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="TesseractApps NDIS Software"
        className="blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            Beyond Compliance: How TesseractApps NDIS Software Elevates Care
            Quality and Staff Experience
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            NDIS providers face strict compliance requirements while working to
            deliver quality care. TesseractApps NDIS software helps you reduce
            administration, improve staff experience, and meet compliance
            standards without losing focus on participants.
          </p>

          <section className="section">
            <h2 className="section-title">Streamlined Operations</h2>
            <p>
              TesseractApps centralises participant records, rostering, payroll,
              HR, and incident reporting. Automated workflows reduce errors and
              save time. Your staff spend less time on paperwork and more time
              supporting participants.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Improved Care Coordination</h2>
            <p>
              All participant information is stored in one secure platform.
              Staff access up-to-date data instantly. Your teams communicate
              clearly and respond faster to participant needs. Service gaps
              reduce when information is consistent and accessible.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Enhanced Staff Experience</h2>
            <p>
              Your staff receive clear rosters and task lists. Automated alerts
              prevent missed shifts and deadlines. Transparent scheduling
              improves job satisfaction. Burnout reduces as staff spend less
              time tracking tasks manually.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Real-Time Insights</h2>
            <p>
              Dashboards provide visibility into compliance, care delivery, and
              finances. You see trends in staffing and participant needs. Data
              helps you make better decisions on resources and service planning.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Compliance Without Friction</h2>
            <p>
              TesseractApps tracks mandatory reporting and audit requirements.
              Accurate records are ready for NDIS reviews. Your organisation
              stays compliant and reduces the risk of penalties. You stay
              focused on quality service delivery.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Integrated Learning and Training</h2>
            <p>
              TesseractApps includes onboarding and training modules. Staff
              complete required courses on time. Automated reminders prevent
              gaps in training. Your workforce stays compliant and prepared.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Secure Document Management</h2>
            <p>
              All files, forms, and participant records are stored securely.
              Role-based permissions protect sensitive data. Staff access
              documents quickly during audits or planning.
            </p>
          </section>

          <section className="section">
            <p>
              TesseractApps NDIS software supports your organisation in managing
              compliance, strengthening staff performance, and improving
              participant outcomes. Explore our{" "}
              <span
                className="blog-link"
                onClick={() => {
                  handleClick("Roster Management");
                }}
              >
                NDIS rostering
              </span>
              ,{" "}
              <span
                className="blog-link"
                onClick={() => {
                  handleClick("Accounting");
                }}
              >
                payroll
              </span>
              ,{" "}
              <span
                className="blog-link"
                onClick={() => {
                  handleClick("HR Operations");
                }}
              >
                HR features
              </span>{" "}
              and{" "}
              <span
                className="blog-link"
                onClick={() => {
                  handleClick("T Learning Hub");
                }}
              >
                training modules
              </span>
              .
            </p>
            <p>
              For official guidance on provider compliance, visit the{" "}
              <a
                href="https://www.ndis.gov.au/providers/compliance"
                target="_blank"
                rel="noopener noreferrer"
              >
                Provider compliance | NDIS
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default BeyondComplianceBlog;
