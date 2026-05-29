import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[120px] md:text-[180px] font-black text-white/[0.04] leading-none select-none">
        404
      </p>
      <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase mb-4 -mt-4">
        Página não encontrada
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-white mb-6">
        Este território ainda não foi mapeado.
      </h1>
      <Link
        href="/"
        className="inline-flex items-center gap-3 px-7 py-3.5 border border-brand-copper text-brand-copper text-[11px] tracking-[0.2em] uppercase hover:bg-brand-copper hover:text-white transition-all duration-300"
      >
        Regressar ao início <span>→</span>
      </Link>
    </div>
  );
}
