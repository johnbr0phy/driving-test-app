import type { QuizPublic } from "@/lib/quizzes";
import { quizExamId } from "@/lib/quizzes";
import { getMembership, saveMembership, type ClassMembership } from "@/lib/classProgress";

// The player side of quizzes (lib/quizzes.ts): giving a name on a quiz page
// makes this browser a member of the quiz, stored with the class memberships
// so lib/classProgress.ts reports practice on examId "quiz:<code>" to
// /api/quizzes/<code>/progress the same way it reports a class.

/** Join (or rename in) a quiz from this browser. Throws with a readable message. */
export async function joinQuiz(quiz: Pick<QuizPublic, "code" | "title" | "ownerName">, name: string): Promise<ClassMembership> {
  const existing = getMembership(quiz.code);
  const memberId = existing?.memberId ?? crypto.randomUUID();
  const res = await fetch(`/api/quizzes/${quiz.code}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memberId, name }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Couldn't join. Try again.");
  const membership: ClassMembership = {
    code: quiz.code,
    examId: quizExamId(quiz.code),
    kind: "quiz",
    memberId,
    name: name.trim(),
    className: quiz.title,
    teacherName: quiz.ownerName,
  };
  saveMembership(membership);
  return membership;
}

export function quizMembership(code: string): ClassMembership | undefined {
  const m = getMembership(code);
  return m?.kind === "quiz" ? m : undefined;
}

// ─── Plays ──────────────────────────────────────────────────────────────────

const PLAYED_KEY = "tigertest-quizzes-played";

/** Count this browser once per quiz, on its first answer. */
export function recordQuizPlayOnce(code: string) {
  if (typeof window === "undefined") return;
  let played: string[] = [];
  try {
    played = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? "[]");
    if (!Array.isArray(played)) played = [];
  } catch {
    played = [];
  }
  if (played.includes(code)) return;
  played.push(code);
  try {
    localStorage.setItem(PLAYED_KEY, JSON.stringify(played.slice(-500)));
  } catch {
    // Storage blocked: the play may count again next visit, which is harmless.
  }
  void fetch(`/api/quizzes/${code}/play`, { method: "POST", keepalive: true }).catch(() => {});
}

/** "Report this question" from the play pages. */
export async function reportQuizQuestion(code: string, questionId: string, reason: string, note = ""): Promise<void> {
  await fetch(`/api/quizzes/${code}/report-question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, reason, note }),
  });
}
