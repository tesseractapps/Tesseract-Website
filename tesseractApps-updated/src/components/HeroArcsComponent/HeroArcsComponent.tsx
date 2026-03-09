import { useEffect, useRef, useState } from "react";
import { useAppNavigate } from "../../hooks/useAppNavigate";

// --- geometry helpers ---
const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, ang: number) => ({
  x: cx + r * Math.cos(toRad(ang)),
  y: cy + r * Math.sin(toRad(ang)),
});
const arcPath = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  mirror = false
) => {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweep = mirror ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`;
};

// --- Types ---
type PendulumConfig = {
  id: string;
  cx: number;
  cy: number;
  r: number;
  startAngle: number;
  endAngle: number;
  icon: string;
  duration: number;
  bufferStart: number; // separate start buffer
  bufferEnd: number; // separate end buffer
  color: string;
  iconSize: number;
  bg: string;
  minScale: number;
  maxScale: number;
  mirror: boolean;
  startPos: number; // initial swing position
  initialDirection: number; // initial swing direction
  label: string; // tooltip text
};

interface PendulumState {
  progress: number;
  direction: number;
  paused: boolean;
  pulse: number;
}

const HeroArcsComponent = ({ pendulums }: { pendulums: PendulumConfig[] }) => {
  const navigate = useAppNavigate();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});
  const backgroundCircleRefs = useRef<Record<string, SVGCircleElement | null>>(
    {}
  );
  // Pre-sampled point lookup table — populated once at mount, never in RAF
  const pathSamplesRef = useRef<Record<string, Array<{ x: number; y: number }>>>({});
  // Track visibility to pause RAF when off-screen
  const visibleRef = useRef(true);

  // tooltip state
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    text: string;
  }>({
    show: false,
    x: 0,
    y: 0,
    text: "",
  });

  // animation state
  const stateRef = useRef<Record<string, PendulumState>>(
    Object.fromEntries(
      pendulums.map(({ id, startPos, minScale, initialDirection }) => [
        id,
        {
          progress: startPos,
          direction: initialDirection,
          paused: false,
          pulse: minScale,
        },
      ])
    ) as Record<string, PendulumState>
  );

  // Cache path elements and lengths once after mount (getTotalLength forces layout - never call in RAF)
  useEffect(() => {
    const SAMPLE_COUNT = 256;
    for (const pendulum of pendulums) {
      const path = document.getElementById(
        `arc-${pendulum.id}`
      ) as SVGPathElement | null;
      if (path) {
        const totalLen = path.getTotalLength();
        // Pre-sample the path once at mount — eliminates per-frame DOM reads in the RAF loop
        const samples: Array<{ x: number; y: number }> = [];
        for (let i = 0; i < SAMPLE_COUNT; i++) {
          const pt = path.getPointAtLength((i / (SAMPLE_COUNT - 1)) * totalLen);
          samples.push({ x: pt.x, y: pt.y });
        }
        pathSamplesRef.current[pendulum.id] = samples;
      }
    }
  }, [pendulums]);

  // Pause animation when component scrolls off-screen
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onEnter = (id: string, label: string) => () => {
    stateRef.current[id].paused = true;
    const g = groupRefs.current[id];
    if (g) {
      const match = g.getAttribute("transform")?.match(/translate\(([^)]+)\)/);
      if (match) {
        const [x, y] = match[1].split(",").map(parseFloat);
        setTooltip({ show: true, x, y, text: label });
      }
    }
  };

  const onLeave = (id: string) => () => {
    stateRef.current[id].paused = false;
    setTooltip({ show: false, x: 0, y: 0, text: "" });
  };

  useEffect(() => {
    let raf = 0;
    let lastTime = performance.now();

    // easing function (cosine ease-in-out) - defined outside loop
    const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

    const tick = (now: number) => {
      if (!visibleRef.current) {
        // Off-screen: keep lastTime current to avoid a large dt spike on resume
        lastTime = now;
        raf = requestAnimationFrame(tick);
        return;
      }

      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // --- Phase 1: update state and compute positions (all reads) ---
      const updates: Array<{
        group: SVGGElement;
        x: number;
        y: number;
        circle: SVGCircleElement | null;
        r: number;
      }> = [];

      for (const pendulum of pendulums) {
        const s = stateRef.current[pendulum.id];
        const samples = pathSamplesRef.current[pendulum.id];
        if (!samples || samples.length === 0) continue;

        // swing motion
        if (!s.paused) {
          const step = dt / pendulum.duration;
          s.progress += s.direction * step;
          if (s.progress >= 1) {
            s.progress = 1;
            s.direction = -1;
          }
          if (s.progress <= 0) {
            s.progress = 0;
            s.direction = 1;
          }
        }

        const effectiveRange = 100 - pendulum.bufferStart - pendulum.bufferEnd;
        const easedProgress = easeInOut(s.progress);
        const offsetPct =
          (pendulum.bufferStart + easedProgress * effectiveRange) / 100;

        // Pure JS array lookup — zero DOM access, no forced layout per frame
        const fracIdx = offsetPct * (samples.length - 1);
        const i0 = Math.floor(fracIdx);
        const i1 = Math.min(i0 + 1, samples.length - 1);
        const frac = fracIdx - i0;
        const pt = {
          x: samples[i0].x + frac * (samples[i1].x - samples[i0].x),
          y: samples[i0].y + frac * (samples[i1].y - samples[i0].y),
        };

        const group = groupRefs.current[pendulum.id];
        if (!group) continue;

        // heartbeat pulse
        if (!s.paused) {
          const pulsePhase = 0.5 + 0.5 * Math.sin(now / 800);
          s.pulse =
            pendulum.minScale +
            pulsePhase * (pendulum.maxScale - pendulum.minScale);
        }
        const baseRadius = pendulum.iconSize * 1.1;

        updates.push({
          group,
          x: pt.x,
          y: pt.y,
          circle: backgroundCircleRefs.current[pendulum.id] ?? null,
          r: baseRadius * s.pulse,
        });
      }

      // --- Phase 2: apply all DOM writes (batch to avoid layout thrashing) ---
      for (const { group, x, y, circle, r } of updates) {
        group.setAttribute("transform", `translate(${x},${y})`);
        if (circle) circle.setAttribute("r", String(r));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pendulums]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 400"
      width="30%"
      style={{ background: "transparent" }}
      id="hero-arcs-svg"
    >
      {pendulums.map((it) => {
        const d = arcPath(
          it.cx,
          it.cy,
          it.r,
          it.startAngle,
          it.endAngle,
          it.mirror
        );
        return (
          <g key={it.id}>
            <path
              d={d}
              fill="none"
              stroke="#0c78ba"
              id={`arc-${it.id}`}
              opacity={0.4}
            />
            <g
              ref={(el) => {
                groupRefs.current[it.id] = el;
              }}
              onMouseEnter={onEnter(it.id, it.label)}
              onMouseLeave={onLeave(it.id)}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(it.label);
              }}
            >
              <circle
                ref={(el) => {
                  backgroundCircleRefs.current[it.id] = el;
                }}
                r={it.iconSize * 1.1}
                fill={it.bg}
              />
              <circle r={it.iconSize * 0.8} fill={it.color} />
              <image
                href={it.icon}
                x={-it.iconSize / 2 + 1.1}
                y={-it.iconSize / 2 + 1.1}
                width={it.iconSize * 0.8}
                height={it.iconSize * 0.8}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </g>
          </g>
        );
      })}

      {tooltip.text && (
        <text
          x={tooltip.x}
          y={tooltip.y + 35} // below circle (adjust as needed)
          textAnchor="middle"
          fontSize="10"
          fill="#414141ff"
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {tooltip.text.split(" ").map((word, index) => (
            <tspan key={index} x={tooltip.x} dy={index === 0 ? 0 : 12}>
              {word}
            </tspan>
          ))}
        </text>
      )}
    </svg>
  );
};

export default HeroArcsComponent;
