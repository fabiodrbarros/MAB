import type { Metadata } from "next";
import ProcessHero from "@/components/sections/ProcessHero";
import ProcessScroll from "@/components/sections/ProcessScroll";
import PageCTA from "@/components/sections/PageCTA";

export const metadata: Metadata = {
  title: "Do Solo ao Valor",
  description:
    "Conheça o processo que liga terreno, engenharia, construção e valorização imobiliária.",
};

export default function ProcessoPage() {
  return (
    <div className="bg-white">
      <ProcessHero />
      <ProcessScroll />
      <PageCTA
        title="Pronto para transformar o seu terreno?"
        href="/contacto"
        cta="Fale connosco"
      />
    </div>
  );
}
