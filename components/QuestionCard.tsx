import { Question } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

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

    // During test - no visual selection indicator
    return "border-gray-300 hover:border-orange-500 hover:bg-orange-50 cursor-pointer";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </div>
          <Badge variant="outline">{question.category}</Badge>
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
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
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-bold text-lg mr-2">{option.value}.</span>
                    <span>{option.label}</span>
                  </div>
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
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="font-semibold text-orange-900 mb-2">Explanation:</div>
            <div className="text-orange-800">{question.explanation}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
