import "./TermsAndConditions.css";
import { useMetaTags } from "../../utils/useMetaTags";

const TermsAndConditions = () => {
  useMetaTags({
    title: "Terms & Conditions | Service Agreement | TesseractApps Australia",
    description: "TesseractApps terms and conditions for NDIS software services. Understand your rights, subscription terms, data ownership, and service agreements."
  });

  return (
    <div id="terms-and-conditions-container">
      <h1 className="heading">Terms & Conditions</h1>
      <div
        id="terms-and-conditions-date"
        className="text terms-and-conditions-text"
      >
        Effective Date: 30 July 2025
      </div>
      <div
        id="terms-and-conditions-date"
        className="text terms-and-conditions-text"
      >
        Applies To: https://tesseractapps.com.au/
      </div>

      <p className="text terms-and-conditions-text">
        Welcome to Tesseract Apps, a cloud-based workforce management platform
        built for NDIS providers and care organisations across Australia. These
        Terms and Conditions (“Terms”) govern your access to and use of our Site
        and services, including any related mobile applications, APIs,
        integrations, and communication tools (collectively, the “Services”). By
        accessing, signing up, or using the Services, you agree to be legally
        bound by these Terms. If you do not agree, please do not use the
        platform.
      </p>
      <h2 className="heading terms-and-conditions-heading">1. Eligibility</h2>
      <p className="text terms-and-conditions-text">
        By registering for an account or using our Services, you confirm that:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>You are at least 18 years of age. </li>
        <li>
          You are authorised to act on behalf of a business, organisation, or
          provider delivering care or NDIS-funded services.{" "}
        </li>
        <li>
          The information you provide is accurate, complete, and kept up to date
          at all times
        </li>
      </ul>
      <p className="text terms-and-conditions-text">
        We reserve the right to suspend or terminate access if we suspect false,
        misleading, or unauthorised registration.
      </p>
      <h2 className="heading terms-and-conditions-heading">
        2. Use of the Platform
      </h2>
      <p className="text terms-and-conditions-text">
        You may only use the TesseractApps platform for legitimate and lawful
        purposes aligned with:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>NDIS provider operations.</li>
        <li>
          HR, rostering, billing, compliance, participant support, or reporting
          workflows.
        </li>
      </ul>
      <p className="text terms-and-conditions-text">You must not:</p>
      <ul className="text terms-and-conditions-text">
        <li>Share access credentials with unauthorised individuals.</li>
        <li>Bypass or attempt to bypass security mechanisms.</li>
        <li>Upload or transmit any viruses, malware, or harmful content.</li>
        <li>Copy, resell, or reverse-engineer any part of the platform.</li>
      </ul>
      <p className="text terms-and-conditions-text">
        Use of the platform is at all times subject to applicable Australian
        laws, including NDIS rules, privacy regulations, and cybersecurity
        standards.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        3. Account Access and Security
      </h2>
      <p className="text terms-and-conditions-text">
        You are solely responsible for:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>All activities occurring under your login.</li>
        <li>Ensuring your devices and passwords are protected.</li>
        <li>
          Immediately notifying TesseractApps of any suspected breach or
          unauthorised access.
        </li>
      </ul>
      <p className="text terms-and-conditions-text">
        We reserve the right to block or suspend access for security concerns or
        account misuse.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        4. Free Trial and Subscription Terms
      </h2>
      <p className="text terms-and-conditions-text">
        <strong>7-Day Free Trial:</strong> New users are eligible for a
        no-obligation free trial. No credit card is required at sign-up.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Subscription Plans:</strong> After the trial ends, access
        continues only with a valid paid subscription. Pricing details are
        available at: https://tesseractapps.com.au/pricing.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Payment Terms:</strong> Subscription fees are billed monthly or
        annually in advance. Late payments may result in account suspension.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Changes:</strong> We may update pricing or service tiers with
        prior notice. Continued use after notice constitutes acceptance.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        5. Data Ownership and Confidentiality
      </h2>
      <p className="text terms-and-conditions-text">
        <strong>Client Data:</strong> All information, files, and content
        entered or uploaded by you remains your intellectual property.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Use of Data:</strong> We may use de-identified and aggregated
        data to improve system performance, support analytics, or inform product
        enhancements.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Data Hosting:</strong> All data is securely hosted in Australia
        in accordance with the Privacy Act 1988 (Cth) and NDIS Quality and
        Safeguards Commission requirements.
      </p>
      <p className="text terms-and-conditions-text">
        <strong>Backups and Retention:</strong> TesseractApps regularly backs up
        system data; however, we encourage clients to maintain their own data
        exports and records for compliance.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        6. Termination and Suspension
      </h2>
      <p className="text terms-and-conditions-text">
        We may terminate or restrict your account, with or without notice, if:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>You violate these Terms.</li>
        <li>
          There is a legal obligation to do so (e.g., by court order or
          regulator).
        </li>
        <li>
          You misuse the system in ways that threaten data security, NDIS
          compliance, or system integrity.
        </li>
      </ul>
      <p className="text terms-and-conditions-text">
        On termination, you will lose access to the Services. It is your
        responsibility to export data prior to the account being closed. We may
        retain records only where legally required.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        7. Support and Availability
      </h2>
      <p className="text terms-and-conditions-text">
        We provide platform support via email, knowledge base, and direct
        contact through our support team.
      </p>
      <p className="text terms-and-conditions-text">
        While we aim for 99.9% uptime, we do not guarantee uninterrupted access
        and are not liable for downtime caused by maintenance, internet outages,
        or third-party issues.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        8. Limitation of Liability
      </h2>
      <p className="text terms-and-conditions-text">
        To the extent permitted by law:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>
          We disclaim all warranties not expressly stated here, including
          merchantability or fitness for a specific purpose.
        </li>
        <li>
          TesseractApps will not be liable for indirect, incidental, or
          consequential loss, including data loss, profit loss, or business
          interruption.
        </li>
        <li>
          Our total liability for any claim will not exceed the amount paid by
          you in the preceding 12 months of your subscription.
        </li>
      </ul>
      <p className="text terms-and-conditions-text">
        Some rights under Australian Consumer Law may not be excluded, and these
        Terms do not override them.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        9. Intellectual Property
      </h2>
      <p className="text terms-and-conditions-text">
        All software, content, trademarks, and branding on the Site are owned or
        licensed by TesseractApps. You may not:
      </p>
      <ul className="text terms-and-conditions-text">
        <li>
          Reproduce, copy, modify, or adapt any part of the platform without
          written permission.
        </li>
        <li>Use our branding or trademarks without express authorisation.</li>
      </ul>
      <p className="text terms-and-conditions-text">
        Client-submitted content remains owned by the client.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        10. Third-Party Services and Integrations
      </h2>
      <p className="text terms-and-conditions-text">
        TesseractApps may integrate with third-party tools (e.g., Xero, MYOB,
        Medicare API). We do not control these services and are not liable for
        issues or damages arising from their use.
      </p>
      <p className="text terms-and-conditions-text">
        You are responsible for reviewing and accepting the terms of those
        third-party providers.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        11. Updates to Terms
      </h2>
      <p className="text terms-and-conditions-text">
        We may update these Terms occasionally to reflect regulatory,
        operational, or technical changes. Updates will be posted on the Site
        with the revised effective date.
      </p>
      <p className="text terms-and-conditions-text">
        Continued use of the platform after changes means you accept the updated
        Terms.
      </p>

      <h2 className="heading terms-and-conditions-heading">
        12. Governing Law
      </h2>
      <p className="text terms-and-conditions-text">
        These Terms are governed by the laws of the Australian Capital Territory
        (ACT). Any disputes arising under these Terms will be exclusively
        resolved in the courts of Canberra.
      </p>

      <h2 className="heading terms-and-conditions-heading">Contact Us</h2>
      <p className="text terms-and-conditions-text">
        If you have any questions or concerns about this Termas and conditions
        or our data practices, please contact us at:
      </p>
      <p className="text terms-and-conditions-text">
        Email: sales@tesseractapps.com
        <br />
        Phone: 1300 252 808
        <br />
        Address: TesseractApps, Bruce ACT 2617
      </p>
    </div>
  );
};

export default TermsAndConditions;
