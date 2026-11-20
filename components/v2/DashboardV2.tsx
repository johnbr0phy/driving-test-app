"use client";

// v2 dashboard in the Tigertest style: goal first, then a numbered step list
// (one mastery drill per skill area, then the full timed test) with stamps
// that turn green, and the tiger calming down as steps complete. Built on the
// same ProgressCard and tiger artwork as the v1 exam dashboards.

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, ChevronRight, Smartphone, Monitor, Pencil, CheckCircle, Users } from "lucide-react";
import { ExamV2Config, TestResultV2 } from "@/lib/v2/types";
import { goalFor } from "@/lib/v2/goals";
import { getBank } from "@/lib/v2/bank";
import { getSectionV2, stagesOf, v2Routes } from "@/lib/v2/registry";
import { sessionKey } from "@/lib/v2/session";
import { drillQuestions, drillStateFor, EMPTY_DRILL } from "@/lib/v2/training";
import { basicsDone, basicsFor } from "@/lib/v2/basics";
import { useV2Store, resultsForExam } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/contexts/AuthContext";
import { GuestSaveCard, v2GuestAnswered } from "@/components/GuestSaveCard";
import { ProgressCard, Collapse } from "@/components/dashboard/ProgressCard";
import { getTigerAsset, TigerExpression } from "@/lib/tigerAssets";
import { useV2Premium } from "@/hooks/useV2Premium";
import { usePurchaseReturn } from "@/hooks/usePurchaseReturn";
import { useCommunityAvailable } from "@/hooks/useCommunityStats";
import { hasDrillProgress, isDrillLocked, isTestLocked } from "@/lib/v2/premium";
import { useV2Paywall, V2Paywall } from "./V2Paywall";
import { V1ProgressCarryOver } from "./V1ProgressCarryOver";
import { SuperAmazingCard } from "@/components/SuperAmazingCard";
import { ClassBanner } from "@/components/exam/ClassBanner";
import { TeachNudge } from "@/components/TeachNudge";
import { heroLine } from "@/lib/heroCopy";
import { useHeroVariant } from "@/hooks/useHeroVariant";
import { regionOfTest } from "@/lib/region";
import { useV2Language, useV2Ui } from "@/lib/v2/ui";
import type { Language } from "@/i18n";
import { useTrackDashboardView } from "@/hooks/useTrackDashboardView";

/** Same ladder as the v1 dashboards: worried at 0, beaming at 100%. */
function tigerFace(done: number, total: number, examId: string): string {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const expr: TigerExpression = pct >= 100 ? 1 : pct >= 75 ? 2 : pct >= 50 ? 4 : pct >= 25 ? 6 : 8;
  return getTigerAsset(examId, expr);
}

function shortDate(iso: string, examId: string, lang: Language) {
  const locale = lang === "en" ? (regionOfTest(examId) === "UK" ? "en-GB" : "en-US") : lang;
  return new Date(iso).toLocaleDateString(locale, { month: "short", day: "numeric" });
}

