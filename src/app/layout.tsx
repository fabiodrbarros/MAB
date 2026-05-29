// Root layout mínimo — apenas <html><body>.
// Os layouts internos ([locale]/layout.tsx e mab-guest-admin/...) tratam do resto.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://manuelamorimbarros.pt"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
