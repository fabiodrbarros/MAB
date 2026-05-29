"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { processSteps } from "@/data/processSteps";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

function PhaseBlock({ step, index }: { step: typeof processSteps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hero é branco → fase 0 (índice 0) começa em escuro, depois alterna
  const isDark = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative min-h-screen flex flex-col justify-center py-24 ${
        isDark ? "bg-brand-dark" : "bg-white"
      }`}
    >
      {/* Background — escuro: blueprint cobre / claro: grelha subtil */}
      {isDark ? (
        <BlueprintBackground variant="dark" />
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`ps-grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
              </pattern>
              <pattern id={`ps-grid-lg-${index}`} width="200" height="200" patternUnits="userSpaceOnUse">
                <rect width="200" height="200" fill={`url(#ps-grid-${index})`}/>
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(224,90,18,0.15)" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#ps-grid-lg-${index})`}/>
          </svg>
        </div>
      )}

      {/* Número decorativo enorme */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <p
          className={`text-[30vw] lg:text-[20vw] font-black leading-none ${
            isDark ? "text-white/[0.03]" : "text-brand-dark/[0.04]"
          }`}
        >
          {step.number}
        </p>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Lado esquerdo: conteúdo */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-10 bg-brand-copper" />
              <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
                {step.number} — {step.subtitle}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6 ${
                isDark ? "text-white" : "text-brand-dark"
              }`}
            >
              {step.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className={`text-base md:text-lg leading-relaxed ${
                isDark ? "text-brand-light/60" : "text-brand-grey/80"
              }`}
            >
              {step.description}
            </motion.p>
          </div>

          {/* Lado direito: card de detalhe técnico (cobre, igual em ambos os fundos) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={`relative border p-8 lg:p-10 ${
              isDark ? "border-brand-copper/30 bg-brand-copper/[0.04]" : "border-brand-copper/40 bg-brand-copper/[0.04]"
            }`}
          >
            {/* Cantos cobre */}
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} border-brand-copper w-4 h-4`} />
            ))}

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-brand-copper text-[11px] tracking-widest">
                {step.number}
              </span>
              <div className="h-px w-6 bg-brand-copper/40" />
              <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase font-semibold">
                Detalhe técnico
              </p>
            </div>

            <p className={`text-sm leading-relaxed ${
              isDark ? "text-white/70" : "text-brand-grey/80"
            }`}>
              {step.detail}
            </p>

            {/* Progress bar */}
            <div className="mt-10 flex gap-1.5">
              {processSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] flex-1 transition-colors duration-300 ${
                    i <= index ? "bg-brand-copper" : isDark ? "bg-white/8" : "bg-brand-dark/10"
                  }`}
                />
              ))}
            </div>
            <p className={`text-[9px] tracking-widest mt-2 font-semibold ${
              isDark ? "text-white/30" : "text-brand-grey/50"
            }`}>
              FASE {step.number} DE {String(processSteps.length).padStart(2, "0")}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Linha de progresso vertical fixa
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative">
      {/* Linha de progresso fixa à esquerda */}
      <div className="fixed left-3 lg:left-6 top-0 bottom-0 w-[1px] bg-brand-grey/15 pointer-events-none z-20 hidden lg:block" />
      <motion.div
        className="fixed left-3 lg:left-6 top-0 w-[1px] bg-brand-copper pointer-events-none z-20 hidden lg:block origin-top"
        style={{ scaleY: lineScaleY, height: "100vh" }}
      />

      {processSteps.map((step, i) => (
        <PhaseBlock key={step.id} step={step} index={i} />
      ))}
    </section>
  );
}
