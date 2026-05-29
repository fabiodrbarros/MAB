import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const ADMIN_COOKIE = "mab_admin_session";

/* ─── Auth verification (Web Crypto compatible, runs in Edge) ─── */
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

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ADMIN_COOKIE)?.value;

  /* ─── Admin pages (sem locale prefix) ─── */
  if (pathname.startsWith("/mab-guest-admin")) {
    const authed = await isAuthed(token);
    if (pathname !== "/mab-guest-admin/login" && !authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/mab-guest-admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (pathname === "/mab-guest-admin/login" && authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/mab-guest-admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  /* ─── API writes ─── */
  if (
    (pathname.startsWith("/api/properties") ||
     pathname.startsWith("/api/projects") ||
     pathname.startsWith("/api/upload")) &&
    req.method !== "GET" && req.method !== "HEAD"
  ) {
    const authed = await isAuthed(token);
    if (!authed) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  /* ─── Resto: rotas públicas com locale ─── */
  return intlMiddleware(req);
}

export const config = {
  // Exclui static files, _next, api, etc. da deteção de locale
  matcher: [
    // Tudo exceto _next, static, etc.
    "/((?!_next|api/auth|.*\\..*).*)",
    // Mas inclui APIs protegidas
    "/api/properties/:path*",
    "/api/projects/:path*",
    "/api/upload",
  ],
};
