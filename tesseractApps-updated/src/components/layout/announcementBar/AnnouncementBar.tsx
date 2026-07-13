import { useEffect, useRef, useState } from "react";
import "./AnnouncementBar.css";

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

function isLaunched() {
  return Date.now() >= LAUNCH_DATE.getTime();
}

const pad = (n: number) => String(n).padStart(2, "0");

// ── Confetti particle ─────────────────────────────────────────────────────

const COLORS = ["#fff", "#7dc4f0", "#0c78ba", "#ffd700", "#ff6b6b", "#a8edba"];

function spawnConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = 36;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 4 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speed: Math.random() * 1.5 + 0.8,
    drift: (Math.random() - 0.5) * 1.2,
    spin: (Math.random() - 0.5) * 0.15,
    angle: Math.random() * Math.PI * 2,
  }));

  let frame: number;
  let elapsed = 0;

  function draw() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.angle);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = Math.max(0, 1 - elapsed / 3000);
      ctx!.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx!.restore();
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;
    });
    elapsed += 16;
    if (elapsed < 3500) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  frame = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(frame);
}

// ── Component ─────────────────────────────────────────────────────────────

const AnnouncementBar = () => {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const [launched, setLaunched] = useState(isLaunched);
  const [confettiFired, setConfettiFired] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (launched) return;
    const id = setInterval(() => {
      const t = getTimeLeft();
      setTime(t);
      if (t.days === 0 && t.hours === 0 && t.mins === 0 && t.secs === 0) {
        setLaunched(true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [launched]);

  // Fire confetti once when launched state first becomes true
  useEffect(() => {
    if (!launched || confettiFired) return;
    setConfettiFired(true);
    if (canvasRef.current) {
      spawnConfetti(canvasRef.current);
      // Re-fire every 4 seconds for a little while
      let count = 0;
      const id = setInterval(() => {
        count++;
        if (canvasRef.current) spawnConfetti(canvasRef.current);
        if (count >= 3) clearInterval(id);
      }, 4000);
    }
  }, [launched, confettiFired]);

  if (launched) {
    return (
      <div
        id="cd-bar"
        className="cd-bar--launched"
        role="banner"
        aria-label="Support Coordination launched"
      >
        <canvas ref={canvasRef} id="cd-confetti" aria-hidden="true" />
        <div id="cd-bar-inner">
          <span className="cd-launched-emoji">🎉</span>
          <span className="cd-bar-label">
            Support Coordination App Early Access Special: 3 Months Free on a
            12-Month Plan
          </span>
          <a href="/book-a-demo/" className="cd-bar-cta">
            Book a Demo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      id="cd-bar"
      role="banner"
      aria-label="Support Coordination launch countdown"
    >
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
        <a href="/register-support-coordination/" id="cd-bar-cta">
          Register now
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
