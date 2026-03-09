import "./About.css";
// import aboutOurCompanyImage from "../../assets/about-our-company.webp";
// import aboutOurTeamImage from "../../assets/Team 1.webp";
import RevanthImage from "../../assets/REVANTH-CEO.webp";
import tomImage from "../../assets/3.webp";
import KranthiImage from "../../assets/KRANTHI KAKKERLA - CO FOUNDER.webp";
import BelleBaiImage from "../../assets/11.webp";
import darshanImage from "../../assets/5.webp";
import sushimithaImage from "../../assets/7.webp";
import maheshwariImage from "../../assets/8.webp";
import deepakrajImage from "../../assets/4.webp";
import meghnaImage from "../../assets/13.webp";
import saiKrishnaImage from "../../assets/2.webp";
import BecImage from "../../assets/16.webp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../../components/common/SEO";
import {
  Target,
  Telescope,
  Phone,
  Clock,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import useAppNavigate from "../../hooks/useAppNavigate";

const teamMembers = [
  { name: "Revanth", role: "Founder & CEO", image: RevanthImage },
  { name: "Kranthi", role: "Co-Founder", image: KranthiImage },
  { name: "Bec McFarland", role: "HR Manager", image: BecImage },
  { name: "Tomer Doron", role: "Solutions Consultant", image: tomImage },
  { name: "Belle Bai", role: "Marketing Executive", image: BelleBaiImage },
  { name: "Darshan Shelat", role: "Solutions Consultant", image: darshanImage },
  { name: "Sushmitha", role: "Team Manager", image: sushimithaImage },
  { name: "Maheshwari", role: "Operations Manager", image: maheshwariImage },
  { name: "Deepakraj", role: "Software Engineer", image: deepakrajImage },
  { name: "Meghna", role: "Accounts Manager", image: meghnaImage },
  { name: "Sai Krishna", role: "Test Engineer", image: saiKrishnaImage },
];

const About = () => {
  const location = useLocation();
  const appNavigate = useAppNavigate();

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
          <h1 id="about-hero-heading">Built for the people who care for people</h1>
          <p id="about-hero-sub">
            We're an Australian technology company on a mission to simplify workforce management, NDIS compliance, and care delivery — so providers can focus on what truly matters.
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
              <div id="about-mv-header">
            <div className="about-section-label">Our Story</div>
            <h2 id="about-mv-heading">From a conversation to a platform</h2>
          </div>
            <div id="about-story-text">
              <p>TesseractApps started in 2022 from a conversation that revealed common frustrations in care management and NDIS compliance.</p>
              <p>In 2023, we built our platform with input from real care providers. We tested features in real workflows, refined processes, and removed unnecessary complexity.</p>
              <p>By mid-2024, the T-NDIS beta was launched. Providers provided feedback that shaped the system for day-to-day operations.</p>
              <p>In January 2025, TesseractApps became fully operational and ready for the market.</p>
              <p>Today, TesseractApps offers a Salesforce-based platform that helps you save time, reduce errors, and stay compliant — managing staff, participants, and services in one place.</p>
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
              TesseractApps is led by a diverse team of technologists, product specialists, and industry experts committed to solving real-world challenges in workforce management and care services.
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
            {teamMembers.map((member) => (
              <div className="about-team-card" key={member.name}>
                <img
                  loading="lazy"
                  src={member.image}
                  alt={member.name}
                  className="about-team-card-image"
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
          <div className="about-section-label">Careers</div>
          <h2 id="about-careers-heading">Are you looking for an opportunity?</h2>
          <p id="about-careers-sub">
            TesseractApps is growing quickly and we're looking for passionate, driven individuals who want to make a real impact through innovation and user-centred technology.
          </p>

          <div className="about-job-card">
            <div className="about-job-header">
              <div>
                <div className="about-job-title">ICT Sales and Solution Specialist</div>
                <div className="about-job-meta">
                  <span className="about-job-tag">
                    <DollarSign size={13} strokeWidth={2.5} /> Up to $180K OTE
                  </span>
                  <span className="about-job-tag">
                    <Home size={13} strokeWidth={2.5} /> Hybrid
                  </span>
                  <span className="about-job-tag">
                    <TrendingUp size={13} strokeWidth={2.5} /> Full Sales Cycle
                  </span>
                </div>
              </div>
              <a
                className="about-apply-btn"
                href="mailto:bec.mcfarland@tesseractapps.com?subject=Application%20%E2%80%93%20ICT%20Sales%20and%20Solution%20Specialist"
              >
                Apply Now
              </a>
            </div>

            <p className="about-job-summary">
              Are you a natural hunter who thrives on building relationships, uncovering opportunities, and closing deals? At TesseractApps, we're looking for a driven ICT Solution Specialist to help expand our footprint across the healthcare and NDIS services sector.
            </p>

            <div className="about-job-sections">
              <div className="about-job-section">
                <div className="about-section-heading">About the Role</div>
                <p className="about-section-text">
                  You will manage the entire sales lifecycle — lead generation, discovery, product demonstrations, closing deals, and supporting successful client implementations. This is not a purely transactional role; it combines consultative sales, solution design, onboarding support, and relationship management.
                </p>
              </div>

              <div className="about-job-section">
                <div className="about-section-heading">What You'll Be Doing</div>
                <div className="about-job-two-col">
                  <div>
                    <div className="about-subsection-label">Sales &amp; Business Development</div>
                    <ul className="about-job-list">
                      <li>Identify and engage prospective clients through outbound and inbound outreach</li>
                      <li>Build and manage your own sales pipeline</li>
                      <li>Deliver tailored product demonstrations aligned to client needs</li>
                      <li>Manage opportunities through the full sales lifecycle from lead to close</li>
                      <li>Represent TesseractApps at industry events and forums</li>
                    </ul>
                  </div>
                  <div>
                    <div className="about-subsection-label">Client Onboarding &amp; Relationships</div>
                    <ul className="about-job-list">
                      <li>Support onboarding including data migration and system integrations</li>
                      <li>Design workflows and automation aligned to client requirements</li>
                      <li>Build strong, long-term client partnerships</li>
                      <li>Act as a trusted advisor helping clients improve operational outcomes</li>
                      <li>Identify opportunities for account growth</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="about-job-section">
                <div className="about-section-heading">What We're Looking For</div>
                <ul className="about-job-list">
                  <li>SaaS sales, business development, or solution consulting experience</li>
                  <li>Strong communication and relationship-building skills</li>
                  <li>Confidence explaining technology in simple, practical terms</li>
                  <li>A proactive, self-motivated approach with a problem-solving mindset</li>
                  <li>Experience in the healthcare or NDIS sector is highly desirable but not essential</li>
                </ul>
              </div>

              <div className="about-job-section">
                <div className="about-section-heading">Why Join Us?</div>
                <ul className="about-job-list about-job-list--grid">
                  <li>OTE up to $180K (base + commission)</li>
                  <li>Hybrid working environment</li>
                  <li>Innovative SaaS platform in fast-growing sector</li>
                  <li>Collaborative team culture focused on growth</li>
                  <li>Career pathways into Senior or Sales Leadership roles</li>
                </ul>
              </div>
            </div>

            <div className="about-job-footer">
              Enquiries:{" "}
              <a href="mailto:bec.mcfarland@tesseractapps.com" className="about-contact-link">
                bec.mcfarland@tesseractapps.com
              </a>
              {" "}— Bec McFarland, HR Manager
            </div>
          </div>

          <p id="about-careers-bottom-text">
            Don't see the right role? Send your resume to{" "}
            <a href="mailto:bec.mcfarland@tesseractapps.com" className="about-contact-link">
              bec.mcfarland@tesseractapps.com
            </a>{" "}
            and we'll reach out if the perfect opportunity comes up.
          </p>
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
                  <span>TesseractApps, Phillip ACT 2606</span>
                </div>
                <div className="about-contact-row">
                  <Phone size={14} className="about-contact-row-icon" />
                  <span>1300 252 808 &nbsp;/&nbsp; 02 6133 2800</span>
                </div>
              </div>
              <button type="button" className="about-contact-cta" onClick={() => appNavigate("/signup")}>
                Start Free Trial
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
                For collaborations, media enquiries, or partnership opportunities.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
