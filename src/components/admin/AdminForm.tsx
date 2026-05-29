"use client";

import { useState, useEffect, ChangeEvent } from "react";

export type Field =
  | { name: string; label: string; type: "text" | "textarea"; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "select"; required?: boolean; options: { value: string; label: string }[] };

interface AdminFormProps {
  fields: Field[];
  /** dados iniciais para modo "edit" */
  initial?: Record<string, string>;
  initialImages?: string[];
  /** se true, mostra estado de edição (badge + botão cancelar) */
  isEditing?: boolean;
  /** retorna true em sucesso para limpar o form (em criação) */
  onSubmit: (data: Record<string, string>, images: string[]) => Promise<boolean>;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function AdminForm({
  fields,
  initial,
  initialImages,
  isEditing,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}: AdminFormProps) {
  const [data, setData]       = useState<Record<string, string>>(initial ?? {});
  const [images, setImages]   = useState<string[]>(initialImages ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  /* Quando muda o modo (de criar p/ editar ou inverso), repopular */
  useEffect(() => {
    setData(initial ?? {});
    setImages(initialImages ?? []);
    setMessage(null);
  }, [initial, initialImages]);

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    setMessage(null);

    try {
      const fd = new FormData();
      Array.from(e.target.files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro no upload");
      setImages((prev) => [...prev, ...json.urls]);
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Erro no upload" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (i: number) => setImages((arr) => arr.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const ok = await onSubmit(data, images);
      if (ok) {
        setMessage({ type: "ok", text: isEditing ? "Atualizado com sucesso." : "Guardado com sucesso." });
        if (!isEditing) {
          setData({});
          setImages([]);
        }
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Erro ao guardar" });
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full bg-white border border-brand-light/80 px-4 py-3 text-brand-dark placeholder:text-brand-grey/40 text-sm focus:outline-none focus:border-brand-copper transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isEditing && (
        <div className="flex items-center justify-between gap-3 bg-brand-copper/10 border border-brand-copper/40 px-4 py-3">
          <p className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-bold">
            ✎ A editar item existente
          </p>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold hover:underline"
            >
              Cancelar
            </button>
          )}
        </div>
      )}

      {fields.map((f) => (
        <div key={f.name}>
          <label className="text-brand-grey/60 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
            {f.label} {f.required && <span className="text-brand-copper">*</span>}
          </label>

          {f.type === "textarea" ? (
            <textarea
              required={f.required}
              placeholder={f.placeholder}
              value={data[f.name] ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              rows={4}
              className={`${input} resize-none`}
            />
          ) : f.type === "select" ? (
            <select
              required={f.required}
              value={data[f.name] ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              className={input}
            >
              <option value="">— selecionar —</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              required={f.required}
              placeholder={f.placeholder}
              value={data[f.name] ?? ""}
              onChange={(e) => set(f.name, e.target.value)}
              className={input}
            />
          )}
        </div>
      ))}

      {/* Upload de imagens */}
      <div>
        <label className="text-brand-grey/60 text-[10px] tracking-[0.2em] uppercase block mb-2 font-semibold">
          Imagens {images.length > 0 && <span className="text-brand-grey/50 normal-case tracking-normal ml-2">({images.length})</span>}
        </label>
        <label className="inline-flex items-center gap-2 px-5 py-3 border border-dashed border-brand-light hover:border-brand-copper text-brand-grey hover:text-brand-copper cursor-pointer text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors">
          {uploading ? "A carregar..." : "Adicionar imagens"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((url, i) => (
              <div key={url} className="relative aspect-square border border-brand-light bg-brand-offwhite overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Img ${i+1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-brand-dark/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                  aria-label="Remover"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {message && (
        <p className={`text-sm ${message.type === "ok" ? "text-brand-copper" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-brand-copper2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "A guardar..." : submitLabel} <span>→</span>
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-6 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-grey hover:text-brand-dark border border-brand-light hover:border-brand-grey transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
