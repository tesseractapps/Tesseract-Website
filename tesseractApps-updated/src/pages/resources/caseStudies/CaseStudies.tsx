import "./CaseStudiesStyles.css";
import SEO from "../../../components/common/SEO";

const CASE_STUDIES = [
  {
    title: "Disability Support Provider",
    summary:
      "How a medium-sized provider replaced fragmented spreadsheets with one platform to reduce admin overhead and improve service consistency.",
    metric: "Admin time reduced",
    value: "Target: 30%+",
    status: "In production pipeline",
  },
  {
    title: "Support Coordination Team",
    summary:
      "A practical implementation playbook for improving plan visibility, handovers, and participant communication across distributed teams.",
    metric: "Service visibility uplift",
    value: "Target: 2x",
    status: "In production pipeline",
  },
  {
    title: "Growing Multi-Site Organisation",
    summary:
      "A staged migration from disconnected operations to centralised rostering, compliance evidence, and audit-ready reporting.",
    metric: "Reporting turnaround",
    value: "Target: 50% faster",
    status: "In production pipeline",
  },
];

const CaseStudies = () => {
  return (
    <div>
      <SEO
        title="Case Studies | Real NDIS Provider Outcomes | TesseractApps"
        description="Explore practical case studies showing how NDIS providers streamline rostering, compliance, and operations with TesseractApps."
      />

      <section id="cs-hero">
        <div id="cs-hero-inner">
          <div id="cs-hero-label">Case Studies</div>
          <h1 id="cs-hero-heading">Real Transformation Stories From Care Providers</h1>
          <p id="cs-hero-sub">
            Our final content strategy includes deep implementation stories with measurable outcomes.
            This page now tracks the active case study pipeline and upcoming publishes.
          </p>
        </div>
      </section>

      <section id="cs-content">
        <div id="cs-outer">
          <div id="cs-section-label">Publishing Pipeline</div>
          <h2 id="cs-section-heading">Planned case studies for release</h2>

          <div id="cs-grid">
            {CASE_STUDIES.map((item) => (
              <article key={item.title} className="cs-card">
                <div className="cs-status">{item.status}</div>
                <h3 className="cs-title">{item.title}</h3>
                <p className="cs-summary">{item.summary}</p>
                <div className="cs-metric-wrap">
                  <span className="cs-metric-label">{item.metric}</span>
                  <span className="cs-metric-value">{item.value}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
