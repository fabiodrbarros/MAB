import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:   "#1a1a1a",
          dark:    "#2a2a2a",
          grey:    "#4a4a4a",
          mid:     "#8a8a8a",
          light:   "#d4d0cb",
          sand:    "#f0ece4",
          offwhite:"#f8f6f2",
          copper:  "#E05A12",
          copper2: "#F06820",
          copper3: "#B04010",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono:  ["var(--font-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem",   { lineHeight: "0.9" }],
        "9xl":  ["8rem",    { lineHeight: "0.9" }],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.5em",
      },
      backgroundImage: {
        "grid-technical":
          "linear-gradient(rgba(201,106,43,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,106,43,0.06) 1px, transparent 1px)",
        "grid-fine":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm":  "40px 40px",
        "grid-md":  "80px 80px",
        "grid-lg":  "120px 120px",
      },
      animation: {
        "draw-line":   "drawLine 1.5s ease forwards",
        "fade-up":     "fadeUp 0.8s ease forwards",
        "pulse-slow":  "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        drawLine: {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
