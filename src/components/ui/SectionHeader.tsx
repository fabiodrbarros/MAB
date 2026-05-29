"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <p className={`text-[10px] tracking-[0.4em] uppercase font-medium mb-4 ${
          light ? "text-brand-copper/80" : "text-brand-copper"
        }`}>
          {label}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light leading-tight ${
        light ? "text-white" : "text-brand-dark"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
          align === "center" ? "mx-auto" : ""
        } ${light ? "text-brand-light/60" : "text-brand-grey/70"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
