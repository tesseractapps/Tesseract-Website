import { useState, useEffect, useRef, useCallback } from "react";

/*
 * TesseractApps — Brand Film Component
 * 60-second governance narrative for NDIS providers
 * 7 Acts matching the provided brand script
 * Image paths marked [PLACEHOLDER] — replace before production
 */

// ─── Math helpers ──────────────────────────────────────────────────────────────
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;
const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
const spring = (t) => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  const c = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c) + 1;
};
const sceneOpacity = (progress) => {
  const fadeIn = easeOut(clamp(progress * 8, 0, 1));
  const fadeOut = progress > 0.85 ? 1 - easeIn((progress - 0.85) / 0.15) : 1;
  return fadeIn * fadeOut;
};

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const C = {
  bg: "#060C1A",
  navyDeep: "#070D1B",
  navy: "#0A1628",
  navyMid: "#0E1C34",
  teal: "#0ABAB5",
  tealBright: "#00D9D4",
  tealGlow: "#0AFAF4",
  white: "#FFFFFF",
  offWhite: "#E8EDF5",
  silver: "#C4CDD9",
  gray: "#7E8FA8",
  amber: "#F59E0B",
  red: "#EF4444",
  green: "#22C55E",
  card: "rgba(14,28,52,0.82)",
  cardBorder: "rgba(10,186,181,0.14)",
};
const F = {
  sans: "'Inter','Segoe UI',system-ui,sans-serif",
  mono: "'JetBrains Mono','SF Mono','Fira Code',monospace",
};
const FPS = 30;
const TOTAL_SECS = 60;
const TOTAL = TOTAL_SECS * FPS;

// ─── Timeline ──────────────────────────────────────────────────────────────────
const ACTS = [
  { id: "cold",      label: "Brand Signature",   start: 0,  end: 3  },
  { id: "chaos",     label: "Chaos",             start: 3,  end: 10 },
  { id: "emerge",    label: "System Emergence",  start: 10, end: 20 },
  { id: "workflow",  label: "Workflow",          start: 20, end: 32 },
  { id: "transform", label: "Transformation",   start: 32, end: 45 },
  { id: "badges",    label: "Authority",         start: 45, end: 55 },
  { id: "reveal",    label: "Brand Reveal",      start: 55, end: 60 },
];

