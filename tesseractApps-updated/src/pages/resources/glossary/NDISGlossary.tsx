import "./NDISGlossaryStyles.css";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { buildFAQSchema } from "../../../utils/schemaHelpers";

const GLOSSARY_TERMS = [
  {
    term: "NDIS",
    definition:
      "National Disability Insurance Scheme. Australia's national program that funds reasonable and necessary supports for people with permanent and significant disability, administered by the NDIA.",
  },
  {
    term: "NDIA",
    definition:
      "National Disability Insurance Agency. The independent statutory agency responsible for implementing and managing the NDIS across Australia.",
  },
  {
    term: "NDIS Plan",
    definition:
      "A personalised funding document outlining a participant's goals, supports, and NDIS funding amounts across support categories. Plans are reviewed annually or when circumstances change.",
  },
  {
    term: "Participant",
    definition:
      "A person with disability who has been approved to access NDIS funding and has an active NDIS plan.",
  },
  {
    term: "Support Coordinator",
    definition:
      "An NDIS-funded professional who helps participants understand and implement their NDIS plan, connect with providers, and build their capacity to self-manage supports.",
  },
  {
    term: "Specialist Support Coordinator",
    definition:
      "A higher-level support coordinator who assists participants with complex situations, working with multiple providers, mainstream services, and crisis management.",
  },
  {
    term: "NDIS Provider",
    definition:
      "An organisation or individual registered with the NDIS Quality and Safeguards Commission to deliver supports and services to NDIS participants.",
  },
  {
    term: "Registered Provider",
    definition:
      "An NDIS provider who has met the NDIS Practice Standards and Quality and Safeguards requirements, allowing them to deliver higher-risk supports and work with plan-managed or agency-managed participants.",
  },
  {
    term: "Unregistered Provider",
    definition:
      "A provider who has not registered with the NDIS Commission. They can only work with self-managed participants and are not subject to NDIS Practice Standard audits.",
  },
  {
    term: "NDIS Practice Standards",
    definition:
      "The quality standards that registered NDIS providers must meet, covering areas such as rights, governance, service access, support provision, and high-intensity supports.",
  },
  {
    term: "SIL",
    definition:
      "Supported Independent Living. NDIS funding for the supports a person needs to live in shared or independent accommodation, including overnight and weekend staffing.",
  },
  {
    term: "SDA",
    definition:
      "Specialist Disability Accommodation. Funding for purpose-built housing designed for NDIS participants with extreme functional impairment or very high support needs.",
  },
  {
    term: "Core Supports",
    definition:
      "One of the main NDIS support budget categories covering daily activities, consumables, social and community participation, and transport.",
  },
  {
    term: "Capacity Building Supports",
    definition:
      "NDIS funding to help participants build skills and independence over time, covering areas like support coordination, employment, improved daily living, and improved relationships.",
  },
  {
    term: "Capital Supports",
    definition:
      "NDIS funding for assistive technology, home modifications, and Specialist Disability Accommodation.",
  },
  {
    term: "Plan Management",
    definition:
      "A funding option where an NDIS-registered plan manager handles financial transactions, provider payments, and budget tracking on behalf of the participant.",
  },
  {
    term: "Self-Management",
    definition:
      "Where a participant (or their nominee) directly manages their NDIS funding, pays providers, and keeps records — giving maximum flexibility in provider choice.",
  },
  {
    term: "Agency-Managed",
    definition:
      "Where the NDIA manages a participant's funding directly, paying registered providers on the participant's behalf through the NDIS portal.",
  },
  {
    term: "Rostering",
    definition:
      "The scheduling of support workers to participant shifts. Effective NDIS rostering matches worker skills, availability, and qualifications to participant support needs.",
  },
  {
    term: "SCHADS Award",
    definition:
      "Social, Community, Home Care and Disability Services Industry Award. The industrial award that sets minimum pay rates, penalty rates, and conditions for most NDIS support workers in Australia.",
  },
  {
    term: "Worker Screening",
    definition:
      "A background check required for NDIS workers in risk-assessed roles. Each state and territory runs its own NDIS Worker Screening Check program.",
  },
  {
    term: "NDIS Audit",
    definition:
      "A formal review of a registered provider's compliance with the NDIS Practice Standards, conducted by an approved quality auditor. Mid-term and registration renewal audits are required.",
  },
  {
    term: "Incident Management",
    definition:
      "The system for recording, reporting, and responding to incidents affecting NDIS participants. Serious incidents must be reported to the NDIS Quality and Safeguards Commission.",
  },
  {
    term: "Restrictive Practice",
    definition:
      "Any practice that restricts the rights or freedom of movement of a person with disability. Use must be reported to the NDIS Commission and state/territory bodies.",
  },
  {
    term: "NDIS Quality and Safeguards Commission",
    definition:
      "The independent Commonwealth agency that regulates NDIS providers, handles complaints, and enforces the NDIS Practice Standards and Code of Conduct.",
  },
  {
    term: "Service Agreement",
    definition:
      "A written agreement between an NDIS participant and a provider outlining the supports to be delivered, costs, and terms of the arrangement.",
  },
  {
    term: "Claiming",
    definition:
      "The process by which NDIS providers submit payment requests to the NDIA (or plan manager) for services delivered to participants, aligned to NDIS support categories and price limits.",
  },
  {
    term: "Price Guide",
    definition:
      "The NDIS Pricing Arrangements and Price Limits document that sets maximum prices providers can charge for NDIS supports. Updated annually by the NDIA.",
  },
  {
    term: "Reasonable and Necessary",
    definition:
      "The NDIS test for whether a support will be funded. Supports must relate to a participant's disability, represent value for money, and not be the responsibility of another system.",
  },
  {
    term: "Progress Notes",
    definition:
      "Records documenting the supports delivered to a participant during each shift or session, including the participant's progress toward goals. Required for compliance and claiming.",
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const NDISGlossary = () => {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return GLOSSARY_TERMS.filter((t) => {
      if (activeLetter && !t.term.toUpperCase().startsWith(activeLetter)) return false;
      if (q) return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return true;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeLetter]);

  const availableLetters = new Set(GLOSSARY_TERMS.map((t) => t.term[0].toUpperCase()));

  const faqSchema = buildFAQSchema(
    GLOSSARY_TERMS.map((t) => ({ question: `What is ${t.term}?`, answer: t.definition }))
  );

  return (
    <div id="gloss-page">
      <SEO
        title="NDIS Glossary — Key Terms & Definitions for Providers | TesseractApps"
        description="Plain-English definitions of 30+ NDIS terms: NDIS plan, SIL, SCHADS Award, support coordination, rostering, claiming, worker screening, and more."
        structuredData={faqSchema}
        canonical="https://tesseractapps.com.au/ndis-glossary"
      />

      {/* ── Hero ── */}
      <section id="gloss-hero">
        <div id="gloss-hero-inner">
          <div id="gloss-hero-label">Reference</div>
          <h1 id="gloss-hero-heading">NDIS Glossary</h1>
          <p id="gloss-hero-sub">
            Plain-English definitions of the terms every NDIS provider needs to know —
            from plan management to Practice Standards.
          </p>
        </div>
      </section>

      {/* ── Search + Alpha filter ── */}
      <div id="gloss-controls">
        <input
          id="gloss-search"
          type="search"
          placeholder="Search terms…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
          aria-label="Search glossary terms"
        />
        <nav id="gloss-alpha" aria-label="Filter by letter">
          <button
            type="button"
            className={`gloss-alpha-btn${activeLetter === null && !search ? " gloss-alpha-btn--active" : ""}`}
            onClick={() => { setActiveLetter(null); setSearch(""); }}
          >
            All
          </button>
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              type="button"
              className={`gloss-alpha-btn${activeLetter === letter ? " gloss-alpha-btn--active" : ""}${!availableLetters.has(letter) ? " gloss-alpha-btn--disabled" : ""}`}
              onClick={() => availableLetters.has(letter) && setActiveLetter(activeLetter === letter ? null : letter)}
              aria-disabled={!availableLetters.has(letter)}
            >
              {letter}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Term list ── */}
      <main id="gloss-main">
        <div id="gloss-inner">
          {filtered.length === 0 ? (
            <p id="gloss-empty">No terms match your search. Try a different keyword.</p>
          ) : (
            <dl id="gloss-list">
              {filtered.map((item) => (
                <div key={item.term} className="gloss-item" itemScope itemType="https://schema.org/DefinedTerm">
                  <dt className="gloss-term" itemProp="name">{item.term}</dt>
                  <dd className="gloss-definition" itemProp="description">{item.definition}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* ── CTA ── */}
          <div id="gloss-cta">
            <p id="gloss-cta-heading">Need software built for every term in this glossary?</p>
            <p id="gloss-cta-sub">
              TesseractApps is purpose-built for NDIS providers — rostering, compliance,
              participant management, claiming, and workforce management on one platform.
            </p>
            <div id="gloss-cta-actions">
              <Link to="/book-a-demo" className="gloss-btn-primary">Book a Demo</Link>
              <Link to="/ndis-industry" className="gloss-btn-outline">NDIS Provider Software</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NDISGlossary;
