import "./PrivacyPolicyStyles.css";
import SEO from "../../../components/common/SEO";

const TOC_ITEMS = [
  { id: "pp-s1", label: "Australian Privacy Principles" },
  { id: "pp-s2", label: "Information We Collect" },
  { id: "pp-s3", label: "How We Use Your Information" },
  { id: "pp-s4", label: "Sharing Your Information" },
  { id: "pp-s5", label: "Overseas Disclosure" },
  { id: "pp-s6", label: "Data Security" },
  { id: "pp-s7", label: "Data Breach Notification" },
  { id: "pp-s8", label: "Your Rights" },
  { id: "pp-s9", label: "Automated Decision-Making" },
  { id: "pp-s10", label: "Data Retention" },
  { id: "pp-s11", label: "Cookies & Tracking" },
  { id: "pp-s12", label: "Third-Party Links" },
  { id: "pp-s13", label: "Geolocation" },
  { id: "pp-s14", label: "Complaints" },
  { id: "pp-s15", label: "Policy Changes" },
  { id: "pp-s16", label: "Contact Us" },
];

const PrivacyPolicy = () => {
  return (
    <div id="pp-page">
      <SEO
        title="Privacy Policy | Data Protection | TesseractApps Australia"
        description="TesseractApps privacy policy. Learn how we collect, use, and protect your personal information. Data hosted securely in Australia, compliant with Privacy Act 1988."
      />

      {/* ── Hero ── */}
      <section id="pp-hero">
        <div id="pp-hero-inner">
          <div id="pp-hero-label">Legal</div>
          <h1 id="pp-hero-heading">Privacy Policy</h1>
          <p id="pp-hero-meta">Effective Date: 21 January 2026</p>
        </div>
      </section>

      {/* ── Body ── */}
      <div id="pp-outer">

        {/* ── Sidebar TOC ── */}
        <nav id="pp-toc" aria-label="Table of contents">
          <div id="pp-toc-label">On this page</div>
          <ul id="pp-toc-list">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Content ── */}
        <article id="pp-content">

          <div className="pp-meta-block">
            <span className="pp-meta-item"><strong>Company:</strong> TesseractApps Pty Ltd</span>
            <span className="pp-meta-item"><strong>Website:</strong> tesseractapps.com.au</span>
            <span className="pp-meta-item"><strong>Services:</strong> NDIS Workforce Management Software</span>
          </div>

          <p className="pp-intro">
            At TesseractApps, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, disclose, and safeguard your
            data when you use our website and NDIS workforce management
            services. By accessing tesseractapps.com.au or utilising our
            services, you agree to the practices described in this policy.
          </p>

          {/* 1 */}
          <section className="pp-section" id="pp-s1">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">1</span>
              Australian Privacy Principles Compliance
            </h2>
            <p>
              TesseractApps is committed to complying with the Privacy Act 1988
              (Cth) and the 13 Australian Privacy Principles (APPs). We also
              acknowledge and comply with the requirements introduced by the
              Privacy and Other Legislation Amendment Act 2024.
            </p>
            <p>
              As an APP entity providing services to NDIS providers and
              participants, we take our privacy obligations seriously and have
              implemented comprehensive measures to protect all personal
              information entrusted to us.
            </p>
          </section>

          {/* 2 */}
          <section className="pp-section" id="pp-s2">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">2</span>
              Information We Collect
            </h2>
            <p>
              In accordance with APP 3, we only collect personal information
              that is reasonably necessary for our NDIS workforce management
              services, by lawful and fair means, directly from individuals
              where practicable.
            </p>

            <div className="pp-subsection-heading">Personal Information</div>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address</li>
              <li>Payment information</li>
              <li>Employment-related information for NDIS staff (qualifications, certifications, work history)</li>
              <li>Other identifiable information that you provide voluntarily</li>
            </ul>

            <div className="pp-subsection-heading">Sensitive Information</div>
            <p>
              We may collect sensitive information as defined under the Privacy
              Act 1988, including:
            </p>
            <ul>
              <li>Health information relevant to NDIS service delivery</li>
              <li>Disability status and support requirements</li>
              <li>Background check results for NDIS worker screening</li>
            </ul>
            <p>
              We will only collect sensitive information with your explicit
              consent, unless otherwise permitted by law. Sensitive information
              is subject to enhanced security measures and strict access
              controls.
            </p>

            <div className="pp-subsection-heading">Non-Personal Information</div>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited on our website</li>
              <li>Time and date of visits</li>
              <li>IP address</li>
              <li>Other technical data</li>
            </ul>
          </section>

          {/* 3 */}
          <section className="pp-section" id="pp-s3">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">3</span>
              How We Use Your Information
            </h2>
            <p>
              In accordance with APP 6, we only use or disclose personal
              information for the primary purpose for which it was collected, or
              for secondary purposes where you would reasonably expect such use.
            </p>
            <ul>
              <li>Providing and managing our NDIS workforce management services</li>
              <li>Processing transactions and payroll</li>
              <li>Rostering, scheduling, and shift management</li>
              <li>Improving our platform and services</li>
              <li>Communicating with you about updates, service changes, and support</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Analysing usage trends to enhance user experience</li>
              <li>Complying with NDIS Quality and Safeguards requirements</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* 4 */}
          <section className="pp-section" id="pp-s4">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">4</span>
              Sharing Your Information
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties, except in the following
              circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To trusted third parties who assist us in operating our website and services, as long as they agree to keep your information confidential and comply with Australian privacy laws</li>
              <li>To comply with legal requirements, such as responding to subpoenas, court orders, or other legal processes</li>
              <li>To protect our rights, property, or safety, and that of our users or others</li>
              <li>To the NDIS Quality and Safeguards Commission where required for compliance purposes</li>
            </ul>
          </section>

          {/* 5 */}
          <section className="pp-section" id="pp-s5">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">5</span>
              Overseas Disclosure
            </h2>
            <p>
              TesseractApps is built on Salesforce Hyperforce infrastructure,
              with data hosted in Australia. However, in limited circumstances,
              personal information may be processed by overseas service
              providers who support our platform operations.
            </p>
            <p>Our safeguards include:</p>
            <ul>
              <li>Contractual obligations requiring compliance with Australian privacy standards</li>
              <li>Data processing agreements with appropriate security and privacy clauses</li>
              <li>Assessment of the recipient's privacy practices and security measures</li>
              <li>Preference for providers in countries with comparable privacy protections</li>
            </ul>
            <p>
              Countries where data may be processed include the United States
              (for certain Salesforce services). We maintain transparency about
              international data flows and will inform you of any significant
              changes.
            </p>
          </section>

          {/* 6 */}
          <section className="pp-section" id="pp-s6">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">6</span>
              Data Security
            </h2>
            <p>
              In accordance with APP 11, we take reasonable steps to protect
              personal information from misuse, interference, loss, unauthorised
              access, modification, or disclosure. Our security measures
              include:
            </p>
            <ul>
              <li>End-to-end encryption using AES-256 for data at rest and SSL/TLS for data in transit</li>
              <li>Multi-factor authentication (MFA) for all user accounts</li>
              <li>Role-based access controls ensuring staff only access data necessary for their role</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Secure data destruction procedures when information is no longer required</li>
              <li>ISO 27001-certified infrastructure through our Salesforce platform</li>
              <li>Regular staff training on data protection and privacy requirements</li>
              <li>Incident response procedures for potential security events</li>
            </ul>
          </section>

          {/* 7 */}
          <section className="pp-section" id="pp-s7">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">7</span>
              Data Breach Notification
            </h2>
            <p>
              In accordance with the Notifiable Data Breaches (NDB) scheme
              under Part IIIC of the Privacy Act 1988, we have implemented a
              comprehensive data breach response framework.
            </p>
            <p>
              If we experience an eligible data breach that is likely to result
              in serious harm, we will:
            </p>
            <ul>
              <li>Take immediate steps to contain the breach and limit any damage</li>
              <li>Assess the breach to determine if it is likely to result in serious harm</li>
              <li>Notify the Office of the Australian Information Commissioner (OAIC) as soon as practicable</li>
              <li>Notify affected individuals with details about the breach and recommended steps they should take</li>
              <li>Review and improve our security measures to prevent future breaches</li>
            </ul>
          </section>

          {/* 8 */}
          <section className="pp-section" id="pp-s8">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">8</span>
              Your Rights
            </h2>
            <p>
              Under the Australian Privacy Principles, you have the following
              rights:
            </p>
            <ul>
              <li><strong>Access (APP 12):</strong> You have the right to request access to the personal information we hold about you</li>
              <li><strong>Correction (APP 13):</strong> You have the right to request correction of inaccurate, out-of-date, incomplete, irrelevant, or misleading personal information</li>
              <li>Request the deletion of your personal information where it is no longer needed for the purpose for which it was collected</li>
              <li>Object to the processing of your data in certain circumstances</li>
              <li>Withdraw consent at any time where processing is based on consent</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe your privacy has been breached</li>
            </ul>
            <p>
              We commit to responding to access and correction requests within
              30 days of receipt.
            </p>
          </section>

          {/* 9 */}
          <section className="pp-section" id="pp-s9">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">9</span>
              Automated Decision-Making
            </h2>
            <p>
              Our NDIS workforce management platform may use automated processes
              to assist with:
            </p>
            <ul>
              <li>Rostering and shift allocation based on staff availability, qualifications, and participant needs</li>
              <li>Scheduling optimisation to match staff skills with service requirements</li>
              <li>Compliance checking for certifications and training requirements</li>
            </ul>
            <p>
              These automated processes are designed to assist human
              decision-makers, not replace them. You have the right to request
              human review of any automated decision that significantly affects
              you.
            </p>
          </section>

          {/* 10 */}
          <section className="pp-section" id="pp-s10">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">10</span>
              Data Retention
            </h2>
            <p>
              In accordance with APP 11.2, we only retain personal information
              for as long as necessary to fulfil the purposes for which it was
              collected, or as required by law. Our retention practices include:
            </p>
            <ul>
              <li>Retaining employment and payroll records as required by taxation and workplace laws (typically 7 years)</li>
              <li>Retaining NDIS service records as required by NDIS Quality and Safeguards Commission requirements</li>
              <li>Securely destroying or de-identifying personal information when it is no longer needed</li>
              <li>Regular review of retained data to ensure ongoing necessity</li>
            </ul>
          </section>

          {/* 11 */}
          <section className="pp-section" id="pp-s11">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">11</span>
              Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your
              experience on our website. You can choose to disable cookies
              through your browser settings; however, this may affect your
              ability to use certain features of our site.
            </p>
          </section>

          {/* 12 */}
          <section className="pp-section" id="pp-s12">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">12</span>
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these sites. We encourage
              you to read the privacy policies of any linked websites you visit.
            </p>
          </section>

          {/* 13 */}
          <section className="pp-section" id="pp-s13">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">13</span>
              Geolocation Privacy
            </h2>

            <div className="pp-subsection-heading">I. Collection of Geolocation Data</div>
            <p>
              To sign in for shifts, geolocation services must be enabled on
              your device. You will only be able to sign in if you are within a
              400-metre radius of the assigned shift location. Once signed in,
              your location will be tracked at every 100-metre interval to
              monitor your presence at the location during the shift.
            </p>

            <div className="pp-subsection-heading">II. Purpose of Geolocation Data</div>
            <p>
              We collect your geolocation data to verify your proximity to the
              shift location, monitor your location while on shift to ensure
              compliance and safety, and provide accurate attendance and shift
              records.
            </p>

            <div className="pp-subsection-heading">III. Your Control Over Geolocation</div>
            <p>
              You may manage your geolocation settings through your device.
              Disabling location services will restrict certain features,
              including the ability to sign in for shifts. By using our services
              with geolocation enabled, you consent to the collection and use of
              your location data as outlined.
            </p>

            <div className="pp-subsection-heading">IV. Geolocation Data Security</div>
            <p>
              Your location data is encrypted and stored securely, accessible
              only to authorised personnel. We do not share your geolocation
              data with third parties without your consent, except where
              required by law.
            </p>

            <div className="pp-subsection-heading">V. Geolocation Data Retention</div>
            <p>
              Geolocation data is only retained for as long as necessary to
              fulfil its intended purposes. Once no longer required, it is
              securely deleted. You have the right to request access to,
              correction of, or deletion of your location data.
            </p>

            <div className="pp-subsection-heading">VI. Location-Based Services (LBS)</div>
            <p>
              Our application incorporates real-time location monitoring during
              shifts to ensure compliance and safety.
            </p>
          </section>

          {/* 14 */}
          <section className="pp-section" id="pp-s14">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">14</span>
              Complaints
            </h2>
            <p>
              If you believe we have breached your privacy, you can lodge a
              complaint with us by contacting our Privacy Officer below.
            </p>
            <div className="pp-subsection-heading">Our Complaints Process</div>
            <ul>
              <li>Submit your complaint in writing to our Privacy Officer</li>
              <li>We will acknowledge your complaint within 5 business days</li>
              <li>We will investigate and respond within 30 days</li>
              <li>If unsatisfied, you may escalate to the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
            <div className="pp-subsection-heading">Office of the Australian Information Commissioner (OAIC)</div>
            <div className="pp-contact-block">
              <p>Website: <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">www.oaic.gov.au</a></p>
              <p>Phone: 1300 363 992</p>
              <p>Email: <a href="mailto:enquiries@oaic.gov.au">enquiries@oaic.gov.au</a></p>
              <p>Post: GPO Box 5218, Sydney NSW 2001</p>
            </div>
          </section>

          {/* 15 */}
          <section className="pp-section" id="pp-s15">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">15</span>
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. Any changes will be posted on this page with an updated
              effective date. We encourage you to review this policy
              periodically.
            </p>
          </section>

          {/* 16 */}
          <section className="pp-section" id="pp-s16">
            <h2 className="pp-section-heading">
              <span className="pp-section-num">16</span>
              Contact Us
            </h2>
            <p>
              To exercise your privacy rights or for any enquiries about this
              policy, please contact our Privacy Officer:
            </p>
            <div className="pp-contact-block">
              <p><strong>Privacy Officer, TesseractApps Pty Ltd</strong></p>
              <p>Email: <a href="mailto:privacy@tesseractapps.com">privacy@tesseractapps.com</a></p>
              <p>General Enquiries: <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a></p>
              <p>Phone: 1300 252 808</p>
              <p>Address: TesseractApps, Phillip ACT 2606</p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
