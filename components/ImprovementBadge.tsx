"use client";

import { TrendingUp } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface ImprovementBadgeProps {
  firstScore: number;
  bestScore: number;
  totalQuestions: number;
}

export function ImprovementBadge({ firstScore, bestScore, totalQuestions }: ImprovementBadgeProps) {
  const { t } = useTranslation();
  const firstPercentage = Math.round((firstScore / totalQuestions) * 100);
  const bestPercentage = Math.round((bestScore / totalQuestions) * 100);
  const improvement = bestPercentage - firstPercentage;

  if (improvement === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {t("improvement.noImprovementYet")}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
      <TrendingUp className="h-4 w-4" />
      <span>+{improvement}%</span>
    </div>
  );
}
