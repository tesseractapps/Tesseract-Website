import "./TermsAndConditionsStyles.css";
import SEO from "../../../components/common/SEO";

const TOC_ITEMS = [
  { id: "tc-s1", label: "Eligibility" },
  { id: "tc-s2", label: "Use of the Platform" },
  { id: "tc-s3", label: "Account Access & Security" },
  { id: "tc-s4", label: "Free Trial & Subscription" },
  { id: "tc-s5", label: "Data Ownership & Confidentiality" },
  { id: "tc-s6", label: "Termination & Suspension" },
  { id: "tc-s7", label: "Support & Availability" },
  { id: "tc-s8", label: "Limitation of Liability" },
  { id: "tc-s9", label: "Intellectual Property" },
  { id: "tc-s10", label: "Third-Party Services" },
  { id: "tc-s11", label: "Updates to Terms" },
  { id: "tc-s12", label: "Governing Law" },
  { id: "tc-s13", label: "Contact Us" },
];

const TermsAndConditions = () => {
  return (
    <div id="tc-page">
      <SEO
        title="Terms & Conditions | Service Agreement | TesseractApps Australia"
        description="TesseractApps terms and conditions for NDIS software services. Understand your rights, subscription terms, data ownership, and service agreements."
      />

      {/* ── Hero ── */}
      <section id="tc-hero">
        <div id="tc-hero-inner">
          <div id="tc-hero-label">Legal</div>
          <h1 id="tc-hero-heading">Terms &amp; Conditions</h1>
          <p id="tc-hero-meta">Effective Date: 30 July 2025 &nbsp;·&nbsp; Applies to: tesseractapps.com.au</p>
        </div>
      </section>

      {/* ── Body ── */}
      <div id="tc-outer">

        {/* ── Sidebar TOC ── */}
        <nav id="tc-toc" aria-label="Table of contents">
          <div id="tc-toc-label">On this page</div>
          <ul id="tc-toc-list">
            {TOC_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Content ── */}
        <article id="tc-content">

          <div className="tc-meta-block">
            <span className="tc-meta-item"><strong>Platform:</strong> TesseractApps</span>
            <span className="tc-meta-item"><strong>Entity:</strong> TesseractApps Pty Ltd</span>
          </div>

          <p className="tc-intro">
            Welcome to TesseractApps, a cloud-based workforce management
            platform built for NDIS providers and care organisations across
            Australia. These Terms and Conditions ("Terms") govern your access
            to and use of our Site and services, including any related mobile
            applications, APIs, integrations, and communication tools
            (collectively, the "Services"). By accessing, signing up, or using
            the Services, you agree to be legally bound by these Terms. If you
            do not agree, please do not use the platform.
          </p>

          {/* 1 */}
          <section className="tc-section" id="tc-s1">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">1</span>
              Eligibility
            </h2>
            <p>By registering for an account or using our Services, you confirm that:</p>
            <ul>
              <li>You are at least 18 years of age</li>
              <li>You are authorised to act on behalf of a business, organisation, or provider delivering care or NDIS-funded services</li>
              <li>The information you provide is accurate, complete, and kept up to date at all times</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access if we suspect
              false, misleading, or unauthorised registration.
            </p>
          </section>

          {/* 2 */}
          <section className="tc-section" id="tc-s2">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">2</span>
              Use of the Platform
            </h2>
            <p>
              You may only use the TesseractApps platform for legitimate and
              lawful purposes aligned with NDIS provider operations, including
              HR, rostering, billing, compliance, participant support, or
              reporting workflows.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Share access credentials with unauthorised individuals</li>
              <li>Bypass or attempt to bypass security mechanisms</li>
              <li>Upload or transmit any viruses, malware, or harmful content</li>
              <li>Copy, resell, or reverse-engineer any part of the platform</li>
            </ul>
            <p>
              Use of the platform is at all times subject to applicable
              Australian laws, including NDIS rules, privacy regulations, and
              cybersecurity standards.
            </p>
          </section>

          {/* 3 */}
          <section className="tc-section" id="tc-s3">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">3</span>
              Account Access and Security
            </h2>
            <p>You are solely responsible for:</p>
            <ul>
              <li>All activities occurring under your login</li>
              <li>Ensuring your devices and passwords are protected</li>
              <li>Immediately notifying TesseractApps of any suspected breach or unauthorised access</li>
            </ul>
            <p>
              We reserve the right to block or suspend access for security
              concerns or account misuse.
            </p>
          </section>

          {/* 4 */}
          <section className="tc-section" id="tc-s4">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">4</span>
              Free Trial and Subscription Terms
            </h2>
            <div className="tc-key-terms">
              <div className="tc-key-term">
                <p><strong>7-Day Free Trial:</strong> New users are eligible for a no-obligation free trial. No credit card is required at sign-up.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Subscription Plans:</strong> After the trial ends, access continues only with a valid paid subscription. Pricing details are available at tesseractapps.com.au/pricing.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Payment Terms:</strong> Subscription fees are billed monthly or annually in advance. Late payments may result in account suspension.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Changes:</strong> We may update pricing or service tiers with prior notice. Continued use after notice constitutes acceptance.</p>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section className="tc-section" id="tc-s5">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">5</span>
              Data Ownership and Confidentiality
            </h2>
            <div className="tc-key-terms">
              <div className="tc-key-term">
                <p><strong>Client Data:</strong> All information, files, and content entered or uploaded by you remains your intellectual property.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Use of Data:</strong> We may use de-identified and aggregated data to improve system performance, support analytics, or inform product enhancements.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Data Hosting:</strong> All data is securely hosted in Australia in accordance with the Privacy Act 1988 (Cth) and NDIS Quality and Safeguards Commission requirements.</p>
              </div>
              <div className="tc-key-term">
                <p><strong>Backups and Retention:</strong> TesseractApps regularly backs up system data; however, we encourage clients to maintain their own data exports and records for compliance.</p>
              </div>
            </div>
          </section>

          {/* 6 */}
          <section className="tc-section" id="tc-s6">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">6</span>
              Termination and Suspension
            </h2>
            <p>
              We may terminate or restrict your account, with or without notice,
              if:
            </p>
            <ul>
              <li>You violate these Terms</li>
              <li>There is a legal obligation to do so (e.g., by court order or regulator)</li>
              <li>You misuse the system in ways that threaten data security, NDIS compliance, or system integrity</li>
            </ul>
            <p>
              On termination, you will lose access to the Services. It is your
              responsibility to export data prior to the account being closed.
              We may retain records only where legally required.
            </p>
          </section>

          {/* 7 */}
          <section className="tc-section" id="tc-s7">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">7</span>
              Support and Availability
            </h2>
            <p>
              We provide platform support via email, knowledge base, and direct
              contact through our support team.
            </p>
            <p>
              While we aim for 99.9% uptime, we do not guarantee uninterrupted
              access and are not liable for downtime caused by maintenance,
              internet outages, or third-party issues.
            </p>
          </section>

          {/* 8 */}
          <section className="tc-section" id="tc-s8">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">8</span>
              Limitation of Liability
            </h2>
            <p>To the extent permitted by law:</p>
            <ul>
              <li>We disclaim all warranties not expressly stated here, including merchantability or fitness for a specific purpose</li>
              <li>TesseractApps will not be liable for indirect, incidental, or consequential loss, including data loss, profit loss, or business interruption</li>
              <li>Our total liability for any claim will not exceed the amount paid by you in the preceding 12 months of your subscription</li>
            </ul>
            <p>
              Some rights under Australian Consumer Law may not be excluded, and
              these Terms do not override them.
            </p>
          </section>

          {/* 9 */}
          <section className="tc-section" id="tc-s9">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">9</span>
              Intellectual Property
            </h2>
            <p>
              All software, content, trademarks, and branding on the Site are
              owned or licensed by TesseractApps. You may not:
            </p>
            <ul>
              <li>Reproduce, copy, modify, or adapt any part of the platform without written permission</li>
              <li>Use our branding or trademarks without express authorisation</li>
            </ul>
            <p>Client-submitted content remains owned by the client.</p>
          </section>

          {/* 10 */}
          <section className="tc-section" id="tc-s10">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">10</span>
              Third-Party Services and Integrations
            </h2>
            <p>
              TesseractApps may integrate with third-party tools (e.g., Xero,
              MYOB, Medicare API). We do not control these services and are not
              liable for issues or damages arising from their use.
            </p>
            <p>
              You are responsible for reviewing and accepting the terms of those
              third-party providers.
            </p>
          </section>

          {/* 11 */}
          <section className="tc-section" id="tc-s11">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">11</span>
              Updates to Terms
            </h2>
            <p>
              We may update these Terms occasionally to reflect regulatory,
              operational, or technical changes. Updates will be posted on the
              Site with the revised effective date.
            </p>
            <p>
              Continued use of the platform after changes means you accept the
              updated Terms.
            </p>
          </section>

          {/* 12 */}
          <section className="tc-section" id="tc-s12">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">12</span>
              Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the Australian Capital
              Territory (ACT). Any disputes arising under these Terms will be
              exclusively resolved in the courts of Canberra.
            </p>
          </section>

          {/* 13 */}
          <section className="tc-section" id="tc-s13">
            <h2 className="tc-section-heading">
              <span className="tc-section-num">13</span>
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions or our data practices, please contact us:
            </p>
            <div className="tc-contact-block">
              <p><strong>TesseractApps Pty Ltd</strong></p>
              <p>Email: <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a></p>
              <p>Phone: 1300 252 808</p>
              <p>Address: TesseractApps, Phillip ACT 2606</p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
};

export default TermsAndConditions;
