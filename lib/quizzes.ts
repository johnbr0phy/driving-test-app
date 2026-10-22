import type { Question, QuestionCategory } from "@/types";
import { CLASS_CODE_ALPHABET, cleanName } from "@/lib/classes";

// Quizzes: anyone with an account turns their own material into a TigerTest
// practice test. A quiz is made on /create (paste notes, import a Quizlet
// set, or write questions by hand), from Claude or ChatGPT through the MCP
// server (create_quiz), and played at tigertest.io/q/<code> in three modes:
// Practice (the mastery engine with the wrong-answer queue), Test (every
// question once, no feedback until the end) and Flashcards.
//
// Sharing works like instructor classes (lib/classes.ts): a player who gives
// a name on the quiz page becomes a member of the quiz, and their practice is
// reported to quizzes/{code}/members/{memberId} with the same shape a class
// member has, so the creator's report (/q/<code>/report) is the class report
// pointed at the quiz. Anonymous play only counts in `plays`.
//
// Firestore: quizzes/{code} = QuizDoc below. Every write goes through
// /api/quizzes/* with the admin SDK; the client never writes a quiz directly.
// Progress lives in store/useQuizStore.ts (localStorage, mirrored to
// users/{uid}.quizProgress).

export const QUIZ_CODE_LENGTH = 6;
// Same alphabet as class codes (no 0/O, 1/I/L) so a code reads aloud cleanly;
// one character longer so a quiz code is never mistaken for a class code.
export const QUIZ_CODE_ALPHABET = CLASS_CODE_ALPHABET;

export const QUIZ_OPTION_COUNT = 4;
export const QUIZ_MIN_QUESTIONS = 3;
export const QUIZ_MAX_TITLE = 80;
export const QUIZ_MAX_DESCRIPTION = 300;
export const QUIZ_MAX_QUESTION_TEXT = 500;
export const QUIZ_MAX_OPTION_TEXT = 200;
export const QUIZ_MAX_EXPLANATION = 600;
export const QUIZ_MAX_TOPIC = 40;
export const QUIZ_MAX_MEMBERS = 500;
/** A test runs the whole quiz, up to this many questions in one sitting. */
export const QUIZ_TEST_MAX_QUESTIONS = 50;
export const QUIZ_DEFAULT_PASS_PCT = 80;
/** Public quizzes are listed and indexed once this many people have played them. */
export const QUIZ_PUBLIC_MIN_PLAYS = 5;

/** What a free account and a Premium account can make. Creator reports are free, like classes. */
export const QUIZ_LIMITS = {
  free: { quizzes: 3, questions: 50, generationsPerDay: 5 },
  premium: { quizzes: 100, questions: 200, generationsPerDay: 50 },
} as const;

export type QuizVisibility = "private" | "link" | "public";
export const QUIZ_VISIBILITIES: QuizVisibility[] = ["private", "link", "public"];
export type QuizCreatedVia = "web" | "mcp" | "import";

export interface QuizQuestion {
  /** Stable within the quiz ("q1".."qN"); never reused after a delete. */
  id: string;
  question: string;
  /** Exactly four. */
  options: string[];
  /** 0-3 */
  correctIndex: number;
  explanation: string;
  /** Short label the creator or the AI gave, e.g. "Cell biology". Optional. */
  topic?: string;
}

export interface QuizDoc {
  code: string;
  title: string;
  description: string;
  ownerUid: string;
  ownerName: string;
  visibility: QuizVisibility;
  passPct: number;
  questions: QuizQuestion[];
  createdVia: QuizCreatedVia;
  createdAt: string;
  updatedAt: string;
  /** Browsers that answered at least one question (once per browser). */
  plays: number;
  /** Players who gave a name (members). */
  memberCount: number;
  /** Bad-question reports received. */
  reports: number;
  /** Next question id number, so ids stay unique across edits. */
  nextQuestionId: number;
  /**
   * `plays` while the quiz is public, absent otherwise, so the library and
   * the sitemap can order public quizzes with a single-field index.
   */
  publicRank?: number;
  /** Set by a site admin: listed in the library and the sitemap before QUIZ_PUBLIC_MIN_PLAYS plays, and shown first. */
  featured?: boolean;
}

/** What the play page gets (never the owner's uid). */
export interface QuizPublic {
  code: string;
  title: string;
  description: string;
  ownerName: string;
  visibility: QuizVisibility;
  passPct: number;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
  plays: number;
  memberCount: number;
  featured?: boolean;
  /** True when the caller is the owner (owner-only fields are then included). */
  mine?: boolean;
  reports?: number;
}

