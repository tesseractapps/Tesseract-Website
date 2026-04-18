import "./AboutStyles.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../../../components/common/SEO";
import { useSanityTeamMembers } from "../../../hooks/useSanityTeamMembers";
import SanityImage from "../../../components/sanity/sanity-image";
import {
  Target,
  Telescope,
  Phone,
  Clock,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import useAppNavigate from "../../../hooks/useAppNavigate";
import facebook from "../../../assets/facebook.webp";
import instagram from "../../../assets/instagram.webp";
import linkedin from "../../../assets/linkedin.webp";
import youtube from "../../../assets/youtube.webp";

// const ICON_MAP: Record<string, React.ReactNode> = {
//   dollar: <DollarSign size={13} strokeWidth={2.5} />,
//   home: <Home size={13} strokeWidth={2.5} />,
//   trending: <TrendingUp size={13} strokeWidth={2.5} />,
//   users: <Users size={13} strokeWidth={2.5} />,
//   zap: <Zap size={13} strokeWidth={2.5} />,
//   heart: <Heart size={13} strokeWidth={2.5} />,
//   map: <MapPin size={13} strokeWidth={2.5} />,
// };

const About = () => {
  const location = useLocation();
  const appNavigate = useAppNavigate();
  const { data: teamMembers, loading: teamLoading } = useSanityTeamMembers();
  // const { data: jobs, loading: jobsLoading } = useSanityJobListings();

  useEffect(() => {
    const targetId = location.state?.targetId;
    if (!targetId) return;
    let tries = 0;
    const interval = setInterval(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const absoluteY = rect.top + window.scrollY;
        const offset = window.innerHeight / 2 - rect.height / 2;
        window.scrollTo({ top: absoluteY - offset, behavior: "smooth" });
      }
      tries++;
      if (document.getElementById(targetId) || tries > 5) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [location.state]);

  return (
    <div id="about-container">
      <SEO
        title="About TesseractApps | Our Story, Mission & Team | Australian NDIS Software"
        description="Learn about TesseractApps - founded in 2022 to simplify NDIS compliance and care management. Meet our team of technologists and industry experts building the future of workforce technology in Australia."
      />

      {/* ── Hero ── */}
      <section id="about-hero">
        <div id="about-hero-inner">
          <div id="about-hero-label">About TesseractApps</div>
          <h1 id="about-hero-heading">We can't do what you do, but we can help you with software</h1>
          <p id="about-hero-sub">
            The Difference We Bring. TesseractApps started with a simple insight: care providers weren't struggling with care, they were struggling with systems. We built technology to remove that burden.
          </p>
        </div>
      </section>

      <div id="about-outer">

        {/* ── Our Story ── */}
        <section id="about-story">
          {/* <img
            loading="lazy"
            src={aboutOurCompanyImage}
            alt="TesseractApps office"
            id="about-story-image"
          /> */}
          <div id="about-story-text-block">
            <div id="about-story-header">
              <div className="about-section-label">Our Story</div>
              <h2 id="about-story-heading">Our Journey</h2>
            </div>
            <div id="about-story-text">
              <div id="about-story-timeline">
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2023 – Founded</div>
                  <p className="about-timeline-desc">We started by listening to the people who deliver care every day.</p>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2024 – Platform Development</div>
                  <p className="about-timeline-desc">Built our platform with real providers in real workflows. Every feature tested, refined, and simplified.</p>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">2025 – T NDIS Beta Launch</div>
                  <p className="about-timeline-desc">Provider feedback shaped the platform into a practical, daily operational system.</p>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-year">Market-Ready</div>
                  <p className="about-timeline-desc">TesseractApps became fully operational and ready to serve providers.</p>
                </div>
              </div>
              <p id="about-story-commitment">
                We are committed to creating practical, meaningful solutions that support the people delivering care every day. Clarity, collaboration, and real-world impact guide every feature we design.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section id="about-mv-section">
          <div id="about-mv-header">
            <div className="about-section-label">What drives us</div>
            <h2 id="about-mv-heading">Our Mission & Vision</h2>
          </div>
          <div id="about-mv-grid">
            <div className="about-mv-card" id="about-mv-mission">
              <div className="about-mv-icon">
                <Target size={22} strokeWidth={2} />
              </div>
              <h3 className="about-mv-card-heading">Our Mission</h3>
              <p className="about-mv-card-text">
                To empower businesses worldwide with innovative, role-specific people management software that is accessible across industries, enabling streamlined operations and enhanced productivity.
              </p>
            </div>
            <div className="about-mv-card" id="about-mv-vision">
              <div className="about-mv-icon">
                <Telescope size={22} strokeWidth={2} />
              </div>
              <h3 className="about-mv-card-heading">Our Vision</h3>
              <p className="about-mv-card-text">
                To revolutionise the future of business management, fostering collaboration, efficiency, and growth through technology that adapts to the ever-changing needs of industries and their people.
              </p>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section id="about-team-section">
          <div id="about-team-header">
            <div className="about-section-label">The team</div>
            <h2 id="about-team-heading">The people behind the platform</h2>
            <p id="about-team-sub">
              We're an energetic and passionate team with diverse backgrounds and deep expertise, united by a shared commitment to making care simpler.
            </p>
          </div>
          {/* <img
            loading="lazy"
            src={aboutOurTeamImage}
            alt="TesseractApps team"
            id="about-team-banner"
          /> */}
          {/* <div id="about-team-grid-label">Management</div> */}
          <div id="about-team-grid">
            {teamLoading
              ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="about-team-card about-team-card--skeleton">
                    <div className="about-team-card-image about-skeleton-image" />
                    <div className="about-team-card-body">
                      <div className="about-skeleton-line about-skeleton-line--name" />
                      <div className="about-skeleton-line about-skeleton-line--role" />
                    </div>
                  </div>
                ))
              : teamMembers.map((member) => (
                  <div className="about-team-card" key={member._id}>
                    <SanityImage
                      src={member.photo}
                      alt={member.photo?.alt ?? member.name}
                      className="about-team-card-image"
                      width={300}
                      height={400}
                      loading="lazy"
                    />
                    <div className="about-team-card-body">
                      <div className="about-team-card-name">{member.name}</div>
                      <div className="about-team-card-role">{member.role}</div>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* ── Careers ── */}
        {/* <section id="about-careers-section">
          <div className="about-section-label">Join Us</div>
          <h2 id="about-careers-heading">Careers</h2>
          <p id="about-careers-sub">
            TesseractApps is building the future of care and workforce technology. Our culture is grounded in clear thinking, operational excellence, continuous improvement, and a strong focus on user needs.
          </p>

          <div id="about-careers-jobs-list">
            {jobsLoading && (
              <div className="about-job-card about-job-card--skeleton" />
            )}
            {!jobsLoading && jobs.length === 0 && (
              <p id="about-careers-bottom-text">
                No open roles at the moment, but we'd love to hear from you.{" "}
                <a
                  href="mailto:careers@tesseractapps.com?subject=Career%20Opportunity%20Enquiry"
                  className="about-contact-link"
                >
                  Send your resume
                </a>
              </p>
            )}
            {!jobsLoading && jobs.map((job) => (
              <div className="about-job-card" key={job._id}>
                <div className="about-job-header">
                  <div>
                    <div className="about-job-title">{job.title}</div>
                    {job.tags && job.tags.length > 0 && (
                      <div className="about-job-meta">
                        {job.tags.map((tag, i) => (
                          <span key={i} className="about-job-tag">
                            {ICON_MAP[tag.icon ?? ""]} {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    className="about-apply-btn"
                    href={`mailto:${job.contactEmail}?subject=Application%3A%20${encodeURIComponent(job.title ?? "")}`}
                  >
                    Apply Now
                  </a>
                </div>

                <p className="about-job-summary">{job.summary}</p>

                {job.sections && job.sections.length > 0 && (
                  <div className="about-job-sections">
                    {job.sections.map((section, si) => (
                      <div className="about-job-section" key={si}>
                        <div className="about-section-heading">{section.heading}</div>
                        {section.layout === "prose" && section.body && (
                          <p className="about-section-text">{section.body}</p>
                        )}
                        {section.layout === "list" && section.items && (
                          <ul className="about-job-list">
                            {section.items.map((item, ii) => <li key={ii}>{item}</li>)}
                          </ul>
                        )}
                        {section.layout === "two-col" && (
                          <div className="about-job-two-col">
                            <div>
                              {section.col1Heading && (
                                <div className="about-subsection-label">{section.col1Heading}</div>
                              )}
                              <ul className="about-job-list">
                                {(section.col1Items ?? []).map((item, ii) => <li key={ii}>{item}</li>)}
                              </ul>
                            </div>
                            <div>
                              {section.col2Heading && (
                                <div className="about-subsection-label">{section.col2Heading}</div>
                              )}
                              <ul className="about-job-list">
                                {(section.col2Items ?? []).map((item, ii) => <li key={ii}>{item}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}
                        {section.layout === "inline-list" && section.items && (
                          <ul className="about-job-list about-job-list--grid">
                            {section.items.map((item, ii) => <li key={ii}>{item}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="about-job-footer">
                  <span>Enquiries: </span>
                  <a href={`mailto:${job.contactEmail}`} className="about-contact-link">
                    {job.contactEmail}
                  </a>
                  <span>, {job.contactName}</span>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── Contact ── */}
        <section id="about-contact-section">
          <div className="about-section-label">Get in touch</div>
          <h2 id="about-contact-heading">Contact Us</h2>
          <p id="about-contact-sub">
            Whether you want to learn more about our platform or need support, our team is here to help.
          </p>

          <div id="about-contact-grid">
            {/* Sales */}
            <div className="about-contact-card">
              <div className="about-contact-card-icon">
                <Phone size={20} strokeWidth={2} />
              </div>
              <div className="about-contact-card-title">Contact Sales</div>
              <div className="about-contact-card-rows">
                <div className="about-contact-row">
                  <Phone size={14} className="about-contact-row-icon" />
                  <span>+61 2 6133 2818</span>
                </div>
                <div className="about-contact-row">
                  <Clock size={14} className="about-contact-row-icon" />
                  <span>Mon – Fri, 9:00 AM – 5:30 PM</span>
                </div>
                <div className="about-contact-row">
                  <Mail size={14} className="about-contact-row-icon" />
                  <a href="mailto:sales@tesseractapps.com" className="about-contact-link">
                    sales@tesseractapps.com
                  </a>
                </div>
              </div>
              <button type="button" className="about-contact-cta" onClick={() => appNavigate("/book-a-demo")}>
                Book a Demo
              </button>
            </div>

            {/* Head Office */}
            <div className="about-contact-card">
              <div className="about-contact-card-icon">
                <MapPin size={20} strokeWidth={2} />
              </div>
              <div className="about-contact-card-title">Head Office</div>
              <div className="about-contact-card-rows">
                <div className="about-contact-row">
                  <MapPin size={14} className="about-contact-row-icon" />
                  <a
                    href="https://www.google.com/maps/place/TesseractApps/@-35.3523175,149.0868962,572m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b165308ac032d25:0xe18d2268ea055f5c!8m2!3d-35.3523175!4d149.0894711!16s%2Fg%2F11wj5bv41c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-contact-link"
                  >
                    Level 1/45 Colbee Ct, Phillip ACT 2606, Australia
                  </a>
                </div>
                <div className="about-contact-row">
                  <Phone size={14} className="about-contact-row-icon" />
                  <span>1300 252 808 &nbsp;/&nbsp; 02 6133 2800</span>
                </div>
              </div>
              <button type="button" className="about-contact-cta" onClick={() => appNavigate("/signup")}>
                Begin Your Journey
              </button>
            </div>

            {/* Marketing */}
            <div className="about-contact-card">
              <div className="about-contact-card-icon">
                <Send size={20} strokeWidth={2} />
              </div>
              <div className="about-contact-card-title">Marketing & Partnerships</div>
              <div className="about-contact-card-rows">
                <div className="about-contact-row">
                  <Mail size={14} className="about-contact-row-icon" />
                  <a href="mailto:marketing@tesseractapps.com" className="about-contact-link">
                    marketing@tesseractapps.com
                  </a>
                </div>
              </div>
              <p className="about-contact-card-note">
                For collaborations, media enquiries, or partnership opportunities, our marketing team is here to help.
              </p>
            </div>
          </div>

          <div id="about-contact-not-ready">
            <h3 id="about-not-ready-heading">Not Ready to Talk Yet?</h3>
            <p id="about-not-ready-sub">
              See how governance‑first technology can simplify your operations, strengthen compliance, and give your team more time to focus on delivering quality care.
            </p>
            <button type="button" className="about-contact-cta" onClick={() => appNavigate("/signup")}>
              Begin Your Journey
            </button>
          </div>

          <div id="about-contact-social">
            <p>Follow us on social media for updates, insights, and news.</p>
            <div id="about-social-icons">
              {[
                { src: facebook,  alt: "Facebook",  key: "facebook"  },
                { src: instagram, alt: "Instagram",  key: "instagram" },
                { src: linkedin,  alt: "LinkedIn",   key: "linkedin"  },
                { src: youtube,   alt: "YouTube",    key: "youtube"   },
              ].map(({ src, alt, key }) => (
                <button
                  key={key}
                  type="button"
                  className="about-social-icon-btn"
                  aria-label={`Visit TesseractApps on ${alt}`}
                  onClick={() => appNavigate(key)}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="about-social-icon"
                    width="22"
                    height="22"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
