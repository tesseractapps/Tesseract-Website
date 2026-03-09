import "./DownloadAppStyles.css";
import mockup from "../../assets/mockups.webp";
import mobileLinks from "../../assets/mobile_insets.webp";
const DownloadAppComponent = () => {
  return (
    <div id="download-container">
      <div id="download-content">
        <div id="download-content-heading">Download app to enjoy more!</div>
        <div id="download-content-text">
          Amet in elementum nulla scelerisque dui, egestas at. Elit consectetur
          turpis elementum amet vitae et etiam nec. Varius volutpat hac
          adipiscing tincidunt pretium.
        </div>
        <img loading="lazy" id="links-image" src={mobileLinks} alt="mobile links image" />
      </div>
      <img loading="lazy" id="download-image" src={mockup} alt="download image" />
    </div>
  );
};

export default DownloadAppComponent;
