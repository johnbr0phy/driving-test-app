"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { useCommunityStats } from "@/hooks/useCommunityStats";
import { useTranslation } from "@/contexts/LanguageContext";
import { trackDailyQuizAnswer, trackStatsEntry } from "@/lib/analytics";

// questionId -> local day number it was answered on
const STORAGE_KEY = "dailyQuizAnswers";

function loadPastAnswers(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function localDayNumber(): number {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60_000) / 86_400_000);
}

export function DailyMissedQuestion({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { data } = useCommunityStats();
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  // Snapshot past answers once on mount so answering doesn't hide the strip
  // mid-session — it disappears on the next dashboard load instead
  const [pastAnswers] = useState<Record<string, number>>(loadPastAnswers);

  if (!data || data.questions.length === 0) return null;

  const dayNumber = localDayNumber();

  // Already answered today's question — gone until tomorrow
  if (Object.values(pastAnswers).some((day) => day === dayNumber)) return null;

  // Rotate daily through the community list, skipping questions already
  // answered on earlier days; once every question is answered, cycle again
  const list = data.questions;
  const allAnswered = list.every((c) => c.questionId in pastAnswers);
  let q = list[dayNumber % list.length];
  if (!allAnswered) {
    for (let i = 0; i < list.length; i++) {
      const candidate = list[(dayNumber + i) % list.length];
      if (!(candidate.questionId in pastAnswers)) {
        q = candidate;
        break;
      }
    }
  }

  const options = q.options ?? [];
  const hasOptions = options.length > 0;
  const answered = picked !== null;
  const pickedCorrect = answered && options[picked] === q.correctAnswer;

  const toggle = () => setExpanded((e) => !e);

  const pickOption = (idx: number) => {
    if (answered) return;
    setPicked(idx);
    trackDailyQuizAnswer(options[idx] === q.correctAnswer);
    try {
      const stored = loadPastAnswers();
      stored[q.questionId] = dayNumber;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // localStorage unavailable — the quiz just reappears on reload
    }
  };

  return (
    <div className={className}>
      <div className="rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-shadow">
        {/* Header row — toggles the quiz open/closed */}
        <div
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          className="flex items-center gap-4 cursor-pointer"
          aria-expanded={expanded}
        >
          <div className="shrink-0 text-center">
            <div className="text-base font-bold text-red-500 tabular-nums leading-none">
              {q.errorRate}%
            </div>
            <div className="text-[9px] uppercase tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
              {t("dashboard.dailyMissedGetWrong")}
            </div>
          </div>
          <p className="flex-1 min-w-0 text-sm leading-snug font-medium text-gray-900 line-clamp-2">
            {q.question}
          </p>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expanding quiz panel */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            expanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 space-y-1.5">
              {hasOptions ? (
                options.map((opt, idx) => {
                  const isCorrect = opt === q.correctAnswer;
                  const isPicked = picked === idx;
                  const letter = ["A", "B", "C", "D"][idx];

                  let optionStyle = "bg-gray-50 border-gray-200 text-gray-700";
                  if (answered) {
                    if (isCorrect) {
                      optionStyle = "bg-green-50 border-green-200 text-green-900";
                    } else if (isPicked) {
                      optionStyle = "bg-red-50 border-red-200 text-red-700";
                    } else {
                      optionStyle = "bg-gray-50 border-gray-100 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        pickOption(idx);
                      }}
                      disabled={answered}
                      style={{ transitionDelay: expanded && !answered ? `${idx * 50}ms` : "0ms" }}
                      className={`w-full flex items-start gap-2 rounded-lg border px-3 py-2 text-sm text-left transition-all duration-300 motion-reduce:transition-none ${
                        expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      } ${optionStyle} ${!answered ? "hover:border-brand-border hover:bg-white cursor-pointer" : "cursor-default"}`}
                    >
                      <span
                        className={`font-semibold shrink-0 ${
                          answered && isCorrect
                            ? "text-green-700"
                            : answered && isPicked
                              ? "text-red-500"
                              : "text-gray-500"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 min-w-0">{opt}</span>
                      {answered && isCorrect && (
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" strokeWidth={3} />
                      )}
                      {answered && isPicked && !isCorrect && (
                        <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                      )}
                    </button>
                  );
                })
              ) : (
                // No option data for this question — fall back to showing the answer
                <p className="text-sm font-medium text-green-700 leading-snug flex items-start gap-1.5">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={3} />
                  <span>{q.correctAnswer}</span>
                </p>
              )}

              {/* Post-answer doorway to the full list */}
              {(answered || !hasOptions) && (
                <div className="pt-1 animate-in fade-in duration-300">
                  <Link
                    href="/stats?tab=community"
                    onClick={(e) => {
                      e.stopPropagation();
                      trackStatsEntry(
                        answered
                          ? `dashboard_daily_quiz_${pickedCorrect ? "correct" : "wrong"}`
                          : "dashboard_daily_quiz",
                        "community"
                      );
                    }}
                    className="block w-full rounded-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 text-center transition-colors"
                  >
                    <span className="text-sm font-medium leading-snug [text-wrap:balance]">
                      {t("dashboard.dailyMissedCta")}
                      <ArrowRight className="inline h-4 w-4 ml-1.5 -mt-0.5" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
