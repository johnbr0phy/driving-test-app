/**
 * Unsubscribe tokens, the one place the opt-out flag is written, and the
 * one-click headers every marketing send carries.
 *
 * The token is base64(uid), the format every email already sitting in
 * people's inboxes uses, so old links keep working. A token only lets
 * someone opt a user OUT of email, never back in, which is why it is not
 * signed.
 *
 * Server only (imports firebase-admin).
 */

import { getAdminDb } from "@/lib/firebase-admin";

const SITE = "https://tigertest.io";

export function unsubscribeToken(uid: string): string {
  return Buffer.from(uid).toString("base64");
}

/** Decode a token to a uid. Null for anything that cannot be one. */
export function uidFromToken(token: unknown): string | null {
  if (typeof token !== "string" || !token) return null;
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
