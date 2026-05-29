"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
  /**
   * "icon"       → só o símbolo (header) — usa /logo-icon.png
   * "full-dark"  → completo p/ fundo escuro — usa /logo-white.png
   * "full-light" → completo p/ fundo claro — usa o mesmo logo do hero
   */
  variant?: "icon" | "full-dark" | "full-light";
}

/* Dimensões reais do logo principal: 2053×863 (ratio 2.378) */
const FULL_W = 2053;
const FULL_H = 863;

export default function LogoMark({ className, variant = "icon" }: LogoMarkProps) {
  if (variant === "icon") {
    return (
      <div className={cn("relative w-10 h-10", className)}>
        <Image
          src="/logo-icon.png"
          alt="Manuel Amorim Barros"
          fill
          priority
          sizes="40px"
          className="object-contain"
        />
      </div>
    );
  }

  // FULL — mesma imagem que o hero (proporção real preservada)
  const src = variant === "full-dark" ? "/logo-white.png" : "/manuel_amorim_barros_logo_sem_fundo.png";

  return (
    <div className={cn("relative inline-block w-[240px]", className)}>
      <Image
        src={src}
        alt="Manuel Amorim Barros — Construção, Engenharia, Imobiliária"
        width={FULL_W}
        height={FULL_H}
        sizes="(max-width: 1024px) 240px, 380px"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
