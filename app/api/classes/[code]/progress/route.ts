import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { isClassCode, isMemberId, normalizeClassCode, type ClassAnswerEvent, type ClassTestEvent } from "@/lib/classes";

// A student's practice, batched by lib/classProgress.ts: answers (question,
// category, right or wrong, the option a wrong answer picked) and finished
// practice tests. Only a browser that holds the memberId can write to that
// student, and the member must exist.

const MAX_ANSWERS = 200;
const MAX_TESTS = 5;

function validAnswer(a: unknown): a is ClassAnswerEvent {
  const x = a as ClassAnswerEvent;
  return (
    !!x &&
    typeof x.ok === "boolean" &&
    /^[A-Za-z0-9_-]{1,64}$/.test(String(x.q)) &&
    /^[A-Za-z0-9_]{1,40}$/.test(String(x.c)) &&
    (x.p === undefined || (Number.isInteger(x.p) && x.p >= 0 && x.p <= 5))
  );
}

function validTest(t: unknown): t is ClassTestEvent {
  const x = t as ClassTestEvent;
  return (
    !!x &&
    Number.isInteger(x.testNumber) && x.testNumber >= 1 && x.testNumber <= 20 &&
    Number.isInteger(x.total) && x.total >= 1 && x.total <= 500 &&
    Number.isInteger(x.correct) && x.correct >= 0 && x.correct <= x.total
  );
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeClassCode((await params).code);
  const body = await request.json().catch(() => ({}));
  if (!isClassCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const answers: ClassAnswerEvent[] = Array.isArray(body.answers) ? body.answers.filter(validAnswer).slice(0, MAX_ANSWERS) : [];
  const tests: ClassTestEvent[] = Array.isArray(body.tests) ? body.tests.filter(validTest).slice(0, MAX_TESTS) : [];
  if (!answers.length && !tests.length) return NextResponse.json({ ok: true });

  const db = getAdminDb();
  const ref = db.collection("classes").doc(code).collection("members").doc(body.memberId);
  const found = await db.runTransaction(async (tx) => {
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
        seen[a.q] = (seen[a.q] ?? 0) + 1;
        counts[a.c] = counts[a.c] ?? { a: 0, c: 0 };
        counts[a.c].a++;
        if (a.ok) counts[a.c].c++;
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
  if (!found) return NextResponse.json({ error: "Not in this class" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
