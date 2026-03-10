import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Question } from "@/types";
import { useState, useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

interface TrainingCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
}

export function TrainingCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
}: TrainingCardProps) {
  const { t } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const options = [
    { letter: "A", text: question.optionA },
    { letter: "B", text: question.optionB },
    { letter: "C", text: question.optionC },
    { letter: "D", text: question.optionD },
  ];

  const getOptionClasses = (optionLetter: string) => {
    if (!answered) {
      if (!isReady) {
        return "border-gray-300 dark:border-gray-600";
      }
      return "border-gray-300 dark:border-gray-600 [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:bg-brand-light active:border-brand active:bg-brand-light cursor-pointer";
    }

    if (optionLetter === question.correctAnswer) {
      return "border-green-500 bg-green-50 dark:bg-green-900/30 dark:border-green-600";
    }

    if (optionLetter === selectedAnswer && !isCorrect) {
      return "border-red-500 bg-red-50 dark:bg-red-900/30 dark:border-red-600";
    }

    return "border-gray-300 dark:border-gray-600 opacity-50";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-4 md:p-8">
        <h2 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6">{question.question}</h2>

        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          {options.map((option) => (
            <div
              key={option.letter}
              onClick={() => isReady && !answered && onAnswerSelect(option.letter)}
              className={`border-2 rounded-lg p-3 md:p-4 transition-all ${getOptionClasses(option.letter)}`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className="font-bold text-base md:text-lg w-6 shrink-0">{option.letter})</span>
                <span className="flex-1 text-sm md:text-base">{option.text}</span>
                {answered && option.letter === question.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                )}
                {answered && option.letter === selectedAnswer && !isCorrect && (
                  <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {answered && (
          <div className="space-y-3 md:space-y-4">
            <Button onClick={onNext} className="w-full bg-black text-white hover:bg-gray-800" size="lg">
              {t("trainingCard.nextQuestion")}
            </Button>

            <div
              className={`p-3 md:p-4 rounded-lg ${
                isCorrect ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
              }`}
            >
              <div
                className={`font-bold mb-1 md:mb-2 text-sm md:text-base ${
                  isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                }`}
              >
                {isCorrect ? t("trainingCard.correct") : t("trainingCard.incorrect")}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{question.explanation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
