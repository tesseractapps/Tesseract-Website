import "./ContactInformationCard.css";
// import { useNavigate } from "react-router-dom";
import contactUsImage from "../../assets/contactUsImage.webp";
import { useAppContext } from "../../contexts/AppContext";
const ContactInformationCard = () => {
  // const navigate = useNavigate();
  const { handleBookADemo } = useAppContext();
  const handleButtonClick = () => {
    handleBookADemo(true);
  };
  return (
    <div id="contact-info-text-container">
      <img src={contactUsImage} alt="contact us image" id="contact-us-image" />
      <div id="contact-info-sales" className="contact-info">
        <div id="contact-info-upper">
          <div className="contact-info-headingh">Contact Sales:</div>
          <div className="contact-info-text">
            Call us: ‪+61261332818‬ <br />
            Available: Mon - Fri, 9:00 AM to 5:30 PM
          </div>
          <div className="contact-info-text">Email:</div>
          <div className="contact-info-text">sales@tesseractapps.com</div>
        </div>
        {/* <button id="contact-info-button" onClick={handleButtonClick}>
          Book a Demo
        </button> */}
        <div id="contact-info-lower">
          <div className="contact-info-headingh">Not Ready to Talk Yet?</div>
          <div className="contact-info-text">
            You can start a free trial or get in touch with our team for more
            information.
          </div>
        </div>
      </div>
      <div className="contact-info">
        <div className="contact-info-headingh">Head Office:</div>
        <div className="contact-info-text">
          TesseractApps <br />
          {/* 28 Thynne St, Bruce ACT 2617, Canberra, ACT, Australia */}
          TesseractApps, Bruce ACT 2617
        </div>
        <div className="contact-info-text">Phone:</div>
        <div className="contact-info-text">
          1300 252 808 <br />
          02 6133 2800
        </div>

        {/* <div className="contact-info-headingh">Email:</div> */}
        <br />
        <button id="contact-info-button" onClick={handleButtonClick}>
          Book a Demo
        </button>
        {/* <br />
        <br />
        <br />
        <div className="contact-info-text">Become a TesseractApps Partner</div>
        <button id="contact-info-button" onClick={handleButtonClick}>
          Contact Us
        </button> */}
      </div>
    </div>
  );
};

export default ContactInformationCard;
