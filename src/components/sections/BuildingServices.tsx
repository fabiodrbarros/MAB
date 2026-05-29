"use client";

import { motion } from "framer-motion";

const services = [
  { icon: "◆",  title: "Moradias Unifamiliares",       desc: "Construção completa de moradia individual desde os alicerces até à entrega." },
  { icon: "◆◆", title: "Moradias Multifamiliares",      desc: "Edificações com múltiplas frações habitacionais, com rigor estrutural e acabamento." },
  { icon: "▣",  title: "Muros e Estruturas Exteriores", desc: "Muros de suporte, vedação e contenção, adaptados às condições do terreno." },
  { icon: "▲",  title: "Aterros",                       desc: "Movimentação e compactação de terras para preparação de plataformas e taludes." },
  { icon: "—",  title: "Terraplanagem",                 desc: "Nivelamento e conformação do terreno para construção ou outras utilizações." },
  { icon: "⊕",  title: "Preparação de Terreno",         desc: "Limpeza, acessos, drenagem e organização do espaço antes da obra estrutural." },
];

export default function BuildingServices() {
  return (
    <section className="bg-white pt-4 pb-24 lg:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group border border-brand-light/60 p-6 hover:border-brand-copper/50 hover:bg-brand-sand/40 transition-all duration-300 cursor-default"
            >
              <p className="text-brand-copper/70 text-lg mb-4 font-mono">{s.icon}</p>
              <h3 className="text-brand-dark font-semibold text-sm mb-2 leading-snug">{s.title}</h3>
              <p className="text-brand-grey/70 text-xs leading-relaxed">{s.desc}</p>
              <div className="h-px bg-brand-copper/0 group-hover:bg-brand-copper/30 mt-4 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
