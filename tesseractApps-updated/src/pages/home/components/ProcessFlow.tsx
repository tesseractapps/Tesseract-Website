// src/pages/home/components/ProcessFlow.tsx
import { memo, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlowStep {
  n: string;
  label: string;
  desc: string;
}

interface ProcessFlowProps {
  steps: FlowStep[];
  inView: boolean;
}

const IconChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path d="M4.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * ProcessFlow renders the operational flow section.
 * activeStep state and the 3.2 s auto-advance interval are fully localized.
 * The component only re-renders when `inView` or `steps` change, or on its
 * internal activeStep changes — never during unrelated parent state updates.
 */
const ProcessFlow = memo(({ steps, inView }: ProcessFlowProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start auto-advance once visible; clear on unmount.
  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView, steps.length]);

  // Reset interval on manual selection so the user's click "resets" the clock.
  const handleSelect = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveStep(i);
    intervalRef.current = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 3200);
  };

  return (
    <div className="hv4-flow-layout">
      {/* Step list */}
      <div className="hv4-flow-list">
        {steps.map((step, i) => (
          <button
            key={i}
            type="button"
            className={`hv4-flow-item${activeStep === i ? " hv4-flow-item--active" : ""}`}
            onClick={() => handleSelect(i)}
          >
            <span className="hv4-flow-num">{step.n}</span>
            <span className="hv4-flow-label">{step.label}</span>
            <span className="hv4-flow-chevron">
              <IconChevronRight />
            </span>
          </button>
        ))}
      </div>

      {/* Active step detail */}
      <div className="hv4-flow-detail">
        <div className="hv4-flow-detail-inner">
          <div className="hv4-flow-detail-num">{steps[activeStep].n}</div>
          <h3 className="hv4-flow-detail-label">{steps[activeStep].label}</h3>
          <p className="hv4-flow-detail-desc">{steps[activeStep].desc}</p>
          <div className="hv4-flow-progress">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hv4-flow-dot${activeStep === i ? " hv4-flow-dot--active" : ""}`}
                onClick={() => handleSelect(i)}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessFlow.displayName = "ProcessFlow";
export default ProcessFlow;
