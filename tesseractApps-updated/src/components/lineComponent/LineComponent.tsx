import React from "react";
type LineComponentProps = {
  startX: number; // X coordinate of the starting point
  startY: number; // Y coordinate of the starting point
  length: number; // Length of the line
  angle: number; // Angle in degrees
  id: string; // Unique identifier for the line
  className?: string; // Optional class name for styling
  isAnimating?: boolean; // Optional prop to control animation
};
const lineComponent: React.FC<LineComponentProps> = ({
  startX,
  startY,
  length,
  angle,
  id,
  className = "", // Default to an empty string if no class name is provided
  //   isAnimating = false, // Default to false if no animation prop is provided
}) => {
  // Convert angle from degrees to radians
  const angleRad = (angle * Math.PI) / 180;

  // Calculate endpoint
  const endX = startX + length * Math.cos(angleRad);
  const endY = startY + length * Math.sin(angleRad);
  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      id={id}
      style={{ position: "absolute" }}
    >
      <line
        x1={startX + "%"}
        y1={startY + "%"}
        x2={endX + "%"}
        y2={endY + "%"}
        stroke="black"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
    </svg>
  );
};

export default lineComponent;
