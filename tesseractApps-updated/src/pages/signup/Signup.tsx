import "./Signup.css";
import { useState } from "react";
import React from "react";
import Alert from "../../components/alert/Alert";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import logo_small from "../../assets/popup-logo.webp";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import {
  signupConfirmationEmailTemplate,
  signupEmaiTemplate,
} from "../../utils/emailTemplates";
import { useNavigate } from "react-router-dom";
import {
  Users, Heart, Home, Stethoscope,
  ChevronRight, CheckCircle, Phone, BookOpen,
  ShieldCheck, Clock, Star,
} from "lucide-react";

/* ── Icon map for industry cards ── */
const iconMap: Record<string, React.ReactNode> = {
  Users:       <Users size={24} />,
  Heart:       <Heart size={24} />,
  Home:        <Home size={24} />,
  Stethoscope: <Stethoscope size={24} />,
};

/* ── Types ── */
type FormData = {
  abn: string;
  companyName: string;
  industry: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  termsAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  abn: "",
  companyName: "",
  industry: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  termsAccepted: false,
};

/* ── Industry options ── */
const INDUSTRY_OPTIONS = [
  { value: "NDIS Provider",         icon: "Users",       desc: "Registered NDIS service providers" },
  { value: "Support Coordination",  icon: "Heart",       desc: "Support coordinators & LAC providers" },
  { value: "Allied Health",         icon: "Stethoscope", desc: "OT, physio, speech & allied clinicians" },
  { value: "SIL",                   icon: "Home",        desc: "Supported Independent Living providers" },
];

/* ── Service pathway steps (sidebar) ── */
const PATHWAY_STEPS = [
  "Client intake & onboarding",
  "NDIS plan management",
  "Support coordination",
  "Service agreements & consent",
  "Shift scheduling & rostering",
  "Progress notes & care plans",
  "Incident reporting",
  "Invoice generation & bulk billing",
  "PRODA / PACE claiming",
  "Funding tracking & budgets",
  "Compliance & audit trails",
  "Reporting & analytics",
  "Staff credentialing & compliance",
];

/* ── Step context for sidebar ── */
const STEP_CONTEXT = [
  {
    tag: "Step 1 of 3",
    headline: "Verify your\norganisation",
    sub: "Enter your ABN and company details to get started.",
  },
  {
    tag: "Step 2 of 3",
    headline: "Your contact\ndetails",
    sub: "So we know who to set up in the platform.",
  },
  {
    tag: "Step 3 of 3",
    headline: "Review &\nconfirm",
    sub: "Check your details before we activate your access.",
  },
];

const TOTAL_STEPS = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ABN_RE = /^\d{11}$/;

