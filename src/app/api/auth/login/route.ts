import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, verifyCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as { username?: string; password?: string };

    if (!username || !password) {
      return NextResponse.json({ error: "Credenciais em falta" }, { status: 400 });
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: ADMIN_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erro no login" }, { status: 500 });
  }
}
