"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Property } from "@/lib/storage";

const filters = [
  { id: "all",                label: "Todos" },
  { id: "Terreno",            label: "Terrenos" },
  { id: "Moradia",            label: "Moradias" },
  { id: "Em Desenvolvimento", label: "Em desenvolvimento" },
  { id: "Oportunidade",       label: "Oportunidades" },
] as const;

export default function PropertyGrid() {
  const [active, setActive]       = useState<string>("all");
  const [items, setItems]         = useState<Property[]>([]);
  const [loading, setLoading]     = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  // Carregar propriedades do API
  useEffect(() => {
    fetch("/api/properties", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Property[]) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((p) => p.type === active)),
    [active, items]
  );

  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
  }, [active]);

  const scrollBy = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 360;
    const gap = 24;
    trackRef.current.scrollBy({
      left: (cardWidth + gap) * (dir === "left" ? -1 : 1),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white pt-4 pb-24 lg:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Filtros + setas */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-colors duration-200 font-semibold ${
                  active === f.id
                    ? "bg-brand-copper border-brand-copper text-white"
                    : "border-brand-light/80 text-brand-grey hover:border-brand-dark hover:text-brand-dark"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-brand-grey/50 text-[10px] tracking-[0.25em] uppercase font-semibold mr-2 hidden sm:block">
              {filtered.length.toString().padStart(2, "0")}{" "}
              {filtered.length === 1 ? "propriedade" : "propriedades"}
            </p>
            <button
              type="button"
              onClick={() => scrollBy("left")}
              aria-label="Anterior"
              className="w-10 h-10 border border-brand-light hover:border-brand-copper hover:text-brand-copper text-brand-grey transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy("right")}
              aria-label="Seguinte"
              className="w-10 h-10 border border-brand-light hover:border-brand-copper hover:text-brand-copper text-brand-grey transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carrossel */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          ref={trackRef}
          className="property-carousel flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth"
        >
          {loading ? (
            <div className="w-full py-16 text-center text-brand-grey/50 text-sm">A carregar propriedades...</div>
          ) : filtered.length === 0 ? (
            <div className="w-full py-16 text-center text-brand-grey/50 text-sm">
              Sem propriedades nesta categoria de momento.
            </div>
          ) : (
            filtered.map((prop, i) => (
              <motion.article
                key={prop.id}
                data-card
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex-shrink-0 w-[300px] sm:w-[360px] snap-start border border-brand-light/60 bg-white hover:border-brand-copper/50 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <Link href={`/imobiliaria/${prop.id}`} className="block">
                  <div className="overflow-hidden aspect-[4/3] relative bg-brand-offwhite">
                    {prop.images[0] ? (
                      <Image
                        src={prop.images[0]}
                        alt={prop.title}
                        fill
                        sizes="360px"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder label="Imagem a substituir" aspectRatio="landscape" className="absolute inset-0" />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-copper text-sm">{prop.typeIcon}</span>
                      <span className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold">
                        {prop.type}
                      </span>
                    </div>
                    <h3 className="text-brand-dark text-sm font-semibold mb-2 leading-snug min-h-[2.5rem]">
                      {prop.title}
                    </h3>
                    <p className="text-brand-grey/60 text-xs tracking-wide mb-3">
                      {prop.location} · {prop.region}
                    </p>
                    <p className="text-brand-grey/70 text-xs leading-relaxed mb-5 line-clamp-2 min-h-[2.5rem]">
                      {prop.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-brand-grey/50 border border-brand-light px-2 py-1">
                        {prop.status}
                      </span>
                      <span className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold group-hover:underline">
                        Ver detalhe →
                      </span>
                    </div>

                    <div className="h-px bg-brand-copper/0 group-hover:bg-brand-copper/30 mt-5 transition-all duration-500" />
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
