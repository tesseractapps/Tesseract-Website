import "./SignupStyles.css";
import SEO from "../../../components/common/SEO";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Phone, X } from "lucide-react";

const SignupSuccess = () => {
  const navigate = useNavigate();

  const handleClose = () => navigate("/");

  return (
    <div id="signup-page">
      <SEO
        title="You're All Set | TesseractApps"
        description="Your TesseractApps account is being set up. Check your inbox for login details and next steps."
        canonical="https://tesseractapps.com.au/signup/success"
        noIndex={true}
      />

      <button type="button" id="signup-close-btn" onClick={handleClose} aria-label="Close">
        <X size={18} strokeWidth={2.5} />
      </button>

      <div id="signup-success-screen">
        <div id="signup-success-inner">
          <div id="signup-success-icon">
            <CheckCircle size={64} color="var(--color-primary)" strokeWidth={1.5} />
          </div>
          <div id="signup-success-title">You're all set!</div>
          <div id="signup-success-message">
            Thank you for choosing TesseractApps. We've received your details and are setting up your account.
            Keep an eye on your inbox, we'll send you an email with your login details and next steps shortly.
          </div>
          <div id="signup-success-help-heading">Need help?</div>
          <div id="signup-success-help-text">
            If you have any questions or considerations while we set things up, please don't hesitate to reach out to our team.
          </div>
          <div id="signup-success-phone">
            <Phone size={16} />
            <strong>1300 252 808</strong>
          </div>
          <div id="signup-success-actions">
            <button type="button" className="signup-btn-primary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
