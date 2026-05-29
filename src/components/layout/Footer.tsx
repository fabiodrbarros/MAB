import Link from "next/link";
import LogoMark from "@/components/ui/LogoMark";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-light/60 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand — logo completo (versão clara) */}
          <div className="lg:col-span-2">
            <LogoMark variant="full-light" className="w-[280px] lg:w-[360px]" />
          </div>

          {/* Navigation */}
          <div>
            <p className="text-brand-grey/50 text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
              Navegação
            </p>
            <nav className="flex flex-col gap-3">
              {[
                ["Início",      "/"],
                ["Construção",  "/construcao"],
                ["Engenharia",  "/engenharia"],
                ["Imobiliária", "/imobiliaria"],
                ["Processo",    "/processo"],
                ["Projetos",    "/projetos"],
                ["Contacto",    "/contacto"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-brand-grey text-[11px] tracking-[0.2em] uppercase font-semibold hover:text-brand-copper transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-brand-grey/50 text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
              Contactos
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:932218758"
                className="text-brand-grey text-sm hover:text-brand-copper transition-colors"
              >
                932 218 758
              </a>
              <a
                href="mailto:mab.eng@hotmail.com"
                className="text-brand-grey text-sm hover:text-brand-copper transition-colors"
              >
                mab.eng@hotmail.com
              </a>
              <p className="text-brand-grey text-sm">
                Arcos de Valdevez<br />
                Portugal
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright | livro reclamações (centro) | tagline */}
        <div className="border-t border-brand-light/60 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* Esquerda — copyright */}
          <p className="text-brand-grey/50 text-xs tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Manuel Amorim Barros, Lda. Todos os direitos reservados.
          </p>

          {/* Centro — livro de reclamações */}
          <div className="flex justify-center">
            <a
              href="https://www.livroreclamacoes.pt/inicio"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-brand-grey/60 text-[10px] tracking-[0.2em] uppercase hover:text-brand-copper transition-colors font-semibold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="opacity-70 group-hover:opacity-100">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Livro de Reclamações
            </a>
          </div>

          {/* Direita — tagline */}
          <p className="text-brand-copper/60 text-xs tracking-widest font-semibold text-center md:text-right">
            TERRITÓRIO EM VALOR
          </p>
        </div>
      </div>
    </footer>
  );
}
