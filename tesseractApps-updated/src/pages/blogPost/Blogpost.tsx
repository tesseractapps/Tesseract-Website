import "./BlogPostStyles.css";
import blogImage from "../../assets/blog1.webp";
import { useMetaTags } from "../../utils/useMetaTags";

const Blogpost = () => {
  useMetaTags({
    title: "NDIS Workforce Insights | Industry Blog | TesseractApps",
    description:
      "Discover insights on NDIS workforce management, compliance best practices, and digital transformation strategies for Australian care providers.",
  });

  return (
    <div className="blog-container">
      <img
        src={blogImage}
        alt="Protecting Participant Data Image"
        className="blog-image"
      />
      <article className="blog-post">
        <header className="blog-header">
          <h1 className="blog-title">
            Protecting Participant Data: Why Security Matters for NDIS and Care
            Providers
          </h1>
        </header>

        <div className="blog-content">
          <p className="intro-paragraph">
            Every day, disability support and aged care providers collect
            sensitive information — including health records, personal details,
            and care plans — that participants trust us to protect. Strong data
            security isn't a luxury, it's essential for compliance, service
            continuity, and, most importantly, client trust.
          </p>

          <p>
            Cyberattacks targeting the healthcare and disability sectors are
            rising. In July 2024, for example, a ransomware attack on
            prescription service <strong>MediSecure</strong> exposed the health
            and personal data of approximately{" "}
            <strong>12.9 million Australians</strong>. Alarming figures show
            that{" "}
            <strong>
              41% of Australian healthcare organisations experienced a
              cyberattack in 2023
            </strong>
            . These breaches can compromise privacy, disrupt care delivery, and
            result in serious regulatory and reputational consequences.
          </p>

          <section className="section">
            <h2 className="section-title">Real Breaches Highlight the Risks</h2>
            <p>Recent incidents serve as stark reminders of what's at stake:</p>

            <div className="breach-list">
              <div className="breach-item">
                <h3 className="breach-title">MediSecure (2024)</h3>
                <p>
                  A cyberattack exposed prescription and health data of millions
                  of Australians.
                </p>
              </div>

              <div className="breach-item">
                <h3 className="breach-title">CTARS (2022)</h3>
                <p>
                  An NDIS case management software platform was breached, with a
                  "large volume" of sensitive participant and caregiver data
                  compromised.
                </p>
              </div>

              <div className="breach-item">
                <h3 className="breach-title">Eastern Health (2021)</h3>
                <p>
                  Four Melbourne hospitals were forced to postpone surgeries due
                  to a suspected ransomware incident.
                </p>
              </div>

              <div className="breach-item">
                <h3 className="breach-title">Engedi (2024)</h3>
                <p>
                  A Queensland-based NDIS provider suffered a ransomware attack
                  that resulted in staff data being leaked on the dark web.
                </p>
              </div>
            </div>

            <p>
              These examples illustrate that even responsible care organisations
              can be targeted — and that the fallout can be both operational and
              deeply personal for clients.
            </p>
          </section>

          <section className="section highlight-section">
            <h2 className="section-title">
              How TesseractApps Protects Your Data
            </h2>
            <p>
              At <strong>TesseractApps</strong>, we understand the critical
              importance of safeguarding participant data. Built on the{" "}
              <strong>Salesforce platform</strong>, our software inherits{" "}
              <strong>
                enterprise grade, globally recognised security measures
              </strong>
              , tailored for the needs of NDIS, aged care, and community health
              providers.
            </p>
            <p>Here's how we ensure your data is protected at every step:</p>

            <div className="security-features">
              <div className="security-feature">
                <h3 className="feature-title">End-to-End Encryption</h3>
                <p>All data is encrypted:</p>
                <ul>
                  <li>
                    <strong>In transit</strong> via HTTPS using SSL/TLS
                    protocols.
                  </li>
                  <li>
                    <strong>At rest</strong> with strong AES-256 encryption,
                    making stored information unreadable even in the event of
                    unauthorised access.
                  </li>
                </ul>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">Audit Trails and Monitoring</h3>
                <p>
                  Using <strong>Salesforce Shield</strong>, TesseractApps
                  maintains detailed logs of user actions:
                </p>
                <ul>
                  <li>
                    Every login, change, or access to participant records is
                    traceable.
                  </li>
                  <li>
                    You gain full visibility into who accessed what, and when.
                  </li>
                </ul>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">Granular Access Control</h3>
                <p>
                  We implement strict,{" "}
                  <strong>role-based access permissions</strong>:
                </p>
                <ul>
                  <li>
                    Staff only access the information necessary for their
                    responsibilities.
                  </li>
                  <li>
                    <strong>Multi-factor authentication (MFA)</strong> adds
                    another layer of defence.
                  </li>
                </ul>
              </div>

              <div className="security-feature">
                <h3 className="feature-title">
                  Australian Data Residency & ISO 27001 Certification
                </h3>
                <p>
                  Your data remains securely hosted on{" "}
                  <strong>
                    Salesforce Hyperforce data centres in Australia.
                  </strong>
                  :
                </p>
                <ul>
                  <li>
                    Governed by <strong>local privacy laws.</strong>
                  </li>
                  <li>
                    Built on <strong>ISO 27001-certified</strong> infrastructure
                    that complies with international information security
                    standards.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Why It Matters</h2>
            <p>
              Data breaches are no longer hypothetical — they are a lived
              reality for care providers across Australia. For NDIS and aged
              care organisations, protecting participant data is not only a
              compliance issue under the NDIS Practice Standards, but a moral
              obligation. At TesseractApps, we combine the convenience of the
              cloud with the rigour of enterprise-level security to give
              providers peace of mind and help them focus on what matters most,
              delivering quality care.
            </p>
          </section>

          <section className="sources-section">
            <h2 className="section-title">Sources</h2>
            <ol className="sources-list">
              <li>
                Australian Government Department of Home Affairs.{" "}
                <em>MediSecure Cyber Security Incident</em>
                <br />
                <a
                  href="https://www.homeaffairs.gov.au/about-us/our-portfolios/cyber-security/cyber-coordinator/medisecure-cyber-security-incident"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.homeaffairs.gov.au/about-us/our-portfolios/cyber-security/cyber-coordinator/medisecure-cyber-security-incident
                </a>
              </li>
              <li>
                Eftsure.{" "}
                <em>
                  Healthcare Cybersecurity, Data Breach & Cybercrime Statistics
                  in Australia
                </em>
                <br />
                <a
                  href="https://eftsure.com/en-au/statistics/healthcare-cybersecurity-data-breach-cybercrime-statistics-in-australia/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://eftsure.com/en-au/statistics/healthcare-cybersecurity-data-breach-cybercrime-statistics-in-australia/
                </a>
              </li>
              <li>
                iTnews. <em>NDIS case management system provider breached</em>
                <br />
                <a
                  href="https://www.itnews.com.au/news/ndis-case-management-system-provider-breached-580729"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.itnews.com.au/news/ndis-case-management-system-provider-breached-580729
                </a>
              </li>
              <li>
                UpGuard.{" "}
                <em>13 Biggest Data Breaches in Australia [Updated 2025]</em>
                <br />
                <a
                  href="https://www.upguard.com/blog/biggest-data-breaches-australia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.upguard.com/blog/biggest-data-breaches-australia
                </a>
              </li>
              <li>
                Cyber Daily.{" "}
                <em>
                  Exclusive: Rhysida ransomware gang claims hack on disability
                  support organisation Engedi
                </em>
                <br />
                <a
                  href="https://www.cyberdaily.au/security/11010-exclusive-rhysida-ransomware-gang-claims-hack-on-disability-support-org-engedi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cyberdaily.au/security/11010-exclusive-rhysida-ransomware-gang-claims-hack-on-disability-support-org-engedi
                </a>
              </li>
              <li>
                NewSoftwares.net.{" "}
                <em>
                  Is Salesforce Data Encrypted At Rest? A Comprehensive Look
                </em>
                <br />
                <a
                  href="https://www.newsoftwares.net/blog/is-salesforce-data-encrypted-at-rest/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.newsoftwares.net/blog/is-salesforce-data-encrypted-at-rest/
                </a>
              </li>
              <li>
                Salesforce.{" "}
                <em>
                  Improve Patient Care or Keep Data Secure in Healthcare? Yes.
                </em>
                <br />
                <a
                  href="https://www.salesforce.com/blog/data-security-in-healthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.salesforce.com/blog/data-security-in-healthcare/
                </a>
              </li>
              <li>
                Salesforce Compliance. <em>ISO 27001</em>
                <br />
                <a
                  href="https://compliance.salesforce.com/en/iso-27001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://compliance.salesforce.com/en/iso-27001
                </a>
              </li>
            </ol>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Blogpost;
