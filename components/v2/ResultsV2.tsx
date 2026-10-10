"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ExamV2Config, TestResultV2 } from "@/lib/v2/types";
import { getQuestionIndex, getStimulus } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { getTigerAsset } from "@/lib/tigerAssets";
import { QuestionView } from "./QuestionView";

export function ResultsV2({ exam, testNumber }: { exam: ExamV2Config; testNumber: number }) {
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const results = useV2Store((s) => s.results);
  const goal = useV2Store((s) => s.goals[exam.id]) ?? exam.defaultGoal;
  const byId = useMemo(() => getQuestionIndex(exam.id), [exam.id]);
  const history = useMemo(() => resultsForExam(results, exam.id).filter((r) => r.testNumber === testNumber), [results, exam.id, testNumber]);
  const [filter, setFilter] = useState<"wrong" | "all">("wrong");
  const [open, setOpen] = useState<string | null>(null);
  const [sectionFilter, setSectionFilter] = useState<string>("all");

  if (!hydrated) return <div className="p-8 text-center text-gray-600">Loading...</div>;
  const result: TestResultV2 | undefined = history[0];
  if (!result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
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
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="text-sm font-semibold uppercase tracking-wide text-brand">{exam.shortName} · Practice Test {testNumber}</div>
      <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-2">
        <Image src={getTigerAsset(exam.id, result.composite >= goal ? 2 : 4)} alt="" width={80} height={80} className="h-20 w-20 shrink-0 object-contain" />
        <div>
          <div className="text-5xl font-black tabular-nums md:text-6xl">{result.composite}</div>
          <div className="text-sm text-gray-600">{exam.composite.name} estimate · goal {goal}</div>
        </div>
        {delta !== null && (
          <div className={`rounded-full px-3 py-1 text-sm font-bold ${delta >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {delta >= 0 ? "+" : ""}{delta} vs last attempt
          </div>
        )}
        <div className={`rounded-full px-3 py-1 text-sm font-bold ${result.composite >= goal ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-800"}`}>
          {result.composite >= goal ? "At your goal" : `${goal - result.composite} to your goal`}
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">{exam.copy.scoreNote}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {result.sections.map((s) => {
          const def = getSectionV2(exam, s.section);
          return (
            <div key={s.section} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-baseline justify-between">
                <div className="font-bold">{def.name}</div>
                <div className="text-sm text-gray-500">{s.raw} / {s.total} correct</div>
              </div>
              <div className="mt-1 text-3xl font-black tabular-nums">
                {s.scaled}{def.scale.max === 100 && def.scale.min === 0 ? "%" : ""}{" "}
                {def.scale.band > 0 && <span className="text-sm font-semibold text-gray-500">({Math.max(def.scale.min, s.scaled - def.scale.band)} to {Math.min(def.scale.max, s.scaled + def.scale.band)})</span>}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {s.byModule.map((m) => `Module ${m.module}${m.variant ? ` (${m.variant === "upper" ? "harder" : "easier"})` : ""}: ${m.raw}/${m.total}`).join(" · ")}
              </div>
              <div className="mt-4 space-y-2">
                {def.domains.map((d) => {
                  const v = s.byDomain[d] ?? { correct: 0, total: 0 };
                  const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
                  return (
                    <div key={d}>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">{exam.domainLabels[d] ?? d}</span>
                        <span className="tabular-nums text-gray-500">{v.correct}/{v.total}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
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
          <p className="mt-1 text-sm text-gray-700">
            You got {weakest.correct} of {weakest.total} in {exam.domainLabels[weakest.domain]}. The drill brings every miss back until you master it, then retake the test on a desktop.
          </p>
          <Link href={routes.drill(weakDrill.key)} className="v2-tap mt-3 inline-flex items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white">Start the drill</Link>
        </div>
      )}

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Review</h2>
          <div className="flex gap-1 text-sm">
            <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)} className="v2-tap rounded-lg border border-gray-300 bg-white px-2 text-sm">
              <option value="all">All sections</option>
              {exam.sections.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
            </select>
            <button type="button" onClick={() => setFilter("wrong")} className={`v2-tap rounded-lg px-3 font-semibold ${filter === "wrong" ? "bg-brand text-white" : "bg-gray-100"}`}>Missed</button>
            <button type="button" onClick={() => setFilter("all")} className={`v2-tap rounded-lg px-3 font-semibold ${filter === "all" ? "bg-brand text-white" : "bg-gray-100"}`}>All</button>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {items.length === 0 && <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">Nothing to show here. Nice.</div>}
          {items.map((it) => {
            const q = byId.get(it.id);
            if (!q) return null;
            const isOpen = open === it.id;
            return (
              <div key={it.id} className="rounded-xl border border-gray-200 bg-white">
                <button type="button" onClick={() => setOpen(isOpen ? null : it.id)} className="v2-tap flex w-full items-center gap-3 px-4 text-left">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${it.correct ? "bg-green-500" : "bg-red-400"}`} />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    <span className="font-semibold">{getSectionV2(exam, it.section).shortName} {numbers.get(it.id)}</span>
                    <span className="text-gray-500"> · {exam.domainLabels[it.domain] ?? it.domain}{q.skill ? ` · ${q.skill}` : ""}</span>
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-4 py-4">
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
        <Link href={routes.dashboard} className="v2-tap flex flex-1 items-center justify-center rounded-xl border-2 border-gray-300 bg-white text-sm font-semibold">Back to dashboard</Link>
      </div>
    </div>
  );
}
