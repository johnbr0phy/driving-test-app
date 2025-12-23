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
      return "border-green-500 bg-green-50";
    }

    if (optionLetter === selectedAnswer && !isCorrect) {
      return "border-red-500 bg-red-50";
    }

    return "border-gray-300 opacity-50";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-4 md:p-8">
        {/* Question number */}
        <div className="text-sm text-gray-500 mb-3 md:mb-4">
          Question {questionNumber}
        </div>

        {/* Question text */}
        <h2 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          {options.map((option) => (
            <div
              key={option.letter}
              onClick={() => !answered && onAnswerSelect(option.letter)}
              className={`border-2 rounded-lg p-3 md:p-4 transition-all ${getOptionClasses(option.letter)}`}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <span className="font-bold text-base md:text-lg">{option.letter})</span>
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

        {/* Feedback */}
        {answered && (
          <div className="space-y-3 md:space-y-4">
            <Button onClick={onNext} className="w-full bg-black text-white hover:bg-gray-800" size="lg">
              Next Question
            </Button>

            <div
              className={`p-3 md:p-4 rounded-lg ${
                isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <div
                className={`font-bold mb-1 md:mb-2 text-sm md:text-base ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </div>
              <p className="text-gray-700 text-sm md:text-base">{question.explanation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
