import {
  STUDENT_MIN_ANSWERS,
  STUDENT_TOPIC_MIN_ANSWERS,
  classExamInfo,
  type ClassReport,
  type ClassStudentDetail,
  type ClassStudentRow,
} from "@/lib/classes";
import { classQuestionLookup } from "@/lib/server/classQuestions";

// The teacher's view of a class, from the class doc and its member docs:
// totals, topics weakest first, the most-missed questions (with the right
// answer, read from the bank, and which wrong options were picked) and one row per student, each with what that
// student needs help with. Pure apart from the
// bank lookup, so it can be checked against stored data directly.

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Pick counts as an array in option order, `length` long. */
function pickArray(byOption: Record<string, number> | undefined, length: number): number[] {
  const out = Array.from({ length }, () => 0);
  for (const [i, n] of Object.entries(byOption ?? {})) if (Number(i) < length) out[Number(i)] += n;
  return out;
}

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
  /** Wrong picks per question, keyed by the option's bank index. */
  picks?: Record<string, Record<string, number>>;
  tests?: Record<string, { best: number; attempts: number; last?: number }>;
}

function studentDetail(
  m: MemberDoc,
  label: (k: string) => string,
  classTopics: Record<string, { a: number; c: number }>,
  passPct: number,
  optionCount: (questionId: string) => number,
): ClassStudentDetail {
  const share = (c: number, a: number) => (a ? c / a : 0);
  const topics = Object.entries(m.byCategory ?? {})
    .map(([key, v]) => {
      const answered = v.a ?? 0;
      const correct = v.c ?? 0;
      // The rest of the class, so a student is never compared with themselves.
      const cls = classTopics[key];
      const othersA = (cls?.a ?? 0) - answered;
      const othersC = (cls?.c ?? 0) - correct;
      return {
        key,
        label: label(key),
        answered,
        correct,
        othersPct: othersA > 0 ? Math.round((othersC / othersA) * 100) : null,
        judged: answered >= STUDENT_TOPIC_MIN_ANSWERS,
      };
    })
    .filter((t) => t.answered > 0)
    // Judged topics first, weakest first; the rest by how much they've seen.
    .sort((a, b) => Number(b.judged) - Number(a.judged) || (a.judged ? share(a.correct, a.answered) - share(b.correct, b.answered) : b.answered - a.answered));
  const focus =
    (m.answered ?? 0) >= STUDENT_MIN_ANSWERS
      ? topics.filter((t) => t.judged && (t.correct / t.answered) * 100 < passPct).slice(0, 3).map((t) => t.key)
      : [];
  const missed = Object.entries(m.missed ?? {})
    .filter(([, n]) => n > 0)
    .map(([questionId, n]) => ({
      questionId,
      missed: n,
      answered: Math.max(m.seen?.[questionId] ?? 0, n),
      picks: pickArray(m.picks?.[questionId], optionCount(questionId)),
    }))
    .sort((a, b) => b.missed - a.missed || b.answered - a.answered);
  const tests = Object.entries(m.tests ?? {})
    .map(([n, t]) => ({ testNumber: Number(n), best: t.best, last: t.last ?? null, attempts: t.attempts ?? 0 }))
    .sort((a, b) => a.testNumber - b.testNumber);
  return { topics, focus, missed, tests };
}

export function buildClassReport(
  code: string,
  c: FirebaseFirestore.DocumentData,
  members: MemberDoc[],
  now = Date.now(),
): ClassReport {
  const exam = classExamInfo(c.examId, c.state);
  const passPct = exam?.passPct ?? 70;
  const label = (k: string) => exam?.topicLabel(k) ?? k;
  const weekAgo = now - WEEK_MS;
  const lookup = classQuestionLookup(c.examId);
  const optionCount = (id: string) => lookup(id)?.options.length ?? 0;

  const topicTotals: Record<string, { a: number; c: number }> = {};
  const missTotals: Record<string, number> = {};
  const seenTotals: Record<string, number> = {};
  const pickTotals: Record<string, Record<string, number>> = {};
  for (const m of members) {
    for (const [cat, v] of Object.entries(m.byCategory ?? {})) {
      topicTotals[cat] = topicTotals[cat] ?? { a: 0, c: 0 };
      topicTotals[cat].a += v.a ?? 0;
      topicTotals[cat].c += v.c ?? 0;
    }
  }
  const students: ClassStudentRow[] = members.map((m) => {
    for (const [q, n] of Object.entries(m.missed ?? {})) missTotals[q] = (missTotals[q] ?? 0) + n;
    for (const [q, n] of Object.entries(m.seen ?? {})) seenTotals[q] = (seenTotals[q] ?? 0) + n;
    for (const [q, byOption] of Object.entries(m.picks ?? {})) {
      pickTotals[q] = pickTotals[q] ?? {};
      for (const [i, n] of Object.entries(byOption)) pickTotals[q][i] = (pickTotals[q][i] ?? 0) + n;
    }
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
      detail: studentDetail(m, label, topicTotals, passPct, optionCount),
    };
  });

  const questions = [...new Set([...Object.keys(seenTotals), ...Object.keys(missTotals)])]
    .flatMap((questionId) => {
      const q = lookup(questionId);
      if (!q) return [];
      const missed = missTotals[questionId] ?? 0;
      return [{
        questionId,
        question: q.question,
        options: q.options,
        answer: q.answer,
        topic: label(q.category),
        explanation: q.explanation,
        // A member recorded before per-question counts only has misses.
        answered: Math.max(seenTotals[questionId] ?? 0, missed),
        missed,
        picks: pickArray(pickTotals[questionId], q.options.length),
      }];
    })
    .sort((a, b) => b.missed - a.missed || a.answered - b.answered);

  return {
    code,
    name: c.name,
    examId: c.examId,
    examName: exam?.name ?? c.examId,
    ...(c.state ? { state: c.state } : {}),
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
      .map(([key, v]) => ({ key, label: label(key), answered: v.a, correct: v.c }))
      .sort((a, b) => a.correct / a.answered - b.correct / b.answered),
    questions,
    students: students.sort((a, b) => (b.lastActive ?? "").localeCompare(a.lastActive ?? "") || a.name.localeCompare(b.name)),
  };
}
