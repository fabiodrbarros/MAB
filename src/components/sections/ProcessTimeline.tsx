"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/processSteps";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-24 lg:py-40 bg-brand-offwhite relative overflow-hidden">
      {/* Light blueprint bg */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tl-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tl-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase mb-4">
            O ciclo completo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-dark leading-tight">
            Do solo ao valor
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line track */}
          <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-brand-light/60" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-4 lg:left-8 top-0 w-px bg-brand-copper origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex gap-8 lg:gap-16 pb-16 lg:pb-24"
              >
                {/* Node */}
                <div className="relative flex-shrink-0 pt-1">
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-brand-light bg-brand-offwhite flex items-center justify-center z-10 relative ml-0 lg:ml-4"
                    whileInView={{ borderColor: "#C96A2B", backgroundColor: "#C96A2B" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <span className="text-white text-[9px] font-bold">{step.number}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-0">
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
                    <div>
                      <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase mb-2">
                        {step.subtitle}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-light text-brand-dark mb-4">
                        {step.title}
                      </h3>
                      <p className="text-brand-grey/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="hidden lg:block">
                      <div className="border border-brand-light/60 p-6 bg-white/60">
                        <p className="text-brand-grey/50 text-[10px] tracking-[0.2em] uppercase mb-2">
                          Detalhe técnico
                        </p>
                        <p className="text-brand-grey text-sm leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
