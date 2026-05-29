import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import BuildingServices from "@/components/sections/BuildingServices";
import BuildingLayers from "@/components/sections/BuildingLayers";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("construction") };
}

export default async function ConstrucaoPage() {
  const t = await getTranslations("construction");
  return (
    <div className="bg-brand-black">
      <PageHero label={t("label")} title={t("title")} />
      <BuildingServices />
      <BuildingLayers />
    </div>
  );
}
