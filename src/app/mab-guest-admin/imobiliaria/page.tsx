"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import AdminForm, { type Field } from "@/components/admin/AdminForm";
import AdminList from "@/components/admin/AdminList";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Property } from "@/lib/storage";

const typeIcons: Record<string, string> = {
  Terreno: "▲",
  Moradia: "◆",
  "Em Desenvolvimento": "◈",
  Oportunidade: "▣",
};

const fields: Field[] = [
  { name: "title", label: "Título", type: "text", required: true, placeholder: "Ex: Terreno em Soajo com vista para o rio" },
  {
    name: "type", label: "Tipo", type: "select", required: true,
    options: [
      { value: "Terreno",            label: "Terreno" },
      { value: "Moradia",            label: "Moradia" },
      { value: "Em Desenvolvimento", label: "Em Desenvolvimento" },
      { value: "Oportunidade",       label: "Oportunidade" },
    ],
  },
  { name: "location",         label: "Localização",        type: "text",     placeholder: "Ex: Arcos de Valdevez" },
  { name: "region",           label: "Região",             type: "text",     placeholder: "Ex: Alto Minho" },
  { name: "status",           label: "Estado",             type: "text",     placeholder: "Ex: Disponível" },
  { name: "area",             label: "Área",               type: "text",     placeholder: "Ex: 1500 m²" },
  { name: "price",            label: "Preço",              type: "text",     placeholder: "Ex: Sob consulta" },
  { name: "shortDescription", label: "Descrição curta",    type: "textarea", placeholder: "Para o card de listagem" },
  { name: "description",      label: "Descrição completa", type: "textarea", placeholder: "Para a página de detalhe" },
  { name: "features",         label: "Características (separadas por vírgula)", type: "text", placeholder: "Ex: Acesso fácil, Boa exposição solar" },
];

export default function AdminImobiliaria() {
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/properties", { cache: "no-store" });
    setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  // Item em edição
  const editing = useMemo(
    () => (editingId ? items.find((p) => p.id === editingId) ?? null : null),
    [editingId, items]
  );

  // Pré-preencher formulário quando entrar em modo de edição
  const initial = useMemo(() => {
    if (!editing) return undefined;
    return {
      title: editing.title,
      type: editing.type,
      location: editing.location,
      region: editing.region,
      status: editing.status,
      area: editing.area,
      price: editing.price,
      shortDescription: editing.shortDescription,
      description: editing.description,
      features: editing.features.join(", "),
    };
  }, [editing]);

  const startEdit = (id: string) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const cancelEdit = () => setEditingId(null);

  const handleSubmit = async (data: Record<string, string>, images: string[]) => {
    const features = (data.features || "").split(",").map((s) => s.trim()).filter(Boolean);
    const typeIcon = typeIcons[data.type] || "◈";
    const payload  = { ...data, features, typeIcon, images };

    const url    = editingId ? `/api/properties/${editingId}` : "/api/properties";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro a guardar propriedade");
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
            Imobiliária
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark leading-[1.05] tracking-tight mb-12">
          Gerir propriedades.
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-xl font-light text-brand-dark mb-6">
              {editing ? `Editar: ${editing.title}` : "Adicionar nova propriedade"}
            </h2>
            <AdminForm
              key={editingId ?? "new"}
              fields={fields}
              initial={initial}
              initialImages={editing?.images}
              isEditing={!!editing}
              onSubmit={handleSubmit}
              onCancel={cancelEdit}
              submitLabel={editing ? "Guardar alterações" : "Adicionar propriedade"}
            />
          </section>

          <section>
            <h2 className="text-xl font-light text-brand-dark mb-6">
              Propriedades existentes {!loading && <span className="text-brand-grey/50 text-sm">({items.length})</span>}
            </h2>
            {loading ? (
              <p className="text-brand-grey/50 text-sm">A carregar...</p>
            ) : (
              <AdminList
                items={items.map((p) => ({
                  id: p.id,
                  title: p.title,
                  subtitle: `${p.type} · ${p.location}`,
                  images: p.images,
                }))}
                apiPath="/api/properties"
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
