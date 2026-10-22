import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { applyMemberProgress } from '@/lib/server/classMembers';
import { getQuiz, listMyQuizzes, listPublicQuizzes, bumpCounter } from '@/lib/server/quizzes';
import { QUIZ_PUBLIC_MIN_PLAYS, isQuizCode, normalizeQuizCode, quizQuestionId, type QuizDoc, type QuizQuestion, type QuizSummary } from '@/lib/quizzes';

// Playing a quiz (lib/quizzes.ts) from an AI assistant through the MCP
// server's `quiz_me` / `answer` loop. The assistant keeps no state: this
// module keeps the mastery queue per account and quiz in
// mcpQuizPlay/{uid}_{code} (the same fresh-first, then wrong-queue rule the
// site's practice mode uses) and reports a named player's answers to the
// quiz's creator as a member `u_<uid>`, so the creator's report shows
// assistant play alongside browser play. Nothing here calls a model.

export interface PlayState {
  masteredIds: string[];
  wrongQueue: string[];
  lastQuestionId: string | null;
  answered: number;
  correct: number;
  startedAt: string;
  updatedAt: string;
}

const EMPTY: PlayState = { masteredIds: [], wrongQueue: [], lastQuestionId: null, answered: 0, correct: 0, startedAt: '', updatedAt: '' };
const LETTERS = ['A', 'B', 'C', 'D'] as const;

function playRef(db: Firestore, uid: string, code: string) {
  return db.collection('mcpQuizPlay').doc(`${uid}_${code}`);
}

export async function getPlayState(uid: string, code: string, db: Firestore = getAdminDb()): Promise<PlayState> {
  const snap = await playRef(db, uid, code).get();
  return snap.exists ? { ...EMPTY, ...(snap.data() as Partial<PlayState>) } : { ...EMPTY };
}

/** The quiz if the caller may play it: public or link quizzes for anyone, private ones for the owner. */
export async function loadPlayableQuiz(uid: string, rawCode: string): Promise<{ quiz: QuizDoc } | { error: 'QUIZ_NOT_FOUND' | 'QUIZ_PRIVATE' }> {
  const code = normalizeQuizCode(rawCode);
  if (!isQuizCode(code)) return { error: 'QUIZ_NOT_FOUND' };
  const quiz = await getQuiz(code);
  if (!quiz) return { error: 'QUIZ_NOT_FOUND' };
  if (quiz.visibility === 'private' && quiz.ownerUid !== uid) return { error: 'QUIZ_PRIVATE' };
  return { quiz };
}

/** Next question under the practice rule: unmastered, fresh before wrong-queue returns, never the one just asked when another exists. */
export function pickNext(quiz: QuizDoc, state: PlayState): QuizQuestion | null {
  let unmastered = quiz.questions.filter((q) => !state.masteredIds.includes(q.id));
  if (!unmastered.length) return null;
  if (state.lastQuestionId && unmastered.length > 1) unmastered = unmastered.filter((q) => q.id !== state.lastQuestionId);
  const fresh = unmastered.filter((q) => !state.wrongQueue.includes(q.id));
  if (fresh.length) return fresh[0];
  for (const id of state.wrongQueue) {
    const q = unmastered.find((x) => x.id === id);
    if (q) return q;
  }
  return unmastered[0];
}

/** What the assistant shows: the stem and four lettered options, never the answer. */
export function presentQuestion(q: QuizQuestion) {
  return {
    questionId: q.id,
    question: q.question,
    options: Object.fromEntries(q.options.map((o, i) => [LETTERS[i], o])) as Record<(typeof LETTERS)[number], string>,
    ...(q.topic ? { topic: q.topic } : {}),
  };
}

export function playProgress(quiz: QuizDoc, state: PlayState) {
  return {
    mastered: state.masteredIds.length,
    total: quiz.questions.length,
    wrongQueueSize: state.wrongQueue.length,
    answered: state.answered,
    correct: state.correct,
    complete: state.masteredIds.length >= quiz.questions.length,
  };
}

/** Serve the next question and remember it was asked. */
export async function nextQuizQuestion(uid: string, quiz: QuizDoc, db: Firestore = getAdminDb()) {
  const state = await getPlayState(uid, quiz.code, db);
  const q = pickNext(quiz, state);
  if (!q) return { complete: true as const, progress: playProgress(quiz, state) };
  const now = new Date().toISOString();
  await playRef(db, uid, quiz.code).set(
    { lastQuestionId: q.id, updatedAt: now, ...(state.startedAt ? {} : { startedAt: now }) },
    { merge: true },
  );
  return { complete: false as const, question: presentQuestion(q), progress: playProgress(quiz, { ...state, lastQuestionId: q.id }) };
}

