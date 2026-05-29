"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

const startOptions = [
  { id: "terreno",    label: "Tenho um terreno" },
  { id: "construir",  label: "Quero construir" },
  { id: "tecnico",    label: "Preciso de apoio técnico" },
  { id: "imovel",     label: "Quero comprar ou vender uma propriedade" },
  { id: "obra",       label: "Tenho uma obra para executar" },
  { id: "outro",      label: "Outro" },
];

type FormState = {
  nome: string;
  telefone: string;
  email: string;
  ponto: string;
  mensagem: string;
};

const contactCards = [
  {
    label: "Telefone",
    value: "932 218 758",
    href: "tel:932218758",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "mab.eng@hotmail.com",
    href: "mailto:mab.eng@hotmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="4" width="20" height="16" rx="0" />
        <path d="M2 6 L12 13 L22 6" />
      </svg>
    ),
  },
  {
    label: "Localização",
    value: "Arcos de Valdevez",
    sub:   "Portugal",
    href:  "https://www.google.com/maps/search/?api=1&query=Arcos+de+Valdevez",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

// Bounding box do mapa centrado em Arcos de Valdevez (lat 41.8458, lng -8.4180)
const MAP_BBOX = "-8.450,41.835,-8.385,41.860";
const MAP_MARKER = "41.8458,-8.4180";

export default function ContactPage() {
  const [form, setForm]       = useState<FormState>({ nome: "", telefone: "", email: "", ponto: "", mensagem: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("[MAB] Novo pedido de contacto:", form);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const inputClass =
    "w-full bg-transparent border border-white/15 px-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-copper transition-colors duration-300";

  return (
    <div className="bg-white min-h-screen">

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Grelha técnica */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ct-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="ct-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
                <rect width="200" height="200" fill="url(#ct-grid-sm)"/>
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(224,90,18,0.15)" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ct-grid-lg)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              Contactos
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-dark leading-[1.02] tracking-tight max-w-4xl mb-6"
          >
            Vamos falar<br />
            <span className="text-brand-copper">do seu projeto.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-brand-grey/80 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Um terreno, uma obra, uma propriedade, qualquer que seja o ponto de partida,
            o primeiro passo é uma conversa.
          </motion.p>
        </div>
      </section>

      {/* ─── 3 CARDS DE CONTACTO ─── */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {contactCards.map((card, i) => {
              const inner = (
                <>
                  <div className="text-brand-copper mb-5">{card.icon}</div>
                  <p className="text-brand-grey/50 text-[10px] tracking-[0.25em] uppercase mb-2 font-semibold">
                    {card.label}
                  </p>
                  <p className="text-brand-dark text-xl lg:text-2xl font-light mb-1">
                    {card.value}
                  </p>
                  {card.sub && (
                    <p className="text-brand-grey/60 text-sm">{card.sub}</p>
                  )}
                  <div className="mt-6 flex items-center gap-2 text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Abrir</span>
                    <span>→</span>
                  </div>
                </>
              );

              return (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.label === "Localização" ? "_blank" : undefined}
                  rel={card.label === "Localização" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group block border border-brand-light/60 hover:border-brand-copper hover:shadow-lg bg-white p-8 lg:p-10 transition-all duration-300"
                >
                  {inner}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MAPA ─── */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative border border-brand-light/60 overflow-hidden"
          >
            {/* Cantos cobre decorativos */}
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((c, i) => (
              <div key={i} className={`absolute ${c} border-brand-copper w-5 h-5 z-10 pointer-events-none`} />
            ))}

            {/* Label sobre o mapa */}
            <div className="absolute top-4 left-4 z-10 bg-white px-4 py-2 border border-brand-copper/30 shadow-sm pointer-events-none">
              <p className="text-brand-copper text-[9px] tracking-[0.3em] uppercase font-semibold mb-0.5">Localização</p>
              <p className="text-brand-dark text-sm font-medium">Arcos de Valdevez · Alto Minho</p>
            </div>

            {/* Coordenadas decorativas */}
            <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 border border-brand-light pointer-events-none">
              <p className="font-mono text-[10px] text-brand-grey">41°50′N · 8°25′W</p>
            </div>

            <iframe
              title="Mapa — Arcos de Valdevez"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik&marker=${MAP_MARKER}`}
              className="w-full h-[400px] lg:h-[480px] block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: "grayscale(35%) contrast(1.05)" }}
            />

            {/* Footer do mapa */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-brand-light/60 bg-brand-offwhite">
              <p className="text-brand-grey/70 text-xs">
                Manuel Amorim Barros, Lda. — Arcos de Valdevez, Portugal
              </p>
              <a
                href={`https://www.openstreetmap.org/?mlat=41.8458&mlon=-8.4180#map=14/41.8458/-8.4180`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-copper text-[10px] tracking-[0.2em] uppercase hover:underline font-semibold whitespace-nowrap"
              >
                Abrir mapa →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FORMULÁRIO (escuro com riscas cobre) ─── */}
      <section className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
        <BlueprintBackground variant="dark" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Header lado esquerdo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-brand-copper" />
                <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
                  Enviar mensagem
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.05] tracking-tight mb-8">
                Não sabe por<br />
                onde começar?
              </h2>
              <p className="text-brand-light/60 text-base leading-relaxed max-w-md">
                Escolha o seu ponto de partida e indique-nos o que pretende desenvolver.
                A partir daí, ajudamos a perceber o melhor caminho.
              </p>
            </motion.div>

            {/* Form lado direito */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative border border-brand-copper bg-brand-copper/[0.08] p-10 lg:p-14 flex flex-col items-start gap-5 min-h-[400px] justify-center"
                  >
                    {[
                      "top-0 left-0 border-t-2 border-l-2",
                      "top-0 right-0 border-t-2 border-r-2",
                      "bottom-0 left-0 border-b-2 border-l-2",
                      "bottom-0 right-0 border-b-2 border-r-2",
                    ].map((c, i) => (
                      <div key={i} className={`absolute ${c} w-4 h-4 border-brand-copper`} />
                    ))}

                    <div className="w-12 h-12 border border-brand-copper flex items-center justify-center">
                      <span className="text-brand-copper text-xl">✓</span>
                    </div>
                    <div>
                      <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">
                        Pedido registado
                      </p>
                      <h3 className="text-2xl font-light text-white mb-3">
                        Entraremos em contacto brevemente.
                      </h3>
                      <p className="text-brand-light/60 text-sm leading-relaxed">
                        Recebemos o seu pedido. A equipa da Manuel Amorim Barros
                        analisará a sua situação e responderá o mais brevemente possível.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSent(false); setForm({ nome: "", telefone: "", email: "", ponto: "", mensagem: "" }); }}
                      className="text-brand-copper text-[10px] tracking-[0.2em] uppercase border-b border-brand-copper/40 hover:border-brand-copper pb-0.5 mt-2 font-semibold"
                    >
                      Enviar outro pedido
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-brand-light/50 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
                          Nome *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="O seu nome"
                          value={form.nome}
                          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-brand-light/50 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          placeholder="+351 9XX XXX XXX"
                          value={form.telefone}
                          onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-brand-light/50 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@exemplo.pt"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="text-brand-light/50 text-[10px] tracking-[0.2em] uppercase block mb-3 font-semibold">
                        Ponto de partida
                      </label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {startOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, ponto: opt.id }))}
                            className={`px-4 py-3 text-[11px] text-left tracking-wide border transition-all duration-200 ${
                              form.ponto === opt.id
                                ? "border-brand-copper bg-brand-copper/10 text-white font-semibold"
                                : "border-white/10 text-white/55 hover:text-white hover:border-white/30"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-brand-light/50 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
                        Mensagem
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Descreva o seu projeto, terreno ou intenção..."
                        value={form.mensagem}
                        onChange={(e) => setForm((f) => ({ ...f, mensagem: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-copper text-white text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-brand-copper2 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? (
                        <>
                          <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                          A enviar...
                        </>
                      ) : (
                        <>Enviar pedido <span>→</span></>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
