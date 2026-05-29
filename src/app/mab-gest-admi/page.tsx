import Link from "next/link";
import type { Metadata } from "next";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              Painel de Administração
            </p>
          </div>
          <LogoutButton />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-brand-dark leading-[1.05] tracking-tight max-w-3xl mb-12">
          Gerir conteúdos.
        </h1>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 max-w-3xl">
          <Link
            href="/mab-gest-admi/imobiliaria"
            className="group block border border-brand-light/60 hover:border-brand-copper hover:shadow-lg p-8 lg:p-10 transition-all duration-300"
          >
            <p className="text-brand-copper/70 text-3xl mb-4 font-mono">◈</p>
            <h2 className="text-2xl font-light text-brand-dark mb-2">Imobiliária</h2>
            <p className="text-brand-grey/70 text-sm leading-relaxed mb-5">
              Adicionar, editar e remover propriedades.
            </p>
            <div className="flex items-center gap-2 text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold group-hover:gap-4 transition-all duration-300">
              <span>Gerir propriedades</span>
              <span>→</span>
            </div>
          </Link>

          <Link
            href="/mab-gest-admi/projetos"
            className="group block border border-brand-light/60 hover:border-brand-copper hover:shadow-lg p-8 lg:p-10 transition-all duration-300"
          >
            <p className="text-brand-copper/70 text-3xl mb-4 font-mono">▣</p>
            <h2 className="text-2xl font-light text-brand-dark mb-2">Projetos</h2>
            <p className="text-brand-grey/70 text-sm leading-relaxed mb-5">
              Adicionar, editar e remover projetos da galeria.
            </p>
            <div className="flex items-center gap-2 text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold group-hover:gap-4 transition-all duration-300">
              <span>Gerir projetos</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
