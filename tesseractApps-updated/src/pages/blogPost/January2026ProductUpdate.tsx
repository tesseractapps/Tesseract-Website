import "./BlogPostStyles.css";
import blogImage from "../../assets/January 2026 Release Notes.webp";

const January2026ProductUpdate = () => {
  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="NDIS Compliance Audits 2026 Why Providers Fail and How to Fix It"
        className="blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            January 2026 Product Update – What’s New This Month?
          </h1>
        </header>
        <div className="blog-content">
          <p className="intro-paragraph">
            We’ve been busy behind the scenes this month, rolling out a stack of
            improvements designed to make rostering smoother, compliance
            clearer, and day-to-day admin just a little less painful.
          </p>
          <p>
            From smarter pay rules and clearer payslips to better visibility
            across shifts, invoices, and participant records. Here’s a snapshot
            of what’s new and how it helps you.{" "}
          </p>
        </div>
        <section className="section sources-section">
          <h2 className="section-title">
            Smarter Rostering & Shift Management{" "}
          </h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">Rejected Shift Log</h3>
              <p>
                You can now view rejected shifts in a clear, calendar-based
                format — complete with rejection reasons and full shift context.
                Shifts can be reassigned directly from the calendar, with audit
                trails and rejection analytics built in.
              </p>
              <h3 className="feature-title">Blank Shift Creation</h3>
              <p>
                Plan ahead with more flexibility. You can now create shifts
                without assigning a staff member or participant, making early
                roster planning much easier.
              </p>
              <h3 className="feature-title">Copy & Paste Roster Shifts</h3>
              <p>
                Multi-select copy and paste is here. Duplicate rostered shifts
                while preserving key details, with validation rules ensuring
                accuracy and compliance.
              </p>
              <h3 className="feature-title">Timesheet Compliance Visibility</h3>
              <p>
                Timesheet status is now clearer at a glance, with dropdown
                indicators for Auto Approved and Review Required shifts.
              </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">Compliance, Awards & Fair Pay</h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">
                Shift Compliance – Facility Level
              </h3>
              <p>
                Compliance checks now operate at the facility level, alongside
                staff documents and training. This ensures rosters align with
                industry rules, staff readiness, and regulatory requirements.
              </p>
              <h3 className="feature-title">Highest Pay Rule</h3>
              <p>
                For mixed-rate shifts, the system now automatically applies the
                highest applicable pay rate across the full shift — ensuring
                staff are paid fairly and correctly.
              </p>
              <h3 className="feature-title">Enhanced Payslips</h3>
              <p>Payslips now include:</p>
              <ul>
                <li>
                  Clear breakdowns of earnings, deductions, tax, and super{" "}
                </li>
                <li>Shift-level hours </li>
                <li>Easy comparison of This Pay vs Year to Date (YTD) </li>
              </ul>
              <p>More clarity for staff, fewer questions for payroll. </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">
            Invoicing, Funds & Financial Control{" "}
          </h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">
                Funds Tracker & Facility Catalogue Settings
              </h3>
              <p>
                You can now configure industry-specific service catalogues per
                facility, allowing tailored service items that reflect how each
                site actually operates.
              </p>
              <h3 className="feature-title">
                Service Type Search in Funds Tracker
              </h3>
              <p>
                A new search bar makes adding funds faster and easier,
                especially for organisations managing large service catalogues.
              </p>
              <h3 className="feature-title">
                Add Service / Invoice in Manage Invoices{" "}
              </h3>
              <p>
                Users can now directly add service entries or invoices for
                participants, streamlining manual invoice management.
              </p>
              <h3 className="feature-title">
                Bulk Participant Invoicing & Bulk Entity Creation
              </h3>
              <p>
                Generate invoices and create entities in bulk using templates.
                Data is automatically validated and synced with the Funds
                Tracker to reduce errors.
              </p>
              <h3 className="feature-title">
                Mandatory Participant Details on Invoices
              </h3>
              <p>
                Invoice PDFs now include a Participant Details section with
                name, address, and participant number for improved compliance
                and clarity.{" "}
              </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">Documents, Forms & Audit Trails</h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">Document History Log</h3>
              <p>
                Organisation and Staff documents now include full history
                tracking — showing uploads, updates, and changes to support
                audits and compliance reviews.
              </p>
              <h3 className="feature-title">Enhanced Form Assignment</h3>
              <p>
                Forms can now be assigned facility-wise, with facility-based
                filtering to ensure the right forms reach the right people.
              </p>
              <h3 className="feature-title">
                On-Demand Consent Forms with TSign
              </h3>
              <p>
                Generate, assign, and digitally sign consent forms on demand.
                Signed forms are securely stored within participant records for
                easy access and compliance.
              </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">Participant & Contact Management </h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">CRN & IRN Fields </h3>
              <p>
                New CRN and IRN fields have been added to participant profiles,
                improving identification and regulatory record-keeping.
              </p>
              <h3 className="feature-title">
                Custom Participant Tab Names (Premium){" "}
              </h3>
              <p>
                Premium users can now customise participant tab labels to better
                match internal workflows and terminology.
              </p>
              <h3 className="feature-title">
                Single Primary Contact for Multiple Participants
              </h3>
              <p>
                One authorised contact can securely access multiple participant
                profiles, with full consent and privacy controls in place.
              </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">Communication & Onboarding </h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">Email Sender Display Name </h3>
              <p>
                Outgoing emails now clearly show your organisation name as the
                sender, improving recognition and trust.
              </p>
              <h3 className="feature-title">Leave Requests in Tasks Widget</h3>
              <p>
                Leave-related tasks now display clearer context, status, and
                timestamps, with accurate redirection and read-only views for
                completed tasks.
              </p>
              <h3 className="feature-title">Onboarding Videos in T-Learner</h3>
              <p>
                A new Onboarding tab allows organisations to upload and manage
                onboarding videos, helping new starters get up to speed faster
                and more consistently.
              </p>
            </div>
          </div>
        </section>
        <section className="section sources-section">
          <h2 className="section-title">Reporting & Data Access </h2>
          <div className="security-features">
            <div className="security-feature">
              <h3 className="feature-title">
                Bulk Download of Detailed Shift Reports{" "}
              </h3>
              <p>
                Export detailed shift reports in bulk using templates. Multiple
                formats are supported, with optional attachments and audit
                logging included.
              </p>
            </div>
          </div>
        </section>

        <section className="section highlight-section">
          <h2 className="section-title">Want the details? </h2>
          <p>
            This post gives you the highlights, but many of these updates
            include additional configuration options and workflow improvements.
            If you’d like help setting anything up or understanding how these
            changes affect your organisation, our team is here to help. Thanks
            for growing with us. Stay tuned for more improvements coming next
            month!{" "}
          </p>
        </section>
      </article>
    </div>
  );
};

export default January2026ProductUpdate;
