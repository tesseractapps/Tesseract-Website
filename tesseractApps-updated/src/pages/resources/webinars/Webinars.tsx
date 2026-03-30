import "./WebinarsStyles.css";
import SEO from "../../../components/common/SEO";

const UPCOMING_WEBINARS = [
  {
    title: "Quarterly Product Webinar",
    summary:
      "A recurring walkthrough of new product updates, implementation guidance, and live Q&A for operations and compliance teams.",
    schedule: "Planned cadence: Quarterly",
  },
];

const Webinars = () => {
  return (
    <div>
      <SEO
        title="Webinars | Product Training & Updates | TesseractApps"
        description="Join upcoming TesseractApps webinars for product updates, practical implementation guidance, and live Q&A."
      />

      <section id="wb-hero">
        <div id="wb-hero-inner">
          <div id="wb-hero-label">Webinars</div>
          <h1 id="wb-hero-heading">Live Product Sessions for Care Teams</h1>
          <p id="wb-hero-sub">
            Webinars are a hidden resource channel in the final strategy and are maintained as
            invite-led sessions. Current schedule is listed below.
          </p>
        </div>
      </section>

      <section id="wb-content">
        <div id="wb-outer">
          <div id="wb-section-label">Upcoming</div>
          <h2 id="wb-section-heading">Current webinar schedule</h2>

          <div id="wb-grid">
            {UPCOMING_WEBINARS.map((item) => (
              <article key={item.title} className="wb-card">
                <h3 className="wb-title">{item.title}</h3>
                <p className="wb-summary">{item.summary}</p>
                <div className="wb-schedule">{item.schedule}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Webinars;
