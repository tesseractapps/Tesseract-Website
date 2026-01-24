import React, { useEffect, useRef } from "react";
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
  const [transformStyle, setTransformStyle] =
    React.useState("translateX(-50%)");

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

  useEffect(() => {
    if (currentLink == "Product" && isOpen && position) {
      const innerWidth = window.innerWidth;
      switch (true) {
        case innerWidth < 1720 && innerWidth > 1660:
          setTransformStyle("translateX(-45%)");
          break;
        case innerWidth < 1660 && innerWidth > 1540:
          setTransformStyle("translateX(-35%)");
          break;
        case innerWidth < 1540 && innerWidth > 1484:
          setTransformStyle("translateX(-30%)");
          break;
        case innerWidth < 1484:
          setTransformStyle("translateX(-25%)");
          break;

        default:
          setTransformStyle("translateX(-50%)");
          break;
      }
    }
  }, [currentLink, position, isOpen]);

  if (!isOpen || !containerRef.current) return null;

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: position?.top || 0,
    left: position?.left || 0,
    transform: transformStyle,
    transition: "transform 0.2s ease-out",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 8px 8px rgba(0,0,0,0.1)",
    zIndex: 3000,
    backgroundColor,
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
