// Lightweight JWT using Web Crypto API (Edge-compatible, no dependencies)

const SECRET = process.env.JWT_SECRET ?? "fallback-dev-secret-change-in-prod";
const EXPIRES_IN = 60 * 60 * 8; // 8 hours in seconds

function base64url(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  return Buffer.from(pad ? padded + "=".repeat(4 - pad) : padded, "base64").toString();
}

async function hmacSign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Buffer.from(sig)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function signAdminToken(): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + EXPIRES_IN,
    })
  );
  const sig = await hmacSign(`${header}.${payload}`);
  return `${header}.${payload}.${sig}`;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [header, payload, sig] = parts;
    const expectedSig = await hmacSign(`${header}.${payload}`);
    if (sig !== expectedSig) return false;

    const { role, exp } = JSON.parse(base64urlDecode(payload));
    if (role !== "admin") return false;
    if (Math.floor(Date.now() / 1000) > exp) return false;

    return true;
  } catch {
    return false;
  }
}