export function DashboardV2({ exam }: { exam: ExamV2Config }) {
  useTrackDashboardView();
  const routes = v2Routes(exam);
  const ui = useV2Ui().dashboard;
  const heroVariant = useHeroVariant();
  const hydrated = useHydration();
  // Opening this dashboard makes it the current test (the logo's home).
  const setPrimaryExam = useStore((s) => s.setPrimaryExam);
  useEffect(() => {
    if (hydrated) setPrimaryExam(exam.id);
  }, [hydrated, exam.id, setPrimaryExam]);
  const sessions = useV2Store((s) => s.sessions);
  const results = useV2Store((s) => s.results);
  const drills = useV2Store((s) => s.drills);
  const basics = useV2Store((s) => s.basics);
  const savedGoal = useV2Store((s) => s.goals[exam.id]);
  const setGoal = useV2Store((s) => s.setGoal);
  const removeSession = useV2Store((s) => s.removeSession);
  const bank = useMemo(() => getBank(exam.id).questions, [exam.id]);
  const stageDefs = stagesOf(exam);
  const history = useMemo(() => resultsForExam(results, exam.id), [results, exam.id]);
  const [editingGoal, setEditingGoal] = useState(false);
  const [expandedTest, setExpandedTest] = useState<number | null>(null);
  const { isPremium, ready: premiumReady } = useV2Premium(exam.id);
  const paywall = useV2Paywall(exam, "dashboard");
  // Common Mistakes card, once this exam has enough answers (lib/communityStats.ts).
  const communityOn = useCommunityAvailable(exam.id);
  const { user, loading: authLoading } = useAuth();
  const signedOut = hydrated && !authLoading && !user;
  // What a signed-out visitor stands to lose: drill answers plus test items.
  const guestAnswered = useMemo(() => v2GuestAnswered(drills, history, exam.id), [drills, history, exam.id]);

  const fixedGoal = exam.fixedGoal !== undefined;
  const goal = goalFor(exam, savedGoal);
  const hasGoal = hydrated && (fixedGoal || savedGoal !== undefined);

  // ---- Step state ----
  const drillSteps = exam.drills.map((d) => {
    const qs = drillQuestions(bank, d, exam);
    const st = hydrated ? drillStateFor(drills, exam.id, d, qs) : EMPTY_DRILL;
    const mastered = st.masteredIds.filter((id) => qs.some((q) => q.id === id)).length;
    // Same rule as the drill page: open for anyone already working in it.
    const locked = premiumReady && isDrillLocked(exam, d.key, isPremium) && !(hydrated && hasDrillProgress(drills, basics, exam, d));
    // Basics: the free rule-card level in front of the questions (lib/v2/basics).
    const skills = basicsFor(d);
    const learned = hydrated ? basicsDone(basics, exam.id, skills) : 0;
    return { def: d, total: qs.length, mastered, locked, seen: st.seen > 0, started: st.seen > 0 || learned > 0, complete: qs.length > 0 && mastered === qs.length, skills: skills.length, learned };
  });
  const testSteps = exam.tests.map((t) => {
    const attempts = history.filter((r) => r.testNumber === t.number);
    const best = attempts.length ? Math.max(...attempts.map((a) => a.composite)) : null;
    const session = hydrated ? sessions[sessionKey(exam.id, t.number)] : undefined;
    // Locked only while there is nothing of theirs to show: an attempt they
    // already made, or one in progress, stays reachable.
    const locked = premiumReady && isTestLocked(exam, t.number, isPremium) && !session && attempts.length === 0;
    return { def: t, attempts, best, session, locked, complete: best !== null && best >= goal };
  });
  // Phone steps: a Basics step in front of each drill that has one, then the
  // drill's exam-level step. Both count toward the N/N at the top.
  type PhoneStep = { kind: "basics" | "exam"; drill: (typeof drillSteps)[number]; complete: boolean; started: boolean };
  const phoneSteps: PhoneStep[] = drillSteps.flatMap((d) => {
    const steps: PhoneStep[] = [];
    if (d.skills > 0) steps.push({ kind: "basics", drill: d, complete: d.learned === d.skills, started: d.learned > 0 });
    steps.push({ kind: "exam", drill: d, complete: d.complete, started: d.mastered > 0 || d.seen });
    return steps;
  });
  const totalSteps = phoneSteps.length + testSteps.length;
  const doneSteps = phoneSteps.filter((s) => s.complete).length + testSteps.filter((s) => s.complete).length;
  const anyProgress = drillSteps.some((s) => s.started) || testSteps.some((s) => s.attempts.length > 0 || s.session);
  const bestOverall = history.length ? Math.max(...history.map((r) => r.composite)) : null;

  // The row a celebration returned to. Only that row shows a focus ring, so a
  // plain tap on a row (which focuses its tabIndex=-1 wrapper) draws nothing.
  const [returnedTo, setReturnedTo] = useState<string | null>(null);

  // A celebration returns here deliberately, to show the persisted progress.
  // Consume the marker so Back/re-entry does not replay the focus treatment.
  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    const completed = url.searchParams.get("completed");
    if (!completed) return;
    const [kind, key] = completed.split(":");
    const drill = drillSteps.find((step) => step.def.key === key);
    const hasProgress = kind === "basics" ? !!drill && drill.learned > 0
      : kind === "drill" ? !!drill?.complete
      : kind === "test" && testSteps.some((step) => String(step.def.number) === key && step.complete);
    const target = hasProgress ? document.getElementById(`progress-${completed}`) : null;
    if (target) {
      setReturnedTo(completed);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "center", behavior: "instant" });
    }
    url.searchParams.delete("completed");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [hydrated, exam.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Goal picker: the first thing a new student sees ----
  const goalPicker = (
    <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
      <div className="flex items-center gap-4">
        <Image src={getTigerAsset(exam.id, 3)} alt={ui.tigerAlt} width={48} height={48} className="w-12 h-12 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{editingGoal ? ui.goalChangeTitle : ui.goalAskTitle}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ui.goalPickHint}</p>
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
                selected ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 active:bg-brand-light [@media(hover:hover)]:hover:border-brand"
              }`}
            >
              <div className={`text-xl font-black tabular-nums ${selected ? "text-green-700 dark:text-green-300" : "text-gray-900 dark:text-gray-50"}`}>{g}</div>
              <div className="text-[11px] leading-snug text-gray-500 dark:text-gray-400">{exam.goalNotes[g]}</div>
            </button>
          );
        })}
      </div>
      {exam.copy.progressNote && <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">{exam.copy.progressNote}</p>}
      {editingGoal && (
        <button type="button" onClick={() => setEditingGoal(false)} className="mt-3 w-full text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
          {ui.keepGoal(goal)}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      {exam.fromV1 && <V1ProgressCarryOver exam={exam} />}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-light to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 sm:px-6 py-6 pb-10 max-w-lg md:max-w-2xl lg:max-w-4xl">
          <Suspense fallback={null}>
            <PurchaseBanner exam={exam} />
          </Suspense>
          <ClassBanner examId={exam.id} className="mb-4" />
          {signedOut && (
            <GuestSaveCard
              className="mb-4"
              dataTheme={exam.id}
              signupHref={`/signup?redirect=${encodeURIComponent(routes.dashboard)}`}
              answered={guestAnswered}
              tests={history.length}
            />
          )}
          {!hydrated ? (
            <div className="h-40" />
          ) : !fixedGoal && (!hasGoal || editingGoal) ? (
            goalPicker
          ) : (
            /* Hero: tiger, steps title, counter, then the goal strip */
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 mb-6">
              <div className="flex items-center gap-4">
                <Image src={tigerFace(doneSteps, totalSteps, exam.id)} alt={ui.tigerAlt} width={48} height={48} className="w-12 h-12 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">{ui.heroTitle(doneSteps, totalSteps, exam.copy.completedTitle)}</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{heroLine(exam.copy.heroSubs, doneSteps, totalSteps, heroVariant, exam.language ?? "en")}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-2xl font-bold tabular-nums ${doneSteps === totalSteps ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>
                    {doneSteps}/{totalSteps}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ui.complete}</div>
                </div>
              </div>
              <GoalStrip exam={exam} goal={goal} best={bestOverall} onEdit={fixedGoal ? undefined : () => setEditingGoal(true)} />
              {exam.copy.progressNote && <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">{exam.copy.progressNote}</p>}
              <TeachNudge dashboardKey={`v2:${exam.id}`} examId={exam.id} done={doneSteps} />
            </div>
          )}

          {/* Drills: one per skill area, built for the phone */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5" /> {ui.phoneHeading}
          </p>
          <div className="mb-6 space-y-1.5">
            {phoneSteps.map((step, index) => {
              const s = step.drill;
              const section = getSectionV2(exam, s.def.section);
              const isStartHere = index === 0 && !anyProgress;
              // Section labels only help when the drills span more than one section.
              const newSection =
                exam.sections.length > 1 && (index === 0 || phoneSteps[index - 1].drill.def.section !== s.def.section);
              const basics = step.kind === "basics";
              // A Premium drill gates both its steps, Basics included.
              const gated = s.locked;
              const stamp = step.complete
                ? { label: ui.stampComplete, color: "green" as const }
                : isStartHere && hasGoal
                  ? { label: ui.stampStartHere, color: "amber" as const }
                  : step.started
                    ? { label: ui.stampKeepGoing, color: "amber" as const }
                    : undefined;
              const subtitle = basics
                ? gated
                  ? ui.basicsSubtitleLocked(s.skills)
                  : ui.basicsSubtitle(s.learned, s.skills)
                : gated
                  ? ui.drillSubtitleLocked(s.total)
                  : ui.drillSubtitle(s.mastered, s.total);
              // Basics opens the skill list; the exam step goes straight to the
              // questions. Anyone who already knows the basics just taps step 2.
              const firstSkill = basicsFor(s.def)[0];
              const href = basics
                ? fixedGoal && isStartHere && firstSkill
                  ? routes.basics(s.def.key, firstSkill.id)
                  : routes.drill(s.def.key)
                : routes.drillQuestions(s.def.key);
              return (
                <div key={`${s.def.key}-${step.kind}`}>
                  {/* The section name sits outside the row, so the "you came
                      back here" ring wraps only the card, not the label. */}
                  {newSection && (
                    <p className={`text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 ${index === 0 ? "" : "mt-3"}`}>{section.name}</p>
                  )}
                <div
                  id={`progress-${basics ? "basics" : "drill"}:${s.def.key}`}
                  tabIndex={-1}
                  aria-label={basics ? ui.basicsRowLabel(s.def.name, subtitle) : ui.rowLabel(s.def.name, subtitle)}
                  onBlur={() => setReturnedTo(null)}
                  className={`progress-row rounded-xl scroll-mt-6 focus:outline-none ${returnedTo === `${basics ? "basics" : "drill"}:${s.def.key}` ? `focus:ring-2 ${step.complete ? "focus:ring-green-500" : "focus:ring-brand"} focus:ring-offset-4 dark:focus:ring-offset-gray-950` : ""}`}
                >
                  <ProgressCard
                    title={basics ? ui.basicsStepTitle(s.def.name) : s.def.name}
                    subtitle={subtitle}
                    completed={step.complete}
                    stepNumber={index + 1}
                    stamp={stamp}
                    isPremiumLocked={gated}
                    href={gated ? undefined : href}
                    onClick={gated ? () => paywall.open(`drill_${s.def.key}`, ui.drillItemLabel(s.def.name)) : undefined}
                  />
                </div>
                </div>
              );
            })}
          </div>

          {/* Full-length tests: the desktop simulation */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1.5">
            <Monitor className="h-3.5 w-3.5" /> {ui.desktopHeading}
          </p>
          <div className="mb-6 space-y-1.5">
            {testSteps.map((s, index) => {
              const hasAttempts = s.attempts.length > 0;
              const isExpanded = expandedTest === s.def.number;
              const def = s.session ? stageDefs[s.session.stage] : undefined;

              const adaptive = exam.sections.some((x) => x.modules.some((m) => m.adaptive));
              // One-section exams name their length in questions, not "1 sections".
              const shape = exam.sections.length === 1 ? ui.testShapeQuestions(exam.sections[0].modules.reduce((n, m) => n + m.questionCount, 0)) : ui.testShapeSections(exam.sections.length);
              let subtitle = ui.testSubtitle(shape, exam.testLength, adaptive, !!s.def.heldOut);
              if (s.locked) subtitle = ui.testSubtitleLocked(shape, exam.testLength, !!s.def.heldOut);
              else if (s.session && def) subtitle = ui.testInProgress(def.section.name, def.module.module);
              else if (s.complete && s.best !== null) subtitle = ui.testBestHit(s.best, goal);
              else if (s.best !== null) subtitle = ui.testBestToGo(s.best, goal);

              let stamp: { label: string; color: "green" | "amber" | "red" } | undefined;
              if (s.session) stamp = { label: ui.stampKeepGoing, color: "amber" };
              else if (s.complete) stamp = { label: ui.stampGoalHit, color: "green" };
              else if (hasAttempts) stamp = { label: ui.stampRetake, color: "amber" };

              return (
                <div key={s.def.number} id={`progress-test:${s.def.number}`} tabIndex={-1} aria-label={ui.rowLabel(s.def.name, subtitle)} onBlur={() => setReturnedTo(null)} className={`progress-row rounded-xl scroll-mt-6 focus:outline-none ${returnedTo === `test:${s.def.number}` ? "focus:ring-2 focus:ring-green-500 focus:ring-offset-4 dark:focus:ring-offset-gray-950" : ""}`}>
                  <ProgressCard
                    title={`🎯 ${s.def.name}`}
                    subtitle={subtitle}
                    completed={s.complete}
                    stepNumber={phoneSteps.length + index + 1}
                    stamp={stamp}
                    isPremiumLocked={s.locked}
                    href={hasAttempts || s.locked ? undefined : routes.test(s.def.number)}
                    onClick={
                      s.locked
                        ? () => paywall.open(`test_${s.def.number}`, s.def.name)
                        : hasAttempts
                          ? () => setExpandedTest(isExpanded ? null : s.def.number)
                          : undefined
                    }
                    attachedBottom={isExpanded && hasAttempts}
                    expanded={hasAttempts && !s.locked ? isExpanded : undefined}
                  >
                    {hasAttempts && (
                      <p className={`text-xs mt-1 ${s.complete ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {ui.attempts(s.attempts.length)} <span aria-hidden="true">{isExpanded ? "▴" : "▾"}</span>
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

          <Link href={routes.stats} className="block mt-6">
            <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-4 w-4 text-brand-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-50">{ui.statsTitle}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ui.statsSub}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
            </div>
          </Link>

          {communityOn && (
            <Link href={`${routes.stats}?tab=community`} className="block mt-1.5">
              <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-brand-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-50">{ui.communityTitle}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ui.communitySub(exam.shortName)}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0" />
              </div>
            </Link>
          )}

          <div className="mt-6">
            <SuperAmazingCard dashboardKey={`v2:${exam.id}`} allComplete={totalSteps > 0 && doneSteps === totalSteps} totalSteps={totalSteps} />
          </div>

          <p className="mt-6 text-center text-[11px] text-gray-500 dark:text-gray-400">{exam.copy.sourceLine}</p>
        </div>
      </div>
      <V2Paywall exam={exam} {...paywall.modalProps} />
    </div>
  );
}

