"use client";

// Stats page for the v2 exams, the counterpart of components/exam/ExamStatsPage:
// practice test scores, accuracy per drill topic (test answers and drill
// answers together) and the questions missed most, each opening the same
// read-only review as the results page. Everything comes from useV2Store, so
// guests see their own local progress too.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { AnswerValue, DrillDef, ExamV2Config } from "@/lib/v2/types";
import { getBank, getQuestionIndex, getStimulus } from "@/lib/v2/bank";
import { getSectionV2, v2Routes } from "@/lib/v2/registry";
import { drillQuestions, drillStateFor } from "@/lib/v2/training";
import { goalFor } from "@/lib/v2/goals";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { QuestionView } from "./QuestionView";

const MISSED_SHOWN = 10;

interface TopicRow {
  drill: DrillDef;
  correct: number;
  answered: number;
  mastered: number;
  size: number;
}

interface MissedRow {
  id: string;
  misses: number;
  mastered: boolean;
  lastAnswer?: AnswerValue;
}

export function StatsV2({ exam }: { exam: ExamV2Config }) {
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const savedGoal = useV2Store((s) => s.goals[exam.id]);
  const goal = goalFor(exam, savedGoal);
  const byId = useMemo(() => getQuestionIndex(exam.id), [exam.id]);
  const [open, setOpen] = useState<string | null>(null);
  const [showAllMissed, setShowAllMissed] = useState(false);

  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const pct = exam.composite.max === 100 ? "%" : "";

  const topics = useMemo((): TopicRow[] => {
    const bank = getBank(exam.id).questions;
    return exam.drills.map((drill) => {
      const questions = drillQuestions(bank, drill, exam);
      const state = drillStateFor(drills, exam.id, drill, questions);
      const inTopic = (section: string, domain: string) => section === drill.section && drill.domains.includes(domain);
      const items = history.flatMap((r) => r.items.filter((it) => inTopic(it.section, it.domain)));
      return {
        drill,
        correct: state.correct + items.filter((it) => it.correct).length,
        answered: state.seen + items.length,
        mastered: state.masteredIds.length,
        size: questions.length,
      };
    });
  }, [exam, drills, history]);

  const missed = useMemo((): MissedRow[] => {
    const rows = new Map<string, MissedRow>();
    const masteredIds = new Set(Object.entries(drills).filter(([k]) => k.startsWith(`${exam.id}:`)).flatMap(([, d]) => d.masteredIds));
    // Oldest first, so lastAnswer ends on the newest miss.
    for (const r of [...history].reverse()) {
      for (const it of r.items) {
        if (it.correct) continue;
        const row = rows.get(it.id) ?? { id: it.id, misses: 0, mastered: false };
        rows.set(it.id, { ...row, misses: row.misses + 1, lastAnswer: it.answer });
      }
    }
    for (const [key, d] of Object.entries(drills)) {
      if (!key.startsWith(`${exam.id}:`)) continue;
      for (const id of d.wrongQueue) {
        const row = rows.get(id) ?? { id, misses: 0, mastered: false };
        rows.set(id, { ...row, misses: row.misses + 1 });
      }
    }
    return [...rows.values()]
      .filter((row) => byId.has(row.id))
      .map((row) => ({ ...row, mastered: masteredIds.has(row.id) }))
      .sort((a, b) => Number(a.mastered) - Number(b.mastered) || b.misses - a.misses);
  }, [history, drills, exam.id, byId]);

  if (!hydrated) return <div className="flex-1 bg-gray-50 dark:bg-gray-950" />;

  const answeredIds = new Set<string>();
  history.forEach((r) => r.items.forEach((it) => answeredIds.add(it.id)));
  Object.entries(drills).forEach(([k, d]) => {
    if (k.startsWith(`${exam.id}:`)) [...d.masteredIds, ...d.wrongQueue].forEach((id) => answeredIds.add(id));
  });
  const bankSize = byId.size;
  const best = history.length ? Math.max(...history.map((r) => r.composite)) : null;
  const totalAnswered = topics.reduce((a, t) => a + t.answered, 0);
  const totalCorrect = topics.reduce((a, t) => a + t.correct, 0);
  const sortedTopics = [...topics].sort((a, b) => {
    if (!a.answered || !b.answered) return Number(!a.answered) - Number(!b.answered);
    return a.correct / a.answered - b.correct / b.answered;
  });
  const shownMissed = showAllMissed ? missed : missed.slice(0, MISSED_SHOWN);
  const empty = answeredIds.size === 0;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-transparent dark:to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 py-6 pb-10 max-w-3xl">
          <Link href={routes.dashboard} className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-4">
            <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">Your stats</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              You&apos;ve answered {answeredIds.size} of {bankSize} {exam.shortName} questions.
            </p>
          </div>

          {empty ? (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">Nothing here yet. Answer a few drill questions or take a practice test and your scores and misses show up here.</p>
              <Link href={routes.dashboard} className="v2-tap mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white">
                Go to your dashboard
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Tile value={`${answeredIds.size}`} label="Questions seen" />
                <Tile value={totalAnswered ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : "–"} label="Accuracy" />
                <Tile value={best === null ? "–" : `${best}${pct}`} label={`Best test · goal ${goal}${pct}`} good={best !== null && best >= goal} />
              </div>

              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">By topic, weakest first</h2>
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 mb-6">
                {sortedTopics.map((t) => {
                  const acc = t.answered ? Math.round((t.correct / t.answered) * 100) : null;
                  return (
                    <Link key={t.drill.key} href={routes.drill(t.drill.key)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">{t.drill.name}</span>
                          <span className={`text-sm font-bold tabular-nums ${accColor(acc)}`}>{acc === null ? "–" : `${acc}%`}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div className={`h-full rounded-full ${accBar(acc)}`} style={{ width: `${acc ?? 0}%` }} />
                        </div>
                        <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                          {t.answered ? `${t.correct} of ${t.answered} right` : "Not started"} · {t.mastered} of {t.size} mastered in the drill
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {history.length > 0 && (
                <>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">Practice test scores</h2>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800 mb-6">
                    {history.map((r) => (
                      <Link key={`${r.key}:${r.completedAt}`} href={routes.results(r.testNumber)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                            {exam.tests.find((t) => t.number === r.testNumber)?.name ?? `Practice Test ${r.testNumber}`}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">
                            {new Date(r.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                            {exam.sections.length > 1 && ` · ${r.sections.map((s) => `${getSectionV2(exam, s.section).shortName} ${s.scaled}`).join(" · ")}`}
                          </div>
                        </div>
                        <span className={`text-lg font-black tabular-nums ${r.composite >= goal ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>
                          {r.composite}{pct}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-2">Questions you&apos;ve missed</h2>
              {missed.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500 dark:text-gray-400">No misses yet. Nice.</div>
              ) : (
                <div className="space-y-2">
                  {shownMissed.map((row) => {
                    const q = byId.get(row.id)!;
                    const isOpen = open === row.id;
                    return (
                      <div key={row.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : row.id)} className="v2-tap flex w-full items-center gap-3 px-4 py-2 text-left">
                          <div className="shrink-0 text-center min-w-[3rem]">
                            <div className={`text-base font-bold tabular-nums leading-none ${row.mastered ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{row.misses}</div>
                            <div className="text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-0.5">{row.misses === 1 ? "miss" : "misses"}</div>
                          </div>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-50">{plain(q.passage ?? q.stem)}</span>
                            <span className="block truncate text-[11px] text-gray-500 dark:text-gray-400">
                              {exam.domainLabels[q.domain] ?? q.domain}
                              {q.skill && ` · ${q.skill}`}
                              {row.mastered && <span className="text-green-600 dark:text-green-400"> · mastered in the drill</span>}
                            </span>
                          </span>
                          {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />}
                        </button>
                        {isOpen && (
                          <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4">
                            <QuestionView question={q} stimulus={getStimulus(exam.id, q)} optionOrder={(q.options ?? []).map((_, k) => k)} answer={row.lastAnswer} onAnswer={() => {}} reveal disabled layout="stack" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {missed.length > MISSED_SHOWN && (
                    <button type="button" onClick={() => setShowAllMissed(!showAllMissed)} className="v2-tap w-full rounded-xl text-sm font-semibold text-brand-dark">
                      {showAllMissed ? "Show fewer" : `Show all ${missed.length}`}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Tile({ value, label, good = false }: { value: string; label: string; good?: boolean }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-3 text-center">
      <div className={`text-xl font-black tabular-nums ${good ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>{value}</div>
      <div className="text-[10px] leading-tight text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
    </div>
  );
}

function accColor(acc: number | null) {
  if (acc === null) return "text-gray-400";
  return acc >= 80 ? "text-green-600 dark:text-green-400" : acc >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-500 dark:text-red-400";
}

function accBar(acc: number | null) {
  if (acc === null) return "";
  return acc >= 80 ? "bg-green-500" : acc >= 60 ? "bg-yellow-400" : "bg-red-400";
}

/** A one-line preview of a stem: markup, KaTeX dollars and slots stripped. */
function plain(text: string) {
  return text
    .replace(/\{\{([^}]*)\}\}/g, "$1")
    .replace(/\[\[\d+\]\]/g, "___")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
