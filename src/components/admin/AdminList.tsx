"use client";

import { useState } from "react";

export interface AdminItem {
  id: string;
  title: string;
  subtitle?: string;
  images?: string[];
}

interface AdminListProps {
  items: AdminItem[];
  apiPath: string;            // ex: "/api/properties"
  onChange: () => void;       // chamado após delete (para refresh)
}

export default function AdminList({ items, apiPath, onChange }: AdminListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm(`Apagar "${id}"? Esta ação é irreversível.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro a apagar");
      onChange();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro");
    } finally {
      setDeleting(null);
    }
  };

  if (items.length === 0) {
    return (
      <p className="text-brand-grey/50 text-sm py-8 text-center border border-dashed border-brand-light">
        Sem itens registados. Adicione um pelo formulário acima.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-brand-light/60 border border-brand-light/60">
      {items.map((it) => (
        <li key={it.id} className="flex items-center gap-4 px-5 py-4 hover:bg-brand-offwhite transition-colors">
          {it.images && it.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.images[0]} alt="" className="w-14 h-14 object-cover border border-brand-light" />
          ) : (
            <div className="w-14 h-14 border border-brand-light bg-brand-sand/40 flex items-center justify-center text-brand-grey/40 text-xs">
              ◇
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-brand-dark text-sm font-semibold truncate">{it.title}</p>
            {it.subtitle && (
              <p className="text-brand-grey/60 text-xs truncate">{it.subtitle}</p>
            )}
            <p className="text-brand-grey/40 text-[10px] font-mono mt-1">{it.id}</p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete(it.id)}
            disabled={deleting === it.id}
            className="text-brand-grey/60 hover:text-red-600 text-[10px] tracking-[0.2em] uppercase font-semibold border border-brand-light hover:border-red-600 px-3 py-2 transition-colors disabled:opacity-50"
          >
            {deleting === it.id ? "..." : "Apagar"}
          </button>
        </li>
      ))}
    </ul>
  );
}
