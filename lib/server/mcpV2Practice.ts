import { randomUUID } from 'node:crypto';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { EXAMS_V2, v2Routes } from '@/lib/v2/registry';
import { getBank, getStimulus } from '@/lib/v2/bank';
import { drillKey, drillQuestions, drillStateFor, nextDrillQuestion } from '@/lib/v2/training';
import { hasDrillProgress, isDrillLocked } from '@/lib/v2/premium';
import { bowtieStarts, highlightCount, isComplete, isCorrect, relabelChoices } from '@/lib/v2/grading';
import { optionOrderFor } from '@/lib/v2/session';
import type { AnswerValue, BasicsSkillState, DrillDef, DrillState, ExamV2Config, QuestionV2, TestSessionV2 } from '@/lib/v2/types';
import '@/lib/v2/banks/accuplacer';
import '@/lib/v2/banks/act';
import '@/lib/v2/banks/aplus';
import '@/lib/v2/banks/asvab';
import '@/lib/v2/banks/aws';
import '@/lib/v2/banks/awssaa';
import '@/lib/v2/banks/az900';
import '@/lib/v2/banks/ccna';
import '@/lib/v2/banks/uknmc';
import '@/lib/v2/banks/pmp';
import '@/lib/v2/banks/elevenplus';
import '@/lib/v2/banks/emt';
import '@/lib/v2/banks/eqao9';
import '@/lib/v2/banks/fsmaths';
import '@/lib/v2/banks/gcsecs';
import '@/lib/v2/banks/gcsehigher';
import '@/lib/v2/banks/gcsemaths';
import '@/lib/v2/banks/gcsescience';
import '@/lib/v2/banks/ged';
import '@/lib/v2/banks/hesi';
import '@/lib/v2/banks/hscmaths';
import '@/lib/v2/banks/ks2';
import '@/lib/v2/banks/naplan';
import '@/lib/v2/banks/naplan7';
import '@/lib/v2/banks/nclex';
import '@/lib/v2/banks/nclexpn';
import '@/lib/v2/banks/rexpn';
import '@/lib/v2/banks/nswsel';
import '@/lib/v2/banks/ocnsw';
import '@/lib/v2/banks/osslt';
import '@/lib/v2/banks/paramedic';
import '@/lib/v2/banks/sat';
import '@/lib/v2/banks/secplus';
import '@/lib/v2/banks/teas';
import '@/lib/v2/banks/timestables';
import '@/lib/v2/banks/vicsel';
import '@/lib/v2/banks/faapvt';
import '@/lib/v2/banks/psat';
import '@/lib/v2/banks/praxis';
import '@/lib/v2/banks/gre';
import '@/lib/v2/banks/gmat';
import '@/lib/v2/banks/netplus';
import '@/lib/v2/banks/cissp';
import '@/lib/v2/banks/itil';
import '@/lib/v2/banks/psm';
import '@/lib/v2/banks/capm';
import '@/lib/v2/banks/gcdl';
import '@/lib/v2/banks/ssccgl';
import '@/lib/v2/banks/rrbntpc';
import '@/lib/v2/banks/ctet';
import '@/lib/v2/banks/ibpspo';

// MCP is another view of the site's drills, NOT a second mastery store.
// The transport document only remembers the presented item/order and a
// one-use attempt token. All learning progress stays in users/{uid}.v2.
// Full test sessions (including their clocks/adaptive stages) are read-only.
type UserData = {
  startedExams?: string[];
  subscription?: { isPremium?: boolean };
  dailyQuestionCounts?: Record<string, number>;
  v2?: {
    drills?: Record<string, DrillState>;
    basics?: Record<string, BasicsSkillState>;
    sessions?: Record<string, TestSessionV2>;
    results?: { examId?: string; key?: string; completedAt?: string }[];
    goals?: Record<string, number>;
  };
};
type Pending = { drill: string; questionId: string; optionOrder: number[]; attemptId: string; servedAt: string; targeted: boolean };
export type V2PracticeResult = { ok: true; data: Record<string, unknown> } | { ok: false; code: string; message: string };
export type V2PracticeOptions = { drillKey?: string; practice?: boolean };
const failure = (code: string, message: string): V2PracticeResult => ({ ok: false, code, message });
const publicUrl = (path: string) => `${(process.env.MCP_OAUTH_ISSUER_URL || 'https://www.tigertest.io').replace(/\/$/, '')}${path}`;
const label = (i: number) => String.fromCharCode(65 + i);
const optionsByLabel = (options: string[], offset = 0) => Object.fromEntries(options.map((text, i) => [label(i + offset), text]));
const pointer = (db: Firestore, uid: string, examId: string) => db.collection('mcpV2Practice').doc(`${uid}_${examId}`);
const examFor = (id: string) => EXAMS_V2.find((e) => e.id === id);
const own = (data: UserData, exam: ExamV2Config, drill: DrillDef) => drillStateFor(data.v2?.drills ?? {}, exam.id, drill, drillQuestions(getBank(exam.id).questions, drill, exam));
const locked = (data: UserData, exam: ExamV2Config, drill: DrillDef) => isDrillLocked(exam, drill.key, !!data.subscription?.isPremium) && !hasDrillProgress(data.v2?.drills ?? {}, data.v2?.basics ?? {}, exam, drill);

