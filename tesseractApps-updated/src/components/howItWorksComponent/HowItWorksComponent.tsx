import "./HowItWorksStyles.css";
import { howItWorksDummyData } from "../../utils/DummyData";
import dividerLine from "../../assets/divider_line.webp";
import { useEffect, useState } from "react";
const HowItWorksComponent = () => {
  const divderRowsInitialValues = [2, 3, 5, 6];
  const [dividerRows, setDividerRows] = useState(divderRowsInitialValues);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1480) {
        setDividerRows([2, 4, 6]);
      } else {
        setDividerRows(divderRowsInitialValues);
      }
    };

    handleResize(); // Run initially on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="howItWorks-container">
      <div className="heading ">Get Started with TesseractApps</div>
      <h2 className="subheading subheading-howItWorks">
        Get started with TesseractApps in 3 simple steps and make managing your
        NDIS services easy.
      </h2>
      <div id="howItWorks-content">
        {howItWorksDummyData.map((data, index) => {
          return (
            <div key={data.id + index} className="howItWorks-card">
              {dividerRows.includes(data.id) && (
                <img
                  src={dividerLine}
                  alt="dividerLine"
                  className="howItWorks-dividerLine"
                />
              )}
              <img
                src={data.image}
                alt="howItWorks-card-image"
                className="howItWorks-card-image"
              />
              <div className="howItWorks-card-data">
                <div className="howItWorks-card-title-number">0{data.id}</div>
                <h2 className="howItWorks-card-title">{data.title}</h2>
                <h3 className="howItWorks-card-description">
                  {data.description}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorksComponent;
