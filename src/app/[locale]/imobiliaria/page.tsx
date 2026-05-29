import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PropertyGrid from "@/components/sections/PropertyGrid";
import PropertyForm from "@/components/sections/PropertyForm";

export const metadata: Metadata = {
  title: "Imobiliária",
  description:
    "Compra, venda e valorização de propriedades, terrenos e oportunidades imobiliárias no Alto Minho.",
};

export default function ImobiliariaPage() {
  return (
    <div className="bg-white">
      <PageHero
        label="03 — Imobiliária"
        title="Propriedades com potencial. Terrenos com futuro."
      />
      <PropertyGrid />
      <PropertyForm />
    </div>
  );
}
