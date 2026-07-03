"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackStatsEntry } from "@/lib/analytics";

export function DailyMissedQuestion({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { data } = useCommunityStats();
  const [revealed, setRevealed] = useState(false);

  if (!data || data.questions.length === 0) return null;

  // Rotate through the community list, one question per day
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  const q = data.questions[dayNumber % data.questions.length];

  return (
    <Card className={`border-gray-100 ${className ?? ""}`}>
      <CardContent
        className="p-4 cursor-pointer"
        onClick={() => setRevealed((r) => !r)}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-red-400" />
            {t("dashboard.dailyMissedTitle")}
          </p>
          <span className="text-sm font-bold text-red-500 shrink-0">{q.errorRate}%</span>
        </div>

        <p className="text-sm font-medium text-gray-900 leading-snug">{q.question}</p>

        <div className="mt-2.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-400 rounded-full" style={{ width: `${q.errorRate}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {q.wrong} {t("stats.outOf")} {q.total} {t("stats.peopleGotWrong")}
        </p>

        {revealed ? (
          <div className="mt-3 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            <p className="text-xs text-green-700 font-medium mb-0.5">{t("stats.correctAnswer")}</p>
            <p className="text-sm text-green-900">{q.correctAnswer}</p>
            {q.explanation && (
              <p className="text-xs text-green-700 mt-1 leading-relaxed">{q.explanation}</p>
            )}
          </div>
        ) : (
          <p className="text-xs text-brand mt-3 font-medium">{t("stats.tapShowAnswer")}</p>
        )}

        <div className="mt-3 flex justify-end">
          <Link
            href="/stats?tab=community"
            onClick={(e) => {
              e.stopPropagation();
              trackStatsEntry("dashboard_daily_question", "community");
            }}
            className="text-xs font-medium text-brand hover:text-brand-dark transition-colors"
          >
            {t("dashboard.dailyMissedSeeAll")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
