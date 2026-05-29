"use client";

import { motion } from "framer-motion";

const pillars = [
  { icon: "▲", title: "Leitura do terreno",        desc: "Análise das condições físicas, topográficas e geológicas antes de qualquer intervenção." },
  { icon: "◆", title: "Planeamento técnico",       desc: "Definição de fases, recursos e sequência lógica de execução para cada projeto." },
  { icon: "⊕", title: "Coordenação de obra",       desc: "Acompanhamento técnico das frentes de trabalho, garantindo alinhamento com o projeto." },
  { icon: "▣", title: "Apoio à execução",          desc: "Resposta técnica a imprevistos e decisões de obra com base em conhecimento de terreno." },
  { icon: "◈", title: "Organização de fases",      desc: "Sequenciamento das etapas da obra para otimizar tempo, custo e qualidade." },
  { icon: "—", title: "Decisões com base técnica", desc: "Cada decisão de obra é sustentada por análise técnica, não apenas por intuição." },
];

export default function EngineeringPillars() {
  return (
    <section className="bg-white pt-4 pb-24 lg:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group border border-brand-light/60 p-6 hover:border-brand-copper/50 hover:bg-brand-sand/40 transition-all duration-300 cursor-default"
            >
              <p className="text-brand-copper/70 text-lg mb-4 font-mono">{p.icon}</p>
              <h3 className="text-brand-dark font-semibold text-sm mb-2 leading-snug">{p.title}</h3>
              <p className="text-brand-grey/70 text-xs leading-relaxed">{p.desc}</p>
              <div className="h-px bg-brand-copper/0 group-hover:bg-brand-copper/30 mt-4 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
