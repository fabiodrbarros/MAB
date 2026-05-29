"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LogoMark from "@/components/ui/LogoMark";

function LoginForm() {
  const router        = useRouter();
  const searchParams  = useSearchParams();
  const next          = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Credenciais inválidas");
      }

      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no login");
      setLoading(false);
    }
  };

  const input = "w-full bg-white border border-brand-light/80 px-4 py-3.5 text-brand-dark placeholder:text-brand-grey/40 text-sm focus:outline-none focus:border-brand-copper transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex justify-center mb-10">
        <LogoMark variant="full-light" className="w-[260px]" />
      </div>

      <div className="relative border border-brand-light/60 bg-white p-8 lg:p-10">
        {/* Cantos cobre */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((c, i) => (
          <div key={i} className={`absolute ${c} border-brand-copper w-4 h-4`} />
        ))}

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-copper" />
          <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase font-semibold">
            Área restrita
          </p>
        </div>

        <h1 className="text-3xl font-light text-brand-dark mb-2 leading-tight">
          Iniciar sessão
        </h1>
        <p className="text-brand-grey/70 text-sm mb-8">
          Introduza as credenciais para aceder ao painel de gestão.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-brand-grey/60 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
              Utilizador
            </label>
            <input
              type="text"
              required
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={input}
            />
          </div>

          <div>
            <label className="text-brand-grey/60 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
              Palavra-passe
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </div>

          {error && (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-copper text-white text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-brand-copper2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                A autenticar...
              </>
            ) : (
              <>Entrar <span>→</span></>
            )}
          </button>
        </form>
      </div>

      <p className="text-brand-grey/40 text-xs text-center mt-8">
        Manuel Amorim Barros, Lda. — Painel de Gestão
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-brand-offwhite min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
