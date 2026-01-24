import "./FooterStyles.css";
import facebook from "../../assets/facebook.webp";
import instagram from "../../assets/instagram.webp";
import linkedin from "../../assets/linkedin.webp";
import youtube from "../../assets/youtube.webp";
import flagsImag1 from "../../assets/flagImage1.webp";
import flagsImag2 from "../../assets/flagImage2.webp";
import localAward from "../../assets/2025_CANB_WINNER_LBA.webp";
import iso27001 from "../../assets/JAS-ANZ ISMS.webp";
import iso9001 from "../../assets/JAS-ANZ QMS.webp";
import { footerProductsData } from "../../utils/DummyData";
// import { useNavigate } from "react-router-dom";
// import { AppNavigate } from "../../routes/AppNavigate";
import { useState } from "react";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import Alert from "../alert/Alert";
import {
  newsletterConfirmationEmailTemplate,
  newsletterSubscriptionEmailTemplate,
} from "../../utils/emailTemplates";
import useAppNavigate from "../../hooks/useAppNavigate";
import { useAppContext } from "../../contexts/AppContext";
const FooterComponent = () => {
  const appNavigate = useAppNavigate();
  const { handleBookADemo, handleSignup } = useAppContext();
  // const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const alertInitialData = {
    heading: "",
    text: "",
    type: "success",
    isOpen: false,
  };
  const [alertData, setAlertData] = useState(alertInitialData);
  const handleNewsletterSubscribe = () => {
    if (newsletterEmail) {
      // Here you can add the logic to handle the newsletter subscription
      sendTextEmail(
        newsletterSubscriptionEmailTemplate.email,
        newsletterSubscriptionEmailTemplate.subject,
        newsletterSubscriptionEmailTemplate.body(newsletterEmail)
      )
        .then((response) => {
          console.log("Email sent successfully:", response);
          confirmationMail();
          // alert("Thank you for subscribing to our newsletter!");
          setAlertData({
            ...alertData,
            heading: "Request Submitted",
            text: "Thank you for subscribing to our newsletter!",
            type: "newsletter",
            isOpen: true,
          });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          // alert(
          //   "There was an error sending your request. Please try again later."
          // );
          setAlertData({
            ...alertData,
            heading: "Request Failed",
            text: "There was an error sending your request. Please try again later.",
            type: "fail",
            isOpen: true,
          });
        });
      // console.log("Subscribed with email:", newsletterEmail);
      setNewsletterEmail(""); // Clear the input after subscribing
    } else {
      alert("Please enter a valid email address.");
    }
  };
  const confirmationMail = () => {
    sendEmail(
      newsletterEmail.split("@")[0],
      newsletterEmail,
      newsletterConfirmationEmailTemplate.subject,
      newsletterConfirmationEmailTemplate.text(newsletterEmail.split("@")[0]),
      newsletterConfirmationEmailTemplate.html(newsletterEmail.split("@")[0])
    )
      .then((response) => {
        console.log("Confirmation email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending confirmation email:", error);
      });
  };
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
    if (name === "email2") {
      const mailto = "mailto:marketing@tesseractapps.com?subject=Inquiry";
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

  function HandleSocialLinksClick(name: string) {
    if (name) appNavigate(name);
  }
  function handleProductDataClick(name: string) {
    // console.log(name);
    if (name == "Careers")
      return appNavigate("About", { targetId: "about-careers-heading" });
    if (name == "Contact Us")
      return appNavigate("About", { targetId: "contact-info-text-container" });
    if (name) return appNavigate(name);
  }
  const productLinks = footerProductsData;
  return (
    <div id="footer-container">
      <Alert setAlertData={setAlertData} alertData={alertData} />
      <div id="footer-top">
        {/* <div id="footer-column-1">
          <div id="footer-column1-item">
            <div className="footer-heading">About the company</div>
            <div className="footer-text footer-about-text">
              At Tesseract Apps, we provide tailored solutions that simplify
              care management, accounting, compliance, and HR, helping care
              providers run their operations efficiently and stay compliant.
              <br></br>
              <span
                className="footer-about-actions"
                onClick={() => handleFooterActions("phone")}
              >
                Phone: 1300 252 808
              </span>
              <br></br>
              <span
                className="footer-about-actions"
                onClick={() => handleFooterActions("email")}
              >
                Email: sales@tesseractapps.com
              </span>
            </div>
            <div id="footer-social-links">
              <img
                src={facebook}
                alt="Facebook"
                className="footer-social-icon"
                onClick={() => HandleSocialLinksClick("facebook")}
              ></img>
              <img
                src={instagram}
                alt="Instagram"
                className="footer-social-icon"
                onClick={() => HandleSocialLinksClick("instagram")}
              ></img>
              <img
                src={linkedin}
                alt="LinkedIn"
                className="footer-social-icon"
                onClick={() => HandleSocialLinksClick("linkedin")}
              ></img>
              <img
                src={youtube}
                alt="YouTube"
                className="footer-social-icon"
                onClick={() => HandleSocialLinksClick("youtube")}
              ></img>
            </div>
          </div>
          <div id="foooter-column-5">
            <div id="footer-newsletter-heading">Newsletter</div>
            <div id="footer-newsletter-text">
              Get the Latest Insights, Updates, and Tips Straight to Your Inbox.
            </div>
            <div id="footer-newsletter-input-container">
              <input
                type="text"
                id="footer-newsletter-input"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                id="footer-newsletter-button"
                onClick={handleNewsletterSubscribe}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div> */}
        <div className="footer-links-texts">
          <div className="footer-column">
            <div className="footer-heading">Products</div>
            {productLinks[0].map((link, index) => {
              return (
                <div
                  className="footer-text"
                  key={index}
                  onClick={() => {
                    handleProductDataClick(link);
                  }}
                >
                  {link}
                </div>
              );
            })}
          </div>
          <div className="footer-column">
            {productLinks[1].map((link, index) => {
              return (
                <div
                  className="footer-text"
                  key={index}
                  onClick={() => {
                    handleProductDataClick(link);
                  }}
                >
                  {link}
                </div>
              );
            })}
          </div>
          <div className="footer-column">
            {productLinks[2].map((link, index) => {
              return (
                <div
                  className="footer-text"
                  key={index}
                  onClick={() => {
                    handleProductDataClick(link);
                  }}
                >
                  {link}
                </div>
              );
            })}
          </div>
          <div className="footer-column">
            <div className="footer-heading">Company</div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("About");
              }}
            >
              About
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Careers");
              }}
            >
              Careers
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Terms & Conditions");
              }}
            >
              Terms & Conditions
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Privacy Policy");
              }}
            >
              Privacy Policy
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Release Notes");
              }}
            >
              Release Notes
            </div>
          </div>
          <div id="footer-column-3" className="footer-column">
            <div className="footer-heading">Get Started</div>
            <div
              className="footer-text"
              onClick={() => {
                // handleProductDataClick("Sign Up");
                handleSignup(true);
              }}
            >
              Sign Up
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Contact Us");
              }}
            >
              Contact Us
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-heading">Explore</div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Product");
              }}
            >
              Features
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Pricing");
              }}
            >
              Pricing
            </div>

            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Blog");
              }}
            >
              Blog
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-heading">Support</div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Help Center");
              }}
            >
              Help Centre
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Help Center");
              }}
            >
              FAQs
            </div>
            <div
              className="footer-text"
              onClick={() => {
                // handleProductDataClick("Book a Demo");
                handleBookADemo(true);
              }}
            >
              Book a Demo
            </div>
            {/* <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("Submit a Ticket");
              }}
            >
              Submit a Ticket
            </div>
            <div
              className="footer-text"
              onClick={() => {
                handleProductDataClick("24/7 Live Chat");
              }}
            >
              24/7 Live Chat
            </div> */}
          </div>
        </div>
      </div>
      <div className="footer-heading footer-about-heading">
        About the company
      </div>
      <div className="footer-text footer-about-text">
        At Tesseract Apps, we provide tailored solutions that simplify care
        management, accounting, compliance, and HR, helping care providers run
        their operations efficiently and stay compliant.
        <br></br>
      </div>
      <div id="footer-row-2">
        <div id="foooter-column-5">
          <div id="footer-newsletter-text-container">
            <div className="footer-heading">Newsletter</div>
            <div className="footer-text footer-newsletter-text">
              Get the Latest Insights, Updates, and Tips Straight to Your Inbox.
            </div>
          </div>
          <div id="footer-newsletter-input-container">
            <input
              type="text"
              id="footer-newsletter-input"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button
              id="footer-newsletter-button"
              onClick={handleNewsletterSubscribe}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
        <div id="footer-awards-container">
          <img
            src={iso27001}
            alt="ISO 27001"
            className="footer-award-image footer-award-image2"
          />
          <img
            src={iso9001}
            alt="ISO 9001"
            className="footer-award-image footer-award-image2"
          />
          <img
            src={localAward}
            alt="Local Business Award"
            className="footer-award-image"
          />
        </div>
        <div>
          <div>
            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("phone")}
            >
              Phone: 1300 252 808
            </span>
            <br />
            <br />

            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("email")}
            >
              Sales Email: sales@tesseractapps.com
            </span>
            <br />
            <br />
            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("email2")}
            >
              Marketing Email: marketing@tesseractapps.com
            </span>
          </div>
          <br />
          <div id="footer-social-links">
            <img
              src={facebook}
              alt="Facebook"
              className="footer-social-icon"
              onClick={() => HandleSocialLinksClick("facebook")}
            ></img>
            <img
              src={instagram}
              alt="Instagram"
              className="footer-social-icon"
              onClick={() => HandleSocialLinksClick("instagram")}
            ></img>
            <img
              src={linkedin}
              alt="LinkedIn"
              className="footer-social-icon"
              onClick={() => HandleSocialLinksClick("linkedin")}
            ></img>
            <img
              src={youtube}
              alt="YouTube"
              className="footer-social-icon"
              onClick={() => HandleSocialLinksClick("youtube")}
            ></img>
          </div>
        </div>
      </div>
      <div id="footer-divider" />
      <div id="footer-bottom">
        Tesseract Apps would like to acknowledge the Traditional Custodians of
        the land on which we operate, and pay our respects to their elders past
        and present.
        <div id="footer-bottom-images">
          <img src={flagsImag1} alt="Flag Image 1" />
          <img src={flagsImag2} alt="Flag Image 2" />
        </div>{" "}
        <div id="footer-bottom-divider"> | </div>{" "}
        <div id="footer-bottom-text">
          © 2025 Tesseract Apps. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
