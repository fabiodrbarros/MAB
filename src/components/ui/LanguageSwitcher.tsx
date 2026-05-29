"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale     = useLocale();
  const router     = useRouter();
  const pathname   = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: "pt" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const btn = (active: boolean) =>
    `text-[11px] tracking-[0.2em] uppercase font-bold transition-colors ${
      active ? "text-brand-copper" : "text-brand-grey/50 hover:text-brand-dark"
    } disabled:opacity-40`;

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        type="button"
        onClick={() => switchTo("pt")}
        disabled={pending}
        className={btn(locale === "pt")}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-brand-grey/30 text-[10px]">/</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        disabled={pending}
        className={btn(locale === "en")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
