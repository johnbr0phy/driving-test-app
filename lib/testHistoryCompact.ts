// Finished practice tests are kept forever in users/{uid}.completedTests, and
// each one used to carry its 50 full question objects (about 27 KB). A retake
// of a test is the same questions with the options in another order, so an
// account that kept practising walked toward Firestore's 1 MiB document limit
// (about 30 finished tests), after which every save failed.
//
// Stored form: the latest attempt of each test keeps its questions in full, and
// an older attempt of the same test stores each question as a pointer to that
// attempt plus its own option order ("slim"). Nothing is dropped: a question
// is only stored slim when rebuilding it from the reference gives back exactly
// the object it replaces, checked field by field at the moment it is written.
// Anything that does not rebuild exactly (the bank changed between attempts,
// another language) stays in full.
//
// In memory everything is always full: expandCompletedTests() runs on load and
// compactCompletedTests() only on the copy sent to Firestore.
//
// Pure and dependency-free: the browser store and the server both use it.

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };
type QuestionLike = { [key: string]: Json } & { questionId?: string };

interface SessionLike {
  id?: unknown;
  testNumber?: unknown;
  state?: unknown;
  questions?: unknown;
  /** Id of the attempt whose full questions this one's slim questions point at. */
  qref?: unknown;
  [key: string]: unknown;
}

/** A question stored as a pointer: its id, where each option sits in the
 *  reference question (`p`, e.g. "2031"), and any field that still differs. */
export interface SlimQuestion {
  questionId: string;
  p: string;
  /** Fields whose value differs from the rebuilt question. */
  d?: { [key: string]: Json };
  /** Fields the rebuilt question has and the original did not. */
  x?: string[];
}

const OPTION_KEYS = ["optionA", "optionB", "optionC", "optionD"] as const;
const LETTERS = "ABCD";

export function isSlimQuestion(q: unknown): q is SlimQuestion {
  if (!q || typeof q !== "object") return false;
  const v = q as { p?: unknown; question?: unknown; questionId?: unknown };
  return typeof v.p === "string" && typeof v.questionId === "string" && v.question === undefined;
}

function stable(value: Json): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") {
    const keys = Object.keys(value).filter((k) => value[k] !== undefined).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stable(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

/** The reference question with its options moved to the positions in `p`. */
function permute(ref: QuestionLike, p: string): QuestionLike {
  const out: QuestionLike = { ...ref };
  OPTION_KEYS.forEach((key, i) => {
    out[key] = ref[OPTION_KEYS[Number(p[i])]];
  });
  const correct = typeof ref.correctIndex === "number" ? p.indexOf(String(ref.correctIndex)) : -1;
  if (correct >= 0) {
    out.correctIndex = correct;
    out.correctAnswer = LETTERS[correct];
  }
  if (typeof ref.optionOrder === "string" && ref.optionOrder.length === 4) {
    out.optionOrder = [...p].map((d) => (ref.optionOrder as string)[Number(d)]).join("");
  }
  return out;
}

function rebuild(slim: SlimQuestion, ref: QuestionLike): QuestionLike {
  const out = { ...permute(ref, slim.p), ...(slim.d ?? {}) };
  for (const key of slim.x ?? []) delete out[key];
  // Firestore refuses a field set to undefined, and this object may be written
  // in full again one day: an absent field must stay absent.
  for (const key of Object.keys(out)) {
    if (out[key] === undefined) delete out[key];
  }
  return out;
}

/** Where each of `q`'s options sits in `ref`, or null when they are not the same four. */
function permutationOf(q: QuestionLike, ref: QuestionLike): string | null {
  const used = new Set<number>();
  let p = "";
  for (const key of OPTION_KEYS) {
    const text = q[key];
    if (typeof text !== "string") return null;
    const at = OPTION_KEYS.findIndex((k, j) => !used.has(j) && ref[k] === text);
    if (at < 0) return null;
    used.add(at);
    p += at;
  }
  return p;
}

/** Only values that survive storage unchanged: no NaN, Date or class instance. */
function isPlain(value: unknown): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isPlain);
  if (typeof value === "object") {
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) return false;
    return Object.values(value as object).every((v) => v === undefined || isPlain(v));
  }
  return value === undefined;
}

function slimOf(q: QuestionLike, ref: QuestionLike): SlimQuestion | null {
  if (typeof q.questionId !== "string" || q.questionId !== ref.questionId) return null;
  // Equality below is judged on the JSON form, so only JSON-exact values qualify.
  if (!isPlain(q) || !isPlain(ref)) return null;
  const p = permutationOf(q, ref);
  if (!p) return null;
  const base = permute(ref, p);
  const d: { [key: string]: Json } = {};
  const x: string[] = [];
  for (const key of Object.keys(q)) {
    if (q[key] !== undefined && stable(q[key]) !== stable(base[key])) d[key] = q[key];
  }
  for (const key of Object.keys(base)) {
    if (base[key] !== undefined && q[key] === undefined) x.push(key);
  }
  const slim: SlimQuestion = { questionId: q.questionId, p };
  if (Object.keys(d).length) slim.d = d;
  if (x.length) slim.x = x;
  // The whole point: it must come back exactly, and it must be worth it.
  if (stable(rebuild(slim, ref)) !== stable(q)) return null;
  if (stable(slim as unknown as Json).length * 2 > stable(q).length) return null;
  return slim;
}

