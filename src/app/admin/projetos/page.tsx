"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminForm, { type Field } from "@/components/admin/AdminForm";
import AdminList from "@/components/admin/AdminList";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Project } from "@/lib/storage";

const categoryLabels: Record<string, string> = {
  construcao:    "Construção",
  terraplanagem: "Terraplanagem",
  muros:         "Muros",
  moradias:      "Moradias",
};

const fields: Field[] = [
  { name: "title", label: "Título", type: "text", required: true, placeholder: "Ex: Moradia Unifamiliar em Soajo" },
  {
    name: "category", label: "Categoria", type: "select", required: true,
    options: [
      { value: "construcao",    label: "Construção" },
      { value: "terraplanagem", label: "Terraplanagem" },
      { value: "muros",         label: "Muros" },
      { value: "moradias",      label: "Moradias" },
    ],
  },
  { name: "location",         label: "Localização",        type: "text",     placeholder: "Ex: Arcos de Valdevez" },
  { name: "year",             label: "Ano",                type: "text",     placeholder: "Ex: 2024" },
  { name: "duration",         label: "Duração",            type: "text",     placeholder: "Ex: 12 meses" },
  { name: "area",             label: "Área",               type: "text",     placeholder: "Ex: 180 m²" },
  { name: "client",           label: "Cliente",            type: "text",     placeholder: "Ex: Privado / Empresa X" },
  { name: "shortDescription", label: "Descrição curta",    type: "textarea", placeholder: "Para o card de listagem" },
  { name: "description",      label: "Descrição completa", type: "textarea", placeholder: "Para a página de detalhe" },
];

export default function AdminProjetos() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/projects", { cache: "no-store" });
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const handleSubmit = async (data: Record<string, string>, images: string[]) => {
    const categoryLabel = categoryLabels[data.category] || data.category;

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, categoryLabel, images }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro a criar projeto");
    }
    await reload();
    return true;
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold hover:underline">
            ← Voltar ao admin
          </Link>
          <LogoutButton />
        </div>

        <div className="flex items-center gap-4 mt-8 mb-6">
          <div className="h-px w-10 bg-brand-copper" />
          <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
            Projetos
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark leading-[1.05] tracking-tight mb-12">
          Gerir projetos.
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-xl font-light text-brand-dark mb-6">Adicionar novo projeto</h2>
            <AdminForm fields={fields} onSubmit={handleSubmit} submitLabel="Adicionar projeto" />
          </section>

          <section>
            <h2 className="text-xl font-light text-brand-dark mb-6">
              Projetos existentes {!loading && <span className="text-brand-grey/50 text-sm">({items.length})</span>}
            </h2>
            {loading ? (
              <p className="text-brand-grey/50 text-sm">A carregar...</p>
            ) : (
              <AdminList
                items={items.map((p) => ({ id: p.id, title: p.title, subtitle: `${p.categoryLabel} · ${p.location || "—"}`, images: p.images }))}
                apiPath="/api/projects"
                onChange={reload}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
