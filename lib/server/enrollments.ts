import { computeAnswersByExamByDay } from '@/lib/server/answersByDay';

/** enrollments/{exam}__u_{uid} for an account, {exam}__b_{browserId} for a guest browser. */
export function enrollmentDocId(exam: string, kind: 'u' | 'b', id: string): string {
  return `${exam}__${kind}_${id}`;
}

/**
 * Exams a user has answered at least one question in, from their stored
 * record: dated answer history plus v2 drills (whose answers carry no date).
 * Seeds the enrollments collection for accounts that predate live tracking.
 */
export function enrolledExamKeys(data: Record<string, unknown>): string[] {
  const keys = new Set(Object.keys(computeAnswersByExamByDay(data)));
  const v2 = (data.v2 || {}) as Record<string, unknown>;
  for (const [key, d] of Object.entries((v2.drills || {}) as Record<string, Record<string, unknown>>)) {
    if (typeof d?.seen === 'number' && d.seen > 0) keys.add(key.split(':')[0]);
  }
  return [...keys];
}
