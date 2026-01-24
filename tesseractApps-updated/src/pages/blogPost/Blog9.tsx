// import { useNavigate } from "react-router-dom";
// import { appNavigate } from "../../routes/AppRoutes";
import "./BlogPostStyles.css";
import blogImage from "../../assets/Cover page for Top 3 Compliance Myths Busted-DESKTOP-VQ2C97V.webp";
// import useAppNavigate from "../../hooks/useAppNavigate";
import { useNavigate } from "react-router-dom";
import { useMetaTags } from "../../utils/useMetaTags";

const Blog9 = () => {
  useMetaTags({
    title: "Top 3 NDIS Compliance Myths Busted | Provider Guide | TesseractApps",
    description: "Debunking common NDIS compliance myths. Understand what's really required, avoid costly mistakes, and simplify your compliance approach."
  });
  const navigate = useNavigate();

  // function handleClick(name: string) {
  //   appNavigate(name, navigate);
  // }
  // const appNavigate = useAppNavigate();
  function handleClick(name: string) {
    navigate(name);
  }
  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="Manual Rostering Costs"
        className="blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">Top 3 Compliance Myths Busted</h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            Compliance is one of the biggest concerns for NDIS providers. Many
            organisations worry about audits, documentation gaps, and the
            complexity of staying “NDIS-ready.” But the truth is, much of this
            fear comes from misunderstanding what compliance really involves.
          </p>

          <section className="section">
            <h2 className="section-title">
              Let’s clear the air by debunking the three most common compliance
              myths that hold providers back.
            </h2>
            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">
                  Myth 1: Compliance Is Only About Paperwork
                </h3>
                <p>
                  <strong>The reality:</strong> Compliance isn’t just about
                  having forms filled and stored. It’s about maintaining
                  consistent, transparent, and auditable processes that show
                  you’re delivering quality care.
                </p>
                <p>
                  <strong>What to do:</strong>
                  <ul>
                    <li>
                      Use digital tools that record activity in real-time.
                    </li>
                    <li>
                      Automate your reporting to reduce manual entry errors.
                    </li>
                    <li>
                      Centralise your data so every audit trail is clear and
                      accessible.
                    </li>
                    With an integrated NDIS management platform like
                    TesseractApps, documentation becomes automatic — not a
                    burden.
                  </ul>
                </p>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">
                  Myth 2: Compliance Is the Job of One Person
                </h3>
                <p>
                  <strong>The reality:</strong> Compliance isn’t one person’s
                  responsibility — it’s an organisational culture.
                </p>
                <p>
                  When compliance sits solely with an admin or manager, gaps
                  form. Staff may not follow best practices because they don’t
                  see compliance as part of their daily role.
                </p>
                <p>
                  <strong>What to do:</strong>
                  <ul>
                    <li>Train your team to understand compliance standards.</li>
                    <li>
                      Make compliance visible in every workflow — from rostering
                      to incident reporting.
                    </li>
                    <li>
                      Use role-based permissions to ensure everyone’s
                      accountable.
                    </li>
                    Platforms like <strong>TesseractApps</strong> make it easy
                    by embedding compliance checkpoints across all workflows, so
                    every team member contributes to a compliant environment.
                  </ul>
                </p>
              </div>
              <div className="security-feature">
                <h3 className="feature-title">
                  Myth 3: Compliance Slows Down Service Delivery
                </h3>
                <p>
                  <strong>The reality:</strong> Manual compliance slows things
                  down — automation doesn’t.
                </p>
                <p>
                  Many providers believe that adding compliance steps will delay
                  operations. In truth, technology eliminates repetitive tasks
                  and speeds up audits, approvals, and reporting.
                </p>
                <p>
                  <strong>What to do:</strong>
                  <ul>
                    <li>Adopt automation to simplify compliance workflows.</li>
                    <li>
                      Replace spreadsheets with intelligent reporting
                      dashboards.
                    </li>
                    <li>
                      Leverage real-time alerts for document expiry or
                      credential updates.
                    </li>
                    When compliance is built into your system, not stacked on
                    top of it, your team can focus more on care — not
                    administration.
                  </ul>
                </p>
              </div>
            </div>
          </section>

          <section className="section highlight-section">
            <p>
              NDIS compliance doesn’t have to be complicated. With the right
              tools, it becomes part of how you operate — not an afterthought.
            </p>
            <p>
              <strong>TesseractApps</strong> helps providers simplify compliance
              through automation, secure data management, and transparent
              reporting. Our goal is to give you confidence that every audit,
              every time, you’re already compliant.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">Ready to simplify compliance?</h2>
            <p>
              <strong
                id="blog-book-a-demo"
                onClick={() => handleClick("/book-a-demo")}
              >
                Book a Demo
              </strong>{" "}
              to see how TesseractApps keeps your organisation audit-ready —
              every day.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Blog9;
