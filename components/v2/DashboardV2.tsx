"use client";

// v2 dashboard in the TigerTest style: goal first, then a numbered step list
// (one mastery drill per skill area, then the full timed test) with stamps
// that turn green, and the tiger calming down as steps complete. Built on the
// same ProgressCard and tiger artwork as the v1 exam dashboards.

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Smartphone, Monitor, Pencil } from "lucide-react";
import { ExamV2Config, TestResultV2 } from "@/lib/v2/types";
import { getBank } from "@/lib/v2/bank";
import { getSectionV2, stagesOf, v2Routes } from "@/lib/v2/registry";
import { sessionKey } from "@/lib/v2/session";
import { drillKey, drillQuestions, EMPTY_DRILL } from "@/lib/v2/training";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";

function heroTitle(done: number, total: number): string {
  if (done === 0) return `Complete all ${total} steps`;
  if (done === total) return "You're ready";
  if (done === total - 1) return "One left";
  if (done === 1) return `Good start. 1 of ${total} done`;
  const frac = done / total;
  if (frac < 0.45) return `${done} of ${total} done`;
  if (frac < 0.55) return "Halfway there";
  if (frac < 0.8) return "More than halfway";
  return `${done} of ${total}, almost there`;
}

function heroSub(exam: ExamV2Config, done: number, total: number): string {
  const frac = total > 0 ? done / total : 0;
  const subs = exam.copy.heroSubs;
  if (done === 0) return subs[0];
  if (frac >= 1) return subs[4];
  if (frac < 0.4) return subs[1];
  if (frac < 0.7) return subs[2];
  return subs[3];
}

