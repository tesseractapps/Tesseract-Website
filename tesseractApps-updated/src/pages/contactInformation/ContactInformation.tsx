import ContactInformationCard from "../../components/contactInformationCard/ContactInformationCard";
import "./ContactInformationStyles.css";
import { useMetaTags } from "../../utils/useMetaTags";

const ContactInformation = () => {
  useMetaTags({
    title: "Contact TesseractApps | NDIS Software Support & Sales | Australia",
    description: "Get in touch with TesseractApps for NDIS software enquiries, demos, or support. Call 1300 252 808 or email sales@tesseractapps.com. Located in Bruce, ACT 2617."
  });

  return (
    <div id="contact-info-container">
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
