import type { Metadata } from "next";
import { QuizSync } from "@/components/quiz/QuizSync";

// /q itself (type a code) is a client page with nothing to rank, so it gets its
// own title and stays out of the index, as do the play modes under it.
// /q/<code> sets its own title and robots.
export const metadata: Metadata = {
  title: "Quiz",
  robots: { index: false, follow: true },
};

// Every quiz page (/q/<code> and its play modes): keep the quiz store in step
// with the signed-in account.
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QuizSync />
      {children}
    </>
  );
}
