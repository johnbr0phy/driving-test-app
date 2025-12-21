import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle, ArrowRight, Trophy, Target } from "lucide-react";
import { ImprovementBadge } from "@/components/ImprovementBadge";

interface TestCardProps {
  testNumber: number;
  status: "not-started" | "in-progress" | "completed";
  score?: number;
  totalQuestions?: number;
  progress?: number;
  firstScore?: number;
  bestScore?: number;
  attemptCount?: number;
}

export function TestCard({ testNumber, status, score, totalQuestions = 50, progress = 0, firstScore, bestScore, attemptCount }: TestCardProps) {
  // Calculate best percentage for badge logic
  const bestPercentage = bestScore ? Math.round((bestScore / totalQuestions) * 100) : 0;

  const getStatusBadge = () => {
    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Badge className="bg-green-500">Mastered</Badge>;
      } else if (bestPercentage >= 70) {
        return <Badge className="bg-blue-500">Passed</Badge>;
      } else {
        return <Badge className="bg-orange-500">Keep Practicing</Badge>;
      }
    }

    switch (status) {
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getStatusIcon = () => {
    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Trophy className="h-12 w-12 text-yellow-500" />;
      } else if (bestPercentage >= 70) {
        return <CheckCircle2 className="h-12 w-12 text-blue-500" />;
      } else {
        return <Target className="h-12 w-12 text-orange-500" />;
      }
    }

    switch (status) {
      case "in-progress":
        return <PlayCircle className="h-12 w-12 text-yellow-500" />;
      default:
        return <Circle className="h-12 w-12 text-gray-300" />;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "completed":
        return attemptCount && attemptCount > 0 ? "Retake Test" : "Review Test";
      case "in-progress":
        return "Continue Test";
      default:
        return "Start Test";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle>Test {testNumber}</CardTitle>
              <CardDescription>{totalQuestions} questions</CardDescription>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        {status === "completed" && (
          <div className="mb-4">
            {bestScore !== undefined && firstScore !== undefined ? (
              <div className="space-y-3">
                {/* Score progression with arrow */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-semibold text-gray-700">
                    {Math.round((firstScore / totalQuestions) * 100)}%
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round((bestScore / totalQuestions) * 100)}%
                  </span>
                </div>

                {/* Improvement badge */}
                <div className="flex justify-center">
                  <ImprovementBadge
                    firstScore={firstScore}
                    bestScore={bestScore}
                    totalQuestions={totalQuestions}
                  />
                </div>

                {/* Attempt count */}
                <div className="text-xs text-gray-500 text-center">
                  {attemptCount} {attemptCount === 1 ? 'attempt' : 'attempts'}
                </div>
              </div>
            ) : score !== undefined && (
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round((score / totalQuestions) * 100)}% correct
                </div>
              </div>
            )}
          </div>
        )}

        {status === "in-progress" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <Link href={`/test/${testNumber}`}>
          <Button className="w-full">
            {getButtonText()}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
