import "./CareersStyles.css";
import SEO from "../../../components/common/SEO";
import { Zap, Users, TrendingUp, Home, DollarSign, Heart, MapPin } from "lucide-react";
import React from "react";
import { useSanityJobListings } from "../../../hooks/useSanityJobListings";

const ICON_MAP: Record<string, React.ReactNode> = {
  dollar: <DollarSign size={13} strokeWidth={2.5} />,
  home: <Home size={13} strokeWidth={2.5} />,
  trending: <TrendingUp size={13} strokeWidth={2.5} />,
  users: <Users size={13} strokeWidth={2.5} />,
  zap: <Zap size={13} strokeWidth={2.5} />,
  heart: <Heart size={13} strokeWidth={2.5} />,
  map: <MapPin size={13} strokeWidth={2.5} />,
};

const Careers = () => {
  const { data: jobs, loading: jobsLoading } = useSanityJobListings();
  return (
    <div id="careers-page">
      <SEO
        title="Careers at TesseractApps | Join Our Team | Australian Tech Jobs"
        description="Join TesseractApps and help shape the future of care and workforce technology. We're looking for passionate individuals who want to make a real impact through innovation."
      />

      {/* ── Hero ── */}
      <section id="careers-hero">
        <div id="careers-hero-inner">
          <div id="careers-hero-label">Careers</div>
          <h1 id="careers-hero-heading">Join us in shaping the future of care technology</h1>
          <p id="careers-hero-sub">
            We're building a team of people who are passionate about creating practical solutions that make a real difference for providers and participants.
          </p>
        </div>
      </section>

      <div id="careers-outer">

        {/* ── Values ── */}
        <section id="careers-values-section">
          <div id="careers-values-header">
            <div className="careers-section-label">Why TesseractApps</div>
            <h2 id="careers-values-heading">A place where great work is rewarded</h2>
          </div>
          <div id="careers-values-grid">
            <div className="careers-value-card">
              <div className="careers-value-icon"><Zap size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Own Your Impact</div>
              <p className="careers-value-text">Work directly influences the product and the clients we serve. No red tape, just meaningful work with real outcomes.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><Users size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Collaborative Culture</div>
              <p className="careers-value-text">A supportive team that values curiosity, open communication, and building each other up to do the best work of our careers.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><TrendingUp size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Grow With Us</div>
              <p className="careers-value-text">We're a fast-growing SaaS company in a high-demand sector. Your career grows as we grow, with clear pathways to leadership.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><Home size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Flexible Working</div>
              <p className="careers-value-text">Hybrid working arrangements that respect your time and help you do your best work, whether at home or in the office.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><DollarSign size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Competitive Rewards</div>
              <p className="careers-value-text">Remuneration packages that reflect the value you bring, with performance-based incentives that reward results.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><Heart size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Purpose-Driven</div>
              <p className="careers-value-text">Our platform supports NDIS providers, aged care, and community services — work that truly makes a difference in people's lives.</p>
            </div>
          </div>
        </section>

        {/* ── Openings ── */}
        <section id="careers-openings-section">
          <div id="careers-openings-header">
            <div className="careers-section-label">Open roles</div>
            <h2 id="careers-openings-heading">Current Openings</h2>
            <p id="careers-openings-sub">
              We're looking for talented people who want to build something meaningful. See if there's a role that fits you.
            </p>
          </div>

          <div id="careers-jobs-list">
            {jobsLoading && (
              <div className="careers-job-card careers-job-card--skeleton" />
            )}
            {!jobsLoading && jobs.length === 0 && (
              <p className="careers-no-roles">No open roles at the moment. Check back soon.</p>
            )}
            {!jobsLoading && jobs.map((job) => (
              <div className="careers-job-card" key={job._id}>
                <div className="careers-job-header">
                  <div>
                    <div className="careers-job-title">{job.title}</div>
                    {job.tags && job.tags.length > 0 && (
                      <div className="careers-job-meta">
                        {job.tags.map((tag, i) => (
                          <span key={i} className="careers-job-tag">
                            {ICON_MAP[tag.icon]} {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    className="careers-apply-btn"
                    href={`mailto:${job.contactEmail}?subject=Application%3A%20${encodeURIComponent(job.title)}`}
                  >
                    Apply Now
                  </a>
                </div>

                <p className="careers-job-summary">{job.summary}</p>

                {job.sections && job.sections.length > 0 && (
                  <div className="careers-job-sections">
                    {job.sections.map((section, si) => (
                      <div className="careers-job-section" key={si}>
                        <div className="careers-section-heading">{section.heading}</div>
                        {section.layout === "prose" && section.body && (
                          <p className="careers-section-text">{section.body}</p>
                        )}
                        {section.layout === "list" && section.items && (
                          <ul className="careers-list">
                            {section.items.map((item, ii) => <li key={ii}>{item}</li>)}
                          </ul>
                        )}
                        {section.layout === "two-col" && (
                          <div className="careers-two-col">
                            <div>
                              {section.col1Heading && (
                                <div className="careers-subsection-label">{section.col1Heading}</div>
                              )}
                              <ul className="careers-list">
                                {(section.col1Items ?? []).map((item, ii) => <li key={ii}>{item}</li>)}
                              </ul>
                            </div>
                            <div>
                              {section.col2Heading && (
                                <div className="careers-subsection-label">{section.col2Heading}</div>
                              )}
                              <ul className="careers-list">
                                {(section.col2Items ?? []).map((item, ii) => <li key={ii}>{item}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}
                        {section.layout === "inline-list" && section.items && (
                          <ul className="careers-list careers-list--inline">
                            {section.items.map((item, ii) => <li key={ii}>{item}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="careers-job-footer">
                  <span>Enquiries: </span>
                  <a href={`mailto:${job.contactEmail}`} className="careers-contact-link">
                    {job.contactEmail}
                  </a>
                  <span className="careers-contact-name">, {job.contactName}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div id="careers-bottom-banner">
            <div>
              <p id="careers-bottom-text">Don't see the right role?</p>
              <p id="careers-bottom-sub">
                We'd love to hear from you. Send your resume and we'll reach out when the perfect opportunity comes up.
              </p>
            </div>
            <a
              id="careers-bottom-link"
              href="mailto:bec.mcfarland@tesseractapps.com?subject=Speculative%20Application%3A%20TesseractApps"
            >
              Send Your Resume
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Careers;
