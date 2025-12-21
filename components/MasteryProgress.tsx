import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

interface MasteryProgressProps {
  totalBestScore: number;
  totalPossible: number;
}

export function MasteryProgress({ totalBestScore, totalPossible }: MasteryProgressProps) {
  const masteryPercentage = totalPossible > 0 ? Math.round((totalBestScore / totalPossible) * 100) : 0;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-600" />
          <div>
            <CardTitle className="text-2xl">Overall Mastery</CardTitle>
            <CardDescription>Your best performance across all tests</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-blue-600">{masteryPercentage}%</span>
            <span className="text-gray-600">mastered</span>
          </div>
          <Progress value={masteryPercentage} className="h-4" />
          <p className="text-sm text-gray-600">
            {totalBestScore} of {totalPossible} questions correct (based on best scores)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
