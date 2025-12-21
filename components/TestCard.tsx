import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle, Trophy, Target, Lock, ChevronDown, ChevronUp } from "lucide-react";

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
  expanded?: boolean;
  onToggle?: () => void;
}

export function TestCard({ testNumber, status, score, totalQuestions = 50, progress = 0, firstScore, bestScore, attemptCount, averageScore, locked = false, lockMessage, expanded = false, onToggle }: TestCardProps) {
  // Calculate best percentage for badge logic
  const bestPercentage = bestScore ? Math.round((bestScore / totalQuestions) * 100) : 0;

  const getStatusBadge = () => {
    if (locked) {
      return <Badge variant="outline" className="bg-gray-100">Locked</Badge>;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Badge className="bg-green-500">Mastered</Badge>;
      } else if (bestPercentage >= 70) {
        return <Badge className="bg-orange-500">Passed</Badge>;
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
    if (locked) {
      return <Lock className="h-12 w-12 text-gray-400" />;
    }

    if (status === "completed" && bestScore !== undefined) {
      if (bestPercentage === 100) {
        return <Trophy className="h-12 w-12 text-yellow-500" />;
      } else if (bestPercentage >= 70) {
        return <CheckCircle2 className="h-12 w-12 text-orange-500" />;
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
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle>Test {testNumber}</CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
        {status === "completed" && (
          <div className="mb-4">
            {bestScore !== undefined && attemptCount !== undefined && averageScore !== undefined ? (
              <div className="space-y-2">
                {/* Attempts and Average */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Attempts</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {attemptCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Avg Score</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {averageScore}/{totalQuestions}
                    </div>
                  </div>
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
            <Progress value={progress} className="[&>div]:bg-orange-600" />
          </div>
        )}

        {locked ? (
          <div className="text-center py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
            <Lock className="h-5 w-5 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">
              {lockMessage || "Score 40+ on previous tests to unlock"}
            </p>
          </div>
        ) : (
          <Link href={`/test/${testNumber}`}>
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              {getButtonText()}
            </Button>
          </Link>
        )}
        </CardContent>
      )}
    </Card>
  );
}