/** Thank-you strip after Stripe sends the buyer back here. */
function PurchaseBanner({ exam }: { exam: ExamV2Config }) {
  const ui = useV2Ui().dashboard;
  const { justPurchased, dismiss } = usePurchaseReturn();
  if (!justPurchased) return null;
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 dark:from-green-950 to-emerald-50 dark:to-emerald-950 p-4">
      <CheckCircle className="h-8 w-8 flex-shrink-0 text-green-500 dark:text-green-400" />
      <div className="flex-1">
        <p className="text-base font-bold text-green-900 dark:text-green-200">{ui.welcomePremium}</p>
        <p className="mt-0.5 text-xs text-green-700 dark:text-green-300">
          {ui.premiumUnlocked(exam.shortName, ui.otherPremiumExams)}
        </p>
      </div>
      <button type="button" onClick={dismiss} className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300" aria-label={ui.dismiss}>
        &times;
      </button>
    </div>
  );
}

/** Goal vs best on the exam scale. Fixed targets have no edit control. */
function GoalStrip({ exam, goal, best, onEdit }: { exam: ExamV2Config; goal: number; best: number | null; onEdit?: () => void }) {
  const ui = useV2Ui().dashboard;
  const { min, max } = exam.composite;
  const pos = (v: number) => `${Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))}%`;
  const hit = best !== null && best >= goal;
  return (
    <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400">
          {ui.goalLabel} <span className="font-bold text-gray-900 dark:text-gray-50 tabular-nums">{goal}{exam.fixedGoal !== undefined && exam.composite.max === 100 ? "%" : ""}</span>
          {best !== null && (
            <>
              {" · "}{ui.bestLabel} <span className={`font-bold tabular-nums ${hit ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>{best}</span>
            </>
          )}
        </span>
        {onEdit && <button type="button" onClick={onEdit} className="flex items-center gap-1 font-semibold text-brand-dark">
          <Pencil className="h-3 w-3" /> {ui.changeGoal}
        </button>}
      </div>
      <div className="relative mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
        {best !== null && <div className={`absolute inset-y-0 left-0 rounded-full ${hit ? "bg-green-500" : "bg-brand"}`} style={{ width: pos(best) }} />}
        <div className="absolute -top-1 h-4 w-0.5 rounded bg-gray-900 dark:bg-gray-100" style={{ left: pos(goal) }} aria-hidden />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-gray-500 dark:text-gray-400">
        <span>{min}</span>
        <span>{best === null ? ui.takeTestToSeeScore : hit ? ui.goalHitShort : ui.pointsToGo(goal - best)}</span>
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
  const ui = useV2Ui().dashboard;
  const lang = useV2Language();
  return (
    <div className={`rounded-b-xl border border-t-0 px-4 pb-4 ${complete ? "bg-gradient-to-r from-green-50 dark:from-green-950 to-emerald-50 dark:to-emerald-950 border-green-200 dark:border-green-800" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {attempts.map((a, i) => (
          <div key={a.completedAt} className="flex items-center justify-between py-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              {i === attempts.length - 1 ? ui.attemptFirst : ui.attemptNumber(attempts.length - i)} · {shortDate(a.completedAt, exam.id, lang)}
            </span>
            <span className="flex items-center gap-3 tabular-nums">
              <span className="text-xs text-gray-500 dark:text-gray-400">{a.sections.map((s) => `${getSectionV2(exam, s.section).shortName} ${s.scaled}`).join(" · ")}</span>
              <span className={`font-bold ${a.composite >= goal ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-50"}`}>{a.composite}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        <Link href={resultsHref} className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-brand text-white font-bold text-sm px-4 py-3">
          {ui.reviewLatest} <ChevronRight className="h-4 w-4" />
        </Link>
        <Link href={testHref} className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 font-bold text-sm px-4 py-3">
          {inProgress ? ui.resumeTest : ui.retakeTest} <ChevronRight className="h-4 w-4" />
        </Link>
        {onDiscard && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(ui.discardConfirm)) onDiscard();
            }}
            className="w-full text-center text-xs font-semibold text-gray-500 dark:text-gray-400"
          >
            {ui.discardAttempt}
          </button>
        )}
      </div>
    </div>
  );
}
