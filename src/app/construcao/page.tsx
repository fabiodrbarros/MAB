import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import BuildingServices from "@/components/sections/BuildingServices";
import BuildingLayers from "@/components/sections/BuildingLayers";

export const metadata: Metadata = {
  title: "Construção",
  description:
    "Construção de moradias, muros, aterros, terraplanagem e preparação de terreno em Arcos de Valdevez.",
};

export default function ConstrucaoPage() {
  return (
    <div className="bg-brand-black">
      <PageHero
        label="01 — Construção"
        title="Construção com base, método e presença no terreno."
      />
      <BuildingServices />
      <BuildingLayers />
    </div>
  );
}
