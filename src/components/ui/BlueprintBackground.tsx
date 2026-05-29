"use client";

import { useEffect, useRef } from "react";

interface BlueprintBackgroundProps {
  className?: string;
  variant?: "dark" | "light";
  animated?: boolean;
}

export default function BlueprintBackground({
  className = "",
  variant = "dark",
  animated = true,
}: BlueprintBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const stroke = variant === "dark" ? "rgba(224,90,18,0.12)" : "rgba(42,42,42,0.08)";
  const strokeAccent = variant === "dark" ? "rgba(224,90,18,0.25)" : "rgba(42,42,42,0.15)";
  const textColor = variant === "dark" ? "rgba(224,90,18,0.15)" : "rgba(42,42,42,0.1)";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        ref={svgRef}
        className={`w-full h-full ${animated ? "opacity-0 animate-[fadeIn_2s_ease_0.5s_forwards]" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        style={animated ? {} : { opacity: 1 }}
      >
        <defs>
          <pattern id="bp-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={stroke} strokeWidth="0.5" />
          </pattern>
          <pattern id="bp-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#bp-grid-sm)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke={strokeAccent} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-lg)" />

        {/* Diagonal technical lines */}
        <line x1="0"    y1="30%"  x2="100%" y2="70%"  stroke={stroke} strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="100%" y1="20%"  x2="0"    y2="80%"  stroke={stroke} strokeWidth="0.5" strokeDasharray="4 8" />

        {/* Corner coordinates */}
        <text x="20" y="24" fontFamily="monospace" fontSize="9" fill={textColor} letterSpacing="1">0°00′N 8°24′W</text>
        <text x="20" y="36" fontFamily="monospace" fontSize="9" fill={textColor} letterSpacing="1">41°50′N · ALTO MINHO</text>

        {/* Technical cross marks */}
        {[
          [120, 80], [400, 160], [700, 240], [250, 360], [580, 80],
        ].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <line x1="-8" y1="0" x2="8" y2="0" stroke={strokeAccent} strokeWidth="0.8" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke={strokeAccent} strokeWidth="0.8" />
            <circle cx="0" cy="0" r="12" stroke={strokeAccent} strokeWidth="0.5" fill="none" />
          </g>
        ))}

        {/* Topographic curves */}
        <path
          d="M -50 400 Q 200 350 400 380 T 900 360"
          fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="6 12"
        />
        <path
          d="M -50 440 Q 200 390 400 420 T 900 400"
          fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="6 12"
        />
        <path
          d="M -50 480 Q 200 430 400 460 T 900 440"
          fill="none" stroke={stroke} strokeWidth="0.7" strokeDasharray="6 12"
        />

        {/* Level markers */}
        <text x="30" y="395" fontFamily="monospace" fontSize="7" fill={textColor}>+280m</text>
        <text x="30" y="435" fontFamily="monospace" fontSize="7" fill={textColor}>+260m</text>
        <text x="30" y="475" fontFamily="monospace" fontSize="7" fill={textColor}>+240m</text>
      </svg>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
