import "./CareersStyles.css";
import { useMetaTags } from "../../utils/useMetaTags";

const Careers = () => {
  useMetaTags({
    title: "Careers at TesseractApps | Join Our Team | Australian Tech Jobs",
    description: "Join TesseractApps and help shape the future of care and workforce technology. We're looking for passionate individuals who want to make a real impact through innovation."
  });

  return (
    <div id="careers-container">
      <div className="heading">CAREERS</div>
      <div className="subheading">
        Join Us in Shaping the Future of Care and Workforce Technology
      </div>
      <div className="text" id="careers-text">
        Tesseract Apps is growing fast, and we’re looking for passionate, driven
        individuals who want to make a real impact through innovation and
        user-centered technology.
      </div>
      <div id="careers-current-openings">
        <div id="current-openings-title">Current openings : None</div>
      </div>
      <div id="careers-bottom-text">
        Don’t see the right role right now? We’d still love to hear from
        you—send us your resume, and we’ll reach out if the perfect opportunity
        comes up!
      </div>
    </div>
  );
};

export default Careers;
