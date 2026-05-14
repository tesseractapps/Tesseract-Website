import { useEffect, useState } from "react";
import "./CountdownBar.css";

const LAUNCH_DATE = new Date("2026-05-31T00:00:00+10:00"); // AEST

type TimeLeft = { days: number; hours: number; mins: number; secs: number };

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1_000);
  return { days, hours, mins, secs };
}

const pad = (n: number) => String(n).padStart(2, "0");

const CountdownBar = () => {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.days === 0 && time.hours === 0 && time.mins === 0 && time.secs === 0) {
    return null;
  }

  return (
    <div id="cd-bar" role="banner" aria-label="Support Coordination launch countdown">
      <div id="cd-bar-inner">
        <span id="cd-bar-label">Support Coordination launches in</span>
        <div id="cd-bar-units">
          <div className="cd-unit">
            <span className="cd-num">{pad(time.days)}</span>
            <span className="cd-unit-label">days</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num">{pad(time.hours)}</span>
            <span className="cd-unit-label">hrs</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num">{pad(time.mins)}</span>
            <span className="cd-unit-label">min</span>
          </div>
          <span className="cd-sep">:</span>
          <div className="cd-unit">
            <span className="cd-num cd-secs">{pad(time.secs)}</span>
            <span className="cd-unit-label">sec</span>
          </div>
        </div>
        <a href="/register-support-coordination" id="cd-bar-cta">
          Register now
        </a>
      </div>
    </div>
  );
};

export default CountdownBar;
