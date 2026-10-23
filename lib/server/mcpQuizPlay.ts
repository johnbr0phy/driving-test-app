import { FieldValue, type Firestore, type Transaction } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { applyMemberProgress } from '@/lib/server/classMembers';
import { getQuiz, listMyQuizzes, listPublicQuizzes, bumpCounter } from '@/lib/server/quizzes';
import { QUIZ_PUBLIC_MIN_PLAYS, isQuizCode, normalizeQuizCode, quizQuestionId, type QuizDoc, type QuizQuestion, type QuizSummary } from '@/lib/quizzes';
import type { QuizCodeProgress } from '@/store/useQuizStore';

// Playing a quiz (lib/quizzes.ts) from an AI assistant through the MCP
// server's `quiz_me` / `answer` loop. The assistant keeps no state: this
// module uses the browser's users/{uid}.quizProgress.progress[code] mastery
// and answer history. mcpQuizPlay/{uid}_{code} retains only assistant session
// metadata and legacy data, migrated once when no browser progress exists.
// It reports a named player's answers to the
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

const LETTERS = ['A', 'B', 'C', 'D'] as const;
const MAX_ANSWERS = 600; // Same history cap as useQuizStore.answerPractice.

interface SessionState extends Partial<PlayState> {
  sharedProgressVersion?: number;
  importedAnswered?: number;
  importedCorrect?: number;
}

function playRef(db: Firestore, uid: string, code: string) {
  return db.collection('mcpQuizPlay').doc(`${uid}_${code}`);
}

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

function localIds(code: string, ids: string[]): string[] {
  return [...new Set(ids.filter((id) => typeof id === 'string').map((id) => id.startsWith(`${code}-`) ? id.slice(code.length + 1) : id))];
}

/** Read both records before any transaction writes; an existing browser entry always wins. */
async function readProgress(uid: string, code: string, db: Firestore, tx?: Transaction) {
  const userRef = db.collection('users').doc(uid);
  const sessionRef = playRef(db, uid, code);
  const [userSnap, sessionSnap] = await Promise.all([
    tx ? tx.get(userRef) : userRef.get(),
    tx ? tx.get(sessionRef) : sessionRef.get(),
  ]);
  const session: SessionState = sessionSnap.data() ?? {};
  const existing = userSnap.data()?.quizProgress?.progress?.[code] as QuizCodeProgress | undefined;
  // A migration marker prevents forgotten browser progress from resurrecting
  // the old assistant queue. Keep the original document for history, not truth.
  const migrate = !existing && sessionSnap.exists && !session.sharedProgressVersion;
  const importedAnswered = migrate ? count(session.answered) : existing ? count(session.importedAnswered) : 0;
  const importedCorrect = migrate ? count(session.correct) : existing ? count(session.importedCorrect) : 0;
  const progress: QuizCodeProgress = {
    masteredIds: [], wrongQueue: [], answers: [], tests: [], known: [], lastPlayedAt: '',
    ...(migrate ? {
      masteredIds: localIds(code, session.masteredIds ?? []).map((id) => quizQuestionId(code, id)),
      wrongQueue: localIds(code, session.wrongQueue ?? []).map((id) => quizQuestionId(code, id)),
      lastPlayedAt: session.updatedAt || '',
    } : {}),
    ...existing,
  };
  const masteredIds = localIds(code, progress.masteredIds);
  const state: PlayState = {
    masteredIds,
    wrongQueue: localIds(code, progress.wrongQueue).filter((id) => !masteredIds.includes(id)),
    lastQuestionId: session.lastQuestionId ?? null,
    // Legacy aggregate counts have no per-answer timestamps. Preserve them
    // separately rather than inventing browser answer-history records. Shared
    // answer counts describe the retained history (the browser caps it at 600).
    answered: progress.answers.length + importedAnswered,
    correct: progress.answers.filter((a) => a.ok).length + importedCorrect,
    startedAt: session.startedAt || progress.answers[0]?.t || '',
    updatedAt: progress.lastPlayedAt || session.updatedAt || '',
  };
  return { userRef, sessionRef, session, progress, state, existing, importedAnswered, importedCorrect };
}

/** Merge only this quiz's changed fields, never the user's entire quiz store. */
function saveProgress(tx: Transaction, data: Awaited<ReturnType<typeof readProgress>>, code: string, patch: Partial<QuizCodeProgress>, now: string) {
  tx.set(data.userRef, {
    mcpProgressRevisions: { quiz: FieldValue.increment(1) },
    quizProgress: {
      progress: { [code]: { ...(data.existing ? {} : data.progress), ...patch } },
      updatedAt: now,
    },
  }, { merge: true });
}

function sessionPatch(data: Awaited<ReturnType<typeof readProgress>>, now: string) {
  return {
    sharedProgressVersion: 1,
    importedAnswered: data.importedAnswered,
    importedCorrect: data.importedCorrect,
    startedAt: data.state.startedAt || now,
    updatedAt: now,
  };
}

export async function getPlayState(uid: string, code: string, db: Firestore = getAdminDb()): Promise<PlayState> {
  return (await readProgress(uid, code, db)).state;
}

