import { useEffect, useRef } from "react";
import "./MirroredArcs.css";

const MirroredArcsComponent = () => {
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const icon5Ref = useRef(null);
  const icon6Ref = useRef(null);
  const leftArc1Ref = useRef(null);
  const leftArc2Ref = useRef(null);
  const rightArc1Ref = useRef(null);
  const rightArc2Ref = useRef(null);

  useEffect(() => {
    // Animate icon back and forth along given SVG path, pause movement on hover
    function animateIconOnPathBackAndForth(
      icon: HTMLElement,
      path: SVGPathElement,
      duration: number
    ): void {
      const pathLength: number = path.getTotalLength();
      let startTime: number | null = null;
      let paused: boolean = false;
      let pauseTimestamp: number | null = null;
      let accumulatedPauseTime: number = 0;

      function step(timestamp: number): void {
        if (!startTime) startTime = timestamp;

        if (!paused) {
          if (pauseTimestamp !== null) {
            accumulatedPauseTime += timestamp - pauseTimestamp;
            pauseTimestamp = null;
          }
          const elapsed: number = timestamp - startTime - accumulatedPauseTime;
          let progress: number = (elapsed % duration) / duration;
          if (Math.floor(elapsed / duration) % 2 === 1) {
            progress = 1 - progress;
          }
          const point: DOMPoint = path.getPointAtLength(progress * pathLength);
          icon.style.left = point.x + "px";
          icon.style.top = point.y + "px";
        } else {
          if (pauseTimestamp === null) pauseTimestamp = timestamp;
        }

        requestAnimationFrame(step);
      }

      // Pause on mouse enter, resume on mouse leave
      icon.addEventListener("mouseenter", (): void => {
        paused = true;
      });
      icon.addEventListener("mouseleave", (): void => {
        paused = false;
      });

      requestAnimationFrame(step);
    }

    // Animate all icons
    if (icon1Ref.current && leftArc1Ref.current) {
      animateIconOnPathBackAndForth(
        icon1Ref.current,
        leftArc1Ref.current,
        6000
      );
    }
    if (icon5Ref.current && rightArc1Ref.current) {
      animateIconOnPathBackAndForth(
        icon5Ref.current,
        rightArc1Ref.current,
        6000
      );
    }
    if (icon2Ref.current && leftArc2Ref.current) {
      animateIconOnPathBackAndForth(
        icon2Ref.current,
        leftArc2Ref.current,
        6000
      );
    }
    if (icon6Ref.current && rightArc2Ref.current) {
      animateIconOnPathBackAndForth(
        icon6Ref.current,
        rightArc2Ref.current,
        6000
      );
    }
  }, []);

  return (
    <div className="main-area">
      {/* SVG: two sets of left and right arcs */}
      <svg className="svg-arcs" viewBox="0 0 920 360">
        {/* First set of arcs with increased height */}
        <path
          ref={leftArc1Ref}
          id="leftArc1"
          d="M100,40 Q10,200 110,320"
          stroke="#c9e0f8"
          strokeWidth="2.1"
          fill="none"
        />
        <path
          ref={rightArc1Ref}
          id="rightArc1"
          d="M820,40 Q910,200 810,320"
          stroke="#c9e0f8"
          strokeWidth="2.1"
          fill="none"
        />
        {/* Second set of arcs with original height and 30px gap */}
        <path
          ref={leftArc2Ref}
          id="leftArc2"
          d="M260,60 Q170,170 270,270"
          stroke="#c9e0f8"
          strokeWidth="2.1"
          fill="none"
        />
        <path
          ref={rightArc2Ref}
          id="rightArc2"
          d="M680,60 Q770,170 670,270"
          stroke="#c9e0f8"
          strokeWidth="2.1"
          fill="none"
        />
      </svg>

      {/* Icons for the first set of arcs */}
      <div ref={icon1Ref} className="arc-icon icon1">
        <span>
          <i className="fa-solid fa-image"></i>
        </span>
      </div>
      <div ref={icon5Ref} className="arc-icon icon5">
        <span>
          <i className="fa-solid fa-chart-line"></i>
        </span>
      </div>
      {/* Icons for the second set of arcs */}
      <div ref={icon2Ref} className="arc-icon icon2">
        <span>
          <i className="fa-solid fa-user"></i>
        </span>
      </div>
      <div ref={icon6Ref} className="arc-icon icon6">
        <span>
          <i className="fa-solid fa-camera"></i>
        </span>
      </div>
    </div>
  );
};

export default MirroredArcsComponent;
