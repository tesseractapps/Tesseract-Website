import "./ComingSoonStyles.css";
import comingSoonImage from "../../assets/coming soon.webp";
import { useMetaTags } from "../../utils/useMetaTags";

const ComingSoon = () => {
  useMetaTags({
    title: "Coming Soon | New Features | TesseractApps",
    description: "Exciting new features coming soon to TesseractApps. Stay tuned for platform updates that will enhance your NDIS workforce management experience."
  });

  return (
    <div id="comming-soon-container">
      <img
        src={comingSoonImage}
        alt="coming-soon-image"
        id="coming-soon-image"
      />
    </div>
  );
};

export default ComingSoon;
