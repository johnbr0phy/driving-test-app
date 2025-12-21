import { TrendingUp } from "lucide-react";

interface ImprovementBadgeProps {
  firstScore: number;
  bestScore: number;
  totalQuestions: number;
}

export function ImprovementBadge({ firstScore, bestScore, totalQuestions }: ImprovementBadgeProps) {
  const firstPercentage = Math.round((firstScore / totalQuestions) * 100);
  const bestPercentage = Math.round((bestScore / totalQuestions) * 100);
  const improvement = bestPercentage - firstPercentage;

  if (improvement === 0) {
    return (
      <div className="text-sm text-gray-500">
        No improvement yet
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-green-600 font-semibold">
      <TrendingUp className="h-4 w-4" />
      <span>+{improvement}%</span>
    </div>
  );
}
