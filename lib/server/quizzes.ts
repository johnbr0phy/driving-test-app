import { randomInt } from "crypto";
import { FieldValue, type Firestore } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import {
  QUIZ_CODE_ALPHABET,
  QUIZ_CODE_LENGTH,
  QUIZ_DEFAULT_PASS_PCT,
  QUIZ_LIMITS,
  QUIZ_MIN_QUESTIONS,
  QUIZ_PUBLIC_MIN_PLAYS,
  clampPassPct,
  cleanOwnerName,
  cleanQuizDescription,
  cleanQuizTitle,
  isQuizVisibility,
  quizQuestionId,
  quizSummary,
  validateQuizQuestions,
  type QuizCreatedVia,
  type QuizDoc,
  type QuizQuestion,
  type QuizQuestionInput,
  type QuizSummary,
  type QuizVisibility,
} from "@/lib/quizzes";
import type { ClassQuestionDisplay } from "@/lib/server/classQuestions";
import type { ReportSubject } from "@/lib/server/classReport";

// Server side of quizzes (lib/quizzes.ts): create, read, update and delete
// quizzes/{code} with the admin SDK, enforce the per-plan limits, and build
// the lookup the creator's report needs. Shared by the /api/quizzes routes
// and the MCP tools (lib/server/mcp-tools.ts), so a quiz made from Claude
// and one made on /create go through exactly the same checks.

export class QuizError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message);
  }
}

export interface QuizOwner {
  uid: string;
  /** Display name for `ownerName`, when creating. */
  name?: string | null;
  isPremium: boolean;
}

export function quizLimits(isPremium: boolean) {
  return isPremium ? QUIZ_LIMITS.premium : QUIZ_LIMITS.free;
}

/** Whether users/{uid} carries the one TigerTest Premium flag. */
export async function isPremiumUid(uid: string, db: Firestore = getAdminDb()): Promise<boolean> {
  const snap = await db.collection("users").doc(uid).get();
  return snap.exists && snap.data()?.subscription?.isPremium === true;
}

function newCode(): string {
  let code = "";
  for (let i = 0; i < QUIZ_CODE_LENGTH; i++) code += QUIZ_CODE_ALPHABET[randomInt(QUIZ_CODE_ALPHABET.length)];
  return code;
}

function withIds(questions: QuizQuestionInput[], from: number): { questions: QuizQuestion[]; next: number } {
  let next = from;
  const out = questions.map((q) => ({ ...q, explanation: q.explanation ?? "", id: `q${next++}` }));
  return { questions: out, next };
}

/** `publicRank` only while public, so the library's orderBy sees public quizzes alone. */
function rankFields(visibility: QuizVisibility, plays: number): Record<string, unknown> {
  return visibility === "public" ? { publicRank: plays } : { publicRank: FieldValue.delete() };
}

export async function getQuiz(code: string, db: Firestore = getAdminDb()): Promise<QuizDoc | null> {
  const snap = await db.collection("quizzes").doc(code).get();
  return snap.exists ? (snap.data() as QuizDoc) : null;
}

export interface CreateQuizInput {
  title: unknown;
  description?: unknown;
  questions: unknown;
  visibility?: unknown;
  passPct?: unknown;
  createdVia: QuizCreatedVia;
}

