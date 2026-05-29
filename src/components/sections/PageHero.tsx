"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  variant?: "dark" | "light";
}

export default function PageHero({
  label,
  title,
  subtitle,
  tags,
  variant = "light",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative flex flex-col justify-end pb-12 lg:pb-16 pt-32 lg:pt-40 overflow-hidden ${
        subtitle ? "min-h-[70vh]" : "min-h-0"
      } ${
        isDark ? "bg-brand-black" : "bg-white"
      }`}
    >
      {/* Background técnico */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className={`w-full h-full ${isDark ? "opacity-100" : "opacity-50"}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`ph-grid-${variant}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none"
                stroke={isDark ? "rgba(224,90,18,0.08)" : "rgba(42,42,42,0.06)"} strokeWidth="0.5"/>
            </pattern>
            <pattern id={`ph-grid-lg-${variant}`} width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill={`url(#ph-grid-${variant})`}/>
              <path d="M 200 0 L 0 0 0 200" fill="none"
                stroke={isDark ? "rgba(224,90,18,0.18)" : "rgba(224,90,18,0.15)"} strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#ph-grid-lg-${variant})`}/>

          {/* Cross marks */}
          {[[120,80],[400,160],[700,240]].map(([cx,cy],i)=>(
            <g key={i} transform={`translate(${cx},${cy})`}>
              <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(224,90,18,0.3)" strokeWidth="0.8"/>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(224,90,18,0.3)" strokeWidth="0.8"/>
              <circle cx="0" cy="0" r="12" stroke="rgba(224,90,18,0.2)" strokeWidth="0.5" fill="none"/>
            </g>
          ))}
        </svg>
      </div>

      {/* Número decorativo grande */}
      <div className="absolute top-24 right-6 lg:right-12 select-none pointer-events-none">
        <p className={`text-[180px] lg:text-[220px] font-black leading-none ${
          isDark ? "text-white/[0.025]" : "text-brand-dark/[0.04]"
        }`}>
          {label.split("—")[0].trim()}
        </p>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-8 bg-brand-copper" />
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">{label}</p>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl mb-6 tracking-tight ${
            isDark ? "text-white" : "text-brand-dark"
          }`}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className={`text-base md:text-lg leading-relaxed max-w-2xl mb-8 ${
              isDark ? "text-brand-light/60" : "text-brand-grey/80"
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Tags */}
        {tags && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase border font-medium ${
                  isDark
                    ? "border-white/10 text-white/40"
                    : "border-brand-light text-brand-grey/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
