import "./ComingSoonStyles.css";
import comingSoonImage from "../../assets/coming soon.webp";
import SEO from "../../components/common/SEO";

const ComingSoon = () => {
  return (
    <div id="comming-soon-container">
      <SEO
        title="Coming Soon | New Features | TesseractApps"
        description="Exciting new features coming soon to TesseractApps. Stay tuned for platform updates that will enhance your NDIS workforce management experience."
      />
      <img loading="lazy"
        src={comingSoonImage}
        alt="coming-soon-image"
        id="coming-soon-image"
      />
    </div>
  );
};

export default ComingSoon;