function sessionsFor(data: UserData, exam: ExamV2Config) {
  return Object.values(data.v2?.sessions ?? {}).filter((s) => s.examId === exam.id && !s.completedAt && !(data.v2?.results ?? []).some((r) => r.key === s.key && !!r.completedAt && r.completedAt > s.startedAt)).map((s) => ({
    testNumber: s.testNumber,
    stage: s.stage,
    phase: s.phase,
    timing: s.timing ?? 'standard',
    startedAt: s.startedAt,
    answered: s.stages.reduce((sum, stage) => sum + Object.keys(stage.answers).length, 0),
    url: publicUrl(v2Routes(exam).test(s.testNumber)),
    message: 'Continue this full test on the website so its timer, section order and adaptive rules are preserved. Chat practice is separate from this test.',
  }));
}

/** Account-backed equivalents of the catalog's started tests, plus Basics-only progress. */
export function discoverV2Practice(record: Record<string, unknown>) {
  const data = record as UserData;
  return EXAMS_V2.filter((exam) => data.startedExams?.includes(exam.id) ||
    Object.values(data.v2?.sessions ?? {}).some((s) => s.examId === exam.id) ||
    (data.v2?.results ?? []).some((r) => r.examId === exam.id) ||
    Object.entries(data.v2?.drills ?? {}).some(([key, d]) => key.startsWith(`${exam.id}:`) && (d.seen > 0 || d.masteredIds.length > 0 || d.wrongQueue.length > 0)) ||
    Object.entries(data.v2?.basics ?? {}).some(([key, b]) => key.startsWith(`${exam.id}:`) && b.done)
  ).map((exam) => ({
    id: exam.id, quiz: exam.id, kind: 'v2' as const, title: exam.name,
    url: publicUrl(v2Routes(exam).dashboard),
    mode: 'practice' as const,
    practice: { tool: 'start_study_practice', examId: exam.id },
    progress: { tool: 'get_study_progress', examId: exam.id },
    webSessions: sessionsFor(data, exam),
    drills: exam.drills.map((drill) => {
      const questions = drillQuestions(getBank(exam.id).questions, drill, exam);
      const state = own(data, exam, drill);
      const ids = new Set(questions.map((q) => q.id));
      const mastered = state.masteredIds.filter((id) => ids.has(id)).length;
      return { key: drill.key, name: drill.name, mastered, total: questions.length, answered: state.seen, correct: state.correct,
        accuracy: state.seen ? Math.round(state.correct / state.seen * 100) : null,
        wrongQueueSize: state.wrongQueue.filter((id) => ids.has(id)).length,
        complete: questions.length > 0 && mastered === questions.length,
        locked: locked(data, exam, drill), url: publicUrl(v2Routes(exam).drillQuestions(drill.key)) };
    }),
  }));
}

function questionInstructions(q: QuestionV2): string {
  switch (q.format) {
    case 'numeric': return 'Return the number as a string. Fractions and decimals are accepted where applicable.';
    case 'single': return 'Return one option letter, or an array containing its zero-based displayed index.';
    case 'multi': return q.select ? `Choose exactly ${q.select} options. Return their letters separated by commas, or zero-based displayed indices.` : 'Select all that apply. Return their letters separated by commas, or zero-based displayed indices.';
    case 'order': return 'Return every option letter in the requested order, separated by commas, or an ordered array of zero-based displayed indices.';
    case 'highlight': return 'Select the labeled marked phrases. Return their letters separated by commas, or zero-based marker indices.';
    case 'matrix': return 'Return one column letter per row, in row order, separated by commas, or an array of zero-based column indices.';
    case 'cloze': return 'Return one option letter per blank, in blank order, separated by commas, or an array of zero-based option indices.';
    case 'bowtie': return 'Choose the specified number from each group. Return their unique letters separated by commas, or the flat zero-based displayed indices.';
  }
}

