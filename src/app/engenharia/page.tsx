import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import EngineeringPillars from "@/components/sections/EngineeringPillars";
import EngineeringMethod from "@/components/sections/EngineeringMethod";

export const metadata: Metadata = {
  title: "Engenharia",
  description:
    "Apoio técnico, planeamento e coordenação para obras e projetos de construção.",
};

export default function EngenhariaPage() {
  return (
    <div className="bg-brand-black">
      <PageHero
        label="02 — Engenharia"
        title="Engenharia para transformar intenção em execução."
      />
      <EngineeringPillars />
      <EngineeringMethod />
    </div>
  );
}
