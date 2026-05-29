import { NextResponse } from "next/server";
import { deleteProperty, getProperty, saveProperty, type Property } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const property = await getProperty(params.id);
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(property);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const existing = await getProperty(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await req.json()) as Partial<Property>;
  const updated: Property = { ...existing, ...body, id: params.id };
  await saveProperty(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ok = await deleteProperty(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
