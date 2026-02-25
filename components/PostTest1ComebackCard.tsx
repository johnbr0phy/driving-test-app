"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Trophy } from "lucide-react";
import Image from "next/image";

interface PostTest1ComebackCardProps {
  test1Score: number;          // number of correct answers
  totalQuestions: number;      // denominator (usually 50)
  nextTestId: number;          // 2, 3, etc.
}

export function PostTest1ComebackCard({
  test1Score,
  totalQuestions,
  nextTestId,
}: PostTest1ComebackCardProps) {
  const router = useRouter();
  const percentage = Math.round((test1Score / totalQuestions) * 100);
  const passed = percentage >= 70;

  const getMessage = () => {
    if (percentage >= 90) {
      return `You crushed Test ${nextTestId - 1} with ${percentage}%. Take Test ${nextTestId} to confirm you're fully ready for the real exam.`;
    }
    if (percentage >= 70) {
      return `You passed Test ${nextTestId - 1} with ${percentage}%. Take Test ${nextTestId} to strengthen your score — most users improve by 5–10% on their next attempt.`;
    }
    if (percentage >= 50) {
      return `You scored ${percentage}% on Test ${nextTestId - 1}. Test ${nextTestId} covers fresh questions — a second pass almost always improves your score.`;
    }
    return `You scored ${percentage}% on Test ${nextTestId - 1}. Keep going — users who take Test ${nextTestId} improve their average score by 12%.`;
  };

  const tigerFace = percentage >= 90
    ? "/tiger_face_02.png"
    : percentage >= 70
      ? "/tiger_face_03.png"
      : "/tiger_face_04.png";

  return (
    <Card className={`mb-6 border-2 cursor-pointer hover:shadow-md transition-all ${
      passed
        ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
        : "bg-gradient-to-r from-brand-light to-brand-gradient-to border-brand-border-light"
    }`}
    onClick={() => router.push(`/test/${nextTestId}`)}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* Tiger + score bubble */}
          <div className="relative flex-shrink-0">
            <Image
              src={tigerFace}
              alt="Tiger mascot"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className={`absolute -bottom-1 -right-1 text-xs font-bold px-1.5 py-0.5 rounded-full leading-tight ${
              passed ? "bg-green-500 text-white" : "bg-brand text-white"
            }`}>
              {percentage}%
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              {passed
                ? <Trophy className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                : <TrendingUp className="h-3.5 w-3.5 text-brand flex-shrink-0" />
              }
              <p className={`text-xs font-semibold uppercase tracking-wide ${
                passed ? "text-green-700" : "text-brand"
              }`}>
                {passed ? `Test ${nextTestId - 1} passed — keep going` : `Continue your practice`}
              </p>
            </div>
            <p className="text-sm text-gray-700 leading-snug">
              {getMessage()}
            </p>
          </div>

          {/* CTA */}
          <Button
            className={`shrink-0 font-bold whitespace-nowrap text-sm px-4 ${
              passed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-brand hover:bg-brand-hover text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/test/${nextTestId}`);
            }}
          >
            Test {nextTestId}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
