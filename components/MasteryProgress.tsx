"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

interface MasteryProgressProps {
  totalBestScore: number;
  totalPossible: number;
}

export function MasteryProgress({ totalBestScore, totalPossible }: MasteryProgressProps) {
  const { t } = useTranslation();
  const masteryPercentage = totalPossible > 0 ? Math.round((totalBestScore / totalPossible) * 100) : 0;

  return (
    <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          <div>
            <CardTitle className="text-2xl">{t("mastery.overallMastery")}</CardTitle>
            <CardDescription>{t("mastery.bestPerformance")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-brand-dark">{masteryPercentage}%</span>
            <span className="text-gray-600 dark:text-gray-300">{t("mastery.masteredSuffix")}</span>
          </div>
          <Progress value={masteryPercentage} className="h-4 [&>div]:bg-brand" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {totalBestScore} {t("questionCard.of")} {totalPossible} {t("mastery.questionsCorrectBest")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
