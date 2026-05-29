"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { projects } from "@/data/projects";

type Project = typeof projects[number];

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    if (project) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/90 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-brand-dark z-50 overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all z-10"
            >
              ×
            </button>

            {/* Image */}
            <ImagePlaceholder
              label={`${project.title} — imagem a substituir`}
              aspectRatio="video"
              className="w-full"
            />

            <div className="p-8 lg:p-10">
              {/* Category */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-brand-copper text-[10px] tracking-[0.3em] uppercase">
                  {project.categoryLabel}
                </span>
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-white/20 text-[9px] tracking-widest uppercase border border-white/8 px-2 py-0.5">
                  Imagem a substituir
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-light text-white mb-5 leading-snug">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-brand-light/60 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Meta */}
              <div className="border border-white/5 p-5 mb-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[10px] tracking-widest uppercase">Localização</span>
                  <span className="text-white/70 text-sm">{project.location}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[10px] tracking-widest uppercase">Área</span>
                  <span className="text-white/70 text-sm">{project.categoryLabel}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[10px] tracking-widest uppercase">Estado</span>
                  <span className="text-brand-copper/80 text-sm">Dados a completar</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contacto"
                onClick={onClose}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-brand-copper2 transition-colors duration-300 w-full justify-center"
              >
                Falar sobre um projeto semelhante <span>→</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
