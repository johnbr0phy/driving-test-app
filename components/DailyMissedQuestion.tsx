"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackStatsEntry } from "@/lib/analytics";

export type DailyMissedVariant = "stat" | "strip" | "hero";

export function DailyMissedQuestion({
  variant = "stat",
  className,
}: {
  variant?: DailyMissedVariant;
  className?: string;
}) {
  const { t } = useTranslation();
  const { data } = useCommunityStats();

  if (!data || data.questions.length === 0) return null;

  // Rotate through the community list, one question per day
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  const q = data.questions[dayNumber % data.questions.length];

  const track = () => trackStatsEntry(`dashboard_daily_${variant}`, "community");

  // Slim single-row strip; the whole row links to the community tab
  if (variant === "strip") {
    return (
      <Link href="/stats?tab=community" onClick={track} className={`block ${className ?? ""}`}>
        <div className="rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="shrink-0 text-center">
            <div className="text-base font-bold text-red-500 tabular-nums leading-none">
              {q.errorRate}%
            </div>
            <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
              {t("dashboard.dailyMissedGetWrong")}
            </div>
          </div>
          <p className="flex-1 min-w-0 text-sm leading-snug line-clamp-2">
            <span className="font-medium text-gray-900">{q.question}</span>{" "}
            <span className="font-medium text-green-700">{q.correctAnswer}</span>
          </p>
          <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
        </div>
      </Link>
    );
  }

  // Footer row rendered inside the dashboard hero card
  if (variant === "hero") {
    return (
      <Link href="/stats?tab=community" onClick={track} className="block group mt-4 pt-3 border-t border-gray-100">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
          {t("dashboard.dailyMissedToday")} ·{" "}
          <span className="text-red-500">
            {q.errorRate}% {t("dashboard.dailyMissedGetWrong")}
          </span>
        </p>
        <p className="text-sm leading-snug line-clamp-2">
          <span className="font-medium text-gray-900">{q.question}</span>{" "}
          <span className="font-medium text-green-700">{q.correctAnswer}</span>
          <ChevronRight className="inline h-3.5 w-3.5 text-gray-300 ml-0.5 -mt-0.5 group-hover:text-brand transition-colors" />
        </p>
      </Link>
    );
  }

  // Default: editorial stat card
  return (
    <Link href="/stats?tab=community" onClick={track} className={`block ${className ?? ""}`}>
      <Card className="border-gray-100 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
            {t("dashboard.dailyMissedTitle")}
          </p>
          <div className="flex gap-4">
            <div className="shrink-0 w-16 text-center">
              <div className="text-2xl font-bold text-red-500 tabular-nums leading-none">
                {q.errorRate}%
              </div>
              <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                {t("dashboard.dailyMissedGetWrong")}
              </div>
            </div>
            <div className="flex-1 min-w-0 border-l border-gray-100 pl-4">
              <p className="text-sm font-medium text-gray-900 leading-snug">{q.question}</p>
              <p className="text-sm text-green-700 mt-1.5 flex items-start gap-1.5">
                <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={3} />
                <span>{q.correctAnswer}</span>
              </p>
            </div>
          </div>
          <p className="mt-3 text-right text-xs font-medium text-brand">
            {t("dashboard.dailyMissedSeeAll")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
