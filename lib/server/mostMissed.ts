import { getAdminDb } from "@/lib/firebase-admin";
import type { ExamCommunityStats } from "@/lib/communityStats";

/**
 * Common Mistakes for the public most-missed pages (lib/topicPages.ts), read
 * from the nightly globalStats/examWrongQuestions doc. Null without a
 * Firestore credential (a local build) or before the exam has the data.
 */
export async function examMostMissed(examId: string): Promise<(ExamCommunityStats & { updatedAt: string | null }) | null> {
  try {
    const snap = await getAdminDb().collection("globalStats").doc("examWrongQuestions").get();
    const data = snap.data();
    const stats = data?.exams?.[examId] as ExamCommunityStats | undefined;
    if (!stats || !Array.isArray(stats.questions) || !Array.isArray(data?.available) || !data.available.includes(examId)) return null;
    const updated = data.updatedAt;
    const updatedAt = typeof updated === "string" ? updated.slice(0, 10) : typeof updated?.toDate === "function" ? updated.toDate().toISOString().slice(0, 10) : null;
    return { ...stats, updatedAt };
  } catch {
    return null;
  }
}

/** Exam ids that have Common Mistakes, for the sitemap. */
export async function examsWithMostMissed(): Promise<string[]> {
  try {
    const snap = await getAdminDb().collection("globalStats").doc("examWrongQuestions").get();
    const available = snap.data()?.available;
    return Array.isArray(available) ? available.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
