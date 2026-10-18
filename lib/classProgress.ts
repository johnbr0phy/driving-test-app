import type { Question } from "@/types";
import type { ClassAnswerEvent, ClassPublicInfo, ClassTestEvent } from "@/lib/classes";

// The student side of instructor classes (lib/classes.ts). The classes this
// browser joined live in localStorage; practice on a class's exam is queued
// and sent to /api/classes/[code]/progress every few seconds and when the
// page is hidden. No account needed: the browser's memberId is the student.

export interface ClassMembership {
  code: string;
  examId: string;
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
  saveMemberships([...getMemberships().filter((m) => m.code !== info.code), membership]);
  return membership;
}

export function leaveClass(code: string) {
  saveMemberships(getMemberships().filter((m) => m.code !== code));
}

// ─── Reporting ──────────────────────────────────────────────────────────────

const queues = new Map<string, { memberId: string; answers: ClassAnswerEvent[]; tests: ClassTestEvent[] }>();
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function enqueue(examId: string, add: (q: { answers: ClassAnswerEvent[]; tests: ClassTestEvent[] }) => void) {
  if (typeof window === "undefined") return;
  const classes = membershipsForExam(examId);
  if (!classes.length) return;
  for (const m of classes) {
    const q = queues.get(m.code) ?? { memberId: m.memberId, answers: [], tests: [] };
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

/** One answered question on an exam; reported to every class for that exam. */
export function recordClassAnswer(examId: string, question: Pick<Question, "questionId" | "category">, correct: boolean) {
  recordClassAnswerById(examId, question.questionId, question.category ?? "other", correct);
}

/** Same, for banks whose questions are not v1 Questions (v2: id and domain). */
export function recordClassAnswerById(examId: string, questionId: string, category: string, correct: boolean) {
  enqueue(examId, (q) => q.answers.push({ q: questionId, c: category || "other", ok: correct }));
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
    void fetch(`/api/classes/${code}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId: q.memberId, answers: q.answers.slice(0, 200), tests: q.tests }),
      keepalive: true,
    }).catch(() => {});
  }
}
