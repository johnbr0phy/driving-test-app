import type { Firestore } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { isClassCode, isMemberId, normalizeClassCode } from "@/lib/classes";
import { CLASS_PROOF_HEADER, type QuizClassLocked, type QuizDoc } from "@/lib/quizzes";

// Who may open a quiz (lib/quizzes.ts, QuizVisibility). The owner and site
// admins always; "link" and "public" quizzes anyone; "private" nobody else;
// "class" quizzes a browser that joined the quiz's class. Students have no
// account, so a browser proves it is in a class the way it reports progress:
// with the class code and its secret memberId (lib/classProgress.ts), sent in
// the CLASS_PROOF_HEADER as "CODE:memberId,CODE:memberId". Only the pair for
// the quiz's own class is looked up.

export { CLASS_PROOF_HEADER };
const MAX_PROOFS = 30;

export type QuizAccess = "open" | "private" | "class";

/** The class memberships a request carries, by class code. */
export function classProofs(raw: string | null | undefined): Map<string, string> {
  const out = new Map<string, string>();
  for (const pair of (raw ?? "").split(",").slice(0, MAX_PROOFS)) {
    const [code, memberId] = pair.trim().split(":");
    const c = normalizeClassCode(code ?? "");
    if (isClassCode(c) && isMemberId(memberId)) out.set(c, memberId);
  }
  return out;
}

/** Whether classes/{code}/members/{memberId} exists. */
export async function isClassMember(classCode: string, memberId: string | undefined, db: Firestore = getAdminDb()): Promise<boolean> {
  if (!memberId || !isClassCode(classCode) || !isMemberId(memberId)) return false;
  const snap = await db.collection("classes").doc(classCode).collection("members").doc(memberId).get();
  return snap.exists;
}

/** "open" when this caller may see the quiz's questions; otherwise why not. */
export async function quizAccess(
  quiz: QuizDoc,
  caller: { uid: string; admin?: boolean } | null,
  proofs: Map<string, string>,
  db: Firestore = getAdminDb(),
): Promise<QuizAccess> {
  if (caller && (caller.uid === quiz.ownerUid || caller.admin)) return "open";
  if (quiz.visibility === "private") return "private";
  if (quiz.visibility === "class") {
    if (!quiz.classCode) return "class";
    return (await isClassMember(quiz.classCode, proofs.get(quiz.classCode), db)) ? "open" : "class";
  }
  return "open";
}

/** What a non-member is told: who the quiz is for, never its questions or the class code. */
export function quizClassLocked(quiz: QuizDoc): QuizClassLocked {
  const teacherName = quiz.classTeacherName || quiz.ownerName;
  return { classOnly: true, title: quiz.title, teacherName, error: `This quiz is for ${teacherName}'s class` };
}
