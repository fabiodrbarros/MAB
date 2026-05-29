import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import PropertyGrid from "@/components/sections/PropertyGrid";
import PropertyForm from "@/components/sections/PropertyForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("realestate") };
}

export default async function ImobiliariaPage() {
  const t = await getTranslations("realestate");
  return (
    <div className="bg-white">
      <PageHero label={t("label")} title={t("title")} />
      <PropertyGrid />
      <PropertyForm />
    </div>
  );
}