/** All eight current formats carry their stimulus, structure and figures, but no key/explanation. */
export function presentV2PracticeQuestion(examId: string, q: QuestionV2, order: number[], attemptId: string) {
  const stimulus = getStimulus(examId, q);
  let marker = 0;
  const mark = (text: string) => text.replace(/\{\{([^{}]+)\}\}/g, (_match, phrase: string) => `[${label(marker++)}: ${phrase}]`);
  const figure = (f: NonNullable<QuestionV2['figure']>) => ({ ...f, src: f.src.startsWith('/') ? publicUrl(f.src) : f.src });
  // Highlight markers belong to the item's own passage, or stem, never its shared case.
  const question = q.format === 'highlight' && !q.passage ? mark(q.stem) : q.stem;
  const shownStimulus = stimulus ? { ...stimulus, text: q.format === 'highlight' && !!q.passage ? mark(stimulus.text) : stimulus.text, ...(stimulus.figure ? { figure: figure(stimulus.figure) } : {}) } : undefined;
  return {
    questionId: q.id, attemptId, format: q.format, question, category: q.domain,
    ...(q.options ? { options: optionsByLabel(order.map((i) => q.options![i])) } : {}),
    ...(q.select ? { select: q.select } : {}),
    ...(shownStimulus ? { stimulus: shownStimulus } : {}),
    ...(q.figure ? { figure: figure(q.figure) } : {}),
    ...(q.rows ? { rows: q.rows } : {}),
    ...(q.columns ? { columns: optionsByLabel(q.columns) } : {}),
    ...(q.blanks ? { blanks: q.blanks.map((choices, i) => ({ number: i + 1, options: optionsByLabel(choices) })) } : {}),
    ...(q.groups ? { groups: q.groups.map((g, i) => ({ label: g.label, pick: g.pick, options: optionsByLabel(g.options, bowtieStarts(q)[i]) })) } : {}),
    ...(q.calculator !== undefined ? { calculator: q.calculator } : {}),
    answerInstructions: questionInstructions(q),
  };
}

/** Reject incomplete, duplicate and out-of-range answers BEFORE changing any progress. */
export function parseV2PracticeAnswer(q: QuestionV2, raw: string | number[], order: number[]): AnswerValue | null {
  if (q.format === 'numeric') return typeof raw === 'string' && isComplete(q, raw) ? raw : null;
  let values: number[];
  if (typeof raw === 'string') {
    const text = raw.trim().toUpperCase();
    if (!/^[A-Z](?:[\s,]+[A-Z])*$/.test(text)) return null;
    values = text.split(/[\s,]+/).map((v) => v.charCodeAt(0) - 65);
  } else if (Array.isArray(raw)) values = raw;
  else return null;
  if (!values.length || values.some((n) => !Number.isInteger(n) || n < 0)) return null;
  if (!['matrix', 'cloze'].includes(q.format) && new Set(values).size !== values.length) return null;
  if (q.format === 'single' && values.length !== 1) return null;
  if (q.format === 'matrix') {
    if (values.some((v) => v >= (q.columns?.length ?? 0))) return null;
  } else if (q.format === 'cloze') {
    if (values.some((v, i) => v >= (q.blanks?.[i]?.length ?? 0))) return null;
  } else {
    const max = q.format === 'highlight' ? highlightCount(q) : q.format === 'bowtie' ? (q.groups ?? []).reduce((n, g) => n + g.options.length, 0) : order.length;
    if (values.some((v) => v >= max)) return null;
  }
  const answer = ['single', 'multi', 'order'].includes(q.format) ? values.map((v) => order[v]) : [...values];
  return isComplete(q, answer) ? answer : null;
}

function feedbackAnswer(q: QuestionV2, order: number[]) {
  if (q.format === 'numeric') return q.numeric?.answers[0] ?? '';
  const values = q.correct ?? [];
  return values.map((v) => label(['single', 'multi', 'order'].includes(q.format) ? order.indexOf(v) : v)).join(', ');
}

function progressFor(exam: ExamV2Config, drill: DrillDef, state: DrillState) {
  const questions = drillQuestions(getBank(exam.id).questions, drill, exam);
  const ids = new Set(questions.map((q) => q.id));
  const mastered = state.masteredIds.filter((id) => ids.has(id)).length;
  return { drill: drill.key, name: drill.name, mastered, total: questions.length,
    wrongQueueSize: state.wrongQueue.filter((id) => ids.has(id)).length, answered: state.seen, correct: state.correct,
    complete: mastered === questions.length };
}

