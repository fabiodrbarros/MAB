"use client";

import { motion } from "framer-motion";

const modules = [
  { id: "terrain",    label: "Condições do terreno", value: "Análise em curso",  status: "active",   icon: "▲" },
  { id: "phases",     label: "Fases da obra",        value: "5 etapas",          status: "ok",       icon: "◆" },
  { id: "access",     label: "Acessos",              value: "Verificado",        status: "ok",       icon: "→" },
  { id: "structure",  label: "Estrutura",            value: "Em definição",      status: "pending",  icon: "▣" },
  { id: "execution",  label: "Execução",             value: "Planeada",          status: "ok",       icon: "⊕" },
  { id: "risk",       label: "Risco / Atenção",      value: "Baixo",             status: "safe",     icon: "◈" },
];

const statusColors: Record<string, string> = {
  active:  "#C96A2B",
  ok:      "#5a9a5a",
  pending: "#8a8a4a",
  safe:    "#5a9a5a",
};

export default function EngineeringDashboard() {
  return (
    <section className="py-24 lg:py-32 bg-brand-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase mb-4">
            Painel técnico
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Interface de obra
          </h2>
          <p className="text-brand-light/40 text-sm mt-2">
            Representação visual decorativa dos módulos técnicos de acompanhamento.
          </p>
        </motion.div>

        {/* Dashboard frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-white/10 bg-brand-dark/50 p-6 lg:p-8 relative overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
            <div className="flex gap-2">
              {["#C96A2B", "#4a4a4a", "#2a2a2a"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] font-mono uppercase ml-2">
              MAB · PAINEL TÉCNICO · DADOS ILUSTRATIVOS
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-white/5 p-5 bg-brand-black/40 relative overflow-hidden"
              >
                {/* Status indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: statusColors[mod.status] }}
                />
                <div className="flex items-start justify-between mb-3">
                  <p className="text-brand-copper/50 font-mono text-sm">{mod.icon}</p>
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: statusColors[mod.status] }}
                  />
                </div>
                <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase mb-1">{mod.label}</p>
                <p className="text-white text-sm font-medium">{mod.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-white/15 text-[9px] tracking-widest text-center">
            DADOS DECORATIVOS — NÃO REPRESENTAM PROJETOS REAIS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
