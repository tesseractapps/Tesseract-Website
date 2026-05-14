import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SCAnnouncementModal.css";

const FEATURES = [
  "Task & caseload management - your entire caseload in one connected view",
  "Participant goal tracking - linked to services, not standalone",
  "Service agreement generation with E-Sign",
  "Automated NDIS invoicing & claims - correct rates, bulk submission",
  "Real-time funding visibility per participant, per category",
  "Incident reporting with full audit trail - NDIS Commission ready",
  "Compliance dashboards - organisational status at a glance",
];

const SCAnnouncementModal = () => {
  const navigate = useNavigate();
  // "modal" | "chip" | "hidden"
  const [state, setState] = useState<"modal" | "chip" | "hidden">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem("sc-modal-seen")) {
      setState("chip");
      return;
    }
    const id = setTimeout(() => {
      sessionStorage.setItem("sc-modal-seen", "1");
      setState("modal");
    }, 2500);
    return () => clearTimeout(id);
  }, []);

  const closeToChip = () => setState("chip");
  const reopen = () => setState("modal");

  const handleRegister = () => {
    setState("hidden");
    navigate("/register-support-coordination");
  };

  const handleLearnMore = () => {
    setState("hidden");
    navigate("/support-coordination");
  };

  return (
    <>
      {/* ── Sticky chip — visible after modal is closed ── */}
      {state === "chip" && (
        <button
          type="button"
          id="sc-chip"
          onClick={reopen}
          aria-label="Reopen Support Coordination announcement"
        >
          {/* <span id="sc-chip-dot" aria-hidden="true" /> */}
          <span id="sc-chip-text">Support Coordination · 3 months free</span>
          <svg id="sc-chip-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* ── Modal ── */}
      {state === "modal" && (
        <div
          id="sc-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Support Coordination announcement"
          onClick={(e) => { if (e.target === e.currentTarget) closeToChip(); }}
        >
          <div id="sc-modal">

            {/* Close → chip */}
            <button type="button" id="sc-modal-close" onClick={closeToChip} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Left — navy panel */}
            <div id="sc-modal-left">
              <div id="sc-modal-badge">Coming Soon</div>
              <h2 id="sc-modal-heading">
                Support Coordination<br />is launching 31 May
              </h2>
              <p id="sc-modal-sub">
                One connected system for caseloads, goals, service agreements,
                invoicing, claims, and compliance. Register now and get 3 months free.
              </p>

              <div id="sc-modal-features">
                <div id="sc-modal-features-label">What's included at launch</div>
                <ul id="sc-modal-list">
                  {FEATURES.map((f) => (
                    <li key={f} className="sc-modal-item">
                      <span className="sc-modal-check">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7l3.5 3.5 6.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — white panel */}
            <div id="sc-modal-right">
              <div id="sc-modal-offer">
                <div id="sc-modal-offer-badge">Early Access Offer</div>
                <div id="sc-modal-offer-heading">3 months free</div>
                <div id="sc-modal-offer-sub">Full platform access from launch day. No restrictions. No payment now.</div>
              </div>

              <div id="sc-modal-benefits">
                <div className="sc-modal-benefit">
                  <span className="sc-modal-benefit-num">01</span>
                  <div>
                    <strong>Register today</strong>
                    <p>Secure your spot on the early access list</p>
                  </div>
                </div>
                <div className="sc-modal-benefit">
                  <span className="sc-modal-benefit-num">02</span>
                  <div>
                    <strong>We notify you at launch</strong>
                    <p>You'll be first to know when the platform goes live</p>
                  </div>
                </div>
                <div className="sc-modal-benefit">
                  <span className="sc-modal-benefit-num">03</span>
                  <div>
                    <strong>Priority onboarding</strong>
                    <p>Our team configures it for you before general release</p>
                  </div>
                </div>
              </div>

              <div id="sc-modal-actions">
                <button type="button" id="sc-modal-cta-primary" onClick={handleRegister}>
                  Register for Early Access
                </button>
                <button type="button" id="sc-modal-cta-secondary" onClick={handleLearnMore}>
                  Learn more
                </button>
              </div>

              <p id="sc-modal-note">No upfront payment required. Launching 31 May 2026.</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SCAnnouncementModal;
