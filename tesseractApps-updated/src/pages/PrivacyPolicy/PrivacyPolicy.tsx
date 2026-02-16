import "./PrivacyPolicy.css";
import { useMetaTags } from "../../utils/useMetaTags";

const PrivacyPolicy = () => {
  useMetaTags({
    title: "Privacy Policy | Data Protection | TesseractApps Australia",
    description:
      "TesseractApps privacy policy. Learn how we collect, use, and protect your personal information. Data hosted securely in Australia, compliant with Privacy Act 1988.",
  });

  return (
    <div id="privacy-policy-container">
      <div id="privacy-policy-title" className="heading">
        Privacy Policy
      </div>
      <div id="privacy-policy-date" className="text privacy-policy-text">
        Effective Date: 21/01/2026
      </div>

      <div className="text privacy-policy-text">
        Company Name: TesseractApps Pty Ltd
      </div>
      <div className="text privacy-policy-text">
        Website: https://tesseractapps.com.au/
      </div>
      <div className="text privacy-policy-text">
        Services: NDIS Workforce Management Software Provider
      </div>

      <p className="text privacy-policy-text">
        At TesseractApps, we are committed to protecting your privacy and
        ensuring the security of your personal information. This Privacy Policy
        outlines how we collect, use, disclose, and safeguard your data when you
        use our website and NDIS workforce management services. By accessing
        https://tesseractapps.com.au/ or utilizing our services, you agree to
        the practices described in this policy.
      </p>

      {/* NEW SECTION: Australian Privacy Principles Compliance */}
      <div className="heading privacy-policy-heading">
        1. Australian Privacy Principles Compliance
      </div>
      <div className="text privacy-policy-text">
        TesseractApps is committed to complying with the Privacy Act 1988 (Cth)
        and the 13 Australian Privacy Principles (APPs). We also acknowledge and
        comply with the requirements introduced by the Privacy and Other
        Legislation Amendment Act 2024, which strengthens privacy protections
        for Australians.
      </div>
      <div className="text privacy-policy-text">
        As an APP entity providing services to NDIS providers and participants,
        we take our privacy obligations seriously and have implemented
        comprehensive measures to protect all personal information entrusted to
        us.
      </div>

      {/* ENHANCED: Information Collection Section */}
      <div className="heading privacy-policy-heading">
        2. Information We Collect
      </div>
      <div className="text privacy-policy-text">
        In accordance with APP 3, we only collect personal information that is
        reasonably necessary for our NDIS workforce management services. We
        collect information by lawful and fair means, directly from individuals
        where practicable.
      </div>

      <div className="subheading privacy-policy-subheading">
        Personal Information:
      </div>
      <ul>
        <li className="text privacy-policy-text">Name</li>
        <li className="text privacy-policy-text">Email address</li>
        <li className="text privacy-policy-text">Phone number</li>
        <li className="text privacy-policy-text">Address</li>
        <li className="text privacy-policy-text">Payment information</li>
        <li className="text privacy-policy-text">
          Employment-related information for NDIS staff (qualifications,
          certifications, work history)
        </li>
        <li className="text privacy-policy-text">
          Other identifiable information that you provide voluntarily
        </li>
      </ul>

      {/* NEW: Sensitive Information Subsection */}
      <div className="subheading privacy-policy-subheading">
        Sensitive Information:
      </div>
      <div className="text privacy-policy-text">
        We may collect sensitive information as defined under the Privacy Act
        1988, including:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Health information relevant to NDIS service delivery
        </li>
        <li className="text privacy-policy-text">
          Disability status and support requirements
        </li>
        <li className="text privacy-policy-text">
          Background check results for NDIS worker screening
        </li>
      </ul>
      <div className="text privacy-policy-text">
        We will only collect sensitive information with your explicit consent,
        unless otherwise permitted by law. Sensitive information is subject to
        enhanced security measures and strict access controls.
      </div>

      <div className="subheading privacy-policy-subheading">
        Non-Personal Information:
      </div>
      <ul>
        <li className="text privacy-policy-text">Browser type and version</li>
        <li className="text privacy-policy-text">Operating system</li>
        <li className="text privacy-policy-text">
          Pages visited on our website
        </li>
        <li className="text privacy-policy-text">Time and date of visits</li>
        <li className="text privacy-policy-text">IP address</li>
        <li className="text privacy-policy-text">Other technical data</li>
      </ul>

      {/* ENHANCED: Data Usage with APP 6 */}
      <div className="heading privacy-policy-heading">
        3. How We Use Your Information
      </div>
      <div className="text privacy-policy-text">
        In accordance with APP 6, we only use or disclose personal information
        for the primary purpose for which it was collected, or for secondary
        purposes where you would reasonably expect such use and it is related to
        the primary purpose.
      </div>
      <div className="text privacy-policy-text">
        We use the collected information for our NDIS workforce management
        services, including:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Providing and managing our NDIS workforce management services
        </li>
        <li className="text privacy-policy-text">
          Processing transactions and payroll
        </li>
        <li className="text privacy-policy-text">
          Rostering, scheduling, and shift management
        </li>
        <li className="text privacy-policy-text">
          Improving our platform and services
        </li>
        <li className="text privacy-policy-text">
          Communicating with you about updates, service changes, and support
        </li>
        <li className="text privacy-policy-text">
          Responding to your inquiries and providing customer support
        </li>
        <li className="text privacy-policy-text">
          Analyzing usage trends to enhance user experience
        </li>
        <li className="text privacy-policy-text">
          Complying with NDIS Quality and Safeguards requirements
        </li>
        <li className="text privacy-policy-text">
          Complying with legal and regulatory obligations
        </li>
      </ul>

      <div className="heading privacy-policy-heading">
        4. Sharing Your Information
      </div>
      <div className="text privacy-policy-text">
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties, except in the following circumstances:
      </div>
      <ul>
        <li className="text privacy-policy-text">With your consent</li>
        <li className="text privacy-policy-text">
          To trusted third parties who assist us in operating our website and
          services, as long as they agree to keep your information confidential
          and comply with Australian privacy laws
        </li>
        <li className="text privacy-policy-text">
          To comply with legal requirements, such as responding to subpoenas,
          court orders, or other legal processes
        </li>
        <li className="text privacy-policy-text">
          To protect our rights, property, or safety, and that of our users or
          others
        </li>
        <li className="text privacy-policy-text">
          To the NDIS Quality and Safeguards Commission where required for
          compliance purposes
        </li>
      </ul>

      {/* NEW SECTION: Overseas Disclosure */}
      <div className="heading privacy-policy-heading">
        5. Overseas Disclosure
      </div>
      <div className="text privacy-policy-text">
        TesseractApps is built on Salesforce Hyperforce infrastructure, with
        data hosted in Australia. However, in limited circumstances, personal
        information may be processed by overseas service providers who support
        our platform operations.
      </div>
      <div className="text privacy-policy-text">
        Before disclosing personal information overseas, we take reasonable
        steps to ensure that the overseas recipient does not breach the
        Australian Privacy Principles in relation to that information. Our
        safeguards include:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Contractual obligations requiring compliance with Australian privacy
          standards
        </li>
        <li className="text privacy-policy-text">
          Data processing agreements with appropriate security and privacy
          clauses
        </li>
        <li className="text privacy-policy-text">
          Assessment of the recipient&apos;s privacy practices and security
          measures
        </li>
        <li className="text privacy-policy-text">
          Preference for providers in countries with comparable privacy
          protections
        </li>
      </ul>
      <div className="text privacy-policy-text">
        Countries where data may be processed include the United States (for
        certain Salesforce services). We maintain transparency about
        international data flows and will inform you of any significant changes
        to these arrangements.
      </div>

      {/* ENHANCED: Data Security with specific measures */}
      <div className="heading privacy-policy-heading">6. Data Security</div>
      <div className="text privacy-policy-text">
        In accordance with APP 11, we take reasonable steps to protect personal
        information from misuse, interference, loss, unauthorised access,
        modification, or disclosure. We implement comprehensive security
        measures including:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          End-to-end encryption using AES-256 for data at rest and SSL/TLS for
          data in transit
        </li>
        <li className="text privacy-policy-text">
          Multi-factor authentication (MFA) for all user accounts
        </li>
        <li className="text privacy-policy-text">
          Role-based access controls ensuring staff only access data necessary
          for their role
        </li>
        <li className="text privacy-policy-text">
          Regular security audits and vulnerability assessments
        </li>
        <li className="text privacy-policy-text">
          Secure data destruction procedures when information is no longer
          required
        </li>
        <li className="text privacy-policy-text">
          ISO 27001-certified infrastructure through our Salesforce platform
        </li>
        <li className="text privacy-policy-text">
          Regular staff training on data protection and privacy requirements
        </li>
        <li className="text privacy-policy-text">
          Incident response procedures for potential security events
        </li>
      </ul>

      {/* NEW SECTION: Data Breach Notification */}
      <div className="heading privacy-policy-heading">
        7. Data Breach Notification
      </div>
      <div className="text privacy-policy-text">
        In accordance with the Notifiable Data Breaches (NDB) scheme under Part
        IIIC of the Privacy Act 1988, we have implemented a comprehensive data
        breach response framework.
      </div>
      <div className="text privacy-policy-text">
        If we experience an eligible data breach that is likely to result in
        serious harm to any individuals whose personal information is involved,
        we will:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Take immediate steps to contain the breach and limit any damage
        </li>
        <li className="text privacy-policy-text">
          Assess the breach to determine if it is likely to result in serious
          harm
        </li>
        <li className="text privacy-policy-text">
          Notify the Office of the Australian Information Commissioner (OAIC) as
          soon as practicable
        </li>
        <li className="text privacy-policy-text">
          Notify affected individuals with details about the breach and
          recommended steps they should take
        </li>
        <li className="text privacy-policy-text">
          Review and improve our security measures to prevent future breaches
        </li>
      </ul>

      {/* ENHANCED: User Rights with APP references */}
      <div className="heading privacy-policy-heading">8. Your Rights</div>
      <div className="text privacy-policy-text">
        Under the Australian Privacy Principles, you have the following rights:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          <strong>Access (APP 12):</strong> You have the right to request access
          to the personal information we hold about you
        </li>
        <li className="text privacy-policy-text">
          <strong>Correction (APP 13):</strong> You have the right to request
          correction of inaccurate, out-of-date, incomplete, irrelevant, or
          misleading personal information
        </li>
        <li className="text privacy-policy-text">
          Request the deletion of your personal information where it is no
          longer needed for the purpose for which it was collected
        </li>
        <li className="text privacy-policy-text">
          Object to the processing of your data in certain circumstances
        </li>
        <li className="text privacy-policy-text">
          Withdraw consent at any time where processing is based on consent
        </li>
        <li className="text privacy-policy-text">
          Lodge a complaint with the Office of the Australian Information
          Commissioner (OAIC) if you believe your privacy has been breached
        </li>
      </ul>
      <div className="text privacy-policy-text">
        We commit to responding to access and correction requests within 30 days
        of receipt. To exercise these rights, please contact us using the
        information provided below.
      </div>

      {/* NEW SECTION: Automated Decision-Making */}
      <div className="heading privacy-policy-heading">
        9. Automated Decision-Making
      </div>
      <div className="text privacy-policy-text">
        Our NDIS workforce management platform may use automated processes to
        assist with:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Rostering and shift allocation based on staff availability,
          qualifications, and participant needs
        </li>
        <li className="text privacy-policy-text">
          Scheduling optimisation to match staff skills with service
          requirements
        </li>
        <li className="text privacy-policy-text">
          Compliance checking for certifications and training requirements
        </li>
      </ul>
      <div className="text privacy-policy-text">
        These automated processes are designed to assist human decision-makers,
        not replace them. You have the right to:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Request information about how automated decisions affecting you are
          made
        </li>
        <li className="text privacy-policy-text">
          Request human review of any automated decision that significantly
          affects you
        </li>
        <li className="text privacy-policy-text">
          Challenge automated decisions through our complaints process
        </li>
      </ul>

      {/* NEW SECTION: Data Retention */}
      <div className="heading privacy-policy-heading">10. Data Retention</div>
      <div className="text privacy-policy-text">
        In accordance with APP 11.2, we only retain personal information for as
        long as necessary to fulfil the purposes for which it was collected, or
        as required by law.
      </div>
      <div className="text privacy-policy-text">
        Our retention practices include:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Retaining employment and payroll records as required by taxation and
          workplace laws (typically 7 years)
        </li>
        <li className="text privacy-policy-text">
          Retaining NDIS service records as required by NDIS Quality and
          Safeguards Commission requirements
        </li>
        <li className="text privacy-policy-text">
          Securely destroying or de-identifying personal information when it is
          no longer needed
        </li>
        <li className="text privacy-policy-text">
          Regular review of retained data to ensure ongoing necessity
        </li>
      </ul>
      <div className="text privacy-policy-text">
        When personal information is no longer required, we ensure it is
        securely destroyed or de-identified using industry-standard methods.
      </div>

      <div className="heading privacy-policy-heading">
        11. Cookies and Tracking Technologies
      </div>
      <div className="text privacy-policy-text">
        We use cookies and similar tracking technologies to enhance your
        experience on our website. You can choose to disable cookies through
        your browser settings; however, this may affect your ability to use
        certain features of our site.
      </div>

      <div className="heading privacy-policy-heading">
        12. Third-Party Links
      </div>
      <div className="text privacy-policy-text">
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices of these sites. We encourage you
        to read the privacy policies of any linked websites you visit.
      </div>

      <div className="heading privacy-policy-heading">
        13. Geolocation Privacy Policy
      </div>
      <div className="subheading privacy-policy-subheading">
        I. Collection of Geolocation Data
      </div>
      <div className="text privacy-policy-text">
        To sign in for shifts, geolocation services must be enabled on your
        device. You will only be able to sign in if you are within a 400-meter
        radius of the assigned shift location. Additionally, once signed in,
        your location will be tracked at every 100-meter interval to monitor
        your presence at the location during the shift.
      </div>

      <div className="subheading privacy-policy-subheading">
        II. Purpose of Geolocation Data
      </div>
      <div className="text privacy-policy-text">
        We collect your geolocation data for the following purposes: Verifying
        your proximity to the shift location to enable sign-in. Monitoring your
        location while on shift to ensure compliance and safety. Enhancing
        service functionality, such as providing accurate attendance and shift
        records.
      </div>

      <div className="subheading privacy-policy-subheading">
        III. Your Control Over Geolocation
      </div>
      <div className="text privacy-policy-text">
        You may manage your geolocation settings through your device. However,
        disabling location services will restrict certain features, including
        the ability to sign in for shifts. By using our services with
        geolocation enabled, you consent to the collection and use of your
        location data as outlined.
      </div>

      <div className="subheading privacy-policy-subheading">
        IV. Geolocation Data Security
      </div>
      <div className="text privacy-policy-text">
        Your location data is encrypted and stored securely, accessible only to
        authorized personnel for the purposes described in this policy. We do
        not share your geolocation data with third parties without your consent,
        except where required by law.
      </div>

      <div className="subheading privacy-policy-subheading">
        V. Geolocation Data Retention
      </div>
      <div className="text privacy-policy-text">
        Geolocation data is only retained for as long as necessary to fulfill
        its intended purposes, such as verifying shift attendance and
        maintaining accurate records. Once this data is no longer required, it
        is securely deleted. You have the right to request access to, correction
        of, or deletion of your location data.
      </div>

      <div className="subheading privacy-policy-subheading">
        VI. Location-Based Services (LBS)
      </div>
      <div className="text privacy-policy-text">
        Our application incorporates Location-Based Services (LBS) to enhance
        user experience and functionality through the following feature:
        Real-Time Monitoring tracks users&apos; locations during shifts to
        ensure compliance and safety.
      </div>

      {/* NEW SECTION: Complaints */}
      <div className="heading privacy-policy-heading">14. Complaints</div>
      <div className="text privacy-policy-text">
        If you believe we have breached your privacy or have a complaint about
        how we have handled your personal information, you can lodge a complaint
        with us.
      </div>
      <div className="subheading privacy-policy-subheading">
        Our Complaints Process:
      </div>
      <ul>
        <li className="text privacy-policy-text">
          Submit your complaint in writing to our Privacy Officer using the
          contact details below
        </li>
        <li className="text privacy-policy-text">
          We will acknowledge your complaint within 5 business days
        </li>
        <li className="text privacy-policy-text">
          We will investigate your complaint and respond within 30 days
        </li>
        <li className="text privacy-policy-text">
          If you are not satisfied with our response, you may escalate your
          complaint to the Office of the Australian Information Commissioner
          (OAIC)
        </li>
      </ul>
      <div className="subheading privacy-policy-subheading">
        Office of the Australian Information Commissioner (OAIC):
      </div>
      <div className="text privacy-policy-text">Website: www.oaic.gov.au</div>
      <div className="text privacy-policy-text">Phone: 1300 363 992</div>
      <div className="text privacy-policy-text">
        Email: enquiries@oaic.gov.au
      </div>
      <div className="text privacy-policy-text">
        Post: GPO Box 5218, Sydney NSW 2001
      </div>

      <div className="heading privacy-policy-heading">
        15. Changes to This Privacy Policy
      </div>
      <div className="text privacy-policy-text">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices, technology, legal requirements, or other factors. Any
        changes will be posted on this page, and the effective date will be
        updated accordingly. For significant changes, we will provide prominent
        notice or direct notification where appropriate. We encourage you to
        review this policy periodically to stay informed about how we are
        protecting your information.
      </div>

      <div className="heading privacy-policy-heading">16. Contact Us</div>
      <div className="text privacy-policy-text">
        <strong>Privacy Officer</strong>
      </div>
      <div className="text privacy-policy-text">TesseractApps Pty Ltd</div>
      <div className="text privacy-policy-text">
        Email: privacy@tesseractapps.com
      </div>
      <div className="text privacy-policy-text">
        General Enquiries: sales@tesseractapps.com
      </div>
      <div className="text privacy-policy-text">Phone: 1300 252 808</div>
      <div className="text privacy-policy-text">
        Address: TesseractApps, Bruce ACT 2617
      </div>
    </div>
  );
};

export default PrivacyPolicy;
