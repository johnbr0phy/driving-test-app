/**
 * Shared helpers for Vercel cron email routes.
 *
 * Smart design:
 * - buildAuthMap() does ONE auth.listUsers() call → Map<uid, {email, creationTime}>
 *   instead of N individual auth.getUser() calls
 * - getEligibleUsers() queries only consented, non-unsubscribed users from Firestore
 * - processBatch() caps at MAX_BATCH emails per run → stays well inside Vercel timeout
 */

import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";

const resend = new Resend(process.env.RESEND_API_KEY || "re_ZABm3to6_GzdZQQ58cj5DYftGbtr9ub1a");
export const MAX_BATCH = 50;

// ── Auth helpers ──────────────────────────────────────────────────────────────

export interface AuthRecord {
  email: string;
  creationTime: Date;
}

/**
 * Build a UID → {email, creationTime} map in a single Auth list call.
 * Cached per request — call once and pass around.
 */
export async function buildAuthMap(): Promise<Map<string, AuthRecord>> {
  const auth = getAdminAuth();
  const map = new Map<string, AuthRecord>();
  let pageToken: string | undefined;

  do {
    const result = await auth.listUsers(1000, pageToken);
    for (const u of result.users) {
      if (u.email) {
        map.set(u.uid, {
          email: u.email,
          creationTime: new Date(u.metadata.creationTime),
        });
      }
    }
    pageToken = result.pageToken;
  } while (pageToken);

  return map;
}

// ── Firestore helpers ─────────────────────────────────────────────────────────

export interface PaywallHit {
  count: number;
  lastAt: string; // ISO timestamp
  label: string;
  location: string;
  itemId: string;
}

export interface UserDoc {
  uid: string;
  email: string;
  creationTime: Date;
  completedTests: any[];
  emailsSent: string[];
  subscription: any;
  lastEmailSent: Date | null;
  lastUpdated: Date | null;
  paywallHits: Record<string, PaywallHit>;
}

/**
 * Query Firestore for users who have consented to email.
 * Cross-references with authMap to get email + creationTime.
 * Returns only users present in both (consented + have an email).
 *
 * includeMissingConsent: false (default) = strict, emailConsent === true only
 *                        true = include users where field is missing (opt-in legacy users)
 */
export async function getEligibleUsers(
  authMap: Map<string, AuthRecord>,
  includeMissingConsent = false
): Promise<UserDoc[]> {
  const db = getAdminDb();

  let query = db
    .collection("users")
    .where("unsubscribed", "!=", true) as FirebaseFirestore.Query;

  if (!includeMissingConsent) {
    query = db
      .collection("users")
      .where("emailConsent", "==", true)
      .where("unsubscribed", "!=", true);
  }

  const snap = await query.get();
  const users: UserDoc[] = [];

  for (const doc of snap.docs) {
    const authRecord = authMap.get(doc.id);
    if (!authRecord) continue; // not a real user

    const d = doc.data();

    // Skip explicit opt-outs even in permissive mode
    if (d.unsubscribed === true) continue;
    if (!includeMissingConsent && d.emailConsent !== true) continue;

    // Skip internal/test accounts
    const emailLower = authRecord.email.toLowerCase();
    if (emailLower.includes("@johnbrophy.net") || emailLower.includes("@stensul.com")) continue;

    users.push({
      uid: doc.id,
      email: authRecord.email,
      creationTime: authRecord.creationTime,
      completedTests: Array.isArray(d.completedTests) ? d.completedTests : [],
      emailsSent: Array.isArray(d.emailsSent) ? d.emailsSent : [],
      subscription: d.subscription || {},
      lastEmailSent: d.lastEmailSent?.toDate?.() ?? null,
      lastUpdated: d.lastUpdated?.toDate?.() ?? null,
      paywallHits: d.paywallHits && typeof d.paywallHits === "object" ? d.paywallHits : {},
    });
  }

  return users;
}

// ── Email sender ──────────────────────────────────────────────────────────────

export async function sendCronEmail(
  uid: string,
  email: string,
  subject: string,
  html: string,
  emailKey: string
): Promise<void> {
  const db = getAdminDb();

  await resend.emails.send({
    from: "TigerTest <noreply@tigertest.io>",
    to: email,
    subject,
    html,
  });

  await db
    .collection("users")
    .doc(uid)
    .set(
      {
        lastEmailSent: FieldValue.serverTimestamp(),
        emailsSent: FieldValue.arrayUnion(emailKey),
      },
      { merge: true }
    );
}

// ── Cron auth ─────────────────────────────────────────────────────────────────

export function verifyCronSecret(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // dev mode — no secret set
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

// ── Template helper ───────────────────────────────────────────────────────────

export function buildHtml(template: string, uid: string, extras: Record<string, string> = {}): string {
  const token = Buffer.from(uid).toString("base64");
  let html = template.replace(/\{\{unsubscribeToken\}\}/g, token);
  for (const [key, val] of Object.entries(extras)) {
    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val);
  }
  return html;
}
