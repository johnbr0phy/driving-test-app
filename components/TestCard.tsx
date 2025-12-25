import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, PlayCircle, Trophy, Target, Lock, ChevronRight } from "lucide-react";

interface TestCardProps {
  testNumber: number;
  status: "not-started" | "in-progress" | "completed";
  score?: number;
  totalQuestions?: number;
  progress?: number;
  firstScore?: number;
  bestScore?: number;
  attemptCount?: number;
  averageScore?: number;
  locked?: boolean;
  lockMessage?: string;
}

export function TestCard({
  testNumber,
  status,
  totalQuestions = 50,
  progress = 0,
  bestScore,
  attemptCount,
  locked = false,
  lockMessage
}: TestCardProps) {
  const bestPercentage = bestScore ? Math.round((bestScore / totalQuestions) * 100) : 0;

  const getStatusBadge = () => {
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100 hover:bg-gray-100 text-xs">Locked</Badge>;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">Mastered</Badge>;
      } else if (bestPercentage >= 70) {
        return <Badge className="bg-green-500 hover:bg-green-500 text-xs">Passed</Badge>;
      } else {
        return <Badge className="bg-orange-500 hover:bg-orange-500 text-xs">Keep Practicing</Badge>;
      }
    }

    switch (status) {
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-500 text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="hover:bg-white text-xs">Not Started</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (locked) {
      return <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" />;
      } else if (bestPercentage >= 70) {
        return <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />;
      } else {
        return <Target className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500" />;
      }
    }

    switch (status) {
      case "in-progress":
        return <PlayCircle className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" />;
      default:
        return <Circle className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300" />;
    }
  };

  const cardContent = (
    <Card className={`transition-all overflow-hidden ${
      locked
        ? "bg-gray-50 border-gray-200 opacity-75"
        : "hover:shadow-md hover:border-gray-300 cursor-pointer"
    }`}>
      <CardContent className="p-4 sm:p-5">
        {/* Badge in top right for in-progress */}
        {status === "in-progress" && !locked && (
          <div className="flex justify-end mb-2">
            {getStatusBadge()}
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base sm:text-lg">Test {testNumber}</span>
              {status !== "in-progress" && getStatusBadge()}
            </div>

            {/* Status-specific info (not for in-progress, that's at bottom) */}
            {locked ? (
              <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">
                {lockMessage || "Complete training to unlock"}
              </p>
            ) : status === "completed" && bestScore !== undefined ? (
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                <span className="hidden sm:inline">Best: </span>
                <span className={bestPercentage >= 70 ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                  {bestScore}/{totalQuestions}
                </span>
                {attemptCount !== undefined && (
                  <span className="text-gray-400 ml-2">
                    · {attemptCount} {attemptCount === 1 ? 'attempt' : 'attempts'}
                  </span>
                )}
              </p>
            ) : status === "not-started" ? (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">50 questions</p>
            ) : null}
          </div>

          {/* Arrow indicator for clickable cards */}
          {!locked && (
            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
          )}
        </div>
      </CardContent>

      {/* Full-width progress bar at bottom for in-progress */}
      {status === "in-progress" && !locked && (
        <div className="h-2 bg-gray-100">
          <div
            className="h-full bg-yellow-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );

  if (locked) {
    return cardContent;
  }

  return (
    <Link href={`/test/${testNumber}`} className="block">
      {cardContent}
    </Link>
  );
}
