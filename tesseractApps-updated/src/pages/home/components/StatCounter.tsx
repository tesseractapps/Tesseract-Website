// src/pages/home/components/StatCounter.tsx
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ─── Animated counter hook (local) ────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

// ─── Intersection hook (local) ────────────────────────────────────────────────
function useInViewOnce(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * StatCounter renders four animated number counters.
 * All requestAnimationFrame state updates are fully isolated here.
 * The `ref` prop (via forwardRef) exposes the wrapper in case a parent
 * needs to target this element (e.g. scroll-to). The internal IntersectionObserver
 * is self-managed so external refs are never required for triggering the animation.
 */
const StatCounter = forwardRef<HTMLDivElement>((_, forwardedRef) => {
  const { ref: internalRef, inView } = useInViewOnce(0.2);

  const c1 = useCountUp(1000, 1600, inView);
  const c2 = useCountUp(40, 1600, inView);
  const c3 = useCountUp(99, 1600, inView);
  const c4 = useCountUp(16, 1600, inView);

  const STATS: { n: number; suffix: string; label: string }[] = [
    { n: c1, suffix: "+", label: "NDIS Professionals" },
    { n: c2, suffix: "%", label: "Faster Incident Resolution" },
    { n: c3, suffix: ".9%", label: "Platform Uptime" },
    { n: c4, suffix: "+", label: "Integrated Modules" },
  ];

  // Merge internal ref with the forwarded ref so both can point to the element.
  const setRefs = (el: HTMLDivElement | null) => {
    (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  return (
    <section id="hv4-stats" ref={setRefs}>
      <div className="hv4-stats-inner">
        {STATS.map((s, i) => (
          <div key={i} className="hv4-stat-item">
            <div className="hv4-stat-n">
              {s.n}
              <span className="hv4-stat-suffix">{s.suffix}</span>
            </div>
            <div className="hv4-stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

StatCounter.displayName = "StatCounter";
export default StatCounter;
