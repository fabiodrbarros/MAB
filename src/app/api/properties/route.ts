import { NextResponse } from "next/server";
import { getProperties, saveProperty, generateId, type Property } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = await getProperties();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Property>;
    if (!body.title || !body.type) {
      return NextResponse.json({ error: "title e type são obrigatórios" }, { status: 400 });
    }

    const property: Property = {
      id: body.id ?? generateId("prop"),
      type: body.type,
      typeIcon: body.typeIcon ?? "◈",
      title: body.title,
      location: body.location ?? "",
      region: body.region ?? "Alto Minho",
      status: body.status ?? "Disponível",
      shortDescription: body.shortDescription ?? "",
      description: body.description ?? "",
      features: body.features ?? [],
      area: body.area ?? "",
      price: body.price ?? "Sob consulta",
      images: body.images ?? [],
      createdAt: body.createdAt ?? new Date().toISOString(),
    };

    const saved = await saveProperty(property);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
