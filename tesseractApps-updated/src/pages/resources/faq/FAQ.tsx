import "./FAQStyles.css";
import { useState } from "react";
import SEO from "../../../components/common/SEO";
import { buildFAQSchema } from "../../../utils/schemaHelpers";
import { faqPageDummyData } from "../../../data/faqData";

// Flatten all FAQs for schema
const allFaqs = faqPageDummyData.flatMap((section) => {
  if (section.faq) return section.faq;
  if ("data" in section && section.data) {
    return section.data.flatMap((cat: { faq: { question: string; answer: string }[] }) => cat.faq);
  }
  return [];
});

const FAQ = () => {
  const [openKeys, setOpenKeys] = useState<Record<string, number | null>>({});

  const toggle = (sectionKey: string, index: number) => {
    setOpenKeys((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === index ? null : index,
    }));
  };

  const faqSchema = buildFAQSchema(
    allFaqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <div id="faq-page">
      <SEO
        title="NDIS Software FAQ | Help Centre — TesseractApps"
        description="Find answers to common questions about TesseractApps — rostering, compliance, timesheets, participant management, HR, accounting, and more."
        structuredData={faqSchema}
      />

      {/* ── Hero ── */}
      <section id="faq-hero">
        <div id="faq-hero-inner">
          <div id="faq-hero-label">Help Centre</div>
          <h1 id="faq-hero-heading">Frequently Asked Questions</h1>
          <p id="faq-hero-sub">
            Everything you need to know about TesseractApps, organised by topic.
          </p>
        </div>
      </section>

      {/* ── FAQ sections ── */}
      <main id="faq-main">
        <div id="faq-inner">
          {faqPageDummyData.map((section) => {
            // Section with flat FAQ list (General FAQs, Timesheet)
            if (section.faq) {
              const sectionKey = section.section;
              return (
                <section key={sectionKey} className="faq-section">
                  <h2 className="faq-section-heading">{section.section}</h2>
                  <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
                    {section.faq.map((item, index) => {
                      const isOpen = openKeys[sectionKey] === index;
                      return (
                        <div
                          key={index}
                          className={`faq-item${isOpen ? " faq-item--open" : ""}`}
                          itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                        >
                          <button
                            type="button"
                            className={`faq-question${isOpen ? " faq-question--open" : ""}`}
                            onClick={() => toggle(sectionKey, index)}
                            aria-expanded={isOpen ? "true" : "false"}
                          >
                            <span itemProp="name">{item.question}</span>
                            <span className="faq-chevron" aria-hidden="true">+</span>
                          </button>
                          {isOpen && (
                            <div
                              className="faq-answer"
                              itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                            >
                              <p itemProp="text">{item.answer}</p>
                              {"points" in item && Array.isArray(item.points) && (
                                <ul className="faq-points">
                                  {(item.points as string[]).map((pt, i) => <li key={i}>{pt}</li>)}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            }

            // Section with categorised sub-sections (Product-Wise FAQs)
            if ("data" in section && section.data) {
              return (
                <section key={section.section} className="faq-section">
                  <h2 className="faq-section-heading">{section.section}</h2>
                  {section.data.map((cat) => {
                    const sectionKey = `${section.section}__${cat.title}`;
                    return (
                      <div key={cat.title} className="faq-category">
                        <h3 className="faq-category-heading">{cat.title}</h3>
                        <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
                          {cat.faq.map((item, index) => {
                            const isOpen = openKeys[sectionKey] === index;
                            return (
                              <div
                                key={index}
                                className={`faq-item${isOpen ? " faq-item--open" : ""}`}
                                itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                              >
                                <button
                                  type="button"
                                  className={`faq-question${isOpen ? " faq-question--open" : ""}`}
                                  onClick={() => toggle(sectionKey, index)}
                                  aria-expanded={isOpen ? "true" : "false"}
                                >
                                  <span itemProp="name">{item.question}</span>
                                  <span className="faq-chevron" aria-hidden="true">+</span>
                                </button>
                                {isOpen && (
                                  <div
                                    className="faq-answer"
                                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                                  >
                                    <p itemProp="text">{item.answer}</p>
                                    {"points" in item && Array.isArray(item.points) && (
                                      <ul className="faq-points">
                                        {(item.points as string[]).map((pt, i) => <li key={i}>{pt}</li>)}
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </section>
              );
            }

            return null;
          })}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
