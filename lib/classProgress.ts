import type { Question } from "@/types";
import type { ClassAnswerEvent, ClassHistoryAnswer, ClassPublicInfo, ClassTestEvent } from "@/lib/classes";

// The student side of instructor classes (lib/classes.ts). The classes this
// browser joined live in localStorage; practice on a class's exam is queued
// and sent to /api/classes/[code]/progress every few seconds and when the
// page is hidden. No account needed: the browser's memberId is the student.

export interface ClassMembership {
  code: string;
  examId: string;
  /** A quiz membership (lib/quizProgress.ts) reports to /api/quizzes instead of /api/classes. */
  kind?: "quiz";
  memberId: string;
  name: string;
  className: string;
  teacherName: string;
}

const STORAGE_KEY = "tigertest-classes";
const FLUSH_MS = 5000;

export function getMemberships(): ClassMembership[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveMemberships(list: ClassMembership[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage blocked: the student stays joined for this page only.
  }
}

export function getMembership(code: string): ClassMembership | undefined {
  return getMemberships().find((m) => m.code === code);
}

/** Add or replace one membership (a class's or a quiz's). */
export function saveMembership(membership: ClassMembership) {
  saveMemberships([...getMemberships().filter((m) => m.code !== membership.code), membership]);
}

/** This browser's class memberships as "CODE:memberId,..." for CLASS_PROOF_HEADER, so a class-only quiz opens for its students. */
export function classProofHeader(): string {
  return getMemberships()
    .filter((m) => m.kind !== "quiz")
    .map((m) => `${m.code}:${m.memberId}`)
    .join(",");
}

function progressUrl(m: Pick<ClassMembership, "code" | "kind">): string {
  return m.kind === "quiz" ? `/api/quizzes/${m.code}/progress` : `/api/classes/${m.code}/progress`;
}

export function membershipsForExam(examId: string): ClassMembership[] {
  return getMemberships().filter((m) => m.examId === examId);
}

/** Join (or rename in) a class from this browser. Throws with a readable message. */
export async function joinClass(info: ClassPublicInfo, name: string): Promise<ClassMembership> {
  const existing = getMembership(info.code);
  const memberId = existing?.memberId ?? crypto.randomUUID();
  const res = await fetch(`/api/classes/${info.code}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memberId, name }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Couldn't join. Try again.");
  const membership: ClassMembership = {
    code: info.code,
    examId: info.examId,
    memberId,
    name: name.trim(),
    className: info.name,
    teacherName: info.teacherName,
  };
  saveMembership(membership);
  return membership;
}

/**
 * Join the class a class-only quiz is shared with, from the quiz's join card
 * (/api/quizzes/[code]/class-join checks the code is that class's). Throws
 * with a readable message.
 */
export async function joinQuizClass(quizCode: string, classCode: string, name: string): Promise<ClassMembership> {
  const code = classCode.trim().toUpperCase();
  const existing = getMembership(code);
  const memberId = existing?.memberId ?? crypto.randomUUID();
  const res = await fetch(`/api/quizzes/${quizCode}/class-join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ classCode: code, memberId, name }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Couldn't join. Try again.");
  const info = data as ClassPublicInfo;
  const membership: ClassMembership = {
    code: info.code,
    examId: info.examId,
    memberId,
    name: name.trim(),
    className: info.name,
    teacherName: info.teacherName,
  };
  saveMembership(membership);
  return membership;
}

/** This browser's membership of a class (not a quiz). */
export function classMembership(code: string): ClassMembership | undefined {
  const m = getMembership(code);
  return m && m.kind !== "quiz" ? m : undefined;
}

export function leaveClass(code: string) {
  saveMemberships(getMemberships().filter((m) => m.code !== code));
}

// ─── Reporting ──────────────────────────────────────────────────────────────

const queues = new Map<string, { memberId: string; url: string; answers: ClassAnswerEvent[]; tests: ClassTestEvent[] }>();
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function enqueue(examId: string, add: (q: { answers: ClassAnswerEvent[]; tests: ClassTestEvent[] }) => void) {
  if (typeof window === "undefined") return;
  const classes = membershipsForExam(examId);
  if (!classes.length) return;
  for (const m of classes) {
    const q = queues.get(m.code) ?? { memberId: m.memberId, url: progressUrl(m), answers: [], tests: [] };
    add(q);
    queues.set(m.code, q);
  }
  if (!listening) {
    listening = true;
    window.addEventListener("pagehide", flushClassProgress);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushClassProgress();
    });
  }
  if (!timer) timer = setTimeout(flushClassProgress, FLUSH_MS);
}

