import { CheckCircle2, Loader2, Lock, Sparkles, X } from "lucide-react";
import "./UserGuideFormStyles.css";
interface UserGuideFormProps {
  form: {
    name: string;
    email: string;
    company: string;
  };
  setGateStage: React.Dispatch<React.SetStateAction<string | null>>;
  gateLabel: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  status: "idle" | "loading" | "success" | "error";
}
const UserGuideForm = ({
  form,
  setGateStage,
  gateLabel,
  handleSubmit,
  handleChange,
  error,
}: UserGuideFormProps) => {
  return (
    <div className="ug-modal-overlay">
      <div className="ug-modal">
        <button
          type="button"
          className="ug-modal-close"
          onClick={() => setGateStage(null)}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {status === "success" ? (
          <div className="ug-success-card">
            <div className="ug-success-icon">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="ug-success-title">You're on the list</h3>

            <p className="ug-success-description">
              We've sent the user guides to <strong>{form.email}</strong>. Check
              your inbox shortly.
            </p>
          </div>
        ) : (
          <div className={`ug-access-card `}>
            <div className="ug-access-header">
              <div className="ug-access-badge">
                <Lock size={14} />
                <span>Access {gateLabel} </span>
              </div>

              <h3 className="ug-access-title">Unlock User Guides</h3>

              <p className="ug-access-description">
                Enter your details to unlock the full TesseractApps user guides,
                stage-specific configuration walkthroughs, onboarding
                checklists, and a free Provider Maturity Review.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="ug-access-form">
              <div className="ug-form-group">
                <label htmlFor="hc-name" className="ug-label">
                  Full name
                </label>

                <input
                  id="hc-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jordan Mitchell"
                  className="ug-input"
                />
              </div>

              <div className="ug-form-group">
                <label htmlFor="hc-email" className="ug-label">
                  Email address
                </label>

                <input
                  id="hc-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jordan@organisation.org.au"
                  className="ug-input"
                />
              </div>

              <div className="ug-form-group">
                <label htmlFor="hc-company" className="ug-label">
                  Company <span className="ug-label-optional">(optional)</span>
                </label>

                <input
                  id="hc-company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your organisation"
                  className="ug-input"
                />
              </div>

              {error && <p className="ug-error-message">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="ug-submit-btn"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="ug-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Get the Blueprints
                  </>
                )}
              </button>

              <p className="ug-privacy-note">
                By submitting, you agree to be contacted by TesseractApps. We
                respect your privacy and never share your details.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGuideForm;