export async function createQuiz(owner: QuizOwner, input: CreateQuizInput, db: Firestore = getAdminDb()): Promise<QuizDoc> {
  const limits = quizLimits(owner.isPremium);
  const title = cleanQuizTitle(input.title);
  if (!title) throw new QuizError("Give the quiz a title");
  const validated = validateQuizQuestions(input.questions, limits.questions);
  if (!validated.ok) throw new QuizError(validated.error);
  if (validated.questions.length < QUIZ_MIN_QUESTIONS) throw new QuizError(`A quiz needs at least ${QUIZ_MIN_QUESTIONS} questions`);
  const visibility: QuizVisibility = isQuizVisibility(input.visibility) ? input.visibility : "link";

  const mine = await db.collection("quizzes").where("ownerUid", "==", owner.uid).count().get();
  if (mine.data().count >= limits.quizzes) {
    throw new QuizError(
      owner.isPremium
        ? `You can have up to ${limits.quizzes} quizzes`
        : `Free accounts can keep ${limits.quizzes} quizzes. Delete one, or get Premium for up to ${QUIZ_LIMITS.premium.quizzes}.`,
      402,
    );
  }

  const { questions, next } = withIds(validated.questions, 1);
  const now = new Date().toISOString();
  // A code is 31^6 (887M) wide; retry the rare collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode();
    const doc: QuizDoc = {
      code,
      title,
      description: cleanQuizDescription(input.description),
      ownerUid: owner.uid,
      ownerName: cleanOwnerName(owner.name) || "A TigerTest member",
      visibility,
      passPct: input.passPct === undefined ? QUIZ_DEFAULT_PASS_PCT : clampPassPct(input.passPct),
      questions,
      createdVia: input.createdVia,
      createdAt: now,
      updatedAt: now,
      plays: 0,
      memberCount: 0,
      reports: 0,
      nextQuestionId: next,
    };
    try {
      await db.collection("quizzes").doc(code).create({ ...doc, ...rankFields(visibility, 0) });
      await bumpCounter(db, `created_${input.createdVia}`);
      return doc;
    } catch (error: unknown) {
      if ((error as { code?: number }).code !== 6) throw error; // 6 = ALREADY_EXISTS
    }
  }
  throw new QuizError("Couldn't make a quiz code. Try again.", 500);
}

export interface UpdateQuizInput {
  title?: unknown;
  description?: unknown;
  /** Replaces every question (ids are reassigned only for new ones: pass `id` to keep one). */
  questions?: unknown;
  /** Appends to the existing questions. */
  addQuestions?: unknown;
  visibility?: unknown;
  passPct?: unknown;
}

/** Update a quiz the caller owns. Returns the new doc. */
export async function updateQuiz(owner: QuizOwner, code: string, input: UpdateQuizInput, db: Firestore = getAdminDb()): Promise<QuizDoc> {
  const limits = quizLimits(owner.isPremium);
  const ref = db.collection("quizzes").doc(code);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || snap.data()?.ownerUid !== owner.uid) throw new QuizError("Not your quiz", 403);
    const current = snap.data() as QuizDoc;
    const update: Partial<QuizDoc> & Record<string, unknown> = { updatedAt: new Date().toISOString() };

    if (input.title !== undefined) {
      const title = cleanQuizTitle(input.title);
      if (!title) throw new QuizError("Give the quiz a title");
      update.title = title;
    }
    if (input.description !== undefined) update.description = cleanQuizDescription(input.description);
    if (input.passPct !== undefined) update.passPct = clampPassPct(input.passPct);

    let questions = current.questions;
    let next = current.nextQuestionId ?? current.questions.length + 1;
    if (input.questions !== undefined) {
      const validated = validateQuizQuestions(input.questions, limits.questions);
      if (!validated.ok) throw new QuizError(validated.error);
      if (validated.questions.length < QUIZ_MIN_QUESTIONS) throw new QuizError(`A quiz needs at least ${QUIZ_MIN_QUESTIONS} questions`);
      // Keep an existing question's id when the client sends it back, so progress on it survives an edit.
      const raw = input.questions as { id?: unknown }[];
      const known = new Set(current.questions.map((q) => q.id));
      questions = validated.questions.map((q, i) => {
        const id = typeof raw[i]?.id === "string" && known.has(raw[i].id as string) ? (raw[i].id as string) : `q${next++}`;
        return { ...q, explanation: q.explanation ?? "", id };
      });
      const ids = questions.map((q) => q.id);
      if (new Set(ids).size !== ids.length) throw new QuizError("Duplicate question ids");
    }
    if (input.addQuestions !== undefined) {
      const validated = validateQuizQuestions(input.addQuestions, limits.questions);
      if (!validated.ok) throw new QuizError(validated.error);
      if (questions.length + validated.questions.length > limits.questions) {
        throw new QuizError(`A quiz can have up to ${limits.questions} questions on your plan (this one has ${questions.length})`);
      }
      const added = withIds(validated.questions, next);
      questions = [...questions, ...added.questions];
      next = added.next;
    }
    if (questions !== current.questions) {
      update.questions = questions;
      update.nextQuestionId = next;
    }

    const visibility = isQuizVisibility(input.visibility) ? input.visibility : current.visibility;
    if (visibility !== current.visibility) update.visibility = visibility;
    Object.assign(update, rankFields(visibility, current.plays ?? 0));

    tx.update(ref, update);
    const rest = { ...update };
    delete rest.publicRank;
    return { ...current, ...(rest as Partial<QuizDoc>) };
  });
}

