import Anthropic from "@anthropic-ai/sdk";
import { FieldValue, type Firestore } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { QUIZ_OPTION_COUNT, cleanQuizTitle, validateQuizQuestion, type QuizQuestionInput } from "@/lib/quizzes";
import { QuizError, bumpCounter, quizLimits } from "@/lib/server/quizzes";
import { GENERATE_MAX_CHARS, GENERATE_MAX_COUNT, GENERATE_MIN_COUNT, GENERATE_MIN_WORDS, suggestedCount } from "@/lib/quizGenerateLimits";

export { GENERATE_MAX_CHARS, suggestedCount };

// Turn pasted material (notes, a chapter, a syllabus, a term list) into
// four-option questions with explanations, for /create's paste box. The MCP
// path does not use this: there, Claude or ChatGPT writes the questions
// itself and calls create_quiz. Per-account daily quota in users/{uid}.quizGen.

export const GENERATE_MODEL = "claude-sonnet-5-5";

const SYSTEM = `You write multiple-choice practice questions for TigerTest, a study site. You will be given study material and a number of questions to write.

Rules:
- Every question is answerable from the material. Never invent facts that are not in it. If the material supports fewer good questions than asked, write fewer.
- Exactly ${QUIZ_OPTION_COUNT} options per question, one correct. Wrong options are plausible, the same length and style as the right one, and never "all of the above" or "none of the above".
- Vary the position of the correct answer.
- Each question tests one idea. No trick questions, no negatives like "which is NOT".
- The explanation is one or two sentences saying why the answer is right, in plain words.
- Give each question a short topic label (one to three words) from the material, reusing labels so a 20-question quiz has about 3 to 6 topics.
- Suggest a title (under 60 characters) and a one-sentence description for the quiz.

Reply with JSON only, no prose, in this shape:
{"title": "...", "description": "...", "questions": [{"question": "...", "options": ["...","...","...","..."], "correctIndex": 0, "explanation": "...", "topic": "..."}]}`;

export interface GeneratedQuiz {
  title: string;
  description: string;
  questions: QuizQuestionInput[];
}

function parseGenerated(text: string): GeneratedQuiz {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new QuizError("The questions came back in an unexpected shape. Try again.", 502);
  let parsed: { title?: unknown; description?: unknown; questions?: unknown };
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    throw new QuizError("The questions came back in an unexpected shape. Try again.", 502);
  }
  const questions: QuizQuestionInput[] = [];
  for (const raw of Array.isArray(parsed.questions) ? parsed.questions : []) {
    const r = validateQuizQuestion(raw);
    if (r.ok) questions.push(r.question);
  }
  if (!questions.length) throw new QuizError("No usable questions came back. Try pasting more material.", 502);
  return {
    title: cleanQuizTitle(parsed.title) || "Untitled quiz",
    description: typeof parsed.description === "string" ? parsed.description.trim().slice(0, 300) : "",
    questions,
  };
}

/** Today's generations for the account, enforced before the call and counted after. */
/**
 * Site-wide ceiling on generations a day, since every paste-box call runs on
 * our key (about 4 cents each on Sonnet). Default 500, about $25 a day at the
 * worst; QUIZ_GEN_DAILY_CAP overrides it. The per-account quota is the first
 * line; this is the backstop against a signup wave. Counted in
 * analytics/quizzes.gen = { day, count }.
 */
export const GENERATE_SITE_DAILY_CAP = Math.max(1, Number(process.env.QUIZ_GEN_DAILY_CAP) || 500);

export const SITE_CAP_MESSAGE =
  "The quiz writer has hit its daily limit. Try again tomorrow, paste a Quizlet export instead, or have Claude or ChatGPT write it through the TigerTest connector (tigertest.io/connect).";

async function takeQuota(db: Firestore, uid: string, isPremium: boolean): Promise<void> {
  const limit = quizLimits(isPremium).generationsPerDay;
  const day = new Date().toISOString().slice(0, 10);
  const userRef = db.collection("users").doc(uid);
  const siteRef = db.collection("analytics").doc("quizzes");
  await db.runTransaction(async (tx) => {
    const [snap, site] = await Promise.all([tx.get(userRef), tx.get(siteRef)]);
    const gen = (snap.data()?.quizGen ?? {}) as { day?: string; count?: number };
    const count = gen.day === day ? gen.count ?? 0 : 0;
    if (count >= limit) {
      throw new QuizError(
        isPremium
          ? `You've used today's ${limit} quiz generations. Try again tomorrow.`
          : `Free accounts get ${limit} quiz generations a day. Try again tomorrow, or get Premium for ${quizLimits(true).generationsPerDay}.`,
        429,
      );
    }
    const siteGen = (site.data()?.gen ?? {}) as { day?: string; count?: number };
    const siteCount = siteGen.day === day ? siteGen.count ?? 0 : 0;
    if (siteCount >= GENERATE_SITE_DAILY_CAP) throw new QuizError(SITE_CAP_MESSAGE, 503);
    tx.set(userRef, { quizGen: { day, count: count + 1 } }, { merge: true });
    tx.set(siteRef, { gen: { day, count: siteCount + 1 } }, { merge: true });
  });
}

export async function generateQuiz(
  owner: { uid: string; isPremium: boolean },
  input: { text: unknown; count?: unknown; title?: unknown },
  db: Firestore = getAdminDb(),
): Promise<GeneratedQuiz> {
  if (!process.env.ANTHROPIC_API_KEY) throw new QuizError("Quiz generation is not set up on this server.", 503);
  const text = typeof input.text === "string" ? input.text.trim().slice(0, GENERATE_MAX_CHARS) : "";
  if (text.split(/\s+/).length < GENERATE_MIN_WORDS) throw new QuizError(`Paste at least a paragraph or so of material (${GENERATE_MIN_WORDS} words or more).`);
  const requested = Number(input.count);
  const count = Number.isInteger(requested) ? Math.max(GENERATE_MIN_COUNT, Math.min(GENERATE_MAX_COUNT, requested)) : suggestedCount(text);
  const hint = cleanQuizTitle(input.title);

  await takeQuota(db, owner.uid, owner.isPremium);

  const client = new Anthropic();
  const response = await client.messages.create({
    model: GENERATE_MODEL,
    max_tokens: 12_000,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Write ${count} questions.${hint ? ` The quiz is called "${hint}".` : ""}\n\nMaterial:\n"""\n${text}\n"""`,
      },
    ],
  });
  if (response.stop_reason === "refusal") throw new QuizError("That material can't be turned into a quiz here.", 422);
  const out = parseGenerated(response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("\n"));
  await bumpCounter(db, "generated");
  await db.collection("analytics").doc("quizzes").set({ generatedQuestions: FieldValue.increment(out.questions.length) }, { merge: true }).catch(() => {});
  if (hint) out.title = hint;
  return out;
}
