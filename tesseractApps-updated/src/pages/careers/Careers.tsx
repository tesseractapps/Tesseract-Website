import "./CareersStyles.css";
import SEO from "../../components/common/SEO";
import { Zap, Users, TrendingUp, Home, DollarSign, Heart } from "lucide-react";

const Careers = () => {
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
              <p className="careers-value-text">Work directly influences the product and the clients we serve. No red tape — just meaningful work with real outcomes.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><Users size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Collaborative Culture</div>
              <p className="careers-value-text">A supportive team that values curiosity, open communication, and building each other up to do the best work of our careers.</p>
            </div>
            <div className="careers-value-card">
              <div className="careers-value-icon"><TrendingUp size={20} strokeWidth={2} /></div>
              <div className="careers-value-title">Grow With Us</div>
              <p className="careers-value-text">We're a fast-growing SaaS company in a high-demand sector. Your career grows as we grow — with clear pathways to leadership.</p>
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

            {/* ── Job: ICT Sales and Solution Specialist ── */}
            <div className="careers-job-card">
              <div className="careers-job-header">
                <div>
                  <div className="careers-job-title">ICT Sales and Solution Specialist</div>
                  <div className="careers-job-meta">
                    <span className="careers-job-tag"><DollarSign size={13} strokeWidth={2.5} /> Up to $180K OTE</span>
                    <span className="careers-job-tag"><Home size={13} strokeWidth={2.5} /> Hybrid</span>
                    <span className="careers-job-tag"><TrendingUp size={13} strokeWidth={2.5} /> Full Sales Cycle</span>
                  </div>
                </div>
                <a
                  className="careers-apply-btn"
                  href="mailto:bec.mcfarland@tesseractapps.com?subject=Application%20%E2%80%93%20ICT%20Sales%20and%20Solution%20Specialist"
                >
                  Apply Now
                </a>
              </div>

              <p className="careers-job-summary">
                Are you a natural hunter who thrives on building relationships, uncovering opportunities, and closing deals? At TesseractApps, we're looking for a driven ICT Solution Specialist to help expand our footprint across the healthcare and NDIS services sector.
              </p>

              <div className="careers-job-sections">
                <div className="careers-job-section">
                  <div className="careers-section-heading">About the Role</div>
                  <p className="careers-section-text">
                    You will manage the entire sales lifecycle — lead generation, discovery, product demonstrations, closing deals, and supporting successful client implementations. This is not a purely transactional role; it combines consultative sales, solution design, onboarding support, and relationship management.
                  </p>
                </div>

                <div className="careers-job-section">
                  <div className="careers-section-heading">What You'll Be Doing</div>
                  <div className="careers-two-col">
                    <div>
                      <div className="careers-subsection-label">Sales &amp; Business Development</div>
                      <ul className="careers-list">
                        <li>Identify and engage prospective clients through outbound and inbound outreach</li>
                        <li>Build and manage your own sales pipeline</li>
                        <li>Deliver tailored product demonstrations aligned to client needs</li>
                        <li>Manage opportunities through the full sales lifecycle from lead to close</li>
                        <li>Represent TesseractApps at industry events and forums</li>
                      </ul>
                    </div>
                    <div>
                      <div className="careers-subsection-label">Client Onboarding &amp; Relationships</div>
                      <ul className="careers-list">
                        <li>Support onboarding including data migration and system integrations</li>
                        <li>Design workflows and automation aligned to client requirements</li>
                        <li>Build strong, long-term client partnerships</li>
                        <li>Act as a trusted advisor helping clients improve operational outcomes</li>
                        <li>Identify opportunities for account growth</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="careers-job-section">
                  <div className="careers-section-heading">What We're Looking For</div>
                  <ul className="careers-list">
                    <li>SaaS sales, business development, or solution consulting experience</li>
                    <li>Strong communication and relationship-building skills</li>
                    <li>Confidence explaining technology in simple, practical terms</li>
                    <li>A proactive, self-motivated approach with a problem-solving mindset</li>
                    <li>Experience in the healthcare or NDIS sector is highly desirable but not essential</li>
                  </ul>
                </div>

                <div className="careers-job-section">
                  <div className="careers-section-heading">Why Join Us?</div>
                  <ul className="careers-list careers-list--inline">
                    <li>OTE up to $180K (base + commission)</li>
                    <li>Hybrid working environment</li>
                    <li>Innovative SaaS platform in fast-growing sector</li>
                    <li>Collaborative team culture focused on growth</li>
                    <li>Career pathways into Senior or Sales Leadership roles</li>
                  </ul>
                </div>
              </div>

              <div className="careers-job-footer">
                <span>Enquiries: </span>
                <a href="mailto:bec.mcfarland@tesseractapps.com" className="careers-contact-link">
                  bec.mcfarland@tesseractapps.com
                </a>
                <span className="careers-contact-name"> — Bec McFarland, HR Manager</span>
              </div>
            </div>

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
              href="mailto:bec.mcfarland@tesseractapps.com?subject=Speculative%20Application%20%E2%80%93%20TesseractApps"
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
