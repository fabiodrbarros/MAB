"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

export default function BuildingLayers() {
  const t  = useTranslations("construction.layers");
  const [active, setActive] = useState(0);

  const keys = ["solo", "preparation", "structure", "finishes", "delivery"] as const;

  return (
    <section className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight max-w-4xl">
            {t("titleLine1")}<br />
            {t("titleLine2")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col">
            {keys.map((k, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={k}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group flex items-center gap-6 py-5 text-left border-b border-white/[0.06] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className={`font-mono text-[11px] tracking-widest transition-colors duration-300 ${
                    isActive ? "text-brand-copper" : "text-white/30 group-hover:text-brand-copper/70"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg lg:text-xl font-light tracking-wide flex-1">
                    {t(`items.${k}.label`)}
                  </span>
                  <span className={`transition-all duration-300 ${
                    isActive ? "opacity-100 translate-x-0 text-brand-copper" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-brand-copper"
                  }`}>→</span>
                </motion.button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={keys[active]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="relative border border-brand-copper/30 bg-brand-copper/[0.04] p-8 lg:p-10"
              >
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"
                ].map((c, i) => (<div key={i} className={`absolute ${c} border-brand-copper w-4 h-4`} />))}

                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-brand-copper text-[11px] tracking-widest">{String(active + 1).padStart(2, "0")}</span>
                  <div className="h-px w-6 bg-brand-copper/40" />
                  <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase font-semibold">
                    {t(`items.${keys[active]}.label`)}
                  </p>
                </div>

                <h3 className="text-2xl lg:text-3xl font-light text-white mb-5 leading-snug">
                  {t(`items.${keys[active]}.title`)}
                </h3>
                <p className="text-brand-light/70 text-sm leading-relaxed">
                  {t(`items.${keys[active]}.description`)}
                </p>

                <div className="mt-10 flex gap-1.5">
                  {keys.map((_, i) => (
                    <div key={i} className={`h-[3px] flex-1 transition-all duration-500 ${i <= active ? "bg-brand-copper" : "bg-white/8"}`} />
                  ))}
                </div>
                <p className="text-white/30 text-[9px] tracking-widest mt-3 font-semibold">
                  {t("phase")} {String(active + 1).padStart(2, "0")} {t("of")} {String(keys.length).padStart(2, "0")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
