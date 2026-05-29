"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/projects", { cache: "no-store" });
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const editing = useMemo(
    () => (editingId ? items.find((p) => p.id === editingId) ?? null : null),
    [editingId, items]
  );

  const initial = useMemo(() => {
    if (!editing) return undefined;
    return {
      title: editing.title,
      category: editing.category,
      location: editing.location,
      year: editing.year,
      duration: editing.duration,
      area: editing.area,
      client: editing.client,
      shortDescription: editing.shortDescription,
      description: editing.description,
    };
  }, [editing]);

  const startEdit = (id: string) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => setEditingId(null);

  const handleSubmit = async (data: Record<string, string>, images: string[]) => {
    const categoryLabel = categoryLabels[data.category] || data.category;
    const payload = { ...data, categoryLabel, images };

    const url    = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro a guardar projeto");
    }
    await reload();
    setEditingId(null);
    return true;
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/mab-guest-admin" className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold hover:underline">
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
            <h2 className="text-xl font-light text-brand-dark mb-6">
              {editing ? `Editar: ${editing.title}` : "Adicionar novo projeto"}
            </h2>
            <AdminForm
              key={editingId ?? "new"}
              fields={fields}
              initial={initial}
              initialImages={editing?.images}
              isEditing={!!editing}
              onSubmit={handleSubmit}
              onCancel={cancelEdit}
              submitLabel={editing ? "Guardar alterações" : "Adicionar projeto"}
            />
          </section>

          <section>
            <h2 className="text-xl font-light text-brand-dark mb-6">
              Projetos existentes {!loading && <span className="text-brand-grey/50 text-sm">({items.length})</span>}
            </h2>
            {loading ? (
              <p className="text-brand-grey/50 text-sm">A carregar...</p>
            ) : (
              <AdminList
                items={items.map((p) => ({
                  id: p.id,
                  title: p.title,
                  subtitle: `${p.categoryLabel} · ${p.location || "—"}`,
                  images: p.images,
                }))}
                apiPath="/api/projects"
                editingId={editingId}
                onChange={reload}
                onEdit={startEdit}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