/** The quiz if the caller may play it: public or link quizzes for anyone, private ones for the owner. */
export async function loadPlayableQuiz(uid: string, rawCode: string, db: Firestore = getAdminDb()): Promise<{ quiz: QuizDoc } | { error: 'QUIZ_NOT_FOUND' | 'QUIZ_PRIVATE' }> {
  const code = normalizeQuizCode(rawCode);
  if (!isQuizCode(code)) return { error: 'QUIZ_NOT_FOUND' };
  const quiz = await getQuiz(code, db);
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
  const ids = new Set(quiz.questions.map((q) => q.id));
  const mastered = new Set(state.masteredIds.filter((id) => ids.has(id)));
  const wrong = new Set(state.wrongQueue.filter((id) => ids.has(id) && !mastered.has(id)));
  return {
    mastered: mastered.size,
    total: quiz.questions.length,
    wrongQueueSize: wrong.size,
    answered: state.answered,
    correct: state.correct,
    complete: mastered.size >= quiz.questions.length,
  };
}

/** Serve the next question and remember it was asked. */
export async function nextQuizQuestion(uid: string, quiz: QuizDoc, db: Firestore = getAdminDb()) {
  const now = new Date().toISOString();
  return db.runTransaction(async (tx) => {
    const data = await readProgress(uid, quiz.code, db, tx);
    const q = pickNext(quiz, data.state);
    saveProgress(tx, data, quiz.code, { lastPlayedAt: now }, now);
    tx.set(data.sessionRef, { ...sessionPatch(data, now), ...(q ? { lastQuestionId: q.id } : {}) }, { merge: true });
    if (!q) return { complete: true as const, progress: playProgress(quiz, data.state) };
    return { complete: false as const, question: presentQuestion(q), progress: playProgress(quiz, data.state) };
  });
}

/** Grade an answer, update mastery, report to the creator, and hand back the next question. */
export async function answerQuizQuestion(uid: string, quiz: QuizDoc, questionId: string, letter: string, db: Firestore = getAdminDb()) {
  const q = quiz.questions.find((x) => x.id === questionId);
  if (!q) return { error: 'QUESTION_NOT_FOUND' as const };
  const pick = LETTERS.indexOf(letter.toUpperCase() as (typeof LETTERS)[number]);
  if (pick < 0) return { error: 'BAD_ANSWER' as const };
  const isCorrect = pick === q.correctIndex;

  const now = new Date().toISOString();
  const { next, firstAssistantAnswer } = await db.runTransaction(async (tx) => {
    const data = await readProgress(uid, quiz.code, db, tx);
    const id = quizQuestionId(quiz.code, q.id);
    // Leave historical IDs for edited/deleted questions untouched.
    let masteredIds = data.progress.masteredIds.map((value) => value === q.id ? id : value);
    let wrongQueue = data.progress.wrongQueue.map((value) => value === q.id ? id : value);
    if (isCorrect) {
      if (!masteredIds.includes(id)) masteredIds.push(id);
      wrongQueue = wrongQueue.filter((value) => value !== id);
    } else {
      masteredIds = masteredIds.filter((value) => value !== id);
      if (!wrongQueue.includes(id)) wrongQueue.push(id);
    }
    // Browser sync deduplicates by question ID + timestamp. Distinguish two
    // legitimate answers committed in the same millisecond, including retries.
    const previousAt = data.progress.answers.filter((a) => a.q === id)
      .reduce((latest, a) => Math.max(latest, Date.parse(a.t) || 0), 0);
    const answeredAt = new Date(Math.max(Date.parse(now), previousAt + 1)).toISOString();
    const answers = [...data.progress.answers, { q: id, ok: isCorrect, t: answeredAt }].slice(-MAX_ANSWERS);
    const next: PlayState = {
      ...data.state,
      masteredIds: localIds(quiz.code, masteredIds),
      wrongQueue: localIds(quiz.code, wrongQueue),
      lastQuestionId: q.id,
      answered: answers.length + data.importedAnswered,
      correct: answers.filter((a) => a.ok).length + data.importedCorrect,
      startedAt: data.state.startedAt || now,
      updatedAt: now,
    };
    saveProgress(tx, data, quiz.code, {
      masteredIds, wrongQueue,
      answers,
      lastPlayedAt: now,
    }, now);
    tx.set(data.sessionRef, {
      ...sessionPatch(data, now), lastQuestionId: q.id,
      answered: count(data.session.answered) + 1,
      correct: count(data.session.correct) + (isCorrect ? 1 : 0),
    }, { merge: true });
    return { next, firstAssistantAnswer: count(data.session.answered) === 0 };
  });
  // External reporting happens once after commit, not once per transaction retry.
  if (firstAssistantAnswer) {
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
  const now = new Date().toISOString();
  await db.runTransaction(async (tx) => {
    const data = await readProgress(uid, code, db, tx);
    saveProgress(tx, data, code, { masteredIds: [], wrongQueue: [], lastPlayedAt: now }, now);
    tx.delete(data.sessionRef);
  });
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
