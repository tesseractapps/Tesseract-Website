import Mail from "../../ui/svgs/Mail";
import close from "../../../assets/close.webp";
import "./AlertStyles.css";
import ReactDOM from "react-dom";
import Success from "../../ui/svgs/Success";
import Fail from "../../ui/svgs/Fail";
import { useEffect, useState } from "react";
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
  // Render nothing until mounted so the server markup and the client's first
  // render match (both empty). Rendering the portal on the client's first pass
  // — while the server rendered null (`typeof document`) — is a server/client
  // branch that breaks hydration (React #418). The portal mounts after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (alertData.isOpen) {
        setAlertData({ ...alertData, isOpen: false });
      }
    }, 10000);
    return () => clearTimeout(timeoutID);
  }, [alertData, alertData.isOpen, setAlertData]);
  if (!mounted || typeof document === "undefined") return null;
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
