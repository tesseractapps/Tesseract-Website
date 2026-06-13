import "./AdelaideExpo2026Styles.css";
import { useState, useRef } from "react";
import position1 from "../../../assets/position-1.svg";
import position2 from "../../../assets/position-2.svg";
import position3 from "../../../assets/position-3.svg";
import SEO from "../../../components/common/SEO";
import Alert from "../../../components/ui/alert/Alert";
import { sendEmail, sendTextEmail } from "../../../services/appService";
import {
  adelaideExpoEmailTemplate,
  adelaideExpoConfirmationEmailTemplate,
} from "../../../utils/emailTemplates";
import { trackAdelaideExpoSubmit } from "../../../utils/analytics";
import {
  CheckCircle,
  Monitor,
  BarChart2,
  FileText,
  ShieldCheck,
  Trophy,
  MapPin,
  Calendar,
  Mail,
  Store,
} from "lucide-react";

// ── Static data ───────────────────────────────────────────────────────────────

const SESSIONS = [
  {
    icon: <Monitor size={22} />,
    title: "Live Platform Demo",
    desc: "See TesseractApps in action with a live walkthrough of core features",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Provider Maturity Review",
    desc: "Understand how our platform helps providers mature and scale operations",
  },
  {
    icon: <FileText size={22} />,
    title: "SCHADS Walkthrough",
    desc: "Deep dive into SCHADS compliance and automated interpretation",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Continuous Compliance Preview",
    desc: "Discover how we keep your organisation compliant with evolving regulations",
  },
];

const PRIZES = [
  {
    place: "Three winners. One surprise. Register now to be in the draw.",
    value: "Win free access to TesseractApps, plus a Surprise Prize.",
    detail:
      "Condition: By registering and completing a TesseractApps demo between 12–30 June 2026, your organisation will be entered into the TesseractApps Adelaide Expo Prize draw for a chance to win complimentary platform access. Winners will be selected by random draw and notified on 1 July 2026. Full terms apply.",
    icon1: position1,
    icon2: position2,
    icon3: position3,
  },
  // {
  //   place: "2nd Prize",
  //   value: "6 months free",
  //   detail: "Full platform access at no cost for 6 months.",
  //   icon: position2,
  // },
  // {
  //   place: "3rd Prize",
  //   value: "3 months free",
  //   detail: "Full platform access at no cost for 3 months.",
  //   icon: position3,
  // },
];

const ROLE_OPTIONS = [
  "Owner/Director",
  "Manager",
  "Coordinator",
  "Support Worker",
  "Admin",
  "Other",
];

const TEAM_SIZE_OPTIONS = ["1–5", "6–20", "21–50", "51–120", "120+"];

const PROVIDER_TYPE_OPTIONS = [
  "SIL",
  "Community Access",
  "Day Programs",
  "Plan Management",
  "Support Coordination",
  "Therapy",
  "Other",
];

const CURRENT_SYSTEMS_OPTIONS = [
  "Caremaster",
  "Lumary",
  "ShiftCare",
  "Astalty",
  "Flowlogic",
  "Spreadsheets / Manual",
  "Other",
  "None",
];

const HEAR_ABOUT_OPTIONS = [
  "LinkedIn",
  "Facebook",
  "Instagram",
  "TikTok",
  "Email",
  "Blog",
  "Partner",
  "Other",
];

