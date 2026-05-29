"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  size = "md",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center gap-3 font-medium tracking-[0.15em] uppercase transition-all duration-300";

  const sizes = {
    sm: "text-[10px] px-5 py-2.5",
    md: "text-[11px] px-7 py-3.5",
    lg: "text-[12px] px-9 py-4",
  };

  const variants = {
    primary: "bg-brand-copper text-white hover:bg-brand-copper2",
    outline: "border border-brand-copper text-brand-copper hover:bg-brand-copper hover:text-white",
    ghost:   "text-brand-copper border-b border-brand-copper/40 hover:border-brand-copper pb-1",
  };

  return (
    <motion.div
      whileHover={{ x: variant === "ghost" ? 4 : 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(base, sizes[size], variants[variant], className)}
      >
        {children}
        {variant !== "ghost" && (
          <span className="text-[10px] opacity-60">→</span>
        )}
      </Link>
    </motion.div>
  );
}
