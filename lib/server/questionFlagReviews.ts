import { FieldValue, type Firestore } from "firebase-admin/firestore";
import type { FlagReview } from "@/lib/questionQuality";

// questionFlagReviews/{examId}: what the audit (scripts/question-audit.ts)
// decided about each question a statistical flag or a student report sent it.
// Read by the nightly flags cron, the /admin Questions tab and the daily brief
// so a flag the audit already cleared stops asking for attention.

export type FlagReviews = Record<string, Record<string, FlagReview>>;

export async function loadFlagReviews(db: Firestore): Promise<FlagReviews> {
  const snap = await db.collection("questionFlagReviews").get();
  const out: FlagReviews = {};
  for (const d of snap.docs) out[d.id] = d.data() as Record<string, FlagReview>;
  return out;
}

/** A person (or a reviewed PR) decided the question is fine: the flag is cleared like an "ok" from the audit. */
export async function clearQuestionReview(db: Firestore, examId: string, questionId: string, reason: string, n?: number): Promise<void> {
  const ref = db.collection("questionFlagReviews").doc(examId);
  const prev = (await ref.get()).data()?.[questionId] as FlagReview | undefined;
  const review: FlagReview = { at: new Date().toISOString(), verdict: "ok", confidence: "human", reason, n: n ?? prev?.n ?? 0 };
  await ref.set({ [questionId]: review }, { merge: true });
}

/**
 * A question was fixed: its pick counts describe the old key or wording, so
 * they are dropped (otherwise a corrected key stays flagged forever), with
 * its review. Counting starts again from the next answer.
 */
export async function resetQuestionSignals(db: Firestore, examId: string, questionId: string): Promise<void> {
  const gone = { [questionId]: FieldValue.delete() };
  await Promise.all([
    db.collection("questionPicks").doc(examId).set(gone, { merge: true }),
    db.collection("questionFlagReviews").doc(examId).set(gone, { merge: true }),
  ]);
}
