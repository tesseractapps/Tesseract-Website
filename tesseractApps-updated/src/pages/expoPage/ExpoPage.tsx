import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./ExpoPage.css";
import "../../components/exporBanner/ExpoBanner.css";
import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close.webp";
import { useAppContext } from "../../contexts/AppContext";
import AppLogo from "../../components/appLogo/AppLogo";
import giftIcon from "../../assets/gift-icon.svg";
import locationIcon from "../../assets/location-icon.svg";
import CalenderIcon from "../../components/svgs/Calender";
import Cross from "../../components/svgs/Cross";
import TickCircle from "../../components/svgs/TickCircle";
import Location from "../../components/svgs/Location";
import { ChangeEvent, useEffect, useState } from "react";
import {
  expoRegistrationEmailTemplate,
  expoSalesEmailTemplate,
} from "../../utils/emailTemplates";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import Call from "../../components/svgs/Call";
import Mail from "../../components/svgs/Mail";
import Shield from "../../components/svgs/Shield";
import Document from "../../components/svgs/Document";
import Dollar from "../../components/svgs/Dollar";
import Group from "../../components/svgs/Group";
import Chart from "../../components/svgs/Chart";
import Ribbon from "../../components/svgs/Ribbon";
import Clock from "../../components/svgs/Clock";
import Fullscreen from "../../components/svgs/Fullscreen";
import AddPerson from "../../components/svgs/AddPerson";
import Settings from "../../components/svgs/Settings";
import Rocket from "../../components/svgs/Rocket";
import PersonHeart from "../../components/svgs/PersonHeart";
import Heart from "../../components/svgs/Heart";
import Stethescope from "../../components/svgs/Stethescope";
import Clicpboard from "../../components/svgs/Clicpboard";
import Alert from "../../components/alert/Alert";
interface PopupProps {
  showBanner: boolean;
  handleBannerClose: () => void;
}
interface FormData {
  firstName: string;
  lastName: string;
  organisation: string;
  email: string;
  phone: string;
  role: string;
  consent: boolean;
}
interface FormErrors {
  firstName?: string;
  lastName?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  role?: string;
  consent?: string;
}
const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  organisation: "",
  email: "",
  phone: "",
  role: "",
  consent: false,
};
const initialFormErrors: FormErrors = {
  firstName: "",
  lastName: "",
  organisation: "",
  email: "",
  phone: "",
  role: "",
  consent: "",
};
const ExpoPage = ({ showBanner, handleBannerClose }: PopupProps) => {
  const { handleBookADemo } = useAppContext();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormErrors);
  const alertInitialData = {
    heading: "",
    text: "",
    type: "success",
    isOpen: false,
  };
  const [alertData, setAlertData] = useState(alertInitialData);
  const navigate = useNavigate();
  const { closeRoute } = useAppContext();
  useEffect(() => {
    if (showBanner) navigate("/expo");
  }, [showBanner]);
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      const { checked } = event.target;
      newValue = checked;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.organisation.trim()) {
      newErrors.organisation = "Organisation is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role / Position is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (
      formData.phone.trim().length > 0 &&
      !/^\d{10}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Phone Number is invalid";
    }

    if (!formData.consent) {
      newErrors.consent = "You must consent to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, proceed with submission logic
      console.log("Form submitted:", formData);
      // Reset form after submission
      window.dataLayer.push({
        event: "expo_form_submit",
        user_data: {
          email: formData.email,
          phone_number: formData.phone,
          address: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      sendSalesEMail();
      setFormData(initialFormData);
      setErrors(initialFormErrors);
      // handleBannerClose();
    } else {
      // Form is invalid, errors are displayed
      console.log("Form has errors:", errors);
    }
  };
  const sendSalesEMail = () => {
    sendTextEmail(
      expoSalesEmailTemplate.email,
      expoSalesEmailTemplate.subject,
      expoSalesEmailTemplate.body({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        organisation: formData.organisation,
        role: formData.role,
        consent: formData.consent ? "Yes" : "No",
      })
    )
      .then((response) => {
        console.log("Sales email sent successfully:", response);
        sendConfirmationEMail();
      })
      .catch((error) => {
        console.error("Error sending sales email:", error);
        setAlertData({
          ...alertData,
          heading: "Request Failed",
          text: "There was an error sending your request. Please try again later.",
          type: "fail",
          isOpen: true,
        });
      });
  };
  const sendConfirmationEMail = () => {
    sendEmail(
      formData.firstName + " " + formData.lastName,
      formData.email,
      expoRegistrationEmailTemplate.subject,
      expoRegistrationEmailTemplate.text(formData.firstName),
      expoRegistrationEmailTemplate.html(formData.firstName)
    )
      .then((response) => {
        console.log("Confirmation email sent successfully:", response);
        setAlertData({
          ...alertData,
          heading: "Request Submitted",
          text: "Thank you! Your interest has been registered.We’ll send you updates and your exclusive expo offer shortly. ",
          type: "success",
          isOpen: true,
        });
      })

      .catch((error) => {
        console.error("Error sending confirmation email:", error);
        setAlertData({
          ...alertData,
          heading: "Request Failed",
          text: "There was an error sending your request. Please try again later.",
          type: "fail",
          isOpen: true,
        });
      });
  };
  const privacyPolicyClickHandler = () => {
    window.open("https://www.tesseractapps.com.au/privacy-policy", "_blank");
  };
  const handleScroll = () => {
    const element = document.getElementById("expo-banner-form-container");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleBookADemoClick = () => {
    handleBannerClose();
    setTimeout(() => {
      handleBookADemo(true);
    }, 500);
  };
  return (
    <Dialog
      open={showBanner}
      onClose={() => handleBannerClose()}
      fullScreen
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "up" } }}
      sx={{ margin: "auto", maxWidth: "1920px" }}
    >
      <div id="expo-page-container">
        <Alert setAlertData={setAlertData} alertData={alertData} />
        <div id="expo-page-header">
          <AppLogo />
          <img
            src={closeIcon}
            alt="close icon"
            id="expo-page-close-icon"
            onClick={() => {
              if (closeRoute != "") {
                navigate(closeRoute);
              }
              setTimeout(() => {
                handleBannerClose();
              }, 100);
            }}
          />
        </div>
        <div id="Expo-page-hero-container">
          <div id="expo-page-offer">
            {" "}
            <img
              src={giftIcon}
              alt="gift-icon"
              style={{ fill: "white", width: "18px" }}
            />{" "}
            Exclusive Melbourne Expo Offer
          </div>
          <div id="expo-page-heading">Melbourne Disability Expo 2025</div>
          <div id="expo-page-sub-heading">Upto 50% Off TesseractApps</div>
          <div id="expo-page-text">
            Visit <strong style={{ color: "white" }}>Booth 05</strong> at
            Melbourne Exhibition Centre and unlock exclusive savings on
            Australia's leading NDIS workforce management platform
          </div>
          <div id="expo-page-hero-cta-container">
            <div id="expo-page-hero-cta-gradient" onClick={handleScroll}>
              Claim My Discount
            </div>
            <div id="expo-page-hero-cta" onClick={() => handleBookADemoClick()}>
              Book a Demo
            </div>
          </div>
          <div id="expo-page-time-venue-container">
            <div className="expo-page-time-venue">
              {" "}
              {/* <img src={CalenderIcon} alt="Calendar Icon" /> */}
              <CalenderIcon />
              21-22 November 2025
            </div>
            <div className="expo-page-time-venue">
              <img src={locationIcon} alt="Location Icon" />
              Melbourne Exhibition Centre - Door 1
            </div>
          </div>
        </div>
        <div className="expo-section">
          <div className="expo-section-heading">Why TesseractApps? </div>
          <div className="expo-section-badge-container">
            <div className="expo-section-badge">
              <TickCircle className="fill-whil=te" />
              NDIS-Ready
            </div>
            <div className="expo-section-badge">
              <Location className="fill-white" /> Australian Owned
            </div>
            <div className="expo-section-badge">
              {" "}
              <Shield className="fill-white" /> Data Secure
            </div>
          </div>
          <div className="expo-section-text">
            TesseractApps consolidates all your workforce management needs in
            one powerful, user-friendly platform
          </div>
          <div className="expo-section-card-container">
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <CalenderIcon className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Smart Rostering & Shift Management
              </div>
              <div className="expo-section-card-text">
                Intuitive scheduling that eliminates conflicts and simplifies
                coordination
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <Document className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Automated NDIS Claims
              </div>
              <div className="expo-section-card-text">
                Intuitive scheduling that eliminates conflicts anSubmit claims
                faster with automated processing and error checking
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <Shield className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Compliance Alerts & Reporting
              </div>
              <div className="expo-section-card-text">
                Stay audit-ready with real-time alerts and comprehensive
                reporting
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <Dollar className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Integrated Payroll & Finance Sync
              </div>
              <div className="expo-section-card-text">
                Seamlessly connect with your existing payroll and accounting
                systems
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <Group className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Participant & Staff Management
              </div>
              <div className="expo-section-card-text">
                Centralized records for participants and team members in one
                platform
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-1-image-bg">
                <Chart className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">
                Real-Time Dashboards
              </div>
              <div className="expo-section-card-text">
                Instant insights and actionable data to improve operations
              </div>
            </div>
          </div>
        </div>

        <div className="expo-section">
          <div className="expo-section-badge-container">
            <div className="expo-section-badge expo-section-badge-blue">
              Limited Time Offer
            </div>
          </div>
          <div className="expo-section-heading">
            Your Melbourne Expo Advantage
          </div>
          <div className="expo-section-text expo-section-text-padding">
            Exclusive benefits for expo attendees — available only until 29
            November 2025
          </div>
          <div className="expo-section-card-container">
            <div className="expo-section-card-1">
              <div className="expo-section-card-2-image-bg">
                <TickCircle className="force-fill-white" />
              </div>
              <div className="expo-section-card-title">Upto 50% Off</div>
              <div className="expo-section-card-text">
                Substantial savings on your subscription to help you get started
                with confidence
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-2-image-bg">
                <Ribbon className="force-fill-white" />
              </div>
              <div className="expo-section-card-title">
                Done-For-You Onboarding
              </div>
              <div className="expo-section-card-text">
                Full migration, configuration, and training included — we handle
                everything
              </div>
            </div>
            <div className="expo-section-card-1">
              <div className="expo-section-card-2-image-bg">
                <Clock className="force-fill-white" />
              </div>
              <div className="expo-section-card-title">
                Priority Feature Access
              </div>
              <div className="expo-section-card-text">
                Be first to access new platform features launching in 2025
              </div>
            </div>
          </div>
          <div id="section-banner">
            <div id="section-banner-title">
              Offer expires 7 days after the Expo
            </div>
            <div id="section-banner-text">
              Limited to Melbourne-based NDIS providers who book a demo at Booth
              05 or by 29 November 2025
            </div>
            <button id="section-banner-cta" onClick={handleScroll}>
              Claim Your Expo Offer Now
            </button>
          </div>
        </div>

        <div className="expo-section">
          <div className="expo-section-heading">How It Works </div>
          <div className="expo-section-text expo-section-text-padding">
            Quick, transparent, and future-ready — get started in 4 simple steps
          </div>
          <div className="expo-section-card-container">
            <div className="expo-section-card-4">
              <div className="expo-section-card-2-image-bg card-bg-rounded">
                01
              </div>
              <div className="expo-section-card-1-image-bg">
                <Fullscreen className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">Visit Booth 05</div>
              <div className="expo-section-card-text">
                Find us at Melbourne Exhibition Centre, Door 1 during the expo
              </div>
            </div>
            <div className="expo-section-card-4">
              <div className="expo-section-card-2-image-bg card-bg-rounded">
                02
              </div>
              <div className="expo-section-card-1-image-bg">
                <AddPerson className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">Register On-Site</div>
              <div className="expo-section-card-text">
                Complete our quick registration form
              </div>
            </div>
            <div className="expo-section-card-4">
              <div className="expo-section-card-2-image-bg card-bg-rounded">
                03
              </div>
              <div className="expo-section-card-1-image-bg">
                <Settings className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">Setup Your Account</div>
              <div className="expo-section-card-text">
                Our team configures your account with discount applied
              </div>
            </div>
            <div className="expo-section-card-4">
              <div className="expo-section-card-2-image-bg card-bg-rounded">
                04
              </div>
              <div className="expo-section-card-1-image-bg">
                <Rocket className="force-fill-blue" />
              </div>
              <div className="expo-section-card-title">Start Immediately </div>
              <div className="expo-section-card-text">
                Begin using TesseractApps with full support and training 
              </div>
            </div>
          </div>
        </div>
        <div className="expo-section">
          <div className="expo-section-heading">
            The TesseractApps Difference
          </div>
          <div className="expo-section-text expo-section-text-padding">
            Transform your operations from chaos to clarity
          </div>
          <div id="section-column-container">
            <div id="before-column" className="section-column">
              <div
                className="section-column-item section-column-heading"
                style={{ color: "red" }}
              >
                <Cross className="fill-red" />
                Before TesseractApps
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Manual spreadsheets and admin overload
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Audit anxiety and compliance gaps
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Team communication gaps
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Time-consuming payroll processing
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Scattered participant records
              </div>
              <div className="section-column-item">
                <Cross className="fill-red" />
                Limited reporting insights
              </div>
            </div>
            <div id="after-column" className="section-column">
              <div
                className="section-column-item section-column-heading"
                style={{ color: "green" }}
              >
                <TickCircle className="fill-green" />
                After TesseractApps
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Automated rosters and claims
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Real-time compliance alerts
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Unified, mobile-friendly dashboard
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Integrated payroll automation
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Centralized participant management
              </div>
              <div className="section-column-item">
                <TickCircle className="fill-green" />
                Real-time analytics and reporting 
              </div>
            </div>
          </div>
        </div>
        <div className="expo-section">
          <div className="expo-section-heading">Who We Help </div>
          <div className="expo-section-text expo-section-text-padding">
            Purpose-built solutions for every type of NDIS and care provider
          </div>
          <div className="expo-section-card-container">
            <div className="expo-section-card-3">
              <div className="expo-section-card-2-image-bg">
                <PersonHeart className="force-fill-white" />
              </div>
              <div className="expo-section-card-text-container">
                <div className="expo-section-card-title">NDIS Providers</div>
                <div className="expo-section-card-text">
                  Simplify participant management, rostering, and billing with
                  purpose-built tools
                </div>
              </div>
            </div>
            <div className="expo-section-card-3">
              <div className="expo-section-card-2-image-bg">
                <Heart className="force-fill-white" />
              </div>
              <div className="expo-section-card-text-container">
                <div className="expo-section-card-title">
                  Aged Care Providers 
                </div>
                <div className="expo-section-card-text">
                  Streamline HCP/CHSP compliance, scheduling, and comprehensive
                  reporting 
                </div>
              </div>
            </div>
            <div className="expo-section-card-3">
              <div className="expo-section-card-2-image-bg">
                <Stethescope className="force-fill-white" />
              </div>
              <div className="expo-section-card-text-container">
                <div className="expo-section-card-title">Allied Health</div>
                <div className="expo-section-card-text">
                  Manage NDIS plans, invoicing, and staff coordination
                  seamlessly
                </div>
              </div>
            </div>
            <div className="expo-section-card-3">
              <div className="expo-section-card-2-image-bg">
                <Clicpboard className="force-fill-white" />
              </div>
              <div className="expo-section-card-text-container">
                <div className="expo-section-card-title">
                  Plan Managers & Coordinators
                </div>
                <div className="expo-section-card-text">
                  Gain complete oversight and reduce administrative errors
                  significantly
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="expo-section">
          <div className="expo-section-heading">
            Register For Your Discount 
          </div>
          <div className="expo-section-text expo-section-text-padding">
            Complete this form to claim your exclusive Melbourne Expo offer
          </div>

          <div id="expo-banner-form-container">
            <div className="expo-banner-input-container">
              <label htmlFor="firstName" className="expo-banner-input-label">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="expo-banner-input"
                value={formData.firstName}
                onChange={changeHandler}
                placeholder="John"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.firstName}
              </div>
            </div>
            <div className="expo-banner-input-container">
              <label htmlFor="lastName" className="expo-banner-input-label">
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="expo-banner-input"
                value={formData.lastName}
                onChange={changeHandler}
                placeholder="Smith"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.lastName}
              </div>
            </div>
            <div className="expo-banner-input-container">
              <label htmlFor="organisation" className="expo-banner-input-label">
                Organisation <span style={{ color: "red" }}>*</span>
              </label>
              {/* <select
                className="expo-banner-input expo-banner-select"
                name="organisation"
                id="organisation"
                value={formData.organisation}
                onChange={changeHandler}
              >
                <option value="" disabled selected>
                  Select Organisation
                </option>
                <option value="NDIS Provider">NDIS Provider</option>
                <option value="Aged Care Service">Aged Care Service</option>
                <option value="Childcare">Childcare</option>
                <option value="Allied Health">Allied Health</option>
                <option value="Home & Community Care">
                  Home & Community Care
                </option>
                <option value="Other">Other</option>
              </select> */}
              <input
                id="organisation"
                name="organisation"
                type="text"
                className="expo-banner-input"
                value={formData.organisation}
                onChange={changeHandler}
                placeholder="Your NDIS Provider / Organisation"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.organisation}
              </div>
            </div>
            <div className="expo-banner-input-container">
              <label htmlFor="email" className="expo-banner-input-label">
                Email Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="expo-banner-input"
                value={formData.email}
                onChange={changeHandler}
                placeholder="john@example.com"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.email}
              </div>
            </div>
            <div className="expo-banner-input-container">
              <label htmlFor="phone" className="expo-banner-input-label">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="expo-banner-input"
                value={formData.phone}
                onChange={changeHandler}
                placeholder="0400 000 000"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.phone}
              </div>
            </div>
            <div className="expo-banner-input-container">
              <label htmlFor="organisation" className="expo-banner-input-label">
                Role / Position <span style={{ color: "red" }}>*</span>
              </label>
              {/* <select
                className="expo-banner-input expo-banner-select"
                name="role"
                id="role"
                value={formData.role}
                onChange={changeHandler}
              >
                <option value="" disabled selected>
                  Select Role / Position
                </option>
                <option value="Support Coordinator">Support Coordinator</option>
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select> */}
              <input
                id="role"
                name="role"
                type="text"
                className="expo-banner-input"
                value={formData.role}
                onChange={changeHandler}
                placeholder="e.g, Manager, Director, Coordinator"
              />
              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.role}
              </div>
            </div>
            <div className="expo-banner-checkbox-container">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="expo-banner-checkbox"
                checked={formData.consent}
                onChange={changeHandler}
              />
              <span style={{ color: "red" }}>*</span>
              <label htmlFor="phone" className="expo-banner-input-label">
                I consent to TesseractApps contacting me regarding the Melbourne
                Expo and related offers, in accordance with the
                <div id="expo-banner-link" onClick={privacyPolicyClickHandler}>
                  {" "}
                  Privacy Policy{" "}
                </div>
                .
              </label>

              <div className="expo-banner-error" style={{ color: "red" }}>
                {errors.consent}
              </div>
            </div>
          </div>
          <button className="expo-banner-button" onClick={handleSubmit}>
            Claim My Discount
          </button>
          <div id="bottom-subtext">
            * Required fields. Your information will be kept secure and used
            only to process your registration. 
          </div>
        </div>
        <div id="expo-page-footer">
          <div id="expo-page-footer-title">Contact & Support</div>
          <div id="expo-footer-contact-container">
            <div className="expo-footer-contact-item">
              <Call className="fill-black" /> 1300 252 808
            </div>

            <div className="expo-footer-contact-item">
              <Mail className="fill-black" />
              sales@tesseractapp.com
            </div>
          </div>
          <Link to="/ " className="expo-footer-text">
            tesseractapps.com.au
          </Link>
          <div className="expo-footer-text">
            Empowering NDIS Provides Accross Australia
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ExpoPage;
