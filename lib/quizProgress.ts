import type { QuizPublic } from "@/lib/quizzes";
import { quizExamId } from "@/lib/quizzes";
import { classMembership, getMembership, saveMembership, type ClassMembership } from "@/lib/classProgress";

// The player side of quizzes (lib/quizzes.ts): giving a name on a quiz page
// makes this browser a member of the quiz, stored with the class memberships
// so lib/classProgress.ts reports practice on examId "quiz:<code>" to
// /api/quizzes/<code>/progress the same way it reports a class.

/** Join (or rename in) a quiz from this browser. Throws with a readable message. */
export async function joinQuiz(quiz: Pick<QuizPublic, "code" | "title" | "ownerName" | "classCode">, name: string): Promise<ClassMembership> {
  const existing = getMembership(quiz.code);
  const memberId = existing?.memberId ?? crypto.randomUUID();
  // A class-only quiz takes only the class's students: prove this browser is one.
  const classMemberId = quiz.classCode ? classMembership(quiz.classCode)?.memberId : undefined;
  const res = await fetch(`/api/quizzes/${quiz.code}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memberId, name, ...(classMemberId ? { classMemberId } : {}) }),
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

/**
 * A class-only quiz opened by one of its class's students: join the quiz
 * under the name the class knows them by, so the teacher's quiz report lists
 * them without asking again. No-op otherwise. Resolves to the membership.
 */
export async function autoJoinClassQuiz(quiz: Pick<QuizPublic, "code" | "title" | "ownerName" | "classCode" | "visibility" | "mine">): Promise<ClassMembership | undefined> {
  if (quiz.visibility !== "class" || !quiz.classCode || quiz.mine) return undefined;
  const existing = quizMembership(quiz.code);
  if (existing) return existing;
  const student = classMembership(quiz.classCode);
  if (!student) return undefined;
  return joinQuiz(quiz, student.name).catch(() => undefined);
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
  const response = await fetch(`/api/quizzes/${code}/report-question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, reason, note }),
  });
  if (!response.ok) throw new Error("Could not send the report. Please try again.");
}
