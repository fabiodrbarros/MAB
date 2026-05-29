import { NextResponse } from "next/server";
import { deleteProject, getProject, saveProject, type Project } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const existing = await getProject(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await req.json()) as Partial<Project>;
  const updated: Project = { ...existing, ...body, id: params.id };
  await saveProject(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ok = await deleteProject(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
