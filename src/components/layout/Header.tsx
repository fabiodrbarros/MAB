"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "@/components/ui/LogoMark";

const navLinks = [
  { label: "Início",       href: "/" },
  { label: "Construção",   href: "/construcao" },
  { label: "Engenharia",   href: "/engenharia" },
  { label: "Imobiliária",  href: "/imobiliaria" },
  { label: "Processo",     href: "/processo" },
  { label: "Projetos",     href: "/projetos" },
  { label: "Contacto",     href: "/contacto" },
];

export default function Header() {
  const pathname             = usePathname();
  const [open, setOpen]      = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta scroll para esmaecer o fundo do header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu sempre que mudar de página
  useEffect(() => { setOpen(false); }, [pathname]);

  // Bloqueia scroll do body quando o sidebar está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* HEADER minimalista — só logo + hamburger */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-brand-light/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-end">
          {/* Logo escondido — o sidebar mostra o logo completo ao abrir */}

          {/* Hamburger — em todas as resoluções */}
          <button
            onClick={() => setOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-2.5 -mr-4 hover:bg-brand-dark/[0.04] transition-colors"
            aria-label="Abrir menu"
          >
            <span className="hidden sm:inline text-[11px] tracking-[0.3em] uppercase font-semibold text-brand-dark">
              Menu
            </span>
            <div className="flex flex-col gap-[5px] w-6">
              <span className="block h-[1.5px] w-full bg-brand-dark transition-transform duration-300 group-hover:bg-brand-copper" />
              <span className="block h-[1.5px] w-full bg-brand-dark transition-transform duration-300 group-hover:bg-brand-copper" />
              <span className="block h-[1.5px] w-2/3 ml-auto bg-brand-dark transition-all duration-300 group-hover:w-full group-hover:bg-brand-copper" />
            </div>
          </button>
        </div>
      </header>

      {/* SIDEBAR + BACKDROP */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-brand-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Painel lateral — agora BRANCO */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[440px] bg-white flex flex-col overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              {/* Grid técnico de fundo (versão clara) */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="sb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#sb-grid)"/>
                </svg>
              </div>

              {/* Barra cobre acima */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-copper" />

              {/* Header do painel — logo completo (versão clara) */}
              <div className="relative flex items-start justify-between gap-4 px-8 lg:px-10 pt-6 pb-6 border-b border-brand-light/60">
                <LogoMark variant="full-light" className="w-[240px] lg:w-[260px]" />
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 mt-1 flex-shrink-0 border border-brand-light hover:border-brand-copper text-brand-grey hover:text-brand-copper transition-colors flex items-center justify-center"
                  aria-label="Fechar menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="relative flex flex-col px-8 lg:px-10 flex-1 pt-10">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        className={`group flex items-center gap-5 py-4 border-b border-brand-light/50 transition-colors ${
                          active ? "text-brand-copper" : "text-brand-dark hover:text-brand-copper"
                        }`}
                      >
                        <span className={`font-mono text-[10px] tracking-widest transition-colors ${
                          active ? "text-brand-copper" : "text-brand-grey/50 group-hover:text-brand-copper"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg lg:text-xl font-semibold tracking-[0.2em] uppercase flex-1">
                          {link.label}
                        </span>
                        <span className={`text-sm transition-all duration-300 ${
                          active
                            ? "text-brand-copper opacity-100 translate-x-0"
                            : "text-brand-copper opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2"
                        }`}>
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA + contactos no fundo */}
              <div className="relative px-8 lg:px-10 pb-10 pt-8 mt-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/contacto"
                    className="block w-full text-center px-6 py-4 bg-brand-copper text-white text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-brand-copper2 transition-colors duration-300"
                  >
                    Fale connosco →
                  </Link>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-brand-grey/50 text-[9px] tracking-widest uppercase mb-1.5 font-semibold">Telefone</p>
                      <a href="tel:932218758" className="text-brand-dark text-sm hover:text-brand-copper transition-colors">
                        932 218 758
                      </a>
                    </div>
                    <div>
                      <p className="text-brand-grey/50 text-[9px] tracking-widest uppercase mb-1.5 font-semibold">Email</p>
                      <a href="mailto:mab.eng@hotmail.com" className="text-brand-dark text-xs hover:text-brand-copper transition-colors break-all">
                        mab.eng@hotmail.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-brand-light/60">
                    <p className="text-brand-grey/50 text-[9px] tracking-[0.3em] uppercase font-semibold">
                      Arcos de Valdevez · Portugal
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
