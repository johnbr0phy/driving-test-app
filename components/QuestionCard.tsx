"use client";

import { useId, useEffect, useRef } from "react";
import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerOption, type AnswerOptionState } from "@/components/question/AnswerOption";
import { AnswerFeedback } from "@/components/question/AnswerFeedback";
import { useTranslation } from "@/contexts/LanguageContext";
import { QuestionImage } from "@/components/QuestionImage";

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerChange,
  showResult = false,
}: QuestionCardProps) {
  const { t } = useTranslation();
  const headingId = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [question.questionId]);
  const options = [
    { value: "A", label: question.optionA },
    { value: "B", label: question.optionB },
    { value: "C", label: question.optionC },
    { value: "D", label: question.optionD },
  ];

  const isCorrect = selectedAnswer === question.correctAnswer;

  const stateOf = (value: string): AnswerOptionState => {
    if (showResult) {
      if (value === question.correctAnswer) return "correct";
      if (value === selectedAnswer) return "wrong";
      return "dim";
    }
    return value === selectedAnswer ? "selected" : "idle";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <CardTitle role="heading" aria-level={2} id={headingId} ref={heading} tabIndex={-1} className="text-xl flex-1">{question.question}</CardTitle>
          <QuestionImage questionId={question.questionId} />
        </div>
      </CardHeader>
      <CardContent>
        <div role="group" aria-labelledby={headingId} className="space-y-3">
          {options.map((option) => (
            <AnswerOption
              key={option.value}
              letter={option.value}
              state={stateOf(option.value)}
              interactive={!showResult && selectedAnswer === undefined}
              srLabel={showResult ? (option.value === question.correctAnswer ? t("trainingCard.correct") : option.value === selectedAnswer && !isCorrect ? t("trainingCard.incorrect") : undefined) : undefined}
              aria-pressed={selectedAnswer === option.value}
              aria-disabled={showResult || selectedAnswer !== undefined}
              onClick={() => !showResult && selectedAnswer === undefined && onAnswerChange(option.value)}
            >
              {option.label}
            </AnswerOption>
          ))}
        </div>

        {showResult && (
          <AnswerFeedback className="mt-6" correct={isCorrect} title={isCorrect ? t("trainingCard.correct") : t("trainingCard.incorrect")}>
            {question.explanation}
          </AnswerFeedback>
        )}
      </CardContent>
    </Card>
  );
}