const questionsOf = (s: SessionLike): QuestionLike[] => (Array.isArray(s.questions) ? (s.questions as QuestionLike[]) : []);
const groupKey = (s: SessionLike) => `${String(s.state)}|${String(s.testNumber)}`;
const hasSlim = (s: SessionLike) => questionsOf(s).some(isSlimQuestion);

/** At least this share of an attempt's questions must become pointers for it
 *  to point at another attempt; otherwise it stays whole and others may point at it. */
const MIN_SHARE = 0.5;

function slimAgainst(s: SessionLike, ref: SessionLike): { questions: unknown[]; slimmed: number } {
  const refById = new Map(questionsOf(ref).map((q) => [q.questionId, q]));
  let slimmed = 0;
  const questions = questionsOf(s).map((q) => {
    const target = q && typeof q.questionId === "string" ? refById.get(q.questionId) : undefined;
    const slim = target ? slimOf(q, target) : null;
    if (slim) slimmed++;
    return slim ?? q;
  });
  return { questions, slimmed };
}

/**
 * The copy of completedTests to store. Within each test, working back from the
 * newest attempt: an attempt whose questions can be rebuilt from a newer whole
 * attempt points at it; one that cannot (first of its test, another language,
 * the bank changed since) stays whole and becomes something older attempts can
 * point at. The input is not changed. Array order (oldest first) and every
 * other field of every session are kept as they are.
 */
export function compactCompletedTests<T>(tests: T[]): T[] {
  if (!Array.isArray(tests) || tests.length < 2) return tests;
  const sessions = tests as unknown as SessionLike[];

  // A pointer is only safe when the session it names can be found again.
  const idCount = new Map<string, number>();
  for (const s of sessions) {
    if (typeof s?.id === "string") idCount.set(s.id, (idCount.get(s.id) ?? 0) + 1);
  }
  const canBePointedAt = (s: SessionLike) =>
    typeof s.id === "string" && idCount.get(s.id) === 1 && questionsOf(s).length > 0 && !hasSlim(s);

  // A session something already points at must stay whole.
  const pointedAt = new Set<string>();
  for (const s of sessions) {
    if (s && hasSlim(s) && typeof s.qref === "string") pointedAt.add(s.qref);
  }

  const out = sessions.slice();
  const anchors = new Map<string, SessionLike[]>(); // per test, newest first
  for (let i = sessions.length - 1; i >= 0; i--) {
    const s = sessions[i];
    // Left exactly as they are: already holding pointers, or carrying a qref of their own.
    if (!s || typeof s !== "object" || hasSlim(s) || "qref" in s) continue;
    const key = groupKey(s);
    const list = anchors.get(key) ?? [];
    const total = questionsOf(s).length;
    let pointed = false;
    if (total > 0 && !(typeof s.id === "string" && pointedAt.has(s.id))) {
      for (const ref of list) {
        const { questions, slimmed } = slimAgainst(s, ref);
        if (slimmed >= total * MIN_SHARE) {
          out[i] = { ...s, questions, qref: ref.id };
          pointed = true;
          break;
        }
      }
    }
    if (!pointed && canBePointedAt(s)) {
      list.push(s);
      anchors.set(key, list);
    }
  }
  return out as unknown as T[];
}

/**
 * The reverse: every slim question rebuilt in full from the attempt it points
 * at. A pointer that cannot be followed is left as it is (and so is stored
 * back unchanged), never replaced by a guess.
 */
export function expandCompletedTests<T>(tests: T[]): T[] {
  if (!Array.isArray(tests) || !tests.some((s) => s && hasSlim(s as unknown as SessionLike))) return tests;
  const sessions = tests as unknown as SessionLike[];
  const byId = new Map<string, SessionLike>();
  for (const s of sessions) {
    if (s && typeof s.id === "string" && !byId.has(s.id)) byId.set(s.id, s);
  }

  return sessions.map((s) => {
    if (!s || !hasSlim(s)) return s;
    const ref = typeof s.qref === "string" ? byId.get(s.qref) : undefined;
    if (!ref || ref === s) return s;
    const refById = new Map(
      questionsOf(ref)
        .filter((q) => !isSlimQuestion(q))
        .map((q) => [q.questionId, q]),
    );
    let left = 0;
    const questions = questionsOf(s).map((q) => {
      if (!isSlimQuestion(q)) return q;
      const target = refById.get(q.questionId);
      if (!target) {
        left++;
        return q;
      }
      return rebuild(q, target);
    });
    if (left > 0) return { ...s, questions };
    const { qref: _qref, ...rest } = s;
    return { ...rest, questions };
  }) as unknown as T[];
}