function getAct(frame) {
  const sec = frame / FPS;
  for (const a of ACTS) {
    if (sec >= a.start && sec < a.end) {
      const duration = a.end - a.start;
      const elapsed = sec - a.start;
      return { ...a, progress: elapsed / duration, localSec: elapsed, localFrame: Math.floor(elapsed * FPS) };
    }
  }
  const last = ACTS[ACTS.length - 1];
  return { ...last, progress: 1, localSec: last.end - last.start, localFrame: (last.end - last.start) * FPS };
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

// Animated word-by-word text reveal
function WordReveal({ text, startFrame, lf, delay = 2, color = C.offWhite, style = {} }) {
  const words = text.split(" ");
  return (
    <span style={{ color, ...style }}>
      {words.map((w, i) => {
        const p = easeOut(clamp((lf - startFrame - i * delay) / 12, 0, 1));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${lerp(10, 0, p)}px)`,
              marginRight: "0.28em",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}

// Thin horizontal brand accent line
function AccentLine({ lf, delay = 0, width = 60, style = {} }) {
  const p = easeOut(clamp((lf - delay) / 20, 0, 1));
  return (
    <div
      style={{
        width: width * p,
        height: 1.5,
        background: `linear-gradient(90deg, ${C.teal}, transparent)`,
        borderRadius: 1,
        ...style,
      }}
    />
  );
}

// Tesseract cube glyph — pure SVG, no emoji
function CubeGlyph({ size = 48, frame = 0, glow = false, opacity = 1 }) {
  const t = (frame * 0.6 * Math.PI) / 180;
  const s = size * 0.5;
  const cx = size / 2;
  const cy = size / 2;
  const r = s * 0.72;
  const ri = r * 0.48;

  // Outer square rotated
  const outer = Array.from({ length: 4 }, (_, i) => {
    const a = Math.PI / 4 + (i * Math.PI) / 2 + t;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  // Inner square counter-rotated
  const inner = Array.from({ length: 4 }, (_, i) => {
    const a = Math.PI / 4 + (i * Math.PI) / 2 - t * 0.5;
    return [cx + Math.cos(a) * ri, cy + Math.sin(a) * ri];
  });
  const pathOf = (pts) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }}>
      <defs>
        <linearGradient id={`cg_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.teal} />
          <stop offset="100%" stopColor={C.tealBright} />
        </linearGradient>
        {glow && (
          <filter id={`gf_${size}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      {/* Connector spokes */}
      {outer.map(([ox, oy], i) => (
        <line key={i} x1={ox} y1={oy} x2={inner[i][0]} y2={inner[i][1]}
          stroke={C.teal} strokeWidth="0.9" opacity="0.35" />
      ))}
      {/* Inner square */}
      <path d={pathOf(inner)} fill="none" stroke={C.tealBright} strokeWidth="1.2" opacity="0.5" />
      {/* Outer square */}
      <path d={pathOf(outer)} fill="none" stroke={`url(#cg_${size})`} strokeWidth="2"
        filter={glow ? `url(#gf_${size})` : undefined} />
      {/* Corner dots */}
      {outer.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="2.2" fill={C.teal} />
      ))}
    </svg>
  );
}

// Perspective grid floor
function GridFloor({ frame, opacity = 1 }) {
  const pulse = 0.03 + Math.sin(frame * 0.007) * 0.012;
  const hex = Math.round(pulse * 255).toString(16).padStart(2, "0");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${C.teal}${hex} 1px, transparent 1px), linear-gradient(90deg, ${C.teal}${hex} 1px, transparent 1px)`,
        backgroundSize: "52px 52px",
        transform: `perspective(1100px) rotateX(${64 + Math.sin(frame * 0.005) * 1.2}deg)`,
        transformOrigin: "center 80%",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
        opacity,
      }}
    />
  );
}

// Floating particle field
const PARTICLE_DATA = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37 + 13) % 100,
  y: (i * 61 + 7) % 100,
  r: 1.2 + ((i * 17) % 10) * 0.18,
  speed: 0.05 + ((i * 7) % 10) * 0.008,
  phase: i * 0.43,
}));

function ParticleField({ frame }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x + Math.sin(frame * 0.009 + p.phase) * 1.5}%`,
            top: `${(p.y + frame * p.speed * 0.05) % 108 - 4}%`,
            width: p.r * 2,
            height: p.r * 2,
            borderRadius: "50%",
            background: C.teal,
            opacity: 0.04 + Math.sin(frame * 0.015 + p.phase) * 0.02,
          }}
        />
      ))}
    </div>
  );
}

