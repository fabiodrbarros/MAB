"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LogoMark from "@/components/ui/LogoMark";

export default function Footer() {
  const t    = useTranslations("footer");
  const tNav = useTranslations("nav");

  const navItems = [
    { key: "home",         href: "/" },
    { key: "construction", href: "/construcao" },
    { key: "engineering",  href: "/engenharia" },
    { key: "realestate",   href: "/imobiliaria" },
    { key: "projects",     href: "/projetos" },
    { key: "process",      href: "/processo" },
    { key: "contact",      href: "/contacto" },
  ] as const;

  return (
    <footer className="bg-white border-t border-brand-light/60 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <LogoMark variant="full-light" className="w-[280px] lg:w-[360px]" />
          </div>

          {/* Navigation */}
          <div>
            <p className="text-brand-grey/50 text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
              {t("navigation")}
            </p>
            <nav className="flex flex-col gap-3">
              {navItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="text-brand-grey text-[11px] tracking-[0.2em] uppercase font-semibold hover:text-brand-copper transition-colors"
                >
                  {tNav(it.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-brand-grey/50 text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
              {t("contacts")}
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:932218758" className="text-brand-grey text-sm hover:text-brand-copper transition-colors">
                932 218 758
              </a>
              <a href="mailto:mab.eng@hotmail.com" className="text-brand-grey text-sm hover:text-brand-copper transition-colors">
                mab.eng@hotmail.com
              </a>
              <p className="text-brand-grey text-sm">
                Arcos de Valdevez<br />Portugal
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-light/60 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <p className="text-brand-grey/50 text-xs tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Manuel Amorim Barros, Lda. {t("rights")}
          </p>

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
              {t("complaints")}
            </a>
          </div>

          <p className="text-brand-copper/60 text-xs tracking-widest font-semibold text-center md:text-right">
            {t("tagline").toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
