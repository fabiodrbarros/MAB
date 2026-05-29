/**
 * Autenticação simples baseada em cookie HTTP-only.
 *
 * Credenciais via variáveis de ambiente:
 *   ADMIN_USERNAME    (default: "admin")
 *   ADMIN_PASSWORD    (default: "mab2026")
 *   ADMIN_SESSION_KEY (default: gerada — DEFINIR EM PRODUÇÃO)
 *
 * NÃO usar este sistema para volume alto / produção crítica.
 * É suficiente para um painel de admin pequeno e bem escondido.
 */

import crypto from "crypto";

export const ADMIN_COOKIE = "mab_admin_session";

const USERNAME    = process.env.ADMIN_USERNAME    || "admin";
const PASSWORD    = process.env.ADMIN_PASSWORD    || "mab2026";
const SESSION_KEY = process.env.ADMIN_SESSION_KEY || "mab-default-secret-CHANGE-IN-PROD";

/** Verifica credenciais (constant-time compare para evitar timing attacks) */
export function verifyCredentials(username: string, password: string): boolean {
  const u = safeCompare(username, USERNAME);
  const p = safeCompare(password, PASSWORD);
  return u && p;
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  try {
    return crypto.timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

/** Gera o token da sessão (HMAC do username) */
export function createSessionToken(username: string): string {
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 dias
  const payload = `${username}.${expiry}`;
  const sig = crypto.createHmac("sha256", SESSION_KEY).update(payload).digest("hex");
  return Buffer.from(`${payload}.${sig}`).toString("base64url");
}

/** Verifica se um token de sessão é válido e não expirou */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(".");
    if (parts.length !== 3) return false;
    const [username, expiryStr, sig] = parts;

    // Verificar assinatura
    const expected = crypto
      .createHmac("sha256", SESSION_KEY)
      .update(`${username}.${expiryStr}`)
      .digest("hex");

    if (!safeCompare(sig, expected)) return false;

    // Verificar expiração
    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || Date.now() > expiry) return false;

    return true;
  } catch {
    return false;
  }
}
