"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { startingPoints } from "@/data/startingPoints";

export default function StartingPointConfigurator() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = startingPoints.find((s) => s.id === selected);

  return (
    <section className="relative py-24 lg:py-36 bg-white overflow-hidden">
      {/* Grelha técnica subtil no fundo (versão clara) */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sp-grid)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header da secção — estilo idêntico ao AreaCards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              Ponto de partida
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-brand-dark leading-[1.05] tracking-tight max-w-4xl">
            Qual é o seu<br />
            <span className="text-brand-copper">ponto de partida?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Opções */}
          <div className="flex flex-col gap-3">
            {startingPoints.map((sp, i) => (
              <motion.button
                key={sp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(selected === sp.id ? null : sp.id)}
                className={`group flex items-center gap-5 p-5 border text-left transition-all duration-300 ${
                  selected === sp.id
                    ? "border-brand-copper bg-brand-copper/[0.06]"
                    : "border-brand-light/70 hover:border-brand-dark/30 bg-white hover:bg-brand-offwhite"
                }`}
              >
                <span className={`text-lg transition-colors duration-300 ${
                  selected === sp.id ? "text-brand-copper" : "text-brand-grey/40 group-hover:text-brand-dark/60"
                }`}>
                  {sp.icon}
                </span>
                <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  selected === sp.id ? "text-brand-dark" : "text-brand-grey group-hover:text-brand-dark"
                }`}>
                  {sp.label}
                </span>
                <span className={`ml-auto text-[10px] transition-all duration-300 ${
                  selected === sp.id ? "text-brand-copper" : "text-brand-grey/30"
                }`}>
                  {selected === sp.id ? "●" : "○"}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Painel de resultado */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="border border-brand-copper/40 bg-brand-copper/[0.04] p-8 relative"
                >
                  {/* Corner marks */}
                  {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
                    "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"
                  ].map((c, i) => (
                    <div key={i} className={`absolute ${c} border-brand-copper w-4 h-4`} />
                  ))}

                  <p className="text-[10px] tracking-[0.3em] uppercase text-brand-copper mb-6 font-semibold">
                    Ficha técnica
                  </p>

                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] tracking-widest text-brand-grey/50 uppercase mb-1 font-semibold">Ponto de partida</p>
                      <p className="text-brand-dark font-medium">{active.label}</p>
                    </div>
                    <div className="h-px bg-brand-light/60" />
                    <div>
                      <p className="text-[10px] tracking-widest text-brand-grey/50 uppercase mb-1 font-semibold">Área principal</p>
                      <p className="text-brand-copper text-sm font-medium">{active.area}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-brand-grey/50 uppercase mb-1 font-semibold">Possível intervenção</p>
                      <p className="text-brand-grey text-sm leading-relaxed">{active.intervention}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest text-brand-grey/50 uppercase mb-1 font-semibold">Próximo passo</p>
                      <p className="text-brand-grey text-sm leading-relaxed">{active.nextStep}</p>
                    </div>
                  </div>

                  <Link
                    href={active.slug}
                    className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-copper2 transition-colors duration-300"
                  >
                    {active.cta}
                    <span>→</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-brand-light/60 p-8 flex flex-col items-center justify-center min-h-[300px] text-center bg-brand-offwhite/40"
                >
                  <div className="w-12 h-12 border border-brand-light flex items-center justify-center mb-4">
                    <span className="text-brand-grey/30 text-xl">◈</span>
                  </div>
                  <p className="text-brand-grey/50 text-sm">
                    Selecione um ponto de partida<br />para ver as opções disponíveis.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
