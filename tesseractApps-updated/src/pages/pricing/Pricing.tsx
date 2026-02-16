import "./PricingStyles.css";
import { pricingCardsDummyData, pricingDummyData } from "../../utils/DummyData";
import { useState } from "react";
import tick from "../../assets/ok.svg";
import tickBlue from "../../assets/tick-blue.svg";
import tickBlack from "../../assets/tick-black.svg";
import remove from "../../assets/remove.webp";
import ArrowDown from "../../assets/arrow_down.svg";
// import tick_white from "../../assets/tick_white.svg";
import call from "../../assets/call.svg";
import mark_email from "../../assets/mark_email.svg";
import { Link } from "react-router-dom";
import ContactInformationCard from "../../components/contactInformationCard/ContactInformationCard";
// import priceBg from "../../assets/price bg.webp";
import p1 from "../../assets/p1.webp";
import p2 from "../../assets/p2.webp";
import p3 from "../../assets/p3.webp";
// import p4 from "../../assets/p4.webp";
import p5 from "../../assets/p6.webp";
import pricingStar from "../../assets/pricing-star.webp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useMetaTags } from "../../utils/useMetaTags";
// import useAppNavigate from "../../hooks/useAppNavigate";
// import { AppNavigate } from "../../routes/AppNavigate";
// type PricingDataTickItemTypes = {
//   title: string;
//   subTitle: string;
//   data1?: { value: boolean; text: string };
//   data2?: { value: boolean; text: string };
//   data3?: { value: boolean; text: string };
//   data4?: { value: boolean; text: string };
// };
const Pricing = () => {
  useMetaTags({
    title: "TesseractApps Pricing | NDIS Software Plans & Packages | Australia",
    description: "View TesseractApps pricing plans for NDIS providers. Choose from Starter, Standard, Professional, or Premium packages. 7-day free trial, no credit card required. Get 10% off with full accounting suite."
  });
  const imageArr1 = [p1, p2];
  const imageArr2 = [p3, p5];
  // const navigate = useNavigate();
  const { handleBookADemo, handleSignup } = useAppContext();
  const handleBookADemoClick = () => {
    handleBookADemo(true);
  };
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    | "ndis"
    | "ict"
    | "retailAndHospitality"
    | "multiSiteBusinesses"
    | "manufacturing"
    | "construction"
  >("ndis");
  // const [userCount, setUserCount] = useState(0);

  function handleFooterActions(name: string) {
    if (name === "phone") {
      window.location.href = "tel:1300252808";
    }

    if (name === "email") {
      const mailto = "mailto:sales@tesseractapps.com?subject=Inquiry";
      const link = document.createElement("a");
      link.href = mailto;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        if (document.hasFocus()) {
          alert(
            "If your email client didn't open, please email us at: sales@tesseractapps.com"
          );
        }
      }, 1000);
    }
  }
  // const categoryChangeHandler = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const value = (event.target as HTMLDivElement).id;
  //   setSelectedTab(value as typeof selectedTab);
  // };
  const handleTryItFree = () => {
    setSelectedTab("ndis"); // no use, just to avoid linting
    // appNavigate("Signup");
    handleSignup(true);
  };
  // const categories = ["ndis", "ict"];
  return (
    <div id="pricing-container">
      <div id="pricing-her-container">
        <div id="paricing-hero-images-container">
          {imageArr1.map((image) => (
            <img src={image} alt="ph-image" className="paricing-hero-images" />
          ))}
        </div>
        <div>
          <div className="heading">PRICING</div>
          <h1 className="subheading pricing-subheading">
            Save time with TesseractApps.
          </h1>
          <div className="pricing-divider-line pricing-divider-line-header" />
          <h2 className="text pricing-textt">
            Our all in one NDIS software helps you manage everything from staffing schedules to billing quickly and with ease.
          </h2>
          <div id="pricing-cta-button">
            <button
              className="cta-button pricing-button-primary button-contain"
              onClick={handleTryItFree}
            >
              Try For Free
            </button>
          </div>
          <h2 className="pricing-hero-bottom-text">
            No credit card is required.
          </h2>
        </div>
        <div id="paricing-hero-images-container">
          {imageArr2.map((image) => (
            <img src={image} alt="ph-image" className="paricing-hero-images" />
          ))}
        </div>
      </div>

      {/* <div id="pricing-category-container">
        <select
          name="pricingCategory"
          id="pricing-category-select"
          defaultValue="ndis"
          onChange={categoryChangeHandler}
        >
          <option className="pricing-category-select-option" value="ndis">
            NDIS Industry
          </option>
          <option className="pricing-category-select-option" value="ict">
            ICT Industry
          </option>
          <option
            className="pricing-category-select-option"
            value="retailAndHospitality"
          >
            Retail & Hospitality
          </option>
          <option
            className="pricing-category-select-option"
            value="multiSiteBusinesses"
          >
            Multi-Site Businesses
          </option>
          <option
            className="pricing-category-select-option"
            value="manufacturing"
          >
            Manufacturing
          </option>
          <option
            className="pricing-category-select-option"
            value="construction"
          >
            Construction
          </option>
        </select>
      </div> */}

      {/* <div id="pricing-category-container">
  <div id="pricing-category-option-container">
    <div
      className="pricing-category-highlight"
      style={{
        width: `${(100 / categories.length)-1}%`,
        transform: `translateX(${categories.indexOf(selectedTab) * 100}%)`,
      }}
    />
    {categories.map((cat) => (
      <div
        key={cat}
        id={cat}
        className={
          "pricing-category-option" +
          (selectedTab === cat ? " pricing-category-option-selected" : "")
        }
        onClick={categoryChangeHandler}
      >
        {cat.toUpperCase()}
      </div>
    ))}
  </div>
</div> */}
      <div id="pricing-category-container">
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              checked={toggleSwitch}
              onChange={() => setToggleSwitch(!toggleSwitch)}
            />
          }
          label="Get 10% off with TesseractApps Full Accounting Suite (limited time only)"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "18px",
              color: "var(--color-text-gray)", // your desired font size
            },
          }}
        />
      </div>
      {/* <img src={priceBg} alt="price" id="price-bg" /> */}

      {pricingCardsDummyData[selectedTab].length > 0 && (
        <div id="pricing-data-container">
          <div id="pricing-cards-container">
            {pricingCardsDummyData[selectedTab].length > 0 &&
              pricingCardsDummyData[selectedTab].map((data, index) => {
                return (
                  <div
                    className={
                      index == 1 && selectedTab == "ndis"
                        ? "pricing-card-selected"
                        : "pricing-card"
                    }
                    key={index + data.title}
                  >
                    {index == 1 && selectedTab == "ndis" ? (
                      <div id="pricing-most-popular-container">
                        <img
                          src={pricingStar}
                          alt="pricing start"
                          id="pricing-most-popular-star"
                        />{" "}
                        <div className="pricing-card-tag"> MOST POPULAR</div>
                      </div>
                    ) : (
                      <div style={{ height: "10px" }}></div>
                    )}
                    <div
                      className={
                        "pricing-card-title" + (index == 1 ? "-selected" : "")
                      }
                    >
                      {data.title}
                    </div>
                    <div
                      className={
                        "pricing-card-sub-title" +
                        (index == 1 ? "-selected" : "")
                      }
                    >
                      {data.subTitle}
                    </div>
                    <div
                      className={
                        "pricing-card-description" +
                        (index == 1 ? "-selected" : "")
                      }
                    >
                      {data.description}
                    </div>
                    <div
                      className={
                        "pricing-card-pricing" + (index == 1 ? "-selected" : "")
                      }
                    >
                      {data.Pricing > 0
                        ? "$" +
                        (toggleSwitch
                          ? (data.Pricing * 0.9).toFixed(2)
                          : data.Pricing)
                        : ""}
                    </div>
                    <div
                      className={
                        "pricing-card-time-period" +
                        (index == 1 ? "-selected" : "")
                      }
                    >
                      {data.timePeriod}
                    </div>
                    <div className="pricing-minimum-number">
                      minimum 5 users
                    </div>
                    <button
                      className="cta-button pricing-button-primary"
                      onClick={handleTryItFree}
                    >
                      {data.cta}
                    </button>
                    <div className={"features-container "}>
                      {data.features.map((feature, fIndex) => {
                        return (
                          <div
                            key={fIndex}
                            className="pricing-tick-data-container"
                          >
                            <div className="pricing-tick-icon-container">
                              <img
                                src={index == 1 ? tickBlue : tickBlack}
                                alt="pricing-tick-icon"
                                className="pricing-tick-icon"
                              />
                            </div>
                            <div
                              className={
                                "pricing-feature-data" +
                                (index == 1 ? "-selected" : "")
                              }
                            >
                              {feature}
                            </div>
                          </div>
                        );
                      })}
                      {/* {data.optionalAddons.length > 0 && (
                        <div className="pricing-optional-addon-container">
                          <div
                            className={
                              "pricing-optional-addon-subheading" +
                              (index == 1 ? "-selected" : "")
                            }
                          >
                            Optional Addons
                          </div>
                          {data.optionalAddons.map((addOn, index2) => (
                            <div
                              key={index2 + addOn}
                              className={
                                "pricing-feature-data pricing-optional-addon" +
                                (index == 1 ? "-selected" : "")
                              }
                            >
                              {addOn}
                            </div>
                          ))}
                        </div>
                      )} */}
                    </div>
                    <Link
                      className={
                        "pricing-more-info" + (index == 1 ? "-selected" : "")
                      }
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("pricing-data-accordian-container")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      More Information
                    </Link>
                  </div>
                );
              })}
          </div>
          <div id="pricing-data-accordian-container">
            {(
              pricingDummyData[selectedTab as keyof typeof pricingDummyData] ??
              []
            ).map((data) => (
              <Accordion
                key={data.heading}
                className="faq-page-accordian"
                elevation={0}
                square
                sx={{
                  marginBottom: "5px",
                }}
              >
                <AccordionSummary
                  sx={{
                    backgroundImage: "var(--color-background-gradient)",
                    margin: 0,
                    maxHeight: "40px",
                    overflow: "hidden",
                  }}
                  expandIcon={<img src={ArrowDown} alt="arrow" />}
                >
                  <Typography component="span">
                    <div className="pricing-data-heading">{data.heading}</div>
                  </Typography>
                </AccordionSummary>

                <div className="pricing-data-data-container">
                  <AccordionDetails>
                    <div className="pricing-sticky-header">
                      <div className="pricing-sticky-empty-header"></div>
                      {pricingCardsDummyData[selectedTab].length > 0 &&
                        pricingCardsDummyData[selectedTab].map(
                          (data, index) => {
                            return (
                              <div
                                key={index + data.title}
                                className="pricing-sticky-card"
                              >
                                <div className="pricing-card-title">
                                  {data.title}
                                </div>
                                <div className="pricing-card-sub-title">
                                  {data.subTitle}
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>

                    {data.data.map((dataItem) => (
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 400,
                          textAlign: "left",
                        }}
                      >
                        <div className="pricing-data-title-container-outer">
                          <div className="pricing-data-title">
                            {dataItem.title.split("#")[0]}{" "}
                            {dataItem.title.split("#")[1] ? (
                              <span
                                style={{
                                  color: "white",
                                  backgroundColor: "var( --color-primary)",
                                  padding: "2px 8px",
                                  borderRadius: "12px",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                }}
                              >
                                {dataItem.title.split("#")[1]}
                              </span>
                            ) : null}
                          </div>
                          <div className="pricing-data-subtitle">
                            {dataItem.subTitle}
                          </div>
                        </div>
                        <div className="pricing-data-data">
                          <div className="pricing-data-title-container">
                            <div className="pricing-data-title">
                              {dataItem.title.split("#")[0]}{" "}
                              {dataItem.title.split("#")[1] ? (
                                <span
                                  style={{
                                    color: "white",
                                    backgroundColor: "var( --color-primary)",
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {dataItem.title.split("#")[1]}
                                </span>
                              ) : null}
                            </div>
                            <div className="pricing-data-subtitle">
                              {dataItem.subTitle}
                            </div>
                          </div>
                          {/* <div className="pricing-data-tick-container"> */}
                          {dataItem.data1 !== undefined && (
                            <PricingDataItem
                              data={dataItem.data1}
                              className="pricing-data-item"
                            />
                          )}

                          {dataItem.data2 !== undefined && (
                            <PricingDataItem
                              data={dataItem.data2}
                              className="pricing-data-item"
                            />
                          )}

                          {dataItem.data3 !== undefined && (
                            <PricingDataItem
                              data={dataItem.data3}
                              className="pricing-data-item"
                            />
                          )}
                          {dataItem.data4 !== undefined && (
                            <PricingDataItem
                              data={dataItem.data4}
                              className="pricing-data-item"
                            />
                          )}
                          {/* </div> */}
                        </div>
                      </Typography>
                    ))}
                  </AccordionDetails>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      )}
      {(pricingDummyData[selectedTab as keyof typeof pricingDummyData] ?? [])
        .length == 0 && (
          <div id="pricing-contact-information">
            <ContactInformationCard />
          </div>
        )}
      <div id="pricing-help-card">
        <div id="pricing-help-title-container">
          <div id="pricing-help-title">Still have questions?</div>
          <div id="pricing-help-subtitle">We are here to help</div>
        </div>
        <div id="pricing-help-links">
          <div className="pricing-links-container">
            <img src={call} alt="" className="pricing-links-image" />
            <div
              className="pricing-links-data-container"
              onClick={() => handleFooterActions("phone")}
            >
              <div className="pricing-links-data">1300 252 808</div>
              <div className="pricing-links-data-subtext">Support Hotline</div>
            </div>
          </div>
          <div className="pricing-links-container">
            <img src={mark_email} alt="" className="pricing-links-image" />
            <div
              className="pricing-links-data-container"
              onClick={() => handleFooterActions("email")}
            >
              <div className="pricing-links-data">sales@tesseractapps.com</div>
              <div className="pricing-links-data-subtext">Support Email</div>
            </div>
          </div>
          <button id="pricing-help-chat-button" onClick={handleBookADemoClick}>
            {" "}
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

type PricingDataItemProps = {
  data: { value: boolean; text: string }; // true / false
  className: string;
};

const PricingDataItem: React.FC<PricingDataItemProps> = ({
  data,
  className,
}) => {
  return (
    <div className={className}>
      {data.text == "" && (
        <img
          src={data.value ? tick : remove}
          alt={data.value ? "tick" : "remove"}
          className={`pricing-data-tick ${data.value ? "pricing-data-tick-success" : ""
            }`}
        />
      )}
      {data.text}
    </div>
  );
};
