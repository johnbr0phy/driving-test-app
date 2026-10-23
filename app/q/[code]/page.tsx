import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { getQuiz } from "@/lib/server/quizzes";
import { QUIZ_PUBLIC_MIN_PLAYS, isQuizCode, normalizeQuizCode, quizPublic, type QuizDoc } from "@/lib/quizzes";
import { QuizLanding } from "@/components/quiz/QuizLanding";

// A quiz's home, tigertest.io/q/<code>: rendered on the server so a shared
// link carries the quiz's own title and description. A private quiz is sent
// to the client empty, which fetches it with the owner's token.

const SITE = "https://tigertest.io";

type Loaded = { ok: true; quiz: QuizDoc | null } | { ok: false };

/** One Firestore read for metadata and the page. `ok: false` means the admin SDK could not run (no key locally). */
const loadQuizDoc = cache(async (code: string): Promise<Loaded> => {
  try {
    return { ok: true, quiz: await getQuiz(code) };
  } catch (error) {
    console.error("quiz page: could not load", error);
    return { ok: false };
  }
});

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) notFound();
  const loaded = await loadQuizDoc(code);
  if (!loaded.ok) return { title: "TigerTest quiz", robots: { index: false, follow: false } };
  const { quiz } = loaded;
  if (!quiz) notFound();
  const canonical = `${SITE}/q/${code}`;
  if (quiz.visibility === "private") {
    return { title: "Private quiz | TigerTest", alternates: { canonical }, robots: { index: false, follow: false } };
  }
  const title = `${quiz.title} | TigerTest quiz`;
  const description = quiz.description || `${quiz.questions.length} practice questions on ${quiz.title}`;
  const indexable = quiz.visibility === "public" && (quiz.plays ?? 0) >= QUIZ_PUBLIC_MIN_PLAYS;
  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url: canonical, siteName: "TigerTest", type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function QuizPage({ params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) notFound();
  const loaded = await loadQuizDoc(code);
  if (loaded.ok && !loaded.quiz) notFound();
  const quiz = loaded.ok ? loaded.quiz : null;
  const initial = quiz && quiz.visibility !== "private" ? quizPublic(quiz) : null;
  return <QuizLanding code={code} initial={initial} />;
}
