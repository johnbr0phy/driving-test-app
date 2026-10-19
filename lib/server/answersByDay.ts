/**
 * Per-day answered-question counts from a user's stored history.
 *
 * Training answers carry their own answeredAt; test answers fall back to the
 * test's completedAt. Used by the analytics/questions history backfill and by
 * the admin dashboard's fallback series while that backfill is still pending —
 * live counts come from increments as users answer questions.
 */
import {
  DMV_ANALYTICS_KEY,
  examAnalyticsKey,
  getExamByStateCode,
  getExamForQuestionId,
  getExamForTestId,
} from '@/lib/exams';
import { isAnswered } from '@/lib/v2/grading';
import type { AnswerValue } from '@/lib/v2/types';

export type AnswersByExamByDay = Record<string, Record<string, number>>;

/**
 * Per-exam, per-day answer counts. Test answers are attributed by the pseudo
 * state code the session was stored under (falling back to the test ID range);
 * training answers by the question ID prefix. Anything else is the DMV test.
 */
export function computeAnswersByExamByDay(data: Record<string, unknown>): AnswersByExamByDay {
  const result: AnswersByExamByDay = {};
  const bump = (examKey: string, iso: unknown, n = 1) => {
    if (typeof iso !== 'string' || !iso) return;
    const day = iso.split('T')[0];
    const days = (result[examKey] ||= {});
    days[day] = (days[day] || 0) + n;
  };
  const answerHistory = (data.trainingAnswerHistory || []) as Record<string, unknown>[];
  for (const h of answerHistory) {
    const questionId = typeof h?.questionId === 'string' ? h.questionId : '';
    bump(examAnalyticsKey(getExamForQuestionId(questionId)), h?.answeredAt);
  }
  const completedTests = (data.completedTests || []) as Record<string, unknown>[];
  for (const test of completedTests) {
    const exam =
      getExamByStateCode(typeof test.state === 'string' ? test.state : null) ??
      (typeof test.testNumber === 'number' ? getExamForTestId(test.testNumber) : undefined);
    const examKey = exam ? examAnalyticsKey(exam) : DMV_ANALYTICS_KEY;
    const answers = (test.answers || []) as Record<string, unknown>[];
    if (answers.length > 0) {
      for (const a of answers) bump(examKey, a?.answeredAt ?? test.completedAt);
    } else if (typeof test.totalQuestions === 'number' && test.totalQuestions > 0) {
      bump(examKey, test.completedAt, test.totalQuestions);
    }
  }
  // v2 exams (SAT, ACT...): full tests by their completedAt, learned Basics
  // skills by theirs. Drill answers carry no timestamp, so they only count live.
  const v2 = (data.v2 || {}) as Record<string, unknown>;
  for (const r of (Array.isArray(v2.results) ? v2.results : []) as Record<string, unknown>[]) {
    if (typeof r?.examId !== 'string') continue;
    const items = (Array.isArray(r.items) ? r.items : []) as Record<string, unknown>[];
    const answered = items.filter((i) => isAnswered(i?.answer as AnswerValue | undefined)).length;
    if (answered > 0) bump(r.examId, r.completedAt, answered);
  }
  for (const [key, b] of Object.entries((v2.basics || {}) as Record<string, Record<string, unknown>>)) {
    if (typeof b?.total === 'number' && b.total > 0) bump(key.split(':')[0], b.completedAt, b.total);
  }
  return result;
}
