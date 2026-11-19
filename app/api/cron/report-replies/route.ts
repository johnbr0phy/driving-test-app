/**
 * Cron: replies to "Report this question". Schedule: daily 14:20 UTC
 * (vercel.json), after the morning question audit has judged the day's reports.
 *
 * The audit closes each report itself (lib/server/reportClose.ts) and records
 * the reply: "fixed" (the question was changed) or "right" (checked against
 * the sources, the answer stands). This sends it, once per report, to the
 * account email or the email a guest left (emailReporter in
 * lib/server/reportReply.ts, in the language they reported in). Reports closed
 * with no reply, or with no email, get nothing. Transactional: they asked us,
 * so it is not a campaign and does not count in CAMPAIGN_CRON_COUNT.
 * `?dry=1` lists what it would send.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyCronSecret } from "@/lib/cron-email";
import { emailReporter } from "@/lib/server/reportReply";

export const maxDuration = 120;

/** Replies are sent for reports closed this recently; older ones are left alone. */
const WINDOW_DAYS = 14;
const MAX_SENDS = 200;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const db = getAdminDb();
  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString();
  const snap = await db.collection("questionReports").where("closedAt", ">=", since).get();
  const due = snap.docs.filter((d) => {
    const r = d.data();
    return (r.replyOutcome === "fixed" || r.replyOutcome === "right") && r.email && !r.emailedAt && !r.replySkipped;
  });
  if (dry) {
    return NextResponse.json({ dry: true, due: due.length, sample: due.slice(0, 20).map((d) => ({ id: d.id, examId: d.data().examId, questionId: d.data().questionId, outcome: d.data().replyOutcome })) });
  }

  const counts: Record<string, number> = {};
  for (const d of due.slice(0, MAX_SENDS)) {
    const res = await emailReporter(d, d.data().replyOutcome);
    counts[res] = (counts[res] ?? 0) + 1;
    // The question is gone from every bank: nothing to quote, so no reply.
    if (res === "no_question") await d.ref.update({ replySkipped: "no_question" });
  }
  console.log(`[report-replies] ${due.length} due`, counts);
  return NextResponse.json({ due: due.length, ...counts });
}