const LETTERS = "ABCD";

/**
 * One answered question on an exam; reported to every class for that exam.
 * `picked` is the letter as shown; a wrong pick is reported as its option's
 * position in the bank (questions from before optionOrder existed send none).
 */
export function recordClassAnswer(
  examId: string,
  question: Pick<Question, "questionId" | "category" | "optionOrder">,
  correct: boolean,
  picked?: string,
) {
  const bankLetter = picked && question.optionOrder ? question.optionOrder[LETTERS.indexOf(picked)] : undefined;
  const pick = bankLetter ? LETTERS.indexOf(bankLetter) : -1;
  recordClassAnswerById(examId, question.questionId, question.category ?? "other", correct, pick >= 0 ? pick : undefined);
}

/** A v2 answer's pick, for single-choice items only (answers are bank indices). */
export function v2Pick(format: string | undefined, answer: unknown): number | undefined {
  return format === "single" && Array.isArray(answer) && typeof answer[0] === "number" ? answer[0] : undefined;
}

/** Same, for banks whose questions are not v1 Questions (v2: id and domain). */
export function recordClassAnswerById(examId: string, questionId: string, category: string, correct: boolean, pick?: number) {
  enqueue(examId, (q) =>
    q.answers.push({ q: questionId, c: category || "other", ok: correct, ...(!correct && pick !== undefined ? { p: pick } : {}) }),
  );
}

/** A finished practice test. */
export function recordClassTest(examId: string, testNumber: number, correct: number, total: number) {
  enqueue(examId, (q) => q.tests.push({ testNumber, correct, total }));
  flushClassProgress();
}

export function flushClassProgress() {
  if (timer) clearTimeout(timer);
  timer = null;
  for (const [code, q] of queues) {
    queues.delete(code);
    if (!q.answers.length && !q.tests.length) continue;
    void fetch(q.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: q.memberId, answers: q.answers.slice(0, 200), tests: q.tests }),
      keepalive: true,
    }).catch(() => {});
  }
}

// ─── One-time miss recovery ─────────────────────────────────────────────────

const RECOVERED_KEY = "tigertest-classes-recovered";

/**
 * Send this browser's answer history for an exam once per class, so the
 * class page gets back the per-question misses that were wiped before the
 * Oct 19 2026 fix. The server keeps whichever count is higher, so a repeat
 * never double counts.
 */
export function recoverClassMisses(examId: string, history: ClassHistoryAnswer[]) {
  if (typeof window === "undefined" || !history.length) return;
  let done: string[] = [];
  try {
    done = JSON.parse(localStorage.getItem(RECOVERED_KEY) ?? "[]");
    if (!Array.isArray(done)) done = [];
  } catch {
    done = [];
  }
  for (const m of membershipsForExam(examId)) {
    if (done.includes(m.code)) continue;
    void fetch(`/api/classes/${m.code}/recover`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: m.memberId, answers: history.slice(-3000) }),
    })
      .then((res) => {
        if (!res.ok) return;
        done.push(m.code);
        try {
          localStorage.setItem(RECOVERED_KEY, JSON.stringify(done));
        } catch {
          // Storage blocked: it runs again next visit, which is harmless.
        }
      })
      .catch(() => {});
  }
}
