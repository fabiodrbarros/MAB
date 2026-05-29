"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface AreaCardProps {
  number: string;
  title: string;
  headline: string;
  description: string;
  slug: string;
  index?: number;
}

export default function AreaCard({
  number,
  title,
  headline,
  description,
  slug,
  index = 0,
}: AreaCardProps) {
  const tC = useTranslations("common");
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={slug} className="group block h-full">
        <motion.div
          className="relative h-full bg-white border border-brand-light/70 p-8 lg:p-10 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-500"
          whileHover={{ borderColor: "#E05A12" }}
          transition={{ duration: 0.3 }}
        >
          {/* Grid técnico no hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`card-grid-${number}`} width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(224,90,18,0.08)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#card-grid-${number})`} />
            </svg>
          </div>

          {/* Barra laranja no hover */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[3px] bg-brand-copper origin-top"
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <div className="relative z-10">
            {/* Número grande */}
            <p className="text-[80px] lg:text-[100px] font-black leading-none text-brand-dark/[0.05] group-hover:text-brand-copper/15 transition-colors duration-500 select-none mb-4">
              {number}
            </p>

            {/* Categoria */}
            <p className="text-[10px] tracking-[0.35em] uppercase text-brand-copper font-semibold mb-3">
              {title}
            </p>

            {/* Headline */}
            <h3 className="text-2xl lg:text-3xl font-light text-brand-dark mb-4 leading-snug">
              {headline}
            </h3>

            {/* Descrição */}
            <p className="text-brand-grey/70 text-sm leading-relaxed mb-8">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-3 text-brand-copper text-[11px] tracking-[0.2em] uppercase font-semibold group-hover:gap-5 transition-all duration-300">
              <span>{tC("explore")}</span>
              <span>→</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
