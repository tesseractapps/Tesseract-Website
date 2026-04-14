import "./FooterStyles.css";
import facebook from "../../../assets/facebook.webp";
import instagram from "../../../assets/instagram.webp";
import linkedin from "../../../assets/linkedin.webp";
import youtube from "../../../assets/youtube.webp";
import flagsImag1 from "../../../assets/flagImage1.webp";
import flagsImag2 from "../../../assets/flagImage2.webp";
// import localAward from "../../../assets/2025_CANB_WINNER_LBA.webp";
// import iso27001 from "../../../assets/JAS-ANZ ISMS.webp";
// import iso9001 from "../../../assets/JAS-ANZ QMS.webp";
import localAwardsvg from "../../../assets/2025_CANB_WINNER_LBA.svg";
import iso27001svg from "../../../assets/JAS-ANZ ISMS.svg";
import iso9001svg from "../../../assets/JAS-ANZ QMS.svg";
import { useState } from "react";
import { sendEmail, sendTextEmail } from "../../../services/appService";
import Alert from "../../ui/alert/Alert";
import {
  newsletterConfirmationEmailTemplate,
  newsletterSubscriptionEmailTemplate,
} from "../../../utils/emailTemplates";
import useAppNavigate from "../../../hooks/useAppNavigate";
import { Link } from "react-router-dom";
import { useSanityCapabilityNav } from "../../../hooks/useSanityCapabilityNav";
import { useSanitySolutionNav } from "../../../hooks/useSanitySolutionNav";