function selectQuestion(data: UserData, exam: ExamV2Config, preferred?: string, currentId: string | null = null) {
  const drills = preferred ? exam.drills.filter((d) => d.key === preferred) : [...exam.drills].sort((a, b) => Number(own(data, exam, b).seen > 0) - Number(own(data, exam, a).seen > 0));
  for (const drill of drills) {
    if (locked(data, exam, drill)) continue;
    const state = own(data, exam, drill);
    const question = nextDrillQuestion(drillQuestions(getBank(exam.id).questions, drill, exam), state, currentId);
    if (question) return { drill, state, question };
  }
  return null;
}

function newPending(drill: DrillDef, question: QuestionV2, targeted: boolean): Pending {
  return { drill: drill.key, questionId: question.id, optionOrder: optionOrderFor(question), attemptId: randomUUID(), servedAt: new Date().toISOString(), targeted };
}
function payload(data: UserData, exam: ExamV2Config, selected: ReturnType<typeof selectQuestion>, pending?: Pending, target?: string): Record<string, unknown> {
  const base = { examId: exam.id, quiz: exam.id, title: exam.name, mode: 'practice', url: publicUrl(v2Routes(exam).dashboard), webSessions: sessionsFor(data, exam) };
  if (!selected || !pending) {
    const lockedDrills = exam.drills.filter((d) => locked(data, exam, d)).map((d) => ({ key: d.key, name: d.name, url: publicUrl(v2Routes(exam).drill(d.key)) }));
    return { ...base, complete: true, scope: target ? 'drill' : 'available_drills', ...(target ? { drill: target } : {}), lockedDrills,
      message: 'The selected available practice is mastered. This does not complete Basics lessons or full practice tests.' };
  }
  return { ...base, complete: false, question: presentV2PracticeQuestion(exam.id, selected.question, pending.optionOrder, pending.attemptId),
    progress: progressFor(exam, selected.drill, selected.state),
    answerWith: { tool: 'submit_study_answer', examId: exam.id, questionId: selected.question.id, attemptId: pending.attemptId },
    message: 'This is untimed exam-level drill practice. It updates the same drill mastery as the website, not a full test or Basics lesson.' };
}

/** Pass practice:true from an explicitly named practice tool, never to silently resume a full test. */
export async function nextV2Practice(uid: string, examId: string, db: Firestore = getAdminDb(), options: V2PracticeOptions = {}): Promise<V2PracticeResult> {
  const exam = examFor(examId);
  if (!exam) return failure('EXAM_NOT_FOUND', `Unknown v2 exam: ${examId}.`);
  const targetedDrill = options.drillKey ? exam.drills.find((d) => d.key === options.drillKey) : undefined;
  if (options.drillKey && !targetedDrill) return failure('DRILL_NOT_FOUND', 'Choose a drill key returned for this exam.');
  const userRef = db.collection('users').doc(uid), pendingRef = pointer(db, uid, examId);
  return db.runTransaction(async (tx) => {
    const [userSnap, pendingSnap] = await Promise.all([tx.get(userRef), tx.get(pendingRef)]);
    if (!userSnap.exists) return failure('USER_NOT_FOUND', 'User not found.');
    const data = userSnap.data() as UserData;
    const webSessions = sessionsFor(data, exam);
    if (webSessions.length && !options.practice) return { ok: true, data: { quiz: examId, title: exam.name, mode: 'web', webSessions, url: webSessions[0].url, message: 'Your full test is in progress. Continue it on the website, or explicitly choose separate untimed practice here.' } };
    if (targetedDrill && locked(data, exam, targetedDrill)) return failure('PREMIUM_REQUIRED', 'This drill requires Premium. Existing progress in this drill or its Basics lessons keeps it open.');
    const pending = pendingSnap.data() as Pending | undefined;
    const priorDrill = pending && exam.drills.find((d) => d.key === pending.drill);
    const priorState = priorDrill ? own(data, exam, priorDrill) : undefined;
    const priorQuestion = priorDrill ? drillQuestions(getBank(exam.id).questions, priorDrill, exam).find((q) => q.id === pending?.questionId) : undefined;
    if (pending && priorDrill && priorState && priorQuestion && (!targetedDrill || targetedDrill.key === priorDrill.key) && !locked(data, exam, priorDrill) && !priorState.masteredIds.includes(priorQuestion.id)) {
      // An explicit target should stay on that drill even if this question was
      // originally served by automatic selection.
      const updated = { ...pending, targeted: !!options.drillKey };
      if (updated.targeted !== pending.targeted) tx.set(pendingRef, updated);
      return { ok: true, data: payload(data, exam, { drill: priorDrill, state: priorState, question: priorQuestion }, updated, options.drillKey) };
    }
    const selected = selectQuestion(data, exam, options.drillKey);
    const next = selected ? newPending(selected.drill, selected.question, !!options.drillKey) : undefined;
    if (next) tx.set(pendingRef, next);
    else if (pendingSnap.exists) tx.delete(pendingRef);
    return { ok: true, data: payload(data, exam, selected, next, options.drillKey) };
  });
}

