import type { Metadata } from "next";
import { QuizHome } from "@/components/quiz/QuizHome";
import { normalizeQuizCode } from "@/lib/quizzes";

export const metadata: Metadata = { title: "Quiz dashboard", robots: { index: false, follow: false } };

export default async function QuizDashboardPage({ params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  return <QuizHome code={code} initial={null} />;
}
