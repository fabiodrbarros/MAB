"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BackToTop() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={scrollToTop}
          aria-label={t("backToTop")}
          className="group fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 w-12 h-12 lg:w-14 lg:h-14 bg-brand-copper hover:bg-brand-copper2 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <path d="M12 19 L12 5 M5 12 L12 5 L19 12" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
