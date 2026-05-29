"use client";

import { motion } from "framer-motion";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

const blocks = [
  {
    icon: "◈",
    title: "Comprar",
    description:
      "Identificamos oportunidades com potencial no Alto Minho — terrenos, moradias e propriedades com perspetiva de valorização.",
  },
  {
    icon: "▲",
    title: "Desenvolver",
    description:
      "Com capacidade técnica e de construção própria, analisamos o caminho de desenvolvimento de cada ativo para maximizar o seu valor.",
  },
  {
    icon: "◆",
    title: "Vender",
    description:
      "Apoiamos a preparação e comercialização de propriedades, com conhecimento local e visão integrada entre construção e mercado.",
  },
];

export default function PropertyValuation() {
  return (
    <section className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header — estilo unificado */}
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
              Valorização imobiliária
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight max-w-4xl">
            Um terreno parado<br />
            é uma oportunidade por ler.
          </h2>
        </motion.div>

        {/* 3 blocos lado a lado */}
        <div className="grid md:grid-cols-3 gap-0 border border-white/10">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={`p-8 lg:p-10 group hover:bg-brand-copper/[0.05] transition-colors duration-300 ${
                i < 2 ? "md:border-r border-white/10" : ""
              } border-b md:border-b-0 border-white/10`}
            >
              <div className="w-10 h-10 border border-white/15 mb-6 flex items-center justify-center group-hover:border-brand-copper transition-colors duration-300">
                <span className="text-brand-copper font-mono">{block.icon}</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-3">{block.title}</h3>
              <p className="text-brand-light/60 text-sm leading-relaxed">{block.description}</p>

              {/* Barra cobre no hover */}
              <div className="h-px bg-brand-copper/0 group-hover:bg-brand-copper/60 mt-6 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
