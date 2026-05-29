"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Project } from "@/lib/storage";

export default function ProjectsGallery() {
  const t  = useTranslations("projects");
  const tC = useTranslations("common");

  const categories = [
    { id: "all",           label: t("filters.all") },
    { id: "construcao",    label: t("filters.construction") },
    { id: "terraplanagem", label: t("filters.earthworks") },
    { id: "muros",         label: t("filters.walls") },
    { id: "moradias",      label: t("filters.houses") },
  ] as const;

  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems]               = useState<Project[]>([]);
  const [loading, setLoading]           = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Project[]) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((p) => p.category === activeFilter),
    [activeFilter, items]
  );

  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
  }, [activeFilter]);

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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-colors duration-200 font-semibold ${
                  activeFilter === cat.id
                    ? "bg-brand-copper border-brand-copper text-white"
                    : "border-brand-light/80 text-brand-grey hover:border-brand-dark hover:text-brand-dark"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-brand-grey/50 text-[10px] tracking-[0.25em] uppercase font-semibold mr-2 hidden sm:block">
              {filtered.length.toString().padStart(2, "0")}{" "}
              {filtered.length === 1 ? t("project") : t("projects")}
            </p>
            <button type="button" onClick={() => scrollBy("left")} aria-label={tC("previous")} className="w-10 h-10 border border-brand-light hover:border-brand-copper hover:text-brand-copper text-brand-grey transition-colors flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button type="button" onClick={() => scrollBy("right")} aria-label={tC("next")} className="w-10 h-10 border border-brand-light hover:border-brand-copper hover:text-brand-copper text-brand-grey transition-colors flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          ref={trackRef}
          className="property-carousel flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth"
        >
          {loading ? (
            <div className="w-full py-16 text-center text-brand-grey/50 text-sm">{tC("loading")}</div>
          ) : filtered.length === 0 ? (
            <div className="w-full py-16 text-center text-brand-grey/50 text-sm">
              {t("noResults")}
            </div>
          ) : (
            filtered.map((project, i) => (
              <motion.article
                key={project.id}
                data-card
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex-shrink-0 w-[300px] sm:w-[360px] snap-start border border-brand-light/60 bg-white hover:border-brand-copper/50 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <Link href={`/projetos/${project.id}`} className="block">
                  <div className="overflow-hidden aspect-[4/3] relative bg-brand-offwhite">
                    {project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        sizes="360px"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder label="Imagem a substituir" aspectRatio="landscape" className="absolute inset-0" />
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold">
                        {project.categoryLabel}
                      </span>
                      {project.year && (
                        <span className="text-brand-grey/50 text-[9px] tracking-widest uppercase border border-brand-light px-2 py-0.5">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-brand-dark text-sm font-semibold mb-2 leading-snug min-h-[2.5rem]">
                      {project.title}
                    </h3>
                    <p className="text-brand-grey/60 text-xs leading-relaxed line-clamp-2 mb-5 min-h-[2.5rem]">
                      {project.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-brand-copper text-[10px] tracking-[0.2em] uppercase group-hover:gap-4 transition-all duration-300 font-semibold">
                      <span>{tC("viewDetail")}</span>
                      <span>→</span>
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
