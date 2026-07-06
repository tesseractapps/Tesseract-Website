import "./RegisterStyles.css";
import SEO from "../../../components/common/SEO";
import { useState } from "react";
import React from "react";
import Alert from "../../../components/ui/alert/Alert";
import { sendEmail, sendTextEmail } from "../../../services/appService";
import { registerEmailTemplate, registerConfirmationEmailTemplate } from "../../../utils/emailTemplates";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, Phone, ShieldCheck, Award, X } from "lucide-react";
import { trackRegisterSCSubmit } from "../../../utils/analytics";

const logo_white = "/svg-logos/white_logo.svg";

// ── Static data ───────────────────────────────────────────────────────────────

const WHAT_YOU_GET = [
  "Task & caseload management - your entire caseload in one connected view",
  "Participant goal tracking - linked to services, not standalone",
  "Service agreement generation with E-Sign - create, send, sign digitally",
  "Automated NDIS invoicing & claims - correct rates, bulk submission",
  "Real-time funding visibility - live dashboards per participant, per category",
  "Incident reporting with full audit trail - NDIS Commission ready",
  "Compliance dashboards - organisational status at a glance",
  "Dedicated onboarding support - we configure it for you",
];

const EARLY_ACCESS_BENEFITS = [
  { label: "3 months free", desc: "Full platform access from day one of launch, no restrictions" },
  { label: "Priority onboarding", desc: "Early registrants are onboarded first" },
  { label: "Launch notification", desc: "Be the first to know when the platform goes live" },
  { label: "Shape the product", desc: "Early registrants can provide feedback during beta" },
];

const TRUST_SIGNALS = [
  { icon: <ShieldCheck size={14} />, text: "Built by TesseractApps - purpose-built NDIS operational infrastructure" },
  { icon: <Award size={14} />, text: "ISO 27001 & ISO 9001 certified" },
  { icon: <ShieldCheck size={14} />, text: "Salesforce native architecture - 99.9% uptime, Australian hosted" },
  { icon: <CheckCircle size={14} />, text: "Trusted by 50+ NDIS providers across Australia" },
  { icon: <Phone size={14} />, text: "1300 252 808 - real humans, local support" },
];

const ROLE_OPTIONS = [
  "Support Coordinator",
  "Plan Manager",
  "Provider Owner",
  "Finance / Admin",
  "Other",
];

const TEAM_SIZE_OPTIONS = [
  "Just me",
  "2-5",
  "6-15",
  "16-60",
  "60+",
];

