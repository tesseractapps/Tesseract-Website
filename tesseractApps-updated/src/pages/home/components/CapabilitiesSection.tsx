// src/pages/home/components/CapabilitiesSection.tsx
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { CapabilityNavLink } from "../../../../sanity.types";
import { useSanityCapabilityNav } from "../../../hooks/useSanityCapabilityNav";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CapabilitiesSectionProps {
  inView: boolean;
  inViewRef: React.RefCallback<HTMLElement>;
}

const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Leaf component for a single capability card ──────────────────────────────
const CapabilityCard = memo(({ cap, onNavigate }: { cap: CapabilityNavLink; onNavigate: (slug: string) => void }) => (
  <div
    className="hv4-cap-card"
    onClick={() => onNavigate(cap.slug.current)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onNavigate(cap.slug.current)}
  >
    <h3 className="hv4-cap-label">{cap.title}</h3>
    <p className="hv4-cap-desc">{cap.navSubtitle ?? cap.heroSubtitle ?? ""}</p>
    <div className="hv4-cap-link">
      Explore <IconArrowRight />
    </div>
  </div>
));
CapabilityCard.displayName = "CapabilityCard";

/**
 * CapabilitiesSection owns the useSanityCapabilityNav hook so the data fetch
 * is isolated to this subtree. It is memo-wrapped to prevent re-renders from
 * unrelated parent state (e.g. FAQ open/close, hero word rotation).
 */
const CapabilitiesSection = memo(({ inView, inViewRef }: CapabilitiesSectionProps) => {
  const { links } = useSanityCapabilityNav();
  const routerNavigate = useNavigate();

  const handleNavigate = (slug: string) => routerNavigate(`/capabilities/${slug}`);

  return (
    <section
      id="hv4-capabilities"
      ref={inViewRef}
      className={inView ? "hv4-fade-in" : "hv4-fade-pre"}
    >
      <div className="hv4-section-inner">
        <div className="hv4-section-label">The Platform</div>
        <h2 className="hv4-section-h2">See what connects.</h2>
        <p className="hv4-section-sub">
          Every capability on TesseractApps is designed to work as one. Click any module to explore.
        </p>

        <div className="hv4-cap-grid">
          {links.slice(0, 8).map((cap) => (
            <CapabilityCard key={cap._id} cap={cap} onNavigate={handleNavigate} />
          ))}
        </div>

        <div className="hv4-cap-footer">
          <a href="/capabilities" className="hv4-cap-extra-link">
            View all capabilities
            <IconArrowRight />
          </a>
          <div className="hv4-cap-footer-spacer" />
        </div>
      </div>
    </section>
  );
});

CapabilitiesSection.displayName = "CapabilitiesSection";
export default CapabilitiesSection;
