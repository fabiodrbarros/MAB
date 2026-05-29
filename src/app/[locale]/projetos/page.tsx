import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import PageHero from "@/components/sections/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("projects") };
}

export default async function ProjetosPage() {
  const t = await getTranslations("projects");
  return (
    <div className="bg-white">
      <PageHero label={t("label")} title={t("title")} />
      <ProjectsGallery />
    </div>
  );
}
