import type { Metadata } from "next";
import ContactPage from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Contactos da Manuel Amorim Barros — construção, engenharia e imobiliária em Arcos de Valdevez. Telefone, email e localização.",
};

export default function Contactos() {
  return <ContactPage />;
}
