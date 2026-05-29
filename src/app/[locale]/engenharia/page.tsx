import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/sections/PageHero";
import EngineeringPillars from "@/components/sections/EngineeringPillars";
import EngineeringMethod from "@/components/sections/EngineeringMethod";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("engineering") };
}

export default async function EngenhariaPage() {
  const t = await getTranslations("engineering");
  return (
    <div className="bg-brand-black">
      <PageHero label={t("label")} title={t("title")} />
      <EngineeringPillars />
      <EngineeringMethod />
    </div>
  );
}