const FooterComponent = () => {
  const appNavigate = useAppNavigate();
  const { links: capLinks } = useSanityCapabilityNav();
  const { links: solLinks } = useSanitySolutionNav();

  // Group capabilities by navGroup (same logic as navbar)
  const capGroups: Record<string, { title: string; slug: string }[]> = {};
  capLinks.forEach((link) => {
    if (!capGroups[link.navGroup]) capGroups[link.navGroup] = [];
    capGroups[link.navGroup].push({ title: link.title, slug: link.slug.current });
  });

  // Group solutions by navCategory (same logic as navbar)
  const solGroups: Record<string, { title: string; slug: string }[]> = {
    "BY CARE TYPE": [],
    "BY ROLE": [],
    "BY STAGE": [],
  };
  solLinks.forEach((link) => {
    if (solGroups[link.navCategory]) {
      solGroups[link.navCategory].push({ title: link.title, slug: link.slug.current });
    }
  });
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
      sendTextEmail(
        newsletterSubscriptionEmailTemplate.email,
        newsletterSubscriptionEmailTemplate.subject,
        newsletterSubscriptionEmailTemplate.body(newsletterEmail),
      )
        .then(() => {
          confirmationMail();
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
          setAlertData({
            ...alertData,
            heading: "Request Failed",
            text: "There was an error sending your request. Please try again later.",
            type: "fail",
            isOpen: true,
          });
        });
      setNewsletterEmail("");
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
      newsletterConfirmationEmailTemplate.html(newsletterEmail.split("@")[0]),
    ).catch((error) => {
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
            "If your email client didn't open, please email us at: sales@tesseractapps.com",
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
            "If your email client didn't open, please email us at: marketing@tesseractapps.com",
          );
        }
      }, 1000);
    }
  }

  function HandleSocialLinksClick(name: string) {
    if (name) appNavigate(name);
  }

  return (
    <div id="footer-container">
      <Alert setAlertData={setAlertData} alertData={alertData} />

      {/* ── Zone 1: Nav grid ── */}
      <nav id="footer-nav" aria-label="Footer navigation">
        {/* Brand column */}
        <div id="footer-brand">
          <Link id="footer-logo" to="/" aria-label="TesseractApps — home">
            <div id="footer-logo-icon" role="img" aria-label="Tesseract Apps Logo" />
            TesseractApps
          </Link>
          <p id="footer-brand-tagline">
            Simplifying care management, compliance, and HR for NDIS providers
            across Australia.
          </p>
        </div>

        {/* Capabilities col A — first two navGroups from Sanity */}
        <div className="footer-column">
          {Object.entries(capGroups).slice(0, 2).map(([group, items]) => (
            <div key={group} className="footer-link-group">
              <div className="footer-heading">{group}</div>
              {items.map((item) => (
                <Link key={item.slug} className="footer-text" to={`/capabilities/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Capabilities col B — remaining navGroups from Sanity */}
        <div className="footer-column">
          {Object.entries(capGroups).slice(2).map(([group, items]) => (
            <div key={group} className="footer-link-group">
              <div className="footer-heading">{group}</div>
              {items.map((item) => (
                <Link key={item.slug} className="footer-text" to={`/capabilities/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Solutions — grouped by navCategory from Sanity */}
        <div className="footer-column">
          {Object.entries(solGroups).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className="footer-link-group">
                <div className="footer-heading">{category}</div>
                {items.map((item) => (
                  <Link key={item.slug} className="footer-text" to={`/solutions/${item.slug}`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            )
          ))}
        </div>

        {/* Company */}
        <div className="footer-column">
          <div className="footer-heading">Company</div>
          <Link className="footer-text" to="/about">About Us</Link>
          <Link className="footer-text" to="/contact-us">Contact Us</Link>
          <Link className="footer-text" to="/careers">Careers</Link>
          <Link className="footer-text" to="/platform">Platform</Link>
          <Link className="footer-text" to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link className="footer-text" to="/privacy-policy">Privacy Policy</Link>
          <Link className="footer-text" to="/changelog">Release Notes</Link>
        </div>

        {/* Resources + Support + Get Started */}
        <div className="footer-column">
          <div className="footer-heading">Resources</div>
          <Link className="footer-text" to="/blogs">Blog</Link>
          <Link className="footer-text" to="/whitepapers">Whitepapers</Link>
          <Link className="footer-text" to="/help-center">FAQ</Link>
          <Link className="footer-text" to="/ndis-glossary">NDIS Glossary</Link>
          <Link className="footer-text" to="/sitemap">Site Map</Link>
          <a
            className="footer-text"
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            RSS Feed
          </a>

          <div className="footer-heading footer-support-heading">Get Started</div>
          <Link className="footer-text" to="/signup">Sign Up</Link>
          <Link className="footer-text" to="/pricing">Pricing</Link>
          <Link className="footer-text" to="/book-a-demo">Book a Demo</Link>
        </div>
      </nav>

      {/* ── About blurb ── */}
      <div id="footer-about-block">
        <div className="footer-about-label">About the company</div>
        <div className="footer-text footer-about-text">
          At TesseractApps, we provide tailored solutions that simplify care
          management, accounting, compliance, and HR, helping care providers run
          their operations efficiently and stay compliant.
        </div>
      </div>

      {/* ── Zone 2: Newsletter + Awards + Contact ── */}
      <div id="footer-mid">
        <div id="footer-mid-inner">
          {/* Newsletter */}
          <div id="foooter-column-5">
            <div id="footer-newsletter-text-container">
              <div className="footer-heading">Newsletter</div>
              <div className="footer-text footer-newsletter-text">
                Get the latest insights, updates, and tips straight to your inbox.
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
                type="button"
                id="footer-newsletter-button"
                onClick={handleNewsletterSubscribe}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Awards */}
          <div id="footer-awards-container">
            <img
              loading="lazy"
              src={iso27001svg}
              alt="ISO 27001 certification badge"
              className="footer-award-image footer-award-image2"
              width="638"
              height="100"
              decoding="async"
            />
            <img
              loading="lazy"
              src={iso9001svg}
              alt="ISO 9001 certification badge"
              className="footer-award-image footer-award-image2"
              width="638"
              height="100"
              decoding="async"
            />
            <img
              loading="lazy"
              src={localAwardsvg}
              alt="Local Business Award trophy"
              className="footer-award-image"
              width="528"
              height="120"
              decoding="async"
            />
          </div>

          {/* Contact + Social */}
          <div id="footer-contact-block">
            <address className="footer-address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Suite 1, 1 Trevillian Quay</span>,{" "}
              <span itemProp="addressLocality">Phillip</span>{" "}
              <span itemProp="addressRegion">ACT</span>{" "}
              <span itemProp="postalCode">2606</span>,{" "}
              <span itemProp="addressCountry">Australia</span>
            </address>
            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("phone")}
            >
              Phone: 1300 252 808
            </span>
            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("email")}
            >
              Sales: sales@tesseractapps.com
            </span>
            <span
              className="footer-about-actions"
              onClick={() => handleFooterActions("email2")}
            >
              Marketing: marketing@tesseractapps.com
            </span>
            <div id="footer-social-links">
              <img
                loading="lazy"
                src={facebook}
                alt="Visit TesseractApps on Facebook"
                className="footer-social-icon"
                width="24"
                height="24"
                decoding="async"
                onClick={() => HandleSocialLinksClick("facebook")}
              />
              <img
                loading="lazy"
                src={instagram}
                alt="Visit TesseractApps on Instagram"
                className="footer-social-icon"
                width="24"
                height="24"
                decoding="async"
                onClick={() => HandleSocialLinksClick("instagram")}
              />
              <img
                loading="lazy"
                src={linkedin}
                alt="Visit TesseractApps on LinkedIn"
                className="footer-social-icon"
                width="24"
                height="24"
                decoding="async"
                onClick={() => HandleSocialLinksClick("linkedin")}
              />
              <img
                loading="lazy"
                src={youtube}
                alt="Visit TesseractApps on YouTube"
                className="footer-social-icon"
                width="24"
                height="24"
                decoding="async"
                onClick={() => HandleSocialLinksClick("youtube")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone 3: Bottom bar ── */}
      <div id="footer-divider" />
      <div id="footer-bottom">
        <div id="footer-acknowledgment">
          TesseractApps would like to acknowledge the Traditional Custodians of
          the land on which we operate, and pay our respects to their elders
          past and present.
        </div>
        <div id="footer-bottom-images">
          <img
            loading="lazy"
            src={flagsImag1}
            alt="Aboriginal and Torres Strait Islander flags"
            width="47"
            height="33"
            decoding="async"
          />
          <img
            loading="lazy"
            src={flagsImag2}
            alt="Australian national flag"
            width="48"
            height="33"
            decoding="async"
          />
        </div>
        <div id="footer-bottom-divider">|</div>
        <div id="footer-bottom-text">
          © 2026 TesseractApps. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
