export const ADMIN_COOKIE_NAME = "sheferoy_admin_session";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "Sheferoy@2026",
    secret: process.env.ADMIN_SESSION_SECRET || "sheferoy-guppy-secret-key-salt-2026-ornamental-fish",
  };
}

/**
 * Constant-time string equality check to completely defeat timing side-channel attacks.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aBuf = enc.encode(a);
  const bBuf = enc.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < aBuf.byteLength; i++) {
    diff |= aBuf[i] ^ bBuf[i];
  }
  return diff === 0;
}

export function validateAdminCredentials(user: string, pass: string): boolean {
  const creds = getAdminCredentials();
  const userValid = timingSafeCompare(user.trim().toLowerCase(), creds.username.trim().toLowerCase());
  const passValid = timingSafeCompare(pass.trim(), creds.password.trim());
  return userValid && passValid;
}

/**
 * Creates a cryptographically signed HMAC-SHA256 session token using the Web Crypto API.
 * Works seamlessly across Edge Runtime and Node.js.
 */
export async function createAdminToken(username: string, rememberMe = true): Promise<string> {
  const { secret } = getAdminCredentials();
  const maxAgeMs = rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 14 days or 1 day
  const exp = Date.now() + maxAgeMs;

  const payload = JSON.stringify({ u: username, exp });
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sigHex = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const payloadB64 = btoa(payload)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${payloadB64}.${sigHex}`;
}

/**
 * Verifies the validity and expiration of an HMAC-SHA256 admin session token.
 */
export async function verifyAdminToken(
  token?: string | null
): Promise<{ valid: boolean; user?: string }> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false };
  }

  try {
    const { secret } = getAdminCredentials();
    const [payloadB64, sigHex] = token.split(".");

    let b64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const payloadStr = atob(b64);
    const parsed = JSON.parse(payloadStr);

    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) {
      return { valid: false };
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const match = sigHex.match(/.{1,2}/g);
    if (!match) return { valid: false };
    const sigBytes = new Uint8Array(match.map((byte) => parseInt(byte, 16)));

    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(payloadStr));
    if (!isValid) return { valid: false };

    return { valid: true, user: parsed.u };
  } catch {
    return { valid: false };
  }
}
