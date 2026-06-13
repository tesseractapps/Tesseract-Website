import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PromoModal.css";
// import position1 from "../../../assets/position-1.svg";
// import position2 from "../../../assets/position-2.svg";
// import position3 from "../../../assets/position-3.svg";

const DISMISS_KEY = "expo-modal-dismissed-until";
const SESSION_KEY = "expo-modal-seen";
const DISMISS_HOURS = 48;
const MOBILE_DELAY_MS = 1500;

const PromoModal = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<"modal" | "chip" | "hidden">("hidden");

  const shouldSuppress = () => {
    const until = localStorage.getItem(DISMISS_KEY);
    console.log("Until ", until);
    return until ? Date.now() < Number(until) : false;
  };

  const openModal = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setState("modal");
  }, []);

  const dismiss = () => {
    localStorage.setItem(
      DISMISS_KEY,
      String(Date.now() + DISMISS_HOURS * 60 * 60 * 1000),
    );
    setState("chip");
  };

  useEffect(() => {
    console.log("shouldSuppress ", shouldSuppress());
    if (shouldSuppress()) {
      setState("chip");
      return;
    }
    if (sessionStorage.getItem(SESSION_KEY)) {
      setState("chip");
      return;
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        document.removeEventListener("mouseout", handleMouseOut);
        openModal();
      }
    };

    const fallback = setTimeout(() => {
      document.removeEventListener("mouseout", handleMouseOut);
      openModal();
    }, MOBILE_DELAY_MS);

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(fallback);
    };
  }, [openModal]);

  const handleCTA = () => {
    setState("hidden");
    navigate("/events/adelaide-expo-2026");
  };

  return (
    <>
      {state === "chip" && (
        <button
          type="button"
          id="pm-chip"
          onClick={() => setState("modal")}
          aria-label="Reopen Adelaide Expo offer"
        >
          <span id="pm-chip-dot" />
          <span id="pm-chip-text">Adelaide Expo · Win 12 Months Free</span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            id="pm-chip-chevron"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      {state === "modal" && (
        <div
          id="pm-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Adelaide Expo 2026 promotion"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <div id="pm-modal">
            <button
              type="button"
              id="pm-close"
              onClick={dismiss}
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ── Top: event tag + date strip ── */}
            <div id="pm-top-bar">
              <span id="pm-event-tag">
                Adelaide Disability &amp; WorkAbility Expo 2026
              </span>
              <span id="pm-event-meta">
                26–27 June · Adelaide Showground · Booth 05
              </span>
            </div>

            {/* ── Body: two columns ── */}
            <div id="pm-body">
              {/* Left */}
              <div id="pm-left">
                <p id="pm-headline">
                  Stop juggling
                  <br />5 systems.
                </p>
                <p id="pm-sub">One platform. Every NDIS operation.</p>

                <ul id="pm-bullets">
                  <li>
                    <span className="pm-bullet-icon" aria-hidden="true">
                      ✓
                    </span>
                    Rostering that auto-generates SCHADS-compliant payroll
                  </li>
                  <li>
                    <span className="pm-bullet-icon" aria-hidden="true">
                      ✓
                    </span>
                    Incident reports linked directly to audit evidence
                  </li>
                  <li>
                    <span className="pm-bullet-icon" aria-hidden="true">
                      ✓
                    </span>
                    Continuous compliance — no more audit anxiety
                  </li>
                </ul>
              </div>
              <div id="cta-button-container">
                <button type="button" id="pm-cta" onClick={handleCTA}>
                  Register &amp; Enter Prize Draw
                </button>

                <button type="button" id="pm-dismiss" onClick={dismiss}>
                  No thanks, I prefer juggling spreadsheets
                </button>
              </div>

              {/* Right */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoModal;
