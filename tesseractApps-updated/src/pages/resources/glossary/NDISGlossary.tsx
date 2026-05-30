import "./NDISGlossaryStyles.css";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { buildFAQSchema } from "../../../utils/schemaHelpers";
import GLOSSARY_TERMS from "../../../data/ndisGlossaryTerms.json";

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
        title="NDIS Glossary – Key Terms Explained | TesseractApps"
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

          {/* ── Platform links ── */}
          <div id="gloss-related">
            <p id="gloss-related-label">Explore the Platform</p>
            <div id="gloss-related-cols">

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Workforce</p>
                <ul className="gloss-link-list">
                  <li><Link to="/capabilities/rostering-scheduling">Rostering &amp; Scheduling</Link></li>
                  <li><Link to="/capabilities/timesheets-payroll-alignment">Timesheets &amp; Payroll Alignment</Link></li>
                  <li><Link to="/capabilities/workforce-management">Workforce Management</Link></li>
                  <li><Link to="/capabilities/clock-in-out">Clock In / Out</Link></li>
                  <li><Link to="/capabilities/staff-self-service-portal">Staff Self-Service Portal</Link></li>
                </ul>
              </div>

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Participant &amp; Care</p>
                <ul className="gloss-link-list">
                  <li><Link to="/capabilities/participant-management">Participant Management</Link></li>
                  <li><Link to="/capabilities/incidents-management-reporting">Incident Management &amp; Reporting</Link></li>
                  <li><Link to="/capabilities/compliance-audit-readiness">Compliance &amp; Audit Readiness</Link></li>
                  <li><Link to="/capabilities/voice-notes">Voice Notes</Link></li>
                  <li><Link to="/capabilities/chat">Secure Messaging (ChaT)</Link></li>
                  <li><Link to="/capabilities/t-sign-digital-signatures">Digital Signatures (T-Sign)</Link></li>
                </ul>
              </div>

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Finance</p>
                <ul className="gloss-link-list">
                  <li><Link to="/capabilities/ndis-claiming-invoicing">NDIS Claiming &amp; Invoicing</Link></li>
                  <li><Link to="/capabilities/accounting-financial-reporting">Accounting &amp; Financial Reporting</Link></li>
                  <li><Link to="/capabilities/xero-integration">Xero Integration</Link></li>
                  <li><Link to="/capabilities/quote-generator">Quote Generator</Link></li>
                </ul>
              </div>

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Solutions by Care Type</p>
                <ul className="gloss-link-list">
                  <li><Link to="/solutions/ndis">Disability Support (NDIS)</Link></li>
                  <li><Link to="/solutions/support-coordination">Support Coordination</Link></li>
                  <li><Link to="/solutions/sil">Supported Independent Living (SIL)</Link></li>
                  <li><Link to="/solutions/allied-health-services">Allied Health Services</Link></li>
                </ul>
              </div>

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Solutions by Role</p>
                <ul className="gloss-link-list">
                  <li><Link to="/solutions/operations-manager">Operations Manager</Link></li>
                  <li><Link to="/solutions/compliance-lead">Compliance Lead</Link></li>
                  <li><Link to="/solutions/finance-manager">Finance Manager</Link></li>
                  <li><Link to="/solutions/support-worker">Support Worker</Link></li>
                </ul>
              </div>

              <div className="gloss-link-group">
                <p className="gloss-link-group-heading">Resources &amp; Pricing</p>
                <ul className="gloss-link-list">
                  <li><Link to="/pricing">NDIS Software Pricing</Link></li>
                  <li><Link to="/sc-pricing">Support Coordination Pricing</Link></li>
                  <li><Link to="/blogs">Blog</Link></li>
                  <li><Link to="/whitepapers">Whitepapers</Link></li>
                  <li><Link to="/brochures">Brochures</Link></li>
                  <li><Link to="/help-centre">Help Centre</Link></li>
                </ul>
              </div>

            </div>
          </div>

          {/* ── CTA ── */}
          <div id="gloss-cta">
            <p id="gloss-cta-heading">Need software built for every term in this glossary?</p>
            <p id="gloss-cta-sub">
              TesseractApps is purpose-built for NDIS providers — rostering, compliance,
              participant management, claiming, and workforce management on one platform.
            </p>
            <div id="gloss-cta-actions">
              <Link to="/book-a-demo" className="gloss-btn-primary">Book a Demo</Link>
              <Link to="/solutions/ndis" className="gloss-btn-outline">NDIS Provider Software</Link>
            </div>
          </div>
        </div>
      </main>

      <section className="gloss-references">
        <h3>Official References</h3>
        <ul>
          <li>
            <a href="https://www.ndis.gov.au" target="_blank" rel="noopener noreferrer">
              National Disability Insurance Agency (NDIA) — ndis.gov.au
            </a>
          </li>
          <li>
            <a href="https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000100-summary" target="_blank" rel="noopener noreferrer">
              SCHADS Award Summary — Fair Work Commission
            </a>
          </li>
          <li>
            <a href="https://www.ndiscommission.gov.au" target="_blank" rel="noopener noreferrer">
              NDIS Quality and Safeguards Commission
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NDISGlossary;
