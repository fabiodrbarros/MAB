"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

const layers = [
  {
    id: 1,
    label: "Solo",
    title: "O terreno como fundação.",
    description:
      "A construção começa antes da primeira parede. A leitura do terreno, a análise geológica e a avaliação de acessos determinam como a obra é preparada.",
  },
  {
    id: 2,
    label: "Preparação",
    title: "Antes da estrutura visível.",
    description:
      "Aterros, terraplanagem, nivelamento e organização do espaço criam a plataforma técnica sobre a qual tudo o resto assenta.",
  },
  {
    id: 3,
    label: "Estrutura",
    title: "Betão e alvenaria.",
    description:
      "A estrutura em betão armado, as paredes portantes e os elementos de suporte definem a geometria permanente da construção.",
  },
  {
    id: 4,
    label: "Acabamentos",
    title: "Detalhe e qualidade final.",
    description:
      "Revestimentos, carpintarias, instalações e acabamentos gerais completam a obra e definem o seu carácter final.",
  },
  {
    id: 5,
    label: "Entrega",
    title: "Da obra ao ativo.",
    description:
      "A obra concluída é entregue com toda a documentação, licenciamento e condições para habitabilidade ou utilização.",
  },
];

export default function BuildingLayers() {
  const [active, setActive] = useState(0);
  const current = layers[active];

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
              Antes da primeira parede
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight max-w-4xl">
            Uma obra sólida<br />
            começa com preparação.
          </h2>
        </motion.div>

        {/* Grid: lista de fases + painel detalhe */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Lista de fases (esquerda) */}
          <div className="flex flex-col">
            {layers.map((layer, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={layer.id}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group flex items-center gap-6 py-5 text-left border-b border-white/[0.06] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {/* Número 01 / 02 / ... */}
                  <span className={`font-mono text-[11px] tracking-widest transition-colors duration-300 ${
                    isActive ? "text-brand-copper" : "text-white/30 group-hover:text-brand-copper/70"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label */}
                  <span className="text-lg lg:text-xl font-light tracking-wide flex-1">
                    {layer.label}
                  </span>

                  {/* Indicador ativo */}
                  <span className={`transition-all duration-300 ${
                    isActive
                      ? "opacity-100 translate-x-0 text-brand-copper"
                      : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-brand-copper"
                  }`}>
                    →
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Painel de detalhe (direita) */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative border border-brand-copper/30 bg-brand-copper/[0.04] p-8 lg:p-10"
              >
                {/* Cantos cobre */}
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((c, i) => (
                  <div key={i} className={`absolute ${c} border-brand-copper w-4 h-4`} />
                ))}

                {/* Número + Label */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-brand-copper text-[11px] tracking-widest">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px w-6 bg-brand-copper/40" />
                  <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase font-semibold">
                    {current.label}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-light text-white mb-5 leading-snug">
                  {current.title}
                </h3>

                {/* Description */}
                <p className="text-brand-light/70 text-sm leading-relaxed">
                  {current.description}
                </p>

                {/* Progress bar */}
                <div className="mt-10 flex gap-1.5">
                  {layers.map((_, i) => (
                    <div
                      key={i}
                      className={`h-[3px] flex-1 transition-all duration-500 ${
                        i <= active ? "bg-brand-copper" : "bg-white/8"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-white/30 text-[9px] tracking-widest font-semibold">
                    FASE {String(active + 1).padStart(2, "0")} DE {String(layers.length).padStart(2, "0")}
                  </p>
                  <p className="text-white/30 text-[9px] tracking-widest font-semibold">
                    {current.label.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
