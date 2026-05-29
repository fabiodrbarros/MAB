"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function EngineeringPillars() {
  const t = useTranslations("engineering.pillars");

  const pillars = [
    { icon: "▲", key: "reading" },
    { icon: "◆", key: "planning" },
    { icon: "⊕", key: "coordination" },
    { icon: "▣", key: "support" },
    { icon: "◈", key: "phases" },
    { icon: "—", key: "decisions" },
  ] as const;

  return (
    <section className="bg-white pt-4 pb-24 lg:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group border border-brand-light/60 p-6 hover:border-brand-copper/50 hover:bg-brand-sand/40 transition-all duration-300 cursor-default"
            >
              <p className="text-brand-copper/70 text-lg mb-4 font-mono">{p.icon}</p>
              <h3 className="text-brand-dark font-semibold text-sm mb-2 leading-snug">{t(`${p.key}.title`)}</h3>
              <p className="text-brand-grey/70 text-xs leading-relaxed">{t(`${p.key}.desc`)}</p>
              <div className="h-px bg-brand-copper/0 group-hover:bg-brand-copper/30 mt-4 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
