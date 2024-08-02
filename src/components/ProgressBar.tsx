import React from "react";

interface ProgressBarProps {
  maxChunks: number;
  remainingChunks: number;
}

export default function ProgressBar({
  maxChunks,
  remainingChunks,
}: ProgressBarProps) {
  const progress = ((maxChunks - remainingChunks) / maxChunks) * 100;

  return (
    <div style={{ width: "100%", backgroundColor: "#e0e0e0" }}>
      <div
        style={{
          width: `${progress}%`,
          height: "24px",
          backgroundColor: "#76c7c0",
          transition: "width 0.5s",
        }}
      ></div>
    </div>
  );
}
