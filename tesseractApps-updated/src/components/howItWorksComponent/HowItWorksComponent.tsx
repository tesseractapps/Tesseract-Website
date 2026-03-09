import "./HowItWorksStyles.css";
import { howItWorksDummyData } from "../../utils/DummyData";
// import dividerLine from "../../assets/divider_line.webp";
const HowItWorksComponent = () => {
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
              {/* <img loading="lazy"
                src={dividerLine}
                alt=""
                aria-hidden="true"
                className="howItWorks-dividerLine"
                width="120"
                height="3"
              /> */}
              <img loading="lazy"
                src={data.image}
                alt={data.title}
                className="howItWorks-card-image"
                width="180"
                height="180"
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
