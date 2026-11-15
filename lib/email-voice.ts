/**
 * The exam-specific words and links every email is written against.
 *
 * Tigertest emails were all written for the DMV test: "your DMV test",
 * "/dmv/dashboard", "50 questions", "$9.99 unlocks State Laws". A citizenship or
 * Security+ user signing up got the same copy, and every button sent them to
 * the DMV dashboard, which bounced them to "pick your state". Every template
 * now takes an EmailVoice, built here from the exam registry, so the words,
 * the counts and the links match the exam the person is actually studying.
 *
 * Server and client safe: only imports the plain registry.
 */

import { EXAMS_V2, getExamV2ByPath } from "@/lib/v2/registry";
import type { ExamV2Config } from "@/lib/v2/types";
import {
  ExamConfig,
  examTrainingParts,
  getExamById,
  ALL_EXAMS,
  getExamByStateCode,
  examFamilyId,
  examSetBase,
  examTestIds,
  examTestTotal,
  trainingPartName,
} from "@/lib/exams";
import { lockedTestIds, lockedTrainingParts } from "@/lib/examLocks";

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
  /** True when Tigertest Premium unlocks something on this exam (the paywall follow-up email can be sent). */
  hasPremium: boolean;
  /**
   * What Premium unlocks on this exam, in English, for the paywall follow-up
   * email: the DMV's sets and tests 3 and 4, a v1 exam's locked steps
   * (lib/examLocks.ts), a v2 exam's locked drills and test. Empty when free.
   */
  premiumBenefits: string[];
  /**
   * Days of silence after which lifecycle emails stop. Someone who stopped
   * studying for the DMV has almost always sat the test within days; a
   * certification or entrance exam has a study cycle of weeks.
   */
  inactiveDays: number;
  /** The registry's one-line source note, for the welcome email. */
  sourceLine: string | null;
}

const SITE = "https://www.tigertest.io";

const DMV_VOICE: EmailVoice = {
  id: "dmv",
  shortName: "DMV",
  testName: "DMV test",
  fullName: "DMV test",
  questionsPerTest: 50,
  testCount: 4,
  stepCount: 8,
  passPct: 80,
  dashboardPath: "/dmv/dashboard",
  statsPath: "/stats",
  hasPremium: true,
  premiumBenefits: [
    "Safety &amp; Emergencies and State Laws, 100 more questions",
    "Practice tests C and D",
    "Your stats page, showing what you always get wrong",
  ],
  inactiveDays: 3,
  sourceLine: null,
};

/**
 * "citizenship test" / "Security+ exam": shortName plus "test" or "exam",
 * whichever the official name uses. A shortName that already says it
 * ("Police Exam", "OC Test") stays as it is, never "Police Exam exam".
 */
function testNameFor(shortName: string, fullName: string): string {
  if (/\b(test|exam|examination)s?(\s*\([^)]*\))?$/i.test(shortName.trim())) return shortName;
  const kind = /\bexam(ination)?s?\b/i.test(fullName) ? "exam" : /\btests?\b/i.test(fullName) ? "test" : "exam";
  return `${shortName} ${kind}`;
}

function examTestName(exam: ExamConfig): string {
  return testNameFor(exam.shortName, exam.fullName);
}

const andList = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * A v1 exam's Premium steps by name (the last quarter of its dashboard),
 * plus its full stats. Set names of an exam written in another language are
 * not English, so those exams get a plain description instead.
 */
function v1PremiumBenefits(exam: ExamConfig): string[] {
  // An exam that lists its own Premium (mocks and all) says it best.
  if (exam.premiumBenefits?.length) return exam.premiumBenefits.map(esc);
  const english = !exam.language || exam.language === "en";
  const parts = lockedTrainingParts(exam);
  const ids = examTestIds(exam);
  const tests = lockedTestIds(exam).map((id) => ids.indexOf(id) + 1).filter((n) => n > 0);
  const out: string[] = [];
  if (parts.length > 0) {
    const names = parts.map((p) => esc(trainingPartName(p)));
    out.push(english
      ? `The ${andList(names)} training ${parts.length === 1 ? "set" : "sets"}`
      : `The last ${parts.length === 1 ? "training set" : `${parts.length} training sets`}`);
  }
  if (tests.length > 0) {
    out.push(`Practice ${tests.length === 1 ? "Test" : "Tests"} ${andList(tests.map(String))}`);
  }
  out.push(`Your full ${esc(exam.english?.shortName ?? exam.shortName)} stats, showing what you keep getting wrong`);
  return out;
}

/** A v2 exam's locked drills and test, from its config (empty when free). */
function v2PremiumBenefits(exam: ExamV2Config): string[] {
  return (exam.premium?.benefits ?? [])
    .filter((b) => !/every other exam|one payment|subscription/i.test(b))
    .map(esc);
}

function voiceForExam(exam: ExamConfig): EmailVoice {
  return {
    id: exam.id,
    shortName: exam.shortName,
    testName: examTestName(exam),
    fullName: exam.fullName,
    questionsPerTest: exam.questionsPerTest,
    testCount: exam.testCount,
    stepCount: examTrainingParts(exam).length + examTestTotal(exam),
    passPct: exam.passPct,
    dashboardPath: `${exam.slug}/dashboard`,
    statsPath: `${exam.slug}/stats`,
    hasPremium: true,
    premiumBenefits: v1PremiumBenefits(exam),
    inactiveDays: 14,
    sourceLine: exam.copy.sourceLine || null,
  };
}

