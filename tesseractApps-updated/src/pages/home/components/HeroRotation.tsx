// src/pages/home/components/HeroRotation.tsx
import { memo, useEffect, useState } from "react";

const HERO_WORDS = ["Rostering.", "Payroll.", "Compliance.", "Claiming.", "Reporting."];

/**
 * HeroRotation renders only the animated rotating word + static suffix.
 * The wordIdx / wordFade state and the 2 s interval are fully isolated here.
 * memo() prevents re-renders triggered by sibling/parent state changes.
 */
const HeroRotation = memo(() => {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % HERO_WORDS.length);
        setWordFade(true);
      }, 220);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hv4-hero-word-row">
      <span className={`hv4-hero-word${wordFade ? " hv4-hero-word--in" : " hv4-hero-word--out"}`}>
        {HERO_WORDS[wordIdx]}
      </span>
      <span className="hv4-hero-word-static">All connected.</span>
    </div>
  );
});

HeroRotation.displayName = "HeroRotation";
export default HeroRotation;
