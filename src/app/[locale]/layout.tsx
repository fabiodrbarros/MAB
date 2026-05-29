import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://manuelamorimbarros.pt"),
  title: {
    default: "Manuel Amorim Barros | Construção, Engenharia e Imobiliária em Arcos de Valdevez",
    template: "%s | Manuel Amorim Barros",
  },
  description:
    "Construção, engenharia e imobiliária em Arcos de Valdevez. Território em Valor desde 2003.",
  keywords: [
    "construção Arcos de Valdevez",
    "engenharia civil Alto Minho",
    "imobiliária Minho",
    "moradias Arcos de Valdevez",
    "terraplanagem",
    "Manuel Amorim Barros",
  ],
  openGraph: {
    type: "website",
    siteName: "Manuel Amorim Barros",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </NextIntlClientProvider>
  );
}
