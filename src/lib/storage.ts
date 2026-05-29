/**
 * Persistência simples baseada em ficheiros JSON.
 * Roda apenas no servidor (Node). Não importar a partir de componentes client.
 */
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export type Property = {
  id: string;
  type: string;
  typeIcon: string;
  title: string;
  location: string;
  region: string;
  status: string;
  shortDescription: string;
  description: string;
  features: string[];
  area: string;
  price: string;
  images: string[];           // caminhos relativos a /public (ex: "/uploads/..")
  createdAt: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  location: string;
  year: string;
  duration: string;
  area: string;
  client: string;
  images: string[];
  createdAt: string;
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf8");
}

/* ─────────── PROPERTIES ─────────── */

export async function getProperties(): Promise<Property[]> {
  return readJson<Property[]>("properties.json", []);
}

export async function getProperty(id: string): Promise<Property | null> {
  const list = await getProperties();
  return list.find((p) => p.id === id) ?? null;
}

export async function saveProperty(p: Property): Promise<Property> {
  const list = await getProperties();
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) list[idx] = p;
  else list.unshift(p); // novos aparecem primeiro
  await writeJson("properties.json", list);
  return p;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const list = await getProperties();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  await writeJson("properties.json", next);
  return true;
}

/* ─────────── PROJECTS ─────────── */

export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>("projects.json", []);
}

export async function getProject(id: string): Promise<Project | null> {
  const list = await getProjects();
  return list.find((p) => p.id === id) ?? null;
}

export async function saveProject(p: Project): Promise<Project> {
  const list = await getProjects();
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) list[idx] = p;
  else list.unshift(p);
  await writeJson("projects.json", list);
  return p;
}

export async function deleteProject(id: string): Promise<boolean> {
  const list = await getProjects();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  await writeJson("projects.json", next);
  return true;
}

/* ─────────── UTILS ─────────── */

export function generateId(prefix: "prop" | "proj"): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
