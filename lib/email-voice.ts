/**
 * The exam-specific words and links every email is written against.
 *
 * TigerTest emails were all written for the DMV test: "your DMV test",
 * "/dashboard", "50 questions", "$9.99 unlocks State Laws". A citizenship or
 * Security+ user signing up got the same copy, and every button sent them to
 * the DMV dashboard, which bounced them to "pick your state". Every template
 * now takes an EmailVoice, built here from the exam registry, so the words,
 * the counts and the links match the exam the person is actually studying.
 *
 * Server and client safe: only imports the plain registry.
 */

import {
  EXAMS,
  ExamConfig,
  examSetBase,
  getExamById,
  getExamByPath,
  getExamByStateCode,
} from "@/lib/exams";

export interface EmailVoice {
  /** "dmv" or an exam id from lib/exams. */
  id: string;
  /** Short name for subjects and headings: "DMV", "Citizenship", "Security+". */
  shortName: string;
  /** "DMV test", "citizenship test", "Security+ exam". Reads after "your". */
  testName: string;
  /** Long form for the welcome line: "U.S. citizenship civics test". */
  fullName: string;
  questionsPerTest: number;
  testCount: number;
  /** Training sets + practice tests, the dashboard's "N steps". */
  stepCount: number;
  passPct: number;
  /** App paths, without the host. */
  dashboardPath: string;
  statsPath: string;
  /** Only the DMV flow sells Premium; every registry exam is free. */
  hasPremium: boolean;
  /**
   * Days of silence after which lifecycle emails stop. Someone who stopped
   * studying for the DMV has almost always sat the test within days; a
   * certification or entrance exam has a study cycle of weeks.
   */
  inactiveDays: number;
  /** The registry's one-line source note, for the welcome email. */
  sourceLine: string | null;
}

const SITE = "https://tigertest.io";

const DMV_VOICE: EmailVoice = {
  id: "dmv",
  shortName: "DMV",
  testName: "DMV test",
  fullName: "DMV test",
  questionsPerTest: 50,
  testCount: 4,
  stepCount: 8,
  passPct: 80,
  dashboardPath: "/dashboard",
  statsPath: "/stats",
  hasPremium: true,
  inactiveDays: 3,
  sourceLine: null,
};

/** "citizenship test" / "Security+ exam": shortName plus whatever fullName ends in. */
function examTestName(exam: ExamConfig): string {
  const kind = /\btests?$/i.test(exam.fullName.trim()) ? "test" : "exam";
  return `${exam.shortName} ${kind}`;
}

function voiceForExam(exam: ExamConfig): EmailVoice {
  return {
    id: exam.id,
    shortName: exam.shortName,
    testName: examTestName(exam),
    fullName: exam.fullName,
    questionsPerTest: exam.questionsPerTest,
    testCount: exam.testCount,
    stepCount: exam.trainingSets.length + exam.testCount,
    passPct: exam.passPct,
    dashboardPath: `${exam.slug}/dashboard`,
    statsPath: `${exam.slug}/stats`,
    hasPremium: false,
    inactiveDays: 14,
    sourceLine: exam.copy.sourceLine || null,
  };
}

/** Voice for an exam id. Unknown or missing ids fall back to the DMV voice. */
export function voiceFor(id: string | null | undefined): EmailVoice {
  if (!id || id === "dmv") return DMV_VOICE;
  const exam = getExamById(id);
  return exam ? voiceForExam(exam) : DMV_VOICE;
}

/** Every known voice id, for validation. */
export function isKnownExamId(id: unknown): id is string {
  return (
    id === "dmv" || (typeof id === "string" && EXAMS.some((e) => e.id === id))
  );
}

/** Tracked link to the exam's dashboard. */
export function dashboardUrl(voice: EmailVoice, campaign: string): string {
  return `${SITE}${voice.dashboardPath}?utm_source=tigertest&utm_medium=email&utm_campaign=${campaign}`;
}

/** Tracked link to the exam's stats page. */
export function statsUrl(voice: EmailVoice, campaign: string): string {
  return `${SITE}${voice.statsPath}?utm_source=tigertest&utm_medium=email&utm_campaign=${campaign}`;
}

/**
 * Which exam a signup belongs to, from the signup page's own URL. Exam pages
 * link to /signup?redirect=/<slug>/dashboard; the DMV flow links to /signup.
 */
export function examIdFromSignupUrl(url: string | null | undefined): string {
  if (!url) return "dmv";
  try {
    const parsed = new URL(url, SITE);
    const redirect = parsed.searchParams.get("redirect");
    return getExamByPath(redirect)?.id ?? "dmv";
  } catch {
    return "dmv";
  }
}

/**
 * Which exam a stored user is studying, for accounts that predate the
 * primaryExam field or never visited a dashboard after it shipped. The most
 * recently completed test wins; failing that, any training set they touched;
 * failing that, the DMV.
 */
export function resolveUserExamId(doc: {
  primaryExam?: unknown;
  completedTests?: unknown;
  trainingSets?: unknown;
}): string {
  if (isKnownExamId(doc.primaryExam)) return doc.primaryExam;

  const tests = Array.isArray(doc.completedTests) ? doc.completedTests : [];
  let latest: { at: number; state: string } | null = null;
  for (const t of tests) {
    const at = t?.completedAt ? new Date(t.completedAt).getTime() : 0;
    const state = typeof t?.state === "string" ? t.state : "";
    if (!state) continue;
    if (!latest || at > latest.at) latest = { at, state };
  }
  if (latest) {
    const exam = getExamByStateCode(latest.state);
    return exam ? exam.id : "dmv";
  }

  const sets =
    doc.trainingSets && typeof doc.trainingSets === "object"
      ? Object.keys(doc.trainingSets)
      : [];
  for (const key of sets) {
    const setId = Number(key);
    const exam = EXAMS.find(
      (e) =>
        setId > examSetBase(e) &&
        setId <= examSetBase(e) + e.trainingSets.length,
    );
    if (exam) return exam.id;
  }
  return "dmv";
}
