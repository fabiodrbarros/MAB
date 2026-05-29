import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime  = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files    = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "Nenhum ficheiro recebido" }, { status: 400 });
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const saved: string[] = [];
    for (const file of files) {
      if (!file || !(file instanceof File)) continue;

      const bytes      = Buffer.from(await file.arrayBuffer());
      const ext        = path.extname(file.name) || ".jpg";
      const safeName   = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext.toLowerCase()}`;
      const filePath   = path.join(UPLOAD_DIR, safeName);

      await fs.writeFile(filePath, bytes);
      saved.push(`/uploads/${safeName}`);
    }

    return NextResponse.json({ urls: saved }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro no upload" },
      { status: 500 }
    );
  }
}
