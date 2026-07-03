"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronDown, ChevronRight, Eye } from "lucide-react";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackStatsEntry } from "@/lib/analytics";

export type DailyMissedVariant =
  | "stat"
  | "strip"
  | "hero"
  | "unfold"
  | "swap"
  | "unblur";

export function DailyMissedQuestion({
  variant = "unfold",
  className,
}: {
  variant?: DailyMissedVariant;
  className?: string;
}) {
  const { t } = useTranslation();
  const { data } = useCommunityStats();
  const [revealed, setRevealed] = useState(false);

  if (!data || data.questions.length === 0) return null;

  // Rotate through the community list, one question per day
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  const q = data.questions[dayNumber % data.questions.length];

  const track = () => trackStatsEntry(`dashboard_daily_${variant}`, "community");

  const pctBlock = (
    <div className="shrink-0 text-center">
      <div className="text-base font-bold text-red-500 tabular-nums leading-none">
        {q.errorRate}%
      </div>
      <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
        {t("dashboard.dailyMissedGetWrong")}
      </div>
    </div>
  );

  const seeAllLink = (
    <Link
      href="/stats?tab=community"
      onClick={(e) => {
        e.stopPropagation();
        track();
      }}
      className="text-xs font-medium text-brand hover:text-brand-dark whitespace-nowrap shrink-0"
    >
      {t("dashboard.dailyMissedSeeAllShort")}
    </Link>
  );

  const stripShell =
    "rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow cursor-pointer";

  const toggleProps = {
    role: "button" as const,
    tabIndex: 0,
    onClick: () => setRevealed((r) => !r),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setRevealed((r) => !r);
      }
    },
  };

  // Tap to unfold: strip expands and the answer slides in below the question
  if (variant === "unfold") {
    return (
      <div className={className}>
        <div {...toggleProps} className={`${stripShell} px-4 py-3`}>
          <div className="flex items-center gap-4">
            {pctBlock}
            <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 line-clamp-2">
              {q.question}
            </p>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                revealed ? "rotate-180" : ""
              }`}
            />
          </div>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
              revealed ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`pt-2.5 flex items-start justify-between gap-3 transition-opacity duration-300 motion-reduce:transition-none ${
                  revealed ? "opacity-100 delay-100" : "opacity-0"
                }`}
              >
                <p className="text-sm font-medium text-green-700 leading-snug flex items-start gap-1.5">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={3} />
                  <span>{q.correctAnswer}</span>
                </p>
                {seeAllLink}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tap to swap: question slides out left, answer slides in from the right
  if (variant === "swap") {
    return (
      <div className={className}>
        <div {...toggleProps} className={`${stripShell} px-4 py-3 flex items-center gap-4 overflow-hidden`}>
          {pctBlock}
          <div className="flex-1 min-w-0 grid">
            <p
              aria-hidden={revealed}
              className={`col-start-1 row-start-1 text-sm leading-snug font-medium text-gray-900 transition-all duration-300 ease-out motion-reduce:transition-none ${
                revealed ? "opacity-0 -translate-x-3 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              {q.question}
            </p>
            <p
              aria-hidden={!revealed}
              className={`col-start-1 row-start-1 text-sm leading-snug font-medium text-green-700 transition-all duration-300 ease-out motion-reduce:transition-none ${
                revealed ? "opacity-100 translate-x-0 delay-75" : "opacity-0 translate-x-3 pointer-events-none"
              }`}
            >
              <Check className="inline h-4 w-4 -mt-0.5 mr-1" strokeWidth={3} />
              {q.correctAnswer}
            </p>
          </div>
          {revealed ? seeAllLink : <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />}
        </div>
      </div>
    );
  }

  // Tap to unblur: the answer is teased behind a blur and sharpens on tap
  if (variant === "unblur") {
    return (
      <div className={className}>
        <div {...toggleProps} className={`${stripShell} px-4 py-3 flex items-center gap-4`}>
          {pctBlock}
          <p className="flex-1 min-w-0 text-sm leading-snug">
            <span className="font-medium text-gray-900">{q.question}</span>{" "}
            <span
              aria-hidden={!revealed}
              className={`font-medium text-green-700 transition-all duration-500 motion-reduce:transition-none ${
                revealed ? "blur-0 opacity-100" : "blur-[5px] opacity-60 select-none"
              }`}
            >
              {q.correctAnswer}
            </span>
          </p>
          {revealed ? seeAllLink : <Eye className="h-4 w-4 text-gray-400 shrink-0" />}
        </div>
      </div>
    );
  }

  // Static strip: answer always visible, whole row links to the community tab
  if (variant === "strip") {
    return (
      <Link href="/stats?tab=community" onClick={track} className={`block ${className ?? ""}`}>
        <div className={`${stripShell} px-4 py-3 flex items-center gap-4`}>
          {pctBlock}
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

  // stat: editorial card
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
