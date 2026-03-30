import { useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./PopupStyles.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  position?: { top: number; left: number } | null;
  children: React.ReactNode;
  onMouseLeave?: () => void;
  showTriangle?: boolean;
  backgroundColor?: string;
  backgroundBlur?: string;
  currentLink?: string;
}

const PopupComponent = ({
  isOpen,
  onClose,
  containerRef,
  position,
  children,
  onMouseLeave,
  showTriangle = true,
  backgroundColor,
  backgroundBlur,
  currentLink,
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Clamp popup so it never overflows viewport edges.
  // rect.left/right already account for transform:translateX(-50%), so we adjust marginLeft.
  useLayoutEffect(() => {
    if (!isOpen || !popupRef.current) return;
    const el = popupRef.current;
    el.style.marginLeft = "0px";
    void el.offsetWidth;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const edge = vw <= 1200 ? 0 : 16;
    if (rect.left < edge) {
      el.style.marginLeft = `${edge - rect.left}px`;
    } else if (rect.right > vw - edge) {
      el.style.marginLeft = `${vw - edge - rect.right}px`;
    }
  }, [isOpen, position, currentLink]);

  if (!isOpen || !containerRef.current) return null;

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: position?.top || 0,
    left: position?.left || 0,
    transform: "translateX(-50%)",
    zIndex: 3000,
    backgroundColor: backgroundColor ?? "transparent",
    backdropFilter: backgroundBlur ? `blur(${backgroundBlur})` : undefined,
  };
  const popupTriangle: React.CSSProperties = {
    position: "fixed",
    top: -10, // Position it above the popup
    left: "50%", // Center it horizontally
    transform: "translateX(-50%)", // Center it exactly
    zIndex: 3000,
  };

  return ReactDOM.createPortal(
    <div ref={popupRef} style={popupStyle} onMouseLeave={onMouseLeave}>
      {showTriangle &&
        currentLink !== "Product" &&
        window.innerWidth > 1720 && (
          <div style={popupTriangle}>
            <svg viewBox="0 0 20 15" width="20px" height="15px">
              <path
                d="M10 2
         A1.2 1.2 0 0 1 11.2 2.7
         L17.5 10
         A1.2 1.2 0 0 1 16.9 11.7
         L3.1 11.7
         A1.2 1.2 0 0 1 2.5 10
         L8.8 2.7
         A1.2 1.2 0 0 1 10 2"
                fill="white"
              />
            </svg>
          </div>
        )}
      {children}
    </div>,
    document.body
  );
};

export default PopupComponent;
