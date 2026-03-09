import Mail from "../svgs/Mail";
import close from "../../assets/close.webp";
import "./Alert.css";
import ReactDOM from "react-dom";
import Success from "../svgs/Success";
import Fail from "../svgs/Fail";
import { useEffect } from "react";
type alertType = {
  setAlertData: React.Dispatch<
    React.SetStateAction<{
      heading: string;
      text: string;
      type: string;
      isOpen: boolean;
    }>
  >;
  alertData: {
    heading: string;
    text: string;
    type: string;
    isOpen: boolean;
  };
};
const Alert = ({ alertData, setAlertData }: alertType) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (alertData.isOpen) {
        setAlertData({ ...alertData, isOpen: false });
      }
    }, 10000);
    return () => clearTimeout(timeoutID);
  }, [alertData, alertData.isOpen, setAlertData]);
  return ReactDOM.createPortal(
    <div
      className={alertData.type != "fail" ? "ff-message-success" : ""}
      id="alert-container"
      onClick={() => setAlertData({ ...alertData, isOpen: false })}
      style={{ display: alertData.isOpen ? "flex" : "none" }}
    >
      <div id="alert-message-container">
        <div id="alert-message-header">
          <div />
          <img loading="lazy"
            src={close}
            alt="alert-message-close"
            id="alert-message-close"
            onClick={() => setAlertData({ ...alertData, isOpen: false })}
          />
        </div>
        <div id="alert-message-data-container">
          {alertData.type == "newsletter" && <Mail />}
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
    </div>,
    document.body
  );
};

export default Alert;
