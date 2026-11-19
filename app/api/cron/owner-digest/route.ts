/**
 * Cron: owner digest. Schedule: Mondays 12:10 UTC (vercel.json), after the
 * weekly question audit and that morning's source triage and watchdog.
 *
 * One email to John listing only what needs a person (buildOwnerDigest in
 * lib/ownerWatch.ts): jobs that stopped and open pull requests (new tests).
 * Question quality is never in it: the audit, source triage and exam upkeep
 * settle all of it, and the footer only counts what they did. A week with
 * nothing still sends one line, so silence always means the digest itself
 * broke. `?dry=1` returns the digest without sending.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { CAMPAIGN_REPLY_TO, verifyCronSecret } from "@/lib/cron-email";
import { buildOwnerDigest } from "@/lib/ownerWatch";
import { readHandledWeek, readOpenPrs, readWatchdogState } from "@/lib/server/ownerWatch";
import { sendEmail } from "@/lib/resend";
import { SITE_URL } from "@/lib/siteUrl";

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const db = getAdminDb();
  const [handled, prs, watchdog] = await Promise.all([readHandledWeek(db), readOpenPrs(), readWatchdogState(db)]);

  const digest = buildOwnerDigest({ siteUrl: SITE_URL, prs, jobs: watchdog.problems ?? [], handled });
  if (dry) return NextResponse.json({ dry: true, subject: digest.subject, count: digest.count, sections: digest.sections, footer: digest.footer });

  const result = await sendEmail({
    kind: "transactional",
    to: CAMPAIGN_REPLY_TO,
    subject: digest.subject,
    html: digest.html,
    idempotencyKey: `owner-digest-${new Date().toISOString().slice(0, 10)}`,
  });
  if (!result.ok) console.error("[owner-digest] not sent:", result.error);
  console.log(`[owner-digest] ${digest.count} items, sent=${result.ok}`);
  return NextResponse.json({ sent: result.ok, count: digest.count, subject: digest.subject }, { status: result.ok ? 200 : 500 });
}
