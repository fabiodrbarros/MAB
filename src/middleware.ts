import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "mab_admin_session";

// Importar a verificação directamente (não pode usar 'crypto' de node em edge,
// por isso replicamos a lógica usando Web Crypto API).
async function isAuthed(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const SESSION_KEY = process.env.ADMIN_SESSION_KEY || "mab-default-secret-CHANGE-IN-PROD";

  try {
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const parts = decoded.split(".");
    if (parts.length !== 3) return false;
    const [username, expiryStr, sig] = parts;

    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || Date.now() > expiry) return false;

    // Recriar HMAC via Web Crypto
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(SESSION_KEY),
      { name: "HMAC", hash: "SHA-256" },
      false, ["sign"]
    );
    const macBuf = await crypto.subtle.sign("HMAC", key, enc.encode(`${username}.${expiryStr}`));
    const expected = Array.from(new Uint8Array(macBuf))
      .map((b) => b.toString(16).padStart(2, "0")).join("");

    return sig === expected;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await isAuthed(token);

  // Páginas /admin/* (exceto /admin/login) requerem sessão
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Se já está autenticado e vai para /admin/login → manda para /admin
  if (pathname === "/admin/login" && authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // APIs de escrita protegidas (POST/PUT/DELETE em /api/properties, /api/projects, /api/upload)
  if (
    (pathname.startsWith("/api/properties") ||
     pathname.startsWith("/api/projects") ||
     pathname.startsWith("/api/upload")) &&
    req.method !== "GET" && req.method !== "HEAD"
  ) {
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/properties/:path*", "/api/projects/:path*", "/api/upload"],
};
