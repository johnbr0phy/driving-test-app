import type { Firestore } from "firebase-admin/firestore";

// Closes the open "Report this question" reports on one question and records
// the reply the student should get. Nobody reviews reports by hand: the
// question audit (scripts/question-audit.ts) judges each one, and this is how
// its decision reaches the report. The email itself goes out from
// /api/cron/report-replies (Vercel has the Resend key; the audit runs in
// GitHub Actions), once per report through emailReporter().
//
// - fixed: the question was changed. Reply "you were right, we fixed it".
// - right: the audit checked the question against its sources and the key
//   stands. Reply with the answer and its explanation.
// - null: closed without a reply (the question left the bank, or the audit
//   could not settle a doubt and kept the question as it is).

export type ReplyOutcome = "fixed" | "right";

export async function closeQuestionReports(
  db: Firestore,
  questionId: string,
  status: "fixed" | "dismissed",
  reply: ReplyOutcome | null,
  reason: string,
): Promise<number> {
  const snap = await db.collection("questionReports").where("questionId", "==", questionId).get();
  const open = snap.docs.filter((d) => d.data().status === "open");
  if (!open.length) return 0;
  const closedAt = new Date().toISOString();
  const batch = db.batch();
  for (const d of open) {
    batch.update(d.ref, { status, closedAt, closedReason: reason.slice(0, 300), ...(reply ? { replyOutcome: reply } : {}) });
  }
  await batch.commit();
  return open.length;
}
