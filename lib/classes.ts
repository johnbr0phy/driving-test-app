import { ALL_EXAMS, EXAM_VARIANTS, getExamById, type ExamConfig } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { TEST_GROUPS } from "@/lib/testCatalog";
import { states } from "@/data/states";
import { en } from "@/i18n/en";

// Instructor classes: a teacher makes a class for one test on the site and
// posts its link (tigertest.io/c/<code>); students join with a name, no
// account, and their practice on that test is reported to the class. Shared
// by the /api/classes routes, the join page, the teacher pages and
// lib/classProgress.
//
// A class's examId is "dmv" (with the class's `state`), a v1 registry exam or
// state version ("cst", "realestate-ca"), or a v2 exam ("sat"); the three id
// spaces never overlap. Practice pages report under the same ids.
//
// Firestore: classes/{code} = { code, name, examId, state?, teacherUid,
// teacherName, school, createdAt, memberCount }, and
// classes/{code}/members/{memberId} = { name, joinedAt, lastActive, answered,
// correct, byCategory, missed, seen, tests }. memberId is a random id the
// student's browser keeps; it doubles as the secret that lets only that
// browser report progress for that student.

export const CLASS_CODE_LENGTH = 5;
// No 0/O, 1/I/L: codes get read aloud and typed from a projector.
export const CLASS_CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export const MAX_CLASS_MEMBERS = 200;
export const MAX_CLASSES_PER_TEACHER = 30;
export const MAX_NAME_LENGTH = 40;
export const DMV_EXAM_ID = "dmv";

export function isClassCode(code: unknown): code is string {
  return typeof code === "string" && new RegExp(`^[${CLASS_CODE_ALPHABET}]{${CLASS_CODE_LENGTH}}$`).test(code);
}

export function normalizeClassCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isMemberId(id: unknown): id is string {
  return typeof id === "string" && /^[a-f0-9-]{32,40}$/.test(id);
}

/** A display name: trimmed, single-spaced, no markup characters. */
export function cleanName(name: unknown): string {
  if (typeof name !== "string") return "";
  return name.replace(/[<>{}\\]/g, "").replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
}

// ─── Which test a class is for ──────────────────────────────────────────────

export type ClassExamKind = "dmv" | "v1" | "v2";

export interface ClassExamInfo {
  id: string;
  kind: ClassExamKind;
  /** e.g. "California DMV Permit Test", "CST", "SAT" */
  name: string;
  /** Where a student lands after joining. */
  home: string;
  /** The pass line the class page measures topics and tests against. */
  passPct: number;
  topicLabel: (key: string) => string;
}

const DMV_TOPICS = en.categories as Record<string, string>;

export function isDmvState(code: unknown): code is string {
  return typeof code === "string" && states.some((s) => s.code === code);
}

export function classExamInfo(examId: string, state?: string | null): ClassExamInfo | undefined {
  if (examId === DMV_EXAM_ID) {
    const st = states.find((s) => s.code === state);
    return {
      id: examId,
      kind: "dmv",
      name: st ? `${st.name} DMV Permit Test` : "DMV Permit Test",
      home: "/dmv/dashboard",
      passPct: st?.passingScore ?? 70,
      topicLabel: (k) => DMV_TOPICS[k] ?? k,
    };
  }
  const v2 = EXAMS_V2.find((e) => e.id === examId);
  if (v2) {
    return { id: examId, kind: "v2", name: v2.name.replace(/ Practice Test$/, ""), home: `${v2.slug}/dashboard`, passPct: 70, topicLabel: (k) => v2.domainLabels[k] ?? k };
  }
  const v1 = getExamById(examId);
  if (v1) {
    return { id: examId, kind: "v1", name: classExamName(v1), home: `${v1.slug}/dashboard`, passPct: v1.passPct, topicLabel: (k) => v1.categoryLabels[k] ?? k };
  }
  return undefined;
}

export function isClassExamId(id: unknown): id is string {
  return typeof id === "string" && !!classExamInfo(id);
}

export function classExamName(exam: ExamConfig | undefined): string {
  return exam ? exam.name.replace(/ Practice Test$/, "") : "";
}

export function classExamNameById(id: string, state?: string | null): string {
  return classExamInfo(id, state)?.name ?? id;
}