/** Delete a quiz the caller owns, members included. */
export async function deleteQuiz(owner: QuizOwner, code: string, db: Firestore = getAdminDb()): Promise<void> {
  const ref = db.collection("quizzes").doc(code);
  const snap = await ref.get();
  if (!snap.exists || (snap.data()?.ownerUid !== owner.uid)) throw new QuizError("Not your quiz", 403);
  const members = await ref.collection("members").listDocuments();
  for (let i = 0; i < members.length; i += 400) {
    const batch = db.batch();
    for (const m of members.slice(i, i + 400)) batch.delete(m);
    await batch.commit();
  }
  await ref.delete();
}

export async function listMyQuizzes(uid: string, db: Firestore = getAdminDb()): Promise<QuizSummary[]> {
  const snap = await db.collection("quizzes").where("ownerUid", "==", uid).get();
  return snap.docs
    .map((d) => quizSummary(d.data() as QuizDoc))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Public quizzes for the /quizzes library and the sitemap: featured first, then most played. */
export async function listPublicQuizzes(limit = 60, minPlays = QUIZ_PUBLIC_MIN_PLAYS, db: Firestore = getAdminDb()): Promise<QuizSummary[]> {
  const snap = await db.collection("quizzes").orderBy("publicRank", "desc").limit(limit).get();
  return snap.docs
    .map((d) => d.data() as QuizDoc)
    .filter((q) => q.visibility === "public" && (q.featured || (q.plays ?? 0) >= minPlays))
    .map(quizSummary)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.plays - a.plays);
}

/** A site admin features (or unfeatures) a public quiz so it lists before it has QUIZ_PUBLIC_MIN_PLAYS plays. */
export async function setQuizFeatured(code: string, featured: boolean, db: Firestore = getAdminDb()): Promise<void> {
  const ref = db.collection("quizzes").doc(code);
  const snap = await ref.get();
  if (!snap.exists) throw new QuizError("No such quiz", 404);
  await ref.update(featured ? { featured: true } : { featured: FieldValue.delete() });
}

/** A browser's first answer on a quiz. */
export async function recordQuizPlay(code: string, db: Firestore = getAdminDb()): Promise<void> {
  const ref = db.collection("quizzes").doc(code);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return;
    const data = snap.data() as QuizDoc;
    const plays = (data.plays ?? 0) + 1;
    tx.update(ref, { plays, ...(data.visibility === "public" ? { publicRank: plays } : {}) });
  });
  await bumpCounter(db, "plays");
}

/** Site-wide counters for /admin: analytics/quizzes. */
export async function bumpCounter(db: Firestore, key: string, by = 1): Promise<void> {
  await db
    .collection("analytics")
    .doc("quizzes")
    .set({ [key]: FieldValue.increment(by), updatedAt: new Date().toISOString() }, { merge: true })
    .catch(() => {});
}

// ─── The creator's report ───────────────────────────────────────────────────

export function quizQuestionLookup(quiz: QuizDoc): (questionId: string) => ClassQuestionDisplay | undefined {
  const byId = new Map<string, ClassQuestionDisplay>(
    quiz.questions.map((q) => [
      quizQuestionId(quiz.code, q.id),
      {
        question: q.question,
        options: q.options,
        answer: q.options[q.correctIndex] ?? "",
        category: q.topic ?? "general",
        explanation: q.explanation ?? "",
      },
    ]),
  );
  return (id) => byId.get(id);
}

export function quizReportSubject(quiz: QuizDoc): ReportSubject {
  return {
    name: quiz.title,
    passPct: quiz.passPct ?? QUIZ_DEFAULT_PASS_PCT,
    topicLabel: (k) => (k === "general" ? "General" : k.replace(/_/g, ".")),
    lookup: quizQuestionLookup(quiz),
  };
}

/** The class-doc shape buildClassReport expects, from a quiz. */
export function quizAsClassDoc(quiz: QuizDoc): FirebaseFirestore.DocumentData {
  return {
    code: quiz.code,
    name: quiz.title,
    examId: "quiz",
    teacherName: quiz.ownerName,
    school: "",
    createdAt: quiz.createdAt,
  };
}