export interface QuizSummary {
  code: string;
  title: string;
  description: string;
  ownerName: string;
  visibility: QuizVisibility;
  questionCount: number;
  plays: number;
  memberCount: number;
  reports: number;
  createdAt: string;
  updatedAt: string;
  topics: string[];
  featured?: boolean;
}

/** A question as the creation UI and the MCP tools send it (no id yet). */
export interface QuizQuestionInput {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topic?: string;
}

export function isQuizCode(code: unknown): code is string {
  return typeof code === "string" && new RegExp(`^[${QUIZ_CODE_ALPHABET}]{${QUIZ_CODE_LENGTH}}$`).test(code);
}

export function normalizeQuizCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isQuizVisibility(v: unknown): v is QuizVisibility {
  return typeof v === "string" && (QUIZ_VISIBILITIES as string[]).includes(v);
}

function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function cleanQuizTitle(value: unknown): string {
  return cleanText(value, QUIZ_MAX_TITLE);
}

export function cleanQuizDescription(value: unknown): string {
  return cleanText(value, QUIZ_MAX_DESCRIPTION);
}

export function cleanOwnerName(value: unknown): string {
  return cleanName(value);
}

/**
 * Validate one question from a form, an import or an MCP call. Returns the
 * cleaned question or a readable reason it was rejected.
 */
export function validateQuizQuestion(raw: unknown): { ok: true; question: QuizQuestionInput } | { ok: false; error: string } {
  const x = (raw ?? {}) as Record<string, unknown>;
  const question = cleanText(x.question, QUIZ_MAX_QUESTION_TEXT);
  if (!question) return { ok: false, error: "A question has no text" };
  const options = Array.isArray(x.options) ? x.options.map((o) => cleanText(o, QUIZ_MAX_OPTION_TEXT)) : [];
  if (options.length !== QUIZ_OPTION_COUNT) return { ok: false, error: `"${question.slice(0, 40)}" needs exactly ${QUIZ_OPTION_COUNT} options` };
  if (options.some((o) => !o)) return { ok: false, error: `"${question.slice(0, 40)}" has an empty option` };
  if (new Set(options.map((o) => o.toLowerCase())).size !== options.length) {
    return { ok: false, error: `"${question.slice(0, 40)}" has two options that are the same` };
  }
  const correctIndex = Number(x.correctIndex);
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= QUIZ_OPTION_COUNT) {
    return { ok: false, error: `"${question.slice(0, 40)}" needs a correct answer` };
  }
  const explanation = cleanText(x.explanation, QUIZ_MAX_EXPLANATION);
  const topic = cleanText(x.topic, QUIZ_MAX_TOPIC);
  return { ok: true, question: { question, options, correctIndex, explanation, ...(topic ? { topic } : {}) } };
}

export function validateQuizQuestions(raw: unknown, max: number): { ok: true; questions: QuizQuestionInput[] } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: "Add at least one question" };
  if (raw.length > max) return { ok: false, error: `A quiz can have up to ${max} questions on your plan` };
  const questions: QuizQuestionInput[] = [];
  for (const q of raw) {
    const r = validateQuizQuestion(q);
    if (!r.ok) return r;
    questions.push(r.question);
  }
  return { ok: true, questions };
}

export function clampPassPct(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return QUIZ_DEFAULT_PASS_PCT;
  return Math.min(100, Math.max(50, Math.round(n)));
}

/** Distinct topics in the order they first appear. */
export function quizTopics(questions: Pick<QuizQuestion, "topic">[]): string[] {
  const seen = new Set<string>();
  for (const q of questions) if (q.topic && !seen.has(q.topic)) seen.add(q.topic);
  return [...seen];
}

export function quizSummary(doc: QuizDoc): QuizSummary {
  return {
    code: doc.code,
    title: doc.title,
    description: doc.description,
    ownerName: doc.ownerName,
    visibility: doc.visibility,
    questionCount: doc.questions.length,
    plays: doc.plays ?? 0,
    memberCount: doc.memberCount ?? 0,
    reports: doc.reports ?? 0,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    topics: quizTopics(doc.questions),
    ...(doc.featured ? { featured: true } : {}),
  };
}

export function quizPublic(doc: QuizDoc, mine = false): QuizPublic {
  return {
    code: doc.code,
    title: doc.title,
    description: doc.description,
    ownerName: doc.ownerName,
    visibility: doc.visibility,
    passPct: doc.passPct ?? QUIZ_DEFAULT_PASS_PCT,
    questions: doc.questions,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    plays: doc.plays ?? 0,
    memberCount: doc.memberCount ?? 0,
    ...(doc.featured ? { featured: true } : {}),
    ...(mine ? { mine: true, reports: doc.reports ?? 0 } : {}),
  };
}

// ─── Playing: a quiz question as the v1 engine's Question ───────────────────

