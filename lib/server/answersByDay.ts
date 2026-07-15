/**
 * Per-day answered-question counts from a user's stored history.
 *
 * Training answers carry their own answeredAt; test answers fall back to the
 * test's completedAt. Used by the analytics/questions history backfill and by
 * the admin dashboard's fallback series while that backfill is still pending —
 * live counts come from increments as users answer questions.
 */
export function computeAnswersByDay(data: Record<string, unknown>): Record<string, number> {
  const answersByDay: Record<string, number> = {};
  const bumpDay = (iso: unknown, n = 1) => {
    if (typeof iso !== 'string' || !iso) return;
    const day = iso.split('T')[0];
    answersByDay[day] = (answersByDay[day] || 0) + n;
  };
  const answerHistory = (data.trainingAnswerHistory || []) as Record<string, unknown>[];
  for (const h of answerHistory) bumpDay(h?.answeredAt);
  const completedTests = (data.completedTests || []) as Record<string, unknown>[];
  for (const test of completedTests) {
    const answers = (test.answers || []) as Record<string, unknown>[];
    if (answers.length > 0) {
      for (const a of answers) bumpDay(a?.answeredAt ?? test.completedAt);
    } else if (typeof test.totalQuestions === 'number' && test.totalQuestions > 0) {
      bumpDay(test.completedAt, test.totalQuestions);
    }
  }
  return answersByDay;
}
