import { randomUUID } from 'node:crypto';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase-admin';
import { getExamById, getExamForSetId, getExamForTestId, getExamVariant, examLanguage, type ExamConfig } from '@/lib/exams';
import { getExamTrainingSetQuestions } from '@/lib/examTestGenerator';
import { getExamQuestions } from '@/lib/examData';
import { migrateTestSets } from '@/lib/testSetMigration';
import { splitLegacySets } from '@/lib/legacySetSplits';
import { SIGN_BY_QUESTION_ID } from '@/lib/signImages';
import type { Language } from '@/i18n';
import type { Question } from '@/types';
import '@/lib/banks/all';

type SetState = { masteredIds: string[]; wrongQueue: string[] };
export interface CatalogUserData {
  selectedState?: string | null;
  language?: Language;
  startedExams?: string[];
  examStates?: Record<string, string>;
  trainingSets?: Record<string, SetState>;
  trainingAnswerHistory?: { questionId: string; isCorrect: boolean; answeredAt?: string }[];
  currentTests?: Record<string, { startedAt?: string; answers?: Record<string, string> }>;
  completedTests?: { testNumber: number }[];
  dailyQuestionCounts?: Record<string, number>;
  mcpCatalogPending?: Record<string, { questionId: string; setNumber: number; attemptId: string }>;
}
const failure = (code: string, message: string) => ({ ok: false as const, code, message });
const publicUrl = (path: string) => `${(process.env.MCP_OAUTH_ISSUER_URL || 'https://www.tigertest.io').replace(/\/$/, '')}${path}`;
const EMPTY: SetState = { masteredIds: [], wrongQueue: [] };

/** Same signals as useStartedTests; retain the exact jurisdiction instead of mixing family progress. */
export function startedCatalogExams(data: CatalogUserData): ExamConfig[] {
  const exams = new Map<string, ExamConfig>();
  const add = (exam?: ExamConfig) => { if (exam) exams.set(exam.id, exam); };
  for (const id of data.startedExams ?? []) add(getExamVariant(id, data.examStates?.[id]) ?? getExamById(id));
  for (const id of Object.keys(data.trainingSets ?? {})) add(getExamForSetId(Number(id)));
  for (const id of Object.keys(data.currentTests ?? {})) add(getExamForTestId(Number(id)));
  for (const test of data.completedTests ?? []) add(getExamForTestId(test.testNumber));
  return [...exams.values()];
}

function stateFor(exam: ExamConfig, data: CatalogUserData) {
  const original = data.trainingSets ?? {};
  const sets = { ...original };
  const migration: Record<string, SetState | undefined> = {};
  // The browser first carries retired HTL staining mastery into its split
  // sets. Apply only this exam's additions: practicing CNA must not migrate
  // or otherwise write HTL state as an unrelated side effect.
  const split = splitLegacySets(original);
  const ownedIds = new Set(exam.trainingSets.map((set) => String(set.id)));
  for (const [id, value] of Object.entries(split)) {
    if (ownedIds.has(id) && value !== original[id]) {
      sets[id] = value;
      migration[id] = value;
    }
  }
  Object.assign(migration, migrateTestSets(exam, sets) ?? {});
  for (const [id, value] of Object.entries(migration)) {
    if (value) sets[id] = value; else delete sets[id];
  }
  return { sets, migration };
}

