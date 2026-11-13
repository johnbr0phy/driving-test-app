/**
 * Cron: owner digest. Schedule: Mondays 12:10 UTC (vercel.json), after the
 * weekly question audit and that morning's source triage and watchdog.
 *
 * One email to John listing only what needs a person (buildOwnerDigest in
 * lib/ownerWatch.ts): jobs that stopped, pull requests the automation did not
 * merge, source pages the triage could not settle, audit findings the fix run
 * left open, old student reports, exam changes due within 30 days and yearly
 * reviews due. A week with nothing still sends one line, so silence always
 * means the digest itself broke. `?dry=1` returns the digest without sending.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { CAMPAIGN_REPLY_TO, verifyCronSecret } from "@/lib/cron-email";
import { buildOwnerDigest } from "@/lib/ownerWatch";
import { readOpenPrs, readWatchdogState } from "@/lib/server/ownerWatch";
import { buildQuestionHealth } from "@/lib/server/questionHealth";
import { sendEmail } from "@/lib/resend";
import { SITE_URL } from "@/lib/siteUrl";

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const db = getAdminDb();
  const [health, prs, watchdog] = await Promise.all([buildQuestionHealth(), readOpenPrs(), readWatchdogState(db)]);

  const digest = buildOwnerDigest({
    siteUrl: SITE_URL,
    prs,
    jobs: watchdog.problems ?? [],
    sources: health.sources.map((s) => ({ url: s.url, exams: s.exams, reason: s.triage?.reason ?? (s.changed ? "changed, not triaged yet" : `failing to load: ${s.error ?? "unknown error"}`) })),
    findings: health.findings.map((f) => ({ examId: f.examId, questionId: f.questionId, verdict: f.verdict, createdAt: f.createdAt })),
    openFlags: health.totalFlags,
    reports: health.reports.map((r) => ({ createdAt: r.createdAt })),
    freshness: health.freshness,
    reviewDue: health.reviewDue,
    sourcesHandled: health.sourcesHandled,
  });
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
