import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Question } from "@/types";

interface TrainingCardProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  questionNumber: number;
}

export function TrainingCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  questionNumber,
}: TrainingCardProps) {
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
      return "border-gray-300 hover:border-orange-500 hover:bg-orange-50 cursor-pointer";
    }

    if (optionLetter === question.correctAnswer) {
      return "border-orange-500 bg-orange-50";
    }

    if (optionLetter === selectedAnswer && !isCorrect) {
      return "border-red-500 bg-red-50";
    }

    return "border-gray-300 opacity-50";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-8">
        {/* Question number */}
        <div className="text-sm text-gray-500 mb-4">
          Question {questionNumber}
        </div>

        {/* Question text */}
        <h2 className="text-2xl font-semibold mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {options.map((option) => (
            <div
              key={option.letter}
              onClick={() => !answered && onAnswerSelect(option.letter)}
              className={`border-2 rounded-lg p-4 transition-all ${getOptionClasses(option.letter)}`}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-lg">{option.letter})</span>
                <span className="flex-1">{option.text}</span>
                {answered && option.letter === question.correctAnswer && (
                  <CheckCircle2 className="h-6 w-6 text-orange-600" />
                )}
                {answered && option.letter === selectedAnswer && !isCorrect && (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback */}
        {answered && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${
                isCorrect ? "bg-orange-50 border border-orange-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <div
                className={`font-bold mb-2 ${
                  isCorrect ? "text-orange-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </div>
              <p className="text-gray-700">{question.explanation}</p>
            </div>

            <Button onClick={onNext} className="w-full bg-black text-white hover:bg-gray-800" size="lg">
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
