import "./BookADemo.css";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import { bookADemoFormData } from "../../utils/DummyData";
import logo_small from "../../assets/popup-logo.webp";
import React from "react";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import Alert from "../../components/alert/Alert";
import {
  bookDemoConfirmationEmailTemplate,
  bookDemoEmailTemplate,
} from "../../utils/emailTemplates";
import { useNavigate } from "react-router-dom";
import {
  Users, Heart, Home, Building, Building2,
  User, Stethoscope,
  ChevronRight, CheckCircle, Mail, Phone, Monitor,
} from "lucide-react";
import CalendarPicker from "../../components/bookADemo/CalendarPicker";
import sidebarIllustration from "../../assets/popup-image1.webp";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={24} />,
  Heart: <Heart size={24} />,
  Home: <Home size={24} />,
  Building: <Building size={24} />,
  Building2: <Building2 size={24} />,
  User: <User size={24} />,
  Stethoscope: <Stethoscope size={24} />,
};

type formDataType = {
  organisationType: string;
  staff: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  notes: string;
  schedule: string;
};

const formEmptyData: formDataType = {
  organisationType: "",
  staff: "",
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  notes: "",
  schedule: "",
};

const isLastStep = (step: number) => step === bookADemoFormData.length - 1;
const isFirstStep = (step: number) => step === 0;

const STEP_CONTEXT = [
  { tag: "Step 1 of 3", headline: "Tell us about\nyour organisation", sub: "We'll tailor the demo to your team's specific needs." },
  { tag: "Step 2 of 3", headline: "How big is\nyour team?", sub: "Helps us show the right scale of platform for you." },
  { tag: "Step 3 of 3", headline: "Lock in your\nperfect time", sub: "Pick a slot and we'll send everything straight to your inbox." },
];

