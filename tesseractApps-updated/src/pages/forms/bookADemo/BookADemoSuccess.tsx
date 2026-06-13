import "./BookADemoStyles.css";
import SEO from "../../../components/common/SEO";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Mail, Phone, Monitor, X } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

const BookADemoSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const schedule: string = (location.state as any)?.schedule ?? "";

  const handleClose = () => navigate("/");

  let calUrl = "";
  if (schedule) {
    const startStr = schedule.replace(/[-:]/g, "").slice(0, 13) + "00";
    const endDate = new Date(schedule);
    endDate.setHours(endDate.getHours() + 1);
    const endStr = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
    calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=TesseractApps+Demo&dates=${startStr}/${endStr}`;
  }

  return (
    <div id="bookADemo-page">
      <SEO
        title="Demo Booked | TesseractApps"
        description="Your TesseractApps demo has been successfully booked."
        canonical="https://tesseractapps.com.au/book-a-demo/success"
        noIndex={true}
      />

      <button type="button" id="dialog-close-btn" onClick={handleClose} aria-label="Close">
        <X size={18} strokeWidth={2.5} />
      </button>

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
              Close
            </button>
            {calUrl && (
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bookADemo-Button bookADemo-Button--outline"
              >
                Add to Calendar
              </a>
            )}
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
    </div>
  );
};

export default BookADemoSuccess;
