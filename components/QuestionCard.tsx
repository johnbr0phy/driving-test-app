"use client";

import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { QuestionImage } from "@/components/QuestionImage";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerChange,
  showResult = false,
}: QuestionCardProps) {
  const { t } = useTranslation();
  const options = [
    { value: "A", label: question.optionA },
    { value: "B", label: question.optionB },
    { value: "C", label: question.optionC },
    { value: "D", label: question.optionD },
  ];

  const isCorrect = selectedAnswer === question.correctAnswer;

  const getOptionClasses = (optionValue: string) => {
    const isThisCorrect = optionValue === question.correctAnswer;
    const isSelected = selectedAnswer === optionValue;

    if (showResult) {
      if (isThisCorrect) {
        return "border-green-500 bg-green-50";
      } else if (isSelected && !isCorrect) {
        return "border-red-500 bg-red-50";
      }
      return "border-gray-300 opacity-50";
    }

    return "border-gray-300 [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand-light active:border-brand active:bg-brand-light cursor-pointer";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {t("questionCard.questionOf")} {questionNumber} {t("questionCard.of")} {totalQuestions}
          </div>
          <Badge variant="outline">{t(`categories.${question.category}`)}</Badge>
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <QuestionImage questionId={question.questionId} state={question.state} />
        <div className="space-y-3">
          {options.map((option) => {
            const isThisCorrect = option.value === question.correctAnswer;
            const isSelected = selectedAnswer === option.value;

            return (
              <div
                key={option.value}
                onClick={() => !showResult && onAnswerChange(option.value)}
                className={`border-2 rounded-lg p-4 transition-all ${getOptionClasses(option.value)}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-lg w-6 shrink-0">{option.value})</span>
                  <span className="flex-1">{option.label}</span>
                  {showResult && isThisCorrect && (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 p-4 border rounded-lg bg-brand-light border-brand-border-light">
            <div className="font-semibold mb-2 text-brand-darker">{t("questionCard.explanation")}</div>
            <div className="text-brand-dark">{question.explanation}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
