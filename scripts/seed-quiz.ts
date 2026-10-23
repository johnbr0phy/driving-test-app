/**
 * Seed (or update) a quiz from a JSON file for an account, by email.
 *
 *   FIREBASE_SERVICE_ACCOUNT_KEY='{...}' npx tsx scripts/seed-quiz.ts john@johnbrophy.net data/quizzes/british-meanings.json [--featured]
 *
 * The file is { title, description?, visibility?, passPct?, questions: QuizQuestionInput[] }.
 * A quiz the account already owns with the same title is updated in place
 * (its code and players' progress are kept); otherwise one is created.
 * --featured lists it in the /quizzes library straight away (admin's pick).
 */
import { readFileSync } from "node:fs";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createQuiz, isPremiumUid, listMyQuizzes, setQuizFeatured, updateQuiz } from "@/lib/server/quizzes";
import { quizUrl, validateQuizQuestions } from "@/lib/quizzes";

async function main() {
  const [email, file, ...flags] = process.argv.slice(2);
  if (!email || !file) {
    console.error("usage: npx tsx scripts/seed-quiz.ts <ownerEmail> <quiz.json> [--featured]");
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(file, "utf8"));
  const validated = validateQuizQuestions(data.questions, 500);
  if (!validated.ok) throw new Error(validated.error);
  // Letter balance, as a courtesy check.
  const counts = [0, 0, 0, 0];
  for (const q of validated.questions) counts[q.correctIndex]++;
  console.log(`${validated.questions.length} questions, correct letter counts A/B/C/D: ${counts.join("/")}`);

  const user = await getAdminAuth().getUserByEmail(email);
  const owner = { uid: user.uid, name: user.displayName ?? email.split("@")[0], isPremium: await isPremiumUid(user.uid) };
  const existing = (await listMyQuizzes(user.uid)).find((q) => q.title === data.title);
  const input = { title: data.title, description: data.description, questions: data.questions, visibility: data.visibility, passPct: data.passPct };
  const quiz = existing
    ? await updateQuiz(owner, existing.code, input)
    : await createQuiz(owner, { ...input, createdVia: "import" });
  if (flags.includes("--featured")) await setQuizFeatured(quiz.code, true);
  console.log(`${existing ? "updated" : "created"} ${quiz.code}: ${quizUrl(quiz.code)}${flags.includes("--featured") ? " (featured)" : ""}`);
  await getAdminDb().terminate();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
