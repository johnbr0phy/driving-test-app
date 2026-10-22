import Anthropic from "@anthropic-ai/sdk";
import { FieldValue, type Firestore } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { QUIZ_OPTION_COUNT, cleanQuizTitle, validateQuizQuestion, type QuizQuestionInput } from "@/lib/quizzes";
import { QuizError, bumpCounter, quizLimits } from "@/lib/server/quizzes";

// Turn pasted material (notes, a chapter, a syllabus, a term list) into
// four-option questions with explanations, for /create's paste box. The MCP
// path does not use this: there, Claude or ChatGPT writes the questions
// itself and calls create_quiz. Per-account daily quota in users/{uid}.quizGen.

export const GENERATE_MODEL = "claude-sonnet-5-5";
export const GENERATE_MAX_CHARS = 24_000;
export const GENERATE_MIN_COUNT = 5;
export const GENERATE_MAX_COUNT = 50;

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

/** How many questions a piece of text supports: about one per 60 words, within bounds. */
export function suggestedCount(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(GENERATE_MIN_COUNT, Math.min(GENERATE_MAX_COUNT, Math.round(words / 60)));
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
async function takeQuota(db: Firestore, uid: string, isPremium: boolean): Promise<void> {
  const limit = quizLimits(isPremium).generationsPerDay;
  const day = new Date().toISOString().slice(0, 10);
  const ref = db.collection("users").doc(uid);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
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
    tx.set(ref, { quizGen: { day, count: count + 1 } }, { merge: true });
  });
}

export async function generateQuiz(
  owner: { uid: string; isPremium: boolean },
  input: { text: unknown; count?: unknown; title?: unknown },
  db: Firestore = getAdminDb(),
): Promise<GeneratedQuiz> {
  if (!process.env.ANTHROPIC_API_KEY) throw new QuizError("Quiz generation is not set up on this server.", 503);
  const text = typeof input.text === "string" ? input.text.trim().slice(0, GENERATE_MAX_CHARS) : "";
  if (text.split(/\s+/).length < 30) throw new QuizError("Paste at least a paragraph or so of material (30 words or more).");
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
