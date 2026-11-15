"use client";

// "Are you ready?" on a v1 exam's stats page (lib/examReadiness.ts): one row
// per content area with its level and a bar against the pass mark, the
// weighted estimate and the area with the most points to gain. Premium shows
// it all; everyone else sees the area names and a lock, which opens the stats
// paywall.

import { Lock } from "lucide-react";
import type { ExamConfig } from "@/lib/exams";
import type { ExamUiFull } from "@/lib/examUi";
import { MIN_AREA, type ExamReadiness, type ReadinessLevel } from "@/lib/examReadiness";

const CHIP: Record<ReadinessLevel, string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  almost: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  notYet: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  unknown: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};
const BAR: Record<ReadinessLevel, string> = {
  ready: "bg-green-500",
  almost: "bg-amber-500",
  notYet: "bg-red-500",
  unknown: "bg-gray-300 dark:bg-gray-600",
};

export function ExamReadinessCard({
  exam,
  ui,
  readiness,
  isPremium,
  onUnlock,
  price,
}: {
  exam: ExamConfig;
  ui: ExamUiFull;
  readiness: ExamReadiness;
  isPremium: boolean;
  onUnlock: () => void;
  price: string;
}) {
  const label = (c: string) => exam.categoryLabels[c] ?? c;
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 mb-4" aria-labelledby="readiness-title">
      <h2 id="readiness-title" className="text-lg font-bold text-gray-900 dark:text-gray-50">{ui.readinessTitle}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ui.readinessSub(exam.shortName)}</p>

      {isPremium ? (
        <>
          <p className="font-semibold text-gray-900 dark:text-gray-50">{ui.readinessVerdict[readiness.level]}</p>
          {readiness.estimate !== null && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{ui.readinessEstimate(readiness.estimate, exam.passPct)}</p>
          )}
          {readiness.fastest && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{ui.readinessFastest(label(readiness.fastest.category))}</p>
          )}
          <ul className="mt-4 space-y-3">
            {readiness.areas.map((a) => (
              <li key={a.category}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-800 dark:text-gray-100">{label(a.category)}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${CHIP[a.level]}`}>
                    {ui.readinessLevel[a.level]}{a.accuracy !== null ? ` · ${a.accuracy}%` : ""}
                  </span>
                </div>
                <div className="relative mt-1.5 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-2 rounded-full ${BAR[a.level]}`} style={{ width: `${a.accuracy ?? Math.round((100 * a.answered) / MIN_AREA)}%` }} />
                  <div className="absolute -top-0.5 h-3 w-px bg-gray-500" style={{ left: `${exam.passPct}%` }} aria-hidden="true" />
                </div>
                {a.accuracy === null && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ui.readinessAnswered(a.answered, MIN_AREA)}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">{ui.readinessNote}</p>
        </>
      ) : (
        <>
          <ul className="space-y-2 select-none" aria-hidden="true">
            {readiness.areas.map((a) => (
              <li key={a.category} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-800 dark:text-gray-100">{label(a.category)}</span>
                <span className="h-4 w-16 rounded-full bg-gray-200 dark:bg-gray-700 blur-[2px]" />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onUnlock}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold h-11"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            {ui.readinessLock} · {price}
          </button>
        </>
      )}
    </section>
  );
}
