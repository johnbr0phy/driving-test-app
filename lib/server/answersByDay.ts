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
    const examKey = exam?.id ?? DMV_ANALYTICS_KEY;
    const answers = (test.answers || []) as Record<string, unknown>[];
    if (answers.length > 0) {
      for (const a of answers) bump(examKey, a?.answeredAt ?? test.completedAt);
    } else if (typeof test.totalQuestions === 'number' && test.totalQuestions > 0) {
      bump(examKey, test.completedAt, test.totalQuestions);
    }
  }
  return result;
}

export function computeAnswersByDay(data: Record<string, unknown>): Record<string, number> {
  const answersByDay: Record<string, number> = {};
  for (const days of Object.values(computeAnswersByExamByDay(data))) {
    for (const [day, n] of Object.entries(days)) {
      answersByDay[day] = (answersByDay[day] || 0) + n;
    }
  }
  return answersByDay;
}
