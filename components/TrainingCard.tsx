import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnswerOption, type AnswerOptionState } from "@/components/question/AnswerOption";
import { AnswerFeedback } from "@/components/question/AnswerFeedback";
import { Question } from "@/types";
import { useState, useEffect, useId, useRef } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import { ReportExamQuestion } from "@/components/ReportExamQuestion";
import { QuestionImage } from "@/components/QuestionImage";

const READY_MS = 300;

interface TrainingCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  /** Exam id for "Report this question" under the explanation ("dmv" or a registry exam id). */
  reportExamId?: string;
}

export function TrainingCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  reportExamId,
}: TrainingCardProps) {
  const { t } = useTranslation();
  const headingId = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [question.questionId]);
  const [isReady, setIsReady] = useState(false);
  // When this question appeared and when the current press on an option began.
  // A press counts only if it began READY_MS after the question appeared, so the
  // second tap of a double tap on "Next Question" never answers the new question
  // (its press starts inside the window even when its click lands after it).
  const shownAt = useRef(0);
  const pressedAt = useRef<number | null>(null);

  useEffect(() => {
    shownAt.current = performance.now();
    pressedAt.current = null;
    setIsReady(false);
    const timer = setTimeout(() => setIsReady(true), READY_MS);
    return () => clearTimeout(timer);
  }, [question]);

  const choose = (letter: string, e: React.MouseEvent) => {
    // A keyboard press (detail 0) has no pointer down; it counts from now.
    const start = e.detail === 0 ? performance.now() : pressedAt.current ?? performance.now();
    pressedAt.current = null;
    if (answered || start - shownAt.current < READY_MS) return;
    onAnswerSelect(letter);
  };

  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const options = [
    { letter: "A", text: question.optionA },
    { letter: "B", text: question.optionB },
    { letter: "C", text: question.optionC },
    { letter: "D", text: question.optionD },
  ];

  const stateOf = (letter: string): AnswerOptionState => {
    if (!answered) return "idle";
    if (letter === question.correctAnswer) return "correct";
    if (letter === selectedAnswer) return "wrong";
    return "dim";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 md:p-8">
        <div className="flex items-start gap-4 mb-4 md:mb-6">
          <h2 id={headingId} ref={heading} tabIndex={-1} className="text-lg md:text-2xl font-semibold flex-1">{question.question}</h2>
          <QuestionImage questionId={question.questionId} />
        </div>

        <div role="group" aria-labelledby={headingId} className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          {options.map((option) => (
            <AnswerOption
              key={option.letter}
              letter={option.letter}
              state={stateOf(option.letter)}
              interactive={isReady}
              srLabel={answered ? (option.letter === question.correctAnswer ? t("trainingCard.correct") : option.letter === selectedAnswer ? t("trainingCard.incorrect") : undefined) : undefined}
              aria-pressed={selectedAnswer === option.letter}
              aria-disabled={!isReady || answered}
              onPointerDown={() => { pressedAt.current = performance.now(); }}
              onClick={(e) => choose(option.letter, e)}
            >
              {option.text}
            </AnswerOption>
          ))}
        </div>

        <div role="status" aria-atomic="true" className="sr-only">{answered ? `${isCorrect ? t("trainingCard.correct") : t("trainingCard.incorrect")} ${question.correctAnswer}: ${options.find(o => o.letter === question.correctAnswer)?.text}. ${question.explanation}` : ""}</div>
        {answered && (
          <div className="space-y-3 md:space-y-4">
            <Button onClick={onNext} className="w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200" size="lg">
              {t("trainingCard.nextQuestion")}
            </Button>

            <AnswerFeedback correct={isCorrect} title={isCorrect ? t("trainingCard.correct") : t("trainingCard.incorrect")}>
              {question.explanation}
            </AnswerFeedback>
            {reportExamId && (
              <ReportExamQuestion
                key={question.questionId}
                examId={reportExamId}
                questionId={question.questionId}
                picked={reportPick(question.optionOrder, selectedAnswer)}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/** The bank index of the shown letter picked, through the shuffle. */
function reportPick(optionOrder: string | undefined, picked: string | null): number | undefined {
  if (!picked) return undefined;
  const bankLetter = optionOrder ? optionOrder["ABCD".indexOf(picked)] : picked;
  const i = bankLetter ? "ABCD".indexOf(bankLetter) : -1;
  return i >= 0 ? i : undefined;
}
