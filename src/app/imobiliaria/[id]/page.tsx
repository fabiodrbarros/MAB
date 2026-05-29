import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProperty } from "@/lib/storage";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProperty(params.id);
  if (!p) return { title: "Propriedade não encontrada" };
  return {
    title: p.title,
    description: p.shortDescription || p.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);
  if (!property) notFound();

  const hasImgs  = property.images.length > 0;

  return (
    <div className="bg-white min-h-screen">
      {/* HERO COM IMAGEM/PLACEHOLDER */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pd-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,42,0.05)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pd-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <Link href="/imobiliaria" className="inline-flex items-center gap-2 text-brand-grey hover:text-brand-copper text-[10px] tracking-[0.2em] uppercase font-semibold mb-8 transition-colors">
            ← Voltar à listagem
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-brand-copper" />
            <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold">
              <span className="mr-2">{property.typeIcon}</span>{property.type}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-brand-dark leading-[1.05] tracking-tight max-w-4xl mb-6">
            {property.title}
          </h1>

          <p className="text-brand-grey text-base lg:text-lg">
            {property.location} · {property.region}
          </p>
        </div>
      </section>

      {/* GALERIA */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {hasImgs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:row-span-2 md:col-span-1">
                <div className="relative aspect-[4/3] md:aspect-[3/4] bg-brand-offwhite overflow-hidden">
                  <Image src={property.images[0]} alt={property.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
              {property.images.slice(1, 5).map((img, i) => (
                <div key={img} className="relative aspect-[4/3] bg-brand-offwhite overflow-hidden">
                  <Image src={img} alt={`${property.title} ${i+2}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
              ))}
            </div>
          ) : (
            <ImagePlaceholder
              label={`${property.title} — imagem a substituir`}
              aspectRatio="video"
              className="w-full"
            />
          )}
        </div>
      </section>

      {/* DETALHES */}
      <section className="bg-white pb-24 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Descrição */}
            <div className="lg:col-span-2">
              <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold mb-4">Descrição</p>
              <p className="text-brand-dark text-lg leading-relaxed whitespace-pre-line">
                {property.description || property.shortDescription || "Descrição a disponibilizar brevemente."}
              </p>

              {property.features?.length > 0 && (
                <div className="mt-12">
                  <p className="text-brand-copper text-[10px] tracking-[0.4em] uppercase font-semibold mb-5">Características</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-brand-grey">
                        <span className="text-brand-copper mt-1">▸</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Ficha técnica */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative border border-brand-copper/40 bg-brand-copper/[0.04] p-8">
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((c, i) => <div key={i} className={`absolute ${c} border-brand-copper w-4 h-4`} />)}

                <p className="text-brand-copper text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
                  Ficha técnica
                </p>

                <dl className="space-y-4">
                  {[
                    ["Tipo",          property.type],
                    ["Localização",   `${property.location} · ${property.region}`],
                    ["Área",          property.area],
                    ["Preço",         property.price],
                    ["Estado",        property.status],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k as string} className="border-b border-brand-light/60 pb-3">
                      <dt className="text-brand-grey/60 text-[10px] tracking-widest uppercase mb-1 font-semibold">{k}</dt>
                      <dd className="text-brand-dark text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href="/contacto"
                  className="mt-8 inline-flex w-full items-center justify-center gap-3 px-6 py-4 bg-brand-copper text-white text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-brand-copper2 transition-colors"
                >
                  Pedir informações →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
}
