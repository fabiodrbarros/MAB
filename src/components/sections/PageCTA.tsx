"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/ui/CTAButton";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

interface PageCTAProps {
  title: string;
  subtitle?: string;
  href: string;
  cta: string;
}

export default function PageCTA({ title, subtitle, href, cta }: PageCTAProps) {
  return (
    <section className="relative py-28 lg:py-36 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 max-w-2xl mx-auto leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-brand-light/50 text-base mb-10 max-w-lg mx-auto">{subtitle}</p>
          )}
          <CTAButton href={href} size="lg">{cta}</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
