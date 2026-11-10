/** Read-only lifecycle evidence. Counts are retained observations, not lifetime totals. */
import { getExamByStateCode, getExamForQuestionId, getExamById, examFamilyId } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { states } from "@/data/states";
import { isKnownExamId, voiceFor } from "@/lib/email-voice";

export interface StudyContext {
  examId: string;
  completedAt: number[];
  answersObserved: number;
  lastActivityAt: number;
  /** Only a future authoritative event ledger can prove absence/lifetime first. */
  lifetimeHistoryComplete: false;
}
export function eventTime(value: unknown): number | null {
  if (typeof value !== "string" && !(value instanceof Date)) return null;
  const at = new Date(value).getTime();
  return Number.isFinite(at) && at > 0 ? at : null;
}
export function examForTestState(state: unknown): string | null {
  if (typeof state !== "string") return null;
  return getExamByStateCode(state)?.id ?? (states.some(s => s.code === state) ? "dmv" : null);
}
function examForAnswer(id: unknown): string | null {
  if (typeof id !== "string") return null;
  return getExamForQuestionId(id)?.id ?? (/^U-/.test(id) || states.some(s => id.startsWith(`${s.code}-`)) ? "dmv" : null);
}
export function studyContexts(raw: Record<string, any>, now = Date.now()): StudyContext[] {
  const contexts = new Map<string, StudyContext>();
  const context = (id: string) => {
    if (!contexts.has(id)) contexts.set(id, { examId: id, completedAt: [], answersObserved: 0, lastActivityAt: 0, lifetimeHistoryComplete: false });
    return contexts.get(id)!;
  };
  const observe = (id: string | null, value: unknown, test: boolean) => {
    const at = eventTime(value);
    if (!id || !isKnownExamId(id) || at === null || at > now) return;
    const c = context(id);
    c.lastActivityAt = Math.max(c.lastActivityAt, at);
    if (test) c.completedAt.push(at); else c.answersObserved++;
  };
  for (const t of Array.isArray(raw.completedTests) ? raw.completedTests : []) {
    const id = examForTestState(t?.state);
    observe(id, t?.completedAt, true);
    const at = eventTime(t?.completedAt);
    if (!id || at === null || at > now || !contexts.has(id)) continue;
    const exam = getExamById(id);
    const family = exam ? examFamilyId(exam) : id;
    const answered = new Set<string>();
    for (const answer of Array.isArray(t?.answers) ? t.answers : []) {
      if (typeof answer?.userAnswer !== "string" || !answer.userAnswer.trim()) continue;
      const answerExamId = examForAnswer(answer.questionId);
      if (!answerExamId) continue;
      const answerExam = getExamById(answerExamId);
      if ((answerExam ? examFamilyId(answerExam) : answerExamId) === family) answered.add(answer.questionId);
    }
    // Each retained answered test item is counted once per attempt. Training
    // history is a separate stream and does not contain test answers.
    context(id).answersObserved += answered.size;
  }
  for (const a of Array.isArray(raw.trainingAnswerHistory) ? raw.trainingAnswerHistory : []) {
    observe(examForAnswer(a?.questionId), a?.answeredAt, false);
  }
  for (const t of Array.isArray(raw.v2?.results) ? raw.v2.results : []) {
    if (EXAMS_V2.some(e => e.id === t?.examId)) observe(t.examId, t.completedAt, true);
  }
  // A Basics completion is dated and exam-scoped. Drill totals and v2.updatedAt
  // are deliberately excluded: neither proves when this exam was studied.
  for (const [key, value] of Object.entries<any>(raw.v2?.basics ?? {})) {
    const id = key.split(":")[0];
    if (value?.done === true && EXAMS_V2.some(e => e.id === id)) observe(id, value.completedAt, false);
  }
  return [...contexts.values()];
}
export function latestStudyContext(raw: Record<string, any>, now = Date.now()): StudyContext | null {
  const all = studyContexts(raw, now).sort((a, b) => b.lastActivityAt - a.lastActivityAt);
  // Simultaneous cross-exam activity has no trustworthy winning exam.
  if (all.length > 1 && all[0].lastActivityAt === all[1].lastActivityAt) return null;
  return all[0] ?? null;
}

/** Match the account's synced class entitlement; quiz membership grants no exam stats access. */
export function hasClassStatsAccess(raw: Record<string, any>, examId: string): boolean {
  const exam = getExamById(examId);
  const ids = new Set([examId, ...(exam ? [examFamilyId(exam)] : [])]);
  return Array.isArray(raw.classMemberships) && raw.classMemberships.some((m: any) =>
    m?.kind !== "quiz" && typeof m?.code === "string" && typeof m?.memberId === "string" && ids.has(m?.examId));
}

export type JourneyCandidate = { key: string; examId: string; dueAt: number; expiresAt: number; priority: number };
/** Proposal only; no scheduler or sender invokes this until rollout is approved. */
export function selectJourneyCandidate(candidates: JourneyCandidate[], now: number, lastMarketingAt: number | null): JourneyCandidate | null {
  if (lastMarketingAt !== null && now - lastMarketingAt < 48 * 60 * 60 * 1000) return null;
  return candidates.filter(c => isKnownExamId(c.examId) && Number.isFinite(c.dueAt) && Number.isFinite(c.expiresAt) && c.dueAt <= now && now <= c.expiresAt)
    .sort((a, b) => a.priority - b.priority || a.dueAt - b.dueAt || a.key.localeCompare(b.key))[0] ?? null;
}

/** Bind copy/counts to the actual dated study event, never a switched primaryExam. */
export function withStudyContext<T extends { raw: Record<string, any>; examId: string; voice: any; completedTests: any[]; questionsAnswered: number; lastUpdated: Date | null; lastActiveAt: Date }>(user: T, now = Date.now()): T | null {
  const c = latestStudyContext(user.raw, now);
  if (!c) return null;
  return {
    ...user, examId: c.examId, voice: voiceFor(c.examId),
    completedTests: c.completedAt.map(at => ({ completedAt: new Date(at).toISOString() })),
    questionsAnswered: c.answersObserved,
    lastUpdated: new Date(c.lastActivityAt),
    lastActiveAt: new Date(Math.max(user.lastActiveAt.getTime(), c.lastActivityAt, eventTime(user.raw.v2?.updatedAt) ?? 0)),
  };
}