/** Where a student lands after joining. */
export function classExamHome(examId: string): string {
  return classExamInfo(examId)?.home ?? "/tests";
}

export interface ClassExamChoice {
  /** Catalog id: "dmv", "cst", "sat", "realestate"... */
  id: string;
  name: string;
  org: string;
  /** DMV needs a state; real estate and insurance offer state versions. */
  states?: { id: string; code: string; name: string }[];
  stateRequired?: boolean;
}

/** Every test on the site, in the /tests hub's groups, for the class picker. */
export function classExamGroups(): { title: string; exams: ClassExamChoice[] }[] {
  return TEST_GROUPS.map((g) => ({
    title: g.title,
    exams: g.tests.map((t) => {
      if (t.id === DMV_EXAM_ID) {
        return { id: t.id, name: t.name, org: t.org, stateRequired: true, states: states.map((s) => ({ id: DMV_EXAM_ID, code: s.code, name: s.name })) };
      }
      const variants = EXAM_VARIANTS.filter((v) => v.variantOf === t.id && v.jurisdiction);
      return {
        id: t.id,
        name: t.name,
        org: t.org,
        ...(variants.length
          ? { states: variants.map((v) => ({ id: v.id, code: v.jurisdiction!.code, name: v.jurisdiction!.name })).sort((a, b) => a.name.localeCompare(b.name)) }
          : {}),
      };
    }),
  }));
}

// ─── API shapes ─────────────────────────────────────────────────────────────

export interface ClassPublicInfo {
  code: string;
  name: string;
  examId: string;
  /** DMV classes only: the state's 2-letter code. */
  state?: string;
  examName: string;
  teacherName: string;
  school: string;
}

export interface ClassSummary extends ClassPublicInfo {
  createdAt: string;
  memberCount: number;
}

export interface ClassStudentRow {
  name: string;
  joinedAt: string;
  lastActive: string | null;
  answered: number;
  correct: number;
  testsTaken: number;
  bestTest: { testNumber: number; pct: number } | null;
  detail: ClassStudentDetail;
}

/**
 * What one student needs help with, for the drill-down from the class page.
 * Topic accuracy is only judged once a topic has STUDENT_TOPIC_MIN_ANSWERS
 * answers, and the "needs help" call waits for STUDENT_MIN_ANSWERS overall,
 * so a handful of answers never brands a topic weak.
 */
export interface ClassStudentDetail {
  /**
   * Every topic the student answered, weakest first; `judged` false below the
   * minimum. `othersPct` is the rest of the class (null when nobody else answered it).
   */
  topics: { key: string; label: string; answered: number; correct: number; othersPct: number | null; judged: boolean }[];
  /** Judged topics below the pass line, weakest first, at most three. Empty until STUDENT_MIN_ANSWERS. */
  focus: string[];
  /** Questions the student missed (ids into ClassReport.questions), most-missed first. */
  missed: { questionId: string; missed: number; answered: number }[];
  tests: { testNumber: number; best: number; last: number | null; attempts: number }[];
}

export const STUDENT_MIN_ANSWERS = 20;
export const STUDENT_TOPIC_MIN_ANSWERS = 5;

export interface ClassQuestionRow {
  questionId: string;
  question: string;
  options: string[];
  /** The correct option's text. */
  answer: string;
  topic: string;
  explanation: string;
  answered: number;
  missed: number;
}

export interface ClassReport extends ClassSummary {
  passPct: number;
  answered: number;
  correct: number;
  activeThisWeek: number;
  passedATest: number;
  topics: { key: string; label: string; answered: number; correct: number }[];
  /** Every question the class answered, most-missed first. */
  questions: ClassQuestionRow[];
  students: ClassStudentRow[];
}

// ─── Progress events (client → /api/classes/[code]/progress) ───────────────

export interface ClassAnswerEvent {
  /** questionId */
  q: string;
  /** category key */
  c: string;
  /** answered correctly */
  ok: boolean;
}

export interface ClassTestEvent {
  testNumber: number;
  correct: number;
  total: number;
}

export interface ClassProgressBody {
  memberId: string;
  answers?: ClassAnswerEvent[];
  tests?: ClassTestEvent[];
}