/** One token can update shared drill progress only once, including a repeated wrong item. */
export async function answerV2Practice(uid: string, examId: string, questionId: string, raw: string | number[], db: Firestore = getAdminDb(), attemptId?: string): Promise<V2PracticeResult> {
  const exam = examFor(examId);
  if (!exam) return failure('EXAM_NOT_FOUND', `Unknown v2 exam: ${examId}.`);
  if (!attemptId) return failure('ATTEMPT_REQUIRED', 'Send the attemptId returned with the question. Call the practice tool again if it is missing.');
  const userRef = db.collection('users').doc(uid), pendingRef = pointer(db, uid, examId);
  return db.runTransaction(async (tx) => {
    const [userSnap, pendingSnap] = await Promise.all([tx.get(userRef), tx.get(pendingRef)]);
    if (!userSnap.exists) return failure('USER_NOT_FOUND', 'User not found.');
    const data = userSnap.data() as UserData;
    const pending = pendingSnap.data() as Pending | undefined;
    if (!pending || pending.questionId !== questionId || pending.attemptId !== attemptId) return failure('STALE_QUESTION', 'That question is not the current unanswered attempt. Fetch the current practice question before answering.');
    const drill = exam.drills.find((d) => d.key === pending.drill);
    if (!drill) return failure('DRILL_NOT_FOUND', 'This drill changed. Fetch a new practice question.');
    if (locked(data, exam, drill)) return failure('PREMIUM_REQUIRED', 'This drill requires Premium.');
    const question = drillQuestions(getBank(exam.id).questions, drill, exam).find((q) => q.id === questionId);
    if (!question) return failure('QUESTION_NOT_FOUND', 'This question is no longer in the drill. Fetch a new question.');
    const answer = parseV2PracticeAnswer(question, raw, pending.optionOrder);
    if (answer === null) return failure('BAD_ANSWER', questionInstructions(question));
    const today = new Date().toISOString().slice(0, 10);
    const count = data.dailyQuestionCounts?.[today] ?? 0;
    if (count >= 500) return failure('RATE_LIMIT_DAILY', 'Daily question limit of 500 reached. Resets at midnight UTC.');
    const before = own(data, exam, drill);
    if (before.masteredIds.includes(questionId)) return failure('STALE_QUESTION', 'This question was mastered in another session. Fetch a new practice question.');
    const correct = isCorrect(question, answer);
    const wrongQueue = before.wrongQueue.filter((id) => id !== questionId);
    const after: DrillState = correct
      ? { masteredIds: [...before.masteredIds, questionId], wrongQueue, seen: before.seen + 1, correct: before.correct + 1 }
      : { masteredIds: before.masteredIds, wrongQueue: [...wrongQueue, questionId], seen: before.seen + 1, correct: before.correct };
    const key = drillKey(examId, drill.key);
    const now = new Date().toISOString();
    const updatedData: UserData = { ...data, v2: { ...data.v2, drills: { ...data.v2?.drills, [key]: after } } };
    const selected = selectQuestion(updatedData, exam, pending.targeted ? drill.key : undefined, questionId);
    const next = selected ? newPending(selected.drill, selected.question, pending.targeted) : undefined;
    tx.update(userRef, { 'mcpProgressRevisions.v2': FieldValue.increment(1), [`v2.drills.${key}`]: after, [`v2.questionStats.${examId}.${questionId}.n`]: FieldValue.increment(1), [`v2.questionStats.${examId}.${questionId}.w`]: FieldValue.increment(correct ? 0 : 1), 'v2.updatedAt': now, [`dailyQuestionCounts.${today}`]: count + 1, lastUpdated: now });
    if (next) tx.set(pendingRef, next); else tx.delete(pendingRef);
    const following = payload(updatedData, exam, selected, next, pending.targeted ? drill.key : undefined);
    return { ok: true, data: {
      examId, quiz: examId, title: exam.name, mode: 'practice', isCorrect: correct,
      correctAnswer: feedbackAnswer(question, pending.optionOrder), explanation: relabelChoices(question.explanation, pending.optionOrder),
      progress: progressFor(exam, drill, after), next: following.question ?? null, nextProgress: following.progress ?? null,
      complete: following.complete, scope: pending.targeted ? 'drill' : 'available_drills', answerWith: following.answerWith ?? null, webSessions: following.webSessions, url: following.url,
    } };
  });
}
