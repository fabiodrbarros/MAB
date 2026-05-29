"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

export default function PropertyForm() {
  const t  = useTranslations("realestate.form");
  const tC = useTranslations("common");
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "sell",     label: t("options.sell") },
    { id: "buy",      label: t("options.buy") },
    { id: "land",     label: t("options.land") },
    { id: "evaluate", label: t("options.evaluate") },
    { id: "other",    label: t("options.other") },
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-brand-copper" />
              <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
                {t("eyebrow")}
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight">
              {t("titleLine1")}<br />{t("titleLine2")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-2"
          >
            {options.map((opt, i) => (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(selected === opt.id ? null : opt.id)}
                className={`flex items-center justify-between px-6 py-4 border text-left transition-all duration-300 ${
                  selected === opt.id
                    ? "border-brand-copper bg-brand-copper/[0.07] text-white"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/25"
                }`}
              >
                <span className="text-sm tracking-wide font-medium">{opt.label}</span>
                <span className={`text-lg transition-transform duration-300 ${
                  selected === opt.id ? "text-brand-copper rotate-45" : "text-white/25"
                }`}>+</span>
              </motion.button>
            ))}

            <motion.a
              href="/contacto"
              whileHover={{ x: 4 }}
              className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-copper2 transition-colors duration-300 self-start"
            >
              {tC("talkToUs")} <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
