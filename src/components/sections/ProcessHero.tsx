"use client";

import { motion } from "framer-motion";

export default function ProcessHero() {
  return (
    <section className="relative min-h-screen h-screen flex flex-col justify-center overflow-hidden bg-white pt-20">
      {/* Grelha técnica clara */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ph-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="ph-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#ph-grid-sm)"/>
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(224,90,18,0.15)" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ph-grid-lg)"/>
        </svg>
      </div>

      {/* Animated path drawing — cobre subtil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          viewBox="0 0 800 400"
          className="w-full max-w-4xl opacity-[0.08]"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M 50 350 L 150 200 L 280 280 L 400 100 L 520 220 L 650 150 L 750 200"
            fill="none"
            stroke="#E05A12"
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
          {[[50,350],[150,200],[280,280],[400,100],[520,220],[650,150],[750,200]].map(([x,y],i)=>(
            <motion.circle
              key={i}
              cx={x} cy={y} r="6"
              fill="#E05A12"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.4, duration: 0.4 }}
            />
          ))}
        </motion.svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-10 bg-brand-copper" />
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
            Território em Valor
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-brand-dark leading-[1.05] tracking-tight mb-6"
        >
          Do solo<br />ao valor.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-brand-grey/80 text-base md:text-lg max-w-xl leading-relaxed"
        >
          Uma leitura visual do caminho que transforma terreno, decisão técnica,
          construção e propriedade num ciclo completo de valor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-start gap-1 mt-16"
        >
          <p className="text-brand-grey/40 text-[10px] tracking-[0.3em] uppercase font-semibold">Scroll para descobrir</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-brand-copper to-transparent ml-4"
          />
        </motion.div>
      </div>
    </section>
  );
}
