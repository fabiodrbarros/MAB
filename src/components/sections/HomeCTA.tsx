"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

export default function HomeCTA() {
  const t  = useTranslations("home.cta");
  const tC = useTranslations("common");

  return (
    <section className="relative py-28 lg:py-40 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              {t("eyebrow")}
            </p>
            <div className="h-px w-10 bg-brand-copper" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-12 lg:mb-14">
            {t("titleLine1")}<br />
            {t("titleLine2")}<br />
            {t("titleLine3")}
          </h2>

          <Link
            href="/contacto"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-brand-copper text-white text-[12px] tracking-[0.3em] uppercase font-bold hover:bg-brand-copper2 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            {tC("talkToUs")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
