/**
 * Unsubscribe tokens, the one place the opt-out flag is written, and the
 * one-click headers every marketing send carries.
 *
 * New links use HMAC-signed tokens. Legacy base64(uid) links already in
 * inboxes remain valid for opting out only; neither format can opt back in.
 *
 * Server only (imports firebase-admin).
 */

import { createHmac, timingSafeEqual } from "crypto";
import { getAdminDb } from "@/lib/firebase-admin";

const SITE = "https://www.tigertest.io";

export function unsubscribeToken(uid: string): string {
  const secret = process.env.EMAIL_UNSUBSCRIBE_SECRET;
  if (!secret) throw new Error("EMAIL_UNSUBSCRIBE_SECRET is required for signed unsubscribe links");
  const encoded = Buffer.from(uid).toString("base64url");
  const signature = createHmac("sha256", secret).update(`v1.${encoded}`).digest("base64url");
  return `v1.${encoded}.${signature}`;
}

/** Decode a token to a uid. Null for anything that cannot be one. */
export function uidFromToken(token: unknown): string | null {
  if (typeof token !== "string" || !token) return null;
  if (token.startsWith("v1.")) {
    const secret = process.env.EMAIL_UNSUBSCRIBE_SECRET;
    if (!secret) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const expected = createHmac("sha256", secret).update(`v1.${parts[1]}`).digest("base64url");
    const actual = Buffer.from(parts[2]);
    if (actual.length !== expected.length || !timingSafeEqual(actual, Buffer.from(expected))) return null;
    const uid = Buffer.from(parts[1], "base64url").toString("utf8");
    return /^[A-Za-z0-9_-]{1,128}$/.test(uid) ? uid : null;
  }
  // Existing inbox links remain valid for opt-out only.
  let uid: string;
  try {
    uid = Buffer.from(token, "base64").toString("utf-8");
  } catch {
    return null;
  }
  // Firebase uids are 1-128 chars of [A-Za-z0-9]. Allow - and _ for test
  // accounts; reject anything that could be a path or a query.
  return /^[A-Za-z0-9_-]{1,128}$/.test(uid) ? uid : null;
}

/**
 * RFC 8058 one-click unsubscribe. Gmail and Yahoo surface an "Unsubscribe"
 * button next to the sender name for mail that carries both headers, and
 * grade bulk senders on having them. The POST target is /api/unsubscribe,
 * which accepts the token from the query string for exactly this case.
 */
export function listUnsubscribeHeaders(uid: string): Record<string, string> {
  const url = `${SITE}/api/unsubscribe?token=${encodeURIComponent(unsubscribeToken(uid))}`;
  return {
    "List-Unsubscribe": `<${url}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

/**
 * Flag the user as opted out. set+merge rather than update so a uid with no
 * Firestore doc yet (signed up, never saved) is still recorded; otherwise the
 * request would 500 and the person would stay subscribed.
 */
export async function markUnsubscribed(uid: string): Promise<void> {
  await getAdminDb()
    .collection("users")
    .doc(uid)
    .set({ unsubscribed: true, unsubscribedAt: new Date().toISOString() }, { merge: true });
}

/** Fresh read of the opt-out flag, for the last check before a send. */
export async function isUnsubscribed(uid: string): Promise<boolean> {
  const snap = await getAdminDb().collection("users").doc(uid).get();
  return snap.data()?.unsubscribed === true;
}
