import ContactInformationCard from "../../../components/details/contactInformationCard/ContactInformationCard";
import "./ContactInformationStyles.css";

import SEO from "../../../components/common/SEO";

const ContactInformation = () => {
  return (
    <div id="contact-info-container">
      <SEO
        title="Contact TesseractApps | NDIS Software Support & Sales | Australia"
        description="Get in touch with TesseractApps for NDIS software enquiries, demos, or support. Call 1300 252 808 or email sales@tesseractapps.com. Located in Phillip ACT 2606."
      />
      <div className="heading">CONTACT US</div>
      <div className="subheading">We're ready to connect.</div>
      <div className="text">
        Whether you're exploring our platform or looking for tailored support,
        our team is here to assist.
      </div>
      <ContactInformationCard />
    </div>
  );
};

export default ContactInformation;