const CURRENT_SOFTWARE_OPTIONS = [
  "Astalty",
  "CareMaster",
  "SC App",
  "Spreadsheets",
  "Other",
  "None",
];

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organisation: string;
  abn: string;
  role: string;
  teamSize: string;
  currentSoftware: string;
  anythingElse: string;
  marketingConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organisation: "",
  abn: "",
  role: "",
  teamSize: "",
  currentSoftware: "",
  anythingElse: "",
  marketingConsent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Component ─────────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const alertInitialData = { heading: "", text: "", type: "success", isOpen: false };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertData, setAlertData] = useState(alertInitialData);

  const handleClose = () => navigate(-1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { id, value, type } = target;
    const newValue = type === "checkbox" ? target.checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
    if (formErrors[id as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2)
      errors.firstName = "First name must be at least 2 characters";
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2)
      errors.lastName = "Last name must be at least 2 characters";
    if (!formData.email.trim()) errors.email = "Work email is required";
    else if (!EMAIL_RE.test(formData.email.trim())) errors.email = "Enter a valid email address";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.organisation.trim() || formData.organisation.trim().length < 2)
      errors.organisation = "Organisation name must be at least 2 characters";
    if (!formData.role) errors.role = "Please select your role";
    if (!formData.teamSize) errors.teamSize = "Please select a team size";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    trackRegisterSCSubmit({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      teamSize: formData.teamSize,
      currentSoftware: formData.currentSoftware,
    });

    sendTextEmail(
      registerEmailTemplate.email,
      registerEmailTemplate.subject,
      registerEmailTemplate.body({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organisation: formData.organisation,
        abn: formData.abn,
        role: formData.role,
        teamSize: formData.teamSize,
        currentSoftware: formData.currentSoftware,
        anythingElse: formData.anythingElse,
        marketingConsent: formData.marketingConsent,
      })
    )
      .then(() => {
        sendEmail(
          `${formData.firstName} ${formData.lastName}`,
          formData.email,
          registerConfirmationEmailTemplate.subject,
          registerConfirmationEmailTemplate.text(formData.firstName),
          registerConfirmationEmailTemplate.html(formData.firstName)
        ).catch((err) => console.error("Confirmation email error:", err));
        setShowSuccess(true);
      })
      .catch((err) => {
        console.error("Submit error:", err);
        setAlertData({
          ...alertData,
          heading: "Submission Failed",
          text: "There was an error submitting your registration. Please try again.",
          type: "fail",
          isOpen: true,
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div id="reg-page">
      <SEO
        title="Register for Early Access | NDIS Support Coordination Software - TesseractApps"
        description="Register for early access to TesseractApps Support Coordination and get 3 months free when we launch. Purpose-built for NDIS support coordinators."
        canonical="https://tesseractapps.com.au/register-support-coordination"
        noIndex={true}
      />
      <Alert setAlertData={setAlertData} alertData={alertData} />

      <button type="button" id="reg-close-btn" onClick={handleClose} aria-label="Close">
        <X size={18} strokeWidth={2.5} />
      </button>

      {showSuccess ? (
        /* ── Success screen ── */
        <div id="reg-success-screen">
          <div id="reg-success-inner">
            <div id="reg-success-icon">
              <CheckCircle size={64} color="#0c78ba" strokeWidth={1.5} />
            </div>
            <h1 id="reg-success-title">You're In. Welcome to the Early Access List.</h1>
            <p id="reg-success-message">
              Thanks for registering. You've secured 3 months free access to TesseractApps
              Support Coordination when we launch. Here's what happens next:
            </p>
            <div id="reg-success-steps">
              <div className="reg-next-step">
                <div className="reg-next-step-num">1</div>
                <div className="reg-next-step-label">Check your inbox</div>
              </div>
              <div className="reg-next-step-connector" />
              <div className="reg-next-step">
                <div className="reg-next-step-num">2</div>
                <div className="reg-next-step-label">We'll keep you updated</div>
              </div>
              <div className="reg-next-step-connector" />
              <div className="reg-next-step">
                <div className="reg-next-step-num">3</div>
                <div className="reg-next-step-label">Launch notification</div>
              </div>
              <div className="reg-next-step-connector" />
              <div className="reg-next-step">
                <div className="reg-next-step-num">4</div>
                <div className="reg-next-step-label">Priority onboarding</div>
              </div>
            </div>
            <p id="reg-success-share">
              Know another support coordinator who'd want early access? Share this link and help
              them get 3 months free too.
            </p>
            <div id="reg-success-phone">
              <Phone size={15} />
              <span>Have questions? Call <strong>1300 252 808</strong></span>
            </div>
            <button type="button" className="reg-btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        </div>

      ) : (
        <div id="reg-container">

          {/* ── Left panel ── */}
          <div id="reg-left">
            <button
              type="button"
              id="reg-logo-btn"
              onClick={() => navigate("/")}
              aria-label="Go to home page"
            >
              <img src={logo_white} alt="TesseractApps logo" id="reg-logo" />
            </button>

            <div id="reg-left-body">
              <div id="reg-left-label">Coming Soon - Register now and get 3 months free when we launch</div>
              <h1 id="reg-left-heading">Be the First to Access TesseractApps Support Coordination</h1>
              <p id="reg-left-sub">
                We're building the support coordination platform that NDIS providers have been
                asking for - one connected system for caseloads, goals, service agreements,
                invoicing, claims, and compliance. Register today to secure your spot and get
                3 months free when we go live.
              </p>

              <div id="reg-what-you-get">
                <div id="reg-what-label">What You'll Get at Launch</div>
                <ul id="reg-checklist">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="reg-check-item">
                      <span className="reg-check-icon">
                        <CheckCircle size={14} strokeWidth={2.5} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="reg-early-access">
                <div id="reg-early-label">Early Access Benefit</div>
                <p id="reg-early-intro">Register now and receive:</p>
                <div id="reg-early-list">
                  {EARLY_ACCESS_BENEFITS.map((b) => (
                    <div key={b.label} className="reg-early-item">
                      <span className="reg-early-bullet" />
                      <span>
                        <strong>{b.label}</strong> - {b.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/solutions/support-coordination" className="reg-learn-more">
                Learn more about the platform →
              </Link>

              <div id="reg-trust-list">
                {TRUST_SIGNALS.map((t) => (
                  <div key={t.text} className="reg-trust-item">
                    <span className="reg-trust-icon">{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right panel (form) ── */}
          <div id="reg-right">
            <div id="reg-form-scroll">

              <div id="reg-promo-badge">
                EARLY ACCESS OFFER: Register today - Get 3 months free at launch
              </div>

              <div id="reg-form-header">
                <h2 id="reg-form-title">Secure Your Early Access</h2>
                <p id="reg-form-sub">Register now. No upfront payment required. We'll notify you at launch.</p>
              </div>

              <form id="reg-form" onSubmit={handleSubmit} noValidate>
                {/* Name row */}
                <div className="reg-row">
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="firstName">
                      First Name <span className="reg-required">*</span>
                    </label>
                    <input
                      className={"reg-input" + (formErrors.firstName ? " reg-input-error" : "")}
                      id="firstName"
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      autoComplete="given-name"
                    />
                    {formErrors.firstName && <span className="reg-error">{formErrors.firstName}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="lastName">
                      Last Name <span className="reg-required">*</span>
                    </label>
                    <input
                      className={"reg-input" + (formErrors.lastName ? " reg-input-error" : "")}
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      autoComplete="family-name"
                    />
                    {formErrors.lastName && <span className="reg-error">{formErrors.lastName}</span>}
                  </div>
                </div>

                {/* Work Email */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="email">
                    Work Email <span className="reg-required">*</span>
                    <span className="reg-field-note"> Primary contact for launch notification</span>
                  </label>
                  <input
                    className={"reg-input" + (formErrors.email ? " reg-input-error" : "")}
                    id="email"
                    type="email"
                    placeholder="jane@organisation.com.au"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                  {formErrors.email && <span className="reg-error">{formErrors.email}</span>}
                </div>

                {/* Phone */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="phone">
                    Phone Number <span className="reg-required">*</span>
                    <span className="reg-field-note"> Australian format</span>
                  </label>
                  <input
                    className={"reg-input" + (formErrors.phone ? " reg-input-error" : "")}
                    id="phone"
                    type="tel"
                    placeholder="04xx xxx xxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                  />
                  {formErrors.phone && <span className="reg-error">{formErrors.phone}</span>}
                </div>

                {/* Organisation */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="organisation">
                    Organisation Name <span className="reg-required">*</span>
                  </label>
                  <input
                    className={"reg-input" + (formErrors.organisation ? " reg-input-error" : "")}
                    id="organisation"
                    type="text"
                    placeholder="Your organisation name"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    autoComplete="organization"
                  />
                  {formErrors.organisation && <span className="reg-error">{formErrors.organisation}</span>}
                </div>

                {/* ABN */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="abn">
                    ABN <span className="reg-optional">(optional)</span>
                  </label>
                  <input
                    className="reg-input"
                    id="abn"
                    type="text"
                    placeholder="XX XXX XXX XXX"
                    value={formData.abn}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Role + Team Size row */}
                <div className="reg-row">
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="role">
                      Your Role <span className="reg-required">*</span>
                    </label>
                    <select
                      className={"reg-select" + (formErrors.role ? " reg-input-error" : "")}
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select your role</option>
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {formErrors.role && <span className="reg-error">{formErrors.role}</span>}
                  </div>
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="teamSize">
                      Team Size <span className="reg-required">*</span>
                    </label>
                    <select
                      className={"reg-select" + (formErrors.teamSize ? " reg-input-error" : "")}
                      id="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select team size</option>
                      {TEAM_SIZE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {formErrors.teamSize && <span className="reg-error">{formErrors.teamSize}</span>}
                  </div>
                </div>

                {/* Current Software */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="currentSoftware">
                    Current Software <span className="reg-optional">(optional)</span>
                  </label>
                  <select
                    className="reg-select"
                    id="currentSoftware"
                    value={formData.currentSoftware}
                    onChange={handleInputChange}
                  >
                    <option value="">Select current software</option>
                    {CURRENT_SOFTWARE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Anything else */}
                <div className="reg-field">
                  <label className="reg-label" htmlFor="anythingElse">
                    Anything you want us to know? <span className="reg-optional">(optional)</span>
                  </label>
                  <textarea
                    className="reg-textarea"
                    id="anythingElse"
                    placeholder="Tell us about your biggest pain points, what you're hoping for, or any questions..."
                    value={formData.anythingElse}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Marketing consent */}
                <label id="reg-marketing-label">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="reg-checkbox"
                  />
                  <span>
                    Send me updates about the launch and NDIS insights
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  id="reg-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Register for Early Access"}
                </button>
                <p id="reg-submit-note">No upfront payment required. We'll email you when the platform is ready.</p>
              </form>

              <p id="reg-login-note">
                Already a TesseractApps customer? Please{" "}
                <a
                  href="https://tesseractapps.my.site.com/s/login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reg-link"
                >
                  reach out to us directly
                </a>
                {" "}- we'll add Support Coordination when it launches.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Register;