/** Grade an answer, update mastery, report to the creator, and hand back the next question. */
export async function answerQuizQuestion(uid: string, quiz: QuizDoc, questionId: string, letter: string, db: Firestore = getAdminDb()) {
  const q = quiz.questions.find((x) => x.id === questionId);
  if (!q) return { error: 'QUESTION_NOT_FOUND' as const };
  const pick = LETTERS.indexOf(letter.toUpperCase() as (typeof LETTERS)[number]);
  if (pick < 0) return { error: 'BAD_ANSWER' as const };
  const isCorrect = pick === q.correctIndex;

  const ref = playRef(db, uid, quiz.code);
  const state = await getPlayState(uid, quiz.code, db);
  let masteredIds = [...state.masteredIds];
  let wrongQueue = [...state.wrongQueue];
  if (isCorrect) {
    if (!masteredIds.includes(q.id)) masteredIds.push(q.id);
    wrongQueue = wrongQueue.filter((id) => id !== q.id);
  } else {
    masteredIds = masteredIds.filter((id) => id !== q.id);
    if (!wrongQueue.includes(q.id)) wrongQueue.push(q.id);
  }
  const now = new Date().toISOString();
  const next: PlayState = {
    masteredIds,
    wrongQueue,
    lastQuestionId: q.id,
    answered: state.answered + 1,
    correct: state.correct + (isCorrect ? 1 : 0),
    startedAt: state.startedAt || now,
    updatedAt: now,
  };
  await ref.set(next, { merge: true });
  if (state.answered === 0) {
    await db.collection('quizzes').doc(quiz.code).update({ plays: FieldValue.increment(1), ...(quiz.visibility === 'public' ? { publicRank: FieldValue.increment(1) } : {}) }).catch(() => {});
    await bumpCounter(db, 'plays');
  }
  if (quiz.ownerUid !== uid) await reportToCreator(db, uid, quiz, q, isCorrect, pick);

  const following = pickNext(quiz, next);
  return {
    isCorrect,
    correctAnswer: LETTERS[q.correctIndex],
    explanation: q.explanation || `The answer is ${q.options[q.correctIndex]}.`,
    progress: playProgress(quiz, next),
    next: following ? presentQuestion(following) : null,
  };
}

/** The player's name on the creator's report: their account name, else the start of their email. */
async function playerName(uid: string): Promise<string> {
  try {
    const u = await getAdminAuth().getUser(uid);
    return (u.displayName ?? u.email?.split('@')[0] ?? 'A TigerTest member').slice(0, 40);
  } catch {
    return 'A TigerTest member';
  }
}

async function reportToCreator(db: Firestore, uid: string, quiz: QuizDoc, q: QuizQuestion, isCorrect: boolean, pick: number) {
  const memberId = `u_${uid}`;
  const memberRef = db.collection('quizzes').doc(quiz.code).collection('members').doc(memberId);
  const snap = await memberRef.get();
  if (!snap.exists) {
    const now = new Date().toISOString();
    await memberRef.set({ name: await playerName(uid), joinedAt: now, lastActive: now, answered: 0, correct: 0, byCategory: {}, missed: {}, tests: {}, via: 'assistant' });
    await db.collection('quizzes').doc(quiz.code).update({ memberCount: FieldValue.increment(1) }).catch(() => {});
  }
  await applyMemberProgress(db, memberRef, [{ q: quizQuestionId(quiz.code, q.id), c: q.topic ?? 'general', ok: isCorrect, ...(isCorrect ? {} : { p: pick }) }], []).catch(() => {});
}

/** Reset the caller's play on one quiz (the mastery queue only; the creator's report keeps its history). */
export async function resetQuizPlay(uid: string, code: string, db: Firestore = getAdminDb()): Promise<void> {
  await playRef(db, uid, code).delete();
}

// ─── Finding a quiz by words ────────────────────────────────────────────────

export interface QuizMatch extends QuizSummary {
  mine: boolean;
}

/** The caller's own quizzes plus the public library, matched on title, description, topics and maker; best first. */
export async function findQuizzes(uid: string, query: string, limit = 10): Promise<QuizMatch[]> {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  const [mine, pub] = await Promise.all([listMyQuizzes(uid), listPublicQuizzes(200, QUIZ_PUBLIC_MIN_PLAYS)]);
  const seen = new Set<string>();
  const all: QuizMatch[] = [];
  for (const s of mine) {
    seen.add(s.code);
    all.push({ ...s, mine: true });
  }
  for (const s of pub) if (!seen.has(s.code)) all.push({ ...s, mine: false });
  const score = (s: QuizMatch) => {
    const hay = `${s.title} ${s.description} ${s.topics.join(' ')} ${s.ownerName}`.toLowerCase();
    const hits = words.filter((w) => hay.includes(w)).length;
    if (words.length && !hits) return 0;
    return hits * 10 + (s.title.toLowerCase().includes(query.toLowerCase()) ? 20 : 0) + (s.mine ? 5 : 0) + (s.featured ? 3 : 0) + Math.min(s.plays, 100) / 100;
  };
  return all
    .map((s) => ({ s, n: score(s) }))
    .filter((x) => x.n > 0 || !words.length)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.s);
}
