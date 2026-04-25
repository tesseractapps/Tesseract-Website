import "./ContactInformationStyles.css";
import SEO from "../../../components/common/SEO";
import { Phone, MapPin, Clock, Mail, MessageSquare, CheckCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { sendEmail, sendTextEmail } from "../../../services/appService";
import { feedbackEmailTemplate, feedbackConfirmationEmailTemplate } from "../../../utils/emailTemplates";
import Alert from "../../../components/ui/alert/Alert";

type FeedbackForm = { name: string; email: string; type: string; message: string };
type FeedbackErrors = Partial<Record<keyof FeedbackForm, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyFeedback: FeedbackForm = { name: "", email: "", type: "", message: "" };

const FEEDBACK_TYPES = ["General Feedback", "Bug Report", "Feature Request", "Billing", "Other"];

const ContactInformation = () => {
  const navigate = useNavigate();
  const alertInitialData = { heading: "", text: "", type: "success", isOpen: false };
  const [alertData, setAlertData] = useState(alertInitialData);
  const [feedback, setFeedback] = useState<FeedbackForm>(emptyFeedback);
  const [feedbackErrors, setFeedbackErrors] = useState<FeedbackErrors>({});
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFeedback((prev) => ({ ...prev, [id]: value }));
    if (feedbackErrors[id as keyof FeedbackForm]) {
      setFeedbackErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validateFeedback = (): boolean => {
    const errors: FeedbackErrors = {};
    if (!feedback.name.trim()) errors.name = "Name is required";
    if (!feedback.email.trim()) errors.email = "Email is required";
    else if (!EMAIL_RE.test(feedback.email.trim())) errors.email = "Enter a valid email address";
    if (!feedback.type) errors.type = "Please select a feedback type";
    if (!feedback.message.trim()) errors.message = "Message is required";
    else if (feedback.message.trim().length < 10) errors.message = "Please provide a bit more detail";
    setFeedbackErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFeedback()) return;
    setFeedbackSubmitting(true);
    sendTextEmail(
      feedbackEmailTemplate.email,
      feedbackEmailTemplate.subject,
      feedbackEmailTemplate.body({
        name: feedback.name,
        email: feedback.email,
        type: feedback.type,
        message: feedback.message,
      })
    )
      .then(() => {
        setFeedbackSuccess(true);
        sendEmail(
          feedback.name,
          feedback.email,
          feedbackConfirmationEmailTemplate.subject,
          feedbackConfirmationEmailTemplate.text(feedback.name),
          feedbackConfirmationEmailTemplate.html(feedback.name),
        ).catch((err) => console.error("Feedback confirmation email error:", err));
      })
      .catch(() =>
        setAlertData({
          heading: "Submission Failed",
          text: "There was an error sending your feedback. Please try again later.",
          type: "fail",
          isOpen: true,
        })
      )
      .finally(() => setFeedbackSubmitting(false));
  };

  return (
    <div id="contact-page">
      <Alert setAlertData={setAlertData} alertData={alertData} />
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

      {/* ── Feedback Form ── */}
      <section id="contact-feedback-section">
        <div id="contact-feedback-inner">
          <div id="contact-feedback-header">
            <div id="contact-feedback-label">
              <MessageSquare size={14} strokeWidth={2.5} />
              Share Your Thoughts
            </div>
            <h2 id="contact-feedback-heading">Send us feedback</h2>
            <p id="contact-feedback-sub">
              Found a bug, have a feature idea, or just want to share how things are going? We read every message.
            </p>
          </div>

          {feedbackSuccess ? (
            <div id="contact-feedback-success">
              <CheckCircle size={48} color="var(--color-primary)" strokeWidth={1.5} />
              <div id="contact-feedback-success-title">Thanks for your feedback!</div>
              <div id="contact-feedback-success-msg">
                We've received your message and will review it shortly.
              </div>
              <button
                type="button"
                className="contact-feedback-submit-btn"
                onClick={() => { setFeedbackSuccess(false); setFeedback(emptyFeedback); }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form id="contact-feedback-form" onSubmit={handleFeedbackSubmit} noValidate>
              <div id="contact-feedback-row">
                <div className="cf-field">
                  <label className="cf-label" htmlFor="name">Name <span className="cf-required">*</span></label>
                  <input
                    className={"cf-input" + (feedbackErrors.name ? " cf-input-error" : "")}
                    id="name" type="text" placeholder="Jane Doe"
                    value={feedback.name} onChange={handleFeedbackChange}
                  />
                  {feedbackErrors.name && <span className="cf-error">{feedbackErrors.name}</span>}
                </div>
                <div className="cf-field">
                  <label className="cf-label" htmlFor="email">Email <span className="cf-required">*</span></label>
                  <input
                    className={"cf-input" + (feedbackErrors.email ? " cf-input-error" : "")}
                    id="email" type="email" placeholder="jane@organisation.com"
                    value={feedback.email} onChange={handleFeedbackChange}
                  />
                  {feedbackErrors.email && <span className="cf-error">{feedbackErrors.email}</span>}
                </div>
              </div>
              <div className="cf-field">
                <label className="cf-label" htmlFor="type">Feedback Type <span className="cf-required">*</span></label>
                <select
                  className={"cf-input cf-select" + (feedbackErrors.type ? " cf-input-error" : "")}
                  id="type" value={feedback.type} onChange={handleFeedbackChange}
                >
                  <option value="">Select a type…</option>
                  {FEEDBACK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {feedbackErrors.type && <span className="cf-error">{feedbackErrors.type}</span>}
              </div>
              <div className="cf-field">
                <label className="cf-label" htmlFor="message">Message <span className="cf-required">*</span></label>
                <textarea
                  className={"cf-input cf-textarea" + (feedbackErrors.message ? " cf-input-error" : "")}
                  id="message" placeholder="Tell us what you think…" rows={5}
                  value={feedback.message} onChange={handleFeedbackChange}
                />
                <span className={
                  "cf-char-hint" +
                  (feedback.message.trim().length === 0 ? "" :
                   feedback.message.trim().length < 10 ? " cf-char-hint--warn" : " cf-char-hint--ok")
                }>
                  {feedback.message.trim().length < 10
                    ? `Minimum 10 characters (${feedback.message.trim().length}/10)`
                    : `${feedback.message.trim().length} characters`}
                </span>
                {feedbackErrors.message && <span className="cf-error">{feedbackErrors.message}</span>}
              </div>
              <button
                type="submit"
                className="contact-feedback-submit-btn"
                disabled={feedbackSubmitting}
              >
                {feedbackSubmitting ? "Sending…" : (
                  <><Send size={14} strokeWidth={2.5} style={{ marginRight: 7 }} />Send Feedback</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

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
