import { getExamById } from "@/lib/exams";
import { getExamQuestions } from "@/lib/examData";
import "@/lib/banks/all";
import { classExamName, type ClassReport, type ClassStudentRow } from "@/lib/classes";

// The teacher's view of a class, from the class doc and its member docs:
// totals, topics weakest first, the most-missed questions (with the right
// answer, read from the bank) and one row per student. Pure apart from the
// bank lookup, so it can be checked against stored data directly.

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export interface MemberDoc {
  name: string;
  joinedAt: string;
  lastActive?: string;
  answered?: number;
  correct?: number;
  byCategory?: Record<string, { a?: number; c?: number }>;
  missed?: Record<string, number>;
  /** Answers per question; older members only have `missed`. */
  seen?: Record<string, number>;
  tests?: Record<string, { best: number; attempts: number }>;
}

export function buildClassReport(
  code: string,
  c: FirebaseFirestore.DocumentData,
  members: MemberDoc[],
  now = Date.now(),
): ClassReport {
  const exam = getExamById(c.examId);
  const passPct = exam?.passPct ?? 70;
  const weekAgo = now - WEEK_MS;

  const topicTotals: Record<string, { a: number; c: number }> = {};
  const missTotals: Record<string, number> = {};
  const seenTotals: Record<string, number> = {};
  const students: ClassStudentRow[] = members.map((m) => {
    for (const [cat, v] of Object.entries(m.byCategory ?? {})) {
      topicTotals[cat] = topicTotals[cat] ?? { a: 0, c: 0 };
      topicTotals[cat].a += v.a ?? 0;
      topicTotals[cat].c += v.c ?? 0;
    }
    for (const [q, n] of Object.entries(m.missed ?? {})) missTotals[q] = (missTotals[q] ?? 0) + n;
    for (const [q, n] of Object.entries(m.seen ?? {})) seenTotals[q] = (seenTotals[q] ?? 0) + n;
    const tests = Object.entries(m.tests ?? {});
    const best = tests.reduce<{ testNumber: number; pct: number } | null>(
      (top, [n, t]) => (!top || t.best > top.pct ? { testNumber: Number(n), pct: t.best } : top),
      null,
    );
    return {
      name: m.name,
      joinedAt: m.joinedAt,
      lastActive: (m.answered ?? 0) > 0 || tests.length ? m.lastActive ?? null : null,
      answered: m.answered ?? 0,
      correct: m.correct ?? 0,
      testsTaken: tests.reduce((s, [, t]) => s + (t.attempts ?? 0), 0),
      bestTest: best,
    };
  });

  const bank = exam ? safeBank(exam.id) : [];
  const byId = new Map(bank.map((q) => [q.questionId, q]));
  const questions = [...new Set([...Object.keys(seenTotals), ...Object.keys(missTotals)])]
    .flatMap((questionId) => {
      const q = byId.get(questionId);
      if (!q) return [];
      const missed = missTotals[questionId] ?? 0;
      const options = [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean);
      return [{
        questionId,
        question: q.question,
        options,
        answer: q[`option${q.correctAnswer}` as "optionA"] ?? "",
        topic: exam?.categoryLabels[q.category] ?? q.category,
        explanation: q.explanation ?? "",
        // A member recorded before per-question counts only has misses.
        answered: Math.max(seenTotals[questionId] ?? 0, missed),
        missed,
      }];
    })
    .sort((a, b) => b.missed - a.missed || a.answered - b.answered);

  return {
    code,
    name: c.name,
    examId: c.examId,
    examName: classExamName(exam),
    teacherName: c.teacherName,
    school: c.school ?? "",
    createdAt: c.createdAt,
    memberCount: members.length,
    passPct,
    answered: students.reduce((s, x) => s + x.answered, 0),
    correct: students.reduce((s, x) => s + x.correct, 0),
    activeThisWeek: students.filter((s) => s.lastActive && Date.parse(s.lastActive) >= weekAgo).length,
    passedATest: students.filter((s) => s.bestTest && s.bestTest.pct >= passPct).length,
    topics: Object.entries(topicTotals)
      .map(([key, v]) => ({ key, label: exam?.categoryLabels[key] ?? key, answered: v.a, correct: v.c }))
      .sort((a, b) => a.correct / a.answered - b.correct / b.answered),
    questions,
    students: students.sort((a, b) => (b.lastActive ?? "").localeCompare(a.lastActive ?? "") || a.name.localeCompare(b.name)),
  };
}

function safeBank(examId: string) {
  try {
    return getExamQuestions(examId as Parameters<typeof getExamQuestions>[0]);
  } catch {
    return [];
  }
}
