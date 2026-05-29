import { NextResponse } from "next/server";
import { getProjects, saveProject, generateId, type Project } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = await getProjects();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Project>;
    if (!body.title || !body.category) {
      return NextResponse.json({ error: "title e category são obrigatórios" }, { status: 400 });
    }

    const project: Project = {
      id: body.id ?? generateId("proj"),
      title: body.title,
      category: body.category,
      categoryLabel: body.categoryLabel ?? body.category,
      shortDescription: body.shortDescription ?? "",
      description: body.description ?? "",
      location: body.location ?? "",
      year: body.year ?? "",
      duration: body.duration ?? "",
      area: body.area ?? "",
      client: body.client ?? "",
      images: body.images ?? [],
      createdAt: body.createdAt ?? new Date().toISOString(),
    };

    const saved = await saveProject(project);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
