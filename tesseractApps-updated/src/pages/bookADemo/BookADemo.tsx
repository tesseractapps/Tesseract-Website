import "./BookADemo.css";
import { Dialog, Stepper, Step, StepLabel } from "@mui/material";
import closeIcon from "../../assets/close.webp";
import Slide from "@mui/material/Slide";
import { useEffect, useState } from "react";
import { bookADemoFormData } from "../../utils/DummyData";
import logo_small from "../../assets/popup-logo.webp";
import TextField from "@mui/material/TextField";
import React from "react";
import { sendEmail, sendTextEmail } from "../../services/AppService";
import Alert from "../../components/alert/Alert";
import image1 from "../../assets/bookADemoSuccess.webp";
import image2 from "../../assets/bookADemoSuccessMan.webp";
import {
  bookDemoConfirmationEmailTemplate,
  bookDemoEmailTemplate,
} from "../../utils/emailTemplates";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

type formDataType = {
  organisaitionType: string;
  teamRoles: string[];
  staff: string;
  currentRoles: string[];
  features: string[];
  goal: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  schedule: string;
};
const formEmptyData: formDataType = {
  organisaitionType: "",
  teamRoles: [],
  staff: "",
  currentRoles: [],
  features: [],
  goal: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  schedule: "",
};
const BookADemo = () => {
  const { bookADemo, handleBookADemo, closeRoute } = useAppContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("Book a demo current location ", location.pathname);
  //   if (location.pathname == "/book-a-demo") {
  //     setCloseRoute("/");
  //   } else {
  //     setCloseRoute(location.pathname);
  //   }
  // }, []);
  useEffect(() => {
    if (bookADemo) navigate("/book-a-demo", { replace: true });
  }, [bookADemo]);
  const alertInitialData = {
    heading: "",
    text: "",
    type: "success",
    isOpen: false,
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(formEmptyData);
  const [alertData, setAlertData] = useState(alertInitialData);

  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setCurrentStep(0);
    setFormData(formEmptyData);
    setAlertData(alertInitialData);
    setShowSuccess(false);
    setTimeout(() => {
      handleBookADemo(false);
    }, 1);
  };
  const isSelected = (
    formData: formDataType,
    id: keyof formDataType,
    value: string
  ): boolean => {
    const fieldValue = formData[id];
    if (typeof fieldValue === "string") {
      return fieldValue === value;
    }
    if (Array.isArray(fieldValue)) {
      return fieldValue.includes(value);
    }
    return false;
  };

  const handlePrevious = () => {
    if (currentStep !== 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleOptionSelect = (
    value: string,
    id: string,
    multiselect: boolean
  ) => {
    if (!value || !id) return;

    setFormData((prev) => {
      const fieldValue = prev[id as keyof formDataType];

      if (multiselect && Array.isArray(fieldValue)) {
        // toggle selection
        return {
          ...prev,
          [id]: isSelected(prev, id as keyof formDataType, value)
            ? fieldValue.filter((v) => v !== value)
            : [...fieldValue, value],
        };
      }

      // single select
      return { ...prev, [id]: value };
    });

    // Auto-advance for single select
    if (!multiselect) {
      handleNext();
    }
  };

  // console.log(formData);
  const currentId = bookADemoFormData[currentStep]?.id as
    | keyof formDataType
    | undefined;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const id = event.target.id;
    // console.log(id, value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = () => {
    window.dataLayer.push({
      event: "book_demo_form_submit",
      user_data: {
        email: formData.email,
        phone_number: formData.phoneNumber,
        address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        },
      },
    });

    sendTextEmail(
      bookDemoEmailTemplate.email,
      bookDemoEmailTemplate.subject,
      bookDemoEmailTemplate.body({
        fullName: formData.firstName + " " + formData.lastName,
        email: formData.email,
        phone: formData.phoneNumber,
        organisation: formData.companyName,
        role: formData.teamRoles.join(", "),
        areas: formData.features.join(", "),
        preferredTime: formData.schedule,
      })
    )
      .then((response) => {
        console.log("Email sent successfully:", response);
        confirmationMail();
        // alert("Thank you for your request! We will be in touch soon.");
        // setAlertData({
        //   ...alertData,
        //   heading: "Request Submitted",
        //   text: "Thank you for your request! We will be in touch soon.",
        //   type: "success",
        //   isOpen: true,
        // });
        setShowSuccess(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // alert(
        //   "There was an error sending your request. Please try again later."
        // );
        setShowSuccess(false);
        setAlertData({
          ...alertData,
          heading: "Request Failed",
          text: "There was an error sending your request. Please try again later.",
          type: "fail",
          isOpen: true,
        });
      });
  };
  const confirmationMail = () => {
    const scheduledDate = new Date(formData.schedule);

// Date: dd/mm/yyyy
const date = scheduledDate.toLocaleDateString('en-AU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

// Time: hh:mm AM/PM (12 hour)
const time = scheduledDate.toLocaleTimeString('en-AU', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
}).toUpperCase();;

    sendEmail(
      formData.firstName,
      formData.email,
      bookDemoConfirmationEmailTemplate.subject,
      bookDemoConfirmationEmailTemplate.text(formData.firstName,date,time),
      bookDemoConfirmationEmailTemplate.html(formData.firstName,date,time)
    )
      .then((response) => {
        console.log("Confirmation email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending confirmation email:", error);
      });
  };
  const getVisualStep = (internalStep: number) => {
    if (internalStep <= 3) return 0; // Organisation (Steps 0-3)
    if (internalStep <= 5) return 1; // Needs (Steps 4-5)
    return 2; // Contact (Step 6)
  };

  const hiddenSteps = ["Organisation", "Needs", "Contact"];

  const handleLogoClick = () => {
    navigate("/");
    setTimeout(() => {
      handleBookADemo(false);
    }, 100);
  };
  return (
    <Dialog
      open={bookADemo}
      onClose={() => {
        setCurrentStep(0);
        handleBookADemo(false);
      }}
      fullScreen
      slots={{ transition: Slide }}
      slotProps={{ transition: { direction: "up" } }}
      sx={{ '& .MuiDialog-paper': { padding: 0, margin: 0, overflow: 'hidden' } }}
    >
      <Alert setAlertData={setAlertData} alertData={alertData} />

      <img
        src={closeIcon}
        alt="close icon"
        id="dialog-close-icon"
        style={
          showSuccess ? { filter: "invert(1)" } : { filter: "invert(0)" }
        }
        onClick={() => {
          console.log("Book a Demo Close Route ", closeRoute);
          if (closeRoute != "") {
            navigate(closeRoute, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
          resetForm();
        }}
      />

      {showSuccess ? (
        <div id="bookADemo-Success-Container">
          <img
            src={image1}
            alt="success image"
            className="bookADemo-Success-image"
          />
          <div id="bookADemo-Success-Title">
            Successfully Sent
          </div>
          <div id="bookADemo-success-message">
            Thank you! Your demo has been successfully booked. Our team will
            contact you shortly to confirm the details.
          </div>
          <img
            src={image2}
            alt="success image2"
            className="bookADemo-Success-image bookADemo-Success-image-man"
          />
        </div>
      ) : (
        <div id="bookADemo-container">

          {/* Left Panel */}
          <div id="bookADemo-text-section">
            <img
              src={logo_small}
              alt="tesseract logo"
              id="bookADemo-navbar-logo"
              onClick={handleLogoClick}
            />
            <div id="bookADemo-text">{bookADemoFormData[currentStep].text}</div>
            <div id="bookADemo-subText">
              {bookADemoFormData[currentStep].subText}
            </div>
            <img
              src={bookADemoFormData[currentStep].image}
              alt="book-a-demo-visual"
              id="bookADemo-image"
            />
          </div>

          {/* Right Panel */}
          <div id="bookADemo-form-section">
            <div style={{ width: '100%', marginBottom: '40px' }}>
              <Stepper activeStep={getVisualStep(currentStep)} alternativeLabel>
                {hiddenSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>

            <div id="bookADemo-form-question">
              {bookADemoFormData[currentStep].question}
            </div>
            {bookADemoFormData[currentStep].multiSelect && (
              <div id="bookADemo-form-multiple">Select Multiple</div>
            )}

            <div id="bookADemo-form-fields-container">
              {bookADemoFormData[currentStep].fields.map((field, index) => (
                <React.Fragment key={field.displayName + index}>
                  {field.type == "option" ? (
                    <div
                      className={
                        "bookADemo-field-select" +
                        (currentId &&
                          isSelected(formData, currentId, field.value)
                          ? " selected"
                          : "")
                      }
                      onClick={() =>
                        handleOptionSelect(
                          field.value,
                          bookADemoFormData[currentStep].id ?? "",
                          bookADemoFormData[currentStep].multiSelect ?? false
                        )
                      }
                      data-value={field.value}
                    >
                      {field.displayName}
                    </div>
                  ) : field.displayName == "Pick a date & time" ? (
                    <TextField
                      className="bookADemo-textInput"
                      id={field?.id}
                      label={field.displayName}
                      variant="outlined"
                      type="datetime-local"
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  ) : (
                    <TextField
                      className="bookADemo-textInput"
                      id={field?.id}
                      label={field.displayName}
                      variant="outlined"
                      type="text"
                      onChange={handleInputChange}
                      fullWidth
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div id="bookADemo-Buttons-Container">
              {currentStep != 0 && (
                <button
                  className="bookADemo-Button-alt"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}

              {currentStep != 0 &&
                bookADemoFormData[currentStep].multiSelect && (
                  <button
                    className="bookADemo-Button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}

              {Object.values(formData).every((value) => {
                if (Array.isArray(value)) {
                  return value.length > 0; // arrays must have at least one selection
                }
                return value.trim() !== ""; // strings must not be empty
              }) &&
                currentStep > 5 && (
                  <button className="bookADemo-Button" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default BookADemo;
