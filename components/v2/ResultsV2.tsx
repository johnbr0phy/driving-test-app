"use client";

import { takeAchievementCelebration } from "@/lib/achievementCelebration";
import { Fireworks } from "@/components/Fireworks";
import { AchievementCelebration } from "@/components/AchievementCelebration";
import { goalFor } from "@/lib/v2/goals";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ExamV2Config, TestResultV2 } from "@/lib/v2/types";
import { getQuestionIndex, getStimulus } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { scaleFor } from "@/lib/v2/scales";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { getTigerAsset } from "@/lib/tigerAssets";
import { QuestionView } from "./QuestionView";

export function ResultsV2({ exam, testNumber }: { exam: ExamV2Config; testNumber: number }) {
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const results = useV2Store((s) => s.results);
  const savedGoal = useV2Store((s) => s.goals[exam.id]);
  const goal = goalFor(exam, savedGoal);
  const byId = useMemo(() => getQuestionIndex(exam.id), [exam.id]);
  const history = useMemo(() => resultsForExam(results, exam.id).filter((r) => r.testNumber === testNumber), [results, exam.id, testNumber]);
  const [filter, setFilter] = useState<"wrong" | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [sectionFilter, setSectionFilter] = useState<string>("all");

  const latestResult = history[0];
  const [earnedResult, setEarnedResult] = useState<string | null>(null);
  useEffect(() => {
    if (!hydrated || !latestResult) return;
    const eventId = `v2:${latestResult.key}:${latestResult.completedAt}`;
    if (takeAchievementCelebration(eventId) && latestResult.composite >= goal) {
      setEarnedResult(eventId);
    }
  }, [hydrated, latestResult, goal]);
  const earned = !!latestResult && earnedResult === `v2:${latestResult.key}:${latestResult.completedAt}`;

  if (!hydrated) return <div className="p-8 text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  const result: TestResultV2 | undefined = history[0];
  if (!result) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-12 text-center">
        <h1 className="text-xl font-bold">No result yet for Practice Test {testNumber}</h1>
        <Link href={routes.test(testNumber)} className="mt-4 inline-block rounded-xl bg-brand px-5 py-3 font-bold text-white">Take the test</Link>
      </div>
    );
  }

  const previous = history[1];
  const delta = previous ? result.composite - previous.composite : null;
  const weakest = [...result.sections]
    .flatMap((s) => Object.entries(s.byDomain).map(([domain, v]) => ({ domain, section: s.section, pct: v.total ? v.correct / v.total : 1, ...v })))
    .filter((d) => d.total > 0)
    .sort((a, b) => a.pct - b.pct)[0];
  const weakDrill = weakest ? exam.drills.find((d) => d.domains.includes(weakest.domain)) : undefined;

  // Number each item within its section, in the order it was presented.
  const numbers = new Map<string, number>();
  const counters: Record<string, number> = {};
  for (const it of result.items) numbers.set(it.id, (counters[it.section] = (counters[it.section] ?? 0) + 1));
  const items = result.items.filter((it) => (filter === "all" || !it.correct) && (sectionFilter === "all" || it.section === sectionFilter));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
      {earned && <Fireworks duration={5000} />}
      <div className="text-sm font-semibold uppercase tracking-wide text-brand-dark">{exam.shortName} · Practice Test {testNumber}</div>
      {result.composite >= goal ? (
        <AchievementCelebration
          examId={exam.id}
          earned={earned}
          headingLevel={1}
          className="mt-4"
          eyebrow="Practice goal reached"
          title={exam.id === "timestables" ? "Full marks!" : "You hit your goal!"}
          description={`Practice Test ${testNumber} is complete. See it turn green on your dashboard.`}
          detail={
            <>
              <span className="block text-4xl font-black tabular-nums">{result.composite}{exam.composite.max === 100 ? "%" : ""}</span>
              <span className="block mt-1">{exam.copy.scoreLabel ?? `${exam.composite.name} estimate`} · goal {goal}</span>
              <span className="block mt-1">At your goal</span>
              {delta !== null && <span className="block mt-1">{delta >= 0 ? "+" : ""}{delta} vs last attempt</span>}
            </>
          }
        >
          <Link href={`${routes.dashboard}?completed=test:${testNumber}`} className="v2-tap flex items-center justify-center rounded-xl bg-brand px-4 py-3 font-bold text-white">See your progress</Link>
          <a href="#result-breakdown" className="v2-tap flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Review your answers</a>
        </AchievementCelebration>
      ) : (
      <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-2">
        <Image src={getTigerAsset(exam.id, result.composite >= goal ? 2 : 4)} alt="" width={80} height={80} className="h-20 w-20 shrink-0 object-contain" />
        <div>
          <div className="text-5xl font-black tabular-nums md:text-6xl">{result.composite}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{exam.copy.scoreLabel ?? `${exam.composite.name} estimate`} · goal {goal}</div>
        </div>
        {delta !== null && (
          <div className={`rounded-full px-3 py-1 text-sm font-bold ${delta >= 0 ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300"}`}>
            {delta >= 0 ? "+" : ""}{delta} vs last attempt
          </div>
        )}
        <div className={`rounded-full px-3 py-1 text-sm font-bold ${result.composite >= goal ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" : "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300"}`}>
          {result.composite >= goal ? "At your goal" : `${goal - result.composite} to your goal`}
        </div>
      </div>
      )}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{exam.copy.scoreNote}</p>
      {result.timing === "untimed" && <p className="mt-1 text-sm font-semibold">Untimed practice. This attempt did not simulate the exam time limit.</p>}

      <div id="result-breakdown" className="mt-6 grid gap-4 md:grid-cols-2">
        {result.sections.map((s) => {
          const def = getSectionV2(exam, s.section);
          const scale = scaleFor(def, s.byModule);
          const capped = scale !== def.scale;
          return (
            <div key={s.section} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <div className="flex items-baseline justify-between">
                <div className="font-bold">{def.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.raw} / {s.total} correct</div>
              </div>
              <div className="mt-1 text-3xl font-black tabular-nums">
                {s.scaled}{scale.max === 100 && scale.min === 0 ? "%" : ""}{" "}
                {scale.band > 0 && <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">({Math.max(scale.min, s.scaled - scale.band)} to {Math.min(scale.max, s.scaled + scale.band)})</span>}
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {s.byModule.map((m) => `Module ${m.module}${m.variant ? ` (${m.variant === "upper" ? "harder" : "easier"})` : ""}: ${m.raw}/${m.total}`).join(" · ")}
              </div>
              {capped && (
                <p className="mt-2 text-xs font-medium text-amber-800 dark:text-amber-300">
                  Module 1 sent you to the easier Module 2, which caps this section near {scale.max}. Get {Math.round((def.modules.find((m) => m.adaptive)?.adaptive?.threshold ?? 0.6) * 100)}% of Module 1 right to reach the harder path and the full {def.scale.max}.
                </p>
              )}
              <div className="mt-4 space-y-2">
                {def.domains.map((d) => {
                  const v = s.byDomain[d] ?? { correct: 0, total: 0 };
                  const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
                  return (
                    <div key={d}>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700 dark:text-gray-200">{exam.domainLabels[d] ?? d}</span>
                        <span className="tabular-nums text-gray-500 dark:text-gray-400">{v.correct}/{v.total}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className={`h-full rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 60 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {weakDrill && weakest && (
        <div className="mt-6 rounded-2xl border border-brand bg-brand-light p-5">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-dark">Your next step</div>
          <div className="mt-1 font-bold">Drill {weakDrill.name} on your phone tonight</div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
            You got {weakest.correct} of {weakest.total} in {exam.domainLabels[weakest.domain]}. The drill brings every miss back until you master it, then retake the test on a desktop.
          </p>
          <Link href={routes.drill(weakDrill.key)} className="v2-tap mt-3 inline-flex items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white">Start the drill</Link>
        </div>
      )}

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Review</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <select aria-label="Filter review by section" value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} className="v2-tap rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-3 pr-8 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <option value="all">All sections</option>
              {exam.sections.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
            </select>
            <div className="flex gap-1">
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={`v2-tap rounded-lg px-3 font-semibold ${filter === "all" ? "bg-brand text-white" : "bg-gray-100 dark:bg-gray-800"}`}>All</button>
              <button type="button" aria-pressed={filter === "wrong"} onClick={() => setFilter("wrong")} className={`v2-tap rounded-lg px-3 font-semibold ${filter === "wrong" ? "bg-brand text-white" : "bg-gray-100 dark:bg-gray-800"}`}>Missed</button>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {items.length === 0 && <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500 dark:text-gray-400">Nothing to show here. Nice.</div>}
          {items.map((it) => {
            const q = byId.get(it.id);
            if (!q) return null;
            const isOpen = open === it.id;
            return (
              <div key={it.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : it.id)} className="v2-tap flex w-full items-center gap-3 px-4 text-left">
                  <span className="sr-only">{it.correct ? "Correct. " : "Incorrect. "}</span>
                  <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${it.correct ? "bg-green-500" : "bg-red-400"}`} />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    <span className="font-semibold">{getSectionV2(exam, it.section).shortName} {numbers.get(it.id)}</span>
                    <span className="text-gray-500 dark:text-gray-400"> · {exam.domainLabels[it.domain] ?? it.domain}{q.skill ? ` · ${q.skill}` : ""}</span>
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4">
                    <QuestionView question={q} stimulus={getStimulus(exam.id, q)} optionOrder={(q.options ?? []).map((_, k) => k)} answer={it.answer} onAnswer={() => {}} reveal disabled layout="stack" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link href={routes.test(testNumber)} className="v2-tap flex flex-1 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">Retake Practice Test {testNumber}</Link>
        <Link href={routes.dashboard} className="v2-tap flex flex-1 items-center justify-center rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold">Back to dashboard</Link>
      </div>
    </div>
  );
}