// Image placeholder tile
function ImgPlaceholder({ width, height, label, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        background: "rgba(10,186,181,0.06)",
        border: "1px dashed rgba(10,186,181,0.3)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        ...style,
      }}
    >
      {/* Image icon — SVG */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5" opacity="0.6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span style={{ fontFamily: F.mono, fontSize: 8, color: C.teal, opacity: 0.6, letterSpacing: 1, textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}

// UI panel shell
function UIPanel({ title, icon, children, lf, delay = 0, active = false, style = {} }) {
  const p = easeOut(clamp((lf - delay) / 18, 0, 1));
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${active ? C.teal + "55" : C.cardBorder}`,
        borderRadius: 10,
        padding: "12px 14px",
        backdropFilter: "blur(12px)",
        opacity: p,
        transform: `translateY(${lerp(18, 0, p)}px)`,
        transition: "border-color 0.4s",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Animated border sweep when active */}
      {active && (
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 11,
            background: `linear-gradient(90deg, transparent, ${C.teal}44, transparent)`,
            animation: "borderSweep 2s linear infinite",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, position: "relative" }}>
        <span style={{ color: C.teal, lineHeight: 1 }}>{icon}</span>
        <span style={{ fontFamily: F.mono, fontSize: 9, fontWeight: 700, color: C.silver, letterSpacing: 1.2, textTransform: "uppercase" }}>
          {title}
        </span>
        {/* Glyph pulse */}
        <div style={{ marginLeft: "auto", opacity: active ? 1 : 0.3, transition: "opacity 0.4s" }}>
          <CubeGlyph size={14} frame={lf} />
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

// Horizontal metric bar
function MetricBar({ label, value, color = C.teal, lf, delay = 0 }) {
  const p = easeOut(clamp((lf - delay) / 25, 0, 1));
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: F.mono, fontSize: 8, color: C.gray, letterSpacing: 0.8 }}>{label}</span>
        <span style={{ fontFamily: F.mono, fontSize: 8, color, fontWeight: 700 }}>{Math.round(value * p)}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: `${value * p}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 2,
            boxShadow: `0 0 6px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

// ─── ACT 1: Cold Open 0–3s ─────────────────────────────────────────────────────
function ActCold({ progress, localFrame: lf }) {
  const beamP = easeOut(clamp(lf / 20, 0, 1));
  const gridP = easeOut(clamp((lf - 18) / 30, 0, 1));
  const cubeP = spring(clamp((lf - 52) / 20, 0, 1));
  const dissolveP = progress > 0.8 ? easeIn((progress - 0.8) / 0.2) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Grid drawing in */}
      <div style={{ position: "absolute", inset: 0, opacity: gridP * (1 - dissolveP) }}>
        <GridFloor frame={lf} />
      </div>

      {/* Light beam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 2,
          height: `${beamP * 100}%`,
          background: `linear-gradient(to bottom, transparent, ${C.teal}88, transparent)`,
          transform: "translateX(-50%)",
          opacity: 1 - dissolveP,
        }}
      />

      {/* Central cube forming from grid */}
      <div
        style={{
          transform: `scale(${cubeP}) rotate(${(1 - cubeP) * 45}deg)`,
          opacity: cubeP * (1 - dissolveP),
        }}
      >
        <CubeGlyph size={80} frame={lf} glow />
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: easeOut(clamp((lf - 60) / 15, 0, 1)) * (1 - dissolveP),
          fontFamily: F.mono,
          fontSize: 10,
          color: C.gray,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Every strong organisation begins with structure.
      </div>
    </div>
  );
}

// ─── ACT 2: Chaos 3–10s ───────────────────────────────────────────────────────
const CHAOS_ITEMS = [
  { label: "Incident Report #4471", w: 140, h: 60, top: "12%", left: "5%" },
  { label: "Compliance Spreadsheet", w: 160, h: 70, top: "8%", left: "60%" },
  { label: "Policy Manual v3.2", w: 130, h: 55, top: "28%", left: "72%" },
  { label: "Email: Urgent Review", w: 150, h: 52, top: "55%", left: "8%" },
  { label: "Audit Checklist", w: 120, h: 60, top: "60%", left: "55%" },
  { label: "HR Dashboard", w: 155, h: 65, top: "38%", left: "28%" },
  { label: "Payroll Export", w: 125, h: 50, top: "72%", left: "22%" },
];

function ChaosIcon({ type, size = 16 }) {
  const icons = {
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.amber} strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.5"><path d="M12 2l9.5 16.5H2.5L12 2z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17.5" r="0.5" fill={C.red}/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.silver} strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.gray} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  };
  const keys = Object.keys(icons);
  return icons[keys[Math.floor(type) % keys.length]];
}

function ActChaos({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {CHAOS_ITEMS.map((item, i) => {
        const appear = easeOut(clamp((lf - i * 8) / 14, 0, 1));
        const flicker = 0.65 + Math.sin(lf * 0.07 + i * 2.1) * 0.2;
        const drift = {
          x: Math.sin(lf * 0.04 + i * 1.3) * 6,
          y: Math.cos(lf * 0.035 + i * 0.9) * 4,
          r: Math.sin(lf * 0.025 + i) * 3,
        };
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              width: item.w,
              height: item.h,
              background: "rgba(10,22,40,0.88)",
              border: `1px solid rgba(10,186,181,0.18)`,
              borderRadius: 6,
              padding: "8px 10px",
              opacity: appear * flicker,
              transform: `translate(${drift.x}px, ${drift.y}px) rotate(${drift.r}deg)`,
              backdropFilter: "blur(4px)",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <ChaosIcon type={i} size={12} />
              <span style={{ fontFamily: F.mono, fontSize: 7.5, color: C.silver, letterSpacing: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.label}
              </span>
            </div>
            {/* Fake content lines */}
            {[0.7, 0.5, 0.85].slice(0, 2 + (i % 2)).map((w, j) => (
              <div key={j} style={{ height: 2, background: "rgba(200,210,225,0.12)", borderRadius: 1, width: `${w * 100}%`, marginBottom: 4 }} />
            ))}
          </div>
        );
      })}

      {/* Disconnect lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
        <line x1="25%" y1="20%" x2="75%" y2="65%" stroke={C.teal} strokeWidth="1" strokeDasharray="4,6" />
        <line x1="65%" y1="15%" x2="35%" y2="70%" stroke={C.teal} strokeWidth="1" strokeDasharray="4,6" />
      </svg>

      {/* Voiceover text overlay */}
      <div style={{ position: "absolute", bottom: "14%", left: 0, right: 0, textAlign: "center", padding: "0 60px" }}>
        <WordReveal
          text="Fragmented systems. Scattered information. Disconnected workflows."
          startFrame={20} lf={lf} delay={3}
          color={C.silver}
          style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 500, lineHeight: 1.7, display: "block" }}
        />
        <WordReveal
          text="Creating governance risk at every level."
          startFrame={65} lf={lf} delay={3}
          color={C.offWhite}
          style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 600, lineHeight: 1.7, display: "block", marginTop: 4 }}
        />
      </div>
    </div>
  );
}

// ─── ACT 3: System Emergence 10–20s ──────────────────────────────────────────
const PANELS = [
  {
    title: "Risk Dashboard",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M12 2l9.5 16.5H2.5L12 2z"/></svg>,
    delay: 0,
  },
  {
    title: "Incident Management",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    delay: 18,
  },
  {
    title: "Policy Compliance",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
    delay: 36,
  },
  {
    title: "Credential Tracking",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    delay: 54,
  },
];

function ActEmerge({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  const activePanelIdx = Math.floor(lf / 50) % 4;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {/* Background grid returning */}
      <GridFloor frame={lf} opacity={0.4} />

      {/* Header */}
      <div style={{ position: "absolute", top: "10%", left: 0, right: 0, textAlign: "center" }}>
        <div style={{ opacity: easeOut(clamp(lf / 16, 0, 1)) }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.teal, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10 }}>
            Governance Operating System
          </div>
          <div style={{ fontFamily: F.sans, fontSize: 26, fontWeight: 700, color: C.white, letterSpacing: "-0.5px" }}>
            <span style={{ color: C.teal }}>Tesseract</span>Apps
          </div>
          <AccentLine lf={lf} delay={12} width={48} style={{ margin: "10px auto" }} />
          <WordReveal
            text="Aligning people, process, and evidence — by design."
            startFrame={20} lf={lf} delay={2.5}
            color={C.silver}
            style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.7, display: "block" }}
          />
        </div>
      </div>

      {/* UI Panels grid */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          width: 540,
        }}
      >
        {PANELS.map((panel, i) => (
          <UIPanel
            key={i}
            title={panel.title}
            icon={panel.icon}
            lf={lf}
            delay={panel.delay}
            active={activePanelIdx === i && lf > 60}
          >
            <ImgPlaceholder
              width="100%"
              height={55}
              label={`[PLACEHOLDER: ${panel.title} screenshot]`}
            />
          </UIPanel>
        ))}
      </div>
    </div>
  );
}

// ─── ACT 4: Workflow Experience 20–32s ────────────────────────────────────────
const WORKFLOW_STEPS = [
  { role: "Support Worker", action: "Task completion & sign-off", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { role: "Manager", action: "Workflow approval", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.8"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> },
  { role: "Compliance Officer", action: "Policy alignment review", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { role: "CEO", action: "Governance insights", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg> },
];

function ActWorkflow({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  const activeStep = Math.min(3, Math.floor(lf / 55));
  const connectorProgress = (i) => easeOut(clamp((lf - (i + 1) * 55 + 12) / 25, 0, 1));

  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {/* Subtle grid */}
      <GridFloor frame={lf} opacity={0.25} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 48px" }}>
        {/* Header copy */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <WordReveal text="Every task. Every decision. Every audit trail." startFrame={5} lf={lf} delay={2.5} color={C.offWhite}
            style={{ fontFamily: F.sans, fontSize: 18, fontWeight: 600, lineHeight: 1.6, display: "block" }} />
          <WordReveal text="Connected, compliant, and quietly captured." startFrame={30} lf={lf} delay={2.5} color={C.teal}
            style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 500, lineHeight: 1.6, display: "block", marginTop: 2 }} />
        </div>

        {/* Workflow chain */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
          {WORKFLOW_STEPS.map((step, i) => {
            const p = easeOut(clamp((lf - i * 55) / 25, 0, 1));
            const isActive = activeStep === i;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                {/* Step card */}
                <div style={{
                  flex: 1,
                  background: isActive ? `rgba(10,186,181,0.08)` : C.card,
                  border: `1px solid ${isActive ? C.teal + "55" : C.cardBorder}`,
                  borderRadius: 10,
                  padding: "14px 12px",
                  opacity: p,
                  transform: `translateY(${lerp(14, 0, p)}px)`,
                  transition: "background 0.4s, border-color 0.4s",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Brand accent line when active */}
                  {isActive && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${C.teal}, transparent)`,
                      animation: "borderSweep 1.8s linear infinite",
                    }} />
                  )}
                  <div style={{ marginBottom: 8, color: isActive ? C.tealBright : C.teal }}>
                    {step.icon}
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 7.5, color: C.gray, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                    {step.role}
                  </div>
                  <div style={{ fontFamily: F.sans, fontSize: 11, color: isActive ? C.offWhite : C.silver, fontWeight: 500, lineHeight: 1.4 }}>
                    {step.action}
                  </div>
                  {/* Tiny glyph */}
                  <div style={{ position: "absolute", bottom: 8, right: 8, opacity: isActive ? 0.7 : 0.2 }}>
                    <CubeGlyph size={12} frame={lf} />
                  </div>
                </div>
                {/* Connector arrow */}
                {i < 3 && (
                  <div style={{ width: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 20 * connectorProgress(i),
                      height: 1.5,
                      background: `linear-gradient(90deg, ${C.teal}88, ${C.tealBright}88)`,
                      borderRadius: 1,
                      position: "relative",
                      overflow: "visible",
                    }}>
                      {connectorProgress(i) > 0.9 && (
                        <div style={{
                          position: "absolute",
                          right: -4,
                          top: -3,
                          width: 7,
                          height: 7,
                          borderRight: `1.5px solid ${C.teal}`,
                          borderTop: `1.5px solid ${C.teal}`,
                          transform: "rotate(45deg)",
                        }} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Audit log strip */}
        {lf > 160 && (
          <div style={{
            marginTop: 18,
            width: "100%",
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 8,
            padding: "10px 14px",
            opacity: easeOut(clamp((lf - 160) / 20, 0, 1)),
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 8, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Audit Log</div>
            {["Task signed off by J.Williams · 14:02", "Policy v4.1 approved · Manager consent captured", "Incident #0391 closed · Evidence attached"].map((entry, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: i < 2 ? 5 : 0,
                opacity: easeOut(clamp((lf - 170 - i * 10) / 12, 0, 1)),
              }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal, flexShrink: 0 }} />
                <span style={{ fontFamily: F.mono, fontSize: 8, color: C.silver, letterSpacing: 0.3 }}>{entry}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ACT 5: Transformation 32–45s ────────────────────────────────────────────
function HeatmapCell({ value, lf, delay }) {
  const p = easeOut(clamp((lf - delay) / 20, 0, 1));
  const color = value < 0.33 ? C.red : value < 0.66 ? C.amber : C.teal;
  return (
    <div style={{
      width: 18, height: 18, borderRadius: 3,
      background: color,
      opacity: p * (0.4 + value * 0.6),
      transform: `scale(${lerp(0.3, 1, p)})`,
      transition: "background 1.2s ease",
    }} />
  );
}

function ActTransform({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  const totalSec = 13;
  const phaseSec = lf / FPS;

  // Risk heatmap — shifts from bad to good over the scene
  const heatPhase = clamp(phaseSec / totalSec, 0, 1);
  const heatmap = Array.from({ length: 25 }, (_, i) => {
    const base = ((i * 37 + 11) % 100) / 100;
    return clamp(base + heatPhase * 0.6, 0, 1);
  });

  // Compliance score
  const complianceScore = Math.round(lerp(62, 94, easeInOut(clamp(phaseSec / totalSec, 0, 1))));

  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <GridFloor frame={lf} opacity={0.2} />

      {/* Subtle cube watermark */}
      <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.05 }}>
        <CubeGlyph size={180} frame={lf} />
      </div>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 44px" }}>
        <WordReveal text="Governance gaps close." startFrame={8} lf={lf} delay={3} color={C.offWhite}
          style={{ fontFamily: F.sans, fontSize: 20, fontWeight: 700, display: "block", textAlign: "center", marginBottom: 2 }} />
        <WordReveal text="Insights turn into action. Data drives confident, controlled decisions." startFrame={35} lf={lf} delay={2.5} color={C.silver}
          style={{ fontFamily: F.sans, fontSize: 14, display: "block", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, width: "100%", maxWidth: 620 }}>
          {/* Risk Heatmap */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 10,
            padding: "14px",
            opacity: easeOut(clamp(lf / 20, 0, 1)),
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 8, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Risk Heatmap</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }}>
              {heatmap.map((v, i) => <HeatmapCell key={i} value={v} lf={lf} delay={i * 3} />)}
            </div>
          </div>

          {/* Compliance Score */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 10,
            padding: "14px",
            opacity: easeOut(clamp((lf - 15) / 20, 0, 1)),
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 8, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Compliance Score</div>
            <div style={{
              fontFamily: F.mono, fontSize: 38, fontWeight: 700,
              color: complianceScore > 85 ? C.teal : complianceScore > 70 ? C.amber : C.red,
              lineHeight: 1, marginBottom: 4,
              transition: "color 0.8s ease",
            }}>
              {complianceScore}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.gray }}>/ 100</div>
            <div style={{ marginTop: 10, width: "100%", height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{
                height: "100%",
                width: `${complianceScore}%`,
                background: `linear-gradient(90deg, ${C.red}, ${C.amber} 60%, ${C.teal})`,
                borderRadius: 2, transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          {/* Governance Maturity */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 10,
            padding: "14px",
            opacity: easeOut(clamp((lf - 30) / 20, 0, 1)),
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 8, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Governance Maturity</div>
            <MetricBar label="Risk Controls" value={87} color={C.teal} lf={lf} delay={40} />
            <MetricBar label="Policy Coverage" value={93} color={C.teal} lf={lf} delay={55} />
            <MetricBar label="Audit Readiness" value={81} color={C.tealBright} lf={lf} delay={70} />
            <MetricBar label="Evidence Capture" value={96} color={C.teal} lf={lf} delay={85} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACT 6: Authority Badges 45–55s ──────────────────────────────────────────
const BADGES = [
  {
    label: "Governance-First",
    sub: "Built from the ground up for NDIS governance infrastructure",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><path d="M12 2l9.5 16.5H2.5L12 2z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill={C.teal}/></svg>,
  },
  {
    label: "Audit-Ready",
    sub: "Every action captured, traceable, and evidence-backed",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  },
  {
    label: "NDIS-Aligned",
    sub: "Purpose-built for the NDIS Practice Standards",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  },
  {
    label: "Evidence-Based",
    sub: "Decisions supported by real data and documented process",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  },
];

function Badge({ data, lf, delay }) {
  const p = spring(clamp((lf - delay) / 28, 0, 1));
  const sheen = clamp((lf - delay - 28) / 20, 0, 1);

  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(14,28,52,0.92), rgba(10,22,40,0.95))`,
      border: `1px solid rgba(10,186,181,0.25)`,
      borderRadius: 14,
      padding: "20px 18px",
      textAlign: "center",
      opacity: p,
      transform: `scale(${lerp(0.8, 1, p)}) translateY(${lerp(16, 0, p)}px)`,
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
      boxShadow: `0 0 ${20 * p}px rgba(10,186,181,0.08)`,
    }}>
      {/* Metallic sheen sweep */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(105deg, transparent ${sheen * 100 - 20}%, rgba(255,255,255,0.06) ${sheen * 100}%, transparent ${sheen * 100 + 20}%)`,
        pointerEvents: "none",
      }} />
      {/* Grid pulse behind badge */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(10,186,181,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,186,181,0.04) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        opacity: 0.6,
      }} />
      <div style={{ position: "relative" }}>
        <div style={{ marginBottom: 10 }}>{data.icon}</div>
        <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 6 }}>{data.label}</div>
        <div style={{ fontFamily: F.sans, fontSize: 10, color: C.gray, lineHeight: 1.5 }}>{data.sub}</div>
        <div style={{ marginTop: 10, opacity: 0.4 }}>
          <CubeGlyph size={16} frame={lf} />
        </div>
      </div>
    </div>
  );
}

function ActBadges({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <GridFloor frame={lf} opacity={0.18} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 44px" }}>
        <div style={{ textAlign: "center", marginBottom: 22, opacity: easeOut(clamp(lf / 18, 0, 1)) }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.teal, letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>
            Built by governance experts
          </div>
          <WordReveal text="Trusted by providers who treat compliance as infrastructure."
            startFrame={15} lf={lf} delay={2.5} color={C.silver}
            style={{ fontFamily: F.sans, fontSize: 14, lineHeight: 1.6, display: "block" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, width: "100%", maxWidth: 680 }}>
          {BADGES.map((badge, i) => (
            <Badge key={i} data={badge} lf={lf} delay={i * 35} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ACT 7: Brand Reveal 55–60s ──────────────────────────────────────────────
function ActReveal({ progress, localFrame: lf }) {
  const op = sceneOpacity(progress);
  // Grid returns
  const gridP = easeOut(clamp(lf / 18, 0, 1));
  // Lines collapse inward → cube forms
  const cubeFormP = spring(clamp((lf - 20) / 28, 0, 1));
  // Wordmark appears
  const wordP = easeOut(clamp((lf - 52) / 20, 0, 1));
  // CTA appears
  const ctaP = easeOut(clamp((lf - 80) / 18, 0, 1));
  const ctaPulse = 0.97 + Math.sin(lf * 0.1) * 0.03;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <GridFloor frame={lf} opacity={gridP * 0.5} />

      {/* Radiating lines collapsing inward */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const collapseP = easeIn(clamp((lf - 5) / 22, 0, 1));
          const from = 260;
          const to = 50;
          const len = lerp(from, to, collapseP);
          const cx = 390, cy = 219;
          return (
            <line
              key={i}
              x1={cx + Math.cos(angle) * len}
              y1={cy + Math.sin(angle) * len}
              x2={cx + Math.cos(angle) * (len - 30 * collapseP)}
              y2={cy + Math.sin(angle) * (len - 30 * collapseP)}
              stroke={C.teal}
              strokeWidth="1"
              opacity={0.18 * gridP}
            />
          );
        })}
      </svg>

      {/* Central cube */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -55%) scale(${cubeFormP}) rotate(${(1 - cubeFormP) * 90}deg)`,
      }}>
        <CubeGlyph size={90} frame={lf} glow />
      </div>

      {/* Wordmark */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        textAlign: "center",
        transform: "translateY(28px)",
        opacity: wordP,
      }}>
        <div style={{
          fontFamily: F.sans,
          fontSize: 40,
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-1px",
          lineHeight: 1,
        }}>
          <span style={{ color: C.teal }}>Tesseract</span>Apps
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.gray, letterSpacing: 4, textTransform: "uppercase", marginTop: 8 }}>
          Governance Operating System · NDIS Providers
        </div>
        <AccentLine lf={lf} delay={60} width={60} style={{ margin: "12px auto 0" }} />
      </div>

      {/* CTA */}
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: ctaP,
        transform: `scale(${ctaPulse * ctaP + (1 - ctaP)})`,
      }}>
        <div style={{
          display: "inline-block",
          padding: "12px 32px",
          borderRadius: 50,
          background: `linear-gradient(135deg, ${C.teal}, ${C.tealBright})`,
          fontFamily: F.sans,
          fontSize: 13,
          fontWeight: 700,
          color: C.navyDeep,
          letterSpacing: 0.5,
          boxShadow: `0 0 30px ${C.teal}55, 0 0 60px ${C.teal}22`,
        }}>
          Book Your Governance Alignment Session
        </div>
      </div>
    </div>
  );
}

// ─── Progress bar & HUD ───────────────────────────────────────────────────────
function ProgressBar({ frame }) {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, zIndex: 10 }}>
      <div style={{
        height: "100%",
        width: `${(frame / TOTAL) * 100}%`,
        background: `linear-gradient(90deg, ${C.teal}, ${C.tealBright})`,
        boxShadow: `0 0 8px ${C.teal}99`,
        transition: "width 0.05s linear",
      }} />
    </div>
  );
}

function Timecode({ frame }) {
  const s = frame / FPS;
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return (
    <div style={{
      position: "absolute", top: 12, right: 14, zIndex: 10,
      fontFamily: F.mono, fontSize: 10, color: C.gray + "66", letterSpacing: 1.5,
    }}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

function Watermark({ frame }) {
  return (
    <div style={{
      position: "absolute", top: 11, left: 14, zIndex: 10,
      display: "flex", alignItems: "center", gap: 7, opacity: 0.3,
    }}>
      <CubeGlyph size={18} frame={frame} />
      <span style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, color: C.silver }}>
        <span style={{ color: C.teal }}>Tesseract</span>Apps
      </span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function HomePageVideo() {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastRef.current = performance.now();
    const tick = (now) => {
      const dt = now - lastRef.current;
      lastRef.current = now;
      setFrame((prev) => {
        const next = prev + (dt / 1000) * FPS;
        if (next >= TOTAL) {
          setPlaying(false);
          return TOTAL - 1;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing]);

  const f = Math.floor(frame);
  const act = getAct(f);

  const handlePlay = useCallback(() => {
    setFrame(0);
    setPlaying(true);
  }, []);

  const handlePauseResume = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  const handleJump = useCallback((sec) => {
    setFrame(sec * FPS);
    setPlaying(true);
  }, []);

  const handleScrub = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    setFrame(ratio * TOTAL);
    setPlaying(false);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      padding: "20px 16px",
      minHeight: "100vh",
      background: "#030810",
      fontFamily: F.sans,
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes borderSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Video canvas ── */}
      <div
        style={{
          width: 780,
          height: 439,
          background: C.navy,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 4px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(10,186,181,0.04)`,
          flexShrink: 0,
        }}
      >
        {/* Base gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 35%, ${C.navyMid} 0%, ${C.navy} 55%, ${C.navyDeep} 100%)`,
        }} />

        {/* Particle field */}
        <ParticleField frame={f} />

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,12,26,0.7) 100%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* HUD */}
        <Watermark frame={f} />
        <Timecode frame={f} />

        {/* Scene content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%" }}>
          {act.id === "cold"      && <ActCold      progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "chaos"     && <ActChaos     progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "emerge"    && <ActEmerge    progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "workflow"  && <ActWorkflow  progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "transform" && <ActTransform progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "badges"    && <ActBadges    progress={act.progress} localFrame={act.localFrame} />}
          {act.id === "reveal"    && <ActReveal    progress={act.progress} localFrame={act.localFrame} />}
        </div>

        {/* Progress bar */}
        <ProgressBar frame={f} />
      </div>

      {/* ── Scrubber ── */}
      <div
        onClick={handleScrub}
        style={{
          width: 780,
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          cursor: "pointer",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${(f / TOTAL) * 100}%`,
          background: `linear-gradient(90deg, ${C.teal}, ${C.tealBright})`,
          borderRadius: 2,
        }} />
        {/* Act markers */}
        {ACTS.map((a, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(a.start / TOTAL_SECS) * 100}%`,
              top: -2,
              width: 1,
              height: 8,
              background: "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

      {/* ── Controls ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={handlePlay}
          style={{
            padding: "9px 22px", borderRadius: 50, cursor: "pointer",
            background: `linear-gradient(135deg, ${C.teal}, ${C.tealBright})`,
            color: C.navyDeep, fontFamily: F.sans, fontSize: 13, fontWeight: 700, border: "none",
            boxShadow: `0 0 20px ${C.teal}44`,
          }}
        >
          Restart
        </button>
        <button
          onClick={handlePauseResume}
          style={{
            padding: "9px 22px", borderRadius: 50, cursor: "pointer",
            background: "rgba(14,28,52,0.8)", color: C.silver,
            fontFamily: F.sans, fontSize: 13, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.gray }}>
          {(f / FPS).toFixed(1)}s / {TOTAL_SECS}.0s
        </span>
        <span style={{
          fontFamily: F.mono, fontSize: 9, color: C.teal,
          fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          {act.label}
        </span>
      </div>

      {/* ── Act navigation ── */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {ACTS.map((a, i) => {
          const isActive = act.id === a.id;
          return (
            <button
              key={i}
              onClick={() => handleJump(a.start)}
              style={{
                padding: "5px 13px", borderRadius: 6, cursor: "pointer",
                background: isActive ? `rgba(10,186,181,0.12)` : "rgba(255,255,255,0.03)",
                color: isActive ? C.teal : C.gray,
                border: isActive ? `1px solid rgba(10,186,181,0.3)` : "1px solid transparent",
                fontFamily: F.mono, fontSize: 9, fontWeight: isActive ? 700 : 400, letterSpacing: 0.5,
              }}
            >
              {a.start}s — {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
