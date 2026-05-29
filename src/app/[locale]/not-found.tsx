import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-brand-dark flex flex-col items-center justify-center px-6 py-32 overflow-hidden">
      <BlueprintBackground variant="dark" />

      {/* Número 404 gigante decorativo */}
      <p
        className="absolute select-none pointer-events-none text-white/[0.04] font-black leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(180px, 38vw, 520px)" }}
      >
        404
      </p>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-10 bg-brand-copper" />
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
            Erro 404
          </p>
          <div className="h-px w-10 bg-brand-copper" />
        </div>

        {/* Coordenadas decorativas (tipo "fora do mapa") */}
        <p className="font-mono text-brand-copper/40 text-[10px] tracking-widest mb-6">
          ▣ COORDENADAS DESCONHECIDAS
        </p>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6">
          Este território<br />
          <span className="text-brand-copper">ainda não foi mapeado.</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-brand-light/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
          A página que procura não existe ou foi movida. Use os atalhos abaixo
          para regressar a terreno conhecido.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-copper text-white text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-brand-copper2 transition-colors duration-300"
          >
            Regressar ao início <span>→</span>
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/80 text-[11px] tracking-[0.25em] uppercase font-semibold hover:border-white hover:text-white transition-all duration-300"
          >
            Fale connosco
          </Link>
        </div>

        {/* Links rápidos */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
            Atalhos
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] tracking-[0.2em] uppercase font-semibold">
            {[
              ["Construção",  "/construcao"],
              ["Engenharia",  "/engenharia"],
              ["Imobiliária", "/imobiliaria"],
              ["Projetos",    "/projetos"],
              ["Processo",    "/processo"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-white/60 hover:text-brand-copper transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
