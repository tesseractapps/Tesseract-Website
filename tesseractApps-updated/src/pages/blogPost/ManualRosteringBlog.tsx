// import { useNavigate } from "react-router-dom";
// import { appNavigate } from "../../routes/AppRoutes";
import "./BlogPostStyles.css";
import blogImage from "../../assets/Why Manual Rostering Is Costing You More Than You Think.webp";
import { useMetaTags } from "../../utils/useMetaTags";

const ManualRosteringBlog = () => {
  useMetaTags({
    title:
      "Why Manual Rostering Costs More Than You Think | NDIS | TesseractApps",
    description:
      "Calculate the true cost of manual rostering for your NDIS business. Time waste, errors, compliance risks, and how automation delivers ROI.",
  });

  // const navigate = useNavigate();

  // function handleClick(name: string) {
  //   appNavigate(name, navigate);
  // }

  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="Manual Rostering Costs"
        className="blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            Why Manual Rostering Is Costing You More Than You Think
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            Australia’s care and disability services sector is under pressure.
            Providers must balance compliance, workforce constraints, and
            participant needs while running lean operations. Yet many still rely
            on manual rostering—spreadsheets, phone calls, and paper records.
          </p>

          <p>
            While manual rostering may seem simple and low-cost, it quietly
            erodes time, budgets, and staff morale.
          </p>

          <section className="section">
            <h2 className="section-title">
              The Hidden Costs of Manual Rostering
            </h2>

            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">
                  1. Lost Productivity and Administrative Burden
                </h3>
                <p>
                  Creating and adjusting rosters manually consumes hours of
                  management time each week.
                </p>
                <p>
                  A mid-sized provider can lose 10–15 hours weekly on scheduling
                  alone.
                </p>
                <p>
                  This is time that could be spent directly supporting
                  participants and staff.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">2. Compliance Risks</h3>
                <p>
                  NDIS providers must follow strict rules around qualifications,
                  awards, and fatigue management. Manual methods make it easy to
                  overlook:
                </p>
                <ul>
                  <li>Mandatory rest periods</li>
                  <li>Employee certifications or police checks</li>
                  <li>Overtime and penalty rate obligations</li>
                </ul>
                <p>
                  Even minor oversights can trigger costly audits or penalties.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">3. Higher Labour Costs</h3>
                <p>
                  Manual rostering often leads to overstaffing, understaffing,
                  or misaligned skill assignments, inflating payroll.
                </p>
                <ul>
                  <li>
                    Assigning a senior worker where a junior staff member would
                    suffice
                  </li>
                  <li>
                    Doubling up staff unnecessarily due to poor visibility
                  </li>
                </ul>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">
                  4. Reduced Staff Engagement and Retention
                </h3>
                <p>
                  Confusing or frequently changing rosters frustrate employees.
                  Missed preferences and last-minute alerts increase stress,
                  leading to disengagement and higher turnover.
                </p>
                <p>
                  With workforce shortages affecting 78% of NDIS providers,
                  manual rostering exacerbates retention challenges.
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">5. Limited Data and Insights</h3>
                <p>
                  Paper and spreadsheet rosters provide little visibility into
                  trends like absenteeism, overtime, or labour allocation,
                  limiting opportunities for strategic planning and cost
                  optimisation.
                </p>
              </div>
            </div>
          </section>

          <section className="section highlight-section">
            <h2 className="section-title">
              How Smarter Rostering Transforms Care Delivery
            </h2>
            <p>
              Smart rostering platforms like TesseractApps automate and
              integrate scheduling, eliminating inefficiencies:
            </p>
            <ul>
              <li>
                <strong>Smart Scheduling:</strong> Automatically matches workers
                to shifts based on availability, qualifications, and compliance
                requirements.
              </li>
              <li>
                <strong>Mobile Access:</strong> Real-time shift notifications,
                clock-in/out, and updates to reduce confusion.
              </li>
              <li>
                <strong>Built-in Compliance:</strong> Alerts for expired
                certifications, fatigue violations, and award non-compliance.
              </li>
              <li>
                <strong>Cost Control:</strong> Optimises labour allocation to
                avoid overstaffing and unnecessary payroll costs.
              </li>
              <li>
                <strong>Data & Reporting:</strong> Tracks staff performance,
                absences, and expenses with audit-ready reports.
              </li>
            </ul>
          </section>

          <section className="section">
            <h2 className="section-title">Why It Matters</h2>
            <p>
              As the NDIS continues to grow, with hundreds of thousands of
              participants now in the scheme, providers cannot afford to waste
              resources or risk compliance failures. Manual rostering may appear
              simple, but its hidden costs are significant—financially and
              operationally.
            </p>
            <p>
              Adopting smart rostering is not just about convenience; it is a
              strategic step to future-proof your organisation, improve staff
              engagement, and deliver better outcomes for participants.
            </p>
          </section>

          <section className="sources-section">
            <h2 className="section-title">References</h2>
            <ol className="sources-list">
              <li>
                NDIS. (2025). Quarterly Reports.{" "}
                <a
                  href="https://www.ndis.gov.au/publications/quarterly-reports"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.ndis.gov.au/publications/quarterly-reports
                </a>
              </li>
              <li>
                National Disability Services. (2014). State of the Disability
                Sector Report 2014.{" "}
                <a
                  href="https://nds.org.au/resources/all-resources/state-of-the-disability-sector-report-2014"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://nds.org.au/resources/all-resources/state-of-the-disability-sector-report-2014
                </a>
              </li>
            </ol>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ManualRosteringBlog;
