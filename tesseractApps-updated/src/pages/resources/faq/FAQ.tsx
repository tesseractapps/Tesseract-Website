import "./FAQStyles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { buildFAQSchema } from "../../../utils/schemaHelpers";

const NDIS_FAQS = [
  {
    question: "Is TesseractApps NDIS-compliant?",
    answer: "Yes. TesseractApps is purpose-built for NDIS providers and fully supports NDIS Practice Standards, incident reporting, worker screening records, and NDIS claiming workflows. All data is Australian-hosted and meets NDIS Quality and Safeguards Commission requirements.",
  },
  {
    question: "What is TesseractApps and what does it do?",
    answer: "TesseractApps is an end-to-end workforce management platform built specifically for NDIS and care providers in Australia. It combines rostering, compliance tracking, HR management, participant management, payroll integration, and incident management into one connected platform.",
  },
  {
    question: "How does TesseractApps help NDIS providers with rostering?",
    answer: "TesseractApps automates shift scheduling for disability support workers, matching workers to participants based on skills, availability, and NDIS plan requirements. It handles recurring shifts, last-minute changes, and compliance checks (worker screening, certifications) in real time.",
  },
  {
    question: "Can support workers use TesseractApps on mobile?",
    answer: "Yes. TesseractApps has a mobile application available for iOS and Android. Support workers can view their roster, clock in and out, complete forms, log incidents, and communicate with their team directly from their phone.",
  },
  {
    question: "How does TesseractApps help with NDIS claiming?",
    answer: "TesseractApps captures service delivery data, timesheets, shift records, and participant notes, and aligns them to NDIS support categories for claiming. It integrates with accounting systems including Xero to streamline the bulk upload and claiming process.",
  },
  {
    question: "How long does it take to get started with TesseractApps?",
    answer: "Most organisations are fully operational within two to four weeks. TesseractApps provides guided onboarding support, including a Provider Maturity Review to configure the platform for your specific care type, team size, and NDIS registration groups.",
  },
  {
    question: "Does TesseractApps support multiple NDIS registration groups?",
    answer: "Yes. TesseractApps is designed to support providers across multiple NDIS registration groups, including Supported Independent Living (SIL), Support Coordination, Daily Activities, Community Participation, and more. It handles the different compliance and documentation requirements for each group.",
  },
  {
    question: "What makes TesseractApps different from other NDIS software?",
    answer: "Unlike generic workforce tools adapted for the NDIS, TesseractApps was built from the ground up for NDIS providers. It is Salesforce-native, Australian-hosted, and includes NDIS-specific features like participant plan management, NDIS incident reporting, and worker screening compliance, all in a single platform rather than disconnected tools.",
  },
  {
    question: "Does TesseractApps integrate with Xero and other accounting software?",
    answer: "Yes. TesseractApps integrates natively with Xero for payroll and invoicing. It also integrates with Salesforce for CRM and participant relationship management, and with Wyzed for staff training delivery.",
  },
  {
    question: "How is participant data kept secure in TesseractApps?",
    answer: "TesseractApps uses Australian data hosting, role-based access controls, and ISO-aligned security practices to protect participant and worker data. Only authorised staff see the information relevant to their role, and all access is logged for audit purposes.",
  },
];

const HELP_CENTRE_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      "Platform onboarding checklist",
      "Role setup and access basics",
      "First week implementation milestones",
    ],
  },
  {
    title: "Product Guides",
    items: [
      "Rostering and scheduling workflows",
      "Timesheets, claiming, and payroll alignment",
      "Compliance evidence and incident handling",
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      "Common setup and data issues",
      "Permission and user access troubleshooting",
      "Escalation paths for urgent blockers",
    ],
  },
  {
    title: "Support Channels",
    items: [
      "Business-hours support queue",
      "Guided implementation support",
      "Release update communications",
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = buildFAQSchema(NDIS_FAQS);

  return (
    <div>
      <SEO
        title="NDIS Software FAQ | TesseractApps Help Centre & Support"
        description="Find answers to common questions about TesseractApps NDIS software. Learn about rostering, compliance, claiming, mobile access, integrations, and getting started."
        structuredData={faqSchema}
      />

      {/* ── Hero ── */}
      <section id="hc-hero">
        <div id="hc-hero-inner">
          <div id="hc-hero-label">Help Centre</div>
          <h1 id="hc-hero-heading">Support Resources Built for Care Teams</h1>
          <p id="hc-hero-sub">
            The help centre is now structured around implementation support, product guidance,
            and issue resolution, in line with the final resource strategy.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section id="hc-content">
        <div id="hc-outer">
          <div id="hc-section-label" className="hc-section-label">Support Framework</div>
          <h2 id="hc-section-heading">How support content is organised</h2>

          <div id="hc-grid">
            {HELP_CENTRE_SECTIONS.map((section) => (
              <article key={section.title} className="hc-card">
                <h3 className="hc-card-title">{section.title}</h3>
                <ul className="hc-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div id="hc-resource-links">
            <h3 id="hc-resource-links-heading">Related resources</h3>
            <div id="hc-link-row">
              <Link to="/blogs" className="hc-resource-link">Blog</Link>
              <Link to="/whitepapers" className="hc-resource-link">Whitepapers</Link>
              <Link to="/changelog" className="hc-resource-link">Release Notes</Link>
              <Link to="/contact-us" className="hc-resource-link">Contact Support</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NDIS FAQ Accordion ── */}
      <section id="hc-faq">
        <div className="hc-outer">
          <div className="hc-section-label">Frequently Asked Questions</div>
          <h2 id="hc-faq-heading">Common questions about TesseractApps NDIS software</h2>
          <div id="hc-faq-list" itemScope itemType="https://schema.org/FAQPage">
            {NDIS_FAQS.map((faq, index) => (
              <div
                key={index}
                className="hc-faq-item"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  className={`hc-faq-question${openIndex === index ? " hc-faq-question--open" : ""}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index ? "true" : "false"}
                >
                  <span itemProp="name">{faq.question}</span>
                  <span className="hc-faq-icon" aria-hidden="true">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div
                    className="hc-faq-answer"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
