"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import SectionHeader from "@/components/ui/SectionHeader";

const items = [
  { label: "Terraplanagem", size: "large" },
  { label: "Moradia", size: "small" },
  { label: "Muro Exterior", size: "small" },
  { label: "Estrutura", size: "medium" },
  { label: "Acabamentos", size: "medium" },
  { label: "Preparação de Terreno", size: "large" },
];

export default function BuildingGallery() {
  return (
    <section className="py-24 lg:py-32 bg-brand-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <SectionHeader
            label="Galeria de execução"
            title="Obra em imagens."
            subtitle="Fotografias reais a adicionar brevemente. Espaços preparados para mostrar terraplanagem, estruturas, muros e moradias."
            light
          />
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={item.size === "large" ? "col-span-2 md:col-span-1 md:row-span-2" : ""}
            >
              <ImagePlaceholder
                label={`${item.label} — imagem a substituir`}
                aspectRatio={item.size === "large" ? "portrait" : "landscape"}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
