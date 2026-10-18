import { ALL_EXAMS, EXAMS, EXAM_VARIANTS, getExamById, type ExamConfig } from "@/lib/exams";

// Instructor classes: a teacher makes a class for one registry exam and posts
// its link (tigertest.io/c/<code>); students join with a name, no account,
// and their practice on that exam is reported to the class. Shared by the
// /api/classes routes, the join page, the teacher pages and lib/classProgress.
//
// Firestore: classes/{code} = { code, name, examId, teacherUid, teacherName,
// school, createdAt, memberCount }, and classes/{code}/members/{memberId} =
// { name, joinedAt, lastActive, answered, correct, byCategory, missed, tests }.
// memberId is a random id the student's browser keeps; it doubles as the
// secret that lets only that browser report progress for that student.

export const CLASS_CODE_LENGTH = 5;
// No 0/O, 1/I/L: codes get read aloud and typed from a projector.
export const CLASS_CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export const MAX_CLASS_MEMBERS = 200;
export const MAX_CLASSES_PER_TEACHER = 30;
export const MAX_NAME_LENGTH = 40;

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

/** Exams a class can be made for: every registry exam and state version (v1 only for now). */
export function classExams(): { group: string; exams: ExamConfig[] }[] {
  return [
    { group: "Exams", exams: [...EXAMS].sort((a, b) => classExamName(a).localeCompare(classExamName(b))) },
    { group: "State versions", exams: [...EXAM_VARIANTS].sort((a, b) => classExamName(a).localeCompare(classExamName(b))) },
  ];
}

export function isClassExamId(id: unknown): id is string {
  return typeof id === "string" && ALL_EXAMS.some((e) => e.id === id);
}

export function classExamName(exam: ExamConfig | undefined): string {
  return exam ? exam.name.replace(/ Practice Test$/, "") : "";
}

export function classExamNameById(id: string): string {
  return classExamName(getExamById(id));
}

/** Where a student lands after joining: the exam's dashboard. */
export function classExamHome(examId: string): string {
  const exam = getExamById(examId);
  return exam ? `${exam.slug}/dashboard` : "/tests";
}

// ─── API shapes ─────────────────────────────────────────────────────────────

export interface ClassPublicInfo {
  code: string;
  name: string;
  examId: string;
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
}

export interface ClassReport extends ClassSummary {
  passPct: number;
  answered: number;
  correct: number;
  activeThisWeek: number;
  passedATest: number;
  topics: { key: string; label: string; answered: number; correct: number }[];
  mostMissed: { questionId: string; question: string; answer: string; misses: number }[];
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
