import { QuizSync } from "@/components/quiz/QuizSync";

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