export function catalogProgress(exam: ExamConfig, data: CatalogUserData) {
  const { sets } = stateFor(exam, data);
  const language = examLanguage(exam, data.language ?? 'en');
  const history = data.trainingAnswerHistory ?? [];
  const bank = getExamQuestions(exam.id, language);
  const byId = new Map(bank.map(q => [q.questionId, q]));
  const topics = new Map<string, { answered: number; correct: number }>();
  for (const answer of history) {
    const q = byId.get(answer.questionId); if (!q) continue;
    const row = topics.get(q.category) ?? { answered: 0, correct: 0 };
    row.answered++; if (answer.isCorrect) row.correct++; topics.set(q.category, row);
  }
  return {
    id: exam.id, title: exam.name, kind: 'catalog', language, dashboard: publicUrl(`${exam.slug}/dashboard`),
    mode: 'practice',
    sets: exam.trainingSets.map(def => {
      const ids = new Set(getExamTrainingSetQuestions(exam, def.setNumber, undefined, language).map(q => q.questionId));
      const saved = sets[String(def.id)] ?? EMPTY;
      return { setNumber: def.setNumber, name: def.name, total: ids.size, mastered: saved.masteredIds.filter(id => ids.has(id)).length, wrongQueueSize: saved.wrongQueue.filter(id => ids.has(id)).length };
    }),
    weakTopics: [...topics].map(([topic, s]) => ({ topic, label: exam.categoryLabels[topic] ?? topic, ...s, accuracy: Math.round(s.correct / s.answered * 100) })).sort((a,b)=>a.accuracy-b.accuracy),
    webSessions: Object.entries(data.currentTests ?? {}).filter(([id]) => getExamForTestId(Number(id))?.id === exam.id).map(([id, s])=>({ testNumber: Number(id)-exam.idBase, answered: Object.keys(s.answers ?? {}).length, url: publicUrl(`${exam.slug}/test/${Number(id)-exam.idBase}`) })),
    testSupport: 'Resume timed tests on the website; chat practice does not advance a test sitting.',
  };
}

function present(q: Question) {
  const signId = SIGN_BY_QUESTION_ID[q.questionId];
  return { questionId: q.questionId, question: q.question, topic: q.category, format: 'single', options: { A:q.optionA, B:q.optionB, C:q.optionC, D:q.optionD }, answerFormat: 'A, B, C or D', ...(signId ? { imageUrl: publicUrl(`/signs/${signId}.svg`) } : {}) };
}

function select(exam: ExamConfig, data: CatalogUserData, requested?: number, avoid?: string) {
  const { sets } = stateFor(exam, data);
  const started = (id: number) => ((sets[String(id)]?.masteredIds.length ?? 0) + (sets[String(id)]?.wrongQueue.length ?? 0)) > 0;
  const defs = requested === undefined ? [...exam.trainingSets].sort((a,b)=>Number(started(b.id))-Number(started(a.id))) : exam.trainingSets.filter(s=>s.setNumber===requested);
  for (const def of defs) {
    const state = sets[String(def.id)] ?? EMPTY;
    let pool = getExamTrainingSetQuestions(exam, def.setNumber, undefined, examLanguage(exam,data.language ?? 'en')).filter(q=>!state.masteredIds.includes(q.questionId));
    if (pool.length > 1 && avoid) pool = pool.filter(q=>q.questionId!==avoid);
    const q = pool.find(q=>!state.wrongQueue.includes(q.questionId)) ?? state.wrongQueue.map(id=>pool.find(q=>q.questionId===id)).find(Boolean) ?? pool[0];
    if (q) return { q, def };
  }
  return null;
}

export async function nextCatalogPractice(uid: string, examId: string, db: Firestore = getAdminDb(), setNumber?: number) {
  const exam=getExamById(examId); if(!exam)return failure('EXAM_NOT_FOUND','Choose an exact exam ID from list_in_progress_tests.');
  if(setNumber!==undefined&&!exam.trainingSets.some(s=>s.setNumber===setNumber))return failure('INVALID_SET','Choose a setNumber returned by get_study_progress.');
  const ref=db.collection('users').doc(uid);
  return db.runTransaction(async tx=>{
    const snap=await tx.get(ref);if(!snap.exists)return failure('USER_NOT_FOUND','User not found.');
    const data=snap.data() as CatalogUserData;
    const pending=data.mcpCatalogPending?.[exam.id];
    const pendingState = pending ? stateFor(exam,data).sets[String(exam.trainingSets.find(s=>s.setNumber===pending.setNumber)?.id)] : undefined;
    const usePending=pending&&exam.trainingSets.some(s=>s.setNumber===pending.setNumber)&&!pendingState?.masteredIds.includes(pending.questionId)&&(setNumber===undefined||setNumber===pending.setNumber);
    const existing=usePending?getExamTrainingSetQuestions(exam,pending.setNumber,undefined,examLanguage(exam,data.language??'en')).find(q=>q.questionId===pending.questionId):undefined;
    const next=existing?{q:existing,def:exam.trainingSets.find(s=>s.setNumber===pending!.setNumber)!}:select(exam,data,setNumber);
    if(!next)return {ok:true as const,data:{examId,complete:true,progress:catalogProgress(exam,data)}};
    const attemptId=existing?pending!.attemptId:randomUUID();
    if(!existing)tx.update(ref,{[`mcpCatalogPending.${exam.id}`]:{questionId:next.q.questionId,setNumber:next.def.setNumber,attemptId}});
    return {ok:true as const,data:{examId,title:exam.name,mode:'practice',complete:false,setNumber:next.def.setNumber,attemptId,question:present(next.q),progress:catalogProgress(exam,data),answerWith:{tool:'submit_study_answer',examId,questionId:next.q.questionId,attemptId}}};
  });
}

