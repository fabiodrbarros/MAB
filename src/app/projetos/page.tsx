import type { Metadata } from "next";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Projetos e Galeria",
  description:
    "Galeria de obra, construção, terrenos e propriedades da Manuel Amorim Barros.",
};

export default function ProjetosPage() {
  return (
    <div className="bg-white">
      <PageHero
        label="Projetos"
        title="Obra, detalhe e território."
      />
      <ProjectsGallery />
    </div>
  );
}
