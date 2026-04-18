import "./ContactInformationStyles.css";
import SEO from "../../../components/common/SEO";
import { Phone, MapPin, Clock, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactInformation = () => {
  const navigate = useNavigate();

  return (
    <div id="contact-page">
      <SEO
        title="Contact TesseractApps | NDIS Software Support & Sales | Australia"
        description="Get in touch with TesseractApps for NDIS software enquiries, demos, or support. Call 1300 252 808 or email sales@tesseractapps.com. Located in Phillip ACT 2606."
      />

      {/* ── Hero ── */}
      <section id="contact-hero">
        <div id="contact-hero-inner">
          <div id="contact-hero-label">Contact Us</div>
          <h1 id="contact-hero-heading">We're ready to connect.</h1>
          <p id="contact-hero-sub">
            Whether you're exploring our platform or looking for tailored
            support, our team is here to assist.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div id="contact-outer">
        <div id="contact-cards-grid">

          <div className="contact-card">
            <div className="contact-card-icon">
              <Phone size={20} strokeWidth={2} />
            </div>
            <div className="contact-card-title">Sales</div>
            <div className="contact-card-detail">
              <strong>Phone</strong>
              +61 2 6133 2818
            </div>
            <div className="contact-card-detail">
              <strong>Toll-free</strong>
              1300 252 808
            </div>
            <div className="contact-card-detail">
              <strong>Email</strong>
              <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <Clock size={20} strokeWidth={2} />
            </div>
            <div className="contact-card-title">Business Hours</div>
            <div className="contact-card-detail">
              <strong>Monday – Friday</strong>
              9:00 AM – 5:30 PM AEST
            </div>
            <div className="contact-card-detail">
              Outside business hours? Leave us a message and we'll get back to
              you the next business day.
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <MapPin size={20} strokeWidth={2} />
            </div>
            <div className="contact-card-title">Head Office</div>
            <div className="contact-card-detail">
              <strong>Address</strong>
              TesseractApps Pty Ltd
              <br />
              <a
                href="https://www.google.com/maps/place/TesseractApps/@-35.3523175,149.0868962,572m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b165308ac032d25:0xe18d2268ea055f5c!8m2!3d-35.3523175!4d149.0894711!16s%2Fg%2F11wj5bv41c"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-link"
              >
                Level 1/45 Colbee Ct, Phillip ACT 2606, Australia
              </a>
            </div>
            <div className="contact-card-detail">
              <strong>Phone</strong>
              02 6133 2800
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <Mail size={20} strokeWidth={2} />
            </div>
            <div className="contact-card-title">Email Us</div>
            <div className="contact-card-detail">
              <strong>Sales & General Enquiries</strong>
              <a href="mailto:sales@tesseractapps.com">sales@tesseractapps.com</a>
            </div>
            <div className="contact-card-detail">
              <strong>Support</strong>
              <a href="mailto:support@tesseractapps.com">support@tesseractapps.com</a>
            </div>
            <a
              href="mailto:sales@tesseractapps.com?subject=Feedback%20%E2%80%93%20TesseractApps"
              className="contact-feedback-btn"
            >
              <MessageSquare size={15} strokeWidth={2} />
              Send Feedback
            </a>
          </div>

        </div>

        {/* ── Google Map ── */}
        <div id="contact-map-wrapper">
          <iframe
            id="contact-map-iframe"
            title="TesseractApps Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d728.7894586806!2d149.08689619999998!3d-35.3523175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b165308ac032d25%3A0xe18d2268ea055f5c!2sTesseractApps!5e0!3m2!1sen!2sau!4v1713000000000!5m2!1sen!2sau"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href="https://www.google.com/maps/place/TesseractApps/@-35.3523175,149.0868962,572m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b165308ac032d25:0xe18d2268ea055f5c!8m2!3d-35.3523175!4d149.0894711!16s%2Fg%2F11wj5bv41c"
            target="_blank"
            rel="noopener noreferrer"
            id="contact-map-directions"
          >
            <MapPin size={14} strokeWidth={2} />
            Get Directions
          </a>
        </div>
      </div>

      {/* ── CTA ── */}
      <section id="contact-cta-strip">
        <div id="contact-cta-inner">
          <h2 id="contact-cta-heading">Not ready to talk yet?</h2>
          <p id="contact-cta-sub">
            Start a free 7-day trial or book a personalised demo, no credit
            card required.
          </p>
          <div className="sll-cta-actions">
            <button
              type="button"
              className="sll-btn-primary"
              onClick={() => navigate("/book-a-demo")}
            >
              Book a Demo
            </button>
            <button
              type="button"
              className="sll-btn-outline"
              onClick={() => navigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
          <p className="sll-cta-sub-note">Book a Provider Maturity Review. Start your provider setup.</p>
        </div>
      </section>
    </div>
  );
};

export default ContactInformation;