const LETTERS = ["A", "B", "C", "D"];
export const QUIZ_STATE_CODE = "QUIZ";

/** The engine's question id: "<code>-<question id>", unique across quizzes. */
export function quizQuestionId(code: string, id: string): string {
  return `${code}-${id}`;
}

export function toEngineQuestion(code: string, q: QuizQuestion): Question {
  return {
    type: "Universal",
    state: QUIZ_STATE_CODE,
    questionId: quizQuestionId(code, q.id),
    // Topics are free text; the engine only passes the category through.
    category: (q.topic ?? "general") as QuestionCategory,
    question: q.question,
    optionA: q.options[0],
    optionB: q.options[1],
    optionC: q.options[2],
    optionD: q.options[3],
    correctAnswer: LETTERS[q.correctIndex],
    correctIndex: q.correctIndex,
    explanation: q.explanation || `The answer is ${q.options[q.correctIndex]}.`,
  };
}

export function quizEngineQuestions(quiz: Pick<QuizPublic, "code" | "questions">): Question[] {
  return quiz.questions.map((q) => toEngineQuestion(quiz.code, q));
}

// ─── Links ──────────────────────────────────────────────────────────────────

export function quizPath(code: string): string {
  return `/q/${code}`;
}

export function quizUrl(code: string): string {
  const origin = typeof window === "undefined" ? "https://tigertest.io" : window.location.origin;
  return `${origin}${quizPath(code)}`;
}

/** "tigertest.io/q/ABC234", for showing. */
export function quizLink(code: string): string {
  return quizUrl(code).replace(/^https?:\/\/(www\.)?/, "");
}

/** The examId the class-progress queue reports a quiz under. */
export function quizExamId(code: string): string {
  return `quiz:${code}`;
}

// ─── Quizlet import ─────────────────────────────────────────────────────────

/**
 * Parse a Quizlet export (or any term/definition list). Quizlet's export
 * dialog offers "Tab" or "Comma" between term and definition and "New line"
 * or "Semicolon" between cards; the default is tab and new line. Lines that
 * do not split into two parts are skipped.
 */
export function parseTermList(text: string): { term: string; definition: string }[] {
  const out: { term: string; definition: string }[] = [];
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  // Quizlet's "Semicolon" between-cards option puts the whole set on one line.
  const cards = lines.length === 1 && lines[0].includes(";") ? lines[0].split(";") : lines;
  for (const raw of cards) {
    const line = raw.trim();
    if (!line) continue;
    let parts: string[];
    if (line.includes("\t")) parts = line.split("\t");
    else if (line.includes(" - ")) parts = line.split(" - ");
    else if (line.includes(",")) parts = [line.slice(0, line.indexOf(",")), line.slice(line.indexOf(",") + 1)];
    else if (line.includes(":")) parts = [line.slice(0, line.indexOf(":")), line.slice(line.indexOf(":") + 1)];
    else continue;
    const term = parts[0].trim();
    const definition = parts.slice(1).join(" ").trim();
    if (term && definition) out.push({ term, definition });
  }
  return out;
}

/** Seeded shuffle so an import gives the same quiz for the same list. */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Turn term/definition pairs into four-option questions: "Which is the
 * definition of <term>?" with the other cards' definitions as distractors
 * (needs at least four cards). Long definitions become the stem instead,
 * asking for the term, so the options stay short.
 */
export function termsToQuestions(pairs: { term: string; definition: string }[], topic?: string): QuizQuestionInput[] {
  if (pairs.length < QUIZ_OPTION_COUNT) return [];
  const out: QuizQuestionInput[] = [];
  pairs.forEach((pair, i) => {
    const askForTerm = pair.definition.length > 90;
    const answer = askForTerm ? pair.term : pair.definition;
    const pool = pairs.filter((p, j) => j !== i && (askForTerm ? p.term : p.definition).toLowerCase() !== answer.toLowerCase());
    const distractors = seededShuffle(pool, i + 7)
      .map((p) => (askForTerm ? p.term : p.definition))
      .filter((d, idx, arr) => arr.indexOf(d) === idx)
      .slice(0, QUIZ_OPTION_COUNT - 1);
    if (distractors.length < QUIZ_OPTION_COUNT - 1) return;
    const options = seededShuffle([answer, ...distractors], i + 13);
    out.push({
      question: askForTerm ? pair.definition : `Which of these is the definition of "${pair.term}"?`,
      options,
      correctIndex: options.indexOf(answer),
      explanation: askForTerm ? `${pair.term}: ${pair.definition}` : `${pair.term} means: ${pair.definition}`,
      ...(topic ? { topic } : {}),
    });
  });
  return out;
}
