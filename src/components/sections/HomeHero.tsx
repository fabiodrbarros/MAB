"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const layers = [
  { label: "Construção",  color: "#E05A12" },  // laranja
  { label: "Engenharia",  color: "#1a1a1a" },  // preto
  { label: "Imobiliária", color: "#E05A12" },  // laranja
];

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white pt-20"
    >
      {/* Blueprint background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="hero-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#hero-grid-sm)"/>
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(224,90,18,0.15)" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-lg)"/>
          <line x1="0"    y1="30%" x2="100%" y2="70%" stroke="rgba(224,90,18,0.12)" strokeWidth="0.5" strokeDasharray="4 8"/>
          <line x1="100%" y1="20%" x2="0"    y2="80%" stroke="rgba(42,42,42,0.06)"  strokeWidth="0.5" strokeDasharray="4 8"/>
          <text x="24" y="28" fontFamily="monospace" fontSize="10" fill="rgba(42,42,42,0.25)" letterSpacing="1">41°50′N · 8°24′W</text>
          <text x="24" y="42" fontFamily="monospace" fontSize="10" fill="rgba(224,90,18,0.45)" letterSpacing="1">ALTO MINHO · PT</text>
          {[[140,90],[400,170],[760,240],[280,420],[640,90],[920,360],[1180,170]].map(([cx,cy],i)=>(
            <g key={i} transform={`translate(${cx},${cy})`}>
              <line x1="-9" y1="0" x2="9" y2="0" stroke="rgba(224,90,18,0.28)" strokeWidth="0.8"/>
              <line x1="0" y1="-9" x2="0" y2="9" stroke="rgba(224,90,18,0.28)" strokeWidth="0.8"/>
              <circle cx="0" cy="0" r="13" stroke="rgba(224,90,18,0.18)" strokeWidth="0.5" fill="none"/>
            </g>
          ))}
        </svg>
      </div>

      {/* CONTAINER full-width */}
      <motion.div
        style={{ opacity: fade, maxWidth: "1800px" }}
        className="relative z-10 w-full mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 py-12 lg:py-0"
      >
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* TEXTO 7/12 */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-10 bg-brand-copper" />
              <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
                Território em Valor
              </p>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-dark leading-[1.02] tracking-tight"
              >
                Transformamos<br />
                <span className="text-brand-copper font-normal">território</span><br />
                em valor.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                href="#areas"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-copper2 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Explorar áreas <span>→</span>
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 border border-brand-dark text-brand-dark text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                Falar sobre um projeto
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-wrap gap-x-6 gap-y-3 mt-14"
            >
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-[2px] w-5" style={{ backgroundColor: layer.color }} />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: layer.color }}>
                    {layer.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* LOGO 5/12 — usando width/height explícitos em vez de fill+aspect */}
          <motion.div
            style={{ y: logoY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex items-center justify-center relative py-6"
          >
            {/* Círculos decorativos */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                style={{ width: "min(90%, 520px)", aspectRatio: "1 / 1" }}
                className="rounded-full border border-brand-copper/15"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.6 }}
                style={{ width: "min(65%, 380px)", aspectRatio: "1 / 1", position: "absolute" }}
                className="rounded-full border border-brand-copper/10"
              />
            </div>

            {/* LOGO REAL — Image responsivo */}
            <div className="relative w-full max-w-[560px] z-10">
              <Image
                src="/manuel_amorim_barros_logo_sem_fundo.png"
                alt="Manuel Amorim Barros — Construção, Engenharia, Imobiliária"
                width={1026}
                height={432}
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-brand-copper to-transparent"
        />
        <p className="text-brand-copper/60 text-[9px] tracking-[0.3em] uppercase font-semibold">Scroll</p>
      </motion.div>
    </section>
  );
}
