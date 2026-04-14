import "./BreadcrumbStyles.css";
import { Link } from "react-router-dom";

export interface BreadcrumbStep {
  name: string;
  href?: string; // omit for the current (last) page
}

interface BreadcrumbProps {
  steps: BreadcrumbStep[];
  /** Light variant for use on dark hero backgrounds */
  variant?: "light" | "dark";
}

const ChevronIcon = () => (
  <svg
    className="bc-chevron"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Breadcrumb = ({ steps, variant = "dark" }: BreadcrumbProps) => {
  if (steps.length < 2) return null;

  return (
    <nav
      className={`bc-nav bc-nav--${variant}`}
      aria-label="Breadcrumb"
    >
      <ol className="bc-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.name}
              className="bc-item"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {!isLast && step.href ? (
                <Link
                  to={step.href}
                  className="bc-link"
                  itemProp="item"
                >
                  <span itemProp="name">{step.name}</span>
                </Link>
              ) : (
                <span
                  className="bc-current"
                  aria-current="page"
                  itemProp="name"
                >
                  {step.name}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && <ChevronIcon />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