const BookADemo = () => {
  const navigate = useNavigate();

  const alertInitialData = { heading: "", text: "", type: "success", isOpen: false };
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(formEmptyData);
  const [alertData, setAlertData] = useState(alertInitialData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormErrors = Partial<Record<keyof formDataType, string>>;
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateLastStep = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.organisationType) errors.organisationType = "Please select your organisation type";
    if (!formData.staff) errors.staff = "Please select your staff size";
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!EMAIL_RE.test(formData.email.trim())) errors.email = "Enter a valid email address";
    if (!formData.companyName.trim()) errors.companyName = "Organisation name is required";
    if (!formData.schedule.trim()) errors.schedule = "Please select a date and time";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClose = () => navigate("/");

  const handleLogoClick = () => navigate("/");

  const isSelected = (id: keyof formDataType, value: string): boolean => {
    const fieldValue = formData[id];
    return typeof fieldValue === "string" && fieldValue === value;
  };

  const handlePrevious = () => {
    if (!isFirstStep(currentStep)) {
      setFormErrors({});
      setCurrentStep((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (isLastStep(currentStep)) return;
    const stepId = bookADemoFormData[currentStep].id as keyof formDataType | undefined;
    if (stepId && !formData[stepId]) {
      setFormErrors({ [stepId]: "Please select an option to continue" });
      return;
    }
    setFormErrors({});
    setCurrentStep((p) => p + 1);
  };

  const handleOptionSelect = (value: string, id: string) => {
    if (!value || !id) return;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: undefined }));
    if (!isLastStep(currentStep)) {
      setCurrentStep((p) => p + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (formErrors[id as keyof formDataType]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (!validateLastStep()) return;
    setIsSubmitting(true);
    window.dataLayer?.push({
      event: "book_demo_form_submit",
      user_data: {
        email: formData.email,
        address: { first_name: formData.firstName, last_name: formData.lastName },
      },
    });

    sendTextEmail(
      bookDemoEmailTemplate.email,
      bookDemoEmailTemplate.subject,
      bookDemoEmailTemplate.body({
        fullName: formData.firstName + " " + formData.lastName,
        email: formData.email,
        phone: "",
        organisation: formData.companyName,
        role: formData.organisationType,
        areas: formData.staff,
        preferredTime: formData.schedule,
      })
    )
      .then(() => {
        confirmationMail();
        setShowSuccess(true);
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
      })
      .finally(() => setIsSubmitting(false));
  };

  const confirmationMail = () => {
    const scheduledDate = new Date(formData.schedule);
    const date = scheduledDate.toLocaleDateString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric" });
    const time = scheduledDate.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
    sendEmail(
      formData.firstName,
      formData.email,
      bookDemoConfirmationEmailTemplate.subject,
      bookDemoConfirmationEmailTemplate.text(formData.firstName, date, time),
      bookDemoConfirmationEmailTemplate.html(formData.firstName, date, time)
    ).catch((error) => console.error("Error sending confirmation email:", error));
  };

  const stepData = bookADemoFormData[currentStep];

  return (
    <div id="bookADemo-page">
      <Alert setAlertData={setAlertData} alertData={alertData} />

      <button type="button" id="dialog-close-btn" onClick={handleClose}>
        ✕ Close
      </button>

      {showSuccess ? (
        <div id="bookADemo-success-screen">
          <div id="bookADemo-success-inner">
            <div id="bookADemo-success-icon">
              <CheckCircle size={64} color="var(--color-primary)" strokeWidth={1.5} />
            </div>
            <div id="bookADemo-success-title">Thank you!</div>
            <div id="bookADemo-success-message">
              Your demo has been successfully booked. Our team will contact you shortly to confirm the details.
            </div>
            <div id="bookADemo-success-actions">
              <button type="button" className="bookADemo-Button" onClick={handleClose}>
                Back to Home
              </button>
            </div>
            <div id="bookADemo-what-next-heading">What happens next?</div>
            <div id="bookADemo-success-steps">
              <div className="bookADemo-next-step">
                <div className="bookADemo-next-step-icon"><Mail size={22} /></div>
                <div className="bookADemo-next-step-label">Check Email</div>
                <div className="bookADemo-next-step-desc">Invite and intro guide sent.</div>
              </div>
              <div className="bookADemo-next-step">
                <div className="bookADemo-next-step-icon"><Phone size={22} /></div>
                <div className="bookADemo-next-step-label">Join Call</div>
                <div className="bookADemo-next-step-desc">Use the link at your time.</div>
              </div>
              <div className="bookADemo-next-step">
                <div className="bookADemo-next-step-icon"><Monitor size={22} /></div>
                <div className="bookADemo-next-step-label">Live Demo</div>
                <div className="bookADemo-next-step-desc">Expert walkthrough of platform.</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="bookADemo-container">

          {/* ── Left Sidebar ── */}
          <div id="bookADemo-sidebar">
            <img
              src={logo_small}
              alt="TesseractApps logo"
              id="bookADemo-navbar-logo"
              onClick={handleLogoClick}
              onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}
              tabIndex={0}
              role="button"
              style={{ cursor: "pointer" }}
            />
            <div id="bookADemo-sidebar-body">
              {/* Step context — changes per step */}
              <div id="bookADemo-sidebar-step-tag">{STEP_CONTEXT[currentStep].tag}</div>
              <div id="bookADemo-sidebar-headline">
                {STEP_CONTEXT[currentStep].headline.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </div>
              <div id="bookADemo-sidebar-sub">{STEP_CONTEXT[currentStep].sub}</div>

              {/* Progress */}
              {/* <div id="bookADemo-progress-track-label">
                <span>Progress</span>
                <span>{progressPct}%</span>
              </div>
              <div id="bookADemo-progress-bar-track">
                <div id="bookADemo-progress-bar-fill" className={`progress-step-${currentStep}`} />
              </div> */}

              <ul id="bookADemo-sidebar-bullets">
                <li>No credit card required</li>
                <li>Full access to all features for 7 days</li>
                <li>Used by 500+ providers across Australia</li>
              </ul>

              <div id="bookADemo-testimonial-card">
                <div id="bookADemo-testimonial-stars">★★★★★</div>
                <div id="bookADemo-testimonial-quote">
                  "TesseractApps saved our admin team over 15 hours a week in billing alone."
                </div>
                <div id="bookADemo-testimonial-author">
                  <div id="bookADemo-testimonial-avatar">OM</div>
                  <div>
                    <div id="bookADemo-testimonial-name">Operations Manager</div>
                    <div id="bookADemo-testimonial-location">Sydney, Australia</div>
                  </div>
                </div>
              </div>

              <button type="button" id="bookADemo-why-link" onClick={() => navigate("/")}>
                Why TesseractApps? <ChevronRight size={14} />
              </button>

              {/* Illustration — lively visual pushed to bottom */}
              <div id="bookADemo-sidebar-illustration">
                <img src={sidebarIllustration} alt="" aria-hidden="true" id="bookADemo-sidebar-illustration-img" />
              </div>
            </div>
          </div>

          {/* ── Right Content ── */}
          <div id="bookADemo-form-section">

            {/* Stepper */}
            <div id="bookADemo-stepper-wrapper">
              <Stepper activeStep={currentStep} alternativeLabel>
                {["Organisation", "Staff Size", "Your Details"].map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>

            {/* Scrollable content */}
            <div id="bookADemo-form-scroll-area">
              <div id="bookADemo-form-question">{stepData.question}</div>
              {stepData.hint && (
                <div id="bookADemo-form-hint">{stepData.hint}</div>
              )}

              {/* Steps 0 & 1 — option cards */}
              {!isLastStep(currentStep) && (
                <>
                  <div id="bookADemo-cards-grid">
                    {stepData.fields.map((field) => {
                      const selected = stepData.id
                        ? isSelected(stepData.id as keyof formDataType, field.value)
                        : false;
                      return (
                        <div
                          key={field.value}
                          className={"bookADemo-option-card" + (selected ? " selected" : "")}
                          onClick={() => handleOptionSelect(field.value, stepData.id ?? "")}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && handleOptionSelect(field.value, stepData.id ?? "")}
                        >
                          <div className="bookADemo-card-radio">
                            <div className={selected ? "bookADemo-radio-dot selected" : "bookADemo-radio-dot"} />
                          </div>
                          {"icon" in field && field.icon && (
                            <div className="bookADemo-card-icon-wrap">
                              {iconMap[field.icon as string]}
                            </div>
                          )}
                          <div className="bookADemo-card-title">{field.displayName}</div>
                          {"description" in field && field.description && (
                            <div className="bookADemo-card-desc">{field.description as string}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {stepData.id && formErrors[stepData.id as keyof formDataType] && (
                    <span className="bk-error bk-error-cards">
                      {formErrors[stepData.id as keyof formDataType]}
                    </span>
                  )}
                </>
              )}

          {/* Step 2 — details + schedule */}
          {isLastStep(currentStep) && (
            <div id="bookADemo-details-layout">
              <div id="bookADemo-details-left">
                <div className="bk-field">
                  <label className="bk-label" htmlFor="firstName">First Name <span className="bk-required">*</span></label>
                  <input className={"bk-input" + (formErrors.firstName ? " bk-input-error" : "")} id="firstName" type="text" placeholder="Jane" value={formData.firstName} onChange={handleInputChange} />
                  {formErrors.firstName && <span className="bk-error">{formErrors.firstName}</span>}
                </div>
                <div className="bk-field">
                  <label className="bk-label" htmlFor="lastName">Last Name <span className="bk-required">*</span></label>
                  <input className={"bk-input" + (formErrors.lastName ? " bk-input-error" : "")} id="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                  {formErrors.lastName && <span className="bk-error">{formErrors.lastName}</span>}
                </div>
                <div className="bk-field">
                  <label className="bk-label" htmlFor="email">Work Email <span className="bk-required">*</span></label>
                  <input className={"bk-input" + (formErrors.email ? " bk-input-error" : "")} id="email" type="email" placeholder="jane@organisation.com" value={formData.email} onChange={handleInputChange} />
                  {formErrors.email && <span className="bk-error">{formErrors.email}</span>}
                </div>
                <div className="bk-field">
                  <label className="bk-label" htmlFor="companyName">Organisation Name <span className="bk-required">*</span></label>
                  <input className={"bk-input" + (formErrors.companyName ? " bk-input-error" : "")} id="companyName" type="text" placeholder="Healthcare Services Inc." value={formData.companyName} onChange={handleInputChange} />
                  {formErrors.companyName && <span className="bk-error">{formErrors.companyName}</span>}
                </div>
                <div className="bk-field">
                  <label className="bk-label" htmlFor="notes">Anything else? <span className="bk-optional">(optional)</span></label>
                  <textarea className="bk-input bk-textarea" id="notes" placeholder="Specific features you'd like to see..." rows={3} value={formData.notes} onChange={handleInputChange} />
                </div>
                <div id="bookADemo-social-proof">
                  <div id="bookADemo-social-proof-text">
                    Join <strong>500+ professionals</strong> who upgraded their workflow this month.
                  </div>
                </div>
              </div>
              <div id="bookADemo-details-right">
                <div className="bookADemo-details-section-label">Select Preferred Date &amp; Time</div>
                <CalendarPicker
                  onChange={(iso) => {
                    setFormData((prev) => ({ ...prev, schedule: iso }));
                    if (iso) setFormErrors((prev) => ({ ...prev, schedule: undefined }));
                  }}
                />
                {formErrors.schedule && <span className="bk-error">{formErrors.schedule}</span>}
              </div>
            </div>
          )}
            </div>

            {/* Footer */}
            <div id="bookADemo-Buttons-Container">
              <button
                type="button"
                className="bookADemo-Button-alt"
                onClick={handlePrevious}
                disabled={isFirstStep(currentStep)}
              >
                ← Back
              </button>

              {isLastStep(currentStep) ? (
                <button
                  type="submit"
                  className="bookADemo-Button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting…" : "Book Demo ✓"}
                </button>
              ) : (
                <button
                  type="button"
                  className="bookADemo-Button"
                  onClick={handleNext}
                >
                  Continue <ChevronRight size={15} className="bookADemo-btn-icon" />
                </button>
              )}

              {/* <button type="button" className="bookADemo-cancel-link" onClick={handleClose}>
                Cancel
              </button> */}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BookADemo;
