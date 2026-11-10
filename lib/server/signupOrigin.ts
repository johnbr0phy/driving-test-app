import { ALL_EXAMS } from '@/lib/exams';
import { getExamV2ByPath } from '@/lib/v2/registry';

/** An explicit page selection, never the mutable current exam or a DMV default. */
export function signupOrigin(raw: unknown): { examId?: string; teacher: boolean } {
  if (typeof raw !== 'string') return { teacher: false };
  try {
    const url = new URL(raw, 'https://tigertest.io');
    if (!['https://tigertest.io', 'https://www.tigertest.io'].includes(url.origin)) return { teacher: false };
    const redirect = url.searchParams.get('redirect');
    const target = redirect ? new URL(redirect, url.origin) : url;
    if (target.origin !== url.origin) return { teacher: false };
    const path = target.pathname;
    if (path === '/teach' || path.startsWith('/teach/')) return { teacher: true };
    if (path === '/dmv' || /^\/(dmv\/|test\/|practice\/|training(?:\/|$))/.test(path) || path === '/dmv-practice-test') return { examId: 'dmv', teacher: false };
    const exam = getExamV2ByPath(path) ?? [...ALL_EXAMS].sort((a, b) => b.slug.length - a.slug.length).find(e => path === e.slug || path.startsWith(`${e.slug}/`) || path === e.landingPath);
    return { examId: exam?.id, teacher: false };
  } catch { return { teacher: false }; }
}
