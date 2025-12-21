import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

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
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Best Score:</span>
                  <div className="text-xl font-bold text-green-600">
                    {bestScore}/{totalQuestions}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">First Score:</span>
                  <div className="text-lg text-gray-700">
                    {firstScore}/{totalQuestions}
                  </div>
                </div>
                {attemptCount && attemptCount > 1 && (
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {attemptCount} attempts
                  </div>
                )}
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
