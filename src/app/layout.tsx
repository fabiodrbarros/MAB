import type { Metadata } from "next";
import "./globals.css";
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
    "Construção, engenharia e imobiliária em Arcos de Valdevez. Do terreno à obra, da obra à propriedade. Território em Valor desde 2003.",
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
    locale: "pt_PT",
    siteName: "Manuel Amorim Barros",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