const ATTEND_DAY_OPTIONS = [
  { id: "friday", label: "Friday 26 June" },
  { id: "saturday", label: "Saturday 27 June" },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  teamSize: string;
  providerType: string;
  attendDays: string[];
  currentSystems: string;
  hearAbout: string;
  commsConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  role: "",
  teamSize: "",
  providerType: "",
  attendDays: [],
  currentSystems: "",
  hearAbout: "",
  commsConsent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Google Calendar URL ───────────────────────────────────────────────────────

const GCal_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Adelaide+Disability+%26+WorkAbility+Expo+2026" +
  "&dates=20260626T090000/20260627T150000" +
  "&details=TesseractApps+Booth+8+-+Register+%26+Win+12+Months+Free" +
  "&location=Adelaide+Showground%2C+Leader+Street%2C+Wayville+SA+5034";

// ── Component ─────────────────────────────────────────────────────────────────

const AdelaideExpo2026 = () => {
  const formRef = useRef<HTMLElement>(null);
  const alertInitialData = {
    heading: "",
    text: "",
    type: "success",
    isOpen: false,
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertData, setAlertData] = useState(alertInitialData);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { id, value, type } = target;
    const newValue = type === "checkbox" ? target.checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
    if (formErrors[id as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleDayToggle = (dayId: string) => {
    setFormData((prev) => {
      const days = prev.attendDays.includes(dayId)
        ? prev.attendDays.filter((d) => d !== dayId)
        : [...prev.attendDays, dayId];
      return { ...prev, attendDays: days };
    });
    if (formErrors.attendDays) {
      setFormErrors((prev) => ({ ...prev, attendDays: undefined }));
    }
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email address is required";
    else if (!EMAIL_RE.test(formData.email.trim()))
      errors.email = "Enter a valid email address";
    if (!formData.organisation.trim())
      errors.organisation = "Organisation name is required";
    if (!formData.role) errors.role = "Please select your role";
    if (!formData.teamSize) errors.teamSize = "Please select your team size";
    if (formData.attendDays.length === 0)
      errors.attendDays = "Please select at least one day";
    if (!formData.commsConsent)
      errors.commsConsent =
        "You must agree to receive communications to register";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    const firstName =
      formData.fullName.trim().split(" ")[0] ?? formData.fullName.trim();

    trackAdelaideExpoSubmit({
      email: formData.email,
      fullName: formData.fullName,
      organisation: formData.organisation,
      role: formData.role,
    });

    sendTextEmail(
      adelaideExpoEmailTemplate.email,
      adelaideExpoEmailTemplate.subject,
      adelaideExpoEmailTemplate.body(formData),
    )
      .then(() => {
        sendEmail(
          formData.fullName,
          formData.email,
          adelaideExpoConfirmationEmailTemplate.subject(firstName),
          adelaideExpoConfirmationEmailTemplate.text(firstName),
          adelaideExpoConfirmationEmailTemplate.html(firstName),
        ).catch((err) => console.error("Confirmation email error:", err));
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // ── Success screen ────────────────────────────────────────────────────────

  if (showSuccess) {
    return (
      <div id="expo-page">
        <SEO
          title="Registered | Adelaide Expo 2026 – TesseractApps"
          description="You're registered for the Adelaide Disability & WorkAbility Expo 2026 with TesseractApps."
          canonical="https://tesseractapps.com.au/events/adelaide-expo-2026"
          noIndex={true}
        />
        <div id="expo-success-screen">
          <div id="expo-success-inner">
            <div id="expo-success-icon">
              <CheckCircle
                size={64}
                color="var(--color-primary)"
                strokeWidth={1.5}
              />
            </div>
            <h1 id="expo-success-title">You're registered!</h1>
            <p id="expo-success-message">
              Check your email for confirmation and your Expo entry details.
            </p>
            <div id="expo-success-event-card">
              <div className="expo-success-detail">
                <Calendar size={16} />
                <span>
                  Friday 26 June &amp; Saturday 27 June 2026 · 9am – 3pm
                </span>
              </div>
              <div className="expo-success-detail">
                <MapPin size={16} />
                <span>
                  Adelaide Showground, Leader Street, Wayville SA 5034 · Booth 8
                </span>
              </div>
              <div className="expo-success-detail">
                <Trophy size={16} />
                <span>Your registration includes one prize draw entry.</span>
              </div>
            </div>
            <div id="expo-success-actions">
              <a
                href={GCal_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="expo-btn-primary"
              >
                Add to Google Calendar
              </a>
              <a href="/" className="expo-btn-outline">
                Back to Home
              </a>
            </div>
            <p id="expo-success-contact">
              Questions? Email us at{" "}
              <a href="mailto:marketing@tesseractapps.com">
                marketing@tesseractapps.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main page ─────────────────────────────────────────────────────────────

  return (
    <div id="expo-page">
      <SEO
        title="Adelaide Disability & WorkAbility Expo 2026 | Register & Win – TesseractApps"
        description="Register for the Adelaide Disability & WorkAbility Expo 2026 with TesseractApps (Booth 8). Book your free demo, enter our giveaway for 12 months free, and see our NDIS platform in action."
        canonical="https://tesseractapps.com.au/events/adelaide-expo-2026"
        noIndex={false}
      />
      <Alert setAlertData={setAlertData} alertData={alertData} />

      {/* ── Hero ── */}
      <section id="expo-hero">
        <div className="expo-outer">
          <div id="expo-hero-label">Live Event · Adelaide · June 2026</div>
          <h1 id="expo-hero-heading">
            Adelaide Disability &amp; <br />
            WorkAbility Expo 2026
          </h1>
          <div id="expo-hero-meta">
            <span className="expo-hero-meta-item">
              <Calendar size={15} />
              Friday 26 &amp; Saturday 27 June 2026
            </span>
            <span className="expo-hero-meta-sep">·</span>
            <span className="expo-hero-meta-item">
              <MapPin size={15} />
              Adelaide Showground
            </span>
            <span className="expo-hero-meta-sep">·</span>
            <span className="expo-hero-meta-item">Booth 8</span>
          </div>
          <div id="expo-hero-actions">
            <button
              type="button"
              className="primary-cta"
              onClick={scrollToForm}
            >
              Register &amp; Enter Prize Draw
            </button>
            <a href="/book-a-demo" className="outline-cta">
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* ── Prize Bar ── */}
      <section id="expo-prize-bar">
        <div className="expo-outer">
          <div id="expo-prize-grid">
            {PRIZES.map((p, i) => (
              <div
                key={p.place}
                className={`expo-prize-card expo-prize-card--${i + 1}`}
              >
                <div>
                  <img
                    src={p.icon1}
                    alt={p.place}
                    className="expo-prize-icon"
                  />
                  <img
                    src={p.icon2}
                    alt={p.place}
                    className="expo-prize-icon"
                  />
                  <img
                    src={p.icon3}
                    alt={p.place}
                    className="expo-prize-icon"
                  />
                </div>
                <div className="expo-prize-place">{p.place}</div>
                <div className="expo-prize-value">{p.value}</div>
                <div className="expo-prize-detail">{p.detail}</div>
              </div>
            ))}
          </div>
          {/* <div id="expo-prize-bar-eyebrow">
            <button type="button" className="primary-cta" onClick={scrollToForm}>
              Fill this form to enter <Trophy size={16} />
            </button>
          </div> */}
        </div>
      </section>

      {/* ── What You'll See ── */}
      <section id="expo-sessions">
        <div className="expo-outer">
          <div className="expo-section-label">At Our Stand</div>
          <h2 className="expo-section-heading">What You'll See</h2>
          <p className="expo-section-sub">
            Four focused sessions designed to showcase the capabilities that
            make TesseractApps the all-in-one platform for NDIS providers.
          </p>
          <div id="expo-sessions-grid">
            {SESSIONS.map((s) => (
              <div key={s.title} className="expo-session-card">
                <div className="expo-session-icon">{s.icon}</div>
                <div className="expo-session-title">{s.title}</div>
                <div className="expo-session-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <p id="expo-sessions-note">
            Each session runs throughout both days. Visit our stand to attend
            any combination of sessions.
          </p>
        </div>
      </section>

      {/* ── Registration Form ── */}
      <section id="expo-form-section" ref={formRef}>
        <div className="expo-outer expo-outer--narrow">
          <div className="expo-section-label">
            Giveaway Entry + Registration
          </div>
          <h2 className="expo-section-heading">
            Register &amp; Win 12 Months Free
          </h2>
          <p className="expo-section-sub">
            Complete this form to confirm your attendance and enter the prize
            draw. One entry per registration.
          </p>

          <form id="expo-form" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="expo-field">
              <label className="expo-label" htmlFor="fullName">
                Full Name <span className="expo-required">*</span>
              </label>
              <input
                className={
                  "expo-input" +
                  (formErrors.fullName ? " expo-input-error" : "")
                }
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                autoComplete="name"
              />
              {formErrors.fullName && (
                <span className="expo-error">{formErrors.fullName}</span>
              )}
            </div>

            {/* Email + Phone row */}
            <div className="expo-row">
              <div className="expo-field">
                <label className="expo-label" htmlFor="email">
                  Email Address <span className="expo-required">*</span>
                </label>
                <input
                  className={
                    "expo-input" + (formErrors.email ? " expo-input-error" : "")
                  }
                  id="email"
                  type="email"
                  placeholder="jane@organisation.com.au"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
                {formErrors.email && (
                  <span className="expo-error">{formErrors.email}</span>
                )}
              </div>
              <div className="expo-field">
                <label className="expo-label" htmlFor="phone">
                  Phone Number <span className="expo-optional">(optional)</span>
                </label>
                <input
                  className="expo-input"
                  id="phone"
                  type="tel"
                  placeholder="04xx xxx xxx"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Organisation */}
            <div className="expo-field">
              <label className="expo-label" htmlFor="organisation">
                Organisation Name <span className="expo-required">*</span>
              </label>
              <input
                className={
                  "expo-input" +
                  (formErrors.organisation ? " expo-input-error" : "")
                }
                id="organisation"
                type="text"
                placeholder="Your organisation name"
                value={formData.organisation}
                onChange={handleInputChange}
                autoComplete="organization"
              />
              {formErrors.organisation && (
                <span className="expo-error">{formErrors.organisation}</span>
              )}
            </div>

            {/* Role + Team Size row */}
            <div className="expo-row">
              <div className="expo-field">
                <label className="expo-label" htmlFor="role">
                  Your Role <span className="expo-required">*</span>
                </label>
                <select
                  className={
                    "expo-select" + (formErrors.role ? " expo-input-error" : "")
                  }
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {formErrors.role && (
                  <span className="expo-error">{formErrors.role}</span>
                )}
              </div>
              <div className="expo-field">
                <label className="expo-label" htmlFor="teamSize">
                  Team Size <span className="expo-required">*</span>
                </label>
                <select
                  className={
                    "expo-select" +
                    (formErrors.teamSize ? " expo-input-error" : "")
                  }
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select team size
                  </option>
                  {TEAM_SIZE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {formErrors.teamSize && (
                  <span className="expo-error">{formErrors.teamSize}</span>
                )}
              </div>
            </div>

            {/* Provider Type */}
            <div className="expo-field">
              <label className="expo-label" htmlFor="providerType">
                Provider Type <span className="expo-optional">(optional)</span>
              </label>
              <select
                className="expo-select"
                id="providerType"
                value={formData.providerType}
                onChange={handleInputChange}
              >
                <option value="">Select provider type</option>
                {PROVIDER_TYPE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Which day */}
            <div className="expo-field">
              <span className="expo-label">
                Which day will you attend?{" "}
                <span className="expo-required">*</span>
              </span>
              <div id="expo-day-group">
                {ATTEND_DAY_OPTIONS.map((d) => (
                  <label
                    key={d.id}
                    className={
                      "expo-day-option" +
                      (formData.attendDays.includes(d.id)
                        ? " expo-day-option--checked"
                        : "")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={formData.attendDays.includes(d.id)}
                      onChange={() => handleDayToggle(d.id)}
                      className="expo-day-checkbox"
                    />
                    {d.label}
                  </label>
                ))}
              </div>
              {formErrors.attendDays && (
                <span className="expo-error">{formErrors.attendDays}</span>
              )}
            </div>

            {/* Current systems + Hear about row */}
            <div className="expo-row">
              <div className="expo-field">
                <label className="expo-label" htmlFor="currentSystems">
                  Current Systems Used{" "}
                  <span className="expo-optional">(optional)</span>
                </label>
                <select
                  className="expo-select"
                  id="currentSystems"
                  value={formData.currentSystems}
                  onChange={handleInputChange}
                >
                  <option value="">Select current system</option>
                  {CURRENT_SYSTEMS_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="expo-field">
                <label className="expo-label" htmlFor="hearAbout">
                  How did you hear about us?{" "}
                  <span className="expo-optional">(optional)</span>
                </label>
                <select
                  className="expo-select"
                  id="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleInputChange}
                >
                  <option value="">Select an option</option>
                  {HEAR_ABOUT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comms consent */}
            <label
              id="expo-consent-label"
              className={formErrors.commsConsent ? "expo-consent-error" : ""}
            >
              <input
                type="checkbox"
                id="commsConsent"
                checked={formData.commsConsent}
                onChange={handleInputChange}
                className="expo-checkbox"
              />
              <span>
                I agree to receive communications from TesseractApps about this
                event and related updates.{" "}
                <span className="expo-required">*</span>
              </span>
            </label>
            {formErrors.commsConsent && (
              <span className="expo-error expo-error-consent">
                {formErrors.commsConsent}
              </span>
            )}

            <button type="submit" id="expo-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Register & Enter Prize Draw"}
            </button>
            <p id="expo-submit-note">
              Your registration automatically includes one prize draw entry.
            </p>
          </form>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section id="expo-trust-bar">
        <div className="expo-outer">
          <div id="expo-trust-logos">
            <div className="expo-trust-badge">
              <ShieldCheck size={18} />
              <span>ISO 27001</span>
            </div>
            <div className="expo-trust-divider" />
            <div className="expo-trust-badge">
              <CheckCircle size={18} />
              <span>ISO 9001</span>
            </div>
            <div className="expo-trust-divider" />
            <div className="expo-trust-badge">
              <span className="expo-trust-uptime">99.9%</span>
              <span>Uptime</span>
            </div>
          </div>
          <p id="expo-trust-tagline">
            Trusted by NDIS providers across Australia.
          </p>
        </div>
      </section>

      {/* ── Event Details ── */}
      <section id="expo-event-details">
        <div className="expo-outer">
          {/* Top: heading + info cards */}
          <div id="expo-details-top">
            <div id="expo-details-heading-col">
              <div className="expo-section-label">Find Us</div>
              <h2 className="expo-section-heading">Event Details</h2>
            </div>
            <div id="expo-details-cards">
              <div className="expo-detail-card">
                <div className="expo-detail-card-icon">
                  <Calendar size={18} />
                </div>
                <div className="expo-detail-card-label">Dates</div>
                <div className="expo-detail-card-value">
                  Fri 26 &amp; Sat 27 June 2026
                </div>
                <div className="expo-detail-card-sub">9am – 3pm each day</div>
              </div>
              <div className="expo-detail-card">
                <div className="expo-detail-card-icon">
                  <MapPin size={18} />
                </div>
                <div className="expo-detail-card-label">Venue</div>
                <div className="expo-detail-card-value">
                  Adelaide Showground
                </div>
                <div className="expo-detail-card-sub">
                  Leader Street, Wayville SA 5034
                </div>
              </div>
              <div className="expo-detail-card">
                <div className="expo-detail-card-icon expo-detail-card-icon--booth">
                  <Store size={18} />
                </div>
                <div className="expo-detail-card-label">Our Booth</div>
                <div className="expo-detail-card-value">Booth 8</div>
                <div className="expo-detail-card-sub">Come say hello</div>
              </div>
              <div className="expo-detail-card">
                <div className="expo-detail-card-icon">
                  <Mail size={18} />
                </div>
                <div className="expo-detail-card-label">Questions?</div>
                <div className="expo-detail-card-value">
                  <a
                    href="mailto:marketing@tesseractapps.com"
                    className="expo-email-link"
                  >
                    marketing@
                    <br />
                    tesseractapps.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map — full width */}
          <div id="expo-map-wrap">
            <iframe
              title="Adelaide Showground map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.3!2d138.5887!3d-34.9337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c9a983d4dc55%3A0x4c3b1e0e3f5a7e8!2sAdelaide%20Showground!5e0!3m2!1sen!2sau!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdelaideExpo2026;
