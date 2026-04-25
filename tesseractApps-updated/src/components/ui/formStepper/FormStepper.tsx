import "./FormStepperStyles.css";

interface FormStepperProps {
  steps: string[];
  activeStep: number;
}

export default function FormStepper({ steps, activeStep }: FormStepperProps) {
  return (
    <div className="fstepper">
      {steps.map((label, i) => {
        const done = i < activeStep;
        const active = i === activeStep;
        return (
          <div key={label} className="fstepper-item">
            {i > 0 && (
              <div className={`fstepper-connector${i <= activeStep ? " fstepper-connector--done" : ""}`} />
            )}
            <div className={`fstepper-circle${active ? " fstepper-circle--active" : done ? " fstepper-circle--done" : ""}`}>
              {done ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span className={`fstepper-label${active ? " fstepper-label--active" : done ? " fstepper-label--done" : ""}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
