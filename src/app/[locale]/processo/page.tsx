import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProcessHero from "@/components/sections/ProcessHero";
import ProcessScroll from "@/components/sections/ProcessScroll";
import PageCTA from "@/components/sections/PageCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("process") };
}

export default async function ProcessoPage() {
  const t = await getTranslations("process.cta");
  return (
    <div className="bg-white">
      <ProcessHero />
      <ProcessScroll />
      <PageCTA title={t("title")} href="/contacto" cta={t("button")} />
    </div>
  );
}
