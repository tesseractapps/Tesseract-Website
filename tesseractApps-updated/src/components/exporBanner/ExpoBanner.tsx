import "./ExpoBanner.css";
import expoBannerImage from "../../assets/expo-banner-oct.webp";
import closeIcon from "../../assets/close.webp";
import { ChangeEvent, useState } from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  expoRegistrationEmailTemplate,
  expoSalesEmailTemplate,
} from "../../utils/emailTemplates";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import Success from "../svgs/Success";
import Fail from "../svgs/Fail";
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
const ExpoBanner = ({ showBanner, handleBannerClose }: PopupProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormErrors);
  const alertInitialData = {
    heading: "",
    text: "",
    type: "success",
    isOpen: false,
  };
  const [alertData, setAlertData] = useState(alertInitialData);
  const handleButtonClick = () => {
    setShowForm(true);
  };
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
      sendSalesEMail();
      setFormData(initialFormData);
      setShowForm(false);
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
  return (
    <>
      {alertData.isOpen && (
        <div
          className={alertData.type != "fail" ? "ff-message-success" : ""}
          id="alert-container"
          onClick={() => {
            setAlertData({ ...alertData, isOpen: false });
            handleBannerClose();
          }}
          style={{ display: alertData.isOpen ? "flex" : "none" }}
        >
          <div id="alert-message-container">
            <div id="alert-message-header">
              <div />
              <img
                src={closeIcon}
                alt="alert-message-close"
                id="alert-message-close"
                onClick={() => {
                  setAlertData({ ...alertData, isOpen: false });
                  handleBannerClose();
                }}
              />
            </div>
            <div id="alert-message-data-container">
              {alertData.type == "success" && <Success />}
              {alertData.type == "fail" && <Fail />}
              <div
                id="alert-message-heading"
                className={`alert-${alertData.type}-heading`}
              >
                {alertData.heading}
              </div>
              <div id="alert-message-text">{alertData.text}</div>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={showBanner && !alertData.isOpen}
        onClose={() => handleBannerClose()}
        slots={{
          transition: Slide,
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: showForm ? "white" : "transparent",
              boxShadow: showForm ? 1 : "none", // transparent dialog
            },
          },
          transition: { direction: "up" }, // Slide transition
        }}
        sx={{
          marginInline: "auto",
          maxWidth: "1920px",
        }}
      >
        <div id="expo-banner-container">
          {showForm ? (
            <>
              <div id="expo-banner-header">
                <div id="expo-banner-header-titles-container">
                  <div id="expo-banner-title">
                    Melbourne NDIS Expo | 21–22 November 2025
                  </div>
                  <div id="expo-banner-subtitle">
                    Register now for live demos, exclusive expo offers, and
                    event updates.
                  </div>
                </div>
                <img
                  src={closeIcon}
                  alt="close icon"
                  onClick={handleBannerClose}
                  id="expo-banner-close-icon"
                />
              </div>

              <div id="expo-banner-form-container">
                <div className="expo-banner-input-container">
                  <label
                    htmlFor="firstName"
                    className="expo-banner-input-label"
                  >
                    First Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="expo-banner-input"
                    value={formData.firstName}
                    onChange={changeHandler}
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
                  />
                  <div className="expo-banner-error" style={{ color: "red" }}>
                    {errors.lastName}
                  </div>
                </div>
                <div className="expo-banner-input-container">
                  <label
                    htmlFor="organisation"
                    className="expo-banner-input-label"
                  >
                    Organisation <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
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
                  </select>
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
                  />
                  <div className="expo-banner-error" style={{ color: "red" }}>
                    {errors.phone}
                  </div>
                </div>
                <div className="expo-banner-input-container">
                  <label
                    htmlFor="organisation"
                    className="expo-banner-input-label"
                  >
                    Role / Position
                  </label>
                  <select
                    className="expo-banner-input expo-banner-select"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={changeHandler}
                  >
                    <option value="" disabled selected>
                      Select Role / Position
                    </option>
                    <option value="Support Coordinator">
                      Support Coordinator
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
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
                    I consent to TesseractApps contacting me regarding the
                    Melbourne Expo and related offers, in accordance with the
                    <div
                      id="expo-banner-link"
                      onClick={privacyPolicyClickHandler}
                    >
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
                Confirm Registration
              </button>
            </>
          ) : (
            <>
              <img
                src={closeIcon}
                alt="close icon"
                onClick={handleBannerClose}
                id="expo-banner-image-close-icon"
              />
              <img
                src={expoBannerImage}
                alt="expo banner image"
                id="expo-banner-image"
                onClick={handleButtonClick}
              />
              {/* <button
                className="expo-banner-button"
                onClick={handleButtonClick}
              >
                Register Your Interest
              </button> */}
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ExpoBanner;
