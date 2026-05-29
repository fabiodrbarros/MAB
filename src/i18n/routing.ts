import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed", // PT sem prefixo (/), EN com prefixo (/en/...)
});

// Wrappers tipados de Link / redirect / usePathname / useRouter
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
