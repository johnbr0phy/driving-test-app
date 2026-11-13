/**
 * Cron: watchdog. Schedule: daily at 11:30 UTC (vercel.json), after every
 * nightly job and the morning workflows have had their turn.
 *
 * Each scheduled job leaves a timestamp behind (lib/server/ownerWatch.ts). When
 * one is older than it should be, the job stopped or keeps failing: John gets
 * one email naming it, and again only if it is still broken three days later
 * or something else breaks (shouldAlert in lib/ownerWatch.ts). The current
 * problems are kept in analytics/watchdog for the weekly owner digest.
 * `?dry=1` checks and reports without emailing or saving.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { CAMPAIGN_REPLY_TO, verifyCronSecret } from "@/lib/cron-email";
import { shouldAlert, staleJobs } from "@/lib/ownerWatch";
import { readJobHeartbeats, readWatchdogState, WATCHDOG_DOC } from "@/lib/server/ownerWatch";
import { sendEmail } from "@/lib/resend";

export const maxDuration = 60;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const db = getAdminDb();
  const [jobs, state] = await Promise.all([readJobHeartbeats(db), readWatchdogState(db)]);
  const problems = staleJobs(jobs);
  const alert = shouldAlert(problems, state);
  const now = new Date().toISOString();
  if (dry) return NextResponse.json({ dry: true, problems, wouldAlert: alert, jobs });

  let sent = false;
  if (alert) {
    const result = await sendEmail({
      kind: "transactional",
      to: CAMPAIGN_REPLY_TO,
      subject: `Tigertest watchdog: ${problems.length === 1 ? problems[0].title : `${problems.length} jobs stopped running`}`,
      html: `<p><strong>These scheduled jobs have missed a run.</strong></p><ul>${problems
        .map((p) => `<li><strong>${esc(p.title)}</strong>. ${esc(p.detail)}</li>`)
        .join("")}</ul><p>You will hear again only if this is still broken in three days or something else stops.</p>`,
      idempotencyKey: `watchdog-${now.slice(0, 10)}`,
    });
    sent = result.ok;
    if (!result.ok) console.error("[watchdog] alert not sent:", result.error);
  }

  await db.doc(WATCHDOG_DOC).set({
    checkedAt: now,
    problems,
    // Nothing broken forgets what was alerted, so the next break emails at once.
    alertedIds: problems.length === 0 ? [] : sent ? problems.map((p) => p.id) : state.alertedIds ?? [],
    alertedAt: problems.length === 0 ? null : sent ? now : state.alertedAt ?? null,
  });
  console.log(`[watchdog] ${problems.length} problems${sent ? ", emailed" : ""}`);
  return NextResponse.json({ problems, emailed: sent });
}