const Signup = () => {
  const navigate = useNavigate();

  const alertInitialData = { heading: "", text: "", type: "success", isOpen: false };
  const [activeStep, setActiveStep]       = useState(0);
  const [formData, setFormData]           = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors]       = useState<FormErrors>({});
  const [showSuccess, setShowSuccess]     = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [alertData, setAlertData]         = useState(alertInitialData);

  const handleClose = () => navigate("/");

  /* ── Validation per step ── */
  const validateStep = (step: number): boolean => {
    const errors: FormErrors = {};
    if (step === 0) {
      const abn = formData.abn.replace(/\s/g, "");
      if (!abn) errors.abn = "ABN is required";
      else if (!ABN_RE.test(abn)) errors.abn = "ABN must be 11 digits";
      if (!formData.companyName.trim()) errors.companyName = "Company name is required";
      if (!formData.industry) errors.industry = "Please select your industry";
    } else if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) errors.email = "Work email is required";
      else if (!EMAIL_RE.test(formData.email.trim())) errors.email = "Enter a valid email address";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
    } else if (step === 2) {
      if (!formData.termsAccepted) errors.termsAccepted = "You must accept the terms to continue";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    setFormErrors({});
    setActiveStep((p) => p + 1);
  };

  const handleBack = () => {
    setFormErrors({});
    setActiveStep((p) => p - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
    if (formErrors[id as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleIndustrySelect = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value }));
    setFormErrors((prev) => ({ ...prev, industry: undefined }));
  };

  const handleSubmit = () => {
    if (!validateStep(2)) return;
    setIsSubmitting(true);
    window.dataLayer?.push({
      event: "begin_journey_form_submit",
      user_data: {
        email: formData.email,
        phone_number: formData.phone,
        address: { first_name: formData.firstName, last_name: formData.lastName },
      },
    });
    sendTextEmail(
      signupEmaiTemplate.email,
      signupEmaiTemplate.subject,
      signupEmaiTemplate.body({
        firstName:    formData.firstName,
        lastName:     formData.lastName,
        phone:        formData.phone,
        email:        formData.email,
        company:      formData.companyName,
        abn:          formData.abn,
        industry:     formData.industry,
        features:     "",
        otherFeature: "",
        preference:   "",
      })
    )
      .then(() => {
        sendEmail(
          formData.firstName + " " + formData.lastName,
          formData.email,
          signupConfirmationEmailTemplate.subject,
          signupConfirmationEmailTemplate.text(formData.firstName),
          signupConfirmationEmailTemplate.html(formData.firstName)
        ).catch((err) => console.error("Confirmation email error:", err));
        setShowSuccess(true);
      })
      .catch((err) => {
        console.error("Submit error:", err);
        setAlertData({
          ...alertData,
          heading: "Request Failed",
          text: "There was an error submitting your request. Please try again.",
          type: "fail",
          isOpen: true,
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const ctx = STEP_CONTEXT[activeStep];

  return (
    <div id="signup-page">
      <Alert setAlertData={setAlertData} alertData={alertData} />

      <button type="button" id="signup-close-btn" onClick={handleClose}>
        ✕ Close
      </button>

      {showSuccess ? (
        /* ── Success Screen ── */
        <div id="signup-success-screen">
          <div id="signup-success-inner">
            <div id="signup-success-icon">
              <CheckCircle size={64} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
            <div id="signup-success-title">You're all set!</div>
            <div id="signup-success-message">
              Your account is being activated. Our team will send your login credentials to{" "}
              <strong>{formData.email}</strong> within 1 business day.
            </div>
            <div id="signup-success-phone">
              Need help? Call us on <strong>1300 252 808</strong>
            </div>
            <div id="signup-success-actions">
              <button type="button" className="signup-btn-primary" onClick={handleClose}>
                Back to Home
              </button>
            </div>
            <div id="signup-what-next-heading">What happens next?</div>
            <div id="signup-success-steps">
              <div className="signup-next-step">
                <div className="signup-next-step-icon"><CheckCircle size={22} /></div>
                <div className="signup-next-step-label">Account Created</div>
                <div className="signup-next-step-desc">Your profile is set up instantly</div>
              </div>
              <div className="signup-next-step">
                <div className="signup-next-step-icon"><Phone size={22} /></div>
                <div className="signup-next-step-label">Onboarding Call</div>
                <div className="signup-next-step-desc">We'll walk you through setup</div>
              </div>
              <div className="signup-next-step">
                <div className="signup-next-step-icon"><BookOpen size={22} /></div>
                <div className="signup-next-step-label">Go Live</div>
                <div className="signup-next-step-desc">Start managing your services</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="signup-container">

          {/* ── Left Sidebar ── */}
          <div id="signup-sidebar">
            <button
              type="button"
              id="signup-navbar-logo-btn"
              onClick={() => navigate("/")}
              aria-label="Go to home page"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <img
                src={logo_small}
                alt="TesseractApps logo"
                id="signup-navbar-logo"
              />
            </button>
            <div id="signup-sidebar-body">
              {/* Step context */}
              <div id="signup-sidebar-step-tag">{ctx.tag}</div>
              <div id="signup-sidebar-headline">
                {ctx.headline.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </div>
              <div id="signup-sidebar-sub">{ctx.sub}</div>

              {/* Trust badges */}
              <div id="signup-trust-badges">
                <div className="signup-trust-badge">
                  <ShieldCheck size={15} className="signup-trust-badge-icon" />
                  <span>No credit card required</span>
                </div>
                <div className="signup-trust-badge">
                  <Clock size={15} className="signup-trust-badge-icon" />
                  <span>7-Day Full Access</span>
                </div>
                <div className="signup-trust-badge">
                  <Star size={15} className="signup-trust-badge-icon" />
                  <span>Trusted by 500+ providers</span>
                </div>
              </div>

              {/* Service Pathway */}
              <div id="signup-pathway-heading">Your Service Pathway</div>
              <ul id="signup-pathway-list">
                {PATHWAY_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>

              {/* Help section */}
              <div id="signup-sidebar-help">
                <div id="signup-sidebar-help-title">Need help?</div>
                <div id="signup-sidebar-help-text">
                  Our team is available Mon – Fri, 9:00AM – 5:30PM AEST.
                </div>
                <a href="tel:1300252808" id="signup-sidebar-help-btn">
                  <Phone size={13} />
                  <span>1300 252 808</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Content ── */}
          <div id="signup-form-section">

            {/* Stepper */}
            <div id="signup-stepper-wrapper">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {["Company Verification", "Personal Details", "Review & Confirm"].map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </div>

            {/* Scrollable area */}
            <div id="signup-form-scroll-area">

              {/* ── Step 0: Company Verification ── */}
              {activeStep === 0 && (
                <div id="signup-step0">
                  <div className="signup-form-question">Tell us about your organisation</div>
                  <div className="signup-form-hint">We use your ABN to verify your business.</div>

                  <div id="signup-abn-row">
                    <div className="su-field">
                      <label className="su-label" htmlFor="abn">
                        ABN <span className="su-required">*</span>
                      </label>
                      <input
                        className={"su-input" + (formErrors.abn ? " su-input-error" : "")}
                        id="abn"
                        type="text"
                        placeholder="e.g. 12 345 678 901"
                        value={formData.abn}
                        onChange={handleInputChange}
                      />
                      {formErrors.abn && <span className="su-error">{formErrors.abn}</span>}
                    </div>
                    <div className="su-field">
                      <label className="su-label" htmlFor="companyName">
                        Company Name <span className="su-required">*</span>
                      </label>
                      <input
                        className={"su-input" + (formErrors.companyName ? " su-input-error" : "")}
                        id="companyName"
                        type="text"
                        placeholder="Your organisation name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                      {formErrors.companyName && <span className="su-error">{formErrors.companyName}</span>}
                    </div>
                  </div>

                  <div className="su-field su-field-industry">
                    <label className="su-label">
                      Industry <span className="su-required">*</span>
                    </label>
                    <div id="signup-industry-grid">
                      {INDUSTRY_OPTIONS.map((opt) => {
                        const selected = formData.industry === opt.value;
                        return (
                          <div
                            key={opt.value}
                            className={"signup-option-card" + (selected ? " selected" : "")}
                            onClick={() => handleIndustrySelect(opt.value)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handleIndustrySelect(opt.value)}
                          >
                            <div className="signup-card-radio">
                              <div className={"signup-radio-dot" + (selected ? " selected" : "")} />
                            </div>
                            <div className="signup-card-icon-wrap">
                              {iconMap[opt.icon]}
                            </div>
                            <div className="signup-card-title">{opt.value}</div>
                            <div className="signup-card-desc">{opt.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                    {formErrors.industry && (
                      <span className="su-error su-error-cards">{formErrors.industry}</span>
                    )}
                  </div>
                </div>
              )}

              {/* ── Step 1: Personal Details ── */}
              {activeStep === 1 && (
                <div id="signup-step1">
                  <div className="signup-form-question">Your contact details</div>
                  <div className="signup-form-hint">
                    We'll use these to set up your account and send login credentials.
                  </div>

                  <div id="signup-name-row">
                    <div className="su-field">
                      <label className="su-label" htmlFor="firstName">
                        First Name <span className="su-required">*</span>
                      </label>
                      <input
                        className={"su-input" + (formErrors.firstName ? " su-input-error" : "")}
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {formErrors.firstName && <span className="su-error">{formErrors.firstName}</span>}
                    </div>
                    <div className="su-field">
                      <label className="su-label" htmlFor="lastName">
                        Last Name <span className="su-required">*</span>
                      </label>
                      <input
                        className={"su-input" + (formErrors.lastName ? " su-input-error" : "")}
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {formErrors.lastName && <span className="su-error">{formErrors.lastName}</span>}
                    </div>
                  </div>

                  <div className="su-field">
                    <label className="su-label" htmlFor="email">
                      Work Email <span className="su-required">*</span>
                    </label>
                    <input
                      className={"su-input" + (formErrors.email ? " su-input-error" : "")}
                      id="email"
                      type="email"
                      placeholder="jane@organisation.com.au"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <span className="su-error">{formErrors.email}</span>}
                  </div>

                  <div className="su-field">
                    <label className="su-label" htmlFor="phone">
                      Phone Number <span className="su-required">*</span>
                    </label>
                    <input
                      className={"su-input" + (formErrors.phone ? " su-input-error" : "")}
                      id="phone"
                      type="tel"
                      placeholder="04xx xxx xxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {formErrors.phone && <span className="su-error">{formErrors.phone}</span>}
                  </div>
                </div>
              )}

              {/* ── Step 2: Review & Confirm ── */}
              {activeStep === 2 && (
                <div id="signup-step2">
                  <div className="signup-form-question">Review your details</div>
                  <div className="signup-form-hint">
                    Please check everything looks correct before we activate your access.
                  </div>

                  <div id="signup-review-grid">
                    {/* Company block */}
                    <div className="signup-review-block">
                      <div className="signup-review-block-title">Organisation</div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">Company</span>
                        <span className="signup-review-val">{formData.companyName || "—"}</span>
                      </div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">ABN</span>
                        <span className="signup-review-val">{formData.abn || "—"}</span>
                      </div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">Industry</span>
                        <span className="signup-review-val">{formData.industry || "—"}</span>
                      </div>
                    </div>

                    {/* Contact block */}
                    <div className="signup-review-block">
                      <div className="signup-review-block-title">Contact</div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">Name</span>
                        <span className="signup-review-val">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">Email</span>
                        <span className="signup-review-val">{formData.email || "—"}</span>
                      </div>
                      <div className="signup-review-row">
                        <span className="signup-review-key">Phone</span>
                        <span className="signup-review-val">{formData.phone || "—"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <label id="signup-terms-label">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="signup-terms-checkbox"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="/terms-and-Conditions" target="_blank" className="signup-terms-link">Terms of Service</a>
                      {" "}and{" "}
                      <a href="/privacy-policy" target="_blank" className="signup-terms-link">Privacy Policy</a>
                    </span>
                  </label>
                  {formErrors.termsAccepted && (
                    <span className="su-error su-error-terms">
                      {formErrors.termsAccepted}
                    </span>
                  )}
                </div>
              )}

            </div>

            {/* Footer */}
            <div id="signup-buttons-container">
              <button
                type="button"
                className="signup-btn-secondary"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                ← Back
              </button>

              {activeStep < TOTAL_STEPS - 1 ? (
                <button type="button" className="signup-btn-primary" onClick={handleNext}>
                  Continue <ChevronRight size={15} style={{ verticalAlign: "middle", marginLeft: 2 }} />
                </button>
              ) : (
                <button
                  type="button"
                  className="signup-btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Activating…" : "Confirm & Submit ✓"}
                </button>
              )}

              {/* <button type="button" className="signup-cancel-link" onClick={handleClose}>
                Cancel
              </button> */}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
