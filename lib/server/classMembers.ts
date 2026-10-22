import { FieldValue, type DocumentReference, type Firestore } from "firebase-admin/firestore";
import type { ClassAnswerEvent, ClassTestEvent } from "@/lib/classes";

// A member's practice batch, applied to classes/{code}/members/{memberId} or
// quizzes/{code}/members/{memberId}: the two share one member shape so the
// class report (lib/server/classReport.ts) reads either. Only a browser that
// holds the memberId can write to that member, and the member must exist.

export const MAX_PROGRESS_ANSWERS = 200;
export const MAX_PROGRESS_TESTS = 5;

export function validMemberAnswer(a: unknown): a is ClassAnswerEvent {
  const x = a as ClassAnswerEvent;
  return (
    !!x &&
    typeof x.ok === "boolean" &&
    /^[A-Za-z0-9_-]{1,64}$/.test(String(x.q)) &&
    /^[A-Za-z0-9_ .&/'-]{1,40}$/.test(String(x.c)) &&
    (x.p === undefined || (Number.isInteger(x.p) && x.p >= 0 && x.p <= 5))
  );
}

export function validMemberTest(t: unknown): t is ClassTestEvent {
  const x = t as ClassTestEvent;
  return (
    !!x &&
    Number.isInteger(x.testNumber) && x.testNumber >= 1 && x.testNumber <= 20 &&
    Number.isInteger(x.total) && x.total >= 1 && x.total <= 500 &&
    Number.isInteger(x.correct) && x.correct >= 0 && x.correct <= x.total
  );
}

/** Pull a validated, capped batch out of a request body. */
export function memberBatch(body: { answers?: unknown; tests?: unknown }): { answers: ClassAnswerEvent[]; tests: ClassTestEvent[] } {
  const answers = Array.isArray(body.answers) ? body.answers.filter(validMemberAnswer).slice(0, MAX_PROGRESS_ANSWERS) : [];
  const tests = Array.isArray(body.tests) ? body.tests.filter(validMemberTest).slice(0, MAX_PROGRESS_TESTS) : [];
  return { answers, tests };
}

/**
 * Apply a batch to a member doc in a transaction. Resolves false when the
 * member does not exist. Category keys hold Firestore map keys, so a topic
 * with a dot is stored with "_" instead.
 */
export async function applyMemberProgress(
  db: Firestore,
  ref: DocumentReference,
  answers: ClassAnswerEvent[],
  tests: ClassTestEvent[],
): Promise<boolean> {
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return false;
    const now = new Date().toISOString();
    const update: Record<string, unknown> = { lastActive: now };

    if (answers.length) {
      const correct = answers.filter((a) => a.ok).length;
      const byCategory: Record<string, { a: FieldValue; c: FieldValue }> = {};
      const counts: Record<string, { a: number; c: number }> = {};
      const missed: Record<string, number> = {};
      const seen: Record<string, number> = {};
      // Wrong picks per question, by the option's index in the bank.
      const picks: Record<string, Record<string, number>> = {};
      for (const a of answers) {
        const cat = a.c.replace(/\./g, "_");
        seen[a.q] = (seen[a.q] ?? 0) + 1;
        counts[cat] = counts[cat] ?? { a: 0, c: 0 };
        counts[cat].a++;
        if (a.ok) counts[cat].c++;
        else {
          missed[a.q] = (missed[a.q] ?? 0) + 1;
          if (a.p !== undefined) {
            picks[a.q] = picks[a.q] ?? {};
            picks[a.q][a.p] = (picks[a.q][a.p] ?? 0) + 1;
          }
        }
      }
      for (const [cat, n] of Object.entries(counts)) {
        byCategory[cat] = { a: FieldValue.increment(n.a), c: FieldValue.increment(n.c) };
      }
      Object.assign(update, {
        answered: FieldValue.increment(answers.length),
        correct: FieldValue.increment(correct),
        byCategory,
        seen: Object.fromEntries(Object.entries(seen).map(([q, n]) => [q, FieldValue.increment(n)])),
      });
      // Only when non-empty: a merge write of an empty map replaces the stored
      // map, so an all-correct batch used to wipe every earlier miss.
      if (Object.keys(missed).length) {
        update.missed = Object.fromEntries(Object.entries(missed).map(([q, n]) => [q, FieldValue.increment(n)]));
      }
      if (Object.keys(picks).length) {
        update.picks = Object.fromEntries(
          Object.entries(picks).map(([q, byOption]) => [q, Object.fromEntries(Object.entries(byOption).map(([p, n]) => [p, FieldValue.increment(n)]))]),
        );
      }
    }

    if (tests.length) {
      const prev = (snap.data()?.tests ?? {}) as Record<string, { best: number; attempts: number; total: number }>;
      const next: Record<string, unknown> = {};
      for (const t of tests) {
        const key = String(t.testNumber);
        const p = prev[key];
        const pct = Math.round((t.correct / t.total) * 100);
        next[key] = { best: Math.max(p?.best ?? 0, pct), last: pct, attempts: (p?.attempts ?? 0) + 1, total: t.total, lastAt: now };
        prev[key] = next[key] as { best: number; attempts: number; total: number };
      }
      update.tests = next;
    }

    tx.set(ref, update, { merge: true });
    return true;
  });
}
