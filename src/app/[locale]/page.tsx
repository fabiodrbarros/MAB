import type { Metadata } from "next";
import HomeHero from "@/components/sections/HomeHero";
import AreaCards from "@/components/sections/AreaCards";
import StartingPointConfigurator from "@/components/sections/StartingPointConfigurator";
import HomeCTA from "@/components/sections/HomeCTA";

export const metadata: Metadata = {
  title: "Manuel Amorim Barros | Construção, Engenharia e Imobiliária em Arcos de Valdevez",
  description:
    "Construção, engenharia e imobiliária em Arcos de Valdevez. Do terreno à obra, da obra à propriedade.",
};

export default function HomePage() {
  return (
    <div className="bg-brand-black">
      <HomeHero />
      <AreaCards />
      <StartingPointConfigurator />
      <HomeCTA />
    </div>
  );
}
