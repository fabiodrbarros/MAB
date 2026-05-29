"use client";

import AreaCard from "./AreaCard";
import { areas } from "@/data/areas";
import { motion } from "framer-motion";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

export default function AreaCards() {
  return (
    <section id="areas" className="relative py-24 lg:py-36 bg-brand-dark overflow-hidden">
      <BlueprintBackground variant="dark" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header da secção — só com o título maior */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              Áreas
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.05] tracking-tight max-w-4xl">
            Três áreas.<br />
            <span className="text-brand-copper">Um ciclo completo.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {areas.map((area, i) => (
            <AreaCard
              key={area.id}
              number={area.number}
              title={area.title}
              headline={area.headline}
              description={area.description}
              slug={area.slug}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