/** Same ladder as the v1 dashboards: worried at 0, beaming at 100%. */
function tigerFace(done: number, total: number, examId: string): string {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const expr: TigerExpression = pct >= 100 ? 1 : pct >= 75 ? 2 : pct >= 50 ? 4 : pct >= 25 ? 6 : 8;
  return getTigerAsset(examId, expr);
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DashboardV2({ exam }: { exam: ExamV2Config }) {
  const routes = v2Routes(exam);
  const hydrated = useHydration();
  const sessions = useV2Store((s) => s.sessions);
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const savedGoal = useV2Store((s) => s.goals[exam.id]);
  const setGoal = useV2Store((s) => s.setGoal);
  const removeSession = useV2Store((s) => s.removeSession);
  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const stageDefs = stagesOf(exam);
  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const [editingGoal, setEditingGoal] = useState(false);
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  const goal = savedGoal ?? exam.defaultGoal;
  const hasGoal = hydrated && savedGoal !== undefined;

  // ---- Step state ----
  const drillSteps = exam.drills.map((d) => {
    const qs = drillQuestions(bank, d);
    const st = (hydrated ? drills[drillKey(exam.id, d.key)] : undefined) ?? EMPTY_DRILL;
    const mastered = st.masteredIds.filter((id) => qs.some((q) => q.id === id)).length;
    return { def: d, total: qs.length, mastered, started: st.seen > 0, complete: qs.length > 0 && mastered === qs.length };
  });
  const testSteps = exam.tests.map((t) => {
    const attempts = history.filter((r) => r.testNumber === t.number);
    const best = attempts.length ? Math.max(...attempts.map((a) => a.composite)) : null;
    const session = hydrated ? sessions[sessionKey(exam.id, t.number)] : undefined;
    return { def: t, attempts, best, session, complete: best !== null && best >= goal };
  });
  const totalSteps = drillSteps.length + testSteps.length;
  const doneSteps = drillSteps.filter((s) => s.complete).length + testSteps.filter((s) => s.complete).length;
  const anyProgress = drillSteps.some((s) => s.started) || testSteps.some((s) => s.attempts.length > 0 || s.session);
  const bestOverall = history.length ? Math.max(...history.map((r) => r.composite)) : null;

  // ---- Goal picker: the first thing a new student sees ----
  const goalPicker = (
    <div className="rounded-xl bg-white border border-gray-100 p-4 mb-6">
      <div className="flex items-center gap-4">
        <Image src={getTigerAsset(exam.id, 3)} alt="Tiger mascot" width={48} height={48} className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-900">{editingGoal ? "Change your goal" : "What score are you aiming for?"}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Pick a target. Your plan finishes when a full practice test hits it.</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {exam.goalChoices.map((g) => {
          const selected = hasGoal && g === goal;
          return (
            <button
              key={g}
              type="button"
              onClick={() => {
                setGoal(exam.id, g);
                setEditingGoal(false);
              }}
              className={`v2-tap rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                selected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white active:bg-brand-light [@media(hover:hover)]:hover:border-brand"
              }`}
            >
              <div className={`text-xl font-black tabular-nums ${selected ? "text-green-700" : "text-gray-900"}`}>{g}</div>
              <div className="text-[11px] leading-snug text-gray-500">{exam.goalNotes[g]}</div>
            </button>
          );
        })}
      </div>
      {editingGoal && (
        <button type="button" onClick={() => setEditingGoal(false)} className="mt-3 w-full text-center text-xs font-semibold text-gray-500">
          Keep {goal}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">
          {!hydrated ? (
            <div className="h-40" />
          ) : !hasGoal || editingGoal ? (
            goalPicker
          ) : (
            /* Hero: tiger, steps title, counter, then the goal strip */
            <div className="rounded-xl bg-white border border-gray-100 p-4 mb-6">
              <div className="flex items-center gap-4">
                <Image src={tigerFace(doneSteps, totalSteps, exam.id)} alt="Tiger mascot" width={48} height={48} className="w-12 h-12 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-900">{heroTitle(doneSteps, totalSteps)}</h1>
                  <p className="text-xs text-gray-500 mt-0.5">{heroSub(exam, doneSteps, totalSteps)}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-2xl font-bold tabular-nums ${doneSteps === totalSteps ? "text-green-600" : "text-gray-900"}`}>
                    {doneSteps}/{totalSteps}
                  </div>
                  <div className="text-xs text-gray-400">complete</div>
                </div>
              </div>
              <GoalStrip exam={exam} goal={goal} best={bestOverall} onEdit={() => setEditingGoal(true)} />
            </div>
          )}

          {/* Drills: one per skill area, built for the phone */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5" /> Train by skill · on your phone
          </p>
          <div className="mb-6 space-y-1.5">
            {drillSteps.map((s, index) => {
              const section = getSectionV2(exam, s.def.section);
              const isStartHere = index === 0 && !anyProgress;
              const newSection = index === 0 || drillSteps[index - 1].def.section !== s.def.section;
              return (
                <div key={s.def.key}>
                  {newSection && (
                    <p className={`text-[11px] font-semibold text-gray-500 mb-1.5 ${index === 0 ? "" : "mt-3"}`}>{section.name}</p>
                  )}
                  <ProgressCard
                    title={s.def.name}
                    subtitle={`${s.mastered}/${s.total} mastered · ${s.def.weight}`}
                    completed={s.complete}
                    stepNumber={index + 1}
                    stamp={
                      s.complete
                        ? { label: "Complete!", color: "green" }
                        : isStartHere && hasGoal
                          ? { label: "Start here", color: "amber" }
                          : s.started
                            ? { label: "Keep going", color: "amber" }
                            : undefined
                    }
                    href={routes.drill(s.def.key)}
                  />
                </div>
              );
            })}
          </div>

          {/* Full-length tests: the desktop simulation */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
            <Monitor className="h-3.5 w-3.5" /> Full practice test · on a desktop, timed
          </p>
          <div className="mb-6 space-y-1.5">
            {testSteps.map((s, index) => {
              const hasAttempts = s.attempts.length > 0;
              const isExpanded = expandedTest === s.def.number;
              const def = s.session ? stageDefs[s.session.stage] : undefined;

              let subtitle = `${exam.sections.map((x) => x.shortName).join(" + ")} · ${exam.testLength} · adaptive`;
              if (s.session && def) subtitle = `In progress · ${def.section.name}, module ${def.module.module}`;
              else if (s.complete && s.best !== null) subtitle = `Best ${s.best} · goal ${goal} hit`;
              else if (s.best !== null) subtitle = `Best ${s.best} · ${goal - s.best} to your goal of ${goal}`;

              let stamp: { label: string; color: "green" | "amber" | "red" } | undefined;
              if (s.session) stamp = { label: "Keep going", color: "amber" };
              else if (s.complete) stamp = { label: "Goal hit!", color: "green" };
              else if (hasAttempts) stamp = { label: "Retake it", color: "amber" };

              return (
                <div key={s.def.number}>
                  <ProgressCard
                    title={`🎯 ${s.def.name}`}
                    subtitle={subtitle}
                    completed={s.complete}
                    stepNumber={drillSteps.length + index + 1}
                    stamp={stamp}
                    href={hasAttempts ? undefined : routes.test(s.def.number)}
                    onClick={hasAttempts ? () => setExpandedTest(isExpanded ? null : s.def.number) : undefined}
                    attachedBottom={isExpanded && hasAttempts}
                  >
                    {hasAttempts && (
                      <p className={`text-xs mt-1 ${s.complete ? "text-green-600" : "text-gray-400"}`}>
                        {s.attempts.length === 1 ? "1 attempt" : `${s.attempts.length} attempts`} {isExpanded ? "▴" : "▾"}
                      </p>
                    )}
                  </ProgressCard>
                  {hasAttempts && (
                    <Collapse open={isExpanded}>
                      <AttemptsPanel
                        exam={exam}
                        attempts={s.attempts}
                        goal={goal}
                        complete={s.complete}
                        resultsHref={routes.results(s.def.number)}
                        testHref={routes.test(s.def.number)}
                        inProgress={!!s.session}
                        onDiscard={s.session ? () => removeSession(s.session!.key) : undefined}
                      />
                    </Collapse>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[11px] text-gray-400">{exam.copy.sourceLine}</p>
        </div>
      </div>
    </div>
  );
}

/** Goal vs best on the 400-1600 scale, with an edit button. Green once hit. */
function GoalStrip({ exam, goal, best, onEdit }: { exam: ExamV2Config; goal: number; best: number | null; onEdit: () => void }) {
  const { min, max } = exam.composite;
  const pos = (v: number) => `${Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))}%`;
  const hit = best !== null && best >= goal;
  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">
          Goal <span className="font-bold text-gray-900 tabular-nums">{goal}</span>
          {best !== null && (
            <>
              {" · "}Best <span className={`font-bold tabular-nums ${hit ? "text-green-600" : "text-gray-900"}`}>{best}</span>
            </>
          )}
        </span>
        <button type="button" onClick={onEdit} className="flex items-center gap-1 font-semibold text-brand">
          <Pencil className="h-3 w-3" /> Change
        </button>
      </div>
      <div className="relative mt-2 h-2 rounded-full bg-gray-100">
        {best !== null && <div className={`absolute inset-y-0 left-0 rounded-full ${hit ? "bg-green-500" : "bg-brand"}`} style={{ width: pos(best) }} />}
        <div className="absolute -top-1 h-4 w-0.5 rounded bg-gray-900" style={{ left: pos(goal) }} aria-hidden />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-gray-400">
        <span>{min}</span>
        <span>{best === null ? "Take the full test to see your score" : hit ? "Goal hit" : `${goal - best} to go`}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function AttemptsPanel({
  exam,
  attempts,
  goal,
  complete,
  resultsHref,
  testHref,
  inProgress,
  onDiscard,
}: {
  exam: ExamV2Config;
  attempts: TestResultV2[];
  goal: number;
  complete: boolean;
  resultsHref: string;
  testHref: string;
  inProgress: boolean;
  onDiscard?: () => void;
}) {
  return (
    <div className={`rounded-b-xl border border-t-0 px-4 pb-4 ${complete ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" : "bg-white border-gray-100"}`}>
      <div className="divide-y divide-gray-100">
        {attempts.map((a, i) => (
          <div key={a.completedAt} className="flex items-center justify-between py-2 text-sm">
            <span className="text-gray-500">
              {i === attempts.length - 1 ? "First" : `#${attempts.length - i}`} · {shortDate(a.completedAt)}
            </span>
            <span className="flex items-center gap-3 tabular-nums">
              <span className="text-xs text-gray-400">{a.sections.map((s) => `${getSectionV2(exam, s.section).shortName} ${s.scaled}`).join(" · ")}</span>
              <span className={`font-bold ${a.composite >= goal ? "text-green-600" : "text-gray-900"}`}>{a.composite}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        <Link href={resultsHref} className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3">
          Review the latest attempt <ChevronRight className="h-4 w-4" />
        </Link>
        <Link href={testHref} className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-200 text-gray-800 font-bold text-sm px-4 py-3">
          {inProgress ? "Resume the test" : "Retake the test"} <ChevronRight className="h-4 w-4" />
        </Link>
        {onDiscard && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Discard the test in progress and start over next time?")) onDiscard();
            }}
            className="w-full text-center text-xs font-semibold text-gray-400"
          >
            Discard the attempt in progress
          </button>
        )}
      </div>
    </div>
  );
}