/** v2 exams (SAT, TEAS, HESI, ASVAB, ACCUPLACER): sectioned tests plus drills. */
function voiceForV2(exam: ExamV2Config): EmailVoice {
  const perTest = exam.sections.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.questionCount, 0), 0);
  return {
    id: exam.id,
    shortName: exam.shortName,
    testName: testNameFor(exam.shortName, exam.fullName),
    fullName: exam.fullName,
    questionsPerTest: perTest,
    testCount: exam.tests.length,
    stepCount: exam.drills.length + exam.tests.length,
    passPct: exam.defaultGoal,
    dashboardPath: `${exam.slug}/dashboard`,
    statsPath: `${exam.slug}/stats`,
    hasPremium: v2PremiumBenefits(exam).length > 0,
    premiumBenefits: v2PremiumBenefits(exam),
    inactiveDays: 14,
    sourceLine: exam.copy.sourceLine,
  };
}

/** Missing identity is neutral, never an inferred DMV signup. */
const NEUTRAL_VOICE: EmailVoice = {
  id: "unknown", shortName: "Tigertest", testName: "practice test",
  fullName: "practice test", questionsPerTest: 0, testCount: 0, stepCount: 0,
  passPct: 0, dashboardPath: "/tests", statsPath: "/tests", hasPremium: false,
  premiumBenefits: [], inactiveDays: 14, sourceLine: null,
};

/** Voice for a validated event or immutable signup exam. */
export function voiceFor(id: string | null | undefined): EmailVoice {
  if (id === "dmv") return DMV_VOICE;
  if (!id) return NEUTRAL_VOICE;
  const v2 = EXAMS_V2.find((e) => e.id === id);
  if (v2) return voiceForV2(v2);
  const exam = getExamById(id);
  return exam ? voiceForExam(exam) : NEUTRAL_VOICE;
}

/** Every known voice id, for validation. */
export function isKnownExamId(id: unknown): id is string {
  return (
    id === "dmv" ||
    (typeof id === "string" && (!!getExamById(id) || EXAMS_V2.some((e) => e.id === id)))
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
 * Which exam a signup belongs to, from the page the person signed up on.
 * Exam pages link to /signup?redirect=/<slug>/dashboard, so the redirect
 * target wins. The one-tap Google button on GuestSaveCard signs people up on
 * the exam page itself (no redirect), so the page's own path is next. Last,
 * the device's current test (`currentExamId`, the store's primaryExam), else
 * a neutral unknown identity.
 */
export function examIdFromSignupUrl(
  url: string | null | undefined,
  currentExamId?: string | null,
): string {
  const examFor = (path: string | null | undefined) => {
    if (!path || !path.startsWith("/") || path.startsWith("//")) return null;
    const pathname = path.split(/[?#]/)[0];
    if (pathname === "/dmv" || pathname.startsWith("/dmv/")) return "dmv";
    const exam = [...ALL_EXAMS].sort((a, b) => b.slug.length - a.slug.length)
      .find(e => pathname === e.slug || pathname.startsWith(`${e.slug}/`));
    return getExamV2ByPath(pathname)?.id ?? exam?.id ?? null;
  };
  let fromUrl: string | null = null;
  if (url) {
    try {
      const parsed = new URL(url, SITE);
      fromUrl = examFor(parsed.searchParams.get("redirect")) ?? examFor(parsed.pathname);
    } catch {
      // fall through
    }
  }
  return fromUrl ?? (isKnownExamId(currentExamId) ? currentExamId : null) ?? "unknown";
}

/**
 * True when the signup came from the instructor pages: /signup?redirect=/teach/...
 * (the /teach "Create a class" buttons and the /teach/new login bounce) or a
 * sign-in on a /teach page itself. Those people get the teacher welcome, not
 * an exam's, and no current test is set for them.
 */
export function isTeacherSignupUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const isTeach = (path: string | null | undefined) =>
    !!path && (path === "/teach" || path.startsWith("/teach/") || path.startsWith("/teach?"));
  try {
    const parsed = new URL(url, SITE);
    return isTeach(parsed.searchParams.get("redirect")) || isTeach(parsed.pathname);
  } catch {
    return false;
  }
}

/** Event exam wins. Never infer immutable signup identity from mutable progress. */
export function resolveUserExamId(doc: {
  firstSignupExamId?: unknown;
  primaryExam?: unknown;
  completedTests?: unknown;
  trainingSets?: unknown;
}, eventExamId?: unknown): string {
  if (isKnownExamId(eventExamId)) return eventExamId;
  return isKnownExamId(doc.firstSignupExamId) ? doc.firstSignupExamId : "unknown";
}

/** Legacy current-progress inference for analytics only, never signup provenance or email branding. */
export function resolveCurrentExamId(doc: {
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
    // A state variant (REALESTATE_CA) emails as its family (realestate).
    const exam = getExamByStateCode(latest.state);
    return exam ? examFamilyId(exam) : "dmv";
  }

  const sets =
    doc.trainingSets && typeof doc.trainingSets === "object"
      ? Object.keys(doc.trainingSets)
      : [];
  for (const key of sets) {
    const setId = Number(key);
    const exam = ALL_EXAMS.find(
      (e) =>
        setId > examSetBase(e) &&
        setId <= examSetBase(e) + e.trainingSets.length,
    );
    if (exam) return examFamilyId(exam);
  }
  return "dmv";
}