export async function answerCatalogPractice(uid:string,examId:string,questionId:string,answer:string,attemptId:string,db:Firestore=getAdminDb()) {
  const exam=getExamById(examId);if(!exam)return failure('EXAM_NOT_FOUND','Unknown exam.');
  const letter=answer.toUpperCase();if(!['A','B','C','D'].includes(letter))return failure('BAD_ANSWER','Use A, B, C or D.');
  const ref=db.collection('users').doc(uid);
  return db.runTransaction(async tx=>{
    const snap=await tx.get(ref);if(!snap.exists)return failure('USER_NOT_FOUND','User not found.');const data=snap.data() as CatalogUserData;
    const pending=data.mcpCatalogPending?.[examId];if(!pending||pending.questionId!==questionId||pending.attemptId!==attemptId)return failure('STALE_QUESTION','Call start_study_practice for the current question; this answer was not recorded.');
    if(!exam.trainingSets.some(s=>s.setNumber===pending.setNumber))return failure('STALE_QUESTION','This training set changed. Fetch a new practice question.');
    const language=examLanguage(exam,data.language??'en');
    const q=getExamTrainingSetQuestions(exam,pending.setNumber,undefined,language).find(q=>q.questionId===questionId);if(!q)return failure('QUESTION_NOT_FOUND','Question no longer in this set.');
    const day=new Date().toISOString().slice(0,10),count=data.dailyQuestionCounts?.[day]??0;if(count>=500)return failure('DAILY_LIMIT','Daily question limit reached.');
    const {sets,migration}=stateFor(exam,data);const def=exam.trainingSets.find(s=>s.setNumber===pending.setNumber)!;const state=sets[String(def.id)]??EMPTY;if(state.masteredIds.includes(questionId))return failure('STALE_QUESTION','This question was mastered in another session. Fetch a new practice question.');const isCorrect=letter===q.correctAnswer;
    const masteredIds=isCorrect?[...new Set([...state.masteredIds,questionId])]:state.masteredIds.filter(id=>id!==questionId);
    const wrongQueue=isCorrect?state.wrongQueue.filter(id=>id!==questionId):[...new Set([...state.wrongQueue,questionId])];
    const now=new Date().toISOString();const history=[...(data.trainingAnswerHistory??[]),{questionId,isCorrect,answeredAt:now}];
    sets[String(def.id)]={masteredIds,wrongQueue};const after={...data,trainingSets:sets,trainingAnswerHistory:history};const next=select(exam,after,pending.setNumber,questionId);const nextAttemptId=next?randomUUID():null;
    const patch:Record<string,unknown>={};for(const [id,value] of Object.entries(migration??{}))patch[`trainingSets.${id}`]=value??FieldValue.delete();
    Object.assign(patch,{'mcpProgressRevisions.catalog':FieldValue.increment(1),[`trainingSets.${def.id}`]:{masteredIds,wrongQueue},trainingAnswerHistory:history,[`dailyQuestionCounts.${day}`]:count+1,lastUpdated:now,[`mcpCatalogPending.${examId}`]:next?{questionId:next.q.questionId,setNumber:next.def.setNumber,attemptId:nextAttemptId}:FieldValue.delete()});
    tx.update(ref,patch);
    return {ok:true as const,data:{examId,isCorrect,correctAnswer:q.correctAnswer,explanation:q.explanation,complete:!next,scope:'selected_set',message:next?'Continue this training set.':'This training set is mastered. Call start_study_practice to continue another set.',progress:catalogProgress(exam,after),next:next?present(next.q):null,attemptId:nextAttemptId,...(next?{answerWith:{tool:'submit_study_answer',examId,questionId:next.q.questionId,attemptId:nextAttemptId}}:{})}};
  });
}
