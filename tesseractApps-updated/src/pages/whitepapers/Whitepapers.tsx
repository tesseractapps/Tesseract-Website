import "./WhitepapersStyles.css";
import pdf from "../../assets/Digital Transformation in Disability Services A Roadmap for 2025–2030.pdf";
import pdf2 from "../../assets/White Paper Aug 2025.pdf";
import pdf3 from "../../assets/White Paper Sep 2025.pdf";
import pdf4 from "../../assets/Whitepaper July 2025.pdf";
import pdf5 from "../../assets/White Paper  (Nov).pdf";
// import whitepaper1 from "../../assets/whitepaper1.webp";
import whitepaper2 from "../../assets/White Paper Aug 2025_page-0001.webp";
// import whitepaper3 from "../../assets/whitepaper-3.webp";
import whitepaper4 from "../../assets/Whitepaper July 2025-images-0.webp";
import whitepaper5 from "../../assets/White Paper  (Nov)-Cover.webp";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import ComingSoon from "../comingSoon/ComingSoon";
import { useMetaTags } from "../../utils/useMetaTags";

const Whitepapers = () => {
  useMetaTags({
    title: "Whitepapers & Research | NDIS Digital Transformation | TesseractApps",
    description: "Download free whitepapers on NDIS digital transformation, workforce management best practices, and care sector innovation for 2025-2030."
  });
  const location = useLocation();
  // const { data } = location.state || {};
  // console.log(data);
  const { getRoute } = useAppContext();
  const path = location.pathname.replace(/\/$/, "");
  const data = (location.state as any)?.data ?? getRoute(path)?.data ?? null;
  if (!data) {
    return <ComingSoon />;
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id;
    switch (id) {
      case "whitepaper-1":
        window.open(pdf, "_blank");
        break;
      case "whitepaper-2":
        window.open(pdf2, "_blank");
        break;
      case "whitepaper-3":
        window.open(pdf3, "_blank");
        break;
      case "whitepaper-4":
        window.open(pdf4, "_blank");
        break;
      case "whitepaper-5":
        window.open(pdf5, "_blank");
        break;
      default:
        break;
    }
  };
  return (
    <div id="whitepapers-page-container">
      <div className="heading">{data?.heading}</div>
      <div id="whitepapers-subheading" className="subheading">
        {data?.subHeading}
      </div>
      <div id="whitepapers-text" className="text">
        {data?.text}
      </div>

      <div id="whitepapers-item-container">
        {/* <img
          id="whitepaper-1"
          src={whitepaper1}
          alt="whitepaper-1"
          onClick={handleClick}
          className="whitepaper-item"
        /> */}
        <img
          id="whitepaper-2"
          src={whitepaper2}
          alt="whitepaper-2"
          onClick={handleClick}
          className="whitepaper-item"
        />
        {/* <img
          id="whitepaper-3"
          src={whitepaper3}
          alt="whitepaper-3"
          onClick={handleClick}
          className="whitepaper-item"
        /> */}
        <img
          id="whitepaper-4"
          src={whitepaper4}
          alt="whitepaper-4"
          onClick={handleClick}
          className="whitepaper-item"
        />
        <img
          id="whitepaper-5"
          src={whitepaper5}
          alt="whitepaper-5"
          onClick={handleClick}
          className="whitepaper-item"
        />
      </div>
      {/* <object data={pdf} type="application/pdf" width="50%" height="600px" /> */}
    </div>
  );
};

export default Whitepapers;
