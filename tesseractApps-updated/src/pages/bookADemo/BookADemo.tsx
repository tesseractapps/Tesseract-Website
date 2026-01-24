import "./BookADemo.css";
import { Dialog } from "@mui/material";
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

  const handleButtonPress = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    multiselect: boolean
  ) => {
    if (event.currentTarget.className === "bookADemo-Button-alt") {
      if (currentStep !== 0) {
        setCurrentStep((prev) => prev - 1);
      }
      return;
    }
    if (event.currentTarget.className === "bookADemo-Button" || !multiselect) {
      setCurrentStep((prev) => prev + 1);
    }
    const value = event.currentTarget.getAttribute("data-value");
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
    console.log(
      event.currentTarget.className === "bookADemo-Button" || !multiselect
    );
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
    sendEmail(
      formData.firstName,
      formData.email,
      bookDemoConfirmationEmailTemplate.subject,
      bookDemoConfirmationEmailTemplate.text(formData.firstName),
      bookDemoConfirmationEmailTemplate.html(formData.firstName)
    )
      .then((response) => {
        console.log("Confirmation email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending confirmation email:", error);
      });
  };
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
      sx={{ margin: "auto", maxWidth: "1920px" }}
    >
      <Alert setAlertData={setAlertData} alertData={alertData} />
      <div
        id="bookADemo-header-container"
        style={showSuccess ? { backgroundColor: "var(--color-secondary)" } : {}}
      >
        <div id="bookADemo-navbar-logo-container">
          <img
            src={logo_small}
            alt="tesseract logo"
            id="bookADemo-navbar-logo"
            width={200}
            onClick={handleLogoClick}
          />
        </div>
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
      </div>

      {showSuccess ? (
        <div id="bookADemo-Success-Container">
          <img
            src={image1}
            alt="success image"
            className="bookADemo-Success-image"
          />
          <div id="bookADemo-Success-Title" className="bookADemo-success-text">
            Successfully Sent
          </div>
          <div
            id="bookADemo-success-message"
            className="bookADemo-success-text"
          >
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
          <div id="bookADemo-text-section">
            <div id="bookADemo-text">{bookADemoFormData[currentStep].text}</div>
            <div id="bookADemo-subText">
              {bookADemoFormData[currentStep].subText}

              <img
                src={bookADemoFormData[currentStep].image}
                alt="book-a-demo-text"
                id="bookADemo-image"
              />
            </div>
          </div>
          <div id="bookADemo-form-section">
            <div
              id="bookADemo-form-question"
              style={
                !bookADemoFormData[currentStep].multiSelect
                  ? { marginBottom: "40px" }
                  : {}
              }
            >
              {bookADemoFormData[currentStep].question}
            </div>
            {bookADemoFormData[currentStep].multiSelect ? (
              <div id="bookADemo-form-multiple">Select Multiple</div>
            ) : (
              ""
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
                      onClick={(event) =>
                        handleButtonPress(
                          event,
                          bookADemoFormData[currentStep].id ?? "",
                          bookADemoFormData[currentStep].multiSelect
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
                    />
                  ) : (
                    <TextField
                      className="bookADemo-textInput"
                      id={field?.id}
                      label={field.displayName}
                      variant="outlined"
                      type="text"
                      onChange={handleInputChange}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div id="bookADemo-Buttons-Container">
              {currentStep != 0 ? (
                <div
                  className="bookADemo-Button-alt"
                  onClick={(event) =>
                    handleButtonPress(
                      event,
                      bookADemoFormData[currentStep].id ?? "",
                      bookADemoFormData[currentStep].multiSelect
                    )
                  }
                >
                  Previous
                </div>
              ) : (
                ""
              )}
              {currentStep != 0 &&
              bookADemoFormData[currentStep].multiSelect ? (
                <div
                  className="bookADemo-Button"
                  onClick={(event) =>
                    handleButtonPress(
                      event,
                      bookADemoFormData[currentStep].id ?? "",
                      bookADemoFormData[currentStep].multiSelect
                    )
                  }
                >
                  Next
                </div>
              ) : (
                ""
              )}
              {Object.values(formData).every((value) => {
                if (Array.isArray(value)) {
                  return value.length > 0; // arrays must have at least one selection
                }
                return value.trim() !== ""; // strings must not be empty
              }) &&
                currentStep > 5 && (
                  <div className="bookADemo-Button" onClick={handleSubmit}>
                    Submit
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default BookADemo;
